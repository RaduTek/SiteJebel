import { Box } from "@mui/material";
import PageSection from "./PageSection";

export default function PageHeader({
    color,
    image,
    height,
    children,
    verticalAlign,
}: {
    color?: { background?: string; foreground?: string };
    height?: "large" | "small" | string;
    image?: string;
    children: React.ReactNode;
    verticalAlign?: "start" | "center" | "end";
}) {
    return (
        <Box
            sx={{
                position: "relative",
                color: color ? color.foreground : "inherit",
                backgroundColor: color ? color.background : "#eee",
                userSelect: "none",
                overflow: "hidden",
            }}
        >
            <PageSection
                sx={{
                    position: "relative",
                    backgroundImage: image ? `url(${image})` : null,
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
                    justifyContent: verticalAlign ? verticalAlign : "center",
                    padding: "20px",
                    gap: "15px",
                    zIndex: 50,
                    textAlign: "center",
                }}
            >
                {children}
            </PageSection>
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundImage: image ? `url(${image})` : null,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    filter: "blur(10px)",
                    transform: "scale(1.05)",
                }}
            ></Box>
        </Box>
    );
}
