const redis = require("redis");

module.exports = () => {
  return redis.createClient({
    //  url: process.env.REDIS_CLOUD_URL,
    host: process.env.REDIS_CLOUD_HOST,
    port: process.env.REDIS_CLOUD_PORT,
    auth_pass: process.env.REDIS_CLOUD_PASS
  });
};
