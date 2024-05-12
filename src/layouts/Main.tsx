import { CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Theme from "./Theme";

export default function Main() {
    return (
        <Theme>
            <Navigation />
            <CssBaseline />
            <Toolbar />
            <Outlet />
        </Theme>
    );
}
