document.addEventListener('DOMContentLoaded', function() {
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each shoe
    const shoesData = {
        1: {
            name: "COURT VISION LOW NEXT NATURE",
            price: "Rs.4,995",
            images: ["s-ms-1.jpg", "s-ms-1-2.jpg", "s-ms-1-3.jpg", "s-ms-1-4.jpg"],
            description: "A classic basketball-inspired design with a focus on sustainability. Made with at least 20% recycled material by weight, these shoes offer comfort and style with a reduced environmental impact."
        },
        2: {
            name: "JUMPMAN MVP",
            price: "Rs.14,527",
            images: ["s-ms-2.jpg", "s-ms-2-2.jpg", "s-ms-2-3.jpg", "s-ms-2-4.jpg"],
            description: "Inspired by Michael Jordan's legendary career, the Jumpman MVP combines performance and style. Features advanced cushioning technology for superior comfort on and off the court."
        },
        3: {
            name: "NIKE COURT VISION LOW NEXT NATURE",
            price: "Rs.16,171",
            images: ["s-ms-3.jpg", "s-ms-3-2.jpg", "s-ms-3-3.jpg", "s-ms-3-4.jpg"],
            description: "An eco-friendly take on the classic court shoe. Made with sustainable materials, it offers a clean, classic look with modern comfort and a reduced environmental footprint."
        },
        4: {
            name: "NIKE AIR MAX ISHOD",
            price: "Rs.9,207",
            images: ["s-ms-4.jpg", "s-ms-4-2.jpg", "s-ms-4-3.jpg", "s-ms-4-4.jpg"],
            description: "Designed in collaboration with pro skater Ishod Wair, these shoes blend skate performance with Air Max comfort. Perfect for skateboarding or casual wear."
        },
        5: {
            name: "NIKE DUNK LOW RETRO",
            price: "Rs.8,695",
            images: ["s-ms-5.jpg", "s-ms-5-2.jpg", "s-ms-5-3.jpg", "s-ms-5-4.jpg"],
            description: "A timeless classic returns. The Nike Dunk Low Retro brings back the iconic design from the 80s, offering vintage style with modern comfort."
        },
        6: {
            name: "NIKE REAX 8 TR",
            price: "Rs.7,117",
            images: ["s-ms-6.jpg", "s-ms-6-2.jpg", "s-ms-6-3.jpg", "s-ms-6-4.jpg"],
            description: "Built for intense training sessions, the Reax 8 TR offers stability and cushioning. Features Reax technology in the heel for responsive shock absorption."
        },
        7: {
            name: "AIR 1 OG LOW 'SHADOW'",
            price: "Rs.12,157",
            images: ["s-ms-7.jpg", "s-ms-7-2.jpg", "s-ms-7-3.jpg", "s-ms-7-4.jpg"],
            description: "A low-top version of the iconic Air Jordan 1, featuring a sleek 'Shadow' colorway. Combines style and comfort for everyday wear."
        },
        8: {
            name: "AIR JORDAN 1 RETRO HIGH OG",
            price: "Rs.16,147",
            images: ["s-ms-8.jpg", "s-ms-8-2.jpg", "s-ms-8-3.jpg", "s-ms-8-4.jpg"],
            description: "The shoe that started it all. This retro edition of the Air Jordan 1 High brings back the classic design that revolutionized basketball footwear."
        },
        9: {
            name: "NIKE MOTIVA",
            price: "Rs.9,695",
            images: ["s-ms-9.jpg", "s-ms-9-2.jpg", "s-ms-9-3.jpg", "s-ms-9-4.jpg"],
            description: "Designed for all-day comfort, the Nike Motiva features extra cushioning and support. Perfect for long walks or standing for extended periods."
        }
    };

    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            loadProductDetails(productId);
            history.pushState({page: 'product', id: productId}, '',`#product-${productId}`);
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

function selectSize(button) {
    document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function selectColor(button) {
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}