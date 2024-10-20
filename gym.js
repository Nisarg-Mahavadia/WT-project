document.addEventListener('DOMContentLoaded', function() {
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each shoe
    const shoesData = {
        1: {
            name: "NIKE AIR MONARCH 4",
            price: "Rs.5,027",
            images: ["g-1.jpg", "g-1-2.jpg", "g-1-3.jpg", "g-1-4.jpg"],
            description: "The Nike Air Monarch 4 is a classic training shoe designed for comfort and durability."
        },
        2: {
            name: "NIKE AIR ZOOM TR 1",
            price: "Rs.10,257",
            images: ["g-2.jpg", "g-2-2.jpg", "g-2-3.jpg", "g-2-4.jpg"],
            description: "Experience responsive cushioning and stability with the Nike Air Zoom TR 1."
        },
        3: {
            name: "NIKE VERSAIR",
            price: "Rs.11,895",
            images: ["g-3.jpg", "g-3-2.jpg", "g-3-3.jpg", "g-3-4.jpg"],
            description: "The Nike Versair offers versatile performance for various training activities."
        },
        4: {
            name: "NIKE METCON 9",
            price: "Rs.12,157",
            images: ["g-4.jpg", "g-4-2.jpg", "g-4-3.jpg", "g-4-4.jpg"],
            description: "Built for high-intensity training, the Nike Metcon 9 provides stability and durability."
        },
        5: {
            name: "NIKE METCON 9 AMP",
            price: "Rs.12,157",
            images: ["g-5.jpg", "g-5-2.jpg", "g-5-3.jpg", "g-5-4.jpg"],
            description: "The Nike Metcon 9 AMP offers enhanced performance features for serious athletes."
        },
        6: {
            name: "NIKE FREE METCON 5",
            price: "Rs.10,257",
            images: ["g-11.jpg", "g-6-2.jpg", "g-6-3.jpg", "g-6-4.jpg"],
            description: "Combining flexibility and stability, the Nike Free Metcon 5 is perfect for varied workouts."
        }
    };

    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            loadProductDetails(productId);
            // Push a new state to the history
            history.pushState({page: 'product', id: productId}, '',`#product-${productId}`);
        });
    });

    function loadProductDetails(productId) {
        const shoe = shoesData[productId];
        if (!shoe) {
            console.error('Shoe data not found for ID:', productId);
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
                            <button class="size-option">7</button>
                            <button class="size-option">8</button>
                            <button class="size-option">9</button>
                            <button class="size-option">10</button>
                            <button class="size-option">11</button>
                        </div>
                        <h3>Color:</h3>
                        <div class="color-selector">
                            <button class="color-option" style="background-color: black;"></button>
                            <button class="color-option" style="background-color: white;"></button>
                            <button class="color-option" style="background-color: red;"></button>
                            <button class="color-option" style="background-color: blue;"></button>
                        </div>
                        <p>${shoe.description}</p>
                    </div>
                    <button class="buy-button">Buy Now</button>
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

        // Add event listeners to size and color options
        document.querySelectorAll('.size-option').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        document.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }

    function showMainContent() {
        mainContent.style.display = 'block';
        productDetailsContainer.style.display = 'none';
    }

    // Handle the popstate event
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page === 'product') {
            loadProductDetails(event.state.id);
        } else {
            showMainContent();
        }
    });

    // Ensure the initial state is set
    if (!history.state) {
        history.replaceState({page: 'main'}, '', '');
    }
});
