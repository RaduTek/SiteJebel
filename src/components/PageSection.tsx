import { Stack, SxProps } from "@mui/material";

export default function PageSection({
    sx,
    children,
}: {
    sx?: SxProps;
    children?: React.ReactNode;
}) {
    return (
        <Stack
            sx={{
                maxWidth: "var(--page-width)",
                margin: "0 auto",
                padding: "15px",
                ...sx,
            }}
        >
            {children}
        </Stack>
    );
}
