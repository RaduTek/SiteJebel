import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/Main";
import LandingPage from "./pages/Landing";
import Admin from "./admin/Admin";
import Overview from "./admin/pages/Overview";
import EventsPage from "./pages/Events";
import AuthLayout from "./auth/Layout";
import LoginPage from "./auth/Login";
import SignUpPage from "./auth/SignUp";
import CoursesPage from "./pages/courses/Courses";
import AboutPage from "./pages/About";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path: "/admin",
                element: <Overview />,
            },
        ],
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
            {
                path: "/events",
                children: [
                    {
                        path: "/events",
                        element: <EventsPage />,
                    },
                    {
                        path: "/events/past",
                        element: <EventsPage past={true} />,
                    },
                ],
            },
            {
                path: "/courses",
                element: <CoursesPage />,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignUpPage />,
            },
            {
                path: "/logout",
                element: <div>Logout prompt</div>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
