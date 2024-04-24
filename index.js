const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const registerRouter = require("./routes/registerRuote.js");
const loginRouter = require("./routes/loginRoute.js");
const tokenCheck = require("./middleware/tokenCheck.js");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("./swagger");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// route endpoint
app.use("/auth/register", registerRouter);
app.use("/auth/login", loginRouter);

// protected route
app.get("/dashboard", tokenCheck, (req, res) => {
  res.send("You successfully logged in. Welcome to the dashboard");
});

app.get("/me", tokenCheck, (req, res) => {
  res.send(req.user);
});

const spacs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));

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

/**
 * @swagger
 *   /dashboard:
 *     get:
 *       summary: get home
 *       description: Access protected dashboard
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         '200':
 *           description: Success response
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '401':
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '404':
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 */
