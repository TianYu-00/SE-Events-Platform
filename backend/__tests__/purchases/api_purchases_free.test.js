const { app, request, db, seed, data, userToken } = require("../../utils/test-utils/index");

afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("POST /api/purchases/free", () => {
  test("should return a 200 status code and success message for valid input", async () => {
    const validPurchaseData = { user_id: 1, event_name: "test123", event_id: 1 };
    const { body } = await request(app)
      .post("/api/purchases/free")
      .auth(userToken, { type: "bearer" })
      .send(validPurchaseData)
      .expect(200);
  });

  test("should return a 400 status code if user_id is missing", async () => {
    const invalidData = { event_name: "test123", event_id: 1 };

    const { body } = await request(app)
      .post("/api/purchases/free")
      .auth(userToken, { type: "bearer" })
      .send(invalidData)
      .expect(400);

    expect(body.code).toBe("INVALID_REQUEST_BODY");
  });

  test("should return a 400 status code if event_name is missing", async () => {
    const invalidData = { user_id: 1, event_id: 1 };

    const { body } = await request(app)
      .post("/api/purchases/free")
      .auth(userToken, { type: "bearer" })
      .send(invalidData)
      .expect(400);

    expect(body.code).toBe("INVALID_REQUEST_BODY");
  });

  test("should return a 400 status code if event_id is missing", async () => {
    const invalidData = { user_id: 1, event_name: "test123" };

    const { body } = await request(app)
      .post("/api/purchases/free")
      .auth(userToken, { type: "bearer" })
      .send(invalidData)
      .expect(400);

    expect(body.code).toBe("INVALID_REQUEST_BODY");
  });

  test("should not allow multiple same free ticket purchases", async () => {
    const validPurchaseData = { user_id: 1, event_name: "test123", event_id: 1 };
    const { body } = await request(app)
      .post("/api/purchases/free")
      .auth(userToken, { type: "bearer" })
      .send(validPurchaseData);

    const { body: secondPurchaseBody } = await request(app)
      .post("/api/purchases/free")
      .auth(userToken, { type: "bearer" })
      .send(validPurchaseData)
      .expect(409);

    expect(secondPurchaseBody.code).toBe("EVENT_ALREADY_PURCHASED");
  });
});
