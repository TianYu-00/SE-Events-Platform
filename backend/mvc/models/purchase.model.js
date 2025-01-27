const db = require("../../db/connection");
const { getEventById, increaseEventAttendee } = require("./events.models");

exports.getAllPurchases = async ({ orderCreatedAt = undefined, userId = undefined }) => {
  try {
    let query = "SELECT * FROM purchases";
    const values = [];

    if (userId) {
      query += " WHERE purchase_user_id = $1";
      values.push(userId);
    }

    if (orderCreatedAt) {
      query += ` ORDER BY purchase_created_at ${orderCreatedAt}`;
    }

    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.addPurchase = async ({ paymentIntent, message = null, isFree = false }) => {
  try {
    if (isFree) {
      const isPurchased = await exports.checkEventAlreadyPurchased({
        userId: paymentIntent.metadata.user_id,
        eventId: paymentIntent.metadata.event_id,
      });
      if (isPurchased) {
        return Promise.reject({
          code: "EVENT_ALREADY_PURCHASED",
          message: "You have already signed up for this event",
        });
      }
    }

    await getEventById(paymentIntent.metadata.event_id);

    const query = `
        INSERT INTO purchases (
          purchase_user_id, 
          purchase_payment_intent_id, 
          purchase_payment_charge_id, 
          purchase_event_id, 
          purchase_event_name, 
          purchase_amount_in_pence, 
          purchase_payment_status, 
          purchase_descriptive_status,
          purchase_created_at
        ) 
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        ) RETURNING *;
      `;

    // console.log(paymentIntent);

    const values = [
      paymentIntent.metadata.user_id,
      isFree ? null : paymentIntent.id,
      isFree ? null : paymentIntent.latest_charge,
      parseInt(paymentIntent.metadata.event_id),
      paymentIntent.metadata.event_name,
      isFree ? 0 : paymentIntent.amount,
      isFree ? "succeeded" : paymentIntent.status,
      message,
      isFree ? new Date() : new Date(paymentIntent.created * 1000),
    ];

    const result = await db.query(query, values);
    await increaseEventAttendee(paymentIntent.metadata.event_id);
    return result.rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.editPurchaseCharge = async ({ paymentIntent, message = null }) => {
  try {
    const query = `
      UPDATE purchases
      SET
        purchase_captured_amount_in_pence = $1,
        purchase_refunded_amount_in_pence = $2,
        purchase_payment_status = $3,
        purchase_descriptive_status = $4,
        purchase_modified_at = CURRENT_TIMESTAMP
      WHERE purchase_payment_intent_id = $5
      RETURNING *;
    `;

    const values = [
      paymentIntent.amount_captured,
      paymentIntent.amount_refunded,
      paymentIntent.status,
      message,
      paymentIntent.payment_intent,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.checkEventAlreadyPurchased = async ({ userId, eventId }) => {
  try {
    const query = `SELECT * FROM purchases WHERE purchase_user_id = $1 AND purchase_event_id = $2`;
    const result = await db.query(query, [userId, eventId]);

    if (result.rows.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return Promise.reject(error);
  }
};
