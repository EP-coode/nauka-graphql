import React from 'react';
import { NavLink } from 'react-router-dom'

import './MainNavigation.css'

function mainNavigation() {
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
                    <li>
                        <NavLink to="/bookings">
                            Booking
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/auth">
                            Auth
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default mainNavigation