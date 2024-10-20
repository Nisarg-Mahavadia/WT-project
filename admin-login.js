document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adminLoginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Function to validate the username
    function validateUsername(username) {
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/; // Regular expression for special characters
        return specialCharPattern.test(username);
    }

    // Function to validate the password
    function validatePassword(password) {
        return password.length >= 8; // Check if password is at least 8 characters
    }

    // Function to show error messages
    function showError(input, errorElement, message) {
        const inputGroup = input.closest('.input-group');
        inputGroup.classList.add('error'); // Add error class to show the error message
        errorElement.textContent = message;
        errorElement.style.visibility = 'visible';
    }

    // Function to clear error messages
    function clearError(input, errorElement) {
        const inputGroup = input.closest('.input-group');
        inputGroup.classList.remove('error'); // Remove error class when input is valid
        errorElement.textContent = '';
        errorElement.style.visibility = 'hidden';
    }

    // Form submit event listener
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission until validation is passed

        let isValid = true;

        // Validate username
        if (!validateUsername(usernameInput.value)) {
            showError(usernameInput, usernameError, 'Username must contain at least 1 special character');
            isValid = false;
        } else {
            clearError(usernameInput, usernameError);
        }

        // Validate password
        if (!validatePassword(passwordInput.value)) {
            showError(passwordInput, passwordError, 'Password must be at least 8 characters long');
            isValid = false;
        } else {
            clearError(passwordInput, passwordError);
        }

        // If all validations pass, submit the form (or redirect to productadd.html)
        if (isValid) {
            window.location.href = 'productadd.html'; // Redirect to product add page
        }
    });
});
