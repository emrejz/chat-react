import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Container,
  Button,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Tabs,
  Tab
} from "@material-ui/core/";

export default function LeftPaper() {
  const classes = useStyles();
  const [tabID, setTabID] = React.useState(0);

  return (
    <div>
      <Paper className={classes.paper}>
        <Button
          onClick={() => setTabID(0)}
          className={classes.buttons}
          variant="outlined"
          color="primary"
        >
          Online
        </Button>
        <Button
          onClick={() => setTabID(1)}
          className={classes.buttons}
          variant="outlined"
          color="secondary"
        >
          Rooms
        </Button>
        <div className={classes.root}>
          {tabID === 0 ? (
            <React.Fragment>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>

                <div>asd asda adadas a afafaf aaaf</div>
              </ListItem>
              <Divider variant="fullWidth" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>

                <div>asd asda adadas a afafaf aaaf</div>
              </ListItem>
              <Divider variant="fullWidth" />
            </React.Fragment>
          )}
        </div>
        <Button
          className={classes.addRoomBtn}
          onClick={() => alert("asd")}
          variant="outlined"
        >
          Add Room
        </Button>
      </Paper>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRight: "1px solid black",
    height: "80vh"
  },
  root: {
    marginTop: 20,
    overflowY: "auto",
    width: "100%",
    height: "66vh",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  buttons: {
    margin: 4
  },
  addRoomBtn: {
    postion: "absolute",
    bottom: "10px",
    left: 0,
    color: "green",
    borderColor: "green",
    margin: "auto"
  }
}));
