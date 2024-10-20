document.addEventListener('DOMContentLoaded', function() {
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each basketball shoe
    const shoesData = {
        1: {
            name: "NIKE G.T CUT ACADEMY EP",
            price: "Rs.8,067",
            images: ["s-b-1.jpg", "s-b-1-2.jpg", "s-b-1-3.jpg", "s-b-1-4.jpg"],
            description: "Elevate your game with the Nike G.T Cut Academy EP. Designed for quick cuts and explosive movements on the court."
        },
        2: {
            name: "TATUM 2 'LEGACY'PF",
            price: "Rs.10,917",
            images: ["s-b-2.jpg", "s-b-2-2.jpg", "s-b-2-3.jpg", "s-b-2-4.jpg"],
            description: "Channel your inner Jayson Tatum with the Tatum 2 'Legacy' PF. Built for versatility and performance at the highest level."
        },
        3: {
            name: "KD17 EP",
            price: "Rs.13,297",
            images: ["s-b-3.jpg", "s-b-3-2.jpg", "s-b-3-3.jpg", "s-b-3-4.jpg"],
            description: "Experience unparalleled comfort and responsiveness with the KD17 EP. Designed in collaboration with Kevin Durant for elite performance."
        },
        4: {
            name: "GIANNIS IMMORTALITY 3 EP",
            price: "Rs.6,737",
            images: ["s-b-4.jpg", "s-b-4-2.jpg", "s-b-4-3.jpg", "s-b-4-4.jpg"],
            description: "Dominate the court like Giannis Antetokounmpo with the Immortality 3 EP. Built for power, speed, and agility."
        },
        5: {
            name: "NIKE FLYBY MID 3",
            price: "Rs.4,474",
            images: ["s-b-5.jpg", "s-b-5-2.jpg", "s-b-5-3.jpg", "s-b-5-4.jpg"],
            description: "Get airborne with the Nike Flyby Mid 3. Perfect for players looking for a balance of support and lightweight performance."
        },
        6: {
            name: "NIKE G.T CUT 3",
            price: "Rs.6,647",
            images: ["s-b-6.jpg", "s-b-6-2.jpg", "s-b-6-3.jpg", "s-b-6-4.jpg"],
            description: "Take your game to the next level with the Nike G.T Cut 3. Engineered for elite players who demand the best in cutting and responsiveness."
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