import {
    Box,
    Button,
    Divider,
    LinearProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../utils/handleRouterPush";
import { authDataAtom } from "../atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const navigate = useNavigate();
    const [authData, setAuthData] = useAtom(authDataAtom);

    const [formLoading, setFormLoading] = useState(false);
    const [formPage, setFormPage] = useState<"form" | "success" | "error">(
        "form"
    );
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Navigate back to home page if user is authenticated
        // This should only happen when going to a login page while being authenticated
        if (formPage == "form" && authData && authData.isAuthed) navigate("/");
    }, [authData, navigate, formPage]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const formDataJson = JSON.stringify(Object.fromEntries(formData));

        fetch("/api/auth/login.php", {
            method: "POST",
            body: formDataJson,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFormLoading(false);

                if (data.authData) {
                    // All is well
                    setFormPage("success");

                    // Set auth data to response
                    setAuthData(data.authData);
                } else {
                    // Unknown error
                    const message =
                        data.status === "wrong_email_or_pass"
                            ? "Adresa de mail sau parola este greșită."
                            : data.status === "unknown_email"
                            ? "Adresa de mail nu este asociată cu niciun cont."
                            : "A avut loc o eroare necunoscută.";

                    setErrorMessage(message);
                    setFormPage("error");
                }
            })
            .catch((error) => {
                console.log(error);
                setFormPage("error");
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
                Intră în cont
            </Typography>
            <Stack sx={{ height: 20 }}>
                <Divider />
                {formLoading && <LinearProgress />}
            </Stack>
            {formPage === "form" ? (
                <>
                    <TextField
                        disabled={formLoading}
                        required
                        id="email"
                        name="email"
                        type="email"
                        label="Adresa de email"
                        variant="filled"
                    />
                    <TextField
                        disabled={formLoading}
                        required
                        id="password"
                        name="password"
                        type="password"
                        label="Parola"
                        variant="filled"
                    />
                    <Box sx={{ flex: 1 }}></Box>
                    <Divider />
                    <Stack direction="column" alignItems="center" gap={1}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                        >
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
                </>
            ) : formPage === "success" ? (
                <>
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ flex: 1, mx: 2 }}
                    >
                        Te-ai autentificat cu succes
                    </Typography>
                    <Box sx={{ flex: 1 }}></Box>
                    <Divider />
                    <Stack direction="column" alignItems="center" gap={1}>
                        <Button
                            component="a"
                            href="/"
                            variant="contained"
                            color="success"
                            onClick={handleRouterPush(navigate)}
                        >
                            Întoarce-te la site
                        </Button>
                    </Stack>
                    {authData && authData.isAdmin && (
                        <Stack direction="column" alignItems="center" gap={1}>
                            <Button
                                component="a"
                                href="/admin"
                                variant="contained"
                                color="info"
                                onClick={handleRouterPush(navigate)}
                            >
                                Panou administrativ
                            </Button>
                        </Stack>
                    )}
                </>
            ) : (
                <>
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ flex: 1, mx: 2 }}
                    >
                        {errorMessage}
                    </Typography>
                    <Box sx={{ flex: 1 }}></Box>
                    <Divider />
                    <Stack direction="column" alignItems="center" gap={1}>
                        <Button
                            variant="contained"
                            type="button"
                            onClick={() => setFormPage("form")}
                        >
                            Încearcă din nou
                        </Button>
                    </Stack>
                </>
            )}
        </Stack>
    );
}
