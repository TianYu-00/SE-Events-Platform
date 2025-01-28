const { app, request, db, seed, data, adminToken, userToken } = require("../../utils/test-utils/index");
afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("GET /api/users", () => {
  test("should return a 200 status code", async () => {
    await request(app).get("/api/users").auth(adminToken, { type: "bearer" }).expect(200);
  });

  test("should return success = true", async () => {
    const { body } = await request(app).get("/api/users").auth(adminToken, { type: "bearer" });
    expect(body.success).toBe(true);
  });

  test("should return correct user object", async () => {
    const { body } = await request(app).get("/api/users").auth(adminToken, { type: "bearer" });
    const users = body.data;
    for (const user of users) {
      expect(user).toMatchObject({
        id: expect.any(String),
      });
    }
  });

  test("user should not have access to this route", async () => {
    const { body } = await request(app).get("/api/users").auth(userToken, { type: "bearer" }).expect(403);

    expect(body.code).toBe("ACCESS_DENIED");
  });
});
