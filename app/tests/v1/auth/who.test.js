/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../app");
// const { Car } = require("../../../../../app/models");

// Function for testing endpoint getCar
describe("GET /v1/auth/whoami", () => {
  // Method to state what the response from tested endpoint should've done
  it("should response with 200 as status code and res.json with newly car's instance", async () => {
      const accessToken = await request(app).post("/v1/auth/login").send({
        email: "fikri@binar.co.id",
        password: "123456",
      });

    return (
      request(app)
        // Requesting endpoint
        .get("/v1/auth/whoami")
        .set("Authorization", `${accessToken.body.accessToken}`)
        .then((res) => {
          // Enpoint's responses expectation
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual(
            expect.objectContaining({
              ...res.body,
            })
          );
        })
    );
  });
});
