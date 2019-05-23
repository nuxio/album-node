const bcrypt = require("bcryptjs");
const mongoose = require("../db");

const SALT = bcrypt.genSaltSync();
const userSchema = new mongoose.Schema({
  name: String,
  password: String
});
const User = mongoose.model("User", userSchema);

const findUserByName = function(name) {
  return User.findOne({ name });
};

const createUser = async function(name, password, ...rest) {
  const exist = await findUserByName(name);

  if (exist) {
    return Promise.resolve("User name exists!");
  }

  const user = new User({
    name,
    password: bcrypt.hashSync(password, SALT),
    ...rest
  });

  return user.save();
};

const login = async function(name, password) {
  const exist = await findUserByName(name);
  if (exist && bcrypt.compareSync(password, exist.password)) {
    return true;
  } else {
    return false;
  }
};

const deleteTestData = function() {
  return User.deleteMany({});
};

module.exports = {
  createUser,
  findUserByName,
  login,
  deleteTestData
};
