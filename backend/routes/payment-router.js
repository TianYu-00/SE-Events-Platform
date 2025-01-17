const paymentRouter = require("express").Router();
const paymentController = require("../mvc/controllers/payment.controller");

//
paymentRouter.post("/create-payment-intent", paymentController.createPayment);
paymentRouter.post("/verify-payment-intent", paymentController.verifyPayment);
paymentRouter.post("/webhook", paymentController.handleWebhook);

module.exports = paymentRouter;
