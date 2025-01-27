const express = require("express");
const userController = require("../mvc/controllers/users.controller");
const userRouter = express.Router();
const { requireAuth } = require("@clerk/express");
const adminLocked = require("../utils/middleware/adminLocked");

// Should be protected
userRouter.get("/", requireAuth(), adminLocked, userController.fetchAllUsers); // should admin
userRouter.post("/update-role", requireAuth(), adminLocked, userController.updateRole); // should admin
userRouter.get("/:user_id", requireAuth(), userController.fetchUser);

userRouter.post("/initialize", userController.initializeUser); // later could convert this to accept webhook of i think user.created?

module.exports = userRouter;
