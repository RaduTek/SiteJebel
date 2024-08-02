import { Button, Stack, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import Timeline from "../components/Timeline";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../utils/handleRouterPush";

export default function EventsPage({ past }: { past?: boolean }) {
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
            <Timeline past={past} />
        </>
    );
}
