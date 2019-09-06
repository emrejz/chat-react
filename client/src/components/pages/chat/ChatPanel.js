import React from "react";
import {
  ListItem,
  Avatar,
  ListItemAvatar,
  Typography,
  makeStyles,
  ListItemText
} from "@material-ui/core/";
export default function ChatPanel({ socketData }) {
  const classes = useStyles();
  const data = [
    {
      username: "Emre_49wtup",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message:
        "asfasf {item.message} {item.message} {item.message} {item.message} {item.message} {item.message} {item.message} {item.message}"
    },
    {
      username: "asd",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    },
    {
      username: "asd1",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    },
    {
      username: "asd",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    },
    {
      username: "asd1",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    },
    {
      username: "asd",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    },
    {
      username: "asd1",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    },
    {
      username: "asd",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    },
    {
      username: "asd1",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    },
    {
      username: "asd",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    },
    {
      username: "Emre_49wtup",
      picture: "https://material-ui.com/static/images/avatar/1.jpg",
      message: "asfasf"
    }
  ];
  return (
    <div className={classes.container}>
      {data.map(item => {
        return item.username !== socketData.data.user.username ? (
          <ListItem className={classes.strangerMessage} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="avatar" src={item.picture} />
            </ListItemAvatar>
            <ListItemText
              primary={item.username}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {item.message}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ) : (
          <ListItem className={classes.myMessage} alignItems="flex-start">
            <ListItemText
              primary={item.username}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {item.message}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemAvatar>
              <Avatar
                alt={"avatar"}
                src={item.picture}
                style={{ margin: 0, marginLeft: 16 }}
              />
            </ListItemAvatar>
          </ListItem>
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
  inline: {
    display: "inline"
  },
  container: {
    height: "60vh",
    backgroundColor: "red",
    overflowY: "scroll"
  },
  strangerMessage: {
    float: "left",
    maxWidth: "80%",
    backgroundColor: "yellow",
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 4
  },
  myMessage: {
    float: "right",
    maxWidth: "80%",
    backgroundColor: "yellow",
    borderRadius: 8,
    textAlign: "right",
    marginBottom: 10,
    marginRight: 4
  }
}));
