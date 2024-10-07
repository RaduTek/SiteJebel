import { Box, Button, Stack, Typography } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import PageSection from "../../../components/PageSection";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { CoursePageLoaderData } from "./CoursePageLoader";
import Markdown from "../../../layouts/Markdown";
import handleRouterPush from "../../../utils/handleRouterPush";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useEffect } from "react";

export default function CoursePage() {
    const navigate = useNavigate();
    const data = useLoaderData() as CoursePageLoaderData;
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
                    {data.page.prevPage && (
                        <Button
                            component="a"
                            href={`/course/${data.courseId}/page/${
                                data.pageId - 1
                            }`}
                            onClick={handleRouterPush(navigate)}
                            variant="outlined"
                            size="large"
                            startIcon={<ArrowBack />}
                        >
                            {data.page.prevPage}
                        </Button>
                    )}
                    <Box sx={{ flex: 1 }}></Box>
                    {data.page.nextPage && (
                        <Button
                            component="a"
                            href={`/course/${data.courseId}/page/${
                                data.pageId + 1
                            }`}
                            onClick={handleRouterPush(navigate)}
                            variant="outlined"
                            size="large"
                            endIcon={<ArrowForward />}
                        >
                            {data.page.nextPage}
                        </Button>
                    )}
                </Stack>
            </PageSection>
        </>
    ) : (
        <></>
    );
}
