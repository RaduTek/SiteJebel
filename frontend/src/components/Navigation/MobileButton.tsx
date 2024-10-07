import { Link } from "./Links";
import { useAtomValue } from "jotai";
import { authDataAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { ListItemButton, ListItemText } from "@mui/material";

export default function MobileButton({
    link,
    onClick,
}: {
    link: Link;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) {
    const auth = useAtomValue(authDataAtom);

    const adminCond =
        link.adminOnly === true &&
        (auth === undefined || !(auth && auth.isAdmin === true));
    const authCond =
        link.authOnly === true && (auth === undefined || !auth?.isAuthed);

    const shouldDisplayLink = !(adminCond || authCond);

    return shouldDisplayLink ? (
        <ListItemButton component="a" href={link.target} onClick={onClick}>
            <ListItemText>{link.name}</ListItemText>
        </ListItemButton>
    ) : null;
}
