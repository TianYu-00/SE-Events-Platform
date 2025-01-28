const express = require("express");
const eventController = require("../mvc/controllers/events.controller");
const eventRouter = express.Router();
const { requireAuth } = require("@clerk/express");
const adminLocked = require("../utils/middleware/adminLocked");

eventRouter.get("/", eventController.fetchAllEvents);
eventRouter.get("/:event_id", eventController.getSingleEvent);

// Should be protected
eventRouter.post("/", requireAuth(), adminLocked, eventController.postEvent); // should admin
eventRouter.delete("/", requireAuth(), adminLocked, eventController.deleteEvents); // should admin
eventRouter.patch("/:event_id", requireAuth(), adminLocked, eventController.editEvents); // should admin

module.exports = eventRouter;
