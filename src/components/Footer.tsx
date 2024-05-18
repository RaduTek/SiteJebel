import { Box } from "@mui/material";
import PageSection from "./PageSection";
import Logo from "./Logo";

export default function Footer() {
    return (
        <Box sx={{ height: "20vh", backgroundColor: "#eee" }}>
            <PageSection sx={{ alignItems: "center" }}>
                <Logo variant="footer" />
            </PageSection>
        </Box>
    );
}
