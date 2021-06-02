import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function CreateArea(props) {
  const { loginWithRedirect } = useAuth0();
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    if (props.isAuthenticated) {
      props.onAdd(note);
      const newNote = {
        title: note.title,
        content: note.content,
      };
      if (newNote.title && newNote.content) {
        axios
          .post("https://keeper-mern.herokuapp.com/notes", newNote)
          .then((res) => console.log(res.data));
        setNote({
          title: "",
          content: "",
        });
        event.preventDefault();
      }
    } else {
      loginWithRedirect({ screen_hint: "signup" });
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
