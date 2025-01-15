const express = require("express");
const eventController = require("../mvc/controllers/events.controller");
const eventRouter = express.Router();

eventRouter.get("/", eventController.fetchAllEvents);
eventRouter.post("/", eventController.postEvent);
eventRouter.delete("/", eventController.deleteEvents);
// eventRouter.patch("/:event_id", eventController.deleteEvents);

module.exports = eventRouter;
