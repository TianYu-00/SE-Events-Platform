const { app, request, db, seed, data } = require("../../utils/test-utils/index");
afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("POST /api/events", () => {
  const validEventData = {
    event_name: "Test Event",
    event_start_date: "2025-01-15T10:00:00Z",
    event_end_date: "2025-01-15T12:00:00Z",
    event_street_address: "123 Test Street",
    event_city_town: "Test City",
    event_postcode: "T1 2ST",
    event_description: "This is a test event.",
    event_organizer_id: "user123",
    event_capacity: 100,
    event_attendees: 0,
    event_cost_in_pence: 1000,
    event_contact_email: "test@example.com",
    event_contact_phone_prefix: "+44",
    event_contact_phone: "1234567890",
    event_thumbnail: "https://example.com/thumbnail.jpg",
    event_website: "https://example.com",
    event_tags: ["test", "123"],
  };

  test("should return 200 and success message when valid event data is provided", async () => {
    const { body } = await request(app).post("/api/events").send(validEventData).expect(200);

    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty("event_name", validEventData.event_name);
  });

  test("should return 400 and error message when some required fields are missing", async () => {
    const incompleteEventData = {
      ...validEventData,
      event_name: undefined,
      event_start_date: null,
    };

    const { body } = await request(app).post("/api/events").send(incompleteEventData).expect(400);
    expect(body.success).toBe(false);
    expect(body.code).toBe("BODY_CONTENT_INCOMPLETE");
  });

  test("should return 400 and error message when request body is empty", async () => {
    const { body } = await request(app).post("/api/events").send({}).expect(400);
    expect(body.success).toBe(false);
    expect(body.code).toBe("BODY_CONTENT_INCOMPLETE");
  });
});
