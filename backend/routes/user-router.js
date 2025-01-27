const express = require("express");
const userController = require("../mvc/controllers/users.controller");
const userRouter = express.Router();
const { requireAuth } = require("@clerk/express");

// Should be protected
userRouter.get("/", requireAuth(), userController.fetchAllUsers);
userRouter.get("/:user_id", requireAuth(), userController.fetchUser);
userRouter.post("/update-role", requireAuth(), userController.updateRole);

userRouter.post("/initialize", userController.initializeUser); // later could convert this to accept webhook of i think user.created?

module.exports = userRouter;
