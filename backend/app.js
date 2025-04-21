const express = require("express");
const cors = require("cors");
// const { clerkMiddleware } = require("@clerk/express");
const { rateLimit } = require("express-rate-limit");
const apiRouter = require("./routes/api-router");
const errorHandler = require("./utils/middleware/errorHandler");

const app = express();
const allowedCorsOrigin = ["http://127.0.0.1:5173", "http://localhost:5173"];
const corsConfigOptions = {
  origin: process.env.FRONTEND_URL || allowedCorsOrigin,
  credentials: true,
};
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
});

app.set("trust proxy", 1);
app.use(cors(corsConfigOptions));
app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.startsWith("/api/stripe/webhook")) {
        req.rawBody = buf.toString();
      } else if (req.originalUrl.startsWith("/api/clerk/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);
// app.use(clerkMiddleware());
app.use(globalLimiter);

app.use("/api", apiRouter);

app.use(errorHandler);

app.all("*", (req, res) => {
  res.status(404).send({ success: false, msg: "ROUTE NOT FOUND", code: "ROUTE_NOT_FOUND", data: null });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ success: false, msg: "INTERNAL SERVER ERROR", code: "INTERNAL_SERVER_ERROR", data: null });
});

module.exports = app;
