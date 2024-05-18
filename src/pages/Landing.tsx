import { Typography } from "@mui/material";
import PageSection from "../components/PageSection";
import PageHeader from "../components/PageHeader";
import LandingImage from "../images/banners/landing.jpg";
import Logo from "../components/Logo";

export default function LandingPage() {
    return (
        <>
            <PageHeader height="large" image={LandingImage} verticalAlign="end">
                <Logo variant="banner" />
            </PageHeader>
            <PageSection>
                <Typography>Landing page</Typography>
            </PageSection>
        </>
    );
}
