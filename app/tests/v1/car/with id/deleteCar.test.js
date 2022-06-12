/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../../app");
const { Car } = require("../../../../../app/models");

describe("DELETE /v1/cars/:id", () => {
  let car, accessToken;

  beforeEach(async () => {
    //jest.setTimeout(10000);
    const id = 2000;
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
    return request(app)
      .delete("/v1/cars/" + car.id)
      .set("Authorization", `${accessToken.body.accessToken}`)
      .then((res) => {
        expect(res.statusCode).toBe(204);
      });
  });

  it("should response with 422 as status code", async () => {
      const carError = {
        id: {},
        name: {},
        price: {},
        size: {},
        image: {},
        isCurrentlyRented: {},
      };

    return request(app)
      .delete("/v1/cars/" + carError.id)
      .set("Authorization", `${accessToken.body.accessToken}`)
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
