const JWT = require("jsonwebtoken");

const secret = "$uperM@n123";

const createJsonWebToken = user => {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role
  };

  const token = JWT.sign(payload, secret);

  return token;
};

const validateToken = token => {
  const payload = JWT.verify(token, secret);
  return payload;
};

module.exports = {
  createJsonWebToken,
  validateToken
};
