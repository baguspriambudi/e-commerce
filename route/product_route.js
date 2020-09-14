const Product = require('../model/Product');
const User = require('../model/User');
const {
  respone_ok_data,
  validasi,
  validasi_data,
  forbidden,
  data_notfound,
  authorized,
} = require('../helper/http_response');

exports.createproduct = async (req, res, next) => {
  try {
    const { name, image, descriptions, stock } = req.body;
    const user = await User.findOne({});
    const product = await new Product({ name: name, image: image, descriptions: descriptions, stock: stock }).save();
  } catch (error) {
    next(error);
  }
};
