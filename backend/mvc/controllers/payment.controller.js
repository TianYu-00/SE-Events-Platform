const { getEventById } = require("../models/events.models");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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

    const eventInfo = await getEventById(eventId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: eventInfo.event_cost_in_pence,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        event_id: eventId,
        event_name: eventInfo.event_name,
        event_organizer_id: eventInfo.event_organizer_id,
        user_id: userId,
      },
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
    // console.log(paymentIntent);

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
    next(error);
  }
};
