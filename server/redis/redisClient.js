const redis = require("redis");

module.exports = () => {
  return redis.createClient({
    url: process.env.REDISCLOUD_URL
    // host: process.env.REDISCLOUD_GRAY_HOST,
    // port: process.env.REDISCLOUD_GRAY_PORT,
    // auth_pass: process.env.REDISCLOUD_GRAY_PASS
  });
};
