const request = require("supertest");
const app = require("../../app");

describe("test GET /launches", () => {
  test("it should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-type", /json/)
      .expect(200);

    // expect(response.status).toBe(200);
  });
});

describe("test POST /launches", () => {
  const launchData = {
    mission: "Kepler Explortation 104",
    rocket: "Explorer IS2",
    launchDate: "June 25, 2023",
    target: "Kepler-186 fbb",
  };

  const partialLaunchData = {
    mission: "Kepler Explortation 104",
    rocket: "Explorer IS2",
    target: "Kepler-186 fbb",
  };
  test("it should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchData)
      .expect("Content-type", /json/)
      .expect(201);

    const reqDate = new Date(launchData.launchDate).valueOf();
    const resDate = new Date(response.body.launchDate).valueOf();

    expect(response.body).toMatchObject(partialLaunchData);
    expect(reqDate).toBe(resDate);
  });
  test("it should catch missing required properties", async () => {
    const fail1 = await request(app)
      .post("/launches")
      .send({ ...launchData, mission: "" })
      .expect("Content-type", /json/)
      .expect(500);
    const fail2 = await request(app)
      .post("/launches")
      .send({ ...launchData, rocket: "" })
      .expect("Content-type", /json/)
      .expect(500);
    const fail3 = await request(app)
      .post("/launches")
      .send({ ...launchData, launchDate: "" })
      .expect("Content-type", /json/)
      .expect(500);
    const fail4 = await request(app)
      .post("/launches")
      .send({ ...launchData, target: "" })
      .expect("Content-type", /json/)
      .expect(500);
  });
  test("it should catch invalid date", async () => {
    const fail = await request(app)
      .post("/launches")
      .send({ ...launchData, launchDate: "hello" })
      .expect("Content-type", /json/)
      .expect(500);
  });
});
