import {
    Box,
    Button,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../utils/handleRouterPush";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleFormSubmit = (e: React.FormEvent) => {
        console.log(e);
        e.preventDefault();
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
                Intră în cont
            </Typography>
            <Divider />
            <Box sx={{ flex: 1 }}></Box>
            <TextField
                required
                id="email"
                name="email"
                type="email"
                label="Adresa de email"
                variant="filled"
            />
            <TextField
                required
                id="password"
                name="password"
                type="password"
                label="Parola"
                variant="filled"
            />
            <Box sx={{ flex: 1 }}></Box>
            <Divider />
            <Stack direction="column" alignItems="center" gap={2}>
                <Button type="submit" variant="contained" color="success">
                    Intră în cont
                </Button>
                <Button
                    component="a"
                    href="/signup"
                    color="secondary"
                    onClick={handleRouterPush(navigate)}
                >
                    Creează un cont
                </Button>
            </Stack>
        </Stack>
    );
}
