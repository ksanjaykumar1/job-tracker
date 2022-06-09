require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const connectDB = require("./db/connect");
const Logger = require("./logger/logger");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const logger = Logger.getLogger("./app");

const jobs = require("./routes/jobs");
const auth = require("./routes/auth");
const authMiddlware = require("./middleware/auth");

//security packages

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json({ extended: false }));

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMS: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send('<h1>Job Tracker API</h1> <a href="/api-docs"></a>');
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/auth", auth);
app.use("/api/v1/jobs", authMiddlware, jobs);

app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    logger.info("Connected to Mongo DB");
    app.listen(PORT, () => logger.info(`Server started on ${PORT}..`));
  } catch (error) {
    logger.error("Failed to connect to Mongo DB", error);
    process.exit(1);
  }
};

start();
