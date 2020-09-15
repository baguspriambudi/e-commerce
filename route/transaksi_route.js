const Transaksi = require('../model/Transaksi');
const Product = require('../model/Product');
const User = require('../model/User');
const Wallet = require('../model/Wallet');
const Merchant = require('../model/Merchant');
const {
  respone_ok_data,
  validasi,
  validasi_data,
  forbidden,
  data_notfound,
  authorized,
} = require('../helper/http_response');

exports.transaksi = async (req, res, next) => {
  try {
    const { product } = req.body;
    const pembeli = req.user._id;
    const tgl = new Date();
    const find_pembeli = await User.findOne({ _id: pembeli });
    if (!find_pembeli) {
      return data_notfound(res, 'pembeli not found');
    }
    const find_product = await Product.findOne({ _id: req.body.product });
    if (!find_product) {
      return data_notfound(res, 'product not found');
    }
    //const create_transaksi = await new Transaksi({ product: product, pembeli: pembeli, tgl: tgl }).save();
    const merchant = await Merchant.findOne({ _id: find_product.merchant });
    const wallet_merchant = await Wallet.findOne({ user: merchant.user });
    if (create_transaksi) {
      await Wallet.updateOne({ _id: wallet_merchant._id }, { dana: find_product.price });
    }
    if (create_transaksi) {
      await Product.updateOne({ _id: req.body.product }, { stock: find_product.stock - 1 });
    }
    respone_ok_data(res, 'successfuly create your transaction', create_transaksi);
  } catch (error) {
    next(error);
  }
};
