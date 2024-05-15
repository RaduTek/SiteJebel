import { Button, Stack, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";
import Timeline from "../components/Timeline";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../utils/handleRouterPush";

export default function Events({ past }: { past?: boolean }) {
    const navigate = useNavigate();

    return (
        <>
            <PageHeader height="small">
                <Typography variant="h2">Activități</Typography>
                <Stack direction="row" gap={2}>
                    <Button
                        component="a"
                        href="/events"
                        onClick={handleRouterPush(navigate)}
                        variant={past ? "outlined" : "contained"}
                    >
                        Următoare
                    </Button>
                    <Button
                        component="a"
                        href="/events/past"
                        onClick={handleRouterPush(navigate)}
                        variant={past ? "contained" : "outlined"}
                    >
                        Din Trecut
                    </Button>
                </Stack>
            </PageHeader>
            <PageSection sx={{ paddingBottom: 0 }}>
                <Timeline past={past} />
            </PageSection>
        </>
    );
}
