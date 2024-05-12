import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import "@fontsource/roboto";
import "@fontsource/oswald";

const headingFont = "var(--heading-font)";
const pageWidth = "var(--page-width)";

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
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    margin: "0 auto",
                    maxWidth: pageWidth,
                    width: "100%",
                    minHeight: "64px",
                },
            },
        },
    },
});

export default function Theme({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
