const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Logger = require("../logger/logger");
const logger = Logger.getLogger("../middlware/auth");
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authenctication invalid ");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    logger.info(JSON.stringify(payload));

    // const user = User.findById(payload.userId).select('-password')
    // req.user = user

    // attach user to job route
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
