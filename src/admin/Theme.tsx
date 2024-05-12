import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import "@fontsource/roboto";
import "@fontsource/oswald";

const headingFont = "var(--heading-font)";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ee5500",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
        h1: { fontFamily: headingFont },
        h2: { fontFamily: headingFont },
        h3: { fontFamily: headingFont },
        h4: { fontFamily: headingFont },
        h5: { fontFamily: headingFont },
        h6: { fontFamily: headingFont },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "white",
                    color: "black",
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    width: "100%",
                    minHeight: "64px",
                    padding: "0 10px !important",
                    gap: "6px",
                },
            },
        },
    },
});

export default function Theme({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
