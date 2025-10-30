import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // <-- 1. Import this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- 2. Wrap your App component */}
      <App />
    </BrowserRouter> {/* <-- 3. Don't forget to close it */}
  </React.StrictMode>
);