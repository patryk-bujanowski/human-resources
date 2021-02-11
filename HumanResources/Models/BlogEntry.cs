using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Models
{
    public class BlogEntry
    {
        public string Id { get; set; }

        public string AuthorId { get; set; }

        public User Author { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ModificationDate { get; set; }

        public string Body { get; set; }

        public BlogEntry()
        {
            CreationDate = DateTime.Now;
            ModificationDate = DateTime.Now;
        }
    }
}
