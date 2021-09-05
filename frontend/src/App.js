import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth'
import BookingPage from './pages/Booking'
import EventsPage from './pages/Events'
import MainNavigation from './components/Navigation/MainNavigation';
import { AuthContext } from './context/auth-context'

import './App.css';

function App() {
  const authContext = useContext(AuthContext)

  return (
    <BrowserRouter >
      <React.Fragment>
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
      </React.Fragment>
    </BrowserRouter >
  );
}

export default App;
