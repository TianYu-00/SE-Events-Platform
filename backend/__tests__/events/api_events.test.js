const { app, request, db, seed, data } = require("../../utils/test-utils/index");
afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("GET /api/events", () => {
  test("should return a 200 status code", async () => {
    await request(app).get("/api/events").expect(200);
  });
});
