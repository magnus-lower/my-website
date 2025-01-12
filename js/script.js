document.addEventListener('DOMContentLoaded', function () {
    console.log('Website loaded successfully');

    initTypingEffects();
    initScrollToTop();
    initDarkMode();
    initProjectProgressBar();
    initSmoothScroll();
    initContactForm();
    highlightActiveNavLink();

    console.log('All features initialized successfully.');
});

/* ========== Typing Effect for Hero, About, and Projects ========== */
function initTypingEffects() {
    const typeEffect = (element, text, speed) => {
        if (!element) return;
        let i = 0;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i++);
                setTimeout(type, speed);
            }
        }
        type();
    };

    typeEffect(document.getElementById('typing-effect'), "Welcome to My Portfolio", 100);
    typeEffect(document.getElementById('typing-about'), "About Me", 100);
    typeEffect(document.getElementById('typing-projects'), "My Projects", 100);
}

/* ========== Scroll-to-Top Button ========== */
function initScrollToTop() {
    const scrollButton = document.getElementById('scroll-top');
    if (!scrollButton) return;

    window.addEventListener('scroll', () => {
        scrollButton.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ========== Dark Mode Toggle ========== */
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply dark mode if enabled (apply to both `body` and `html`)
    if (isDarkMode) {
        document.documentElement.classList.add('dark-mode'); // Apply to <html>
        document.body.classList.add('dark-mode'); // Apply to <body>
        darkModeToggle.checked = true;
    }

    // Toggle dark mode and update localStorage
    darkModeToggle.addEventListener('change', () => {
        const enabled = darkModeToggle.checked;

        document.documentElement.classList.toggle('dark-mode', enabled);
        document.body.classList.toggle('dark-mode', enabled);

        localStorage.setItem('darkMode', enabled.toString());
    });

    // Ensure dark mode is persistent on scroll and across all pages
    window.addEventListener('scroll', () => {
        if (localStorage.getItem('darkMode') === 'true') {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        }
    });
}

/* ========== Progress Bar for Projects ========== */
function initProjectProgressBar() {
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    if (!progressContainer || !progressBar || !progressText) return;

    document.body.addEventListener("click", function (event) {
        const link = event.target.closest(".project-link");
        if (!link) return;

        event.preventDefault();
        const targetUrl = link.getAttribute("data-url");
        if (!targetUrl) return;

        // Reset progress bar
        progressBar.style.width = "0%";
        progressText.innerText = "Loading... 0%";
        progressContainer.style.display = "flex";

        let progress = 0;

        function updateProgress() {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress > 100) progress = 100;

            progressBar.style.width = `${progress}%`;
            progressText.innerText = `Loading... ${progress}%`;

            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                progressText.innerText = "Done! Redirecting...";
                setTimeout(() => {
                    window.open(targetUrl, "_blank");
                    progressContainer.style.display = "none";
                }, 800);
            }
        }

        requestAnimationFrame(updateProgress);
    });
}

/* ========== Smooth Scroll Animations ========== */
function initSmoothScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;

    function checkFadeIn() {
        fadeElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeIn);
    checkFadeIn(); // Run on page load
}

/* ========== Contact Form Submission Confirmation ========== */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const confirmationMessage = document.getElementById('confirmation');
        if (!confirmationMessage) return;

        confirmationMessage.style.display = 'block';

        setTimeout(() => {
            contactForm.reset();
            confirmationMessage.style.display = 'none';
        }, 3000);

        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
            .then(response => response.ok ? console.log('Form submitted successfully') : console.error('Form submission error'))
            .catch(error => console.error('Error:', error));
    });
}

/* ========== Highlights active link ========== */
function highlightActiveNavLink() {
    let links = document.querySelectorAll("nav ul li a");
    let currentPath = window.location.pathname;

    if (currentPath === '/' || currentPath === '/index.html') {
        currentPath = 'index.html';
    }

    links.forEach(link => {
        let linkPath = link.getAttribute("href");
        if (linkPath.startsWith("http")) return;

        if (currentPath.includes(linkPath)) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}