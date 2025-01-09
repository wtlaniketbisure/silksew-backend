// config/jwtConfig.js

module.exports = {
  secret: process.env.JWT_SECRET || 'supersecretkey',
  expiresIn: '7d', // Token expiration time
};
