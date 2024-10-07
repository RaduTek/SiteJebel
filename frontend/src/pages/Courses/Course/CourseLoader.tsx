import { CourseDetails } from "../types";
import { Params } from "react-router-dom";

export interface CourseLoaderData {
    courseId: string;
    course?: CourseDetails;
    error?: string;
}

export async function CourseLoader({ params }: { params: Params<string> }) {
    try {
        const response = await fetch(
            `/api/public/course/details.php?id=${params.courseId}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch course info!");
        }
        const data = await response.json();
        return {
            courseId: params.courseId,
            course: data as CourseDetails,
        } as CourseLoaderData;
    } catch (error) {
        console.error("Error loading courses:", error);
        return { courseId: params.courseId, error: error } as CourseLoaderData;
    }
}
