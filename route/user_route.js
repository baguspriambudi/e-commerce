const JWT = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_KEY;
const bcrypt = require('bcrypt');
const User = require('../model/User');
const {
  respone_ok_data,
  validasi,
  validasi_data,
  forbidden,
  data_notfound,
  authorized,
} = require('../helper/http_response');

exports.createuser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const finduser = await User.findOne({ username: username.toLowerCase() });

    if (finduser) {
      validasi(res, 'username already exist');
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await new User({
      username: username,
      password: passwordHash,
    }).save();
    respone_ok_data(res, 'Data succesfully inputed', user);
  } catch (error) {
    next(error);
  }
};

exports.createadmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const finduser = await User.findOne({ username: username.toLowerCase() });

    if (finduser) {
      validasi(res, 'username already exist');
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await new User({
      username: username,
      password: passwordHash,
      premium: 'none',
      role: 'admin',
    }).save();
    respone_ok_data(res, 'Data succesfully inputed', user);
  } catch (error) {
    next(error);
  }
};
