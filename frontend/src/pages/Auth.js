import React, { useContext, useState } from 'react';

import { AuthContext } from '../context/auth-context';
import '../App.css'
import './Auth.css'
import makeRequest, { createUser, login } from '../graphql/queries';

function AuthPage() {
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [loginMode, setLoginMode] = useState(true)
    const [errors, setErrors] = useState([])
    const authContext = useContext(AuthContext)

    const submitHandler = async e => {
        e.preventDefault()

        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }

        let requestBody;

        if (loginMode) {
            requestBody = login(email, password)
        }
        else {
            requestBody = createUser(email, password)
        }

        const data = await makeRequest('', requestBody)
        
        if (data.data.login) {
            const { userId, token, tokenExpiration } = data.data.login
            authContext.login(token, userId, tokenExpiration)
        }

        if (data.errors) {
            setErrors(data.errors)
        }

    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
        setErrors([])
    }
    const handlePassChange = e => {
        setPass(e.target.value)
        setErrors([])
    }

    const handleSwitchMode = e => {
        e.preventDefault()
        setLoginMode(prev => !prev)
        setErrors([])
    }

    const errorsComp = errors.map(error => (
        <li className="form__error" key={error.message}>
            {error.message}
        </li>
    ))

    return (
        <form className="form auth-form">
            <div className="form__control">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" onChange={handleEmailChange} value={email}></input>
            </div>
            <div className="form__control">
                <label htmlFor="password">password</label>
                <input type="password" id="password" onChange={handlePassChange} value={password}></input>
            </div>
            <div className="form__actions">
                <button className="btn" type="button" onClick={handleSwitchMode}>
                    Go to {!loginMode ? "Login" : "Sign up"}
                </button>
                <button className="btn" type="button" onClick={submitHandler}>
                    {loginMode ? "Login" : "Sign up"}
                </button>
            </div>
            <ul className="form__errors">
                {errorsComp}
            </ul>
        </form>
    )
}


export default AuthPage