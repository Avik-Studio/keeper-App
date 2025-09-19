import { useState } from "react";
import Header from "./Header.jsx";
import "./style.css";
import "./App.css";
import Note from "./Note.jsx";
import Footer from "./Footer.jsx";
import CreateArea from "./CreateArea.jsx";



function App() {
const [notes, setNotes] = useState([
    {
      title: "Welcome to Keeper",
      content: "Make notes and organize your thoughts!"
    }
  ]);
  
  function addNote(newNote) { 
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

function deleteNote(id) {
  setNotes((prevNotes) => {
    return prevNotes.filter((noteItem, index) => {
      return index !== id;
    });
  });
}

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <CreateArea onAdd={addNote} />
        <div className="notes-container">
          {notes.map((noteItem, index) => {
            return (
              <Note 
                key={index}
                id={index}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
