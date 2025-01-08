const express = require("express");
const userController = require("../mvc/controllers/users.controller");
const userRouter = express.Router();

userRouter.get("/", userController.fetchAllUsers);
userRouter.get("/:user_id", userController.fetchUser);
userRouter.post("/initialize", userController.initializeUser); // later could convert this to accept webhook of i think user.created?
userRouter.post("/update-role", userController.updateRole);

module.exports = userRouter;
