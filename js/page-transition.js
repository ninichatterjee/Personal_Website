document.addEventListener('DOMContentLoaded', function() {
    // Pages to include in the transition
    const pages = [
        { id: 'home', url: 'index.html' },
        { id: 'about', url: 'about.html' },
        { id: 'portfolio', url: 'portfolio.html' },
        { id: 'contact', url: 'contact.html' }
    ];
    
    // Get current page from URL
    const currentUrl = window.location.pathname.split('/').pop() || 'index.html';
    const currentPageIndex = pages.findIndex(page => page.url === currentUrl);
    
    // Setup navigation buttons
    setupNavButtons(currentPageIndex);
    
    // Setup scroll detection
    setupScrollTransition(currentPageIndex);
    
    // Setup navigation buttons
    function setupNavButtons(activeIndex) {
        const navButtons = document.querySelectorAll('nav a');
        
        navButtons.forEach((button, index) => {
            // Mark active button
            if (index === activeIndex) {
                button.classList.add('active-nav');
            }
            
            // Add click event for smooth scrolling
            button.addEventListener('click', function(e) {
                // Only prevent default if going to a different page
                if (index !== currentPageIndex) {
                    e.preventDefault();
                    
                    // Animate page transition out
                    document.body.classList.add('page-transition-out');
                    
                    // Navigate after animation
                    setTimeout(() => {
                        window.location.href = pages[index].url;
                    }, 500);
                }
            });
        });
    }
    
    // Setup scroll detection for page transitions
    function setupScrollTransition(currentIndex) {
        if (currentIndex < pages.length - 1) {
            // There's a next page to transition to
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                
                // If scrolled past 99% of the page
                if (scrollPosition > (documentHeight - windowHeight) * 0.99) {
                    // Prevent multiple triggers
                    window.removeEventListener('scroll', arguments.callee);
                    
                    // Animate page transition out
                    document.body.classList.add('page-transition-out');
                    
                    // Navigate to next page
                    setTimeout(() => {
                        window.location.href = pages[currentIndex + 1].url;
                    }, 500);
                }
            });
        }
    }
    
    // Add page entrance animation
    document.body.classList.add('page-transition-in');
});
