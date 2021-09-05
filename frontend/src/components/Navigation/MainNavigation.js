import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth-context'
import './MainNavigation.css'

function MainNavigation() {
    const authContext = useContext(AuthContext)

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
        </header>
    )
}

export default MainNavigation