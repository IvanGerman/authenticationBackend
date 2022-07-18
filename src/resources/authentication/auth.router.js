const express = require('express');

const router = express.Router();

//the callback function under can be replaced by controller
router.get('/login', (req,res) => {
  res.status(200)
    .json({'login': true});
})

module.exports = router;