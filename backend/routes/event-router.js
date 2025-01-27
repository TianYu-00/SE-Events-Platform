const express = require("express");
const eventController = require("../mvc/controllers/events.controller");
const eventRouter = express.Router();
const { requireAuth } = require("@clerk/express");

eventRouter.get("/", eventController.fetchAllEvents);
eventRouter.get("/:event_id", eventController.getSingleEvent);

// Should be protected
eventRouter.post("/", requireAuth(), eventController.postEvent);
eventRouter.delete("/", requireAuth(), eventController.deleteEvents);
eventRouter.patch("/:event_id", requireAuth(), eventController.editEvents);

module.exports = eventRouter;
