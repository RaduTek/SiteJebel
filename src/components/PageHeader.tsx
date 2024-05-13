import { Box } from "@mui/material";
import PageSection from "./PageSection";

export default function PageHeader({
    color,
    image,
    height,
    children,
}: {
    color?: { background?: string; foreground?: string };
    height?: "large" | "small" | string;
    image?: string;
    children: React.ReactNode;
}) {
    return (
        <Box
            sx={{
                position: "relative",
                color: color ? color.foreground : "inherit",
                backgroundColor: color ? color.background : "#eee",
                userSelect: "none",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundImage: image,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            ></Box>
            <PageSection
                sx={{
                    backgroundImage: image,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height: height
                        ? height === "large"
                            ? "50vh"
                            : height === "small"
                            ? "30vh"
                            : height
                        : "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    gap: "10px",
                }}
            >
                {children}
            </PageSection>
        </Box>
    );
}
