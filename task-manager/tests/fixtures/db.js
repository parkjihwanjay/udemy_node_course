const moongose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../../src/models/user.js');
const Task = require('../../src/models/task.js')

const userOneId = new moongose.Types.ObjectId();
const userOne = {
  _id : userOneId,
  name : 'test',
  email : 'email@naver.com',
  password : 'testtest',
  tokens : [{
    token : jwt.sign({_id : userOneId}, process.env.JWT_SECRET)
  }]
}

const userTwoId = new moongose.Types.ObjectId();
const userTwoId = {
  _id : userTwoId,
  name : 'asdf',
  email : 'asdf@naver.com',
  password : 'asdfsadfsadf',
  tokens : [{
    token : jwt.sign({_id : userTwoId}, process.env.JWT_SECRET)
  }]
}

const taskOne = {
  _id : new moongose.Types.ObjectId(),
  description : 'asdf',
  completed :false,
  owner : userOne._id,
}

const taskTwo = {
  _id : new moongose.Types.ObjectId(),
  description : 'asdf',
  completed :true,
  owner : userOne._id,
}

const taskThree = {
  _id : new moongose.Types.ObjectId(),
  description : 'asdf',
  completed :true,
  owner : userTwo._id,
}

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();

  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
}

module.exports = {
  userOneId,
  userOne,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
}