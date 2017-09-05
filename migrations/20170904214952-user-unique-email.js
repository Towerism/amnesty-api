'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'unique_email'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Users', 'unique_email')
  }
};
