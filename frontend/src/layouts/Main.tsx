import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Theme from "./Theme";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <Theme>
            <Navigation />
            <CssBaseline />
            <Box sx={{ minHeight: "80vh" }}>
                <Toolbar />
                <Outlet />
            </Box>
            <Footer />
        </Theme>
    );
}
