import React from "react";
import { useState } from "react";

const CreateArea = (props) =>{
  const [note , setNote] = useState({
    title:"",
    content:""
  });

  const Change_funtion = (event) =>{
    const {name, value} = event.target;
    setNote((prevNote) =>({
      ...prevNote,
      [name]:value
    }))
  }

  const FormSubmite = (event) => {
    event.preventDefault();
    if (note.title.trim()==="" || note.content.trim() === "") {
      alert("Please fill in both title and content!");
      return;
    }
    props.onAdd(note);
    setNote({
      title:"",
      content:""
    });
  }

return(
  <div className="creteArea">
    <form className="notefrom" onSubmit={FormSubmite}>
      <input type="text" className="note_title" placeholder="title" name="title" value={note.title} onChange={Change_funtion}/> 
        <textarea 
          className="note_content" 
          name="content" 
          onChange={Change_funtion} 
          value={note.content} 
          rows="3" 
          placeholder="Take a note.......!" 
        />
    <button className="add-btn" type="submit">Add</button>
    </form>
  </div>
);
}
export default CreateArea;