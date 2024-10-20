document.addEventListener('DOMContentLoaded', function() {
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each shoe
    const shoesData = {
        1: {
            name: "NIKE AIR 180",
            price: "Rs.13,995",
            images: ["s-m-1.jpg", "s-m-1-2.jpg", "s-m-1-3.jpg", "s-m-1-4.jpg"],
            description: "Experience classic style with modern comfort in the Nike Air 180. Perfect for everyday wear and casual outings."
        },
        2: {
            name: "NIKE CORTEZ LEATHER",
            price: "Rs.7,117",
            images: ["s-m-2.jpg", "s-m-2-2.jpg", "s-m-2-3.jpg", "s-m-2-4.jpg"],
            description: "The iconic Nike Cortez Leather offers timeless design and superior comfort for all-day wear."
        },
        3: {
            name: "NIKE COURT SHOT",
            price: "Rs.6,295",
            images: ["s-m-3.jpg", "s-m-3-2.jpg", "s-m-3-3.jpg", "s-m-3-4.jpg"],
            description: "Dominate the court with the Nike Court Shot. Designed for optimal performance and style on and off the court."
        },
        4: {
            name: "NIKE DUNK LOW RETRO QUICKSTRIKE",
            price: "Rs.11,895",
            images: ["s-m-4.jpg", "s-m-4-2.jpg", "s-m-4-3.jpg", "s-m-4-4.jpg"],
            description: "Step out in style with the Nike Dunk Low Retro Quickstrike. A perfect blend of retro charm and modern flair."
        },
        5: {
            name: "NIKE SB ZOOM BLAZERLOW X DANCER SKATEBOARDS",
            price: "Rs.9,695",
            images: ["s-m-5.jpg", "s-m-5-2.jpg", "s-m-5-3.jpg", "s-m-5-4.jpg"],
            description: "Skate in style with the Nike SB Zoom Blazerlow X Dancer Skateboards. Engineered for performance and durability."
        },
        6: {
            name: "NIKE JORDAN MULE",
            price: "Rs.8,695",
            images: ["s-m-6.jpg", "s-m-6-2.jpg", "s-m-6-3.jpg", "s-m-6-4.jpg"],
            description: "Slip into comfort with the Nike Jordan Mule. Perfect for relaxation and easy-going style."
        },
        7: {
            name: "NIKE STRUCTURE 25",
            price: "Rs.12,795",
            images: ["s-m-7.jpg", "s-m-7-2.jpg", "s-m-7-3.jpg", "s-m-7-4.jpg"],
            description: "Run with confidence in the Nike Structure 25. Designed for stability and support during your runs."
        },
        8: {
            name: "NIKE AIR TERRA HUMARA SP",
            price: "Rs.12,795",
            images: ["s-m-8.jpg", "s-m-8-2.jpg", "s-m-8-3.jpg", "s-m-8-4.jpg"],
            description: "Conquer any terrain with the Nike Air Terra Humara SP. Built for adventure and all-day comfort."
        },
        9: {
            name: "JA 2 EP OG RETRO",
            price: "Rs.10,795",
            images: ["s-m-9.jpg", "s-m-9-2.jpg", "s-m-9-3.jpg", "s-m-9-4.jpg"],
            description: "Relive the glory days with the JA 2 EP OG Retro. A classic design with modern performance features."
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