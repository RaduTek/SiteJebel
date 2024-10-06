export interface CourseListItem {
    id: string;
    title: string;
    shortdesc: string;
    status?: "notstarted" | "inprogress" | "passed" | "failed";
}

export interface Course extends CourseListItem {
    description: string;
}
