import { UserDetails } from './user-details.model';

export class User {
    id: string;
    email: string;
    accessToken: string;
    firstName: string;
    lastName: string;
    sex: string;
    avatar: string;
    details: UserDetails;
}
