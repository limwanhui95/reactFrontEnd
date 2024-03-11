import React from "react";
import "../component/Note.css";
import axios from "axios";

function Note(props) {
    async function handleClick() {
        try {
            const deleteResult = await axios.delete(
                process.env.REACT_APP_BACKEND_URL +`/delete/${props.noteId}`,
            );
            console.log(`/delete/${props.noteId}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="note-div">   
            <h1 className="note-h1">{props.title}</h1>
            <p className="note-p">{props.content}</p>
            <button className="note-button" onClick={handleClick}>Delete</button>
        </div>
    );
}

export default Note;