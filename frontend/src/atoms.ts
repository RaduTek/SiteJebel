import { atom } from "jotai";
import { AuthData } from "./auth/Auth";

export const adminDrawerOpen = atom(false);
export const authDataAtom = atom<AuthData | undefined>(undefined);

export const gotoAfterLogin = atom<string | undefined>(undefined);
