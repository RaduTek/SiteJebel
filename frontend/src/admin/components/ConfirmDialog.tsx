import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default function ConfirmDialog({
    open,
    onClose,
    title,
    text,
    okText,
    okDestructive,
    cancelText,
}: {
    open: boolean;
    onClose: (result: boolean) => void;
    title: string;
    text: string;
    okText?: string;
    okDestructive?: boolean;
    cancelText?: string;
}) {
    const handleOK = () => {
        onClose(true);
    };

    const handleCancel = () => {
        onClose(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} autoFocus={okDestructive}>
                    {cancelText ? cancelText : "Anulare"}
                </Button>
                <Button
                    onClick={handleOK}
                    autoFocus={!okDestructive}
                    color={okDestructive ? "error" : "primary"}
                >
                    {okText ? okText : "Confirmare"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
