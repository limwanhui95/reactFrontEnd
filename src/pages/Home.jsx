import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Header from "../component/Header";
import NoteForm from "../component/NoteForm";
import Note from "../component/Note";
import NoteList from "../component/NoteList";

function Home() {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [user,setUser] = useState({
        id: "",
        username: "",
    });

    useEffect(()=>{
        const verifyUser = async () =>{
            if(!cookie.jwt) {
                // no cookie hence navigate to login
                console.log("no cookie");
                navigate("/login");
            } else {
                // cookie is there try to login
                const { data } = await axios.post(
                    process.env.REACT_APP_BACKEND_URL,
                    {},
                    { withCredentials: true },
                );

                if(!data.loginStatus) {
                    // login status is false
                    console.log("login status false");
                    removeCookie("jwt");
                    navigate("/login");
                } else {
                    // when login status is true;
                    setUser({
                        id: data.id,
                        user: data.user,
                    });
                    console.log("login");
                }
            }
        };
        verifyUser();
    },[cookie,navigate,removeCookie]);
    
    function logOut() {
        removeCookie("jwt");
        navigate("/login");
    }


    return (
        <div>
            <Header user={user.user} logOut={logOut}/>
            <NoteForm userId={user.id}/>
            <NoteList userId={user.id}/>
            <ToastContainer />
        </div>
    )
}

export default Home;