const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const { validasi_data } = require('../helper/http_response');

exports.midRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return validasi_data(res, 'Validation Error', error.details);
  }
  next();
};

exports.midUpgradeUser = (req, res, next) => {
  const schema = Joi.object({
    premium: Joi.string().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return validasi_data(res, 'Validation Error', error.details);
  }

  const schema2 = Joi.object({
    id: Joi.objectId().required(),
  }).options({ abortEarly: false });

  const isvalid2 = schema2.validate(req.query);
  if (isvalid2.error) {
    return validasi_data(res, 'Validation Error', error.details);
  }
  next();
};
