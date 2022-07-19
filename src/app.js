const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./common/config.js');


mongoose.connect(MONGO_CONNECTION_STRING)
  .then( () => { console.log('MongoDB connected!');})
  .catch( (error) => { console.log(error);})

const app = express();

const authRouter = require('./resources/authentication/auth.router');
const booksRouter = require('./resources/books/books.router');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', booksRouter);


app.get('/', (req, res) => {
  res.status(200);
  //res.send('method send working');
  res.json( { 'message': 'OK_201'} );
});

module.exports = app;