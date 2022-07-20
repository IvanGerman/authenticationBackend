const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { JWT_SECRET_KEY } = require('../common/config');


module.exports.login = async function(req, res) {

  // check does user already exist
  const isUserThere = await User.findOne({email: req.body.email});
  if (isUserThere) {
    const passwordResult = bcryptjs.compareSync(req.body.password, isUserThere.password);
    if (passwordResult) {
      //password is right, now we generate token
      const token = jwt.sign({
        email: isUserThere.email,
        userId: isUserThere._id
      }, JWT_SECRET_KEY, {expiresIn: 60 * 60});
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'wrong password!'
      })
    }
  } else {
    res.status(404).json({
      message: 'user not found!'
    })
  }
};

module.exports.register = async function(req, res) {

// check does user with this email already exist
  const isEmailOccupied = await User.findOne({email: req.body.email});
  if (isEmailOccupied) {
    res.status(409).json({
      message: 'this email is already occupied!'
    })
  } else { //create new user
    //first we encode his password
    const salt = bcryptjs.genSaltSync(10);
    const password = req.body.password;

    const user = new User({
      email: req.body.email,
      password: bcryptjs.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch(err) {

    }
  }

  
}