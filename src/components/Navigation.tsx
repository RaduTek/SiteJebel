import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    useMediaQuery,
} from "@mui/material";
import Logo from "./Logo";
import handleRouterPush from "../utils/handleRouterPush";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu } from "@mui/icons-material";

const links = [
    {
        name: "Despre Noi",
        target: "/about",
    },
    {
        name: "Activități",
        target: "/events",
    },
    {
        name: "Cursuri",
        target: "/courses",
    },
];
const mobileLinks = [
    {
        name: "Acasă",
        target: "/",
    },
    {
        name: "Despre Noi",
        target: "/about",
    },
    {
        name: "Activități",
        target: "/events",
    },
    {
        name: "Cursuri",
        target: "/courses",
    },
];

export default function Navigation() {
    const navigate = useNavigate();
    const isLargeScreen = useMediaQuery("(min-width: 800px)");

    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setDrawerOpen(newOpen);
    };
    const drawerButtonClick = (event: React.MouseEvent) => {
        toggleDrawer(false)();
        handleRouterPush(navigate)(event);
    };

    return (
        <>
            <AppBar>
                <Toolbar>
                    <a
                        href="/"
                        onClick={handleRouterPush(navigate)}
                        style={{ display: "block", height: "60px" }}
                    >
                        <Logo variant="header_auto" />
                    </a>
                    <Box sx={{ flex: 1 }} />
                    {isLargeScreen ? (
                        links.map((link, index) => (
                            <Button
                                component="a"
                                href={link.target}
                                onClick={handleRouterPush(navigate)}
                                key={index}
                            >
                                {link.name}
                            </Button>
                        ))
                    ) : (
                        <IconButton
                            onClick={toggleDrawer(true)}
                            color="primary"
                        >
                            <Menu fontSize="large" />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            {!isLargeScreen && (
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <Box sx={{ width: 250 }}>
                        <List>
                            {mobileLinks.map((link, index) => (
                                <ListItemButton
                                    component="a"
                                    href={link.target}
                                    onClick={drawerButtonClick}
                                    key={index}
                                >
                                    <ListItemText>{link.name}</ListItemText>
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            )}
        </>
    );
}
