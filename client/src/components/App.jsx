import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    await axios.get('http://localhost:8000/notes')
      .then((res) => {
        const allNotes = res.data
        setNotes(allNotes)
      })
      .catch(function (err) { console.log(err) })
  };

  useEffect(() => { getAllNotes() }, [] );
  

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id[1];
      });
    });
    axios.delete(`http://localhost:8000/notes/${id[0]}`).then((res) => {
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
            id={[noteItem._id,index]}
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

export default App;
