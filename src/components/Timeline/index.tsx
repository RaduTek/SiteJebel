import { useEffect, useState } from "react";
import "./Timeline.css";
import TimelineEvent from "./TimelineEvent";
import Event from "./Event";
import PageSection from "../PageSection";
import { Typography } from "@mui/material";

export default function Timeline({ past }: { past?: boolean }) {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch("/api/public/events.php" + (past ? "?past" : ""))
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
            });
    }, [past, setEvents]);

    return events.length > 0 ? (
        <div className="timelineRoot">
            {events.map((data, index) => (
                <TimelineEvent key={index} data={data} />
            ))}
        </div>
    ) : (
        <PageSection sx={{ textAlign: "center", gap: 2 }}>
            <Typography variant="h4">
                Nicio activitate disponibilă momentan.
            </Typography>
            <Typography>
                Fii pe fază, noi activități vor apărea în curând.
            </Typography>
        </PageSection>
    );
}
