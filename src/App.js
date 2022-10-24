import React, { useEffect, useState } from "react";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Admin from "./Admin/Admin";
import External from "./External/External";



export default function App(props) {
  const [user, setUser] = useState(null);
  const siteRoutes = [
    {path: "/", element: <External user={user} />},
    {path: "/home", element: <Home user={user} />},
  ];

  useEffect(() => {
    fetch(`/api/user-utility/self`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setUser(false);
        }
      })
      .then((res) => {
        setUser(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navigation user={user} />
      <Routes>{siteRoutes.map((siteRoute, i) => <Route path={siteRoute.path} element={siteRoute.element} {...props} key={i} />)}</Routes>
    </div>
  );
}
