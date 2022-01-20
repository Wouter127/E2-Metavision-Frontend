import { Organisatie } from "./Organisatie";

export interface Gebruiker {
    id: number;
    organisatieId: number;
    voornaam: string;
    achternaam: string;
    email: string;
    wachtwoord: string;
    isOrganisatieBeheerder: boolean;
    isAdmin: boolean;

    organisatie?: Organisatie;
}
