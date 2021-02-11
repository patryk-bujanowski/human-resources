import { User } from 'src/app/user/models/user.model';

export interface BlogEntry {
    id: string;
    author: User;
    creationDate: string;
    modificationDate: string;
    body: string;
}
