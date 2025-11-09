// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    initializeTheme();
    
    // Mobile Menu Functionality
    initializeMobileMenu();
    
    // Active Navigation Link
    initializeActiveNav();
    
    // Contact Form Handling
    initializeContactForm();
    
    // Back to Top Button
    initializeBackToTop();
    
    // Animations on Scroll
    initializeScrollAnimations();

    // Page Load Fade-in
    initializePageFadeIn();

    // Typing animation (if on home page)
    if (document.querySelector('.typing-text')) {
        initializeTypingEffect();
    }
});

// Page Load Fade-in
function initializePageFadeIn() {
    document.body.classList.add('loaded');
}

// Theme Management
function initializeTheme() {
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const sunIcons = document.querySelectorAll('#theme-icon-sun, #theme-icon-sun-mobile');
    const moonIcons = document.querySelectorAll('#theme-icon-moon, #theme-icon-moon-mobile');
    const htmlEl = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            sunIcons.forEach(icon => icon.classList.remove('hidden'));
            moonIcons.forEach(icon => icon.classList.add('hidden'));
        } else {
            htmlEl.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            sunIcons.forEach(icon => icon.classList.add('hidden'));
            moonIcons.forEach(icon => icon.classList.remove('hidden'));
        }
    }

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = htmlEl.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }
}

// Active Navigation
function initializeActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('form-success-message');

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function clearErrors() {
        [name, email, subject, message].forEach(input => input.classList.remove('error'));
        [nameError, emailError, subjectError, messageError].forEach(span => span.textContent = '');
        successMessage.classList.add('hidden');
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        let isValid = true;

        if (name.value.trim() === '') {
            name.classList.add('error');
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

        if (email.value.trim() === '') {
            email.classList.add('error');
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            email.classList.add('error');
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (subject.value.trim() === '') {
            subject.classList.add('error');
            subjectError.textContent = 'Subject is required.';
            isValid = false;
        }

        if (message.value.trim() === '') {
            message.classList.add('error');
            messageError.textContent = 'Message is required.';
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            console.log('Form submitted:', { 
                name: name.value, 
                email: email.value, 
                subject: subject.value, 
                message: message.value 
            });
            
            // Show success message and clear form
            successMessage.classList.remove('hidden');
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }
    });
}

// Back to Top
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.remove('visible');
                // Add hidden class after animation finishes
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        backToTopBtn.classList.add('hidden');
                    }
                }, 300);
            }
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after it's visible so it doesn't re-animate
                    // observer.unobserve(entry.target);
                }
                // Optional: To make it fade out when scrolling away
                // else {
                //     entry.target.classList.remove('visible');
                // }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Typing Effect
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const words = ["Software Developer", "Web Developer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const speed = isDeleting ? 100 : 150;

        if (isDeleting) {
            // Deleting
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, speed);
    }

    type();
}