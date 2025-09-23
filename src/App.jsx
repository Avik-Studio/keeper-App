import { useState } from "react";
import Header from "./Header.jsx";
import "./style.css";
import Note from "./Note.jsx";
import Footer from "./Footer.jsx";
import CreateArea from "./CreateArea.jsx";

const App = () => {
  const [note , setNote] = useState([
    {
    title:"Welcome to keeper Project",
    content:"Make notes and organize your thoughts!"
  }
]);

  const AddNote = (newNOte) => {
    setNote((prevNote) =>{
      return [...prevNote,newNOte];
    });
  }

  const deleteN = (id) => {
     setNote((prevNote) => 
       prevNote.filter((noteItam, index) => index !== id)
     );
   }

  return(
    <div className="app_container">
      <Header />
      <div className="main">
        <CreateArea onAdd={AddNote}/>
        <div className="note-container">
          {note.map((noteItam,index) => {
            return (
              <Note 
                key={index}
                id={index}
                title={noteItam.title}
                content={noteItam.content}
                onDelete={deleteN}
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