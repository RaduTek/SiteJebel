import { Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import PageSection from "../../components/PageSection";

export default function BlogPageView() {
    return (
        <>
            <PageHeader height="small">
                <Typography variant="h3">Blog Post Title</Typography>
            </PageHeader>
            <PageSection></PageSection>
        </>
    );
}
