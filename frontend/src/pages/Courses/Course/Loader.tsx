import { CourseDetails } from "../types";
import { Params } from "react-router-dom";

export interface CourseLoaderData {
    course_id: string;
    course?: CourseDetails;
    error?: string;
}

export async function CourseLoader({ params }: { params: Params<string> }) {
    try {
        const response = await fetch(
            `/api/public/course/details.php?id=${params.course_id}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch course info!");
        }
        const data = await response.json();
        return {
            course_id: params.course_id,
            course: data as CourseDetails,
        } as CourseLoaderData;
    } catch (error) {
        console.error("Error loading courses:", error);
        return {
            course_id: params.course_id,
            error: error,
        } as CourseLoaderData;
    }
}
