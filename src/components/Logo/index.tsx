import { useMediaQuery, useTheme } from "@mui/material";
import { ReactComponent as Banner } from "./banner.svg";
import { ReactComponent as HeaderSmall } from "./header.svg";
import { ReactComponent as HeaderLarge } from "./header_large.svg";
import { ReactComponent as Footer } from "./footer.svg";

export default function Logo({
    variant,
}: {
    variant: "header" | "header_large" | "header_auto" | "footer" | "banner";
}) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery("(min-width: 600px)");

    const headerLogoStyle = {
        fill: theme.palette.primary.main,
        height: "60px",
    };
    const footerLogoStyle = {
        fill: "#555",
        height: "100px",
    };
    const bannerLogoStyle = {
        fill: "white",
        height: "200px",
        width: "auto",
        maxWidth: "90vw",
        filter: "drop-shadow(0 5px 15px black)",
    };

    const renderLogo = () => {
        switch (variant) {
            case "header":
                return <HeaderSmall style={headerLogoStyle} />;
            case "header_large":
                return <HeaderLarge style={headerLogoStyle} />;
            case "header_auto":
                return isLargeScreen ? (
                    <HeaderLarge style={headerLogoStyle} />
                ) : (
                    <HeaderSmall style={headerLogoStyle} />
                );
            case "footer":
                return <Footer style={footerLogoStyle} />;
            case "banner":
                return <Banner style={bannerLogoStyle} />;
            default:
                return <></>;
        }
    };

    return renderLogo();
}
