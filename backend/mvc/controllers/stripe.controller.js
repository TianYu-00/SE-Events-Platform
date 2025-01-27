const { getEventById, checkTicketsAvailable } = require("../models/events.models");
const { addPurchase, editPurchaseCharge } = require("../models/purchase.model");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.createPayment = async (req, res, next) => {
  try {
    const { event_id: eventId, user_id: userId } = req.body;
    if (isNaN(eventId) || Number(eventId) <= 0) {
      const error = new Error("Event id is not valid");
      error.code = "BODY_CONTENT_INVALID";
      return next(error);
    }

    if (userId.trim().length === 0) {
      const error = new Error("User id is not valid");
      error.code = "BODY_CONTENT_INVALID";
      return next(error);
    }

    await checkTicketsAvailable(eventId);

    const eventInfo = await getEventById(eventId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: eventInfo.event_cost_in_pence,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      metadata: {
        event_id: eventId,
        event_name: eventInfo.event_name,
        event_organizer_id: eventInfo.event_organizer_id,
        user_id: userId,
      },
      capture_method: "manual",
    });

    res.status(200).json({
      success: true,
      msg: "Payment intent created",
      data: { clientSecret: paymentIntent.client_secret, price: eventInfo.event_cost_in_pence },
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { paymentIntentId, user_id: userId } = req.body;
    if (paymentIntentId.trim().length === 0) {
      const error = new Error("Payment intent id is not valid");
      error.code = "BODY_CONTENT_INVALID";
      return next(error);
    }

    if (userId.trim().length === 0) {
      const error = new Error("User id is not valid");
      error.code = "BODY_CONTENT_INVALID";
      return next(error);
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.metadata.user_id !== userId) {
      const error = new Error("Unauthorised Access");
      error.code = "UNAUTHORISED_ACCESS";
      console.log("error");
      return next(error);
    }

    if (paymentIntent.status === "succeeded") {
      res.status(200).json({ success: true, msg: "Payment successful", data: paymentIntent });
    } else {
      res.status(200).json({ success: false, msg: "Payment not successful", data: paymentIntent });
    }
  } catch (error) {
    if (error?.raw?.code === "resource_missing") {
      const customError = new Error("Payment not found.");
      customError.code = "RESOURCE_NOT_FOUND";
      return next(customError);
    }

    next(error);
  }
};

exports.handleWebhook = async (req, res, next) => {
  // https://docs.stripe.com/webhooks/quickstart
  const payload = req.rawBody;
  let event;

  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    } catch (error) {
      console.log(`⚠️  Webhook signature verification failed.`, error.message);
      return res.status(400);
    }
  }

  console.log(event.type);

  switch (event.type) {
    case "payment_intent.amount_capturable_updated": {
      // https://docs.stripe.com/api/payment_intents/capture
      const paymentIntent = event.data.object;
      try {
        await checkTicketsAvailable(paymentIntent.metadata.event_id);
        const paymentIntentCapture = await stripe.paymentIntents.capture(paymentIntent.id);
        const response = await addPurchase({
          paymentIntent: paymentIntent,
          message: "Payment confirm, we are now attempting to capture payment",
        });
      } catch (error) {
        console.log(error);

        const updateFailureMetaData = async (message) => {
          try {
            await stripe.paymentIntents.update(paymentIntent.id, {
              metadata: {
                ...paymentIntent.metadata,
                failure_message: message,
                failure_code: error.code,
              },
            });
          } catch (updateError) {
            console.log("Failed to update metadata:", updateError);
          }
        };

        if (error.code === "NO_TICKETS_AVAILABLE") {
          await updateFailureMetaData("Tickets have sold out");
        } else {
          await updateFailureMetaData("Failed to capture funds");
        }
      }
      break;
    }
    case "charge.succeeded": {
      const paymentIntent = event.data.object;
      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      break;
    }
    case "charge.captured": {
      const paymentIntent = event.data.object;
      const response = await editPurchaseCharge({
        paymentIntent: paymentIntent,
        message: "Payment successfully processed, funds confirmed.",
      });
      break;
    }
    case "charge.refunded": {
      const paymentIntent = event.data.object;
      const response = await editPurchaseCharge({
        paymentIntent: paymentIntent,
        message: "Payment refunded, funds are being returned.",
      });
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.send();
};
