'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.todo, {
        foreignKey:'user_id'
      })
    }
  };
  user.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "It must be email!"
        }
      },
      unique: {
        args: true,
        msg: 'Email already registered'
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM({
      values: ['admin', 'user'],
      defaultValue: 'user'
    })
  }, {
    // hooks: {
    //   beforeValidate: instance => {
    //     instance.email = instance.email.toLowerCase();
    //   },
    //   beforeCreate: instance => {
    //     instance.password = bcrypt.hashSync(instance.password, 10)
    //   }
    // },
    sequelize,
    modelName: 'user',
  });
  return user;
};