require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const redisStore = require("./redis/redisStore");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const indexRouter = require("./routes/index");
//require("./auth/signUpLocal")
const app = express();
app.use(cors());

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(res => console.log("mongo ok"))
  .catch(err => console.log("mongo err"));
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    store: redisStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 20 * 1000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server ok");
});
