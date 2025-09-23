import React from "react";
import "./style.css";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

const Note = (props) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickDel = () =>{
    setIsModalOpen(true);
  }
  
  const handleConfirmDel = () =>{
    props.onDelete(props.id);
    setIsModalOpen(false);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="delete-btn" onClick={handleClickDel}>
        Delete
      </button>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDel}
        title={props.title}
      />
    </div>
  );
}
 
export default Note;
