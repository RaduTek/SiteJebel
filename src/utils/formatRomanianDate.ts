export default function formatRomanianDateTime(dateString: string) {
    const date = new Date(dateString);

    const romanianMonths = [
        "ianuarie",
        "februarie",
        "martie",
        "aprilie",
        "mai",
        "iunie",
        "iulie",
        "august",
        "septembrie",
        "octombrie",
        "noiembrie",
        "decembrie",
    ];

    const day = date.getDate();
    const month = romanianMonths[date.getMonth()];
    const year = date.getFullYear();

    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${day} ${month} ${year}, ${hour}:${minute}`;

    return formattedDate;
}
