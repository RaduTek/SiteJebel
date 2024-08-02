import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import Event from "../../../components/Timeline/Event";
import { useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import PhotoField from "../../components/Photo/PhotoField";

const eventColors = [
    {
        name: "Roșu",
        color: "#EE0000",
    },
    {
        name: "Verde",
        color: "#008800",
    },
    {
        name: "Albastru",
        color: "#000088",
    },
];

export default function EditModal({
    open,
    onClose,
    onSuccess,
    event,
}: {
    open: boolean;
    onClose: () => void;
    onSuccess?: (event: Event) => void;
    event?: Event;
}) {
    const editMode = event !== undefined;

    const eventData: Event = editMode
        ? event
        : ({
              title: "",
              date: new Date().toISOString(), // Use ISO format for new Date
              visible: true,
              description: "",
              photoUrl: "",
              color: "",
              linkUrl: "",
              linkTitle: "",
          } as Event);

    const [formLoading, setFormLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs>(
        dayjs(eventData.date)
    );
    const [formStatus, setFormStatus] = useState<string | null>(null); // Status message

    const handleDateChange = (newDate: Dayjs | null) => {
        if (newDate) setSelectedDate(newDate);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormLoading(true);
        setFormStatus(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.set("date", selectedDate.format("YYYY-MM-DD HH:mm:ss")); // Use MySQL datetime format

        // Convert FormData to a plain object
        const formDataObject: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        // Keep ID in data for edit mode
        if (editMode) {
            formDataObject.id = event.id;
        }

        // Ensure `visible` is a boolean value (0 or 1)
        formDataObject.visible = formDataObject.visible === "on" ? 1 : 0;

        console.log(formDataObject);

        const url = editMode
            ? `/api/admin/events/edit.php?id=${eventData.id}`
            : `/api/admin/events/create.php`;

        console.log(formDataObject);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObject),
        });

        if (response.ok) {
            setFormStatus(
                editMode
                    ? "Event updated successfully"
                    : "Event created successfully"
            );
            if (!editMode) {
                // Reset the form for new event creation
                setSelectedDate(dayjs());
                form?.reset();
            }
        } else {
            setFormStatus("An error occurred");
        }

        setFormLoading(false);

        if (editMode) {
            if (onSuccess) {
                onSuccess(formDataObject as Event);
            }
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                onSubmit: handleFormSubmit,
            }}
        >
            <DialogTitle>
                {editMode ? "Editează activitatea" : "Adaugă o activitate"}
            </DialogTitle>

            <DialogContent sx={{ minWidth: { md: 400 } }}>
                <Stack
                    sx={{
                        marginTop: 2,
                        flexDirection: { xs: "column", md: "row" },
                        gap: { md: 2 },
                    }}
                >
                    <Stack gap={2}>
                        <TextField
                            autoFocus
                            required
                            name="title"
                            type="text"
                            fullWidth
                            label="Nume"
                            variant="outlined"
                            defaultValue={eventData.title}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Dată și Oră"
                                value={selectedDate}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD HH:mm:ss" // MySQL format
                            />
                        </LocalizationProvider>

                        <TextField
                            name="linkTitle"
                            type="text"
                            fullWidth
                            label="Titlul linkului"
                            variant="outlined"
                            defaultValue={eventData.linkTitle}
                        />

                        <TextField
                            name="linkUrl"
                            type="url"
                            fullWidth
                            label="Adresa linkului"
                            variant="outlined"
                            defaultValue={eventData.linkUrl}
                        />

                        <FormControl required fullWidth>
                            <InputLabel id="color-label">Culoare</InputLabel>
                            <Select
                                required
                                name="color"
                                labelId="color-label"
                                defaultValue={eventData.color}
                                label="Culoare"
                                fullWidth
                            >
                                {eventColors.map((value, index) => (
                                    <MenuItem key={index} value={value.color}>
                                        <Stack
                                            gap={1}
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Box
                                                sx={{
                                                    borderRadius: "100%",
                                                    backgroundColor:
                                                        value.color,
                                                    width: 18,
                                                    height: 18,
                                                }}
                                            ></Box>
                                            {value.name}
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <PhotoField
                            name="photoUrl"
                            defaultValue={eventData.photoUrl}
                        />

                        <FormControlLabel
                            disabled={formLoading}
                            control={
                                <Checkbox
                                    name="visible"
                                    defaultChecked={eventData.visible}
                                />
                            }
                            label="Vizibil pe site"
                        />
                    </Stack>

                    <TextField
                        required
                        name="description"
                        type="text"
                        fullWidth
                        label="Descriere"
                        multiline
                        variant="outlined"
                        defaultValue={eventData.description}
                    />
                </Stack>
                {formStatus && <p>{formStatus}</p>}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Anulare</Button>
                <Button type="submit" disabled={formLoading} color="success">
                    {editMode ? "Salvează" : "Adaugă"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
