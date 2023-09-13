import React from "react";
import axios from "axios";
import { validateMail, validatePass } from "./validateFields";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import './index.css'

export default function LoginForm({setIsLogged})
{   
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [areValid, setAreValid] = React.useState({
        mail: false,
        pass: false,
    });

    const navigate = useNavigate();

    const handleMail = (ev) => {
        let mail = ev.target.value;
        
        setEmail(mail);
        setAreValid(prev => new Object({...prev, mail: validateMail(mail)}));
    }

    const handlePass = (ev) => {
        let pass = ev.target.value;

        setPassword(pass);
        setAreValid(prev => new Object({...prev, pass: validatePass(pass)}))
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        if(areValid.mail && areValid.pass)
        {
            axios
                .post('http://localhost:3001/login', {email, password})
                .then(() => {
                    let expireTime = (new Date()).getTime() + 3600*1000;
                    let expireDate = new Date();
                    expireDate.setTime(expireTime);

                    document.cookie = `email-drivers=${email};path=/;expires=${expireDate.toUTCString()};SameSite=None`;
                    setIsLogged(true);
                    navigate('/');
                })
                .catch((err) => alert(`${err.message}`));
        }

    };

    return (
        <form id="login" onSubmit={handleSubmit}>
            <input value={email} onChange={handleMail} type="email" />
            {!areValid.mail && <p className="error-msg">Invalid email</p>}

            <input value={password} onChange={handlePass} type="password"/>
            {!areValid.pass && <p className="error-msg">Password must have letters, and at least one number and special character (for example '@') </p>}
            <Button text="Submit" disabled={!(areValid.mail && areValid.pass)}/>
        </form>
    );
}