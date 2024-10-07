import { CoursePage } from "../types";
import { Params } from "react-router-dom";

export interface CoursePageLoaderData {
    courseId: string;
    pageId: number;
    page?: CoursePage;
    error?: string;
}

export async function CoursePageLoader({ params }: { params: Params<string> }) {
    try {
        const response = await fetch(
            `/api/public/course/page.php?id=${params.courseId}&p=${params.pageId}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch course page!");
        }
        const data = await response.json();
        return {
            courseId: params.courseId,
            pageId: Number(params.pageId),
            page: data as CoursePage,
        } as CoursePageLoaderData;
    } catch (error) {
        console.error("Error loading courses:", error);
        return {
            courseId: params.courseId,
            pageId: Number(params.pageId),
            error: error,
        } as CoursePageLoaderData;
    }
}
