const JWT = require('jsonwebtoken');
const User = require('../model/User');

const JWTsecret = process.env.JWT_KEY;
const { forbidden, authorized, validasi_data, data_notfound } = require('../helper/http_response');

exports.isAdmin = async (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    if (!headers) {
      return forbidden(res, 'please provide token');
    }

    const token = headers.split(' ')[1];
    const decode = JWT.verify(token, JWTsecret);
    req.user = decode;

    const admin = await User.findById({ _id: req.user._id });
    if (!admin) {
      return data_notfound(res, 'User not found');
    }
    if (req.user.role !== 'admin') {
      return authorized(res, 'User is not acces');
    }
    next();
  } catch (error) {
    return validasi_data(res, 'validation error', error.message);
  }
};

exports.isUser = async (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    if (!headers) {
      return forbidden(res, 'please provide token');
    }

    const token = headers.split(' ')[1];
    const decode = JWT.verify(token, JWTsecret);
    req.user = decode;

    const find = await User.findById({ _id: req.user._id });
    if (!find) {
      return data_notfound(res, 'User not found');
    }
    if (req.user.role !== 'user') {
      return authorized(res, 'User is not acces');
    }
    next();
  } catch (error) {
    return validasi_data(res, 'validation error', error.message);
  }
};
