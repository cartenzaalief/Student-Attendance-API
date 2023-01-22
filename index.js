const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const cors = require("cors");
const bearerToken = require("express-bearer-token");

app.use(express.json());
app.use(cors());
app.use(bearerToken());

const { checkSequelize, dbSequelize } = require("./src/config/db");
checkSequelize();
dbSequelize.sync();

app.get("/", (request, response) => {
  response.status(200).send("Attendance List API");
});

const { usersRouter } = require("./src/routers");
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`RUNNING API ${PORT}`));
