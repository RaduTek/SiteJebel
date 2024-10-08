import { CourseStatus } from "./types";
import { Params, redirect } from "react-router-dom";

export interface CourseStartLoaderData {
    progress_id: string;
    status: CourseStatus;
    content_progress: string;
    error?: string;
}

export async function CourseStartLoader({
    params,
}: {
    params: Params<string>;
}) {
    try {
        const url = `/api/public/course/start.php?id=${params.course_id}`;

        const body = await fetch(url);

        if (!body.ok) {
            throw new Error(`Error: ${body.status} - ${body.statusText}`);
        }

        const response = (await body.json()) as CourseStartLoaderData;

        if (response.status === "inquiz") {
            return redirect(`/course/quiz/${response.progress_id}`);
        } else if (
            response.status === "passed" ||
            response.status === "failed"
        ) {
            return redirect(`/course/result/${response.progress_id}`);
        } else if (response.progress_id) {
            return redirect(
                `/course/run/${response.progress_id}/page/${response.content_progress}`
            );
        }
    } catch (error) {
        console.error("Failed to start course:", error);
    }

    return redirect("/courses");
}
