import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layouts/Main";
import Landing from "./pages/Landing";
import Admin from "./admin/Admin";
import Overview from "./admin/pages/Overview";
import Events from "./pages/Events";

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
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/about",
                element: <div>About page</div>,
            },
            {
                path: "/events",
                element: <Events />,
            },
            {
                path: "/courses",
                element: <div>Course list</div>,
            },
        ],
    },
    {
        path: "/",
        children: [
            {
                path: "/login",
                element: <div>Login prompt</div>,
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
