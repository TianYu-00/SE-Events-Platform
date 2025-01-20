const apisRouter = require("express").Router();
const controller_apis = require("../mvc/controllers/api.controller");
const userRouter = require("./user-router");
const eventRouter = require("./event-router");
const paymentRouter = require("./payment-router");
const purchaseRouter = require("./purchase-router");

//
apisRouter.get("/", controller_apis.getApis);
apisRouter.get("/test", controller_apis.test);

apisRouter.use("/users", userRouter);
apisRouter.use("/events", eventRouter);
apisRouter.use("/stripe", paymentRouter);
apisRouter.use("/purchases", purchaseRouter);

module.exports = apisRouter;
