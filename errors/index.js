const CustomErrorAPI = require("./custom-error");
const BadRequestError = require("./bad-request");
const UnauthenticatedError = require("./unauthentication");
const NotFoundError = require("./not-found");

module.exports = {
  CustomErrorAPI,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
};
