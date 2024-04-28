import React, {FC} from "react";
import store from "../services/store.ts";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import {Provider as ReduxProvider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

type CombinedProvidersProps = {
  children: React.ReactNode
}

const CombinedProviders: FC<CombinedProvidersProps> = ({children}) => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </DndProvider>
      </ReduxProvider>
    </React.StrictMode>
  )
}

export default CombinedProviders;
