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
      url: process.env.REDISCLOUD_URL
      // host: process.env.REDIS_CLOUD_HOST,
      // port: process.env.REDIS_CLOUD_PORT,
      // auth_pass: process.env.REDIS_CLOUD_PASS
    })
  );

  io.on("connection", socket => {
    if (socket.request.user.username) {
      let user = null;

      Rooms.getList(rooms => {
        io.emit("roomList", rooms);
        roomList = rooms;
      });

      Users.upsert(socket.request.user);
      Users.getList(users => {
        io.emit("onlineList", users);
      });

      socket.emit("userInfo", socket.request.user);
      socket.on("addRoom", roomName => {
        if (roomList.length == 0) {
          Rooms.upsert(roomName);
          Rooms.getList(rooms => {
            io.emit("newRoom", rooms);
          });
        }
        for (let room of roomList) {
          if (room.name !== roomName) {
            Rooms.upsert(roomName);
            Rooms.getList(rooms => {
              io.emit("newRoom", rooms);
            });
          }
        }
      });

      socket.on("roomMessages", room => {
        socket.join(room);
        Messages.getList(room, messages => {
          let msgList = {};
          msgList[room] = messages;

          socket.emit("roomMesasges", msgList);
        });
      });
      socket.on("newMessage", data => {
        const { message, selectedRoom } = data;
        const msgData = {
          message,
          roomName: selectedRoom,
          user: { username: user.username, picture: user.picture }
        };

        Messages.upsert(msgData);
        io.to(selectedRoom).emit("newMessage", msgData);
      });

      socket.on("newUser", newUser => (user = newUser));
      socket.on("disconnect", () => {
        Users.remove(socket.request.user);
        Users.getList(users => io.emit("onlineList", users));
      });
    } else socket.emit("userInfo", socket.request.user);
  });
};
