const express = require("express");
const route = express.Router();
const { usersController } = require("../controllers");
const { readToken } = require("../config/encript");

route.get("/", usersController.getData);
route.post("/login", usersController.login);
route.post("/register", usersController.register);
route.get("/keep", readToken, usersController.keepLogin);

module.exports = route;
