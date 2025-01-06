const { app, request } = require("../../utils/test-utils/index");

describe("GET api/test", () => {
  test("should return a 200 status code, indicating the endpoint is accessible", async () => {
    try {
      await request(app).get("/api/test").expect(200);
    } catch (error) {
      throw error;
    }
  });

  test("should return a message saying Hello World!", async () => {
    try {
      const { body } = await request(app).get("/api/test").expect(200);
      expect(body.msg).toBe("Hello World!");
    } catch (error) {
      throw error;
    }
  });
});
