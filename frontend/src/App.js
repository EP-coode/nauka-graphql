import React, { useContext } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth'
import BookingPage from './pages/Booking'
import EventsPAge from './pages/Events'
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
            {
              authContext.token ?
                <React.Fragment>
                  <Redirect from="/" to="/events" exact/>
                  <Redirect from="/auth" to="/events" exact/>
                  <Route path="/bookings" component={BookingPage}/>
                </React.Fragment>
                :
                <React.Fragment>
                  <Redirect from="/" to="/auth" exact/>
                  <Redirect from="/bookings" to="/auth" exact/>
                  <Route path="/auth" component={AuthPage}/>
                  <Route path="/events" component={EventsPAge}/>
                </React.Fragment>
            }
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter >
  );
}

export default App;
