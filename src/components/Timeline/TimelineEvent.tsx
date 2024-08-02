import { Button, Typography } from "@mui/material";
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
                        <span className="link">{data.title}</span>
                        <span>{formatRomanianDateTime(data.date)}</span>
                    </div>
                    {data.photoUrl && <div className="cover-image"></div>}
                    <div className="content">
                        <Typography>{data.description}</Typography>

                        {data.linkUrl && (
                            <Button
                                component="a"
                                target="_blank"
                                href={data.linkUrl}
                                variant="outlined"
                                color="inherit"
                            >
                                {data.linkTitle || "Înscrie-te"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
