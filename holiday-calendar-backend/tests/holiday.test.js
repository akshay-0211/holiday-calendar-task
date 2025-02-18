const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); // Import actual server
const Holiday = require("../models/Holiday");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Holiday API Tests", () => {
  let holidayId;

  test("Should add a holiday", async () => {
    const res = await request(app).post("/api/holidays").send({
      date: "2024-12-25",
      name: "Christmas",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Christmas");
    holidayId = res.body._id;
  });

  test("Should get all holidays", async () => {
    const res = await request(app).get("/api/holidays");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Should delete a holiday", async () => {
    const res = await request(app).delete(`/api/holidays/${holidayId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Holiday deleted successfully"); 
  });
});
