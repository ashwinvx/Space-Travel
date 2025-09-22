import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import "./App.css"

//pages
import Home from "./pages/Homepage.jsx";
import Spacecrafts, { destroySpacecraftAction, spacecraftsLoader } from "./pages/Spacecrafts.jsx";
import Spacecraft, { spacecraftLoader } from "./pages/Spacecraft.jsx";
import NewSpacecraftForm, { createSpacecraftAction } from "./pages/NewSpacecraftForm.jsx";
import Planets, { planetsLoader } from "./pages/Planets.jsx";
import NotFound from "./pages/NotFound.jsx";

//layouts
import RootLayout from "./layouts/RootLayout.jsx";
import SpacecraftLayout from "./layouts/SpacecraftLayout.jsx";



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <RootLayout /> }>
    <Route index element={ <Home /> } />
    <Route path="spacecrafts" element={ <SpacecraftLayout /> } >
      <Route index element={ <Spacecrafts /> } loader={ spacecraftsLoader } />
      <Route path=":id" element={ <Spacecraft /> } loader={ spacecraftLoader } />
      <Route path="new" element={ <NewSpacecraftForm /> } action={ createSpacecraftAction } />
      <Route path=":id/destroy" action={ destroySpacecraftAction } />
    </Route>
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
