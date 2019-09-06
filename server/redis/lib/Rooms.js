const redisClient = require("../redisClient");

function Rooms() {
  this.client = redisClient();
}

module.exports = new Rooms();

Rooms.prototype.upsert = function(name) {
  this.client.hset(
    "rooms",
    name,
    JSON.stringify({
      name,
      when: Date.now()
    }),
    err => {
      if (err) {
        console.error(err);
      }
    }
  );
};
Rooms.prototype.getList = function(cb) {
  const roomList = [];
  this.client.hgetall("rooms", (err, rooms) => {
    if (err) {
      console.log(err);
      return cb(roomList);
    }
    for (let room in rooms) {
      roomList.push(JSON.parse(rooms[room]));
    }
    return cb(roomList);
  });
};
