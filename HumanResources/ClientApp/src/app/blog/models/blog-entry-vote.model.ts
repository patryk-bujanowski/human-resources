export enum VoteType {
  Up = 0,
  Down = 1
}

export interface BlogEntryVote {
  id: string;
  blogEntryId: string;
  userId: string;
  type: VoteType;
}
