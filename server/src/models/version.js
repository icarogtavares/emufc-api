module.exports = (sequelize, DataTypes) => {
  let version = sequelize.define('version', {
    current: DataTypes.INTEGER
  }, {
    timestamps: true,
    createdAt: false
  });
  return version;
};