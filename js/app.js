// Main Application Logic
class FashionStore {
    constructor() {
        this.currentUser = null;
        this.cart = [];
        this.products = [];
        this.isUpdatingCart = false; // Flag để tránh vòng lặp
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.loadCartFromStorage();
        this.loadProducts();
        this.updateUI();
        this.bindEvents();
    }

    loadUserFromStorage() {
        const userData = localStorage.getItem('fashionstore_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    loadCartFromStorage() {
        const cartData = localStorage.getItem('fashionstore_cart');
        if (cartData) {
            this.cart = JSON.parse(cartData);
        }
    }

    saveUserToStorage() {
        if (this.currentUser) {
            localStorage.setItem('fashionstore_user', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('fashionstore_user');
        }
    }

    saveCartToStorage() {
        localStorage.setItem('fashionstore_cart', JSON.stringify(this.cart));
    }

    loadProducts() {
        // Sample product data - dựa trên hình ảnh có sẵn trong thư mục images
        this.products = [
            // Áo sơ mi
            {
                id: 1,
                name: "Áo Sơ Mi Classic Trắng",
                price: 450000,
                category: "ao-so-mi",
                description: "Áo sơ mi trắng cao cấp, chất liệu cotton 100%, phù hợp công sở",
                image: "images/ao-somi-1.jpg",
                featured: true,
                rating: 4.5,
                reviews: 128,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 2,
                name: "Áo Sơ Mi Đen Sang Trọng",
                price: 480000,
                category: "ao-so-mi",
                description: "Áo sơ mi đen lịch lãm, thiết kế hiện đại cho phái mạnh",
                image: "images/ao-somi-1-den.jpg",
                featured: false,
                rating: 4.3,
                reviews: 95,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 3,
                name: "Áo Sơ Mi Xanh Dương",
                price: 460000,
                category: "ao-so-mi",
                description: "Áo sơ mi xanh dương thanh lịch, chất liệu thoáng mát",
                image: "images/ao-somi-1-xanh.webp",
                featured: true,
                rating: 4.6,
                reviews: 87,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 4,
                name: "Áo Thun Thể Thao Xanh Đậm",
                price: 520000,
                category: "ao-so-mi",
                description: "Áo thun thể thao xanh đậm, chất liệu thoáng mát, phù hợp tập luyện",
                image: "images/ao-somi-2-xanhdam.jpg",
                featured: false,
                rating: 4.4,
                reviews: 76,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 5,
                name: "Áo Thun Thể Thao Xanh Rêu",
                price: 510000,
                category: "ao-so-mi",
                description: "Áo thun thể thao xanh rêu, chất liệu co giãn, thoải mái vận động",
                image: "images/ao-somi-2-xanhreu.jpg",
                featured: false,
                rating: 4.2,
                reviews: 64,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 6,
                name: "Áo Sơ Mi Formal Trắng",
                price: 580000,
                category: "ao-so-mi",
                description: "Áo sơ mi formal trắng cao cấp, thiết kế chuẩn công sở",
                image: "images/ao-somi-3-trang.jpg",
                featured: true,
                rating: 4.7,
                reviews: 142,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 7,
                name: "Áo Sơ Mi Business Đen",
                price: 590000,
                category: "ao-so-mi",
                description: "Áo sơ mi business đen, phong cách doanh nhân thành đạt",
                image: "images/ao-somi-4-den.jpg",
                featured: false,
                rating: 4.5,
                reviews: 98,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },

            // Áo khoác & Hoodie
            {
                id: 8,
                name: "Áo Hoodie Đen Basic",
                price: 650000,
                category: "ao-thun",
                description: "Áo hoodie đen basic, chất liệu nỉ cao cấp, ấm áp và thoải mái",
                image: "images/ao-hoodie-1-den.jpg",
                featured: true,
                rating: 4.6,
                reviews: 156,
                sizes: ["S", "M", "L", "XL", "XXL"],
                inStock: true
            },
            {
                id: 9,
                name: "Áo Hoodie Xám Melange",
                price: 650000,
                category: "ao-thun",
                description: "Áo hoodie xám melange, thiết kế trẻ trung, phù hợp mọi hoạt động",
                image: "images/ao-hoodie-1-xam.jpg",
                featured: false,
                rating: 4.4,
                reviews: 123,
                sizes: ["S", "M", "L", "XL", "XXL"],
                inStock: true
            },
            {
                id: 10,
                name: "Áo Khoác Bomber Đen",
                price: 890000,
                category: "ao-thun",
                description: "Áo khoác bomber đen phong cách street style, chất liệu cao cấp",
                image: "images/ao-khoac-2-den.jpg",
                featured: true,
                rating: 4.8,
                reviews: 89,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 11,
                name: "Áo Khoác Windbreaker Trắng",
                price: 850000,
                category: "ao-thun",
                description: "Áo khoác windbreaker trắng, chống gió nhẹ, phù hợp thể thao",
                image: "images/ao-khoac-2-trang.jpg",
                featured: false,
                rating: 4.3,
                reviews: 67,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 12,
                name: "Áo Khoác Denim Xanh Đậm",
                price: 920000,
                category: "ao-thun",
                description: "Áo khoác denim xanh đậm, phong cách vintage, bền đẹp theo thời gian",
                image: "images/ao-khoac-3-xanhdam.jpg",
                featured: true,
                rating: 4.7,
                reviews: 134,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },

            // Quần
            {
                id: 13,
                name: "Quần Tây Đen Công Sở",
                price: 680000,
                category: "quan-tay",
                description: "Quần tây đen công sở, form chuẩn, chất liệu cao cấp không nhăn",
                image: "images/quan-1-den.jpg",
                featured: true,
                rating: 4.5,
                reviews: 203,
                sizes: ["29", "30", "31", "32", "33", "34"],
                inStock: true
            },
            {
                id: 14,
                name: "Quần Tây Nâu Vintage",
                price: 720000,
                category: "quan-tay",
                description: "Quần tây nâu vintage, phong cách cổ điển, phù hợp nhiều dịp",
                image: "images/quan-1-nau.jpeg",
                featured: false,
                rating: 4.4,
                reviews: 87,
                sizes: ["29", "30", "31", "32", "33", "34"],
                inStock: true
            },
            {
                id: 15,
                name: "Quần Tây Xám Hiện Đại",
                price: 700000,
                category: "quan-tay",
                description: "Quần tây xám hiện đại, thiết kế slim fit, tôn dáng người mặc",
                image: "images/quan-1-xam.jpg",
                featured: false,
                rating: 4.6,
                reviews: 156,
                sizes: ["29", "30", "31", "32", "33", "34"],
                inStock: true
            },
            {
                id: 16,
                name: "Quần Jean Slim Fit",
                price: 750000,
                category: "quan-jean",
                description: "Quần jean slim fit, chất liệu denim cao cấp, form chuẩn Hàn Quốc",
                image: "images/quan-2.jpg",
                featured: true,
                rating: 4.7,
                reviews: 298,
                sizes: ["29", "30", "31", "32", "33", "34"],
                inStock: true
            },
            {
                id: 17,
                name: "Quần Jean Straight Fit",
                price: 780000,
                category: "quan-jean",
                description: "Quần jean straight fit cổ điển, phù hợp mọi vóc dáng",
                image: "images/quan-3.jpg",
                featured: false,
                rating: 4.5,
                reviews: 187,
                sizes: ["29", "30", "31", "32", "33", "34"],
                inStock: true
            },
            {
                id: 18,
                name: "Quần Thể Thao",
                price: 820000,
                category: "quan-jean",
                description: "Quần thể thao nam, chất liệu thoáng mát, co giãn tốt, phù hợp tập luyện",
                image: "images/quan-4.jpg",
                featured: false,
                rating: 4.3,
                reviews: 145,
                sizes: ["29", "30", "31", "32", "33"],
                inStock: true
            },

            // Phụ kiện
            {
                id: 19,
                name: "Thắt Lưng Da Cao Cấp",
                price: 450000,
                category: "phu-kien",
                description: "Thắt lưng da thật cao cấp, khóa kim loại sang trọng, bền đẹp",
                image: "images/that-lung-1.jpg",
                featured: true,
                rating: 4.8,
                reviews: 167,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 20,
                name: "Thắt Lưng Da Đen Premium",
                price: 520000,
                category: "phu-kien",
                description: "Thắt lưng da đen premium, thiết kế tối giản, phù hợp công sở",
                image: "images/that-lung-3-den.jpg",
                featured: false,
                rating: 4.6,
                reviews: 134,
                sizes: ["S", "M", "L", "XL"],
                inStock: true
            },
            {
                id: 21,
                name: "Balo Da Đen Công Sở",
                price: 1200000,
                category: "phu-kien",
                description: "Balo da đen công sở, thiết kế sang trọng, nhiều ngăn tiện dụng",
                image: "images/balo-1-den.jpg",
                featured: true,
                rating: 4.9,
                reviews: 89,
                sizes: ["One Size"],
                inStock: true
            },
            {
                id: 22,
                name: "Balo Canvas Xám",
                price: 980000,
                category: "phu-kien",
                description: "Balo canvas xám, phong cách casual, phù hợp đi học và đi làm",
                image: "images/balo-1-xam.jpg",
                featured: false,
                rating: 4.4,
                reviews: 76,
                sizes: ["One Size"],
                inStock: true
            },
            {
                id: 23,
                name: "Đồng Hồ Nam Classic",
                price: 2500000,
                category: "phu-kien",
                description: "Đồng hồ nam classic, mặt số đơn giản, dây da cao cấp",
                image: "images/dong-ho-1.jpg",
                featured: true,
                rating: 4.8,
                reviews: 234,
                sizes: ["One Size"],
                inStock: true
            },
            {
                id: 24,
                name: "Đồng Hồ Thể Thao Đen",
                price: 1800000,
                category: "phu-kien",
                description: "Đồng hồ thể thao đen, chống nước, phù hợp hoạt động ngoài trời",
                image: "images/dong-ho-4-den.jpg",
                featured: false,
                rating: 4.5,
                reviews: 156,
                sizes: ["One Size"],
                inStock: true
            },
            {
                id: 25,
                name: "Giày Tây Đen",
                price: 1500000,
                category: "phu-kien",
                description: "Giày tây đen, thiết kế hiện đại, đế êm ái thoải mái",
                image: "images/giay-1-den.jpg",
                featured: true,
                rating: 4.7,
                reviews: 298,
                sizes: ["39", "40", "41", "42", "43", "44"],
                inStock: true
            },
            {
                id: 26,
                name: "Giày Da Nâu Công Sở",
                price: 1800000,
                category: "phu-kien",
                description: "Giày da nâu công sở, chất liệu da thật, thiết kế lịch lãm",
                image: "images/giay-1-nau.jpg",
                featured: false,
                rating: 4.6,
                reviews: 187,
                sizes: ["39", "40", "41", "42", "43", "44"],
                inStock: true
            },
            {
                id: 27,
                name: "Giày Thể Thao Trắng",
                price: 1350000,
                category: "phu-kien",
                description: "Giày thể thao trắng, phong cách năng động, phù hợp mọi hoạt động",
                image: "images/giay-2.jpg",
                featured: false,
                rating: 4.4,
                reviews: 234,
                sizes: ["39", "40", "41", "42", "43", "44"],
                inStock: true
            },
            
            // Nón
            {
                id: 28,
                name: "Nón Snapback Đen",
                price: 350000,
                category: "phu-kien",
                description: "Nón snapback đen phong cách street style, chất liệu cotton cao cấp",
                image: "images/non-snapback-den.jpg",
                featured: true,
                rating: 4.5,
                reviews: 89,
                sizes: ["One Size"],
                inStock: true
            },

            // Ví
            {
                id: 29,
                name: "Ví Da Đen Cao Cấp",
                price: 680000,
                category: "phu-kien",
                description: "Ví da đen cao cấp, thiết kế sang trọng, nhiều ngăn tiện dụng",
                image: "images/vi-da-den.jpg",
                featured: true,
                rating: 4.8,
                reviews: 156,
                sizes: ["One Size"],
                inStock: true
            }
        ];
        
        this.displayProducts();
        this.displayFeaturedProducts();
    }

    displayProducts(productsToShow = null) {
        const products = productsToShow || this.products;
        const grid = document.getElementById('products-grid');
        
        if (!grid) return;

        grid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = this.createProductCard(product);
            grid.appendChild(productCard);
        });
    }

    displayFeaturedProducts() {
        const featuredProducts = this.products.filter(p => p.featured);
        const grid = document.getElementById('featured-grid');
        
        if (!grid) return;

        grid.innerHTML = '';
        
        featuredProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            grid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const isInWishlist = window.wishlistManager ? wishlistManager.isInWishlist(product.id) : false;
        
        card.innerHTML = `
            <div class="product-image" onclick="showProductDetail(${product.id})">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\"fas fa-tshirt\\"></i>';">
            </div>
            <div class="product-info">
                <div class="product-name" onclick="showProductDetail(${product.id})">${product.name}</div>
                <div class="product-price">${this.formatPrice(product.price)}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-rating">
                    <div class="stars">
                        ${this.generateStars(product.rating || 4.5)}
                    </div>
                    <span>(${product.reviews || 0} đánh giá)</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                    <button class="btn-wishlist ${isInWishlist ? 'active' : ''}" 
                            data-product-id="${product.id}"
                            onclick="wishlistManager.toggleWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    addToCart(productId, selectedSize = 'M') {
        if (!this.currentUser) {
            this.showMessage('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!', 'error');
            showSection('login');
            return;
        }

        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Tìm sản phẩm với cùng ID và size
        const existingItem = this.cart.find(item => item.id === productId && item.selectedSize === selectedSize);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                selectedSize: selectedSize
            });
        }

        this.saveCartToStorage();
        this.updateCartUI();
        this.showMessage(`Đã thêm ${product.name} (Size: ${selectedSize}) vào giỏ hàng!`, 'success');
    }

    updateCartUI() {
        if (this.isUpdatingCart) return; // Tránh vòng lặp
        this.isUpdatingCart = true;
        
        const cartCount = document.getElementById('cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCount) {
            cartCount.textContent = totalItems;
        }

        this.displayCartItems();
        this.isUpdatingCart = false;
    }

    displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Giỏ hàng trống</h3>
                    <p>Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                </div>
            `;
            cartTotal.innerHTML = '';
            checkoutBtn.style.display = 'none';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        this.cart.forEach(item => {
            total += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\"fas fa-tshirt\\"></i>';">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${this.formatPrice(item.price)}</div>
                    <div class="cart-item-size">Size: ${item.selectedSize || 'M'}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="app.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="app.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.innerHTML = `<h3>Tổng cộng: ${this.formatPrice(total)}</h3>`;
        checkoutBtn.style.display = 'block';
    }

    updateQuantity(productId, change) {
        // Tìm item đầu tiên với productId này (có thể có nhiều size khác nhau)
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId, item.selectedSize);
            return;
        }

        this.saveCartToStorage();
        this.updateCartUI();
    }

    removeFromCart(productId, selectedSize = null) {
        if (selectedSize) {
            // Xóa item cụ thể với size
            this.cart = this.cart.filter(item => !(item.id === productId && item.selectedSize === selectedSize));
        } else {
            // Xóa item đầu tiên với productId này
            const itemIndex = this.cart.findIndex(item => item.id === productId);
            if (itemIndex !== -1) {
                this.cart.splice(itemIndex, 1);
            }
        }
        this.saveCartToStorage();
        this.updateCartUI();
        this.showMessage('Đã xóa sản phẩm khỏi giỏ hàng!', 'success');
    }

    updateUI() {
        if (this.isUpdatingCart) return; // Tránh vòng lặp khi đang update cart
        
        const userMenu = document.getElementById('user-menu');
        const authButtons = document.getElementById('auth-buttons');
        const username = document.getElementById('username');
        const adminMenu = document.getElementById('admin-menu');

        if (this.currentUser) {
            userMenu.style.display = 'flex';
            authButtons.style.display = 'none';
            username.textContent = this.currentUser.fullname;

            // Show admin menu if user is admin
            if (adminMenu && this.currentUser.email === 'admin@fashionstore.com') {
                adminMenu.style.display = 'block';
            } else if (adminMenu) {
                adminMenu.style.display = 'none';
            }
        } else {
            userMenu.style.display = 'none';
            authButtons.style.display = 'flex';
            if (adminMenu) {
                adminMenu.style.display = 'none';
            }
        }

        this.updateCartUI();
        
        // Update wishlist UI if available
        // if (window.wishlistManager) {
        //     wishlistManager.updateWishlistUI();
        // }
    }

    showMessage(message, type = 'success') {
        // Tạo element thông báo
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Thêm vào đầu main content
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageDiv, mainContent.firstChild);

        // Tự động ẩn sau 3 giây
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    bindEvents() {
        // Bind form events sẽ được xử lý trong các file riêng biệt
    }
}

// Global functions
function addToCartWithSize(productId) {
    // Lấy size được chọn
    const selectedSizeBtn = document.querySelector('.option-btn.active');
    const selectedSize = selectedSizeBtn ? selectedSizeBtn.textContent : 'M';
    
    app.addToCart(productId, selectedSize);
}

function selectOption(button) {
    // Xóa active class từ tất cả buttons trong cùng group
    const group = button.parentElement;
    group.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Thêm active class cho button được chọn
    button.classList.add('active');
}

function toggleDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('show');
}

function closeDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.remove('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.getElementById('user-dropdown');
    
    if (dropdown && dropdownContent && !dropdown.contains(event.target)) {
        dropdownContent.classList.remove('show');
    }
});

function showSection(sectionId) {
    // Ẩn tất cả sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Hiển thị section được chọn
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Load section-specific data
    switch(sectionId) {
        case 'profile':
            if (window.profileManager) {
                profileManager.loadProfileData();
            }
            break;
        case 'wishlist':
            if (window.wishlistManager) {
                wishlistManager.displayWishlistProducts();
            }
            break;
        case 'order-history':
            if (window.profileManager) {
                profileManager.displayOrderHistory();
            }
            break;
        case 'admin-dashboard':
            if (window.adminManager) {
                adminManager.showAdminDashboard();
            }
            break;
        case 'news':
            if (window.newsManager) {
                newsManager.displayNews();
            }
            break;
    }
}

function filterByCategory(category) {
    // Chuyển đến trang sản phẩm
    showSection('products');
    
    // Đặt filter category
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        // Map các category từ footer sang category filter
        const categoryMap = {
            'ao-thun': 'ao-thun',
            'ao-khoac': 'ao-thun',
            'ao-so-mi': 'ao-so-mi',
            'quan-tay': 'quan-tay',
            'quan-short': 'quan-tay',
            'quan-jean': 'quan-jean',
            'quan-lot': 'quan-tay',
            'balo': 'phu-kien',
            'tui-deo': 'phu-kien',
            'non': 'phu-kien',
            'vi': 'phu-kien',
            'day-nit': 'phu-kien',
            'giay': 'phu-kien',
            'dep': 'phu-kien',
            'phu-kien-ca-nhan': 'phu-kien',
            'phu-kien-the-thao': 'phu-kien'
        };
        
        const mappedCategory = categoryMap[category] || category;
        categoryFilter.value = mappedCategory;
        
        // Trigger filter
        filterProducts();
    }
}

function showProductDetail(productId) {
    const product = app.products.find(p => p.id === productId);
    if (!product) return;

    const detailContent = document.getElementById('product-detail-content');
    if (!detailContent) return;

    const isInWishlist = window.wishlistManager ? wishlistManager.isInWishlist(productId) : false;

    detailContent.innerHTML = `
        <div class="product-detail-container">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\"fas fa-tshirt\\"></i>';">
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <div class="product-rating">
                    <div class="stars">${app.generateStars(product.rating || 4.5)}</div>
                    <span>(${product.reviews || 0} đánh giá)</span>
                </div>
                <div class="product-detail-price">${app.formatPrice(product.price)}</div>
                <div class="product-description">
                    <p>${product.description}</p>
                </div>
                
                <div class="product-options">
                    <div class="option-group">
                        <label>Kích thước:</label>
                        <div class="size-options">
                            ${(product.sizes || ['S', 'M', 'L', 'XL']).map(size => 
                                `<button class="option-btn" onclick="selectOption(this)">${size}</button>`
                            ).join('')}
                        </div>
                    </div>
                </div>

                <div class="product-actions">
                    <button class="btn-primary" onclick="addToCartWithSize(${productId})">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
                    </button>
                    <button class="btn-wishlist ${isInWishlist ? 'active' : ''}" 
                            onclick="wishlistManager.toggleWishlist(${productId})">
                        <i class="fas fa-heart"></i> ${isInWishlist ? 'Đã yêu thích' : 'Yêu thích'}
                    </button>
                </div>

                <div class="product-tabs">
                    <div class="tab-buttons">
                        <button class="tab-btn active" onclick="showProductTab('description')">Mô tả</button>
                        <button class="tab-btn" onclick="showProductTab('reviews')">Đánh giá</button>
                    </div>
                    <div id="tab-description" class="tab-content active">
                        <p>${product.description}</p>
                        <ul>
                            <li>Chất liệu cao cấp</li>
                            <li>Thiết kế hiện đại</li>
                            <li>Dễ dàng bảo quản</li>
                            <li>Phù hợp nhiều dịp</li>
                        </ul>
                    </div>
                    <div id="tab-reviews" class="tab-content">
                        <div class="reviews-list">
                            <div class="review-item">
                                <div class="review-header">
                                    <span class="review-author">Nguyễn Văn A</span>
                                    <span class="review-date">15/12/2024</span>
                                </div>
                                <div class="review-rating">${app.generateStars(5)}</div>
                                <p>Sản phẩm rất đẹp và chất lượng tốt. Tôi rất hài lòng với việc mua hàng này.</p>
                            </div>
                        </div>
                        <div class="review-form">
                            <h4>Viết đánh giá</h4>
                            <form>
                                <div class="form-group">
                                    <label>Đánh giá:</label>
                                    <div class="rating-input">
                                        ${[5,4,3,2,1].map(star => 
                                            `<input type="radio" name="rating" value="${star}" id="star${star}">
                                             <label for="star${star}"><i class="fas fa-star"></i></label>`
                                        ).join('')}
                                    </div>
                                </div>
                                <div class="form-group">
                                    <textarea placeholder="Nhận xét của bạn..." rows="4"></textarea>
                                </div>
                                <button type="submit" class="btn-primary">Gửi đánh giá</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    showSection('product-detail');
}

function showProductTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(`tab-${tabName}`).classList.add('active');
    event.target.classList.add('active');
}

function selectOption(button) {
    // Remove active class from siblings
    button.parentElement.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Add active class to clicked button
    button.classList.add('active');
}

function searchProducts() {
    const searchTerm = document.getElementById('product-search').value.trim();
    if (!searchTerm) {
        app.displayProducts();
        return;
    }

    const filteredProducts = app.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    app.displayProducts(filteredProducts);
}

function sortProducts() {
    const sortValue = document.getElementById('sort-filter').value;
    let sortedProducts = [...app.products];

    switch(sortValue) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating-desc':
            sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
    }

    app.displayProducts(sortedProducts);
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    
    let filteredProducts = app.products;
    
    // Lọc theo danh mục
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }
    
    // Lọc theo giá
    if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(p => p.replace('+', ''));
        filteredProducts = filteredProducts.filter(p => {
            if (max) {
                return p.price >= parseInt(min) && p.price <= parseInt(max);
            } else {
                return p.price >= parseInt(min);
            }
        });
    }
    
    app.displayProducts(filteredProducts);
}

// Hero Tabs Management
class HeroTabs {
    constructor() {
        this.currentTab = 0;
        this.totalTabs = 3;
        this.autoPlayInterval = 3000; // 3 seconds
        this.progressInterval = null;
        this.autoPlayTimer = null;
        this.isAutoPlaying = true;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.startAutoPlay();
    }

    bindEvents() {
        // Dot navigation clicks
        document.querySelectorAll('.hero-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToTab(index);
                this.pauseAutoPlay();
                // Resume autoplay after 10 seconds of inactivity
                setTimeout(() => {
                    if (!this.isAutoPlaying) {
                        this.startAutoPlay();
                    }
                }, 10000);
            });
        });

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                this.pauseAutoPlay();
            });

            heroSection.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }

    goToTab(index) {
        if (index === this.currentTab) return;

        // Update dots
        document.querySelectorAll('.hero-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Update slides
        document.querySelectorAll('.hero-slide').forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        this.currentTab = index;
        this.resetProgress();
    }

    nextTab() {
        const nextIndex = (this.currentTab + 1) % this.totalTabs;
        this.goToTab(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentTab - 1 + this.totalTabs) % this.totalTabs;
        this.goToTab(prevIndex);
        this.pauseAutoPlay();
        setTimeout(() => {
            if (!this.isAutoPlaying) {
                this.startAutoPlay();
            }
        }, 10000);
    }

    nextSlide() {
        this.nextTab();
        this.pauseAutoPlay();
        setTimeout(() => {
            if (!this.isAutoPlaying) {
                this.startAutoPlay();
            }
        }, 10000);
    }

    startAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
        }

        this.isAutoPlaying = true;
        this.startProgress();

        this.autoPlayTimer = setInterval(() => {
            this.nextTab();
        }, this.autoPlayInterval);
    }

    pauseAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }

        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }

        this.isAutoPlaying = false;
    }

    startProgress() {
        this.resetProgress();
        
        let progress = 0;
        const increment = 100 / (this.autoPlayInterval / 50); // Update every 50ms

        this.progressInterval = setInterval(() => {
            progress += increment;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(this.progressInterval);
            }

            const progressBar = document.querySelector('.progress-fill');
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }, 50);
    }

    resetProgress() {
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = '0%';
        }

        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }

        if (this.isAutoPlaying) {
            this.startProgress();
        }
    }

    destroy() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
        }
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    app = new FashionStore();
    
    // Initialize all managers
    window.authManager = new AuthManager();
    window.wishlistManager = new WishlistManager();
    window.newsManager = new NewsManager();
    window.profileManager = new ProfileManager();
    window.adminManager = new AdminManager();
    window.checkoutManager = new CheckoutManager();
    window.productManager = new ProductManager();
    
    // Initialize hero tabs if on home page
    const heroSection = document.querySelector('.hero-slider');
    if (heroSection) {
        window.heroTabs = new HeroTabs();
    }
    
    // Display initial news
    if (window.newsManager) {
        newsManager.displayNews();
    }
});

// Initialize hero tabs when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     // Only initialize if we're on the home page
//     const heroSection = document.querySelector('.hero-slider');
//     if (heroSection) {
//         window.heroTabs = new HeroTabs();
//     }
// });