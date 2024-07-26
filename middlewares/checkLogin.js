const jwt = require("jsonwebtoken");
const checkLogin = async (req, res, next) => {
  const token = await req.signedCookies.access_token;
  if (!token) return res.json("error logging in");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.json("Couldn't verify User");

    req.user = user;
  });
  next();
};
module.exports = checkLogin;
