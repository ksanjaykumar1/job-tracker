const { StatusCodes } = require("http-status-codes");
const Logger = require("../logger/logger");

const logger = Logger.getLogger("./middleware/error-handler");
// const { CustomErrorAPI } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something Went wrong try later",
  };

  //   if (err instanceof CustomErrorAPI) {
  //     return res.status(err.statusCode).json({ msg: err.message });
  //   }

  // mongoose validation Error
  if (err.name === "ValidationError") {
    logger.info(JSON.stringify(err));
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");

    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // duplicate mongoose error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate Value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // caste error

  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.vaue}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  //   return res
  //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //     .json({ msg: "Internal Server Error", error: err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
