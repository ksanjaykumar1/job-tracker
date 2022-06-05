const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const bcrypt = require('bcryptjs')

const register = async (req, res) => {

    const { name, email, password }= req.body

    // salt is random bytes 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    
    const tempUser ={
        name,
        email,
        password:hashedPassword
    }

  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({user});
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
