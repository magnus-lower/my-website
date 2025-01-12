document.addEventListener('DOMContentLoaded', function () {
    console.log('Website loaded successfully');

    // ========== Typing Effect for Hero, about, and project Sections ==========
    function typeEffect(element, text, speed) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const heroTitle = document.getElementById('typing-effect');
    if (heroTitle) {
        heroTitle.innerHTML = "";
        typeEffect(heroTitle, "Welcome to My Portfolio", 100);
    }

    const aboutTitle = document.getElementById('typing-about');
    if (aboutTitle) {
        aboutTitle.innerHTML = "";
        typeEffect(aboutTitle, "About Me", 100);
    }

    const projectsTitle = document.getElementById('typing-projects');
    if (projectsTitle) {
        projectsTitle.innerHTML = "";
        typeEffect(projectsTitle, "My Projects", 100);
    }

    // ========== Scroll-to-Top Button ==========
    window.addEventListener('scroll', function () {
        let scrollButton = document.getElementById('scroll-top');
        if (window.scrollY > 300) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    });

    document.getElementById('scroll-top').addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== Dark Mode Toggle ==========
    const darkModeToggle = document.getElementById('dark-mode-toggle');
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

    // ========== Project Links Progress Bar Animation ==========
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            const targetUrl = this.href; // Get the URL to navigate to

            // Show progress bar
            const progressContainer = document.getElementById('progress-container');
            const progressBar = document.getElementById('progress-bar');
            progressContainer.style.display = 'block';

            // Animate the progress bar
            let width = 0;
            const interval = setInterval(function () {
                if (width >= 100) {
                    clearInterval(interval);
                    window.location.href = targetUrl; // Redirect to the URL
                } else {
                    width += 5; // Adjust the speed by changing this value
                    progressBar.style.width = width + '%';
                }
            }, 100); // Adjust the speed of the interval here (100ms for smoother progress)
        });
    });

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