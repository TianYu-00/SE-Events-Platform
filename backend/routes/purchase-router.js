const express = require("express");
const purchaseController = require("../mvc/controllers/purchase.controller");
const purchaseRouter = express.Router();

purchaseRouter.get("/", purchaseController.getAllPurchases);
purchaseRouter.post("/free", purchaseController.createFreePurchase);

module.exports = purchaseRouter;
