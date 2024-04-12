import React from 'react';
import ReactDOM from 'react-dom/client';

import Base from "./Base.jsx"

import './index.css';
import WorldContentContextProvider from './components/world-content-context.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <WorldContentContextProvider>
    <Base />
  </WorldContentContextProvider>
  // </React.StrictMode>
);