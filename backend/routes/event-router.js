const express = require("express");
const eventController = require("../mvc/controllers/events.controller");
const eventRouter = express.Router();

eventRouter.get("/", eventController.fetchAllEvents);
eventRouter.post("/create-event", eventController.postEvent);

module.exports = eventRouter;
