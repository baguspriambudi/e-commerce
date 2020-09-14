const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { validasi_data } = require("../help/http_respone");

exports.midRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return validasi_data("Validation Error", res, error.details);
  }
  next();
};
