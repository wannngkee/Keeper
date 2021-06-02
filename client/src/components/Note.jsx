import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined";

const Note = (props) => {
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
        <textarea value={content} onChange={handleContent} disabled={done} />
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
