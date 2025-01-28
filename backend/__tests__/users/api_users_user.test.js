const { app, request, db, seed, data, adminToken, userToken } = require("../../utils/test-utils/index");
afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("GET /api/users/:user_id", () => {
  test("should return a 200 status code", async () => {
    const { body: listOfUsersResponse } = await request(app).get("/api/users").auth(adminToken, { type: "bearer" });

    const { body } = await request(app)
      .get(`/api/users/${listOfUsersResponse.data[0].id}`)
      .auth(userToken, { type: "bearer" })
      .expect(200);
  });

  test("should return success = true", async () => {
    const { body: listOfUsersResponse } = await request(app).get("/api/users").auth(adminToken, { type: "bearer" });

    const { body } = await request(app)
      .get(`/api/users/${listOfUsersResponse.data[0].id}`)
      .auth(userToken, { type: "bearer" })
      .expect(200);
    expect(body.success).toBe(true);
  });
});
