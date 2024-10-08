import { CoursePage } from "../types";
import { Params } from "react-router-dom";

export interface CourseRunLoaderData {
    progress_id: string;
    page_id: number;
    page?: CoursePage;
    error?: string;
}

export async function CourseRunLoader({ params }: { params: Params<string> }) {
    try {
        const response = await fetch(
            `/api/public/course/page.php?id=${params.progress_id}&p=${params.page_id}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch course page!");
        }
        const data = await response.json();
        return {
            progress_id: params.progress_id,
            page_id: Number(params.page_id),
            page: data as CoursePage,
        } as CourseRunLoaderData;
    } catch (error) {
        console.error("Error loading courses:", error);
        return {
            progress_id: params.progress_id,
            page_id: Number(params.page_id),
            error: error,
        } as CourseRunLoaderData;
    }
}
