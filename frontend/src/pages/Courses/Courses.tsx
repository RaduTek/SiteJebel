import { Grid, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import PageSection from "../../components/PageSection";
import CourseCard from "./components/CourseCard";
import { useLoaderData } from "react-router-dom";
import { CoursesLoaderData } from "./CoursesLoader";

export default function CoursesPage() {
    const loaderData = useLoaderData() as CoursesLoaderData;

    return (
        <>
            <PageHeader height="small">
                <Typography variant="h3">Cursuri</Typography>
            </PageHeader>
            <PageSection sx={{ textAlign: "center", paddingTop: 5, gap: 5 }}>
                {loaderData.courses && (
                    <>
                        <Typography variant="h4">
                            Alege din cursurile disponibile
                        </Typography>
                        <Grid container spacing={2}>
                            {loaderData.courses.map((data, index) => (
                                <CourseCard key={index} data={data} />
                            ))}
                        </Grid>
                    </>
                )}
            </PageSection>
        </>
    );
}
