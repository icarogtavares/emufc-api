'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  var responsible = sequelize.define('responsible', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate: function (models) {
        responsible.hasMany(models.equipment, {
          foreignKey: 'responsible_id',
          as: 'equipments'
        });
      }
    }
  });
  return responsible;
};