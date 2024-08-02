import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import Event from "../../../components/Timeline/Event";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import EditModal from "./EditModal";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function EventRow({ event: initialEvent }: { event: Event }) {
    const [editOpen, setEditOpen] = useState(false);
    const [event, setEvent] = useState(initialEvent);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleEdit = async () => {
        const response = await fetch(
            "/api/admin/events/get.php?id=" + event.id
        );

        if (response.ok) {
            const data = await response.json();

            setEvent(data);
            setEditOpen(true);
        } else {
            console.error(response);
        }
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleEditSuccess = (newEvent: Event) => {
        setEvent(newEvent);
    };

    const handleDelete = () => {
        setDeleteOpen(true);
    };

    const handleConfirmDelete = async (result: boolean) => {
        setDeleteOpen(false);

        if (result) {
            const response = await fetch(
                "/api/admin/events/delete.php?id=" + event.id
            );

            if (response.ok) {
                setDeleted(true);
            } else {
                console.error(response);
            }
        }
    };

    return deleted ? (
        <></>
    ) : (
        <>
            <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.visible ? "Vizibil" : "Ascuns"}</TableCell>
                <TableCell sx={{ p: 0 }}>
                    <Tooltip title="Editează">
                        <IconButton onClick={handleEdit}>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Șterge">
                        <IconButton color="error" onClick={handleDelete}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            {editOpen && (
                <EditModal
                    open={editOpen}
                    event={event}
                    onClose={handleEditClose}
                    onSuccess={handleEditSuccess}
                />
            )}
            {deleteOpen && (
                <ConfirmDialog
                    open={deleteOpen}
                    onClose={handleConfirmDelete}
                    title="Ștergere"
                    text={
                        "Sigur vrei să ștergi evenimentul: " + event.title + "?"
                    }
                    okText="Șterge"
                    okDestructive
                />
            )}
        </>
    );
}
