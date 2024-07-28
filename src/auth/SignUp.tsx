import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    LinearProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../utils/handleRouterPush";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { authDataAtom } from "../atoms";

export default function SignUpPage() {
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

        fetch("/api/auth/signup.php", {
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
                    setErrorMessage(
                        data.error || "A avut loc o eroare necunoscută."
                    );
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
            <Stack sx={{ height: 20 }}>
                <Divider />
                {formLoading && <LinearProgress />}
            </Stack>
            {formPage === "form" ? (
                <>
                    <TextField
                        disabled={formLoading}
                        required
                        id="name"
                        name="name"
                        type="text"
                        label="Numele tău"
                        variant="filled"
                    />
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
                        id="phone"
                        name="phone"
                        type="phone"
                        label="Număr de telefon"
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
                    <FormControlLabel
                        disabled={formLoading}
                        required
                        control={<Checkbox />}
                        label="Sunt de acord cu politica de confidențialitate"
                    />
                    <Box sx={{ flex: 1 }}></Box>
                    <Divider />
                    <Stack direction="column" alignItems="center" gap={1}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            disabled={formLoading}
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
                        Contul tău a fost creat cu succes
                    </Typography>
                    <Box sx={{ flex: 1 }}></Box>
                    <Divider />
                    <Stack direction="column" alignItems="center" gap={1}>
                        <Button
                            type="submit"
                            component="a"
                            href="/account"
                            variant="contained"
                            color="success"
                            onClick={handleRouterPush(navigate)}
                        >
                            Spre contul tău
                        </Button>
                    </Stack>
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
