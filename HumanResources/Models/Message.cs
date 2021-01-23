using System;

namespace HumanResources.Models
{
    public class Message
    {
        public string Id { get; set; }

        public DateTime SentDate { get; set; }

        public string SenderId { get; set; }

        public User Sender { get; set; }

        public string ReceiverId { get; set; }

        public User Receiver { get; set; }

        public string Content { get; set; }
    }
}