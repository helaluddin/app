import express from 'express';
import Genre, {validate} from "../models/genre";
import {auth} from "../middleware/auth";

const router = express.Router();


router.get('/', async (req, res) => {  
  const genres = await Genre.find().sort('name');
  res.send(genres); 
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let genree = new Genre({ name: req.body.name });
    await genree.save();
    
    res.send(genree);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    res.send(genre);
  });
  
  router.delete('/:id', auth, async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });
  
  router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
  });

export default router;