export interface CourseListItem {
    id: string;
    title: string;
    shortdesc: string;
    difficulty: string;
    status?: "notstarted" | "inprogress" | "passed" | "failed";
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
