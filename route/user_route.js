const bcrypt = require('bcrypt');
const User = require('../model/User');

const { respone_ok_data, validasi, data_notfound } = require('../helper/http_response');

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

exports.updateUserWallet = async (req, res, next) => {
  try {
    const { wallet } = req.body;
    // eslint-disable-next-line radix
    const int = parseInt(wallet);
    const findwallet = await User.findOne({ _id: req.query.user_id });
    if (!findwallet) {
      return data_notfound(res, 'User not found');
    }
    const user = await User.updateOne({ _id: findwallet }, { wallet: int + findwallet.wallet });
    respone_ok_data(res, 'fund succesfull added', user);
  } catch (error) {
    next(error);
  }
};
