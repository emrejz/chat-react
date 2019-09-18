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
//require("./auth/signUpLocal")
const app = express();
app.use(cors());
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_URL_MLAB, { useNewUrlParser: true })
  .then(res => console.log("mongo ok"))
  .catch(err => console.log("mongo err"));
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    key: "connect.sid",
    store: RedisStore,

    secret: process.env.SECRET_KEY,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none"
    }
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
