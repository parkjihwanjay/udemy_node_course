const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
  email : {
    type : String,
    required :true,
    validate(value){
      if(!validator.isEmail(value))
        throw new Error('email error');
    }
  },
  description :{
    type : String,
    trim : true,
  },
  completed : {
    type : Boolean,
    default : false,
  },
  owner : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User',
  }
}, {
  timestamps : true,
})

const Task = mongoose.model('User', taskSchema)

module.exports = Task;