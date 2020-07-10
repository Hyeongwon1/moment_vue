
'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'momentUsers',
      'uuid', {
        allowNull: false,
        unique: true,
        type: 'BINARY(16)',
        after: 'id'
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'momentUsers',
      'uuid',
    )
  }
}
