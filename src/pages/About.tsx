import { Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";

export default function AboutPage() {
    return (
        <>
            <PageHeader height="small">
                <Typography variant="h3">Despre Noi</Typography>
            </PageHeader>
            <PageSection sx={{ paddingTop: 3, textAlign: "center", gap: 2 }}>
                <Typography variant="h4">
                    Vom reveni cu detalii în curând.
                </Typography>
                <Typography>
                    Până atunci, citește introducerea de pe pagina principală.
                </Typography>
            </PageSection>
        </>
    );
}
