exports.respone_ok_data = (res, msg, data) => {
  res.status(200).json({
    status: 200,
    msg: msg,
    data: data,
  });
};

// mengecek kebenaran data validasi
exports.validasi = (res, msg) => {
  res.status(400).json({
    status: 400,
    msg: msg,
  });
};

//validasi with data error
exports.validasi_data = (res, msg, error) => {
  res.status(400).json({
    status: 400,
    msg: msg,
    error: error,
  });
};

// mengecek apakah bener apa nggak email atau password atau token
exports.authorized = (res, msg) => {
  res.status(401).json({
    status: 401,
    msg: msg,
  });
};
// akses untuk token atau dengan kode tertentu
exports.forbidden = (res, msg) => {
  res.status(403).json({
    status: 403,
    msg: msg,
  });
};
// jika yang dicari tidak ada
exports.data_notfound = (res, msg) => {
  res.status(404).json({
    status: 404,
    msg: msg,
  });
};
