'use strict'

import moment from 'moment'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'test@test.com',
          nickName:'코롱이',
          phoneNumber:'010-1111-2222',
          password: 'test1234',
          birthDay: moment("1993-12-25").format('YYYY-MM-DD hh:mm:ss'),
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        },
        {
          email: 'test1@test.com',
          nickName:'호롱이',
          phoneNumber:'010-1111-2272',
          password: 'test1234',
          birthDay: moment("1985-12-25").format('YYYY-MM-DD hh:mm:ss'),
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        },
        {
          email: 'test2@test.com',
          nickName:'포롱이',
          phoneNumber:'010-1111-7222',
          password: 'test1234',
          birthDay: moment("1995-12-25").format('YYYY-MM-DD hh:mm:ss'),
          createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD hh:mm:ss')
        }
      ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}