const { app, request, db, seed, data } = require("../../utils/test-utils/index");
afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("GET /api/users", () => {
  test("should return a 200 status code", async () => {
    await request(app).get("/api/users").expect(200);
  });

  test("should return success = true", async () => {
    const { body } = await request(app).get("/api/users");
    expect(body.success).toBe(true);
  });

  test("should return correct user object", async () => {
    const { body } = await request(app).get("/api/users");
    for (const user of body.data) {
      expect(user).toMatchObject({
        user_id: expect.any(Number),
        user_username: expect.any(String),
        user_company_name: expect.any(String),
        user_email: expect.any(String),
        user_password: expect.any(String),
        user_created_at: expect.any(String),
        user_role: expect.any(String),
      });
    }
  });
});
