const apisRouter = require("express").Router();
const controller_apis = require("../mvc/controllers/api.controller");
const userRouter = require("./user-router");
const eventRouter = require("./event-router");
const paymentRouter = require("./payment-router");
const purchaseRouter = require("./purchase-router");
const clerkRouter = require("./clerk-router");
const healthCheckRouter = require("./health-check-router");

const clerkMiddleware = require("@clerk/express").clerkMiddleware;

//
apisRouter.get("/", controller_apis.getApis);
apisRouter.get("/test", controller_apis.test);

apisRouter.use("/users", userRouter);
apisRouter.use("/events", eventRouter);
apisRouter.use("/stripe", paymentRouter);
apisRouter.use("/purchases", purchaseRouter);
apisRouter.use("/clerk", clerkMiddleware(), clerkRouter);

// health check
apisRouter.use("/health-check", healthCheckRouter);

module.exports = apisRouter;
