export default (sequelize, DataTypes) => {
  const responsible = sequelize.define('responsible', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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
      associate: models => {
        responsible.hasMany(models.equipment, {
          foreignKey: 'responsible_id',
          as: 'equipments'
        });
      }
    }
  });
  return responsible;
};