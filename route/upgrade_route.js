const User = require('../model/User');
const {
  respone_ok_data,
  validasi,
  validasi_data,
  forbidden,
  data_notfound,
  authorized,
} = require('../helper/http_response');

exports.upgrade_user = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.query.id });
    if (!user) {
      return data_notfound(res, 'user not found');
    }
    const upgrade = await User.findOneAndUpdate({ _id: req.query._id }, { premium: req.body.premium }, { new: true });
  } catch (error) {
    next(error);
  }
};
