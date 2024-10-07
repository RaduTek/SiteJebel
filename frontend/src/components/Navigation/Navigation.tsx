import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    useMediaQuery,
} from "@mui/material";
import Logo from "../Logo";
import handleRouterPush from "../../utils/handleRouterPush";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Close, Menu } from "@mui/icons-material";
import Socials from "../Socials";
import { Links, MobileLinks } from "./Links";
import LargeButton from "./LargeButton";
import MobileButton from "./MobileButton";

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
                        Links.map((link, index) => (
                            <LargeButton link={link} key={index} />
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
                                justifyContent: "right",
                            }}
                        >
                            <IconButton onClick={toggleDrawer(false)}>
                                <Close fontSize="large" />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List>
                            {MobileLinks.map((link, index) => (
                                <MobileButton
                                    link={link}
                                    key={index}
                                    onClick={drawerButtonClick}
                                />
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
