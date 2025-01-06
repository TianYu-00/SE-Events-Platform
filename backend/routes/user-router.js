const express = require("express");
const userController = require("../mvc/controllers/users.controller");
const userRouter = express.Router();

userRouter.get("/", userController.fetchAllUsers);

module.exports = userRouter;
