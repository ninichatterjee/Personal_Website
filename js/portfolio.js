document.addEventListener('DOMContentLoaded', function() {
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });

        card.addEventListener('mouseenter', function() {
            card.style.transform = 'scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'scale(1)';
        });
    });

    // Experience card animations
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        // Add shimmer effect on hover
        card.addEventListener('mouseenter', function() {
            const shimmer = document.createElement('div');
            shimmer.className = 'card-shimmer';
            this.appendChild(shimmer);
            
            setTimeout(() => shimmer.remove(), 1000);
        });
    });

    // Animate featured experience
    const featuredExp = document.querySelector('.featured-experience');
    if (featuredExp) {
        const image = featuredExp.querySelector('img');
        const content = featuredExp.querySelector('.experience-content');

        featuredExp.addEventListener('mouseenter', function() {
            image.style.transform = 'scale(1.1)';
            content.style.backgroundColor = 'rgba(255, 158, 205, 0.1)';
        });

        featuredExp.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
            content.style.backgroundColor = 'transparent';
        });
    }

    // Add scroll reveal animation
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        revealOnScroll.observe(section);
    });

    // Skill tag animations
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.add('skill-pop');
            setTimeout(() => this.classList.remove('skill-pop'), 500);
        });
    });

    // Add floating icons for technology stack
    function createFloatingIcon(text, x, y) {
        const icon = document.createElement('div');
        icon.className = 'floating-tech-icon';
        icon.textContent = text;
        icon.style.left = x + 'px';
        icon.style.top = y + 'px';
        document.body.appendChild(icon);
        
        setTimeout(() => icon.remove(), 1500);
    }

    const techStacks = document.querySelectorAll('.tech-stack');
    const techIcons = ['⚛️', '🐍', '☕', '🌐', '📱', '🤖', '🔷', '🎨'];
    
    techStacks.forEach(stack => {
        stack.addEventListener('mouseover', function(e) {
            const icon = techIcons[Math.floor(Math.random() * techIcons.length)];
            createFloatingIcon(icon, e.pageX, e.pageY);
        });
    });

    // Certificate hover effect
    const certificates = document.querySelectorAll('.certification-item');
    
    certificates.forEach(cert => {
        cert.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        cert.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});
