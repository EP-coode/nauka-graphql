import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth'
import BookingPage from './pages/Booking'
import EventsPAge from './pages/Events'

import './App.css';

function App() {
  return (
    <BrowserRouter >
      <Switch>
        <Redirect
          from="/"
          to="/auth"
          exact
        />
        <Route
          path="/auth"
          component={AuthPage}
        />
        <Route
          path="/events"
          component={EventsPAge}
        />
        <Route
          path="/bookings"
          component={BookingPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
