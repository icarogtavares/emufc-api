export default (sequelize, DataTypes) => {
  const equipment = sequelize.define('equipment', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    place_id: DataTypes.INTEGER,
    responsible_id: DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true,
    classMethods: {
      associate: models => {
        equipment.belongsTo(models.place, {
          foreignKey: 'place_id',
          as: 'place'
        });
        equipment.belongsTo(models.responsible, {
          foreignKey: 'responsible_id',
          as: 'responsible'
        });
      }
    }
  });
  return equipment;
};