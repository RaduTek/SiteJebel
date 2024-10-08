import { CourseQuiz, QuizValue } from "../types";
import { Params } from "react-router-dom";

export interface QuizLoadData {
    progress_id: string;
    course_id: string;
    course_title: string;
    quiz: CourseQuiz;
    answers: QuizValue[];
    progress: number;
}

export interface CourseQuizLoaderData {
    progress?: QuizLoadData;
    error?: string;
}

export async function CourseQuizLoader({ params }: { params: Params<string> }) {
    try {
        const response = await fetch(
            `/api/public/course/quiz/load.php?id=${params.progress_id}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch quiz!");
        }
        const data = await response.json();
        return {
            progress: data as QuizLoadData,
        } as CourseQuizLoaderData;
    } catch (error) {
        console.error("Error loading quiz:", error);
        return {
            error: error,
        } as CourseQuizLoaderData;
    }
}
