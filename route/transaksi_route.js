const Transaksi = require('../model/Transaksi');
const Product = require('../model/Product');
const User = require('../model/User');
const Merchant = require('../model/Merchant');
const { respone_ok_data, validasi, data_notfound } = require('../helper/http_response');

exports.transaksi = async (req, res, next) => {
  try {
    const { product, qty } = req.body;
    const pembeli = req.user._id;
    const tgl = new Date();
    const find_pembeli = await User.findOne({ _id: pembeli });
    if (!find_pembeli) {
      return data_notfound(res, 'customer not found');
    }
    const find_product = await Product.findOne({ _id: req.body.product });
    if (!find_product) {
      return data_notfound(res, 'product not found');
    }
    if (find_product.stock === 0) {
      return validasi(res, 'stock product empty');
    }
    const merchant = await Merchant.findOne({ _id: find_product.merchant });
    const findUserInMerchant = await User.findOne({ _id: merchant.user });
    const walletMerchant = findUserInMerchant.wallet;
    const walletCustomer = find_pembeli.wallet;
    // eslint-disable-next-line radix
    const intPrice = parseInt(find_product.price);
    if (find_product.price > walletCustomer) {
      return validasi(res, 'dana is not enough');
    }
    const create_transaksi = await new Transaksi({ product: product, pembeli: pembeli, tgl: tgl, qty: qty }).save();
    if (create_transaksi) {
      await User.updateOne({ _id: findUserInMerchant._id }, { wallet: walletMerchant + intPrice });
      await Product.updateOne({ _id: req.body.product }, { stock: find_product.stock - qty });
      await User.updateOne({ _id: pembeli }, { wallet: find_pembeli.wallet - intPrice });
    }
    respone_ok_data(res, 'successfuly create your transaction', create_transaksi);
  } catch (error) {
    next(error);
  }
};

exports.viewusertransaction = async (req, res, next) => {
  try {
    const findtransaction = await Transaksi.find({ pembeli: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'product',
        select: 'name',
        populate: { path: 'merchant', populate: { path: 'user', select: '-password' } },
      })
      .populate({ path: 'pembeli', select: '-password' });
    respone_ok_data(res, 'transaction founded', findtransaction);
  } catch (error) {
    next(error);
  }
};
