const Joi = require('joi');
// const { objectId } = require('./custom.validation');

const createTutorial = {
  body: Joi.object().keys({
    mobile: Joi.string()
    .min(10)
    .max(12),
  }),
  
};

const verifyOtp = {
  body: Joi.object().keys({
    mobile: Joi.string()
    .min(10)
    .max(12),

    otp: Joi.number().integer().min(100000).max(999999).required(),
  }),
  
};


module.exports = {
  createTutorial,
  verifyOtp
};
