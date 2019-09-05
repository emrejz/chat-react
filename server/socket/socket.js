const socket = require("socket.io");
const redisAdapter = require("socket.io-redis");
const socketAuth = require("../auth/socket");
module.exports = server => {
  const io = socket.listen(server);
  io.use(socketAuth);

  io.adapter(
    redisAdapter({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      auth_pass: process.env.REDIS_PASS
    })
  );

  io.on("connection", socket => {
    socket.on("userLogin", () => {
      console.log(socket.request.user);
      console.log(socket.handshake.user);
      console.log(socket.request.session);
      socket.emit("a", socket.request.user);
    });
  });
};
