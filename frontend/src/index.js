import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import AuthProvider from './context/auth-context'
import ThemeProvider from './context/theme-provider'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
          <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);