using HumanResources.Models;

namespace HumanResources.Dto
{
    public class BlogEntryVoteCreate
    {
        public string BlogEntryId { get; set; }

        public string UserId { get; set; }

        public VoteType Type { get; set; }
    }
}