const redis = require("redis");

module.exports = () => {
  return redis.createClient(process.env.REDISCLOUD_URL);
};
