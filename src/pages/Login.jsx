import React,{ useEffect } from "react";
import LoginForm from "../component/LoginForm";
import Divider from "@mui/material/Divider";
import { Card } from "@mui/material";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [cookies] = useCookies(['cookie-name']);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.jwt) {
          navigate("/");
        }
      }, [cookies, navigate]);

    function generateError(error) {
        toast.error(error,{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    return (
        <div>
            <Card variant="outlined" className="login-page-form">
                <h1 style={{textAlign: "center", margin: "30px 0px"}}>Welcome</h1>
                <LoginForm toastError={generateError} navigate={navigate}/>
                <Divider>Don't have an account? <Link to="/register">Register</Link></Divider>
            </Card>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition= {Bounce}
            />
        </div>
    )
}

export default Login;