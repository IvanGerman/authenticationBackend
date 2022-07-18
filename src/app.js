const express = require('express');

const app = express();

const authRouter = require('./resources/authentication/auth.router');

app.use('/api/auth', authRouter);


app.get('/', (req, res) => {
  res.status(200);
  //res.send('method send working');
  res.json( { 'message': 'OK_201'} );
});

module.exports = app;