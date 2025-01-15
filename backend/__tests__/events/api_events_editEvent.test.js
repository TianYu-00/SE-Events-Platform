const { app, request, db, seed, data } = require("../../utils/test-utils/index");

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

    const { body } = await request(app).patch(`/api/events/1`).send(updateData).expect(200);
    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty("event_name", updateData.event_name);
    expect(body.data).toHaveProperty("event_id", 1);
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

    const { body } = await request(app).patch(`/api/events/1`).send(updateData).expect(200);

    expect(body.success).toBe(true);
    expect(body.data).toHaveProperty("event_name", updateData.event_name);
    expect(body.data).toHaveProperty("event_description", updateData.event_description);
    expect(body.data).toHaveProperty("event_capacity", updateData.event_capacity);
  });

  test("should return 200 and modified_at should be updated", async () => {
    const updateData = {
      event_name: "Test 123",
    };

    const { body } = await request(app).patch(`/api/events/1`).send(updateData).expect(200);

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
