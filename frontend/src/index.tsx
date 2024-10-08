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
import AboutPage from "./pages/About";
import { Auth } from "./auth/Auth";
import LogoutPage from "./auth/Logout";
import AdminEventsPage from "./admin/pages/Events/Events";
import { BlogPageLoader } from "./pages/Blog/BlogPage";
import BlogPageList from "./pages/Blog/BlogPageList";
import BlogPageView from "./pages/Blog/BlogPageView";
import LinksPage from "./pages/Links";
import AdminBlogPosts from "./admin/pages/Blog/BlogPosts";
import BlogPostEdit from "./admin/pages/Blog/BlogEdit";
import Courses from "./pages/Courses/Courses";
import { CoursesLoader } from "./pages/Courses/Courses/Loader";
import Course from "./pages/Courses/Course";
import { CourseLoader } from "./pages/Courses/Course/Loader";
import CourseRun from "./pages/Courses/CourseRun";
import { CourseRunLoader } from "./pages/Courses/CourseRun/Loader";
import CourseQuiz from "./pages/Courses/CourseQuiz";
import { CourseQuizLoader } from "./pages/Courses/CourseQuiz/Loader";
import { CourseStartLoader } from "./pages/Courses/CourseStartLoader";
import CourseResult from "./pages/Courses/CourseResult";
import { CourseResultLoader } from "./pages/Courses/CourseResult/Loader";

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
            {
                path: "posts",
                element: <AdminBlogPosts />,
            },
            {
                path: "posts/new",
                element: <BlogPostEdit mode="new" />,
            },
            {
                path: "posts/edit/:id",
                element: <BlogPostEdit mode="edit" />,
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
                element: <Courses />,
                loader: CoursesLoader,
            },
            {
                path: "/course/:course_id",
                element: <Course />,
                loader: CourseLoader,
            },
            {
                path: "/course/:course_id/start",
                loader: CourseStartLoader,
            },
            {
                path: "/course/run/:progress_id/page/:page_id",
                element: <CourseRun />,
                loader: CourseRunLoader,
            },
            {
                path: "/course/quiz/:progress_id",
                element: <CourseQuiz />,
                loader: CourseQuizLoader,
            },
            {
                path: "/course/result/:progress_id",
                element: <CourseResult />,
                loader: CourseResultLoader,
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
