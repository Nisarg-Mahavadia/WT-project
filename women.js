document.addEventListener('DOMContentLoaded', function() {
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each shoe
    const shoesData = {
        1: {
            name: "AIR JORDAN 1 LOW",
            price: "Rs.7,877",
            images: ["s-w-1.jpg", "s-w-1-2.jpg", "s-w-1-3.jpg", "s-w-1-4.jpg"],
            description: "Classic style meets modern comfort in the Air Jordan 1 Low. Perfect for everyday wear and streetwear fashion."
        },
        2: {
            name: "NIKE BLAZER LOW PLATFORM",
            price: "Rs.7,787",
            images: ["s-w-2.jpg", "s-w-2-2.jpg", "s-w-2-3.jpg", "s-w-2-4.jpg"],
            description: "Elevate your style with the Nike Blazer Low Platform. A trendy twist on a classic silhouette for a bold look."
        },
        3: {
            name: "NIKE AIRFORCE 1'07 NEXT NATURE SE",
            price: "Rs.10,795",
            images: ["s-w-3.jpg", "s-w-3-2.jpg", "s-w-3-3.jpg", "s-w-3-4.jpg"],
            description: "Step into sustainability with the Nike Airforce 1'07 Next Nature SE. Iconic style meets eco-friendly materials."
        },
        4: {
            name: "NIKE DUNK LOW",
            price: "Rs.7,877",
            images: ["s-w-4.jpg", "s-w-4-2.jpg", "s-w-4-3.jpg", "s-w-4-4.jpg"],
            description: "Make a statement with the Nike Dunk Low. Versatile design for both casual wear and athletic style."
        },
        5: {
            name: "NIKE DUNK LOW LX",
            price: "Rs.11,297",
            images: ["s-w-5.jpg", "s-w-5-2.jpg", "s-w-5-3.jpg", "s-w-5-4.jpg"],
            description: "Luxurious comfort meets street-ready style in the Nike Dunk Low LX. Premium materials for an elevated look."
        },
        6: {
            name: "NIKE GO FLYEASY",
            price: "Rs.11,895",
            images: ["s-w-6.jpg", "s-w-6-2.jpg", "s-w-6-3.jpg", "s-w-6-4.jpg"],
            description: "Experience hands-free convenience with the Nike Go FlyEasy. Innovative design for effortless on and off."
        },
        7: {
            name: "NIKE DUNK LOW PREMIUM",
            price: "Rs.10,795",
            images: ["s-w-7.jpg", "s-w-7-2.jpg", "s-w-7-3.jpg", "s-w-7-4.jpg"],
            description: "Indulge in premium style with the Nike Dunk Low Premium. Superior materials and craftsmanship for discerning tastes."
        },
        8: {
            name: "NIKECOURT LEGACY CANVAS",
            price: "Rs.3,797",
            images: ["s-w-8.jpg", "s-w-8-2.jpg", "s-w-8-3.jpg", "s-w-8-4.jpg"],
            description: "Classic tennis-inspired style in the NikeCourt Legacy Canvas. Versatile and comfortable for everyday wear."
        },
        9: {
            name: "NIKE AIR FORCE 1 SHADOW",
            price: "Rs.11,895",
            images: ["s-w-9.jpg", "s-w-9-2.jpg", "s-w-9-3.jpg", "s-w-9-4.jpg"],
            description: "Double up on style with the Nike Air Force 1 Shadow. Layered design for a unique and eye-catching look."
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