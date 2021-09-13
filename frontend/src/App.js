import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth'
import BookingPage from './pages/Booking'
import EventsPage from './pages/Events'
import MainNavigation from './components/Navigation/MainNavigation';
import { AuthContext } from './context/auth-context'

import './App.css';
import { ThemeContext } from './context/theme-provider';

function App() {
  const authContext = useContext(AuthContext)
  const themeContext = useContext(ThemeContext)

  return (
    <BrowserRouter >
      <div className={`${themeContext.theme}`}>
        <MainNavigation />
        <main>
          <Switch>
            {authContext.token && <Redirect from="/" to="/events" exact /> }
            {authContext.token && <Redirect from="/auth" to="/events" exact /> }
            {!authContext.token && <Route path="/auth" component={AuthPage} /> }
            <Route path="/events" component={EventsPage} />
            {authContext.token && <Route path="/bookings" component={BookingPage}/>}
            {!authContext.token && <Redirect to="/auth" exact />}
          </Switch>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;
