import { Outlet } from "react-router-dom";
import { Card, CssBaseline, Box, Typography } from "@mui/material";
import Theme from "../layouts/Theme";
import { Auth } from "./Auth";

export default function AuthLayout() {
    return (
        <Auth>
            <Theme>
                <CssBaseline />
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "35vh",
                        backgroundColor: "#ddd",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        padding: { xs: 3, md: 6 },
                        gap: { xs: 3, md: 6 },
                        zIndex: -1000,
                    }}
                ></Box>
                <Box
                    sx={{
                        height: "70vh",
                        margin: "0 auto",
                        maxWidth: "1200px",
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        padding: { xs: 4, md: 6 },
                        gap: { xs: 4, md: 6 },
                    }}
                >
                    <Box
                        sx={{
                            flex: { xs: "unset", md: 1 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h3" align="center">
                            Intră și tu în comunitatea tinerilor din Jebel.
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: { xs: "start", md: "center" },
                        }}
                    >
                        <Card
                            sx={{
                                flex: 1,
                                maxWidth: "600px",
                                width: "100%",
                                minHeight: "70%",
                                margin: "0 auto",
                                padding: 2,
                                display: "flex",
                                flexDirection: "column",
                            }}
                            elevation={4}
                        >
                            <Outlet />
                        </Card>
                    </Box>
                </Box>
            </Theme>
        </Auth>
    );
}
