'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('Accounts', 'balance')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Accounts', 'balance', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    })
  },
}
