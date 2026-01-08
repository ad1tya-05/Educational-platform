const client = require('../config/redis');

const checkCache = async (req, res, next) => {
  const key = `search:${JSON.stringify(req.query)}`; // Unique key based on search params

  try {
    const data = await client.get(key);
    if (data) {
      console.log('⚡ Redis Cache Hit');
      return res.status(200).json(JSON.parse(data));
    }
    console.log('❌ Redis Cache Miss');
    next();
  } catch (err) {
    console.error(err);
    next();
  }
};

module.exports = checkCache;