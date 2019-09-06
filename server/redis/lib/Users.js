const redisClient = require("../redisClient");

function Users() {
  this.client = redisClient();
}
module.exports = new Users();

Users.prototype.upsert = function(user) {
  this.client.hset(
    "online",
    user.username,
    JSON.stringify({
      username: user.username,
      picture: user.picture
    }),
    err => {
      if (err) console.log(err);
    }
  );
};

Users.prototype.remove = function(user) {
  this.client.hdel("online", user.username, err => {
    if (err) console.log(err);
  });
};

Users.prototype.getList = function(cb) {
  let onlineList = [];
  this.client.hgetall("online", (err, users) => {
    if (err) {
      console.log(err);
      return cb(onlineList);
    }
    for (let user in users) {
      onlineList.push(JSON.parse(users[user]));
    }
    return cb(onlineList);
  });
};
