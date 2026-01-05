// Product Management Logic
class ProductManager {
    constructor() {
        this.products = [];
        this.categories = [
            { id: 'ao-so-mi', name: 'Áo sơ mi' },
            { id: 'ao-thun', name: 'Áo thun' },
            { id: 'quan-jean', name: 'Quần jean' },
            { id: 'quan-tay', name: 'Quần tây' },
            { id: 'phu-kien', name: 'Phụ kiện' }
        ];
        this.currentFilters = {
            category: '',
            priceRange: '',
            searchTerm: ''
        };
    }

    // Load products from app.js
    setProducts(products) {
        this.products = products;
    }

    // Get all products
    getAllProducts() {
        return this.products;
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Get products by category
    getProductsByCategory(category) {
        if (!category) return this.products;
        return this.products.filter(product => product.category === category);
    }

    // Get featured products
    getFeaturedProducts() {
        return this.products.filter(product => product.featured);
    }

    // Filter products by price range
    filterByPriceRange(products, priceRange) {
        if (!priceRange) return products;
        
        const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
        
        return products.filter(product => {
            if (max) {
                return product.price >= parseInt(min) && product.price <= parseInt(max);
            } else {
                return product.price >= parseInt(min);
            }
        });
    }

    // Search products by name or description
    searchProducts(products, searchTerm) {
        if (!searchTerm) return products;
        
        const term = searchTerm.toLowerCase();
        return products.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );
    }

    // Apply all filters
    getFilteredProducts() {
        let filteredProducts = this.products;

        // Filter by category
        if (this.currentFilters.category) {
            filteredProducts = this.getProductsByCategory(this.currentFilters.category);
        }

        // Filter by price range
        if (this.currentFilters.priceRange) {
            filteredProducts = this.filterByPriceRange(filteredProducts, this.currentFilters.priceRange);
        }

        // Filter by search term
        if (this.currentFilters.searchTerm) {
            filteredProducts = this.searchProducts(filteredProducts, this.currentFilters.searchTerm);
        }

        return filteredProducts;
    }

    // Update filters
    updateFilters(filters) {
        this.currentFilters = { ...this.currentFilters, ...filters };
        return this.getFilteredProducts();
    }

    // Sort products
    sortProducts(products, sortBy) {
        const sortedProducts = [...products];
        
        switch (sortBy) {
            case 'price-asc':
                return sortedProducts.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sortedProducts.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            case 'newest':
                return sortedProducts.sort((a, b) => b.id - a.id);
            default:
                return sortedProducts;
        }
    }

    // Get product recommendations based on current cart or viewed products
    getRecommendations(currentProductId = null, limit = 4) {
        let recommendations = [];
        
        if (currentProductId) {
            const currentProduct = this.getProductById(currentProductId);
            if (currentProduct) {
                // Recommend products from same category
                recommendations = this.getProductsByCategory(currentProduct.category)
                    .filter(p => p.id !== currentProductId);
            }
        }
        
        // If not enough recommendations, add featured products
        if (recommendations.length < limit) {
            const featured = this.getFeaturedProducts()
                .filter(p => !recommendations.find(r => r.id === p.id));
            recommendations = [...recommendations, ...featured];
        }
        
        // If still not enough, add random products
        if (recommendations.length < limit) {
            const remaining = this.products
                .filter(p => !recommendations.find(r => r.id === p.id))
                .sort(() => Math.random() - 0.5);
            recommendations = [...recommendations, ...remaining];
        }
        
        return recommendations.slice(0, limit);
    }

    // Get product statistics
    getProductStats() {
        const stats = {
            total: this.products.length,
            byCategory: {},
            priceRange: {
                min: Math.min(...this.products.map(p => p.price)),
                max: Math.max(...this.products.map(p => p.price)),
                average: this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length
            }
        };

        // Count products by category
        this.categories.forEach(category => {
            stats.byCategory[category.id] = this.getProductsByCategory(category.id).length;
        });

        return stats;
    }

    // Format price for display
    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    // Create product card HTML
    createProductCardHTML(product) {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <i class="fas fa-tshirt"></i>
                </div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${this.formatPrice(product.price)}</div>
                    <div class="product-description">${product.description}</div>
                    <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        `;
    }

    // Render products to container
    renderProducts(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>Không tìm thấy sản phẩm</h3>
                    <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => 
            this.createProductCardHTML(product)
        ).join('');
    }

    // Initialize product search functionality
    initializeSearch() {
        const searchInput = document.getElementById('product-search');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.currentFilters.searchTerm = e.target.value;
                    const filteredProducts = this.getFilteredProducts();
                    this.renderProducts(filteredProducts, 'products-grid');
                }, 300);
            });
        }
    }

    // Initialize sort functionality
    initializeSort() {
        const sortSelect = document.getElementById('sort-products');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                const filteredProducts = this.getFilteredProducts();
                const sortedProducts = this.sortProducts(filteredProducts, e.target.value);
                this.renderProducts(sortedProducts, 'products-grid');
            });
        }
    }
}

// ProductManager will be initialized from app.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.productManager = new ProductManager();
// });