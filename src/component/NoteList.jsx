import React, {useEffect, useState} from "react";
import Note from "./Note";
import axios from "axios";

export default function NoteList(props) {
    const [userNote,setUserNote] = useState([]);


    async function fetchUserNote() {
        if(props.userId) {
            try {
                const {data} = await axios.get(
                    process.env.REACT_APP_BACKEND_URL +`/allNote?userId=${props.userId}`,
                );
                if(data) {
                    setUserNote(data);
                } 
            } catch (err) {
                console.log(err);
            }            
        }
    }

    useEffect(()=>{
        fetchUserNote();
    });
    
    return (
        <div>
            {userNote.map((note,index)=>(
                <Note key={index} title={note.title} content={note.content} noteId={note.noteid}/>
            ))}
        </div>
    )
}
