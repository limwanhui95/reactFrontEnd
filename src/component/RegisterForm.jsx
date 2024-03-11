import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import  axios from "axios";
import "./Form.css";


function LoginForm(props) {
    const [state,setState] = useState({
        username: "",
        password: "",
    });

    function handleChange(event) {
        const {name,value} = event.target;
        setState((prevState)=>{
            return ({
                ...prevState,
                [name]: value,
            })
        });
    }

    async function handleSubmit(event) {
        // get auth from backend
        event.preventDefault();
        try {
            // post user key in data to back end
            const {data} = await axios.post(process.env.REACT_APP_BACKEND_URL+`/register`,
                {
                    ...state,
                },
                {
                    withCredentials: true,
                },
            );
            if(data.error) {
                // if data contain error then toast error
                console.log("error");
                props.toastError(data.error);
            } else if (data.loginStatus) {
                // if login status is true thn navigate to homepage
                props.navigate("/");
            }
        } catch (err) {
            props.toastError(err.response.data.error);
        }     
        // clear current state
        setState({
            username: "",
            password: "",
        }) 
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit} >
                <div className="input-grid">
                    <PersonIcon className="label" style={{color:"grey", verticalAlign:"middle"}} />
                    <input onChange={handleChange} type="text" name="username" placeholder="Type your username" value={state.username}/>
                    <LockIcon className="label" style={{color:"grey", verticalAlign:"middle"}}/>
                    <input onChange={handleChange} type="password" name="password" placeholder="Type your password" value={state.password}/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default LoginForm;