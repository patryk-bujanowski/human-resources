using HumanResources.Models;

namespace HumanResources.Dto
{    

    public class BlogEntryVoteDto
    {
        public string Id { get; set; }
        
        public string BlogEntryId { get; set; }

        public string UserId { get; set; }

        public VoteType Type { get; set; }
    }
}