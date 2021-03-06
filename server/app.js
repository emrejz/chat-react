require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const RedisStore = require("./redis/redisStore");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const indexRouter = require("./routes/index");
const socket = require("./socket/socket");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000", //react dev
      "http://localhost:4200", //angular dev
      "http://knowing-room.surge.sh",
      "http://chatapp-react.surge.sh",
      "http://chatapp-vue.surge.sh",
      "http://chatapp-angular.surge.sh",
    ],
    credentials: true,
  })
);
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo ok"))
  .catch((err) => console.log("mongo err"));
app.enable("trust proxy");
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    key: "connect.sid",
    store: RedisStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
  console.log("server ok");
  socket(server);
});
