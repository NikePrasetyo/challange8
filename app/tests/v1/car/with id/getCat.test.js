/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../../app");
// const { Car } = require("../../../../../app/models");

// Function for testing endpoint getCar
describe("GET /v1/cars/:id", () => {
  // To create dummy data for testing before every 'it' method
  //let car;
  
  // beforeEach(async () => {
  //   jest.setTimeout(10000);

  //   const id = 200;
  //   const name = "Mobile Command Center";
  //   const price = 5000000;
  //   const size = "LARGE";
  //   const image = "https://source.unsplash.com/519x519";
  //   const isCurrentlyRented = false;

  //   // Creating Dummy Data
  //   car = await Car.create({
  //     id,
  //     name,
  //     price,
  //     size,
  //     image,
  //     isCurrentlyRented,
  //   });

  //   return car;
  // });

  // Delete dummy data after every 'it' method
  //afterEach(() => car.destroy());

  // Method to state what the response from tested endpoint should've done
  it("should response with 200 as status code and res.json with newly car's instance", async () => {
    return request(app)
      // Requesting endpoint
      .get("/v1/cars/95")
      .then((res) => {
        // Enpoint's responses expectation
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
            size: expect.any(String),
            image: expect.any(String),
            isCurrentlyRented: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            // usercar: expect.any(Object),
          })
        );
      });
  });
});
