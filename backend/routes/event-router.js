const express = require("express");
const eventController = require("../mvc/controllers/events.controller");
const eventRouter = express.Router();

eventRouter.get("/", eventController.fetchAllEvents);
eventRouter.post("/create-event", eventController.postEvent);
eventRouter.delete("/delete-events", eventController.deleteEvents);

module.exports = eventRouter;
