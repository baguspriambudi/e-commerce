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
    console.log(dana);
    const finduser = await User.findOne({ _id: user });
    if (!finduser) {
      return data_notfound(res, 'user not found');
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
