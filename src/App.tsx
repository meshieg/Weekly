import { useEffect, useContext, useState } from "react";
import { routes } from "./Routes";
import BottomToolbar from "./components/BottomToolbar/BottomToolbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Toolbar from "./components/Toolbar/Toolbar";
import { ToolbarProvider } from "./contexts/ToolbarContext";
import { AlertProvider } from "./contexts/AlertContext";
import { NewItemsProvider } from "./contexts/NewItemsStore/NewItemsProvider";
import FloatingActionButton from "./components/FloatingActionButton/FloatingActionButton";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AppProvider, useAppContext } from "./contexts/AppContext";

function App() {
  return (
    <div className="app">
      <AppProvider>
        <ToolbarProvider>
          <AlertProvider>
            <NewItemsProvider>
              <BrowserRouter>
                <Toolbar />
                <div className="app__content">
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <ProtectedRoute
                            allowedUserState={route.allowedUserState}
                          >
                            {route.element}
                          </ProtectedRoute>
                        }
                      />
                    ))}
                  </Routes>
                </div>
                <div className="app__bottom">
                  <FloatingActionButton />
                  <BottomToolbar />
                </div>
              </BrowserRouter>
            </NewItemsProvider>
          </AlertProvider>
        </ToolbarProvider>
      </AppProvider>
    </div>
  );
}

export default App;
