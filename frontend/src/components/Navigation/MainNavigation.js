import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context'
import { ThemeContext, THEMES } from '../../context/theme-provider'
import Switch from '../Switch/Switch'
import './MainNavigation.css'

function MainNavigation() {
    const authContext = useContext(AuthContext)
    const themeContext = useContext(ThemeContext)
    const [darkmode, setDarkmode] = useState(themeContext.theme === THEMES.DARK)

    const handleSwitchThemeClick = () => {
        switch (themeContext.theme) {
            case THEMES.DARK:
                themeContext.setTheme(THEMES.LIGHT)
                break;
            case THEMES.LIGHT:
                themeContext.setTheme(THEMES.DARK)
                break;
            default:
                themeContext.setTheme(THEMES.DARK)
        }
    }

    const handleToggleDarkMode = () => {
        handleSwitchThemeClick()
        setDarkmode(prev => !prev)
    }

    return (
        <header className="main-nav">
            <div className="main-nav__logo">
                <h1>Event Booker</h1>
            </div>
            <nav className="main-nav__items">
                <ul>
                    <li>
                        <NavLink to="/events">
                            Events
                        </NavLink>
                    </li>
                    {
                        authContext.token &&
                        <li>
                            <NavLink to="/bookings">
                                Booking
                            </NavLink>
                        </li>
                    }
                    {
                        !authContext.token &&
                        <li>
                            <NavLink to="/auth">
                                Login
                            </NavLink>
                        </li>
                    }
                    {
                        authContext.token &&
                        <li>
                            <button onClick={authContext.logout}>
                                Logout
                            </button>
                        </li>
                    }
                </ul>
            </nav>
            <div className="main-nav__tcheme-switch">
                <Switch value={darkmode} onToggle={handleToggleDarkMode} />
            </div>
        </header>
    )
}

export default MainNavigation