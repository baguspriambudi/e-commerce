const Product = require('../model/Product');
const User = require('../model/User');
const Merchant = require('../model/Merchant');
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
    const { name, image, descriptions, stock, merchant, price } = req.body;
    const findmerchant = await Merchant.findOne({ _id: req.body.merchant });
    if (!findmerchant) {
      return data_notfound(res, 'merchant not found');
    }
    const user = await User.findOne({ _id: req.user._id });
    if (user.premium != 'accept') {
      return validasi(res, 'the user has not been accept');
    }
    const product = await new Product({
      name: name,
      image: image,
      descriptions: descriptions,
      stock: stock,
      merchant: merchant,
      price: price,
    }).save();
    respone_ok_data(res, 'successfully create product', product);
  } catch (error) {
    next(error);
  }
};
