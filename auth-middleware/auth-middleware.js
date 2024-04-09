const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');


module.exports = async (req, res, next) => {
  let token = req?.headers?.authorization;
  token = token?.split(' ');
  if (token && token.length === 2) {
    try {
      const decode = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
      const user = await Users.findById(decode.userId);
      if (user) {
        req.username = decode.name;
        req.userId = decode.userId;
        next();
      } else {
        res.status(StatusCodes.UNAUTHORIZED);
        res.json({ error: 'UnAuthorized' });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.json({ error: error.stack || error });
    }
  } else {
    res.status(StatusCodes.UNAUTHORIZED);
    res.json({ error: 'UnAuthorized' });
  }
};
