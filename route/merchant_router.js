const Merchant = require('../model/Merchant');
const User = require('../model/User');
const { respone_ok_data, validasi_data, forbidden, data_notfound, authorized } = require('../helper/http_response');

exports.createmerchant = async (req, res, next) => {
  try {
    const { user, name, description, name_bank, rekening } = req.body;
    const finduser = await User.findOne({ _id: user });
    if (finduser) {
      data_notfound(res, 'user not found');
    }
  } catch (error) {
    next(error);
  }
};
