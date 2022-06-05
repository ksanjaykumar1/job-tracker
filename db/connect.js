const mongooes = require("mongoose");

connectDB = (url) => {
  return mongooes.connect(url);
};

module.exports = connectDB;
