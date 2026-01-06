export function craetewelecomeEmail(name , clientURI) {

      
     return `
        <html>
        <body>
            <h1>Welcome to Chatappfy , ${name} !</h1>
            <p>We're excited to have you on board. Click the link below to get started:</p>
            <a href="${clientURI}">Get Started</a>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br/>The Chatappfy Team</p>
        </body>
        </html>
     `;
}