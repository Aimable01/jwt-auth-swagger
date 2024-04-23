const User = require("../models/schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid credentials,passwords do not match" });

    const token = jwt.sign({ id: user._id }, "jwtkey", { expiresIn: "24h" });
    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    console.log(`An error in logging in: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = login;
