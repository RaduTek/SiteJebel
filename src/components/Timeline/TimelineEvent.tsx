import { Button, Stack, Typography } from "@mui/material";
import "./Timeline.css";
import Event from "./Event";
import formatRomanianDateTime from "../../utils/formatRomanianDate";

export default function TimelineEvent({ data }: { data: Event }) {
    return (
        <div className="timelineItem">
            <div className="track">
                <div className="dot"></div>
            </div>
            <div className="body">
                <div className="card">
                    <div className="title">
                        <a>{data.title}</a>
                        <span>{formatRomanianDateTime(data.date)}</span>
                    </div>
                    <div className="content">
                        <Typography>{data.description}</Typography>

                        <Button
                            component="a"
                            target="_blank"
                            href={data.link}
                            variant="outlined"
                            color="inherit"
                        >
                            {data.linkTitle}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
