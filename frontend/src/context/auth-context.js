import React, { useState } from 'react';

// nazwa pliku wproawadza zamiesznie powinno być auth-provider

export const AuthContext = React.createContext({
    token: null,
    userId: null,
    login: (token, userId, tokenExpiration) => { },
    logout: () => { }
})

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token', null))
    const [userId, setUserId] = useState(localStorage.getItem('userId', null))
    const [tokenExp, setTokenExp] = useState(localStorage.getItem('tokenExp', null))

    const login = (token, userId, tokenExpiration) => {
        setToken(token)
        setUserId(userId)
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        const tokenExp = new Date().getMilliseconds() + tokenExpiration * 3600 * 1000
        setTokenExp(tokenExp)
        localStorage.setItem('tokenExp', tokenExp)
    }

    const logout = () => {
        setToken(null)
        setUserId(null)
        setTokenExp(null)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('tokenExp')
    }

    if (tokenExp && tokenExp < new Date().getMilliseconds()) {
        logout()
    }

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            token,
            userId,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider