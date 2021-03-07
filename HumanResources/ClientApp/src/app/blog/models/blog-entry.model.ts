import { User } from 'src/app/user/models/user.model';
import { BlogEntryVote } from './blog-entry-vote.model';

export interface BlogEntry {
    id: string;
    author: User;
    content: string;
    creationDate: string;
    modificationDate: string;
    votes: BlogEntryVote[];
}
