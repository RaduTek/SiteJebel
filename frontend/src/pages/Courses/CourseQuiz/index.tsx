import { Button, Stack, Typography } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import PageSection from "../../../components/PageSection";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CourseQuizLoaderData } from "./Loader";
import QuizField from "./QuizField";
import { QuizValue } from "../types";
import { useEffect, useState } from "react";
import { ArrowBack, ArrowForward, Checklist } from "@mui/icons-material";
import ConfirmDialog from "../../../components/ConfirmDialog";

export default function CourseQuiz() {
    const data = useLoaderData() as CourseQuizLoaderData;
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [values, setValues] = useState<QuizValue[]>([]);

    const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

    const onQuizFieldChange = (index: number) => {
        return (value: QuizValue) => {
            setValues((prevValues) => {
                const newValues = [...prevValues];
                newValues[index] = value;
                saveResponses(newValues);
                return newValues;
            });
        };
    };

    // Save quiz responses
    const saveResponses = async (_values?: QuizValue[]) => {
        const url = `/api/public/course/quiz/save.php?id=${data.progress?.progress_id}`;
        const payload = {
            answers: _values ? _values : values,
            progress: index,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} - ${response.statusText}`
                );
            }
        } catch (error) {
            console.error("Failed to save quiz responses:", error);
        }
    };

    const goBack = () => {
        setIndex((prev) => prev - 1);
    };
    const goForward = () => {
        setIndex((prev) => prev + 1);
    };

    // Load quiz reponses
    useEffect(() => {
        if (data?.progress?.answers && data.progress.answers.length > 0) {
            // Quiz in progress, resume progress
            setValues(data.progress.answers);
            setIndex(data.progress.progress);
        } else if (data?.progress?.quiz.items) {
            // Quiz not started, initialize default values
            const initialValues = data.progress.quiz.items.map((item) => {
                if (item.type === "multichoice") return [];
                return null;
            });
            setValues(initialValues);
        }
    }, [data]);

    const handleConfirmSubmit = async (result: boolean) => {
        setConfirmSubmitOpen(false);
        if (result) {
            const id = data?.progress?.progress_id;
            const url = `/api/public/course/quiz/submit.php?id=${id}`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(
                        `Error: ${response.status} - ${response.statusText}`
                    );
                }

                navigate(`/course/result/${id}`);
            } catch (error) {
                console.error("Failed to submit quiz responses:", error);
            }
        }
    };

    return data.progress ? (
        <>
            <PageHeader height="200px">
                <Typography variant="h4">
                    {data.progress.course_title}
                </Typography>
                <Typography variant="h3">Quiz</Typography>
            </PageHeader>
            <PageSection sx={{ gap: 3 }}>
                <QuizField
                    data={data.progress.quiz.items[index]}
                    value={values[index]}
                    onChange={onQuizFieldChange(index)}
                />
                <Stack
                    direction={{ sm: "column-reverse", md: "row" }}
                    spacing={2}
                    gap={2}
                >
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<ArrowBack />}
                        onClick={goBack}
                        disabled={index === 0}
                    >
                        Întrebarea anterioară
                    </Button>

                    <Stack
                        sx={{ flex: 1 }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography sx={{ textAlign: "center" }}>
                            {index + 1} din {data.progress.quiz.items.length}
                        </Typography>
                    </Stack>
                    {index < data.progress.quiz.items.length - 1 ? (
                        <Button
                            variant="outlined"
                            size="large"
                            endIcon={<ArrowForward />}
                            onClick={goForward}
                            disabled={
                                values[index] === undefined ||
                                values[index] === null
                            }
                        >
                            Următoarea întrebare
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                color="success"
                                size="large"
                                endIcon={<Checklist />}
                                onClick={() => setConfirmSubmitOpen(true)}
                                disabled={
                                    values[index] === undefined ||
                                    values[index] === null
                                }
                            >
                                Trimite răspunsurile
                            </Button>
                            <ConfirmDialog
                                title="Trimite răspunsurile"
                                text="Sigur trimiți răspunsurile? Nu vei mai putea schimba răspunsul la o întrebare după. Scorul tău va fi calculat după ce trimiți răspunsurile."
                                okText="Trimite"
                                cancelText="Înapoi"
                                open={confirmSubmitOpen}
                                onClose={handleConfirmSubmit}
                            />
                        </>
                    )}
                </Stack>
            </PageSection>
        </>
    ) : (
        <></>
    );
}
