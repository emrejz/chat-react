const socket = require("socket.io");
const redisAdapter = require("socket.io-redis");
const socketAuth = require("../auth/socket");
const Rooms = require("../redis/lib/Rooms");
module.exports = server => {
  const io = socket.listen(server);
  let roomList = [];
  io.use(socketAuth);
  io.adapter(
    redisAdapter({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      auth_pass: process.env.REDIS_PASS
    })
  );

  io.on("connection", socket => {
    Rooms.getList(rooms => {
      io.emit("firstConnect", rooms);
      roomList = rooms;
    });

    socket.emit("userInfo", socket.request.user);
    socket.on("addRoom", roomName => {
      for (let room of roomList) {
        if (room.name !== roomName) {
          Rooms.upsert(roomName);
          Rooms.getList(rooms => {
            io.emit("newRoom", rooms);
          });
        }
      }
    });
    socket.on("newUser", user => console.log(user));
  });
};
