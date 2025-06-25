'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Transaction_types', [
      {
        id: 1,
        name: 'Entrada',
        description: 'Transação de entrada de recursos',
        createdAt: new Date(), // Define a data atual
        updatedAt: new Date(), // Define a data atual
      },
      {
        id: 2,
        name: 'Saída',
        description: 'Transação de saída de recursos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transaction_types', null, {})
  },
}
