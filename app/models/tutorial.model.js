const Joi = require('joi');

module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("Tutorial", {
    mobile: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    otp: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  });

  return Tutorial;
};
