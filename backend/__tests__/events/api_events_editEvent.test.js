const { app, request, db, seed, data } = require("../../utils/test-utils/index");

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

afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("PATCH /api/events/:event_id", () => {
  test("should return 200 and success message when valid event data is provided for editing", async () => {
    const updateData = {
      event_name: "Test 123",
    };

    const { body: createEventResponse } = await request(app).post("/api/events").send(validEventData).expect(200);
    updateData.event_modified_at = createEventResponse.data.event_modified_at;

    const { body } = await request(app)
      .patch(`/api/events/${createEventResponse.data.event_id}`)
      .send(updateData)
      .expect(200);
    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty("event_name", updateData.event_name);
    expect(body.data).toHaveProperty("event_id", createEventResponse.data.event_id);
  });

  test("should return 404 if the event does not exist", async () => {
    const updateData = {
      event_name: "Test 123",
    };

    const { body } = await request(app).patch(`/api/events/99999`).send(updateData).expect(404);

    expect(body.success).toBe(false);
    expect(body.code).toBe("EVENT_NOT_FOUND");
  });

  test("should return 400 if the provided data has invalid fields", async () => {
    const updateData = {
      invalid_field: "Invalid field data",
    };

    const { body } = await request(app).patch(`/api/events/1`).send(updateData).expect(400);

    expect(body.success).toBe(false);
    expect(body.code).toBe("BODY_CONTENT_INVALID");
  });

  test("should return 200 and updated event with multiple fields", async () => {
    const updateData = {
      event_name: "Updated Test Event Multiple Fields",
      event_description: "Updated event description",
      event_capacity: 100,
    };

    const { body: createEventResponse } = await request(app).post("/api/events").send(validEventData).expect(200);
    updateData.event_modified_at = createEventResponse.data.event_modified_at;

    const { body } = await request(app)
      .patch(`/api/events/${createEventResponse.data.event_id}`)
      .send(updateData)
      .expect(200);

    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty("event_name", updateData.event_name);
    expect(body.data).toHaveProperty("event_description", updateData.event_description);
    expect(body.data).toHaveProperty("event_capacity", updateData.event_capacity);
  });

  test("should return 200 and modified_at should be updated", async () => {
    const updateData = {
      event_name: "Test 123",
    };

    const { body: createEventResponse } = await request(app).post("/api/events").send(validEventData).expect(200);
    updateData.event_modified_at = createEventResponse.data.event_modified_at;

    const { body } = await request(app)
      .patch(`/api/events/${createEventResponse.data.event_id}`)
      .send(updateData)
      .expect(200);

    expect(body.success).toBe(true);
    expect(body.data.event_modified_at).not.toBeNull();
  });

  test("should return 400 if the event_id is not a valid number", async () => {
    const updateData = {
      event_name: "Invalid Event ID Type",
    };

    const { body } = await request(app).patch(`/api/events/abc`).send(updateData).expect(400);

    expect(body.success).toBe(false);
    expect(body.code).toBe("INVALID_PARAMS");
  });
});
