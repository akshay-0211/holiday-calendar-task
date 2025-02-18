const request = require("supertest");
const app = require("../server"); // Import the app from server.js
const mongoose = require("mongoose");

// Use a connection string for the test database
const testDB = "mongodb://localhost:27017/test-db";

beforeAll(async () => {
  // Check if we are already connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(testDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  // Close the connection after tests
  await mongoose.connection.close();
});

test("GET /api/holidays should return holidays", async () => {
  const res = await request(app).get("/api/holidays");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /api/holidays should create a holiday", async () => {
  const res = await request(app).post("/api/holidays").send({
    date: "2025-01-01",
    name: "New Year",
  });
  expect(res.status).toBe(201);
  expect(res.body.name).toBe("New Year");
});
