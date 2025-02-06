import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignupPage.jsx";
import WorkshopPage from "./pages/WorkshopPage.jsx";
import NavBar from "./components/NavBar.jsx";
import footer from "./components/Footer.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AdminPage from "./pages/BackupAdminPage.jsx";
import './style.css';
import HomePage from "./pages/HomePage.jsx";
import LandingPageStatic from "./pages/landingPageStatic.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      errorElement: <ErrorPage />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <SignUpPage /> },
          { path: "/workshoplanding/:id/", element: <LandingPage /> },
          { path: "/workshop/:id/", element: <WorkshopPage /> },
          { path: "*", element: <ErrorPage />},  // * captures all other routes not already defined
          { path: "/admin/", element: <AdminPage /> },  // Admin dashboard
          { path: "/workshoplanding/", element: <LandingPageStatic /> },
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