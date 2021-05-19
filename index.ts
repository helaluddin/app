import express from 'express';
import mongoose from 'mongoose';
import genres from './routes/genres';
import users from './routes/users';

const app = express();

mongoose.connect('mongodb://localhost/appistant')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.log('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));