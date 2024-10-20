document.addEventListener('DOMContentLoaded', function() {
    // Product slider functionality
    const sliders = document.querySelectorAll('.image-scroller');

    sliders.forEach(slider => {
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
    });

    // Product details functionality
    const productLinks = document.querySelectorAll('.product-link');
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    const mainContent = document.getElementById('mainContent');

    // Data for each shoe
    const shoesData = {
        1: {
            name: "Air Jordan 1 Low Alternate Royal Toe",
            price: "Rs.8,630",
            images: ["c-j-1.jpg", "c-j-1-2.jpg", "c-j-1-3.jpg", "c-j-1-4.jpg"],
            description: "Classic Air Jordan 1 Low with a Royal Blue and Black colorway, perfect for casual wear and basketball enthusiasts."
        },
        2: {
            name: "Air Jordan 1 Retro Low OG SP Travis Scott Canary (W)",
            price: "Rs.26,963",
            images: ["c-j-2.jpg", "c-j-2-2.jpg", "c-j-2-3.jpg", "c-j-2-4.jpg"],
            description: "Collaboration between Travis Scott and Jordan Brand, featuring unique design elements and premium materials."
        },
        3: {
            name: "Air Jordan 1 Low Panda (W)",
            price: "Rs.8,255",
            images: ["c-j-3.jpg", "c-j-3-2.jpg", "c-j-3-3.jpg", "c-j-3-4.jpg"],
            description: "Sleek black and white colorway inspired by the panda, offering a versatile look for any outfit."
        },
        4: {
            name: "Air Jordan 1 low wolf grey",
            price: "Rs.7,755",
            images: ["c-j-4.jpg", "c-j-4-2.jpg", "c-j-4-3.jpg", "c-j-4-4.jpg"],
            description: "Subtle wolf grey colorway on the iconic Air Jordan 1 Low silhouette, perfect for everyday wear."
        },
        5: {
            name: "Air Jordan 1 High OG",
            price: "Rs.11,939",
            images: ["c-j-5.jpg", "c-j-5-2.jpg", "c-j-5-3.jpg", "c-j-5-4.jpg"],
            description: "The original high-top Air Jordan 1, featuring classic colorways and premium construction."
        },
        6: {
            name: "NIKE V2K",
            price: "Rs.10,725",
            images: ["c-v-1.jpg", "c-v-1-2.jpg", "c-v-1-3.jpg", "c-v-1-4.jpg"],
            description: "Modern interpretation of Y2K aesthetics, featuring bold designs and chunky soles."
        },
        7: {
            name: "NIKE V2K DESSERT",
            price: "Rs.11,725",
            images: ["c-v-2.jpg", "c-v-2-2.jpg", "c-v-2-3.jpg", "c-v-2-4.jpg"],
            description: "A sweet twist on the V2K line, inspired by dessert colors and textures."
        },
        8: {
            name: "NIKE V2K LIMITED",
            price: "Rs.15,652",
            images: ["c-v-3.jpg", "c-v-3-2.jpg", "c-v-3-3.jpg", "c-v-3-4.jpg"],
            description: "Limited edition V2K sneakers with exclusive colorways and premium materials."
        },
        9: {
            name: "NIKE V2K DARK",
            price: "Rs.12,151",
            images: ["c-v-4.jpg", "c-v-4-2.jpg", "c-v-4-3.jpg", "c-v-4-4.jpg"],
            description: "A sleek, dark version of the V2K line, perfect for nighttime urban adventures."
        },
        10: {
            name: "NIKE V2K OG",
            price: "Rs.13,156",
            images: ["c-v-5.jpg", "c-v-5-2.jpg", "c-v-5-3.jpg", "c-v-5-4.jpg"],
            description: "The original V2K design, featuring classic Y2K-inspired elements and comfortable cushioning."
        },
        11: {
            name: "AIR MAX 1 PATTA",
            price: "Rs.19,849",
            images: ["c-a-1.jpg", "c-a-1-2.jpg", "c-a-1-3.jpg", "c-a-1-4.jpg"],
            description: "Collaboration between Nike and Patta, featuring unique wave-inspired design elements on the classic Air Max 1 silhouette."
        },
        12: {
            name: "AIR MAX 90 INFRARED",
            price: "Rs.15,986",
            images: ["c-a-2.jpg", "c-a-2-2.jpg", "c-a-2-3.jpg", "c-a-2-4.jpg"],
            description: "Iconic Air Max 90 featuring the classic Infrared colorway, a staple in sneaker culture."
        },
        13: {
            name: "AIR MAX 1 86 ORIGINAL BIG BUBBLE",
            price: "Rs.11,549",
            images: ["c-a-3.jpg", "c-a-3-2.jpg", "c-a-3-3.jpg", "c-a-3-4.jpg"],
            description: "Retro-inspired Air Max 1 with the original 'Big Bubble' Air unit, offering classic style and comfort."
        },
        14: {
            name: "AIR MAX 1 90 OFF-BLACK",
            price: "Rs.52,104",
            images: ["c-a-4.jpg", "c-a-4-2.jpg", "c-a-4-3.jpg", "c-a-4-4.jpg"],
            description: "Limited edition Air Max 90 featuring an off-black colorway and premium materials."
        },
        15: {
            name: "AIR MAX 1 90 OFF-WHITE DESERT ORE",
            price: "Rs.2,159",
            images: ["c-a-5.jpg", "c-a-5-2.jpg", "c-a-5-3.jpg", "c-a-5-4.jpg"],
            description: "Collaboration between Nike and Off-White, featuring deconstructed design elements and a desert ore colorway."
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