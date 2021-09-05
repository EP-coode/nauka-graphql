import React, { useContext, useRef, useState } from 'react';

import { AuthContext } from '../context/auth-context';
import '../App.css'
import './Auth.css'

function AuthPage() {
    const inputEmail = useRef(null)
    const inputPasswd = useRef(null)
    const [loginMode, setLoginMode] = useState(true)
    const authContext = useContext(AuthContext)

    const submitHandler = e => {
        e.preventDefault()
        const email = inputEmail.current.value
        const password = inputPasswd.current.value

        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }

        let requestBody;

        if (loginMode) {
            requestBody = {
                query: `
                query{
                    login(email: "${email}",password:"${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
            }
        }
        else {
            requestBody = {
                query: `
                mutation{
                    createUser(userInput: {email: "${email}",password:"${password}"}){
                        _id
                        email
                    }
                }
            `
            }
        }

        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Fail')
            }
            return res.json()
        }).then(resData => {
            console.log(resData);
            if (resData.data.login.token) {
                const { userId, token, tokenExpiration } = resData.data.login
                authContext.login(token, userId, tokenExpiration)
            }
        }).catch(err => {
            console.error(err)
        })
    }

    const handleSwitchMode = e => {
        e.preventDefault()
        setLoginMode(prev => !prev)
    }

    return (
        <form className="form auth-form">
            <div className="form__control">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" ref={inputEmail}></input>
            </div>
            <div className="form__control">
                <label htmlFor="password">password</label>
                <input type="password" id="password" ref={inputPasswd}></input>
            </div>
            <div className="form__actions">
                <button className="btn" type="button" onClick={handleSwitchMode}>
                    Go to {!loginMode ? "Login" : "Sign up"}
                </button>
                <button className="btn" type="button" onClick={submitHandler}>
                    {loginMode ? "Login" : "Sign up"}
                </button>
            </div>
        </form>
    )
}


export default AuthPage