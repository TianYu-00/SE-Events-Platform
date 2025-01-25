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
    }
  });

  test("should return events ordered in ascending order by event_created_at", async () => {
    const { body } = await request(app).get("/api/events?order_created_at=asc");
    const eventDates = body.data.map((event) => new Date(event.event_created_at));
    expect(eventDates).toBeSorted({ descending: false });
  });

  test("should return events ordered in descending order by event_created_at", async () => {
    const { body } = await request(app).get("/api/events?order_created_at=desc");
    const eventDates = body.data.map((event) => new Date(event.event_created_at));
    expect(eventDates).toBeSorted({ descending: true });
  });

  test("should return a status code 400 and error if order query was not asc or desc", async () => {
    const { body } = await request(app).get("/api/events?order_created_at=invalidOrder").expect(400);
    expect(body.success).toBe(false);
    expect(body.code).toBe("INVALID_QUERY");
  });

  test("should return events ordered in ascending order by event_start_date", async () => {
    const { body } = await request(app).get("/api/events?order_date=asc");
    const eventStartDates = body.data.map((event) => new Date(event.event_start_date));
    expect(eventStartDates).toBeSorted({ descending: false });
  });

  test("should return events ordered in descending order by event_start_date", async () => {
    const { body } = await request(app).get("/api/events?order_date=desc");
    const eventStartDates = body.data.map((event) => new Date(event.event_start_date));
    expect(eventStartDates).toBeSorted({ descending: true });
  });

  test("should return error if both order_created_at and order_date are provided", async () => {
    const { body } = await request(app).get("/api/events?order_created_at=asc&order_date=desc").expect(400);

    expect(body.success).toBe(false);
    expect(body.code).toBe("INVALID_QUERY");
  });
});
