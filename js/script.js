document.addEventListener('DOMContentLoaded', function () {
    console.log('Website loaded successfully');

    // ========== Typing Effect for Hero, About, and Projects ==========
    function typeEffect(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        if (element) {
            element.innerHTML = ""; // Clear existing text
            type();
        }
    }

    typeEffect(document.getElementById('typing-effect'), "Welcome to My Portfolio", 100);
    typeEffect(document.getElementById('typing-about'), "About Me", 100);
    typeEffect(document.getElementById('typing-projects'), "My Projects", 100);

    // ========== Scroll-to-Top Button ==========
    const scrollButton = document.getElementById('scroll-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    });

    scrollButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== Scroll-to-Top Button ==========
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const sunIcon = document.getElementById('mode-icon');
    const moonIcon = document.getElementById('mode-icon-dark');

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function () {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Load dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
    }

    // ========== Accurate Project Loading Progress Bar ==========
    const projectLinks = document.querySelectorAll('.project-link');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    projectLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default navigation
            const targetUrl = this.getAttribute('data-url');

            // Show progress bar
            progressContainer.style.display = 'block';
            progressBar.style.width = '0%';
            progressText.innerText = 'Connecting...';

            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 90) {
                    progress += 10;
                    progressBar.style.width = progress + '%';
                    progressText.innerText = `Loading: ${progress}%`;
                }
            }, 300);

            // Simulating actual load time
            fetch(targetUrl, { mode: 'no-cors' })
                .then(() => {
                    clearInterval(interval);
                    progressBar.style.width = '100%';
                    progressText.innerText = "Loaded! Redirecting...";
                    setTimeout(() => window.location.href = targetUrl, 800);
                })
                .catch(() => {
                    clearInterval(interval);
                    progressText.innerText = "Failed to load. Redirecting...";
                    setTimeout(() => window.location.href = targetUrl, 2000);
                });
        });
    });

    // ========== Smooth Scroll Animations ==========
    const fadeElements = document.querySelectorAll('.fade-in');
    function checkFadeIn() {
        fadeElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkFadeIn);
    checkFadeIn(); // Run on page load

    // ========== Contact Form Submission Confirmation ==========
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            const confirmationMessage = document.getElementById('confirmation');
            confirmationMessage.style.display = 'block'; // Show confirmation message

            // Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
                confirmationMessage.style.display = 'none';
            }, 3000);

            // Send form data
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    console.log('Form submitted successfully');
                } else {
                    console.error('Form submission error');
                }
            }).catch(error => console.error('Error:', error));
        });
    }
});