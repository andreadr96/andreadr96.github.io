document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('[data-target]');
    const sections = document.querySelectorAll('.page-section');
    const mainNav = document.getElementById('main-nav');
    const goHomeLogo = document.getElementById('go-home');

    // Make home section visible on load
    const homeSection = document.getElementById('home-section');
    setTimeout(() => {
        homeSection.classList.add('visible');
    }, 100);

    function navigateTo(targetId) {
        // Remove active and visible classes from all sections
        sections.forEach(section => {
            section.classList.remove('visible');
            
            // Wait for transition to finish before hiding
            setTimeout(() => {
                if (!section.classList.contains('visible')) {
                    section.classList.remove('active');
                    section.classList.add('hidden');
                }
            }, 300); // Matches CSS transition duration
        });

        // Activate the target section
        setTimeout(() => {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
                
                // Allow display:flex to apply before adding visible for transition
                setTimeout(() => {
                    targetSection.classList.add('visible');
                }, 50);
            }
        }, 300);

        // Update Navigation Links active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });

        // Show/Hide Navbar based on section
        if (targetId === 'home-section') {
            mainNav.classList.add('hidden');
        } else {
            mainNav.classList.remove('hidden');
        }
    }

    // Add click events to all elements with data-target
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // Don't navigate if clicking the currently active section
            const targetSection = document.getElementById(targetId);
            if (targetSection && !targetSection.classList.contains('active')) {
                navigateTo(targetId);
            }
        });
    });

    // Go Home Logo Click
    if (goHomeLogo) {
        goHomeLogo.addEventListener('click', () => {
            const homeSection = document.getElementById('home-section');
            if (!homeSection.classList.contains('active')) {
                navigateTo('home-section');
            }
        });
    }
});
