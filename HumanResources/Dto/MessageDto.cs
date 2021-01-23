using System;
using HumanResources.Models;

namespace HumanResources.Dto
{
    public class MessageDto
    {
        public string Id { get; set; }

        public DateTime SentDate { get; set; }

        public User Sender { get; set; }

        public User Receiver { get; set; }

        public string Content { get; set; }
    }
}