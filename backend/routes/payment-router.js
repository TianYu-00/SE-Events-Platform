const paymentRouter = require("express").Router();
const paymentController = require("../mvc/controllers/payment.controller");

//
paymentRouter.post("/create-payment-intent", paymentController.createPayment);
paymentRouter.post("/verify-payment-intent", paymentController.verifyPayment);

module.exports = paymentRouter;
