import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core/";
import { useSelector } from "react-redux";

const InputMessage = () => {
  const classes = useStyles();
  const [text, setText] = React.useState("");

  const { selectedRoom, socket } = useSelector(state => state.socketReducer);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const message = text.trim();
        if (message) {
          socket.emit("newMessage", { message, selectedRoom });
        }
        setText("");
      }}
      className={classes.inputPanel}
    >
      {selectedRoom ? (
        <TextField
          value={text}
          onChange={e => setText(e.target.value)}
          id="outlined-full-width"
          label="Your Message"
          placeholder="placeholder"
          autoComplete="false"
          autoSave="false"
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
      ) : (
        <div></div>
      )}
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
