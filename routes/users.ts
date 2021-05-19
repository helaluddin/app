
const auth = require('../middleware/auth');
import bcrypt from 'bcrypt';

import User, { validate } from '../models/user';
import mongoose from 'mongoose';
import express from 'express';
import { any } from 'joi';

const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email : req.body.email});
  if (user) return res.status(400).send("This Email Already Exists !"); 
 
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  
  user = new User({ name: req.body.name, email: req.body.email, password: password });
  await user.save();
 
 const token = jwt.sign({ name: req.body.name, email: req.body.email}, "jwtPrivateKey");

 res.header('x-auth-token', token).send(user);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!user) return res.status(404).send('The user with the given ID was not found.');
  
  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});


export default router;