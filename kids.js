document.addEventListener('DOMContentLoaded', function() {
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each shoe
    const shoesData = {
        1: {
            name: "NIKE REVOLUTION 7",
            price: "Rs.3,317",
            images: ["s-k-1.jpg", "s-k-1-2.jpg", "s-k-1-3.jpg", "s-k-1-4.jpg"],
            description: "Keep your little one comfortable and stylish with the Nike Revolution 7. Perfect for everyday wear and active play."
        },
        2: {
            name: "NIKE BLAZOR LOW'77",
            price: "Rs.3,797",
            images: ["s-k-2.jpg", "s-k-2-2.jpg", "s-k-2-3.jpg", "s-k-2-4.jpg"],
            description: "Classic style meets modern comfort in the Nike Blazor Low'77 for kids. A versatile shoe for various occasions."
        },
        3: {
            name: "NIKE FLEX RUNNER",
            price: "Rs.3,127",
            images: ["s-k-3.jpg", "s-k-3-2.jpg", "s-k-3-3.jpg", "s-k-3-4.jpg"],
            description: "Let your child run and play with ease in the Nike Flex Runner. Designed for flexibility and all-day comfort."
        },
        4: {
            name: "NIKE DUNK LOW",
            price: "Rs.5,697",
            images: ["s-k-4.jpg", "s-k-4-2.jpg", "s-k-4-3.jpg", "s-k-4-4.jpg"],
            description: "Bring street style to your kid's wardrobe with the Nike Dunk Low. A trendy and comfortable choice for young fashion enthusiasts."
        },
        5: {
            name: "NIKE AQUA SWOOSH",
            price: "Rs.3,417",
            images: ["s-k-5.jpg", "s-k-5-2.jpg", "s-k-5-3.jpg", "s-k-5-4.jpg"],
            description: "Make a splash with the Nike Aqua Swoosh. Perfect for water activities and summer fun."
        },
        6: {
            name: "NIKE COURT BOROUGH LOW RECRAFT",
            price: "Rs.3,607",
            images: ["s-k-6.jpg", "s-k-6-2.jpg", "s-k-6-3.jpg", "s-k-6-4.jpg"],
            description: "Classic court style reimagined for kids in the Nike Court Borough Low Recraft. Durable and stylish for everyday wear."
        },
        7: {
            name: "NIKE 3 RETRO'GREEN GLOW'",
            price: "Rs.6,357",
            images: ["s-k-7.jpg", "s-k-7-2.jpg", "s-k-7-3.jpg", "s-k-7-4.jpg"],
            description: "Light up their style with the Nike 3 Retro'Green Glow'. A eye-catching design for young trendsetters."
        },
        8: {
            name: "NIKE CORTEZ BASIC SL",
            price: "Rs.3,797",
            images: ["s-k-8.jpg", "s-k-8-2.jpg", "s-k-8-3.jpg", "s-k-8-4.jpg"],
            description: "Timeless style for the younger generation with the Nike Cortez Basic SL. Comfortable and durable for active kids."
        },
        9: {
            name: "NIKE FORCE 1 COT",
            price: "Rs.2,847",
            images: ["s-k-9.jpg", "s-k-9-2.jpg", "s-k-9-3.jpg", "s-k-9-4.jpg"],
            description: "Start them young with the Nike Force 1 COT. A miniature version of the iconic Air Force 1 for your little one."
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

    // Add a back button or close button to return to the main content
    productDetailsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('back-button')) {
            showMainContent();
        }
    });

    function showMainContent() {
        mainContent.style.display = 'block';
        productDetailsContainer.style.display = 'none';
    }
});

function selectSize(button) {
    document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function selectColor(button) {
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}