import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/Main";
import LandingPage from "./pages/Landing";
import Admin from "./admin/Admin";
import AdminOverview from "./admin/pages/Overview";
import EventsPage from "./pages/Events";
import AuthLayout from "./auth/Layout";
import LoginPage from "./auth/Login";
import SignUpPage from "./auth/SignUp";
import CoursesPage from "./pages/courses/Courses";
import AboutPage from "./pages/About";
import { Auth } from "./auth/Auth";
import LogoutPage from "./auth/Logout";
import AdminEventsPage from "./admin/pages/Events/Events";
import { BlogPageLoader } from "./pages/blog/BlogPage";
import BlogPageList from "./pages/blog/BlogPageList";
import BlogPageView from "./pages/blog/BlogPageView";
import LinksPage from "./pages/Links";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path: "/admin",
                element: <AdminOverview />,
            },
            {
                path: "events",
                element: <AdminEventsPage />,
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
            {
                path: "/links",
                element: <LinksPage />,
            },
            {
                path: "/blog",
                element: <BlogPageList />,
            },
            {
                path: "/blog/:postId",
                element: <BlogPageView />,
                loader: BlogPageLoader,
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
                element: <LogoutPage />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Auth>
            <RouterProvider router={router} />
        </Auth>
    </React.StrictMode>
);

reportWebVitals();
