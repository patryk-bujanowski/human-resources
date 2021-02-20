using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResources.Dto
{
    public class BlogEntryDto
    {
        public UserDto Author { get; set; }

        public string Content { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ModificationDate { get; set; }
    }
}
