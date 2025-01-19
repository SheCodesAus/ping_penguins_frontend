import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/LandingPage.jsx";

import NavBar from "./components/NavBar.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      children: [
          { path: "/", element: <HomePage /> },
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     {/* Here we wrap our app in the router provider so they render correctly */}
      <RouterProvider router={router} />
  </React.StrictMode>
);