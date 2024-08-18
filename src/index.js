import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root'); // Get the root element
const root = createRoot(container); // Create a root using createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
