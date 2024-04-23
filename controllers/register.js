const User = require("../models/schema.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  try {
    const { name, email, password } = req.body;
    const { error, value } = userSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details.map((d) => d.message) });

    const hashedPassword = bcrypt.hashSync(password, 10);

    await new User({ name, email, password: hashedPassword }).save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Failed to create user ", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = register;
