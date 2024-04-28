import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider as ReduxProvider} from "react-redux";
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './components/app/app.tsx';
import store from "./services/store.ts";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ReduxProvider>
  </React.StrictMode>
);
