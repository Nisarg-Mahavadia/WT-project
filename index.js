document.addEventListener('DOMContentLoaded', function() {
    // Top header hide/show on scroll
    const topHeader = document.querySelector('.top-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            topHeader.classList.add('hidden');
        } else {
            topHeader.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    });

    // Sport slider
    const sportSlider = new Swiper('.sport-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 4,
            },
        },
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
    });

    // New arrivals slider
    const new_arrivals = new Swiper('.new-arrivals-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Classics slider
    const classicsSlider = new Swiper('.classics-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
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

    function validateForm() {
        let isValid = true;

        // Validate name field (should be more than 2 characters)
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else if (nameValue.length < 2) {
            showError(nameInput, 'Name must contain at least 2 characters');
            isValid = false;
        } else {
            clearError(nameInput);
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
        } else if (messageValue.length < 4) {
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
