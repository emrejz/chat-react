const redis = require("redis");

module.exports = () => {
  return redis.createClient({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
  });
};
