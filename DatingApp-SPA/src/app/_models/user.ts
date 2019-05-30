import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    gender: string;
    knownAs: string;
    age: number;
    created: Date;
    lastActive: Date;
    city: string;
    country: string;
    photoUrl: string;
    interests?: string;
    lookingFor?: string;
    introduction?: string;
    photos?: Photo[];
}
