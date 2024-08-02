import { useEffect, useState } from "react";
import "./Timeline.css";
import TimelineEvent from "./TimelineEvent";
import Event from "./Event";
import { CircularProgress, Stack, Typography } from "@mui/material";

export default function Timeline({ past }: { past?: boolean }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch("/api/public/events.php" + (past ? "?past" : ""))
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, [past, setEvents]);

    return error ? (
        <Stack sx={{ paddingTop: 3, textAlign: "center", gap: 2 }}>
            <Typography variant="h4">Eroare</Typography>
            <Typography>
                A avut loc o eroare la încărcarea activităților.
            </Typography>
        </Stack>
    ) : loading ? (
        <Stack sx={{ paddingTop: 3, textAlign: "center", gap: 2 }}>
            <Typography variant="h4">Încărcare date</Typography>
            <Stack alignItems="center">
                <CircularProgress color="inherit" size={80} />
            </Stack>
        </Stack>
    ) : events.length > 0 ? (
        <div className="timelineRoot">
            {events.map((data, index) => (
                <TimelineEvent key={index} data={data} />
            ))}
        </div>
    ) : (
        <Stack sx={{ paddingTop: 3, textAlign: "center", gap: 2 }}>
            <Typography variant="h4">
                Nicio activitate disponibilă momentan.
            </Typography>
            <Typography>
                Fii pe fază, noi activități vor apărea în curând.
            </Typography>
        </Stack>
    );
}
