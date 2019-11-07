import React from "react";
import {
  makeStyles,
  ListItem,
  ListItemAvatar,
  Avatar
} from "@material-ui/core/";
import defaultImg from "../../../../assets/uniSex.jpg";

const OnlineUserItem = ({ item }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ListItem className={classes.listItem} button>
        <ListItemAvatar>
          <Avatar
            alt={item.username}
            src={item.picture ? item.picture : defaultImg}
          />
        </ListItemAvatar>
        <div>{item.username}</div>
      </ListItem>
    </div>
  );
};

export default OnlineUserItem;

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    height: "56px"
  },
  listItem: {
    transition: ".2s ease",
    borderBottom: "1px solid gray",
    zIndex: 10,
    borderBottom: "inset",
    "&:hover": {
      width: "100% !important",
      textDecoration: "none",
      backgroundColor: "greenyellow",
      fontSize: "20px",
      transition: ".2s ease",
      borderRadius: "0px 20px 20px 0px",
      borderBottom: "none"
    }
  }
}));
