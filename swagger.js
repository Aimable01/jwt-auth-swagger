const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "JWT authentication",
      version: "1.0.0",
      description: "This is the implementation of the JWT authentication",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", description: "Name of user" },
            email: { type: "string", description: "Email of user" },
            password: { type: "string", description: "Password of user" },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./routes/loginRoute.js", "./routes/registerRuote.js", "./index.js"],
};

module.exports = options;
