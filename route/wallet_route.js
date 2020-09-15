const Wallet = require('../model/Wallet');
const User = require('../model/User');
const {
  respone_ok_data,
  validasi,
  validasi_data,
  forbidden,
  data_notfound,
  authorized,
} = require('../helper/http_response');

exports.wallet = async (req, res, next) => {
  try {
    const user = req.user._id;
    const dana = req.body.dana;
    const finduser = await User.findOne({ _id: user });
    if (!finduser) {
      return data_notfound(res, 'user not found');
    }
    const findwallet = await Wallet.findOne({ user: user });
    if (findwallet) {
      return validasi(res, 'user has created wallet');
    }
    const wallet = await new Wallet({
      dana: dana,
      user: user,
    }).save();
    respone_ok_data(res, 'fund filled in the wallet', wallet);
  } catch (error) {
    next(error);
  }
};

exports.updatewallet = async (req, res, next) => {
  try {
    const findwallet = await Wallet.findOne({ _id: req.query.id });
    if (!findwallet) {
      data_notfound(res, 'Id wallet not found');
    }
    const wallet = await Wallet.updateOne({ _id: findwallet }, { dana: +req.body.dana + +(+findwallet.dana) });
    respone_ok_data(res, 'fund succesfull added', wallet);
  } catch (error) {
    next(error);
  }
};
