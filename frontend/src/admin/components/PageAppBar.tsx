import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useAtom } from "jotai";
import { adminDrawerOpen } from "../../atoms";
import { Menu } from "@mui/icons-material";

export default function PageAppBar({
    title,
    children,
}: {
    title: string;
    children?: React.ReactNode;
}) {
    const isLargeScreen = useMediaQuery("(min-width: 900px)");
    const [drawerOpen, setDrawerOpen] = useAtom(adminDrawerOpen);
    const toggleDrawer = (newOpen: boolean) => () => {
        setDrawerOpen(newOpen);
    };

    return (
        <>
            <AppBar sx={{ position: "sticky", width: "100%" }}>
                <Toolbar>
                    {!isLargeScreen && !drawerOpen && (
                        <IconButton onClick={toggleDrawer(true)}>
                            <Menu />
                        </IconButton>
                    )}
                    <Typography
                        variant="h4"
                        sx={{ flex: 1, paddingLeft: "6px" }}
                    >
                        {title}
                    </Typography>
                    {children}
                </Toolbar>
            </AppBar>
        </>
    );
}
