import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function Home() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [message, setMessage] = useState();

  const getAllNotes = async () => {
    await axios
      .get("https://keeper-mern.herokuapp.com/notes")
      .then((res) => {
        const allNotes = res.data;
        setNotes(allNotes);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  function addNote(newNote) {
    setOpen(true);
    if (newNote.title && newNote.content) {
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
      setType("success");
      setMessage("Note added");
    } else {
      setType("error");
      setMessage("Note cannot be added without title or content");
    }
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id[1];
      });
    });
    axios
      .delete(`https://keeper-mern.herokuapp.com/notes/${id[0]}`)
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={[noteItem._id, index]}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default Home;
