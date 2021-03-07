import { VoteType } from "./blog-entry-vote.model";

export interface BlogEntryVoteCreate {
    blogEntryId: string;
    userId: string;
    type: VoteType;
}
