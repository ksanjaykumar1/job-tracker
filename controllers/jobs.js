const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const Logger = require("../logger/logger");
const { NotFoundError, BadRequestError } = require("../errors");
const logger = Logger.getLogger("./controllers/jobs");

const getAllJobs = async (req, res) => {
  const user = req.user;

  const jobs = await Job.find({ createdBy: user.userId });
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  // destructuring data and assigning id to jobId variable
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  logger.info("JOB ID==>", jobId);
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`Job doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  // const user = req.user;
  // const job = await Job.create({ ...req.body, createdBy: user.userId });

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  return res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or position fields cannot be empty");
  }

  const job = Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new NotFoundError(" Job doesn't exit");
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: JobId },
  } = req;
  const job = await Job.findOneAndDelete({ _id: JobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError("Job doesn't Exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Job Deleted", job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
