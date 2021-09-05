import React, { useState } from 'react';

export const AuthContext = React.createContext({
    token: null,
    userId: null,
    login: (token, userId, tokenExpiration) => { },
    logout: () => { }
})

function AuthProvider({ children }) {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [tokenExp, setTokenExp] = useState(null)

    const login = (token, userId, tokenExpiration) => {
        setToken(token)
        setUserId(userId)
        setTokenExp(tokenExpiration)
    }

    const logout = () => {
        setToken(null)
        setUserId(null)
        setTokenExp(null)
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