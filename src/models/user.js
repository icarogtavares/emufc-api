const { genSaltSync, hashSync } = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: ['^[a-z]+$', 'i'],
          len: [1, 40],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'email',
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      access_token: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: false,
      hooks: {
        beforeCreate: (user) => { // eslint-disable-line no-shadow
          const salt = genSaltSync()
          user.password = hashSync(user.password, salt) // eslint-disable-line no-param-reassign
        },
      },
    }
  )

  return user
}
