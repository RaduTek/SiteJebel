import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layouts/Main";
import Landing from "./pages/Landing";
import Theme from "./layouts/Theme";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <div>Admin dashboard</div>,
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
                element: <div>Event list</div>,
            },
            {
                path: "/courses",
                element: <div>Course list</div>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Theme>
            <RouterProvider router={router} />
        </Theme>
    </React.StrictMode>
);

reportWebVitals();
