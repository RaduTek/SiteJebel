import { Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import PageSection from "../../components/PageSection";

export default function CoursesPage() {
    return (
        <>
            <PageHeader height="small">
                <Typography variant="h3">Cursuri</Typography>
            </PageHeader>
            <PageSection sx={{ textAlign: "center", paddingTop: 5, gap: 2 }}>
                <Typography variant="h4">
                    Cursurile vor fi disponibile în curând.
                </Typography>
                <Typography>
                    Fii pe fază, cursurile vor apărea în curând.
                </Typography>
            </PageSection>
        </>
    );
}
