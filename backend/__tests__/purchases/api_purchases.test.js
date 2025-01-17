const { app, request, db, seed, data } = require("../../utils/test-utils/index");
require("jest-sorted");
afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("GET /api/purchases", () => {
  test("should return a 200 status code", async () => {
    await request(app).get("/api/purchases").expect(200);
  });

  test("should return success = true", async () => {
    const { body } = await request(app).get("/api/purchases");
    expect(body.success).toBe(true);
  });

  test("should return correct purchase object", async () => {
    const { body } = await request(app).get("/api/purchases");
    for (const user of body.data) {
      expect(user).toMatchObject({
        purchase_user_id: expect.any(String),
        purchase_payment_intent_id: expect.any(String),
        purchase_event_id: expect.any(Number),
        purchase_paid_amount_in_pence: expect.any(Number),
        purchase_payment_status: expect.any(String),
        purchase_created_at: expect.any(String),
      });
    }
  });

  test("should return purchases ordered in ascending order by purchase_created_at", async () => {
    const { body } = await request(app).get("/api/purchases?order_created_at=asc");
    const purchaseDates = body.data.map((purchase) => new Date(purchase.purchase_created_at));
    expect(purchaseDates).toBeSorted({ descending: false });
  });

  test("should return purchases ordered in descending order by purchase_created_at", async () => {
    const { body } = await request(app).get("/api/purchases?order_created_at=desc");
    const purchaseDates = body.data.map((purchase) => new Date(purchase.purchase_created_at));
    expect(purchaseDates).toBeSorted({ descending: true });
  });

  test("should return a status code 400 and error if order query was not asc or desc", async () => {
    const { body } = await request(app).get("/api/purchases?order_created_at=invalidOrder").expect(400);
    expect(body.success).toBe(false);
    expect(body.code).toBe("INVALID_QUERY");
  });
});
