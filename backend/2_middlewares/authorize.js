const jsonWebToken = require("jsonwebtoken");
 
const authorize = (req, res, next) => 
{
   try
   {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jsonWebToken.verify(token, `${process.env.JWT_SECRET_KEY}`);
      const userId = decodedToken.userId;
      const userEmail = decodedToken.email;
      req.auth = { userId: userId, email: userEmail};
      next();
   }
   catch(error) 
   {
      res.status(403).json({ message: "Unauthorized Request" });
   }
};

module.exports = {authorize};