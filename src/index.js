import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Bookmarked from './Pages/Bookmarked/Bookmarked';
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path:"/bookmarked",
      element:<Bookmarked/>
    }

  ]
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


