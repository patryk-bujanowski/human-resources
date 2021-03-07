using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Models
{
    public class BlogEntry
    {
        public const char VotesSeparator = ';';
        
        public string Id { get; set; }

        public User Author { get; set; }

        public string Content { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ModificationDate { get; set; }

        public ICollection<BlogEntryVote> Votes { get; set; }

        public BlogEntry()
        {
            Id = Guid.NewGuid().ToString();
            var now = DateTime.Now;
            CreationDate = now;
            ModificationDate = now;
        }
    }
}
