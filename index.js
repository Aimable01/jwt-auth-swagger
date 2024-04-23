import express from "express";
import mongoose from "mongoose";

const app = express();

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
