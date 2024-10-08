export type CourseStatus =
    | "notstarted"
    | "inprogress"
    | "inquiz"
    | "passed"
    | "failed";

export interface CourseListItem {
    id: string;
    title: string;
    shortdesc: string;
    difficulty: string;
    status?: CourseStatus;
    content_progress?: number;
}

export interface CoursePage {
    courseTitle: string;
    title: string;
    body: string;
    prev_page?: string;
    next_page?: string;
}

export interface Course extends CourseListItem {
    description: string;
}

export interface CourseDetails extends Course {}

export interface CourseResult {
    course_id: string;
    course_title: string;
    quiz: CourseQuiz;
    quiz_answers: QuizValue[];
    quiz_correct: boolean[];
    quiz_score: number;
    status: CourseStatus;
    start_date: string;
    end_date: string;
}

export type QuizValue = null | boolean | number | number[];

export interface QuizItem {
    type: "truth" | "choice" | "multichoice";
    points: number;
    title: string;
    body?: string;
    variants?: string[];
    correct?: QuizValue;
    answer?: QuizValue;
    solved?: boolean;
}

export interface CourseQuiz {
    passingScore: number;
    initialScore: number;
    items: QuizItem[];
    randomize?: boolean;
    canRetake?: boolean;
    courseTitle?: string;
    timeLimit?: number;

    score?: number;
}
