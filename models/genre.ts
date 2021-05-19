import Joi from 'joi';
import mongoose from 'mongoose';

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

export function validate(genre: any) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return schema.validate(genre);
}

export default Genre; 