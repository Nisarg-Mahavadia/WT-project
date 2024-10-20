document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form.login');
    const signupForm = document.querySelector('form.signup');

    // Login form elements
    const loginEmail = loginForm.querySelector('input[type="text"]');
    const loginPassword = loginForm.querySelector('input[type="password"]');

    // Signup form elements
    const signupEmail = signupForm.querySelector('input[type="text"]');
    const signupPassword = signupForm.querySelectorAll('input[type="password"]')[0]; // First password field
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1]; // Confirm password field

    // Utility functions to show and clear error messages
    function showError(input, message) {
        let errorElement = input.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.display = 'block';
    }

    function clearError(input) {
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Email validation function
    function validateEmail(email) {
        return email.endsWith('@gmail.com');
    }

    // Password length validation function
    function validatePasswordLength(password) {
        return password.length >= 8;
    }

    // Login form validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Validate login email
        if (loginEmail.value.trim() === '') {
            showError(loginEmail, 'Email is required');
            isValid = false;
        } else if (!validateEmail(loginEmail.value.trim())) {
            showError(loginEmail, 'Email must end with @gmail.com');
            isValid = false;
        } else {
            clearError(loginEmail);
        }

        // Validate login password
        if (loginPassword.value.trim() === '') {
            showError(loginPassword, 'Password is required');
            isValid = false;
        } else if (!validatePasswordLength(loginPassword.value.trim())) {
            showError(loginPassword, 'Password must be at least 8 characters long');
            isValid = false;
        } else {
            clearError(loginPassword);
        }

        if (isValid) {
            alert('Login successful!');
            loginForm.reset(); // Reset the form after successful validation
        }
    });

    // Signup form validation
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Validate signup email
        if (signupEmail.value.trim() === '') {
            showError(signupEmail, 'Email is required');
            isValid = false;
        } else if (!validateEmail(signupEmail.value.trim())) {
            showError(signupEmail, 'Email must end with @gmail.com');
            isValid = false;
        } else {
            clearError(signupEmail);
        }

        // Validate signup password
        if (signupPassword.value.trim() === '') {
            showError(signupPassword, 'Password is required');
            isValid = false;
        } else if (!validatePasswordLength(signupPassword.value.trim())) {
            showError(signupPassword, 'Password must be at least 8 characters long');
            isValid = false;
        } else {
            clearError(signupPassword);
        }

        // Validate confirm password
        if (confirmPassword.value.trim() === '') {
            showError(confirmPassword, 'Please confirm your password');
            isValid = false;
        } else if (signupPassword.value.trim() !== confirmPassword.value.trim()) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        } else {
            clearError(confirmPassword);
        }

        if (isValid) {
            alert('Signup successful!');
            signupForm.reset(); // Reset the form after successful validation
        }
    });
});
