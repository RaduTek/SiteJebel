import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import handleRouterPush from "../../../utils/handleRouterPush";
import { CourseListItem } from "../types";

export default function CourseCard({ data }: { data: CourseListItem }) {
    const navigate = useNavigate();

    return (
        <Grid item xs={12} sm={12} md={6}>
            <Card sx={{ textAlign: "left" }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.shortdesc}
                    </Typography>
                </CardContent>

                <Stack direction="row" spacing={1} sx={{ mx: 1.5 }}>
                    <Chip color="warning" label={data.difficulty} />
                    {data.status === "inprogress" ||
                    data.status === "inquiz" ? (
                        <Chip color="info" label="În progres" />
                    ) : data.status === "passed" ? (
                        <Chip color="success" label="Completat" />
                    ) : data.status === "failed" ? (
                        <Chip color="error" label="Necompletat" />
                    ) : null}
                </Stack>
                <CardActions>
                    {data.content_progress !== undefined && (
                        <Button
                            component="a"
                            href={`/course/${data.id}/start`}
                            onClick={handleRouterPush(navigate)}
                        >
                            {data.status === "passed" ||
                            data.status === "failed"
                                ? "Rezultate"
                                : data.content_progress > 0
                                ? "Continuă"
                                : "Începe"}
                        </Button>
                    )}
                    <Button
                        component="a"
                        href={`/course/${data.id}`}
                        onClick={handleRouterPush(navigate)}
                    >
                        Detalii
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
