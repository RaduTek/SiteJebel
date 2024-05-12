import { Box } from "@mui/material";

export default function PageSection({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box
            sx={{
                maxWidth: "var(--page-width)",
                margin: "0 auto",
                padding: "15px",
            }}
        >
            {children}
        </Box>
    );
}
