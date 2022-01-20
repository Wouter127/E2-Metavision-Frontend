import { Gebruiker } from "./Gebruiker";
import { Weerstation } from "./Weerstation";
export interface Organisatie {
    id: number;
    naam: string;
    land: string;
    stad: string;
    postcode: string;
    straat: string;
    huisnummer: string;
    extra: string;
    weerstations: Weerstation[];
    gebruikers: Gebruiker[];
}
