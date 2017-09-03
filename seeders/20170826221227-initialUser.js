var bcrypt = require('bcrypt')

const initialUser = {
  id: 1,
  email: 'admin@amnesty',
  password: 'Password2',
  firstname: 'Patty',
  lastname: 'Najera',
  createdAt: new Date(),
  updatedAt: new Date()
}

const saltRounds = 10

module.exports = {
  up(queryInterface, Sequelize) {
    return bcrypt.hash(initialUser.password, saltRounds).then(hash => {
      initialUser.password = hash
      return queryInterface.bulkInsert('Users', [initialUser])
    })
  },
  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
