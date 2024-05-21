import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import PageSection from "../../components/PageSection";
import PageHeader from "../../components/PageHeader";
import LandingImage from "./banner.jpg";
import Logo from "../../components/Logo";
import Socials from "../../components/Socials";

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
                        Suntem o comunitate de tineri entuziaști, implicați și
                        dedicați îmbunătățirii vieții sociale și culturale a
                        tinerilor din localitatea noastră și din regiune. Am
                        câștigat titlul de Sat European de Tineret 2024 pentru
                        Jebel, titlu care ne-a motivat să atragem resurse și să
                        demonstrăm că tinerii sunt capabili, implicați și că pot
                        face lucruri minunate împreună! Așa că am pus bazele
                        Asociației Generația Activă Jebel prin care implementăm
                        proiectele noastre.
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
                            Suntem tineri pentru tineri și dorim să construim o
                            comunitate educată și un mediu prietenos în care
                            tinerii să se simtă inspirați să-și exploreze
                            pasiunile, să-și dezvolte abilitățile, să-și facă
                            noi prieteni și să se implice în comunitate,
                            inclusiv la nivel decizional. De aceea, am devenit
                            creatori de oportunități la noi în sat. Toate
                            acestea prin forțe proprii deoarece credem cu tărie
                            în energia tinerilor și în motivația lor sinceră de
                            a se dezvolta împreună.
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
                            Ne ghidăm după valorile prieteniei și respectului,
                            echipei și colaborării, creativității și implicării
                            active. Dorim ca fiecare tânăr care participă la
                            activitățile noastre să se simtă valorizat, să simtă
                            că poate contribui și să își împlinească
                            potențialul. Ne străduim să creăm o atmosferă în
                            care fiecare membru se simte valorizat și apreciat,
                            într-un mediu sigur.
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
                        Oferim oportunități tinerilor din localitatea noastră
                        prin organizarea de activități diverse. Organizăm și
                        punem la dispoziția tinerilor ateliere și cursuri
                        educative, activități sportive și de voluntariat,
                        activități de socializare și petrecere a timpului liber
                        și activități culturale, în funcție de interesele
                        acestora. Punem accent pe implicarea tinerilor în
                        procesul de luare a deciziilor așa că încurajăm tinerii
                        să se implice în comunitatea extinsă prin ateliere
                        dedicate și dezbateri cu decidenții.
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
            <PageSection>
                <Stack gap={2}>
                    <Typography
                        variant="h3"
                        align="center"
                        className="titleHighlight"
                    >
                        Alătură-te comunității noastre!
                    </Typography>
                    <Socials large />
                </Stack>
            </PageSection>
        </>
    );
}
