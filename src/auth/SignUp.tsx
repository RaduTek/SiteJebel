import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../utils/handleRouterPush";
import { ArrowBack } from "@mui/icons-material";

export default function SignUpPage() {
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
            <Stack direction="row">
                <IconButton
                    component="a"
                    href="/login"
                    color="inherit"
                    onClick={handleRouterPush(navigate)}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4" align="center" sx={{ flex: 1 }}>
                    Creează un cont
                </Typography>
                <Box sx={{ width: 40 }} />
            </Stack>
            <Divider />
            <Box sx={{ flex: 1 }}></Box>
            <TextField
                required
                id="name"
                name="name"
                type="text"
                label="Numele tău"
                variant="filled"
            />
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
            <FormControlLabel
                required
                control={<Checkbox />}
                label="Sunt de acord cu politica de confidențialitate"
            />
            <Box sx={{ flex: 1 }}></Box>
            <Divider />
            <Stack direction="column" alignItems="center" gap={2}>
                <Button type="submit" variant="contained" color="success">
                    Creează un cont
                </Button>
            </Stack>
        </Stack>
    );
}
