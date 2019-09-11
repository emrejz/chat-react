const socket = require("socket.io");
const redisAdapter = require("socket.io-redis");
const socketAuth = require("../auth/socket");
const Rooms = require("../redis/lib/Rooms");
const Users = require("../redis/lib/Users");
const Messages = require("../redis/lib/Messages");
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
    const msgList = {};
    if (socket.request.user.username) {
      Rooms.getList(rooms => {
        io.emit("roomList", rooms);
        roomList = rooms;
      });

      if (socket.request.user.username) Users.upsert(socket.request.user);
      Users.getList(users => {
        io.emit("onlineList", users);
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

      console.log(socket.id);
      socket.on("roomMessages", roomName => {
        Messages.getList(roomName, messages => {
          msgList[roomName] = messages;
          console.log(msgList);
          socket.emit("roomMesasges", msgList);
        });
      });
      socket.on("newMessage", data => {
        Messages.upsert(data);
      });

      socket.on("newUser", user => console.log("a"));
      socket.on("disconnect", () => {
        console.log("disconnect");
        Users.remove(socket.request.user);
        Users.getList(users => io.emit("onlineList", users));
      });
    } else socket.emit("userInfo", socket.request.user);
  });
};
