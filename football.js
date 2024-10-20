document.addEventListener('DOMContentLoaded', function() {
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each shoe
    const shoesData = {
        1: {
            name: "NIKE MERCURIAL VAPOR 16 ELITE",
            price: "Rs.21,995",
            images: ["f-1.jpg", "f-1-2.jpg", "f-1-3.jpg", "f-1-4.jpg"],
            description: "Experience unparalleled speed and precision with the Nike Mercurial Vapor 16 Elite. Designed for the fastest players on the pitch."
        },
        2: {
            name: "NIKE MERCURIAL SUPERFLY 10 ACADEMY",
            price: "Rs.8,995",
            images: ["f-2.jpg", "f-2-2.jpg", "f-2-3.jpg", "f-2-4.jpg"],
            description: "Elevate your game with the Nike Mercurial Superfly 10 Academy. Perfect for players looking for a balance of speed and control."
        },
        3: {
            name: "NIKE TIEMPO LEGEND 10 CLUB",
            price: "Rs.4,995",
            images: ["f-3.jpg", "f-3-2.jpg", "f-3-3.jpg", "f-3-4.jpg"],
            description: "Classic style meets modern performance in the Nike Tiempo Legend 10 Club. Ideal for players who prioritize touch and comfort."
        },
        4: {
            name: "NIKE JR. MERCURIAL VAPOR 16 ACADEMY",
            price: "Rs.5,995",
            images: ["f-4.jpg", "f-4-2.jpg", "f-4-3.jpg", "f-4-4.jpg"],
            description: "Designed for young speedsters, the Nike Jr. Mercurial Vapor 16 Academy offers explosive acceleration and precise control."
        },
        5: {
            name: "NIKE MERCURIAL SUPERFLY 9 ELITE",
            price: "Rs.21,847",
            images: ["f-5.jpg", "f-6-2.jpg", "f-6-3.jpg", "f-6-4.jpg"],
            description: "Take your game to new heights with the Nike Mercurial Superfly 9 Elite. Engineered for speed and agility at the highest level."
        },
        6: {
            name: "NIKE PHANTOM GX2 ELITE",
            price: "Rs.21,995",
            images: ["f-6.jpg", "f-5-2.jpg", "f-5-3.jpg", "f-5-4.jpg"],
            description: "Unleash your creativity with the Nike Phantom GX2 Elite. Precision engineered for players who create chances and score goals."
        }
    };

    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            loadProductDetails(productId);
            history.pushState({page: 'product', id: productId}, '', `#product-${productId}`);
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
        mainContent.classList.add('hidden');
        productDetailsContainer.classList.remove('hidden');
    
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
    

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page === 'product') {
            loadProductDetails(event.state.id);
        } else {
            showMainContent();
        }
    });

    function showMainContent() {
        mainContent.classList.remove('hidden');
        productDetailsContainer.classList.add('hidden');
    }
});

// function changeMainImage(src) {
//     document.getElementById('mainImage').src = src;
// }

function selectSize(button) {
    document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function selectColor(button) {
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

