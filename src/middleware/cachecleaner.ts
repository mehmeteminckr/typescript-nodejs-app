const { clearCache } = require('../services/cache');

module.exports = async(req, res, next) => {
      clearCache(req.decoded.id);
      next();
}