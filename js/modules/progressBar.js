export function initProjectProgressBar() {
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