import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import PhotoPicker from "./PhotoPicker";

export default function PhotoField({
    name,
    defaultValue,
    required,
}: {
    name?: string;
    defaultValue?: string;
    required?: boolean | undefined;
}) {
    const [photo, setPhoto] = useState<string>(
        defaultValue ? defaultValue : ""
    );
    const [pickerOpen, setPickerOpen] = useState(false);

    const pickPhoto = () => {
        setPickerOpen(true);
    };

    const removePhoto = () => {
        setPhoto("");
    };

    const pickerClose = (photo: string) => {
        setPickerOpen(false);
        setPhoto(photo);
    };

    return (
        <>
            <PhotoPicker open={pickerOpen} onClose={pickerClose} />
            <input
                type="hidden"
                name={name}
                value={photo.length > 0 ? photo : ""}
            />
            <FormControl variant="outlined" fullWidth required={required}>
                <InputLabel htmlFor="photo-picker">Alege poza</InputLabel>
                <OutlinedInput
                    id="photo-picker"
                    type="text"
                    required={required}
                    value={photo.length > 0 ? "Poză" : ""}
                    endAdornment={
                        <InputAdornment position="end">
                            {photo ? (
                                <IconButton
                                    aria-label="remove-photo"
                                    edge="end"
                                    onClick={removePhoto}
                                >
                                    <Close />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="choose-photo"
                                    edge="end"
                                    onClick={pickPhoto}
                                >
                                    <AddPhotoAlternate />
                                </IconButton>
                            )}
                        </InputAdornment>
                    }
                    label="Alege poza"
                />
            </FormControl>
        </>
    );
}
