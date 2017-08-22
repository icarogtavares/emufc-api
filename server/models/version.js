export default (sequelize, DataTypes) => {
  var version = sequelize.define('version', {
    current: DataTypes.INTEGER
  }, {
    timestamps: true,
    createdAt: false,
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return version;
};