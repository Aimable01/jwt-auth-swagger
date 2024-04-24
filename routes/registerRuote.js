const express = require("express");
const register = require("../controllers/register.js");

const registerRouter = express.Router();

registerRouter.post("/", register);

module.exports = registerRouter;

/**
 * @swagger
 *   /auth/register:
 *     post:
 *       summary: user register
 *       tags: [User]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: registration success
 *           content:
 *             application/json:
 *               type: object
 *         500:
 *           description: Internal server error
 */
