const { addPurchase, getAllPurchases } = require("../models/purchase.model");

exports.getAllPurchases = async (req, res, next) => {
  try {
    const { order_created_at: orderCreatedAt, user_id: userId } = req.query;
    const validOrderQueries = ["asc", "desc"];

    if (orderCreatedAt && !validOrderQueries.includes(orderCreatedAt.toLowerCase())) {
      const error = new Error("Invalid order query");
      error.code = "INVALID_QUERY";
      return next(error);
    }

    const validatedOrder = orderCreatedAt ? orderCreatedAt.toUpperCase() : undefined;

    if (userId && typeof userId !== "string") {
      const error = new Error("Invalid user_id query");
      error.code = "INVALID_QUERY";
      return next(error);
    }

    const data = await getAllPurchases({ orderCreatedAt: validatedOrder, userId: userId });
    res.json({ success: true, msg: "Purchases have been fetched", data: data });
  } catch (err) {
    next(err);
  }
};
