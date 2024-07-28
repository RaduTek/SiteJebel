import { Stack, Typography } from "@mui/material";
import PageAppBar from "../components/PageAppBar";

export default function Overview() {
    return (
        <>
            <PageAppBar title="Panou Administrativ" />
            <Stack sx={{ p: 2, gap: 2 }}>
                <Typography variant="h4">
                    Bine ai venit în panoul administrativ!
                </Typography>
                <Typography>Alege o opțiune din meniul alăturat.</Typography>
            </Stack>
        </>
    );
}
