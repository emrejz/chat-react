import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Container, TextField, Button } from "@material-ui/core/";

const InputMessage = () => {
  const classes = useStyles();

  return (
    <div className={classes.inputPanel}>
      <TextField
        id="outlined-full-width"
        label="Your Message"
        placeholder="placeholder"
        margin="normal"
        style={{
          margin: 0
        }}
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  inputPanel: {
    marginTop: 16,
    height: "14vh"
  }
}));
export default InputMessage;
