// Wishlist Management
class WishlistManager {
    constructor() {
        this.wishlist = [];
        this.loadWishlistFromStorage();
    }

    loadWishlistFromStorage() {
        const wishlistData = localStorage.getItem('fashionstore_wishlist');
        if (wishlistData) {
            this.wishlist = JSON.parse(wishlistData);
        }
    }

    saveWishlistToStorage() {
        localStorage.setItem('fashionstore_wishlist', JSON.stringify(this.wishlist));
    }

    addToWishlist(productId) {
        if (!app.currentUser) {
            app.showMessage('Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích!', 'error');
            showSection('login');
            return false;
        }

        const product = app.products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.wishlist.find(item => 
            item.productId === productId && item.userId === app.currentUser.id
        );

        if (existingItem) {
            app.showMessage('Sản phẩm đã có trong danh sách yêu thích!', 'error');
            return false;
        }

        this.wishlist.push({
            id: Date.now(),
            userId: app.currentUser.id,
            productId: productId,
            addedAt: new Date().toISOString()
        });

        this.saveWishlistToStorage();
        this.updateWishlistUI();
        app.showMessage('Đã thêm vào danh sách yêu thích!', 'success');
        return true;
    }

    removeFromWishlist(productId) {
        if (!app.currentUser) return false;

        this.wishlist = this.wishlist.filter(item => 
            !(item.productId === productId && item.userId === app.currentUser.id)
        );

        this.saveWishlistToStorage();
        this.updateWishlistUI();
        app.showMessage('Đã xóa khỏi danh sách yêu thích!', 'success');
        return true;
    }

    isInWishlist(productId) {
        if (!app.currentUser) return false;
        
        return this.wishlist.some(item => 
            item.productId === productId && item.userId === app.currentUser.id
        );
    }

    getUserWishlist() {
        if (!app.currentUser) return [];
        
        return this.wishlist.filter(item => item.userId === app.currentUser.id);
    }

    getWishlistProducts() {
        const userWishlist = this.getUserWishlist();
        return userWishlist.map(item => {
            const product = app.products.find(p => p.id === item.productId);
            return product ? { ...product, wishlistId: item.id } : null;
        }).filter(Boolean);
    }

    updateWishlistUI() {
        this.displayWishlistProducts();
        this.updateWishlistButtons();
        this.updateWishlistCount();
    }

    displayWishlistProducts() {
        const wishlistGrid = document.getElementById('wishlist-grid');
        if (!wishlistGrid) return;

        const wishlistProducts = this.getWishlistProducts();

        if (wishlistProducts.length === 0) {
            wishlistGrid.innerHTML = `
                <div class="empty-wishlist">
                    <i class="fas fa-heart"></i>
                    <h3>Danh sách yêu thích trống</h3>
                    <p>Hãy thêm những sản phẩm bạn yêu thích</p>
                    <button onclick="showSection('products')" class="btn-primary">
                        Khám phá sản phẩm
                    </button>
                </div>
            `;
            return;
        }

        wishlistGrid.innerHTML = wishlistProducts.map(product => `
            <div class="product-card">
                <div class="product-image" onclick="showProductDetail(${product.id})">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\\"fas fa-tshirt\\"></i>';">
                </div>
                <div class="product-info">
                    <div class="product-name" onclick="showProductDetail(${product.id})">${product.name}</div>
                    <div class="product-price">${app.formatPrice(product.price)}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                        </button>
                        <button class="btn-wishlist active" onclick="wishlistManager.removeFromWishlist(${product.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateWishlistButtons() {
        // Update wishlist buttons on product cards
        document.querySelectorAll('.btn-wishlist').forEach(btn => {
            const productId = parseInt(btn.getAttribute('data-product-id'));
            if (productId && this.isInWishlist(productId)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="far fa-heart"></i>';
            }
        });
    }

    updateWishlistCount() {
        const wishlistCount = document.getElementById('wishlist-count');
        if (wishlistCount) {
            const count = this.getUserWishlist().length;
            wishlistCount.textContent = count;
            wishlistCount.style.display = count > 0 ? 'inline' : 'none';
        }
    }

    // Toggle wishlist status
    toggleWishlist(productId) {
        if (this.isInWishlist(productId)) {
            return this.removeFromWishlist(productId);
        } else {
            return this.addToWishlist(productId);
        }
    }

    // Clear user's wishlist
    clearWishlist() {
        if (!app.currentUser) return;

        this.wishlist = this.wishlist.filter(item => item.userId !== app.currentUser.id);
        this.saveWishlistToStorage();
        this.updateWishlistUI();
        app.showMessage('Đã xóa tất cả sản phẩm khỏi danh sách yêu thích!', 'success');
    }

    // Get wishlist statistics
    getWishlistStats() {
        const userWishlist = this.getUserWishlist();
        const products = this.getWishlistProducts();
        
        return {
            totalItems: userWishlist.length,
            totalValue: products.reduce((sum, product) => sum + product.price, 0),
            categories: this.getWishlistByCategory(products),
            recentlyAdded: userWishlist
                .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
                .slice(0, 5)
        };
    }

    getWishlistByCategory(products) {
        const categories = {};
        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = 0;
            }
            categories[product.category]++;
        });
        return categories;
    }
}

// WishlistManager will be initialized from app.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.wishlistManager = new WishlistManager();
// });