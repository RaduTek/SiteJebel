import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../utils/handleRouterPush";
import { authDataAtom } from "../atoms";
import { useAtom } from "jotai";

export default function LogoutPage() {
    const navigate = useNavigate();
    const [authData, setAuthData] = useAtom(authDataAtom);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch("/api/auth/logout.php", {
            method: "POST",
        })
            .then((data) => {
                setAuthData(undefined);
                handleRouterPush(navigate, "/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Stack
            component="form"
            method="POST"
            onSubmit={handleFormSubmit}
            gap={2}
            sx={{ flex: 1 }}
        >
            <Typography variant="h4" align="center">
                Ieși din cont
            </Typography>
            <Stack sx={{ height: 20 }}>
                <Divider />
            </Stack>

            <Typography variant="h5" align="center" sx={{ flex: 1, mx: 2 }}>
                {authData
                    ? authData.isAuthed
                        ? "Sigur dorești să ieși din cont?"
                        : "Nu ești autentificat"
                    : "Se încarcă"}
            </Typography>
            <Box sx={{ flex: 1 }}></Box>
            <Divider />

            <Stack direction="column" alignItems="center" gap={1}>
                {authData && authData.isAuthed ? (
                    <Button type="submit" variant="contained" color="success">
                        Ieși din cont
                    </Button>
                ) : (
                    <Button
                        component="a"
                        variant="contained"
                        color="success"
                        href="/login"
                        onClick={handleRouterPush(navigate)}
                    >
                        Spre autentificare
                    </Button>
                )}

                <Button
                    component="a"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Înapoi la site
                </Button>
            </Stack>
        </Stack>
    );
}
