import {
    Button,
    ButtonGroup,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    Radio,
    Stack,
    Typography,
} from "@mui/material";
import { QuizItem, QuizValue } from "../types";
import Markdown from "../../../layouts/Markdown";

export default function QuizField({
    data,
    value,
    onChange,
}: {
    data: QuizItem;
    value?: QuizValue;
    onChange?: (value: QuizValue) => void;
}) {
    const onMultiChoiceToggle = (index: number) => {
        if (!Array.isArray(value)) return;

        const newValue = value.includes(index)
            ? value.filter((i) => i !== index)
            : [...value, index];

        if (onChange) {
            onChange(newValue);
        }
    };

    const onValueItemClick = (value: QuizValue) => {
        return () => {
            if (onChange) onChange(value);
        };
    };

    return data ? (
        <Paper>
            <Stack
                direction="column"
                spacing={2}
                sx={{ m: 2 }}
                alignItems="center"
            >
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                    {data.title}
                </Typography>

                {data.body && <Markdown text={data.body} />}

                {data.type === "truth" && (
                    <ButtonGroup size="large">
                        <Button
                            color="success"
                            variant={value === true ? "contained" : "outlined"}
                            onClick={onValueItemClick(true)}
                        >
                            Adevărat
                        </Button>
                        <Button
                            color="error"
                            variant={value === false ? "contained" : "outlined"}
                            onClick={onValueItemClick(false)}
                        >
                            Fals
                        </Button>
                    </ButtonGroup>
                )}

                {data.type === "choice" && data.variants && (
                    <FormGroup>
                        {data.variants.map((variant, index) => (
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={value === index}
                                        onClick={onValueItemClick(index)}
                                    />
                                }
                                label={variant}
                                key={index}
                            />
                        ))}
                    </FormGroup>
                )}

                {data.type === "multichoice" && data.variants && (
                    <FormGroup>
                        {data.variants.map((variant, index) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            Array.isArray(value) &&
                                            value.includes(index)
                                        }
                                        onChange={() =>
                                            onMultiChoiceToggle(index)
                                        }
                                    />
                                }
                                label={variant}
                                key={index}
                            />
                        ))}
                    </FormGroup>
                )}

                <Typography sx={{ fontSize: "11pt", textAlign: "center" }}>
                    {data.points} {data.points > 1 ? "puncte" : "punct"}
                </Typography>
            </Stack>
        </Paper>
    ) : null;
}
