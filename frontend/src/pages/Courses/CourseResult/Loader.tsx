import { CourseResult } from "../types";
import { Params } from "react-router-dom";

export interface CourseResultLoaderData extends CourseResult {
    progress_id: string;
    error?: string;
}

export async function CourseResultLoader({
    params,
}: {
    params: Params<string>;
}) {
    try {
        const response = await fetch(
            `/api/public/course/results.php?id=${params.progress_id}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch course info!");
        }
        const data = await response.json();
        return {
            progress_id: params.progress_id,
            ...(data as CourseResult),
        } as CourseResultLoaderData;
    } catch (error) {
        console.error("Error loading courses:", error);
        return {
            progress_id: params.progress_id,
            error: error,
        } as CourseResultLoaderData;
    }
}
