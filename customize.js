document.addEventListener('DOMContentLoaded', function() {
    // Sign Up button functionality
    const signUpBtn = document.querySelector('.signup-btn');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function() {
            alert('Sign up functionality to be implemented');
        });
    }

    // Shop Now button functionality
    const shopBtn = document.querySelector('.shop-btn');
    if (shopBtn) {
        shopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Shop Now functionality to be implemented');
        });
    }

    // Product slider functionality
    const slider = document.querySelector('.product-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // Product details functionality
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each shoe
    const shoesData = {
        1: {
            name: "Elite Runner",
            price: "$129.99",
            images: ["cus-1.jpg", "cus-1-2.jpg", "cus-1-3.jpg", "cus-1-4.jpg"],
            description: "Experience elite performance with the Elite Runner. Designed for serious runners who demand the best in comfort and speed."
        },
        2: {
            name: "NIKE DUNK LOW PREMIUM PREMIUM FLEECA BY YOU",
            price: "Rs.13,995",
            images: ["cus-2.jpg", "cus-2-2.jpg", "cus-2-3.jpg", "cus-2-4.jpg"],
            description: "Customize your style with the Nike Dunk Low Premium Fleeca. Create a unique look that reflects your personal taste."
        },
        3: {
            name: "NIKE PEGASUS 41 BY YOU",
            price: "Rs.14,995",
            images: ["cus-3.jpg", "cus-3-2.jpg", "cus-3-3.jpg", "cus-3-4.jpg"],
            description: "Run your way with the Nike Pegasus 41 By You. Personalize this iconic running shoe to match your style and performance needs."
        },
        4: {
            name: "NIKE AIRFORCE 1 LOW BY YOU",
            price: "Rs.12,925",
            images: ["cus-4.jpg", "cus-4-2.jpg", "cus-4-3.jpg", "cus-4-4.jpg"],
            description: "Make a statement with the Nike Air Force 1 Low By You. Customize this classic sneaker to create your perfect everyday shoe."
        },
        5: {
            name: "NIKE INVINCIBLE 3 BY YOU",
            price: "Rs.19,295",
            images: ["cus-5.jpg", "cus-5-2.jpg", "cus-5-3.jpg", "cus-5-4.jpg"],
            description: "Feel invincible in the Nike Invincible 3 By You. Customize this high-performance running shoe for ultimate comfort and support."
        },
        6: {
            name: "NIKE AIR MAX PLUS BY YOU",
            price: "Rs.17,495",
            images: ["cus-6.jpg", "cus-6-2.jpg", "cus-6-3.jpg", "cus-6-4.jpg"],
            description: "Step into maximum style with the Nike Air Max Plus By You. Personalize this iconic silhouette to stand out from the crowd."
        }
    };

    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            loadProductDetails(productId);
        });
    });

    function loadProductDetails(productId) {
        const shoe = shoesData[productId];
        if (!shoe) {
            console.error('Shoe data not found');
            return;
        }

        const productDetailsHTML = `
            <div class="product-details">
                <div class="product-images">
                    <div class="main-image-container">
                        <img src="${shoe.images[0]}" alt="Main Product Image" id="mainImage">
                    </div>
                    <div class="thumbnail-container">
                        ${shoe.images.map((img, index) => `
                            <img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                        `).join('')}
                    </div>
                </div>
                <div class="product-info">
                    <h2 id="productTitle">${shoe.name}</h2>
                    <p class="price" id="productPrice">${shoe.price}</p>
                    <div class="specifications">
                        <h3>Size:</h3>
                        <div class="size-selector">
                            <button class="size-option" onclick="selectSize(this)">7</button>
                            <button class="size-option" onclick="selectSize(this)">8</button>
                            <button class="size-option" onclick="selectSize(this)">9</button>
                            <button class="size-option" onclick="selectSize(this)">10</button>
                            <button class="size-option" onclick="selectSize(this)">11</button>
                        </div>
                        <h3>Color:</h3>
                        <div class="color-selector">
                            <button class="color-option" style="background-color: black;" onclick="selectColor(this)"></button>
                            <button class="color-option" style="background-color: white;" onclick="selectColor(this)"></button>
                            <button class="color-option" style="background-color: red;" onclick="selectColor(this)"></button>
                            <button class="color-option" style="background-color: blue;" onclick="selectColor(this)"></button>
                        </div>
                        <p>${shoe.description}</p>
                    </div>
                    <button class="buy-button">Buy Now</button>
                    <button class="back-button" onclick="showMainContent()">Back to Products</button>
                </div>
            </div>
        `;

        productDetailsContainer.innerHTML = productDetailsHTML;
        mainContent.style.display = 'none';
        productDetailsContainer.style.display = 'block';

        // Add event listeners to thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                document.getElementById('mainImage').src = this.src;
            });
        });
    }
});

function showMainContent() {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('productDetailsContainer').style.display = 'none';
}

function selectSize(button) {
    document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function selectColor(button) {
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}