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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../utils/handleRouterPush";
import { useAtom } from "jotai";
import { adminDrawerOpen } from "./atoms";
import {
    ChevronLeft,
    Dashboard,
    Home,
    Logout,
    Today,
} from "@mui/icons-material";

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

    return (
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
                                        <ListItemIcon sx={{ minWidth: "36px" }}>
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
    );
}
