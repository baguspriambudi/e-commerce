const User = require('../model/User');
const { respone_ok_data, data_notfound, validasi } = require('../helper/http_response');

exports.upgrade_user = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.query.user_id });
    if (!user) {
      return data_notfound(res, 'user not found');
    }
    if (user.premium === 'accept') {
      return validasi(res, 'user already accpet');
    }
    const upgrade = await User.findOneAndUpdate(
      { _id: req.query.user_id },
      { premium: req.body.premium },
      { new: true },
    );
    respone_ok_data(res, 'succesfully update premium', upgrade);
  } catch (error) {
    next(error);
  }
};
