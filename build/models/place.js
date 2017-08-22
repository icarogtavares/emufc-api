'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (sequelize, DataTypes) => {
  var place = sequelize.define('place', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["^[a-z]+$", 'i'],
        len: [1, 50]
      }
    },
    latitude: DataTypes.DECIMAL(10, 6),
    longitude: DataTypes.DECIMAL(10, 6)
  }, {
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate: function (models) {
        place.hasMany(models.equipment, {
          foreignKey: 'place_id',
          as: 'equipments'
        });
      }
    }
  });
  return place;
};