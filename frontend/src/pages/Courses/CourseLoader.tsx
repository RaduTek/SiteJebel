import { Course } from "./types";
import { Params } from "react-router-dom";

export interface CourseLoaderData {
    course?: Course;
    error?: string;
}

export async function CourseLoader({ params }: { params: Params<string> }) {
    try {
        const response = await fetch(
            `/api/public/course/details.php?id=${params.courseId}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        console.log(data);
        return { course: data as Course };
    } catch (error) {
        console.error("Error loading courses:", error);
        return { courses: [], error: error };
    }
}
