import React from "react";
import { makeStyles, ListItem } from "@material-ui/core/";

const RoomItem = ({ item, selectRoomButton }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ListItem
        className={classes.listItem}
        button
        onClick={() => selectRoomButton(item.name)}
      >
        <div>{item.name}</div>
      </ListItem>
    </div>
  );
};

export default RoomItem;

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    width: "100%",
    height: "34px"
  },
  listItem: {
    transition: ".2s ease",
    borderBottom: "1px solid gray",
    zIndex: 10,
    borderBottom: "inset",
    "&:hover": {
      width: "100%",
      textDecoration: "none",
      backgroundColor: "greenyellow",
      fontSize: "20px",
      transition: ".2s ease",
      borderRadius: "0px 20px 20px 0px",
      borderBottom: "none"
    }
  }
}));
