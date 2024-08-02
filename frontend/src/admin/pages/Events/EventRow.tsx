import { TableCell, TableRow } from "@mui/material";
import Event from "../../../components/Timeline/Event";

export default function EventRow({ event }: { event: Event }) {
    return (
        <TableRow key={event.id}>
            <TableCell>{event.title}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.visible ? "Vizibil" : "Ascuns"}</TableCell>
            <TableCell>{/* Options here */}</TableCell>
        </TableRow>
    );
}
