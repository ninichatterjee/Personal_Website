document.addEventListener('DOMContentLoaded', () => {
    const pages = ['index.html', 'about.html', 'portfolio.html', 'contact.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = pages.indexOf(currentPage);
    let isScrolling = false;

    // Handle navigation links
    document.querySelectorAll('nav a, .progress-dot').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('href') || link.getAttribute('data-page');
            transitionToPage(targetPage);
        });
    });

    // Handle scroll events
    window.addEventListener('scroll', () => {
        if (isScrolling) return;

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if scrolled to bottom
        if (scrollPosition + windowHeight >= documentHeight - 50) {
            const nextPage = pages[currentIndex + 1];
            if (nextPage) {
                isScrolling = true;
                transitionToPage(nextPage);
            }
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            const nextPage = pages[currentIndex + 1];
            if (nextPage) {
                transitionToPage(nextPage);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            const prevPage = pages[currentIndex - 1];
            if (prevPage) {
                transitionToPage(prevPage);
            }
        }
    });

    function transitionToPage(href) {
        document.body.style.opacity = 0;
        document.body.classList.add('page-transition');
        
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    }

    // Add transition styles to body
    document.body.style.opacity = 1;
});
