import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./store";
import { Provider } from "react-redux";
import MemoryGame from './MemoryGame';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
        <MemoryGame />
    </Provider>
  // </React.StrictMode>
);
