const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const PORT = 4000;
const dotenv = require('dotenv');
dotenv.config();

const schema_mid = require('./midlleware/schema');
const auth_mid = require('./midlleware/auth');

const user_route = require('./route/user_route');
const merchant_route = require('./route/merchant_router');
const login = require('./route/login_route');
const upgrade = require('./route/upgrade_route');
const product = require('./route/product_route');
const wallet = require('./route/wallet_route');
const transaksi = require('./route/transaksi_route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('mongodb connected'))
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'e-commerce service up and running!',
    environment: process.env.NODE_ENV,
    timestamp: new Date(),
  });
});

const router = express.Router();
router.post('/auth/register/user', schema_mid.midRegister, user_route.createuser);
router.post('/auth/register/admin', schema_mid.midRegister, user_route.createadmin);
router.post('/auth/login', login.login);
router.post('/auth/user_upgrade', auth_mid.isAdmin, upgrade.upgrade_user);
router.post('/merchant/create', auth_mid.isUser, schema_mid.midMercahnt, merchant_route.createmerchant);
router.post('/product/create', auth_mid.isUser, schema_mid.midProduct, product.createproduct);
router.post('/wallet', auth_mid.isUser, schema_mid.midWallet, wallet.wallet);
router.post('/wallet/update', auth_mid.isUser, schema_mid.midUpdatewallet, wallet.updatewallet);
router.post('/transaksi/create', auth_mid.isUser, schema_mid.midTransaksi, transaksi.transaksi);
app.use('/api/v1', router);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    error: error.message,
  });
});

app.listen(PORT, console.log('listening to PORT ' + PORT));
