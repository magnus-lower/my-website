export function initHamburgerMenu() {
    const toggleButton = document.querySelector('.hamburger');
    const navigation = document.querySelector('nav');
    if (!toggleButton || !navigation) return;

    const closeMenu = () => {
        navigation.classList.remove('open');
        document.body.classList.remove('menu-open');
        toggleButton.classList.remove('active');
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        const isOpen = navigation.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            navigation.classList.add('open');
            document.body.classList.add('menu-open');
            toggleButton.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    toggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (event) => {
        if (navigation.classList.contains('open') &&
            !navigation.contains(event.target) &&
            !toggleButton.contains(event.target)) {
            closeMenu();
        }
    });

    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
}
