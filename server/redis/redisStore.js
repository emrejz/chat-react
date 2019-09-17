var session = require("express-session");
var RedisStore = require("connect-redis")(session);
const opt = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  pass: process.env.REDIS_PASS
};
var redis = require("redis").createClient();
module.exports = new RedisStore({
  // client: redis,
  // //serializer: true,
  // unset: "destroy"
  secret: process.env.SECRET_KEY,
  // url: process.env.REDISCLOUD_GRAY_URL
  host: process.env.REDISCLOUD_GRAY_HOST,
  port: process.env.REDISCLOUD_GRAY_PORT,
  auth_pass: process.env.REDISCLOUD_GRAY_PASS
});
