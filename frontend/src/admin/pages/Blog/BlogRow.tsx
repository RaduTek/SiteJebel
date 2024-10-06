import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import Post from "../../../components/Blog/Post";

export default function BlogRow({ post }: { post: Post }) {
    const navigate = useNavigate();

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleEdit = () => {
        navigate("/api/admin/posts/edit/" + post.id);
    };

    const handleDelete = () => {
        setDeleteOpen(true);
    };

    const handleConfirmDelete = async (result: boolean) => {
        setDeleteOpen(false);

        if (result) {
            const response = await fetch(
                "/api/admin/posts/delete.php?id=" + post.id
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
            <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.visible ? "Vizibil" : "Ascuns"}</TableCell>
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
            {deleteOpen && (
                <ConfirmDialog
                    open={deleteOpen}
                    onClose={handleConfirmDelete}
                    title="Ștergere"
                    text={"Sigur vrei să ștergi postarea: " + post.title + "?"}
                    okText="Șterge"
                    okDestructive
                />
            )}
        </>
    );
}
