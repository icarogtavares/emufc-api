import { genSaltSync, hashSync, compareSync } from 'bcrypt'

export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["^[a-z]+$",'i'],
        len: [1,40]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail : true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    access_token: DataTypes.STRING
  }, 
  {
    timestamps: true,
    paranoid: true,
    hooks: {
       beforeCreate: user => {
        const salt = genSaltSync();
        user.password = hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate: models => {
      },
      isPassword: (encodedPassword, password) => {
        return compareSync(password, encodedPassword);
      }
    }
  });
  return user;
};