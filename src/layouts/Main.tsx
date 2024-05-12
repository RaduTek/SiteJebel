import { CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Main() {
    return (
        <>
            <Navigation />
            <CssBaseline />
            <Toolbar />
            <Outlet />
        </>
    );
}
