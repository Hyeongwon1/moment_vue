import randomString from 'random-string'
import moment from 'moment'
import {
  uuid
} from '../../utils/uuid'
import models from '../../models'

afterAll(() => models.sequelize.close())

test('ordered UUID 가 출력되어야 합니다.', () => {
  const orderedUuid = uuid()

  expect(orderedUuid)
    .toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})

test('사용자를 생성하면 uuid 가 정상 생성되어야 합니다', async () => {
  const user = await models.User.create({
    email: randomString() + '@test.com',
    nickName: randomString(),
    phoneNumber: '010-1237-4569',
    password: randomString(),
    birthDay: moment("1993-12-21").format('YYYY-MM-DD hh:mm:ss')
  })

  expect(user.uuid)
    .toMatch(/\b4[0-9A-Fa-f]{31}\b/g)
})