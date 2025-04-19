document.addEventListener('DOMContentLoaded', function () {
    console.log('Website loaded successfully');

    initLanguageSwitcher();
    initTypingEffects();
    initScrollToTop();
    initDarkMode();
    initProjectProgressBar();
    initSmoothScroll();
    initContactForm();
    highlightActiveNavLink();

    const savedLanguage = localStorage.getItem('language') || 'en';
    updateLanguage(savedLanguage, true);

    console.log('All features initialized successfully.');
});

/* ========== Language Switcher ========== */
function initLanguageSwitcher() {
    const languageToggle = document.getElementById('language-toggle');
    if (!languageToggle) return;

    languageToggle.addEventListener('click', () => {
        let currentLanguage = localStorage.getItem('language') || 'en';
        currentLanguage = currentLanguage === 'en' ? 'no' : 'en';
        localStorage.setItem('language', currentLanguage);
        updateLanguage(currentLanguage, false);
    });
}

let typingInterval;

function typeEffect(element, text, speed) {
    if (!element) return;

    clearInterval(typingInterval); // Stopp tidligere typing-effekt
    element.textContent = ""; // Nullstill innholdet

    let i = 0;
    typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
        } else {
            clearInterval(typingInterval); // Stopp animasjonen når ferdig
        }
    }, speed);
}

function updateLanguage(language, firstLoad) {
    const languageToggle = document.getElementById('language-toggle');
    if (!languageToggle) return; // Unngå feil hvis elementet ikke finnes

    document.querySelectorAll("[data-en]").forEach(el => {
        if (el.id !== "typing-effect" && el.id !== "typing-projects") {
            el.textContent = language === 'no' ? el.getAttribute("data-no") : el.getAttribute("data-en");
        }
    });

    document.documentElement.lang = language === 'no' ? "no" : "en";

    languageToggle.src = language === 'no' ? "assets/norwegian-flag.png" : "assets/uk-flag.png";
    languageToggle.title = language === 'no' ? "Bytt til engelsk" : "Switch to Norwegian";

    if (firstLoad) {
        initTypingEffects(language);
    } else {
        restartTypingEffects(language);
    }
}

function initTypingEffects(language) {
    const typingEffect = document.getElementById('typing-effect');
    const typingProjects = document.getElementById('typing-projects');
    const typingAbout = document.getElementById('typing-about');

    if (typingEffect) {
        const text = language === 'no' ? typingEffect.getAttribute("data-no") : typingEffect.getAttribute("data-en");
        typeEffect(typingEffect, text, 100);
    }

    if (typingProjects) {
        const text = language === 'no' ? typingProjects.getAttribute("data-no") : typingProjects.getAttribute("data-en");
        typeEffect(typingProjects, text, 100);
    }

    if (typingAbout) {
        const text = language === 'no' ? typingAbout.getAttribute("data-no") : typingAbout.getAttribute("data-en");
        typeEffect(typingAbout, text, 100);
    }
}

function restartTypingEffects(language) {
    const typingEffect = document.getElementById('typing-effect');
    const typingProjects = document.getElementById('typing-projects');
    const typingAbout = document.getElementById('typing-about');

    if (typingEffect) typingEffect.textContent = "";
    if (typingProjects) typingProjects.textContent = "";
    if (typingAbout) typingAbout.textContent = "";

    setTimeout(() => {
        initTypingEffects(language);
    }, 200);
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
    const progressOverlay = document.getElementById("progress-overlay");

    if (!progressContainer || !progressBar || !progressText || !progressOverlay) return;

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
        progressOverlay.style.display = "block";

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
                    progressOverlay.style.display = "none";
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
    const confirmationMessage = document.getElementById('confirmation');
    if (!contactForm || !confirmationMessage) return;

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Show confirmation message
        confirmationMessage.style.display = 'block';

        // Submit the form data
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        })
            .then(() => {
                // Reset form after successful submission
                setTimeout(() => {
                    contactForm.reset();
                    confirmationMessage.style.display = 'none';
                }, 3000);
            })
            .catch(error => console.error('Error:', error));
    });
}

/* ========== Highlights active link ========== */
function highlightActiveNavLink() {
    let links = document.querySelectorAll("nav ul li a");
    let currentPath = window.location.pathname;

    if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html')) {
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