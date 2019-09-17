const redis = require("redis");

module.exports = () => {
  return redis.createClient({ url: process.env.REDISCLOUD_URL });
};
