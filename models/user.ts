import Joi from 'joi';
import mongoose from 'mongoose';
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  },
  isAdmin: Boolean
});



userSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, "jwtPrivateKey");
  return token;
}

const User = mongoose.model('User', userSchema);

export function validate(user: any) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(250).required()
  });

  return schema.validate(user);
}

export default User;