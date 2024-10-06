import { useParams } from "react-router-dom";
import PageAppBar from "../../components/PageAppBar";
import { useState } from "react";
import Post from "../../../components/Blog/Post";
import {
    BoldItalicUnderlineToggles,
    MDXEditor,
    toolbarPlugin,
    UndoRedo,
} from "@mdxeditor/editor";
import { Stack } from "@mui/material";

export default function BlogPostEdit({ mode }: { mode: "new" | "edit" }) {
    const params = useParams();

    const [post, setPost] = useState<Post>({ title: "Postare nouă" } as Post);

    return (
        <>
            <PageAppBar
                title={mode === "new" ? "Postare nouă" : "Editează postarea"}
            />
            <Stack sx={{ p: 2, gap: 2 }}>
                <MDXEditor
                    markdown="a"
                    plugins={[
                        toolbarPlugin({
                            toolbarContents: () => (
                                <>
                                    {" "}
                                    <UndoRedo />
                                    <BoldItalicUnderlineToggles />
                                </>
                            ),
                        }),
                    ]}
                />
            </Stack>
        </>
    );
}
