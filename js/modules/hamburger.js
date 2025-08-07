export function initHamburger() {
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    if (!btn || !nav) return;

    // Simple toggle function
    const toggleMenu = () => {
        const isOpen = nav.classList.contains('open');
        
        if (isOpen) {
            // Close menu
            nav.classList.remove('open');
            document.body.classList.remove('menu-open');
            btn.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Open menu
            nav.classList.add('open');
            document.body.classList.add('menu-open');
            btn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    // Toggle menu when clicking hamburger button
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside (simple version)
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') && 
            !nav.contains(e.target) && 
            !btn.contains(e.target)) {
            nav.classList.remove('open');
            document.body.classList.remove('menu-open');
            btn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            document.body.classList.remove('menu-open');
            btn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}