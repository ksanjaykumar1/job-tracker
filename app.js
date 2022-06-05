require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const PORT = process.env.PORT

const connectDB = require("./db/connect");
const Logger = require("./logger/logger");
const logger = Logger.getLogger("./app");

app.use(express.json({ extended: false }));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    logger.info('Connected to Mongo DB')
    app.listen(PORT, ()=> logger.info(`Server started on ${PORT}..`))
  } catch (error) {
    logger.error("Failed to connect to Mongo DB", error);
    process.exit(1);
  }
};

start()
