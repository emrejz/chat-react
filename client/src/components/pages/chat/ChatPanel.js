import React, { useEffect, createRef } from "react";
import {
  ListItem,
  Avatar,
  ListItemAvatar,
  Typography,
  makeStyles,
  ListItemText
} from "@material-ui/core/";
import { useSelector } from "react-redux";
import defaultImg from "../../../assets/uniSex.jpg";

export default function ChatPanel() {
  const classes = useStyles();
  const { messageList, user, selectedRoom } = useSelector(
    state => state.socketReducer
  );
  const ref = createRef();
  const leng = messageList[selectedRoom]
    ? messageList[selectedRoom].length
    : null;

  const scrollToBottom = () => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [leng]);
  return (
    <div className={classes.container} ref={ref}>
      {messageList[selectedRoom] &&
        messageList[selectedRoom].map((item, index) => {
          return item.username !== user.username ? (
            <div key={index}>
              <ListItem
                className={classes.strangerMessage}
                alignItems="flex-start"
              >
                <ListItemAvatar className={classes.avatar}>
                  <Avatar
                    alt="avatar"
                    src={item.picture ? item.picture : defaultImg}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={classes.usernameStr}
                  primary={item.username}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inlineStr}
                        color="textPrimary"
                      >
                        {item.message}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          ) : (
            <div key={index}>
              <ListItem className={classes.myMessage} alignItems="flex-start">
                <ListItemText
                  className={classes.usernameMe}
                  primary={item.username}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inlineMe}
                        color="textPrimary"
                      >
                        {item.message}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemAvatar className={classes.avatar}>
                  <Avatar
                    alt={"avatar"}
                    src={item.picture ? item.picture : defaultImg}
                    style={{ margin: 0, marginLeft: 16 }}
                  />
                </ListItemAvatar>
              </ListItem>
            </div>
          );
        })}
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inlineMe: {
    display: "block",
    color: "white",
    fontSize: 16,
    borderTop: "1px solid"
  },
  inlineStr: {
    display: "block",
    color: "white",
    borderTop: "1px solid",
    fontSize: 16
  },

  container: {
    height: "60vh",
    backgroundColor: "#fbf9ed",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  strangerMessage: {
    flex: 1,
    float: "left",
    //   maxWidth: "88%",
    color: "white",
    backgroundColor: "crimson",
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 4
  },

  myMessage: {
    float: "right",
    maxWidth: "88%",
    backgroundColor: "#0084FF",
    color: "white",
    borderRadius: 8,
    textAlign: "right",
    marginBottom: 10,
    marginRight: 4
  },
  avatar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
}));
