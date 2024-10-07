export interface CourseListItem {
    id: string;
    title: string;
    shortdesc: string;
    difficulty: string;
    status?: "notstarted" | "inprogress" | "passed" | "failed";
}

export interface CoursePage {
    courseTitle: string;
    title: string;
    body: string;
    prevPage?: string;
    nextPage?: string;
}

export interface Course extends CourseListItem {
    description: string;
}

export interface CourseDetails extends Course {
    continuePageId?: number;
}
