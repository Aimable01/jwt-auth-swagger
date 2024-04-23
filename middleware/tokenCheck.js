const jwt = require("jsonwebtoken");

const tokenCheck = (req, res, next) => {
  const authHead = req.headers["authorization"];
  const token = authHead && authHead.split(" ")[1];

  if (!token) return res.status(404).json({ message: "No token found" });

  jwt.verify(token, "jwtkey", (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expired, please login again" });
      }
      res.status(403).json({ message: "Invalid token" });
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = tokenCheck;
