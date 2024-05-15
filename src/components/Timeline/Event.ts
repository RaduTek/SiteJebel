interface Link {
    title: string;
    description: string;
    href: string;
}

export default interface Event {
    id: string;
    date: string;
    title: string;
    photoId: string;
    color: string;
    description: string;
    links: Link[];
}
