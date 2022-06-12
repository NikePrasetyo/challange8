/* eslint-disable no-undef */
// const { INTEGER } = require("sequelize/types");
const request = require("supertest");
const app = require("../../../../../app");
const { Car } = require("../../../../../app/models");

describe("PUT /v1/cars/:id", () => {
    let car, accessToken;

  beforeEach(async () => {
    const id = 200;
    const name = "Mobile Command Center";
    const price = 5000000;
    const size = "LARGE";
    const image = "https://source.unsplash.com/519x519";
    const isCurrentlyRented = false;

    // Creating Dummy Data
    car = await Car.create({
      id,
      name,
      price,
      size,
      image,
      isCurrentlyRented,
    });

    accessToken = await request(app).post("/v1/auth/login").send({
      email: "soulcairn@gmail.com",
      password: "test",
    });

    return car, accessToken;
  });

  // Delete dummy data after every 'it' method
  afterEach(() => car.destroy());

  it("should response with 200 as status code", async () => {
    const name = "Kotsaka";
    const price = 15000000;
    const size = "LARGE";
    const image = "https://source.unsplash.com/519x519";

    return request(app)
      .put("/v1/cars/" + car.id)
      .set("Authorization", `${accessToken.body.accessToken}`)
      .set("Content-Type", "application/json")
      .send({ name, price, size, image })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            message: expect.any(String),
          })
        );
      });
  });

  it("should response with 422 as status code", async () => {
    const name = {};
    const price = {};
    const size = {};
    const image = {};

    return request(app)
      .put("/v1/cars/" + car.id)
      .set("Authorization", `${accessToken.body.accessToken}`)
      .set("Content-Type", "application/json")
      .send({ name, price, size, image })
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
});
