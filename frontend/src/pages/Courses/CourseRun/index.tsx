import { Box, Button, Stack, Typography } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import PageSection from "../../../components/PageSection";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { CourseRunLoaderData } from "./Loader";
import Markdown from "../../../layouts/Markdown";
import handleRouterPush from "../../../utils/handleRouterPush";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useEffect } from "react";

export default function CourseRun() {
    const navigate = useNavigate();
    const data = useLoaderData() as CourseRunLoaderData;
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return data.page ? (
        <>
            <PageHeader height="200px">
                <Typography variant="h4">{data.page.courseTitle}</Typography>
                <Typography variant="h3">{data.page.title}</Typography>
            </PageHeader>
            <PageSection sx={{ gap: 3 }}>
                <Markdown text={data.page.body} />
                <Stack
                    direction={{ sm: "column-reverse", md: "row" }}
                    spacing={2}
                >
                    {data.page.prev_page && (
                        <Button
                            component="a"
                            href={`/course/run/${data.progress_id}/page/${
                                data.page_id - 1
                            }`}
                            onClick={handleRouterPush(navigate)}
                            variant="outlined"
                            size="large"
                            startIcon={<ArrowBack />}
                        >
                            {data.page.prev_page}
                        </Button>
                    )}
                    <Box sx={{ flex: 1 }}></Box>
                    {data.page.next_page !== undefined ? (
                        <Button
                            component="a"
                            href={`/course/run/${data.progress_id}/page/${
                                data.page_id + 1
                            }`}
                            onClick={handleRouterPush(navigate)}
                            variant="outlined"
                            size="large"
                            endIcon={<ArrowForward />}
                        >
                            {data.page.next_page}
                        </Button>
                    ) : (
                        <Button
                            component="a"
                            href={`/course/quiz/${data.progress_id}`}
                            onClick={handleRouterPush(navigate)}
                            variant="outlined"
                            size="large"
                            color="success"
                            endIcon={<ArrowForward />}
                        >
                            Începe Quizul
                        </Button>
                    )}
                </Stack>
            </PageSection>
        </>
    ) : (
        <></>
    );
}
