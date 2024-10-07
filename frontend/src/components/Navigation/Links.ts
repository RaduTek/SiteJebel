export interface Link {
    name: string;
    target: string;
    authOnly?: boolean;
    adminOnly?: boolean;
}

export const Links: Link[] = [
    {
        name: "Despre Noi",
        target: "/about",
    },
    {
        name: "Activități",
        target: "/events",
    },
    {
        name: "Cursuri",
        target: "/courses",
    },
    {
        name: "Admin",
        target: "/admin",
        adminOnly: true,
    },
    {
        name: "Logout",
        target: "/logout",
        authOnly: true,
    },
];

export const MobileLinks: Link[] = [
    {
        name: "Acasă",
        target: "/",
    },
    ...Links,
];
