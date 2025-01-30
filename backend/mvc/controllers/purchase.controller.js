const { addPurchase, getAllPurchases } = require("../models/purchase.model");

exports.getAllPurchases = async (req, res, next) => {
  try {
    const { order_created_at: orderCreatedAt, user_id: userId } = req.query;
    const validOrderQueries = ["asc", "desc"];

    if (orderCreatedAt && !validOrderQueries.includes(orderCreatedAt.toLowerCase())) {
      const error = new Error("Invalid order query");
      error.code = "INVALID_REQUEST";
      return next(error);
    }

    const validatedOrder = orderCreatedAt ? orderCreatedAt.toUpperCase() : undefined;

    if (userId && typeof userId !== "string") {
      const error = new Error("Invalid user_id query");
      error.code = "INVALID_REQUEST";
      return next(error);
    }

    const data = await getAllPurchases({ orderCreatedAt: validatedOrder, userId: userId });
    res.json({ success: true, msg: "Purchases have been fetched", data: data });
  } catch (error) {
    next(error);
  }
};

exports.createFreePurchase = async (req, res, next) => {
  try {
    const { user_id: userId, event_name: eventName, event_id: eventId } = req.body;
    if (userId === undefined || eventName === undefined || eventId === undefined) {
      const error = new Error("Some fields are missing");
      error.code = "INVALID_REQUEST_BODY";
      return next(error);
    }

    const tempPaymentIntent = {
      metadata: {
        user_id: userId,
        event_name: eventName,
        event_id: eventId,
      },
    };

    const data = await addPurchase({
      paymentIntent: tempPaymentIntent,
      message: "Event signed up successfully",
      isFree: true,
    });
    res.json({ success: true, msg: "Event signed up successfully", data: data });
  } catch (error) {
    next(error);
  }
};
