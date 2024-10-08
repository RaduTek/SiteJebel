import { Button, Chip, Stack, Typography } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import PageSection from "../../../components/PageSection";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CourseLoaderData } from "./Loader";
import Markdown from "../../../layouts/Markdown";
import { useSetAtom } from "jotai";
import { gotoAfterLogin } from "../../../atoms";
import handleRouterPush from "../../../utils/handleRouterPush";

export default function Course() {
    const navigate = useNavigate();
    const data = useLoaderData() as CourseLoaderData;
    const setGotoAfterLogin = useSetAtom(gotoAfterLogin);

    const handleStartLogin = () => {
        if (!data.course) return;

        setGotoAfterLogin(`/course/${data.course.id}`);

        navigate("/login");
    };

    return data.course ? (
        <>
            <PageHeader height="250px">
                <Typography variant="h3">{data.course.title}</Typography>
                <Stack direction="row" spacing={1}>
                    <Chip color="warning" label={data.course.difficulty} />

                    {data.course.status === "inprogress" ? (
                        <Chip color="info" label="În progres" />
                    ) : data.course.status === "passed" ? (
                        <Chip color="success" label="Completat" />
                    ) : data.course.status === "failed" ? (
                        <Chip color="error" label="Necompletat" />
                    ) : null}
                </Stack>
                <Stack direction="row">
                    {data.course.status === "passed" ||
                    data.course.status === "failed" ? (
                        <Button
                            component="a"
                            href={`/course/${data.course_id}/start`}
                            onClick={handleRouterPush(navigate)}
                            variant="contained"
                        >
                            Vezi rezultatele
                        </Button>
                    ) : data.course.content_progress === undefined ? (
                        <Button onClick={handleStartLogin} variant="contained">
                            Începe cursul
                        </Button>
                    ) : (
                        <Button
                            component="a"
                            href={`/course/${data.course_id}/start`}
                            onClick={handleRouterPush(navigate)}
                            variant="contained"
                        >
                            {data.course.content_progress > 0
                                ? "Continuă cursul"
                                : "Începe cursul"}
                        </Button>
                    )}
                </Stack>
            </PageHeader>
            <PageSection sx={{ gap: 3 }}>
                <Markdown text={data.course.description} />
            </PageSection>
        </>
    ) : (
        <></>
    );
}
