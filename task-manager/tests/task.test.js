const request = require('supertest');
const Task = require('../src/models/task.js');
const app = require('../src/app.js');

const {userOneId, userOne, setupDatabase, taskOne, taskTwo, taskThree } = require('./fixtures/db.js');

beforeEach(setupDatabase)

test('create task', async() => {
  const response = await request(app)
  .post('/tasks')
  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
  .send({
    description : 'asdf',
  })
  .expect(201)
  
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull()

  expect(task.completed).toBe(false);
})

test('get tasks', async() => {
  const response = await request(app)
  .get('/tasks')
  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(200)

  expect(response.body.length).toEqual(2);
})

test('delete task fail', async() => {
  await request(app)
  .delete(`/tasks/${taskThree._id}`)
  .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
  .send()
  .expect(401)

  const reponse = Taks.findById(taskThree._id);

  expect(response).not.toBeNull();
})