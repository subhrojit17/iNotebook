var jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const fetchUser = (req, res, next) => {
  //Get the user from the JWT token and add id to request object
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token." });
  }
  try {
    const data = jwt.verify(token, secretKey);
    req.user = data.user;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token." });
  }
};
module.exports = fetchUser;
