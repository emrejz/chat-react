const redis = require("redis");

module.exports = () => {
  return redis.createClient({
    // url: process.env.REDISCLOUD_URL
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASS
  });
};
