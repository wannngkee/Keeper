import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Note = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [done, setDone] = useState(true);
  const [title, setTitle] = useState(props.note.title);
  const [content, setContent] = useState(props.note.content);

  const handleDelete = () => {
    props.onDelete(props.id);
  };
  const handleEdit = () => {
    setDone((done) => !done);
    if (!done) {
      const newNote = { title, content };
      props.setNotes((notes) => {
        const newNotes = notes;
        newNotes[props.id] = newNote;
        return newNotes;
      });
      if (isAuthenticated) {
        const id = props.id[0];
        axios
          .patch(
            `https://keeper-mern.herokuapp.com/notes/${user.email}/${id}`,
            {
              title: newNote.title,
              content: newNote.content,
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="note">
      <>
        <input value={title} onChange={handleTitle} disabled={done} />
        {done ? null : <hr />}
        <textarea
          rows={4}
          value={content}
          onChange={handleContent}
          disabled={done}
          style={{ width: 210 }}
        />
      </>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit}>
        {done ? <EditIcon /> : <DoneOutlineOutlinedIcon />}
      </button>
    </div>
  );
};

export default Note;
