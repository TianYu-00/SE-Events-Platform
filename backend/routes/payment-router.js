const paymentRouter = require("express").Router();
const paymentController = require("../mvc/controllers/payment.controller");

//
paymentRouter.post("/create-payment-intent", paymentController.createPayment);

module.exports = paymentRouter;
