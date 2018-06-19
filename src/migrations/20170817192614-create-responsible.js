export const up = (queryInterface, Sequelize) => queryInterface.createTable('responsible', {
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
  email: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  phone: {
    allowNull: false,
    type: Sequelize.STRING,
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
export const down = queryInterface => queryInterface.dropTable('responsible')
