const { app, request, db, seed, data } = require("../../utils/test-utils/index");

afterAll(() => {
  return db.end();
});

beforeEach(async () => {
  await seed(data);
});

describe("DELETE /api/events", () => {
  const validEventIds = [1, 2];
  const invalidEventIds = [999, 1000];
  const emptyEventIds = [];

  test("should return 200 and success message when valid event IDs are provided", async () => {
    const { body } = await request(app).delete("/api/events").send({ eventIds: validEventIds }).expect(200);

    expect(body.success).toBe(true);
    expect(body.data.deletedIds).toEqual(expect.arrayContaining(validEventIds));
    expect(body.data.failedToDeleteIds.length).toBe(0);
  });

  test("should return 400 and error code when eventIds array is empty", async () => {
    const { body } = await request(app).delete("/api/events").send({ eventIds: emptyEventIds }).expect(400);

    expect(body.success).toBe(false);
    expect(body.code).toBe("BODY_CONTENT_INCOMPLETE");
  });

  test("should return 400 and error code when eventIds are missing", async () => {
    const { body } = await request(app).delete("/api/events").send({}).expect(400);

    expect(body.success).toBe(false);
    expect(body.code).toBe("BODY_CONTENT_INCOMPLETE");
  });

  test("should return 400 and error code when no events are deleted", async () => {
    const { body } = await request(app).delete("/api/events").send({ eventIds: invalidEventIds }).expect(400);

    expect(body.success).toBe(false);
    expect(body.code).toBe("NO_EVENT_DELETED");
  });

  test("should return 200 with a partial deletion when some events exist and others do not", async () => {
    const { body } = await request(app)
      .delete("/api/events")
      .send({ eventIds: [...validEventIds, ...invalidEventIds] })
      .expect(200);

    expect(body.success).toBe(true);
    expect(body.data.deletedIds).toEqual(expect.arrayContaining(validEventIds));
    expect(body.data.failedToDeleteIds).toEqual(expect.arrayContaining(invalidEventIds));
  });
});
