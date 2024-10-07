import { Link } from "./Links";
import { useAtomValue } from "jotai";
import { authDataAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import handleRouterPush from "../../utils/handleRouterPush";

export default function LargeButton({ link }: { link: Link }) {
    const auth = useAtomValue(authDataAtom);
    const navigate = useNavigate();

    const adminCond =
        link.adminOnly === true &&
        (auth === undefined || !(auth && auth.isAdmin === true));
    const authCond =
        link.authOnly === true && (auth === undefined || !auth?.isAuthed);

    const shouldDisplayLink = !(adminCond || authCond);

    return shouldDisplayLink ? (
        <Button
            component="a"
            href={link.target}
            onClick={handleRouterPush(navigate)}
        >
            {link.name}
        </Button>
    ) : null;
}
