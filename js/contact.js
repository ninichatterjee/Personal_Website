// Handle form submission with Formspree
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const checkboxes = document.querySelectorAll('input[name="communication[]"]');
    const submitButton = document.querySelector('.submit-button');
    
    // Add floating hearts on input focus
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function(e) {
            createFloatingHeart(e.target);
        });
    });

    // Create floating heart animation
    function createFloatingHeart(element) {
        const heart = document.createElement('span');
        heart.innerHTML = '💖';
        heart.className = 'floating-heart';
        heart.style.left = `${element.offsetLeft + element.offsetWidth / 2}px`;
        heart.style.top = `${element.offsetTop}px`;
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if at least one communication preference is selected
        const checked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        const errorMsg = document.getElementById('comm-error');
        
        if (!checked) {
            if (!errorMsg) {
                const error = document.createElement('p');
                error.id = 'comm-error';
                error.style.color = '#ff4444';
                error.textContent = 'Please select at least one communication preference';
                checkboxes[0].parentElement.parentElement.appendChild(error);
            }
            return;
        }
        
        // Disable submit button while processing
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Show sending status
        const statusDiv = document.createElement('div');
        statusDiv.className = 'form-status info';
        statusDiv.textContent = 'Sending your message...';
        form.insertAdjacentElement('beforebegin', statusDiv);

        // If validation passes, submit the form
        setTimeout(() => {
            form.submit();
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }, 2000);
    });

    // Remove error message when a checkbox is checked
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const errorMsg = document.getElementById('comm-error');
            if (errorMsg && Array.from(checkboxes).some(cb => cb.checked)) {
                errorMsg.remove();
            }
        });
    });

    // Add hover effect to checkboxes
    const checkboxLabels = document.querySelectorAll('.checkbox-option');
    checkboxLabels.forEach(label => {
        label.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        label.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
