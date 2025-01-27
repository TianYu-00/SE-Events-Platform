const express = require("express");
const purchaseController = require("../mvc/controllers/purchase.controller");
const purchaseRouter = express.Router();
const { requireAuth } = require("@clerk/express");

// Should be protected
purchaseRouter.get("/", requireAuth(), purchaseController.getAllPurchases);
purchaseRouter.post("/free", requireAuth(), purchaseController.createFreePurchase);

module.exports = purchaseRouter;
