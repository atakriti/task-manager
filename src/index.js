import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ContextFun from './ContextFun';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextFun>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </ContextFun>
);
reportWebVitals();
serviceWorkerRegistration.register();