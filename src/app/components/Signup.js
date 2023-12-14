'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation';
import Success from './Success';

function Signup() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [signupSuccess, setSignupSuccess] = React.useState(false);
    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault();

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error);
        }

        // else successful
        console.log(result)
        setEmail('');
        setPassword('');
        setSignupSuccess(true);
    }

    const closeModal = () => {
        setSignupSuccess(false); 
    }


    return (
    <div className="container">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign up new teachers here</h1>
            <form onSubmit={handleForm} className="form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" value={email} />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" value={password} />
                </label>
                <button type="submit">Sign up</button>
            </form>
        </div>
        {signupSuccess && <Success showSuccess={signupSuccess} onHide={closeModal}/>}

    </div>
    );
}

export default Signup;