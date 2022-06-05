require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const PORT = process.env.PORT

const connectDB = require("./db/connect");
const Logger = require("./logger/logger");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const logger = Logger.getLogger("./app");

const jobs = require('./routes/jobs')
const auth = require('./routes/auth')

app.use(express.json({ extended: false }));

app.use('/api/v1/auth',auth)
app.use('/api/v1/jobs',jobs)


app.use(errorHandlerMiddleware)
app.use(notFound)



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
