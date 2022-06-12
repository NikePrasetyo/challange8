/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../app");

describe("POST /v1/cars", () => {
//   let accessToken;

//   beforeEach(async () => {
    // accessToken = await request(app).post("/v1/auth/login").send({
    //   email: "keyblade@gmail.com",
    //   password: "test",
    // });

//     return accessToken;
//   });

//   console.log("TESTING - ISI accessToken: " + accessToken)

  let accessToken;

  beforeEach(async () => {
    accessToken = await request(app).post("/v1/auth/login").send({
      email: "soulcairn@gmail.com",
      password: "test",
    });

    return accessToken;
  })

  it("should response with 201 as status code and should response ", async () => {
    const name = "Range Rover MX1";
    const price = 5000000;
    const image = "string";
    const size = "MEDIUM";

    // console.log("TESTING - ISI accessToken: " + JSON.stringify(accessToken.body));

    return request(app)
      .post("/v1/cars")
      .set("Authorization", `${accessToken.body.accessToken}`)
      .set("Content-Type", "application/json")
      .send({ name, price, image, size })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            ...res.body,
            name,
            price,
            image,
            size,
          })
        );
      });
  });

  it("should response with 422 as status code", async () => {
    const name = {};
    const price = {};
    const image = {};
    const size = {};

    return request(app)
      .post("/v1/cars")
      .set("Authorization", `${accessToken.body.accessToken}`)
      .set("Content-Type", "application/json")
      .send({ name, price, image, size })
      .then((res) => {
        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: {
              name: expect.any(String),
              message: expect.any(String),
            },
          })
        );
      });
  });

  it("should response with 401 as status code", async () => {
    const name = {};
    const price = {};
    const image = {};
    const size = {};

    return request(app)
      .post("/v1/cars")
      .set("Content-Type", "application/json")
      .send({ name, price, image, size })
      .then((res) => {
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: {
              name: expect.any(String),
              message: expect.any(String),
              details: null,
            },
          })
        );
      });
  });
});
