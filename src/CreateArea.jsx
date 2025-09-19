import { useState } from "react";
import React from "react";

function CreateArea(props) {
    const [notes, setNotes] = useState({
        title: "",
        content: ""
    });
    function handleChange(event) {
        const { name, value } = event.target;
        setNotes((prevNotes) => ({
            ...prevNotes,
            [name]: value
        }));
    }
    function submitNote(event) {
      event.preventDefault();
        props.onAdd(notes);
        setNotes({  
            title: "",
            content: ""
        });
    }
  return (
    <div className="create-area">
      <form className="note-form" onSubmit={submitNote}>
        <input 
          type="text" 
          className="note-title" 
          placeholder="Title" 
          name="title" 
          value={notes.title} 
          onChange={handleChange} 
        />
        <textarea 
          className="note-content" 
          name="content" 
          onChange={handleChange} 
          value={notes.content} 
          rows="3" 
          placeholder="Take a note..." 
        />
        <button className="add-btn" type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;