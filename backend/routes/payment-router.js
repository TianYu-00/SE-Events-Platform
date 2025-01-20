const stripeRouter = require("express").Router();
const stripeController = require("../mvc/controllers/stripe.controller");

//
stripeRouter.post("/create-payment-intent", stripeController.createPayment);
stripeRouter.post("/verify-payment-intent", stripeController.verifyPayment);
stripeRouter.post("/webhook", stripeController.handleWebhook);

module.exports = stripeRouter;
