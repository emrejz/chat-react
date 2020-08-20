const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");
const opt = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth_pass: process.env.REDIS_PASS,
};

module.exports = new RedisStore({
  client: redis.createClient({ ...opt }),
  //disableTouch: true,
  // //serializer: true,
  secret: process.env.SECRET_KEY,
  // ...opt,
});
