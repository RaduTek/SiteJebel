import { Paper, Stack, Typography } from "@mui/material";
import { QuizItem } from "../types";
import { Check, Close } from "@mui/icons-material";

export default function AnswerItem({ quizItem }: { quizItem: QuizItem }) {
    return (
        <Paper>
            <Stack direction="row" sx={{ p: 1, flex: 1 }}>
                <Stack direction="column" sx={{ flex: 1 }} gap={0.5}>
                    <Stack direction="row" alignItems="end" gap={1}>
                        <Typography variant="h6">{quizItem.title}</Typography>
                        <Typography fontSize="11pt">
                            {quizItem.points +
                                " " +
                                (quizItem.points > 1 ? "puncte" : "punct")}
                        </Typography>
                    </Stack>
                    <Typography>{quizItem.body}</Typography>
                    {quizItem.type === "choice" && quizItem.variants && (
                        <>
                            {!quizItem.solved && (
                                <Typography>
                                    Răspunsul tău:{" "}
                                    {
                                        quizItem.variants[
                                            quizItem.answer as number
                                        ]
                                    }
                                </Typography>
                            )}
                            <Typography>
                                Răspunsul corect:{" "}
                                {quizItem.variants[quizItem.correct as number]}
                            </Typography>
                        </>
                    )}
                </Stack>
                {quizItem.solved ? (
                    <Check color="success" />
                ) : (
                    <Close color="error" />
                )}
            </Stack>
        </Paper>
    );
}
