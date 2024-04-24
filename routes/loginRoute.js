const express = require("express");
const login = require("../controllers/login.js");

const loginRouter = express.Router();

loginRouter.post("", login);

module.exports = loginRouter;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users authentication api
 */

/**
 * @swagger
 *   /auth/login:
 *     post:
 *       summary: login
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: Login success
 *           content:
 *             application/json:
 *               type: object
 *         500:
 *           description: Internal server error
 */
