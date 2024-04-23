const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const registerRouter = require("./routes/registerRuote.js");
const loginRouter = require("./routes/loginRoute.js");
const tokenCheck = require("./middleware/tokenCheck.js");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// route endpoint
app.use("/auth/register", registerRouter);
app.use("/auth/login", loginRouter);

// protected route
app.get("/", tokenCheck, (req, res) => {
  res.send("You successfully logged in. Welcome to the dashboard");
});

// mongodb connection
mongoose
  .connect("mongodb://localhost/jwt_auth_db")
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(3000, () => console.log("App running on port: 3000"));
  })
  .catch((e) => {
    console.log(`An error in connecting to mongodb: ${e}`);
  });
