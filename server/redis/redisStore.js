var session = require("express-session");
var RedisStore = require("connect-redis")(session);

module.exports = new RedisStore({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  pass: process.env.REDIS_PASS,
  unset: "destroy"
});
