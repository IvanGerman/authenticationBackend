const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.status(200);
  //res.send('method send working');
  res.json( { 'message': 'OK_200'} );
});

module.exports = app;