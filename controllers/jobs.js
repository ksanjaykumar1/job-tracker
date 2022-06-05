const getAllJobs = async (req, res) => {
  res.send("getAllJobs job");
};

const getJob = async (req, res) => {
  res.send("getJob job");
};

const createJob = async (req, res) => {
  res.send("create job job");
};

const updateJob = async (req, res) => {
  res.send("updateJob job");
};

const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
