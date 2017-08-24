export default (sequelize, DataTypes) => {
  let equipment = sequelize.define('equipment', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: true,
    paranoid: true
  });

  equipment.associate = models => {
    equipment.belongsTo(models.place, {
      foreignKey: 'place_id'
    });
    equipment.belongsTo(models.responsible, {
      foreignKey: 'responsible_id'
    });
  };

  return equipment;
};