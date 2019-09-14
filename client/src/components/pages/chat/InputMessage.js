import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../actions/socketAction";
const InputMessage = () => {
  const classes = useStyles();
  const [text, setText] = React.useState("");
  const dispatch = useDispatch();
  const { socket } = useSelector(state => state.socketReducer);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        socket.emit("newMessage", text);
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
