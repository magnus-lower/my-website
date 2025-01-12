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

// ========== Progress Bar for Projects ==========
    const projectLinks = document.querySelectorAll(".project-link");
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    projectLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default navigation
            const targetUrl = this.getAttribute("data-url");

            // Reset progress bar
            progressBar.style.width = "0%";
            progressText.innerText = "Loading... 0%";
            progressContainer.style.display = "flex";

            let progress = 0;
            const updateProgress = () => {
                if (progress < 100) {
                    progress += Math.floor(Math.random() * 15) + 5; // Random increments for smoother animation
                    if (progress > 100) progress = 100; // Cap at 100%
                    progressBar.style.width = `${progress}%`;
                    progressText.innerText = `Loading... ${progress}%`;

                    setTimeout(updateProgress, Math.random() * 250); // Random delay for realism
                } else {
                    progressText.innerText = "Done! Redirecting...";
                    setTimeout(() => {
                        window.open(targetUrl, "_blank"); // Open in a new tab
                        progressContainer.style.display = "none"; // Hide progress bar
                    }, 800);
                }
            };

            updateProgress(); // Start the progress bar animation
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