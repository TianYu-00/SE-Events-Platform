const { getEventById } = require("../models/events.models");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res, next) => {
  try {
    const { event_id: eventId } = req.body;
    if (isNaN(eventId) || Number(eventId) <= 0) {
      const error = new Error("Event id is not valid");
      error.code = "INVALID_PARAMS";
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
