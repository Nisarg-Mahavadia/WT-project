document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        // Allow optional country code and a 10-digit number
        const re = /^(\+?\d{1,3}[-\s]?)?\d{10}$/;
        return re.test(phone);
    }

    function validateForm() {
        let isValid = true;

        // Validate name field (should be more than 2 characters)
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else if (nameValue.length < 2) {  // Updated to check for at least 2 characters
            showError(nameInput, 'Name must contain at least 2 characters');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Validate phone number field
        const phoneValue = phoneInput.value.trim();
        if (phoneValue === '') {
            showError(phoneInput, 'Phone number is required');
            isValid = false;
        } else if (!validatePhone(phoneValue)) {
            showError(phoneInput, 'Please enter a valid phone number (optional country code and 10 digits)');
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // Validate email field
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(emailValue)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validate message field (should be more than 4 characters)
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else if (messageValue.length < 4) {  // Updated to check for at least 4 characters
            showError(messageInput, 'Message must contain at least 4 characters');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        return isValid;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            successMessage.style.display = 'block';

            // Clear form fields
            contactForm.reset();

            // Hide error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });
        }
    });
});
