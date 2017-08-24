export default (sequelize, DataTypes) => {
  const equipment = sequelize.define('equipment', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate: models => {
        equipment.belongsTo(models.place, {
          foreignKey: 'place_id',
          as: 'Place'
        });
        equipment.belongsTo(models.responsible, {
          foreignKey: 'responsible_id',
          as: 'Responsible'
        });
      }
    }
  });
  return equipment;
};