import React from "react";
import "./style.css";

const ConfirmModal = ({isOpen , onClose, onConfirm, title}) =>{
    if(!isOpen) 
    return null;
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Delete Confirmation</h2>
                <p>Are you sure you want to delete note "{title}"?</p>
                <div className="modal-btns">
                    <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
                    <button className="modal-btn confirm" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;