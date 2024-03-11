import { React, useEffect } from "react";
import RegisterForm from "../component/RegisterForm";
import Divider from "@mui/material/Divider";
import { Card } from "@mui/material";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


function Register() {   
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
                <RegisterForm toastError={generateError} navigate={navigate} />
                <Divider>Already have an account? <Link to="/login">Login</Link></Divider>
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

export default Register;