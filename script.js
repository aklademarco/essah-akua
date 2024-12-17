// Mobile Navigation Toggle
const navBar = document.querySelector('.nav-bar');
const navLinks = document.querySelector('.nav-links');

navBar.addEventListener('click', () => {
    navBar.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const impactItems = document.querySelectorAll(".impact-item");

    window.addEventListener("scroll", function () {
        impactItems.forEach((item) => {
            const position = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (position < windowHeight - 100) {
                item.classList.add("visible");
            }
        });
    });
});

// Dynamic Year in Footer
const yearSpan = document.createElement('span');
yearSpan.textContent = new Date().getFullYear();
document.querySelector('.footer').appendChild(yearSpan);

// Form Validation
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function (e) {
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();

    if (!name || !email || !message) {
        e.preventDefault();
        alert('Please fill out all fields.');
    }
});


const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const responseElement = document.getElementById('formResponse');

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();
        if (response.ok) {
            responseElement.innerText = result.message;
        } else {
            responseElement.innerText = result.message || 'Something went wrong.';
        }
    } catch (error) {
        console.error(error);
        responseElement.innerText = 'Failed to submit the form.';
    }
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


