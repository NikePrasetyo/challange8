//const express = require("express");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const bcrypt = require("bcryptjs");
require("dotenv").config()

const {
  ApplicationController,
  AuthenticationController,
  CarController,
} = require("./controllers");

const {
  User,
  Role,
  Car,
  UserCar,
} = require("./models");

function apply(app) {
  const carModel = Car;
  const roleModel = Role;
  const userModel = User;
  const userCarModel = UserCar;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, roleModel, userModel, });
  const carController = new CarController({ carModel, userCarModel, dayjs });

  const accessControl = authenticationController.accessControl;

  app.get("/", applicationController.handleGetRoot);

  app.get(process.env.LIST_CARS, carController.handleListCars);
  app.post(process.env.CREATE_CAR, authenticationController.authorize(accessControl.ADMIN), carController.handleCreateCar);
  app.post(process.env.RENT_CAR, authenticationController.authorize(accessControl.CUSTOMER), carController.handleRentCar);
  app.get(process.env.GET_CAR, carController.handleGetCar);
  app.put(process.env.UPDATE_CAR, authenticationController.authorize(accessControl.ADMIN), carController.handleUpdateCar);
  app.delete(process.env.DELETE_CAR, authenticationController.authorize(accessControl.ADMIN), carController.handleDeleteCar);

  app.post(process.env.LOGIN, authenticationController.handleLogin);
  app.post(process.env.REGISTER, authenticationController.handleRegister);
  app.get(process.env.GET_USER, authenticationController.authorize(accessControl.CUSTOMER), authenticationController.handleGetUser);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply, }
