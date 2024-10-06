import { Outlet } from "react-router-dom";
import Theme from "./Theme";
import {
    CssBaseline,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    useMediaQuery,
    Box,
    Stack,
    IconButton,
    Divider,
    ListItemIcon,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../utils/handleRouterPush";
import { useAtom, useAtomValue } from "jotai";
import { adminDrawerOpen, authDataAtom } from "../atoms";
import {
    Block,
    ChevronLeft,
    Dashboard,
    Group,
    Home,
    Logout,
    Today,
} from "@mui/icons-material";
import { useEffect } from "react";

const sidebarLinks = [
    {
        name: "Panou administrativ",
        icon: <Dashboard />,
        target: "/admin/",
    },
    {
        name: "Activități",
        icon: <Today />,
        target: "/admin/events",
    },
    {
        name: "Postări",
        icon: <Today />,
        target: "/admin/posts",
    },
    {
        name: "Administratori",
        icon: <Group />,
        target: "/admin/users",
    },
    {
        name: "Înapoi la site",
        icon: <Home />,
        target: "/",
    },
    {
        name: "Ieșire din cont",
        icon: <Logout />,
        target: "/logout",
    },
];

export default function Admin() {
    const navigate = useNavigate();
    const authData = useAtomValue(authDataAtom);

    const isLargeScreen = useMediaQuery("(min-width: 900px)");

    const drawerWidth = "250px";

    const [drawerOpen, setDrawerOpen] = useAtom(adminDrawerOpen);
    const toggleDrawer = (newOpen: boolean) => () => {
        setDrawerOpen(newOpen);
    };
    const drawerButtonClick = (event: React.MouseEvent) => {
        toggleDrawer(false)();
        handleRouterPush(navigate)(event);
    };

    useEffect(() => {
        if (authData && !authData.isAuthed) navigate("/login");
    }, [authData, navigate]);

    const fullScreenStyle = {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
    };

    const loadingPage = (
        <Box sx={fullScreenStyle}>
            <CircularProgress size="large" />
            <Typography variant="h5" align="center">
                Se încarcă
            </Typography>
        </Box>
    );

    const unauthorizedPage = (
        <Box sx={fullScreenStyle}>
            <Block sx={{ fontSize: "96px" }} />
            <Typography variant="h5" align="center">
                Nu ai acces la această pagină.
            </Typography>
        </Box>
    );

    return authData ? (
        authData.isAuthed && authData.isAdmin ? (
            <Theme>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <CssBaseline />
                    <Drawer
                        anchor="left"
                        variant={isLargeScreen ? "persistent" : "temporary"}
                        open={isLargeScreen || drawerOpen}
                    >
                        <Stack component="nav" sx={{ width: drawerWidth }}>
                            <Toolbar
                                sx={{
                                    paddingRight: "10px !important",
                                    justifyContent: "right",
                                }}
                            >
                                {!isLargeScreen && (
                                    <IconButton
                                        onClick={() => {
                                            setDrawerOpen(false);
                                        }}
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </Toolbar>
                            <Divider />

                            <List>
                                {sidebarLinks.map((link, index) => (
                                    <ListItemButton
                                        component="a"
                                        href={link.target}
                                        onClick={drawerButtonClick}
                                        key={index}
                                    >
                                        {link.icon && (
                                            <ListItemIcon
                                                sx={{ minWidth: "36px" }}
                                            >
                                                {link.icon}
                                            </ListItemIcon>
                                        )}
                                        <ListItemText>{link.name}</ListItemText>
                                    </ListItemButton>
                                ))}
                            </List>
                        </Stack>
                    </Drawer>
                    <Box
                        sx={{
                            paddingLeft: isLargeScreen ? drawerWidth : 0,
                            width: "100%",
                            flex: 1,
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Theme>
        ) : (
            unauthorizedPage
        )
    ) : (
        loadingPage
    );
}
