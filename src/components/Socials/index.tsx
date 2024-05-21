import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as Facebook } from "./facebook.svg";
import { ReactComponent as Instagram } from "./instagram.svg";

const socialLinks = [
    {
        name: "Instagram",
        icon: Instagram,
        target: "https://www.instagram.com/jebel2024/",
    },
    {
        name: "Facebook",
        icon: Facebook,
        target: "https://www.facebook.com/profile.php?id=100094637507289",
    },
];

export default function Socials({ large }: { large?: boolean }) {
    return (
        <Stack direction="column" sx={{ paddingBottom: 2 }}>
            <Typography align="center" fontSize={14}>
                Urmărește-ne pe social media
            </Typography>
            <Stack direction="row" justifyContent="space-evenly">
                {socialLinks.map((link, index) => (
                    <IconButton
                        component="a"
                        href={link.target}
                        target="_blank"
                        key={index}
                        title={link.name}
                        sx={{
                            fontSize: large ? "48px" : "32px",
                            padding: large ? 1.5 : 1,
                        }}
                    >
                        <SvgIcon
                            component={link.icon}
                            inheritViewBox
                            fontSize="inherit"
                        />
                    </IconButton>
                ))}
            </Stack>
        </Stack>
    );
}
