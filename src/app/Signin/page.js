'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/Admin")
    }
    return (
        <div className="text-center">
            <div className="mt-4 col-md-3 mx-auto p-2"> 
                <h1>Sign in</h1>
                <form onSubmit={handleForm} className="form">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                <p>Email</p>
                                <input onChange={(e) => setEmail(e.target.value)} 
                                required type="email" 
                                name="email" 
                                id="email" 
                                placeholder="example@mail.com"
                                className="form-control"
                                aria-describedby="emailHelp"
                                />
                            </label>
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                            <label className="mt-3" htmlFor="password">
                                <p>Password</p>
                                <input onChange={(e) => setPassword(e.target.value)} 
                                required 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="password"
                                className="form-control"
                                />
                            </label>
                        </div>
                       
                    <button type="submit" className="btn btn-primary">
                        Sign in
                    </button>
                </form>
            </div> 
        </div>
    );
}

export default Page;