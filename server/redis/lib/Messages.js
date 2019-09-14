const redisClient = require("../redisClient");

function Messages() {
  this.client = redisClient();
}
module.exports = new Messages();

Messages.prototype.upsert = function({ message, roomName, user }) {
  this.client.LPUSH(
    roomName,

    JSON.stringify({
      username: user.username,
      picture: user.picture,
      message,
      when: Date.now()
    }),
    err => {
      if (err) console.log(err);
    }
  );
};

Messages.prototype.getList = function(roomName, cb) {
  let messageList = [];
  this.client.lrange(roomName, 0, -1, (err, messages) => {
    if (err) {
      console.log(err);
      return cb(messageList);
    }

    for (let message in messages) {
      messageList.push(JSON.parse(messages[message]));
    }
    messageList.reverse();
    return cb(messageList);
  });
};
