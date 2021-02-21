import { User } from 'src/app/user/models/user.model';

export interface BlogEntry {
    id: string;
    author: User;
    content: string;
    creationDate: string;
    modificationDate: string;
}
