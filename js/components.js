// components.js - Handles common HTML components and site-wide functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to inject navigation bar
    function injectNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        const navHTML = `
        <nav>
            <div class="nav-buttons">
                <a href="index.html" ${currentPage === 'index.html' ? 'class="active"' : ''}>Home</a>
                <a href="about.html" ${currentPage === 'about.html' ? 'class="active"' : ''}>About</a>
                <a href="portfolio.html" ${currentPage === 'portfolio.html' ? 'class="active"' : ''}>Portfolio</a>
                <a href="contact.html" ${currentPage === 'contact.html' ? 'class="active"' : ''}>Contact</a>
            </div>
        </nav>
        
        <div class="scroll-progress">
            <div class="progress-dot ${currentPage === 'index.html' ? 'active' : ''}" data-page="index.html"></div>
            <div class="progress-dot ${currentPage === 'about.html' ? 'active' : ''}" data-page="about.html"></div>
            <div class="progress-dot ${currentPage === 'portfolio.html' ? 'active' : ''}" data-page="portfolio.html"></div>
            <div class="progress-dot ${currentPage === 'contact.html' ? 'active' : ''}" data-page="contact.html"></div>
        </div>
        `;
        
        // Get the existing nav element if present
        const existingNav = document.querySelector('nav');
        
        if (existingNav) {
            // Replace existing navigation
            existingNav.outerHTML = navHTML;
        } else {
            // Insert at the beginning of the body
            const firstElement = document.body.firstChild;
            const navContainer = document.createElement('div');
            navContainer.innerHTML = navHTML;
            document.body.insertBefore(navContainer, firstElement);
        }
    }

    // Function to ensure all pages have required head elements
    function ensureHeadElements() {
        // Check if Quicksand font is already included
        if (!document.querySelector('link[href*="Quicksand"]')) {
            const fontLink = document.createElement('link');
            fontLink.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap";
            fontLink.rel = "stylesheet";
            document.head.appendChild(fontLink);
        }
    }

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
    
    // Setup page transitions
    function setupPageTransitions() {
        // Setup navigation buttons
        const navButtons = document.querySelectorAll('nav a');
        
        navButtons.forEach((button, index) => {
            // Add click event for smooth scrolling
            button.addEventListener('click', function(e) {
                // Only prevent default if going to a different page
                if (pages[index].url !== currentUrl) {
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
        
        // Setup scroll detection for page transitions
        if (currentPageIndex < pages.length - 1) {
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
                        window.location.href = pages[currentPageIndex + 1].url;
                    }, 500);
                }
            });
        }
        
        // Add page entrance animation
        document.body.classList.add('page-transition-in');
    }
    
    // Call the functions
    ensureHeadElements();
    injectNavigation();
    setupPageTransitions();
});
