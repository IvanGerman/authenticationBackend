const express = require('express');
const passport = require('passport');

const router = express.Router();

//the callback function under can be replaced by controller
router.get('/books', passport.authenticate('jwt', { session: false }), (req,res) => {
  res.status(200)
    .json({'books': true});
});

router.post('/books', (req,res) => {
  res.status(200)
    .json({'books': true});
})

module.exports = router;