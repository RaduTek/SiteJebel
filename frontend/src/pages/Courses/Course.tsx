import { Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import PageSection from "../../components/PageSection";
import { useLoaderData } from "react-router-dom";
import { CourseLoaderData } from "./CourseLoader";
import Markdown from "../../layouts/Markdown";

export default function Course() {
    const loaderData = useLoaderData() as CourseLoaderData;

    return loaderData.course ? (
        <>
            <PageHeader height="170px">
                <Typography variant="h3">{loaderData.course.title}</Typography>
            </PageHeader>
            <PageSection sx={{ paddingTop: 5, gap: 5 }}>
                <Markdown text={loaderData.course.description} />
            </PageSection>
        </>
    ) : (
        <></>
    );
}
