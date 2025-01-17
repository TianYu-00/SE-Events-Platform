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
        purchase_event_name: expect.any(String),
        purchase_paid_amount_in_pence: expect.any(Number),
        purchase_payment_status: expect.any(String),
        purchase_created_at: expect.any(String),
      });
    }
  });

  // test order
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

  // test user_id
  test("should return purchases only for the specified user_id", async () => {
    const userId = "user_2rPTtagNORnIeB0T5rMsFOnlzxc";
    const { body } = await request(app).get(`/api/purchases?user_id=${userId}`);
    expect(body.success).toBe(true);
    for (const purchase of body.data) {
      expect(purchase.purchase_user_id).toBe(userId);
    }
  });

  test("should return an empty array if no purchases are found for the user_id", async () => {
    const userId = "non_existent_user";
    const { body } = await request(app).get(`/api/purchases?user_id=${userId}`);
    expect(body.success).toBe(true);
    expect(body.data).toEqual([]);
  });

  test("should return purchases filtered by user_id and ordered in ascending order by purchase_created_at", async () => {
    const userId = "user_2rPTtagNORnIeB0T5rMsFOnlzxc";
    const { body } = await request(app).get(`/api/purchases?user_id=${userId}&order_created_at=asc`);
    expect(body.success).toBe(true);
    const purchaseDates = body.data.map((purchase) => new Date(purchase.purchase_created_at));
    expect(purchaseDates).toBeSorted({ descending: false });
    expect(body.data.every((purchase) => purchase.purchase_user_id === userId)).toBe(true);
  });

  test("should return purchases filtered by user_id and ordered in descending order by purchase_created_at", async () => {
    const userId = "user_2rPTtagNORnIeB0T5rMsFOnlzxc";
    const { body } = await request(app).get(`/api/purchases?user_id=${userId}&order_created_at=desc`);
    expect(body.success).toBe(true);
    const purchaseDates = body.data.map((purchase) => new Date(purchase.purchase_created_at));
    expect(purchaseDates).toBeSorted({ descending: true });
    expect(body.data.every((purchase) => purchase.purchase_user_id === userId)).toBe(true);
  });

  test("should ignore invalid user_id query and return all purchases", async () => {
    const { body } = await request(app).get("/api/purchases?user_id=");
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });
});
