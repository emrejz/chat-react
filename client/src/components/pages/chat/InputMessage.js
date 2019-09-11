import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Container, TextField, Button } from "@material-ui/core/";

import { sendMessage } from "../../../actions/socketAction";
const InputMessage = ({ newMessage }) => {
  const classes = useStyles();
  const [text, setText] = React.useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        newMessage(text);
        setText("");
      }}
      className={classes.inputPanel}
    >
      <TextField
        value={text}
        onChange={e => setText(e.target.value.trim())}
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
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  inputPanel: {
    marginTop: 16,
    height: "14vh"
  }
}));
export default InputMessage;
