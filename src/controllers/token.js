const jwt = require('jsonwebtoken');

const RefreshToken = require('../models/RefreshToken');
const { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = require('../common/config');


// module.exports.getRefreshToken = async function(refreshToken) { console.log('getRefreshToken');

//   try {
//     const isRTokenInDB = await RefreshToken.findOne({refreshToken: refreshToken});
//     if (isRTokenInDB) {
//       console.log('all good, this RT is in DB');
//       return
//     } else {
//       console.log('no such RT in DB');
//     }
//   } catch(err) {
//     res.status(404).json({
//       message: 'an error occured!'
//     })
//   }     
// };

module.exports.postRefreshToken = async function(req, res) { console.log('in postRefreshToken');

  const refreshToken = req.header("Authorization");
  console.log('refreshToken from header--', refreshToken);

  // If token is not provided, send error message
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        { message: "Token not found", },
      ],
    });
  };

  // If token does not exist, send error message
  const isRTokenInDB = await RefreshToken.findOne({refreshToken: refreshToken});

  if (!isRTokenInDB) {
    res.status(403).json({
      errors: [
        { message: "Invalid refresh token", },
      ],
    });
  };

  try { 
    
    const user = await jwt.verify(
      refreshToken,
      JWT_REFRESH_SECRET_KEY
    );
    
    const { email, userId } = user;

    const accessToken = await jwt.sign(
      { email, userId },
      JWT_SECRET_KEY,
      { expiresIn: "10s" }
    );
    
    res.json({ accessToken });
  } catch (error) {   
    res.status(403).json({
      errors: [
        {
          message: "Invalid token",
        },
      ],
    });
  }
};

module.exports.saveRefreshTokenToDB = async function(refreshToken) {
  const refreshToken2 = new RefreshToken({
    'refreshToken': refreshToken
  });

  try {
    await refreshToken2.save();
    console.log('refreshToken added to DB successfully');
  } catch(err) {
    console.log('error, could not add RT to DB');
  }
}


module.exports.deleteAllRefreshTokens = async function() {
  try {
    await RefreshToken.deleteMany();
    return 'RTdeleted';
  } catch(err) {
    console.log('could not delete refreshTokens from DB');
  }
} 


