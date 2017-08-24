'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  const version = sequelize.define('version', {
    current: DataTypes.INTEGER
  }, {
    timestamps: true,
    createdAt: false,
    classMethods: {
      associate: models => {}
    }
  });
  return version;
};