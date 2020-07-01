import request from 'supertest'
import randomString from 'random-string'
import moment from 'moment'
import {
  uuid
} from '../../../utils/uuid'
import models from '../../../models'

const app = require('../../../app')

let user

beforeAll(async () => {
  // 사용자 2명 생성
  await models.User.create({
    email: randomString() + '@test.com',
    nickName: randomString(),
    phoneNumber: '010-1237-4568',
    password: randomString(),
    birthDay: moment("1993-12-25").format('YYYY-MM-DD hh:mm:ss')
  })

  user = await models.User.create({
    email: randomString() + '@test.com',
    nickName: randomString(),
    phoneNumber: '010-123-456',
    password: randomString(),
    birthDay: moment("1993-12-28").format('YYYY-MM-DD hh:mm:ss')
  })

})

afterAll(() => models.sequelize.close())

describe('GET: /v1/users', () => {

  test('전체 사용자 조회. | 200', async () => {
    let response = await request(app)
      .get(`/v1/users`)

    expect(response.body.length)
      .toBeGreaterThan(1)
  })

  test('uuid 로 사용자 조회. | 200', async () => {
    let response = await request(app)
      .get(`/v1/users/${user.uuid}`)

    expect(response.body.email)
      .toBe(user.email)
  })

  test('잘못된 uuid 로 사용자 조회. | 404', async () => {
    let response = await request(app)
      .get(`/v1/users/${uuid()}`)

    expect(response.statusCode)
      .toBe(404)
  })
})