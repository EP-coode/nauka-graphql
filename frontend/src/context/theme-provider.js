import React, { useState } from 'react';

export const THEMES = Object.freeze({
    LIGHT: 'light',
    DARK: 'dark'
})

export const ThemeContext = React.createContext({
    theme: THEMES.DARK,
    setTheme: theme => { }
})

const ThemeProvider = ({ children }) => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const [theme, setTheme] = useState(systemPrefersDark ? THEMES.DARK : THEMES.LIGHT)

    const changeThemeHandler = (theme) => {
        if (Object.values(THEMES).indexOf(theme) >= 0) {
            setTheme(theme)
        }
    }

    return (
        <ThemeContext.Provider value={{ theme: theme, setTheme: changeThemeHandler }}>
            {children}
        </ThemeContext.Provider >
    )
}

export default ThemeProvider