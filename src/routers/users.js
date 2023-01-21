const express = require("express");
const route = express.Router();
const { usersController } = require("../controllers");

route.get("/", usersController.getData);
route.post("/login", usersController.login);

module.exports = route;
