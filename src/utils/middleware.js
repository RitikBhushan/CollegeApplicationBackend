const authenticateUser = (req, res, next) => {
  // Your middleware logic here
  next();
};

module.exports = { authenticateUser };
