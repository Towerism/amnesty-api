import bcrypt from 'bcrypt'

export default (sequelize, DataTypes) => {
  var User = sequelize.define('User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      },
      getterMethods: {
        fullname: function () {
          return `${this.firstname} ${this.lastname}`
        }
      }
    })
  return User
}
