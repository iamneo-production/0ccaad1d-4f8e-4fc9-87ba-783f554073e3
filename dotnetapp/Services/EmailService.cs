using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using dotnetapp.Services;


namespace dotnetapp.Services
{
    public class EmailService:IEmailService
    {
    private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmail(string recipientEmail, string subject, string body)
        {
            var smtpHost = _configuration["EmailSettings:SmtpHost"];
            var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"]);
            var smtpUsername = _configuration["EmailSettings:SmtpUsername"];
            var smtpPassword = _configuration["EmailSettings:SmtpPassword"];
            var senderEmail = _configuration["EmailSettings:SenderEmail"];

            var mailMessage = new MailMessage(senderEmail, recipientEmail)
                {
                    Subject = subject,
                    IsBodyHtml = true, // Set the IsBodyHtml property to true for HTML formatting
                    Body = body // Set the HTML body content
                };
                using (var smtpClient = new SmtpClient(smtpHost, smtpPort))
                {
                smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                smtpClient.EnableSsl = true;

                await smtpClient.SendMailAsync(mailMessage);
        
              }
        }
    }
}