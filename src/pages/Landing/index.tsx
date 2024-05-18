import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import PageSection from "../../components/PageSection";
import PageHeader from "../../components/PageHeader";
import LandingImage from "./banner.jpg";
import Logo from "../../components/Logo";

import Misiune from "./misiune.jpg";
import Valori from "./valori.jpg";
import Social from "./social.jpg";
import Concert from "./concert.jpg";
import Ecologizare from "./ecologizare.jpg";

export default function LandingPage() {
    return (
        <>
            <PageHeader height="large" image={LandingImage} verticalAlign="end">
                <Logo variant="banner" />
            </PageHeader>
            <PageSection sx={{ gap: 4 }}>
                <Stack gap={2}>
                    <Typography
                        variant="h3"
                        align="center"
                        className="titleHighlight"
                    >
                        Cine suntem noi?
                    </Typography>
                    <Typography>
                        Suntem o comunitate de tineret entuziastă din satul
                        nostru, dedicată îmbunătățirii vieții sociale și
                        culturale a tinerilor din zonă.
                    </Typography>
                </Stack>
                <Stack
                    sx={{ flexDirection: { xs: "column", md: "row" } }}
                    gap={4}
                >
                    <Stack gap={2} sx={{ flex: 1 }}>
                        <Typography variant="h4" align="center">
                            Misiunea noastră
                        </Typography>
                        <Typography sx={{ flex: 1 }}>
                            Ne-am propus să creăm un mediu prietenos în care
                            tinerii să se simtă inspirați să-și exploreze
                            pasiunile, să-și dezvolte abilitățile și să-și facă
                            noi prieteni.
                        </Typography>
                        <Card>
                            <CardMedia
                                image={Misiune}
                                sx={{ height: "300px" }}
                            />
                        </Card>
                    </Stack>
                    <Stack gap={2} sx={{ flex: 1 }}>
                        <Typography variant="h4" align="center">
                            Valorile noastre
                        </Typography>
                        <Typography sx={{ flex: 1 }}>
                            Ne ghidăm după valorile respectului, colaborării,
                            creativității și implicării active în comunitate. Ne
                            străduim să promovăm respectul reciproc și să creăm
                            o atmosferă în care fiecare membru se simte
                            valorizat și apreciat.
                        </Typography>
                        <Card>
                            <CardMedia
                                image={Valori}
                                sx={{ height: "300px" }}
                            />
                        </Card>
                    </Stack>
                </Stack>
                <Stack gap={2}>
                    <Typography
                        variant="h3"
                        align="center"
                        className="titleHighlight"
                    >
                        Ce facem?
                    </Typography>
                    <Typography>
                        Organizăm o varietate de activități și evenimente, de la
                        ateliere diverse și proiecții de film la activități
                        sportive și voluntariat în comunitate. Ne asigurăm că
                        oferim o gamă diversificată de experiențe pentru a
                        satisface interesele diferite ale membrilor noștri.
                    </Typography>
                </Stack>
                <Stack
                    sx={{ flexDirection: { xs: "column", md: "row" } }}
                    gap={4}
                >
                    <Card sx={{ flex: 1 }}>
                        <CardMedia image={Social} sx={{ height: "180px" }} />
                        <CardContent>
                            <Typography variant="h4" align="center">
                                Socializăm
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ flex: 1 }}>
                        <CardMedia image={Concert} sx={{ height: "180px" }} />
                        <CardContent>
                            <Typography variant="h4" align="center">
                                Ne distrăm
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ flex: 1 }}>
                        <CardMedia
                            image={Ecologizare}
                            sx={{ height: "180px" }}
                        />
                        <CardContent>
                            <Typography variant="h4" align="center">
                                Curățăm
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </PageSection>
        </>
    );
}
