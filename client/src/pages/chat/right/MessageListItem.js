import React from "react";
import {
  ListItem,
  Avatar,
  ListItemAvatar,
  Typography,
  makeStyles,
  ListItemText,
} from "@material-ui/core/";

import defaultImg from "../../../assets/uniSex.jpg";

const MessageListItem = ({ stranger, item }) => {
  const classes = useStyles();
  return (
    <div>
      <ListItem
        className={stranger ? classes.strangerMessage : classes.myMessage}
        alignItems="flex-start"
      >
        {stranger && (
          <ListItemAvatar className={classes.avatar}>
            <Avatar
              alt="avatar"
              src={item.picture ? item.picture : defaultImg}
            />
          </ListItemAvatar>
        )}
        <ListItemText
          className={stranger ? classes.usernameStr : classes.usernameMe}
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
        {!stranger && (
          <ListItemAvatar className={classes.avatar}>
            <Avatar
              alt="avatar"
              src={item.picture ? item.picture : defaultImg}
              style={{ marginLeft: "16px" }}
            />
          </ListItemAvatar>
        )}
      </ListItem>
    </div>
  );
};

export default MessageListItem;
const useStyles = makeStyles((theme) => ({
  inlineMe: {
    display: "block",
    color: "white",
    fontSize: 16,
    borderTop: "1px solid",
  },
  inlineStr: {
    display: "block",
    color: "white",
    borderTop: "1px solid",
    fontSize: 16,
  },
  strangerMessage: {
    flex: 1,
    float: "left",
    maxWidth: "88%",
    color: "white",
    backgroundColor: "crimson",
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 4,
  },

  myMessage: {
    float: "right",
    maxWidth: "88%",
    backgroundColor: "#0084FF",
    color: "white",
    borderRadius: 8,
    textAlign: "right",
    marginBottom: 10,
    marginRight: 4,
  },
  avatar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));
