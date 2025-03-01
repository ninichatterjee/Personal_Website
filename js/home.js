document.addEventListener('DOMContentLoaded', function() {
    // Animate profile picture and stars
    const profileContainer = document.querySelector('.profile-container');
    const stars = document.querySelectorAll('.star');
    
    if (profileContainer) {
        profileContainer.addEventListener('mouseenter', function() {
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.opacity = '1';
                    star.style.transform = `rotate(${360}deg) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
                }, index * 100);
            });
        });

        profileContainer.addEventListener('mouseleave', function() {
            stars.forEach(star => {
                star.style.opacity = '0';
                star.style.transform = 'rotate(0deg) translate(0, 0)';
            });
        });
    }

    // Typing effect for tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        typeWriter();
    }

    // Animate social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.social-icon');
            icon.style.transform = 'rotate(360deg) scale(1.2)';
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.social-icon');
            icon.style.transform = 'rotate(0deg) scale(1)';
        });
    });

    // Project list hover effect
    const projects = document.querySelectorAll('.project-title');
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.color = '#ff9ecd';
            createProjectSparkle(this);
        });

        project.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });

    function createProjectSparkle(element) {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.className = 'project-sparkle';
        element.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }

    // Scroll reveal animation for sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Experience card hover effects
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(255, 158, 205, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
    });
});
