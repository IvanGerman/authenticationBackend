const express = require('express');

const router = express.Router();

//the callback function under can be replaced by controller
router.post('/login', (req,res) => {
  res.status(200)
    .json({
      'login': {
        email: req.body.email,
        password: req.body.password
      }
    });
});

router.post('/register', (req,res) => {
  res.status(200)
    .json({'register': true});
})

module.exports = router;