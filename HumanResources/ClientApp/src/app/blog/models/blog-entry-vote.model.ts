export enum VoteType {
  Up,
  Down
}

export enum VoteMode {
  Add,
  Remove
}

export interface BlogEntryVote {
  blogEntryId: string;
  userId: string;
  type: VoteType;
  mode: VoteMode;
}
