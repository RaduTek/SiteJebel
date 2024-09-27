import { Button, Stack, SvgIcon, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";
import { ReactComponent as Facebook } from "./../components/Socials/facebook.svg";
import { ReactComponent as Instagram } from "./../components/Socials/instagram.svg";
import { ReactComponent as TikTok } from "./../components/Socials/tiktok.svg";
import { ReactComponent as YouTube } from "./../components/Socials/youtube.svg";

const links = [
    {
        name: "Instagram",
        icon: Instagram,
        color: "#833AB4",
        target: "https://www.instagram.com/jebel2024/",
    },
    {
        name: "TikTok",
        icon: TikTok,
        color: "black",
        target: "https://www.tiktok.com/@jebel2024",
    },
    {
        name: "Facebook",
        icon: Facebook,
        color: "#4267B2",
        target: "https://www.facebook.com/profile.php?id=100094637507289",
    },
    {
        name: "YouTube",
        icon: YouTube,
        color: "#FF0000",
        target: "https://www.youtube.com/@JebelActive",
    },
];

export default function LinksPage() {
    return (
        <>
            <PageHeader>
                <Typography variant="h3">Urmărește-ne pe</Typography>
            </PageHeader>
            <PageSection>
                <Stack direction="column" gap={2}>
                    {links.map((link, index) => (
                        <Button
                            color="inherit"
                            sx={{ color: link.color }}
                            variant="outlined"
                            component="a"
                            href={link.target}
                            target="_blank"
                        >
                            {link.icon && (
                                <SvgIcon
                                    component={link.icon}
                                    inheritViewBox
                                    fontSize="large"
                                />
                            )}
                            <Typography sx={{ flex: 1, textAlign: "center" }}>
                                {link.name}
                            </Typography>
                        </Button>
                    ))}
                </Stack>
            </PageSection>
        </>
    );
}
