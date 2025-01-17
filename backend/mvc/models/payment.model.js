const db = require("../../db/connection");

exports.addPurchase = async (paymentIntent) => {
  try {
    const query = `
        INSERT INTO purchases (
          purchase_user_id, 
          purchase_payment_intent_id, 
          purchase_event_id, 
          purchase_paid_amount_in_pence, 
          purchase_payment_status, 
          purchase_created_at
        ) 
        VALUES (
          $1, $2, $3, $4, $5, $6
        ) RETURNING *;
      `;

    const values = [
      paymentIntent.metadata.user_id,
      paymentIntent.id,
      parseInt(paymentIntent.metadata.event_id),
      paymentIntent.amount_received,
      paymentIntent.status,
      new Date(paymentIntent.created * 1000),
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};
