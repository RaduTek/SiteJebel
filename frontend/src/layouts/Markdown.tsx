import { createTheme, ThemeProvider } from "@mui/material";
import MuiMarkdown from "mui-markdown";

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
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontSize: "2rem",
                    marginBottom: "1rem",
                },
                h2: {
                    fontSize: "1.75rem",
                    marginBottom: "1rem",
                },
                h3: {
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                },
                h4: {
                    fontSize: "1.25rem",
                    marginBottom: "1rem",
                },
                h5: {
                    fontSize: "1rem",
                    marginBottom: "1rem",
                },
                h6: {
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                },
                body1: {
                    marginBottom: "1rem",
                },
            },
        },
    },
});

export default function Markdown({ text }: { text?: string }) {
    return (
        <ThemeProvider theme={theme}>
            <div className="markdownHost">
                <MuiMarkdown>{text}</MuiMarkdown>
            </div>
        </ThemeProvider>
    );
}
