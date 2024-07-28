import { Button, Stack, Typography } from "@mui/material";
import PageAppBar from "../components/PageAppBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Event from "../../components/Timeline/Event";
import { useState } from "react";

const columns: GridColDef<Event>[] = [
    {
        field: "name",
        headerName: "Titlu",
    },
    {
        field: "date",
        headerName: "Dată",
    },
    {
        field: "visible",
        headerName: "Vizibil",
    },
];

export default function AdminEventsPage() {
    const [rows, setRows] = useState<Event[]>([]);
    const [page, setPage] = useState(1);

    const loadRows = () => {
        fetch("/api/admin/events/list.php?page=" + page)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                setRows(data.events);
            });
    };

    return (
        <>
            <PageAppBar title="Activități" />
            <Button onClick={loadRows}>Load</Button>
            <Stack sx={{ p: 2, gap: 2 }}>
                <DataGrid columns={columns} rows={rows}></DataGrid>
            </Stack>
        </>
    );
}
