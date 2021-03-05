namespace HumanResources.Dto
{
    public enum VoteType
    {
        Up,
        Down
    }

    public enum VoteMode
    {
        Add,
        Remove
    }
    
    public class BlogEntryVoteDto
    {
        public string BlogEntryId { get; set; }

        public string UserId { get; set; }

        public VoteType Type { get; set; }

        public VoteMode Mode { get; set; }
    }
}