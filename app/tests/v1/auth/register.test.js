/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../../../../app");
// const { userDe } = require("../../../../app/models/user");

describe("POST /v1/auth/register", () => {
  // beforeEach(async () => {
  //   const id = 200;
  //   const name = "Rick Sanchez";
  //   const roleId = 2;
  //   const email = "theSmartest@SDN.com";
  //   const encryptedPassword = "$2a$10$dPTLsK0IlF6bnK8fG7PRD.4NINx8oS91pX2wHAgC1107G1y2C4IN6";

  // Creating Dummy Data
  //   user = await User.create({
  //     id,
  //     name,
  //     email,
  //     encryptedPassword,
  //     roleId,
  //   });

  //   return user;
  // });

  // const name = "Rick Sanchez";

  // Delete dummy data after every 'it' method

  // afterEach(async () => {
  //   userDe.findOne({
  //     attributes: ["name"],
  //     where: { 
  //       name: 'Sanchez',
  //     },
  //   });
  //   userDe.destroy();
  // });

  it("should response with 201 as status code and should response ", async () => {
    const name = "Testing Account";
    // const email = "theSmartest@SDN.com";
    const email = `test${Math.random().toString().substring(12)}@testing.com`;
    const password = "test";

    return request(app)
      .post("/v1/auth/register")
      .set("Content-Type", "application/json")
      .send({ name, email, password })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            accessToken: expect.any(String),
          })
        );
      });
  });

  it("should response with default as status code", async () => {
    const name = {};
    const email = {};
    const password = {};

    return request(app)
      .post("/v1/auth/register")
      .set("Content-Type", "application/json")
      .send({ name, email, password })
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual(expect.any(Object));
        // expect(res.body).toEqual(
        //   expect.objectContaining({
        //     error: {
        //       code: expect.any(String),
        //       message: expect.any(String),
        //       details: expect.arrayContaining([expect.any(Object)]),
        //     },
        //   })
        // );
      });
  });
});
