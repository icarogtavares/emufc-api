export const up = (queryInterface, Sequelize) => queryInterface.createTable('place', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  latitude: {
    allowNull: false,
    type: Sequelize.DECIMAL(10, 6),
  },
  longitude: {
    allowNull: false,
    type: Sequelize.DECIMAL(10, 6),
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
})

export const down = (queryInterface, Sequelize) => queryInterface.dropTable('place')
