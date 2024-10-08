import { Paper, Stack, Typography } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import PageSection from "../../../components/PageSection";
import { useLoaderData } from "react-router-dom";
import { CourseResultLoaderData } from "./Loader";
import CircularProgressLabel from "../../../components/Timeline/CircularProgressLabel";
import AnswerItem from "./AnswerItem";

export default function CourseResult() {
    const data = useLoaderData() as CourseResultLoaderData;

    return (
        <>
            <PageHeader height="250px">
                <Typography variant="h4">{data.course_title}</Typography>
                <Typography variant="h3">Rezultatul Cursului</Typography>
            </PageHeader>
            <PageSection sx={{ gap: 3 }}>
                <Stack
                    direction={{ sm: "column", md: "row" }}
                    spacing={2}
                    gap={2}
                >
                    <Paper sx={{ flex: 1 }}>
                        <Stack alignItems="center" sx={{ p: 2 }} gap={2}>
                            <Typography variant="h5">Scorul tău</Typography>
                            <CircularProgressLabel
                                size="150px"
                                fontSize="30pt"
                                color={
                                    data.status === "passed"
                                        ? "success"
                                        : "error"
                                }
                                value={data.quiz.score || 0}
                            />
                            {data.status === "passed" ? (
                                <Typography>
                                    Bravo! Ai trecut cursul. Vei primi o diplomă
                                    în scurt timp ca recunoștință pentru
                                    parcurgerea cursului.
                                </Typography>
                            ) : (
                                <Typography>
                                    Ai nevoie de minim {data.quiz.passingScore}{" "}
                                    de puncte pentru a trece cursul.
                                </Typography>
                            )}
                        </Stack>
                    </Paper>
                </Stack>
                <Typography variant="h4">Răspunsurile tale</Typography>
                {data.quiz.items.map((value, index) => (
                    <AnswerItem key={index} quizItem={value} />
                ))}
            </PageSection>
        </>
    );
}
