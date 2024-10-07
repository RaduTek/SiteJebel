import { Button, Chip, Stack, Typography } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import PageSection from "../../../components/PageSection";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CourseLoaderData } from "./CourseLoader";
import Markdown from "../../../layouts/Markdown";
import handleRouterPush from "../../../utils/handleRouterPush";
import { useSetAtom } from "jotai";
import { gotoAfterLogin } from "../../../atoms";

export default function Course() {
    const navigate = useNavigate();
    const data = useLoaderData() as CourseLoaderData;
    const setGotoAfterLogin = useSetAtom(gotoAfterLogin);

    const handleStartLogin = () => {
        if (!data.course) return;

        setGotoAfterLogin(`/course/${data.course.id}/page/0`);

        navigate("/login");
    };

    return data.course ? (
        <>
            <PageHeader height="250px">
                <Typography variant="h3">{data.course.title}</Typography>
                <Stack direction="row">
                    <Chip color="warning" label={data.course.difficulty} />
                </Stack>
                <Stack direction="row">
                    {data.course.content_progress === undefined ? (
                        <Button onClick={handleStartLogin} variant="contained">
                            Începe cursul
                        </Button>
                    ) : (
                        <Button
                            component="a"
                            href={`/course/${data.course.id}/page/${data.course.content_progress}`}
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
