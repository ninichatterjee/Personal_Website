document.addEventListener('DOMContentLoaded', function() {
    // Skill progress bar animation
    const skills = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skills.forEach(skill => {
            const progress = skill.querySelector('.skill-progress');
            const percentage = progress.getAttribute('data-progress');
            progress.style.width = percentage + '%';
        });
    }

    // Animate skills when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
            }
        });
    });

    document.querySelectorAll('.skills-section').forEach(section => {
        observer.observe(section);
    });

    // Profile picture interaction
    const profilePic = document.querySelector('.profile-picture');
    if (profilePic) {
        profilePic.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
        });

        profilePic.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Add floating emojis around interests
    const interests = document.querySelectorAll('.interest-item');
    const emojis = ['💻', '🎨', '🎮', '📚', '✈️', '🎵', '🎬', '🌟'];
    
    interests.forEach(interest => {
        interest.addEventListener('mouseover', function(e) {
            const emoji = document.createElement('span');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.className = 'floating-emoji';
            emoji.style.left = `${e.pageX}px`;
            emoji.style.top = `${e.pageY}px`;
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 1000);
        });
    });

    // Typing effect for bio
    const bioText = document.querySelector('.bio-text');
    if (bioText) {
        const text = bioText.textContent;
        bioText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                bioText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing when bio comes into view
        const bioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    bioObserver.unobserve(entry.target);
                }
            });
        });

        bioObserver.observe(bioText);
    }

    // Scroll reveal animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease-out';
    });

    const revealSection = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    sections.forEach(section => {
        revealSection.observe(section);
    });
});
