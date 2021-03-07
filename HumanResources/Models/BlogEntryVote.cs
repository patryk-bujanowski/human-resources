using System;
namespace HumanResources.Models
{
    public enum VoteType 
    {
        Up = 0,
        Down = 1
    }

    public class BlogEntryVote
    {
        public string Id { get; set; }

        public string BlogEntryId { get; set; }

        public BlogEntry BlogEntry { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }   

        public VoteType Type { get; set; } 

        public BlogEntryVote()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}