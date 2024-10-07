import { CourseListItem } from "../types";
import { Params } from "react-router-dom";

export interface CoursesLoaderData {
    courses?: CourseListItem[];
    error?: string;
}

export async function CoursesLoader({ params }: { params: Params<string> }) {
    try {
        const response = await fetch("/api/public/course/list.php");
        if (!response.ok) {
            throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        return { courses: data as CourseListItem[] };
    } catch (error) {
        console.error("Error loading courses:", error);
        return { courses: [], error: error };
    }
}
