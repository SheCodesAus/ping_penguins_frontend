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
import AdminPage from "./pages/AdminPage.jsx";
import './style.css';
import HomePage from "./pages/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/workshop/:id",  // Workshop route at root level
    element: <WorkshopPage />,
  },
  {
    path: "/",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/board/:boardId", element: <WorkshopPage /> },
      { path: "*", element: <ErrorPage />},
      { path: "/admin", element: <AdminPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);