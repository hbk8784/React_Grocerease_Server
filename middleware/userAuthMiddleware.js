const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(400).json({ message: "Token not Found Or Wrong Token" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_STRING);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = auth;
