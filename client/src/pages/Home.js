import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import axios from "axios";

function Home() {
  const [notes, setNotes] = useState([]);

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

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
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
