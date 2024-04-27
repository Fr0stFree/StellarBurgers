import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app.tsx';
import './index.css';
import {Route, Routes} from "react-router-dom";
import BurgersMenuPage from "./pages/burgers-menu-page/burgers-menu-page.tsx";
import NotFoundPage from "./pages/not-found-page/not-found-page.tsx";
import CombinedProviders from "./hocs/CombinedProviders.tsx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <CombinedProviders>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route index element={<BurgersMenuPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Route>
    </Routes>
  </CombinedProviders>
);
