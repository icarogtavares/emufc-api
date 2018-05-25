module.exports = (sequelize, DataTypes) => {
  const equipment = sequelize.define('equipment', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    timestamps: true,
    paranoid: true,
  })

  equipment.associate = (models) => {
    equipment.belongsTo(models.place, {
      foreignKey: {
        name: 'place_id',
        allowNull: false,
      },
    })
    equipment.belongsTo(models.responsible, {
      foreignKey: {
        name: 'responsible_id',
        allowNull: false,
      },
    })
  }

  return equipment
}
