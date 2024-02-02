import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import './index.css'
import Home from './pages/Home/Home.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import Films from './pages/Films/Films.jsx'
import AppNavbar from './components/AppNavbar.jsx'
import AppFooter from "./components/AppFooter.jsx";
import FilmDetails from './pages/FilmDetails/FilmDetails.jsx';
import BuyTickets from './pages/BuyTickets/BuyTickets.jsx';


//en outlet se redenrizan los diferentes componentes (páginas)

// https://stackoverflow.com/questions/75785717/i-am-using-createbrowserrouter-what-is-the-proper-way-to-have-header-and-footer
function AppLayout() {
  return <>
    <AppNavbar />
    <Outlet />
    <AppFooter />
  </>
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/",
      element: <Home />,
    },
    {
      path: "/films",
      element: <Films />,
    },
    {
      path: "/filmDetails/:id",
      element: <FilmDetails/>,
    },
    {
      path: "/buyTickets/:id",
      element: <BuyTickets/>,
    }]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
