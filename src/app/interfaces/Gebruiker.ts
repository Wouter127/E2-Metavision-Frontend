import { Organisatie } from "./Organisatie";

export interface Gebruiker {
    id: number;
    organisatieId: number;
    voornaam: string;
    achternaam: string;
    email: string;
    gsm: string;
    krijgtMelding: number;
    password: string;
    isOrganisatieBeheerder: number;
    isAdmin: number;
    vervolledig_token: string;

    organisatie?: Organisatie;
}
