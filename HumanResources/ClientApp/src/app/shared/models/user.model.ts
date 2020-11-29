import { UserDetails } from './user-details.model';

export interface User {
    id: string;
    email: string;
    accessToken: string;
    firstName: string;
    lastName: string;
    sex: string;
    details: UserDetails;
}
