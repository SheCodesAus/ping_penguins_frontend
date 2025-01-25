import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";
import WorkshopPage from "./pages/WorkshopPage.jsx";
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      children: [
          { path: "/", element: <LandingPage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignUpPage /> },
          { path: "/workshop", element: <WorkshopPage /> },
          { path: "/error", element: <ErrorPage />}
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     {/* Wrap app in the router provider so they render correctly */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);