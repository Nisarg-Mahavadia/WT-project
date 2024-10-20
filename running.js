document.addEventListener('DOMContentLoaded', function() {
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each shoe
    const shoesData = {
        1: {
            name: "NIKE PEGASUS 41'PREQUEL'",
            price: "Rs.11,895",
            images: ["r-1.jpg", "r-1-2.jpg", "r-1-3.jpg", "r-1-4.jpg"],
            description: "Experience responsive cushioning and stability with the Nike Pegasus 41'PREQUEL'."
        },
        2: {
            name: "NIKE AIR MAX DN",
            price: "Rs.13,995",
            images: ["r-2.jpg", "r-2-2.jpg", "r-2-3.jpg", "r-2-4.jpg"],
            description: "The Nike Air Max DN offers supreme comfort and style for your runs."
        },
        3: {
            name: "NIKE EAGLE",
            price: "Rs.14,995",
            images: ["r-3.jpg", "r-3-2.jpg", "r-3-3.jpg", "r-3-4.jpg"],
            description: "Soar through your runs with the lightweight and responsive Nike Eagle."
        },
        4: {
            name: "NIKE PEGASUS 41 GORE-TEX",
            price: "Rs.14,995",
            images: ["r-4.jpg", "r-4-2.jpg", "r-4-3.jpg", "r-4-4.jpg"],
            description: "All-weather running comfort with the Nike Pegasus 41 GORE-TEX."
        },
        5: {
            name: "NIKE STRUCTURE 25",
            price: "Rs.12,795",
            images: ["r-5.jpg", "r-5-2.jpg", "r-5-3.jpg", "r-5-4.jpg"],
            description: "Stable and supportive, the Nike Structure 25 is perfect for your daily runs."
        },
        6: {
            name: "NIKE WAFFLE DEBUT",
            price: "Rs.6,295",
            images: ["r-6.jpg", "r-6-2.jpg", "r-6-3.jpg", "r-6-4.jpg"],
            description: "Classic style meets modern comfort in the Nike Waffle Debut."
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
