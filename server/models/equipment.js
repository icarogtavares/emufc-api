export default (sequelize, DataTypes) => {
  var equipment = sequelize.define('equipment', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        equipment.belongsTo(models.place, {
          foreignKey: 'place_id'
        });
        equipment.belongsTo(models.responsible, {
          foreignKey: 'responsible_id'
        });
      }
    }
  });
  return equipment;
};