import { useSetAtom } from "jotai";
import { authData } from "../atoms";
import { useEffect } from "react";

export interface AuthData {
    isAuthed: boolean;
    userId?: string;
    name?: string;
    email?: string;
    isAdmin?: boolean;
}

export function Auth({ children }: { children?: React.ReactNode }) {
    const setAuthData = useSetAtom(authData);

    useEffect(() => {
        fetch("api/auth/check.php", { method: "GET" })
            .then((res) => res.json())
            .then((json) => {
                const data: AuthData = json as AuthData;
                setAuthData(data);
            })
            .catch((err) => console.error("error:" + err));
    }, [setAuthData]);

    return <>{children}</>;
}
