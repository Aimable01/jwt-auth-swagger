const express = require("express");
const login = require("../controllers/login.js");

const loginRouter = express.Router();

loginRouter.post("", login);

module.exports = loginRouter;
