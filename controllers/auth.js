const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const Logger = require('../logger/logger')
const logger = Logger.getLogger('./controllers/auth')
const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Provide username and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invaild Credentials");
  }

  const isMatch = await user.comparePassword(password)
  logger.info("Password match ==>",isMatch)
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid Password");
  }

  // compare password

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ token, user: { name: user.name } });
};

module.exports = {
  register,
  login,
};
