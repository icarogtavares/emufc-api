module.exports = (sequelize, DataTypes) => {
  const version = sequelize.define('version', {
    current: DataTypes.INTEGER,
  }, {
    timestamps: true,
    createdAt: false,
  })
  return version
}
