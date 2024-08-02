import {
    Alert,
    AlertColor,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Tab,
    Tabs,
    TextField,
} from "@mui/material";
import { useState } from "react";

export default function PhotoPicker({
    open,
    onClose,
}: {
    open: boolean;
    onClose: (photo: string) => void;
}) {
    const [source, setSource] = useState<"file" | "url" | "gallery">("file");

    const [alert, setAlert] = useState<{
        severity: string;
        message: string;
    } | null>(null);

    const handleSourceChange = (
        event: React.SyntheticEvent,
        newValue: "file" | "url" | "gallery"
    ) => {
        setSource(newValue);
        setAlert(null);
    };

    const checkIfImageUrl = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    };

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        const formData = new FormData(event.currentTarget);

        let photo: string = "";

        if (source === "file") {
            // Upload photo and return URL

            const response = await fetch("/api/admin/uploads/upload.php", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();

                if (result.status === "ok") {
                    photo = result.url;
                } else {
                    setAlert({
                        severity: "error",
                        message: "Încărcarea imaginii a eșuat",
                    });
                    return;
                }
            } else {
                setAlert({
                    severity: "error",
                    message: "Încărcarea imaginii a eșuat",
                });
                return;
            }
        } else if (source === "url") {
            const url = formData.get("url") as string;

            // Validate URL
            if (url) {
                const isImageUrl = await checkIfImageUrl(url);
                if (isImageUrl) {
                    photo = url;
                } else {
                    setAlert({
                        severity: "error",
                        message: "Link-ul nu corespunde unei imagini",
                    });
                    return;
                }
            } else {
                setAlert({
                    severity: "error",
                    message: "Link-ul este invalid",
                });
                return;
            }
        }

        // reset form and source
        event.currentTarget?.reset();
        setSource("file");
        setAlert(null);

        // return photo object
        onClose(photo);
    };

    const handleCancel = () => {
        onClose("");
    };

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            PaperProps={{
                component: "form",
                onSubmit: handleFormSubmit,
            }}
        >
            <DialogTitle>Alege o poză</DialogTitle>
            <DialogContent
                sx={{
                    width: { md: "400px" },
                    minHeight: "250px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Tabs value={source} onChange={handleSourceChange}>
                    <Tab label="Din fișier" value="file" sx={{ flex: 1 }} />
                    <Tab label="Din link" value="url" sx={{ flex: 1 }} />
                    {/* <Tab label="Din galerie" value="gallery" sx={{ flex: 1 }} /> */}
                </Tabs>
                <input type="hidden" name="source" value={source} />

                {source === "file" && (
                    <Box>
                        <input type="file" name="file" required />
                    </Box>
                )}

                {source === "url" && (
                    <Stack
                        sx={{
                            justifyContent: "center",
                            gap: 1.5,
                            flex: 1,
                        }}
                    >
                        <TextField
                            required
                            type="url"
                            name="url"
                            fullWidth
                            label="URL către poză"
                            variant="outlined"
                            inputProps={{ maxLength: 255 }}
                        />
                    </Stack>
                )}

                {source === "gallery" && <Box>Gallery picker goes here</Box>}

                {alert && (
                    <Alert
                        severity={alert.severity as AlertColor}
                        sx={{ px: 1, py: 0 }}
                    >
                        {alert.message}
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Anulare</Button>
                <Button type="submit" color="success">
                    {source === "file" ? "Încarcă" : "Alege"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
