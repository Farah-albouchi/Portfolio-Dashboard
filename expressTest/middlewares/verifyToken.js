const JWT = require("jsonwebtoken")

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token) {
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

function verifyOTPToken(req,res,next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(token) {
    try {
      const decoded = JWT.verify(token, process.env.OTP_SECRET_KEY);
      req.user=decoded ; 
      next();

    } catch(error) {
      res.status(401).json({message:"invalid token" });
    }
  } else {
    res.status(401).json({message:"no token provided" });
  }
}
module.exports = {
  verifyToken,
  verifyOTPToken ,
};
