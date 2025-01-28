const stripeRouter = require("express").Router();
const stripeController = require("../mvc/controllers/stripe.controller");
const { requireAuth } = require("@clerk/express");

// Should be protected
stripeRouter.post("/create-payment-intent", requireAuth(), stripeController.createPayment);
stripeRouter.post("/verify-payment-intent", requireAuth(), stripeController.verifyPayment);

stripeRouter.post("/webhook", stripeController.handleWebhook);

module.exports = stripeRouter;
