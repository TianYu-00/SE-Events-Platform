const express = require("express");
const clerkController = require("../mvc/controllers/clerk.controller");
const clerkRouter = express.Router();

clerkRouter.post("/webhook", clerkController.clerkWebhook);

module.exports = clerkRouter;
