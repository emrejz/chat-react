const redis = require("redis");

module.exports = () => {
  return redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASS,
  });
};
