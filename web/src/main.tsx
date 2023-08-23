import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const element = document.getElementById('root');

if (!element) throw new Error('Element #root not found!');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
