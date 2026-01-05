// Admin Management System
class AdminManager {
    constructor() {
        this.currentAdminTab = 'overview';
        this.bindAdminEvents();
    }

    bindAdminEvents() {
        // Admin tab switching will be handled by global function
    }

    isAdmin() {
        return app.currentUser && app.currentUser.email === 'admin@fashionstore.com';
    }

    showAdminDashboard() {
        if (!this.isAdmin()) {
            app.showMessage('Bạn không có quyền truy cập trang quản trị!', 'error');
            showSection('home');
            return;
        }

        this.updateOverviewStats();
        this.displayAdminProducts();
        this.displayAdminOrders();
        this.displayAdminUsers();
        this.displayAdminNews();
        this.displayAdminCategories();
    }

    updateOverviewStats() {
        // Users count
        const users = JSON.parse(localStorage.getItem('fashionstore_users') || '[]');
        const totalUsersEl = document.getElementById('total-users-stat');
        if (totalUsersEl) totalUsersEl.textContent = users.length;

        // Products count
        const totalProductsEl = document.getElementById('total-products-stat');
        if (totalProductsEl) totalProductsEl.textContent = app.products.length;

        // Orders count
        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
        const totalOrdersEl = document.getElementById('total-orders-stat');
        if (totalOrdersEl) totalOrdersEl.textContent = orders.length;

        // Revenue
        const totalRevenue = orders.reduce((sum, order) => sum + order.totals.total, 0);
        const totalRevenueEl = document.getElementById('total-revenue-stat');
        if (totalRevenueEl) totalRevenueEl.textContent = app.formatPrice(totalRevenue);
    }

    displayAdminProducts() {
        const container = document.getElementById('admin-products-table');
        if (!container) return;

        container.innerHTML = `
            <div class="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Danh mục</th>
                            <th>Giá</th>
                            <th>Nổi bật</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${app.products.map(product => `
                            <tr>
                                <td>${product.id}</td>
                                <td>${product.name}</td>
                                <td>${this.getCategoryName(product.category)}</td>
                                <td>${app.formatPrice(product.price)}</td>
                                <td>${product.featured ? 'Có' : 'Không'}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn-view" onclick="adminManager.viewProduct(${product.id})">Xem</button>
                                        <button class="btn-edit" onclick="adminManager.editProduct(${product.id})">Sửa</button>
                                        <button class="btn-delete" onclick="adminManager.deleteProduct(${product.id})">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    displayAdminOrders() {
        const container = document.getElementById('admin-orders-table');
        if (!container) return;

        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');

        container.innerHTML = `
            <div class="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Khách hàng</th>
                            <th>Ngày đặt</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr>
                                <td>${order.id}</td>
                                <td>${order.customer.name}</td>
                                <td>${this.formatDate(order.createdAt)}</td>
                                <td>${app.formatPrice(order.totals.total)}</td>
                                <td>
                                    <select onchange="adminManager.updateOrderStatus('${order.id}', this.value)">
                                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Chờ xác nhận</option>
                                        <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Đã xác nhận</option>
                                        <option value="shipping" ${order.status === 'shipping' ? 'selected' : ''}>Đang giao hàng</option>
                                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Hoàn thành</option>
                                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
                                    </select>
                                </td>
                                <td>
                                    <button class="btn-view" onclick="adminManager.viewOrder('${order.id}')">Xem chi tiết</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    displayAdminUsers() {
        const container = document.getElementById('admin-users-table');
        if (!container) return;

        const users = JSON.parse(localStorage.getItem('fashionstore_users') || '[]');

        container.innerHTML = `
            <div class="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Ngày đăng ký</th>
                            <th>Số đơn hàng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => {
                            const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
                            const userOrderCount = orders.filter(order => order.customer.id === user.id).length;
                            
                            return `
                                <tr>
                                    <td>${user.id}</td>
                                    <td>${user.fullname}</td>
                                    <td>${user.email}</td>
                                    <td>${this.formatDate(user.createdAt)}</td>
                                    <td>${userOrderCount}</td>
                                    <td>
                                        <button class="btn-view" onclick="adminManager.viewUser(${user.id})">Xem chi tiết</button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    displayAdminNews() {
        const container = document.getElementById('admin-news-table');
        if (!container) return;

        container.innerHTML = `
            <div class="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Loại</th>
                            <th>Ngày đăng</th>
                            <th>Lượt xem</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${newsManager.getAllNews().map(news => `
                            <tr>
                                <td>${news.id}</td>
                                <td>${news.title}</td>
                                <td>${news.type === 'promotion' ? 'Khuyến mãi' : 'Tin tức'}</td>
                                <td>${this.formatDate(news.publishedAt)}</td>
                                <td>${news.views || 0}</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn-view" onclick="adminManager.viewNews(${news.id})">Xem</button>
                                        <button class="btn-edit" onclick="adminManager.editNews(${news.id})">Sửa</button>
                                        <button class="btn-delete" onclick="adminManager.deleteNews(${news.id})">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    displayAdminCategories() {
        const container = document.getElementById('admin-categories-table');
        if (!container) return;

        const categories = [
            { id: 'ao-so-mi', name: 'Áo sơ mi' },
            { id: 'ao-thun', name: 'Áo thun' },
            { id: 'quan-jean', name: 'Quần jean' },
            { id: 'quan-tay', name: 'Quần tây' },
            { id: 'phu-kien', name: 'Phụ kiện' }
        ];

        container.innerHTML = `
            <div class="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên danh mục</th>
                            <th>Số sản phẩm</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${categories.map(category => {
                            const productCount = app.products.filter(p => p.category === category.id).length;
                            return `
                                <tr>
                                    <td>${category.id}</td>
                                    <td>${category.name}</td>
                                    <td>${productCount}</td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="btn-edit" onclick="adminManager.editCategory('${category.id}')">Sửa</button>
                                            <button class="btn-delete" onclick="adminManager.deleteCategory('${category.id}')">Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    updateOrderStatus(orderId, newStatus) {
        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
        const orderIndex = orders.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;
            orders[orderIndex].updatedAt = new Date().toISOString();
            localStorage.setItem('fashionstore_orders', JSON.stringify(orders));
            app.showMessage('Đã cập nhật trạng thái đơn hàng!', 'success');
        }
    }

    getCategoryName(categoryId) {
        const categories = {
            'ao-so-mi': 'Áo sơ mi',
            'ao-thun': 'Áo thun',
            'quan-jean': 'Quần jean',
            'quan-tay': 'Quần tây',
            'phu-kien': 'Phụ kiện'
        };
        return categories[categoryId] || categoryId;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }

    // Revenue statistics
    displayRevenueStats() {
        const container = document.getElementById('revenue-chart');
        if (!container) return;

        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
        const revenueByDate = this.calculateRevenueByDate(orders);

        container.innerHTML = `
            <h3>Doanh thu theo ngày</h3>
            <div class="chart-container">
                ${Object.entries(revenueByDate).map(([date, revenue]) => `
                    <div class="chart-bar">
                        <div class="chart-label">${date}</div>
                        <div class="chart-bar-fill" style="width: ${(revenue / Math.max(...Object.values(revenueByDate))) * 100}%">
                            ${app.formatPrice(revenue)}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    calculateRevenueByDate(orders) {
        const revenueByDate = {};
        
        orders.forEach(order => {
            const date = new Date(order.createdAt).toLocaleDateString('vi-VN');
            if (!revenueByDate[date]) {
                revenueByDate[date] = 0;
            }
            revenueByDate[date] += order.totals.total;
        });

        return revenueByDate;
    }

    // Placeholder methods for CRUD operations
    viewProduct(id) {
        const product = app.products.find(p => p.id === id);
        if (product) {
            app.showMessage(`Xem sản phẩm: ${product.name}`, 'success');
        }
    }

    editProduct(id) {
        app.showMessage('Chức năng chỉnh sửa sản phẩm đang được phát triển', 'error');
    }

    deleteProduct(id) {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            app.showMessage('Chức năng xóa sản phẩm đang được phát triển', 'error');
        }
    }

    viewOrder(id) {
        app.showMessage(`Xem chi tiết đơn hàng: ${id}`, 'success');
    }

    viewUser(id) {
        app.showMessage(`Xem thông tin người dùng ID: ${id}`, 'success');
    }

    viewNews(id) {
        showNewsDetail(id);
    }

    editNews(id) {
        app.showMessage('Chức năng chỉnh sửa tin tức đang được phát triển', 'error');
    }

    deleteNews(id) {
        if (confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
            newsManager.deleteNews(id);
            this.displayAdminNews();
            app.showMessage('Đã xóa tin tức!', 'success');
        }
    }

    editCategory(id) {
        app.showMessage('Chức năng chỉnh sửa danh mục đang được phát triển', 'error');
    }

    deleteCategory(id) {
        app.showMessage('Chức năng xóa danh mục đang được phát triển', 'error');
    }
}

// Global admin functions
function showAdminTab(tabName) {
    // Hide all admin tab contents
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    const targetTab = document.getElementById(`admin-${tabName}`);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Update tab buttons
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Load tab-specific data
    if (tabName === 'revenue') {
        adminManager.displayRevenueStats();
    }
}

function showAddProductForm() {
    app.showMessage('Chức năng thêm sản phẩm đang được phát triển', 'error');
}

function showAddCategoryForm() {
    app.showMessage('Chức năng thêm danh mục đang được phát triển', 'error');
}

function showAddNewsForm() {
    app.showMessage('Chức năng thêm tin tức đang được phát triển', 'error');
}

function updateRevenueChart() {
    adminManager.displayRevenueStats();
}

// AdminManager will be initialized from app.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.adminManager = new AdminManager();
// });