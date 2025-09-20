import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import "./App.css"

//pages
import Home from "./pages/Homepage.jsx";
import Spacecrafts, { spacecraftsLoader } from "./pages/Spacecrafts.jsx";
import Planets, { planetsLoader } from "./pages/Planets.jsx";
import NotFound from "./pages/NotFound.jsx";

//layouts
import RootLayout from "./layouts/RootLayout.jsx";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <RootLayout /> }>
    <Route index element={ <Home /> } />
    <Route path="spacecrafts" element={ <Spacecrafts /> } loader={ spacecraftsLoader } />
    <Route path="planets" element={ <Planets /> } loader={ planetsLoader } />
    <Route path="*" element={ <NotFound /> } />
  </Route>
))

function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
