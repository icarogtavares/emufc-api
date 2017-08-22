export default (sequelize, DataTypes) => {
  var responsible = sequelize.define('responsible', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail : true,
        notEmpty: true
      }
    },
    phone: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        responsible.hasMany(models.equipment, {
          foreignKey: 'responsible_id',
          as: 'equipments'
        });
      }
    }
  });
  return responsible;
};