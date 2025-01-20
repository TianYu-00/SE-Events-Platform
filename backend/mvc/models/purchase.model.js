const db = require("../../db/connection");

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

exports.addPurchase = async ({ paymentIntent, message = null }) => {
  try {
    const query = `
        INSERT INTO purchases (
          purchase_user_id, 
          purchase_payment_intent_id, 
          purchase_payment_charge_id, 
          purchase_event_id, 
          purchase_event_name, 
          purchase_paid_amount_in_pence, 
          purchase_payment_status, 
          purchase_descriptive_status,
          purchase_created_at
        ) 
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        ) RETURNING *;
      `;

    const values = [
      paymentIntent.metadata.user_id,
      paymentIntent.id,
      paymentIntent.latest_charge,
      parseInt(paymentIntent.metadata.event_id),
      paymentIntent.metadata.event_name,
      paymentIntent.amount_received,
      paymentIntent.status,
      message,
      new Date(paymentIntent.created * 1000),
    ];

    const result = await db.query(query, values);
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
        purchase_payment_status = $1,
        purchase_descriptive_status = $2,
        purchase_modified_at = CURRENT_TIMESTAMP
      WHERE purchase_payment_intent_id = $3
      RETURNING *;
    `;

    const values = [paymentIntent.status, message, paymentIntent.payment_intent];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};
