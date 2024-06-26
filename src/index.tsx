import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider as ReduxProvider} from "react-redux";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import './index.css';
import 'react-tooltip/dist/react-tooltip.css';

import App from './components/app/app';
import store from "./services/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ReduxProvider store={store}>
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DndProvider>
  </ReduxProvider>
);
