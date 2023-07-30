import { FileHandle } from "./file-handle";
import { User } from "./user";

export interface Annonce{

    annonceId?: number;
    titre?: string;
    description?: string;
    datePub?: Date;
    prix?: number;
    duree?: 'Courte' | 'Moyenne' | 'Longue';
    type?: 'Partagée' | 'Privée';
    user?: User;
    ville?: string;
    quartier?:string;
    disponibilite?: string;
    images?: FileHandle[];

}