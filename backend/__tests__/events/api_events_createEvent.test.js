const { app, request, db, seed, data } = require("../../utils/test-utils/index");
afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("POST /api/events/create-event", () => {
  const validEventData = {
    eventName: "Test Event",
    startDate: "2025-01-15T10:00:00Z",
    endDate: "2025-01-15T12:00:00Z",
    fullAddress: "123 Test Street, Test City",
    description: "This is a test event.",
    organizerUserId: "user123",
    capacity: 100,
    attendees: 0,
    costInPence: 1000,
    contactEmail: "test@example.com",
    contactPhonePrefix: "+44",
    contactPhone: "1234567890",
    thumbnail: "https://example.com/thumbnail.jpg",
  };

  test("should return 200 and success message when valid event data is provided", async () => {
    const { body } = await request(app).post("/api/events/create-event").send(validEventData).expect(200);

    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty("event_name", validEventData.eventName);
  });

  test("should return 400 and error message when some required fields are missing", async () => {
    const incompleteEventData = {
      ...validEventData,
      eventName: undefined,
      startDate: null,
    };

    const { body } = await request(app).post("/api/events/create-event").send(incompleteEventData).expect(400);
    expect(body.success).toBe(false);
    expect(body.code).toBe("BODY_CONTENT_INCOMPLETE");
  });

  test("should return 400 and error message when request body is empty", async () => {
    const { body } = await request(app).post("/api/events/create-event").send({}).expect(400);
    expect(body.success).toBe(false);
    expect(body.code).toBe("BODY_CONTENT_INCOMPLETE");
  });
});
