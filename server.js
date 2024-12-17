const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static('public'));

// API Route: Handle Form Submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Simulate sending email using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or any email service
        auth: {
            user: 'your_email@example.com',
            pass: 'your_email_password',
        },
    });

    const mailOptions = {
        from: email,
        to: 'your_email@example.com',
        subject: `Contact Form Submission from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to send email.' });
        }
        res.json({ message: 'Message sent successfully!' });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
