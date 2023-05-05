import { routes } from "./Routes";
import BottomToolbar from "./components/BottomToolbar/BottomToolbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./general.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app__header"></div>
        <div className="app__content">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
        <div className="app__bottom">
          <BottomToolbar />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
