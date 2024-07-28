import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { AuthData } from "./auth/Auth";

export const adminDrawerOpen = atom(false);
export const authDataAtom = atomWithStorage<AuthData | undefined>(
    "authData",
    undefined
);
