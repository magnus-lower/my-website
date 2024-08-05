document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');

    // Select all project links
    const projectLinks = document.querySelectorAll('.project-link');

    projectLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const targetUrl = this.href; // Get the URL to navigate to

            // Show progress bar
            const progressContainer = document.getElementById('progress-container');
            const progressBar = document.getElementById('progress-bar');
            progressContainer.style.display = 'block';

            // Animate the progress bar
            let width = 0;
            const interval = setInterval(function() {
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
});
