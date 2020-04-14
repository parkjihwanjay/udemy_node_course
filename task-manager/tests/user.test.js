const request = require('supertest');
const app = require('../src/app.js');
const User = require('../src/models/user.js');

const {userOneId, userOne, setupDatabase } = require('./fixtures/db.js');

beforeEach(setupDatabase)

test('Should', async() => {
  await request(app).post('/users').send({
    name : 'jay',
    email : 'asdf@naver.com',
    password : 'Myass123',
  }).expect(201)
})

test('asdf', async() => {
  const response = await request(app).post('/users/login').send({
    email : userOne.email,
    password : userOne.password,
  }).expect(200);

  const user = User.findById(userOneId);

  expect(response.body.token).toBe(user.tokens[1].token);
})

test('not login', async() => {
  await request(app).post('/users/login').send({
    email : 'asdf@naver.com',
    password : 'asdf',
  }).expect(400);
})

test('should get profile for user', async() => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
})

test('should not get profile for user not authen', async() => {
  await request(app)
    .get('/users/me')
    // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);
})

test('should delete profile for user ', async() => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = User.findById(userOneId._id);
  expect(user).toBeNull();
})

test('should not delete profile for user not authenticate', async() => {
  await request(app)
    .delete('/users/me')
    // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401);
})

test('avatar', async() => {
  await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOneId.tokens[0].token}`)
        .attach('avcatar', 'tests/fixtures/markus-spiske-9zxZeisipcE-unsplash.jpg')
        .expect(200)
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('update', async() => {
  await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${userOneId.tokens[0].token}`)
        .send({
          name : 'jay',
        })
        .expect(200)
  const user = User.findById(userOneId);
  expect(user.name).toEqual('jay')
})

test('not update', async() => {
  await request(app).patch('/users/me')
  .set('Authorization', `Bearer ${userOneId.tokens[0].token}`)
  .send({
    location : 'jay',
  })
  .expect(400)
})