import { useAtom } from "jotai";
import { authDataAtom } from "../atoms";
import { useEffect } from "react";

export interface AuthData {
    isAuthed: boolean;
    userId?: string;
    name?: string;
    email?: string;
    isAdmin?: boolean;
}

export function Auth({ children }: { children?: React.ReactNode }) {
    const [authData, setAuthData] = useAtom(authDataAtom);

    useEffect(() => {
        if (authData) return;

        fetch("api/auth/check.php", { method: "GET" })
            .then((res) => res.json())
            .then((json) => {
                const data: AuthData = json as AuthData;
                setAuthData(data);
            })
            .catch((err) => console.error("error:" + err));
    }, [authData, setAuthData]);

    return <>{children}</>;
}
