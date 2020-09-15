const Transaksi = require('../model/Transaksi');
const Product = require('../model/Product');
const User = require('../model/User');
const Wallet = require('../model/Wallet');
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
    const { product, pembeli } = req.body;
    const tgl = new Date();
    const find_pembeli = await User.findOne({ _id: req.user._id });
    if (!find_pembeli) {
      return data_notfound(res, 'pembeli not found');
    }
    const find_product = await Product.findOne({ _id: req.body.product });
    if (!find_product) {
      return data_notfound(res, 'product not found');
    }
    const create_transaksi = await new Transaksi({ product: product, pembeli: pembeli, tgl: tgl }).save();
    if (create_transaksi) {
      await Product.updateOne({ _id: req.body.product }, { stock: find_product.stock - 1 });
    }
    const wallet = await Wallet.findOne({ user: req.user._id });
    if (create_transaksi) {
      await Wallet.updateOne({ _id: wallet._id }, { dana: +find_product.price });
    }
    respone_ok_data(res, 'successfuly create your transaction', create_transaksi);
  } catch (error) {
    next(error);
  }
};
