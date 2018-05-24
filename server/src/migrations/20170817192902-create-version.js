export const up = (queryInterface, Sequelize) => queryInterface.createTable('version', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  current: {
    type: Sequelize.INTEGER,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
})
export const down = (queryInterface, Sequelize) => queryInterface.dropTable('version')
