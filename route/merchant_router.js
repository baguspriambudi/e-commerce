const Merchant = require('../model/Merchant');
const User = require('../model/User');
const {
  respone_ok_data,
  validasi_data,
  forbidden,
  data_notfound,
  authorized,
  validasi,
} = require('../helper/http_response');

exports.createmerchant = async (req, res, next) => {
  try {
    const user = req.user._id;
    const { name, description, name_bank, rekening } = req.body;
    const finduser = await User.findOne({ _id: user });
    const findmerchant = await Merchant.findOne({ user: user });
    if (!finduser) {
      return data_notfound(res, 'user not found');
    }
    if (findmerchant) {
      return validasi(res, 'user has have a merchant');
    }
    const merchant = await new Merchant({
      user: user,
      name: name,
      description: description,
      name_bank: name_bank,
      rekening: rekening,
    }).save();
    if (merchant) {
      await User.updateOne({ _id: finduser }, { premium: 'pending' });
    }
    respone_ok_data(res, 'Data merchant succesfull inputed, wait confirm from admin', merchant);
  } catch (error) {
    next(error);
  }
};
