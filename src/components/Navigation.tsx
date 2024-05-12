import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    useMediaQuery,
} from "@mui/material";
import Logo from "./Logo";
import handleRouterPush from "../utils/handleRouterPush";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Close, Menu } from "@mui/icons-material";
import Socials from "./Socials";

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
                    <Stack
                        sx={{ width: 250, height: "100%" }}
                        direction="column"
                    >
                        <Toolbar
                            sx={{
                                display: "flex",
                                justifyContent: "right",
                                borderBottom: "1px solid #ccc",
                            }}
                        >
                            <IconButton onClick={toggleDrawer(false)}>
                                <Close fontSize="large" />
                            </IconButton>
                        </Toolbar>
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
                        <Box sx={{ flex: 1 }}></Box>
                        <Socials />
                    </Stack>
                </Drawer>
            )}
        </>
    );
}
