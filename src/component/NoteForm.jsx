import React, { useState } from "react";
import "./NoteForm.css";
import axios from "axios";

function NoteForm(props) {
    const [note,setNote] = useState({
        title: "",
        content: "",
    });

    async function handleSubmit(event) {
        // add to databse
        event.preventDefault();
        try {
            const {data} = await axios.post(process.env.REACT_APP_BACKEND_URL+`/addPost`,{
                userid: props.userId,
                ...note,
            },{ withCredentials: true },);
            console.log(data);
        } catch (err) {
            console.log('error when post new note');
        }
        setNote({
            title: "",
            content: ""
        });       
    };

    function handleChange(event) {
        const {name,value} = event.target;
        setNote((prevState)=>{
            return ({
                ...prevState,
                [name]: value,
            });
        });
    };

    return (
        <div>
            <form className="note-form" action="submit" onSubmit={handleSubmit}>
                <input className="note-form-input" type="text" name="title" placeholder="Title" value={note.title} onChange={handleChange}/>
                <textarea className="note-form-input" type="text" name="content" placeholder="Take a note" value={note.content} rows="5" onChange={handleChange}/>
                <button className="note-form-button" type="submit">Add</button>
            </form>            
        </div>
    );
}

export default NoteForm;