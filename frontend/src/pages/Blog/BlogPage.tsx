import { Params } from "react-router-dom";

export interface BlogPage {
    id: string;
    date: string;
    title: string;
    coverPhoto: string;
    content: string;
    visible: boolean;
}

export async function BlogPageLoader({ params }: { params: Params<string> }) {
    const blogPage = {};
    return { blogPage };
}
