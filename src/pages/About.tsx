import { Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";

export default function AboutPage() {
    return (
        <>
            <PageHeader height="small">
                <Typography variant="h3">Despre Noi</Typography>
            </PageHeader>
            <PageSection></PageSection>
        </>
    );
}
