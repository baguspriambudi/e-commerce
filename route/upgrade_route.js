const User = require('../model/User');
const { respone_ok_data, data_notfound } = require('../helper/http_response');

exports.upgrade_user = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.query.id });
    if (!user) {
      return data_notfound(res, 'user not found');
    }
    const upgrade = await User.findOneAndUpdate({ _id: req.query.id }, { premium: req.body.premium }, { new: true });
    respone_ok_data(res, 'succesfully update premium', upgrade);
  } catch (error) {
    next(error);
  }
};
