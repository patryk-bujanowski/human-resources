using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;

namespace HumanResources.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly ILogger<IEmailSender> logger;

        public EmailSender(ILogger<IEmailSender> logger)
        {
            this.logger = logger;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            logger.LogDebug($"Adres email = {email} | Temat = {subject} | Treść = {htmlMessage}");

            await Task.CompletedTask;
        }
    }
}
