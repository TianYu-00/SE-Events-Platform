const { app, request, db, seed, data } = require("../../utils/test-utils/index");
require("jest-sorted");
afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("GET /api/events", () => {
  test("should return a 200 status code", async () => {
    await request(app).get("/api/events/1").expect(200);
  });

  test("should return success = true", async () => {
    const { body } = await request(app).get("/api/events/1");
    expect(body.success).toBe(true);
  });

  test("should return correct event object", async () => {
    const { body } = await request(app).get("/api/events/1");
    expect(body.data).toMatchObject({
      event_name: expect.any(String),
      event_start_date: expect.any(String),
      event_end_date: expect.any(String),
      event_street_address: expect.any(String),
      event_city_town: expect.any(String),
      event_postcode: expect.any(String),
      event_description: expect.any(String),
      event_organizer_id: expect.any(String),
      event_capacity: expect.any(Number),
      event_attendees: expect.any(Number),
      event_cost_in_pence: expect.any(Number),
      event_contact_email: expect.any(String),
      event_contact_phone_prefix: expect.any(String),
      event_contact_phone: expect.any(String),
      event_website: expect.any(String),
      event_tags: expect.any(Array),
      event_thumbnail: expect.any(String),
      event_created_at: expect.any(String),
      event_modified_at: expect.any(String),
    });
  });

  test("should return a 400 status code when passed invalid event id", async () => {
    const { body } = await request(app).get("/api/events/invalid-id").expect(400);
    expect(body.code).toBe("INVALID_REQUEST");
  });

  test("should return a 404 status code when event not found", async () => {
    const { body } = await request(app).get("/api/events/9999").expect(404);
    expect(body.code).toBe("RESOURCE_NOT_FOUND");
  });
});
