import React, { useEffect, useState } from "react";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home"
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";
import External from "./External/External";

const siteRoutes = [<Route path='/' element={<External />} key='1' />, <Route path='/home' element={<Home />} key='2' />]

export default function App(props) {

  
  const [user, setUser] = useState(null);

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
    <Routes>
      {siteRoutes.map(siteRoute => siteRoute)}
    </Routes>
    </div>

  );
}
