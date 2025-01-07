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

  test("should return success = true", async () => {
    const { body } = await request(app).get("/api/events");
    expect(body.success).toBe(true);
  });

  test("should return correct event object", async () => {
    const { body } = await request(app).get("/api/events");
    for (const user of body.data) {
      expect(user).toMatchObject({
        event_name: expect.any(String),
        event_start_date: expect.any(String),
        event_end_date: expect.any(String),
        event_full_address: expect.any(String),
        event_description: expect.any(String),
        event_organizer: expect.any(Number),
        event_capacity: expect.any(Number),
        event_attendees: expect.any(Number),
        event_cost_in_pence: expect.any(Number),
        event_contact_email: expect.any(String),
        event_contact_phone_prefix: expect.any(String),
        event_contact_phone: expect.any(String),
        event_website: expect.any(String),
        event_tags: expect.any(Array),
        event_thumbnail: expect.any(String),
        event_organizer_username: expect.any(String),
        event_organizer_company: expect.any(String),
      });
    }
  });
});
