// Profile Management
class ProfileManager {
    constructor() {
        this.bindProfileEvents();
    }

    bindProfileEvents() {
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile();
            });
        }

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitContactForm();
            });
        }
    }

    loadProfileData() {
        if (!app.currentUser) {
            showSection('login');
            return;
        }

        // Load user data from storage
        const users = JSON.parse(localStorage.getItem('fashionstore_users') || '[]');
        const user = users.find(u => u.id === app.currentUser.id);

        if (user) {
            document.getElementById('profile-fullname').value = user.fullname || '';
            document.getElementById('profile-email').value = user.email || '';
            document.getElementById('profile-phone').value = user.phone || '';
            document.getElementById('profile-address').value = user.address || '';
        }

        this.updateProfileStats();
    }

    updateProfile() {
        if (!app.currentUser) return;

        const fullname = document.getElementById('profile-fullname').value.trim();
        const phone = document.getElementById('profile-phone').value.trim();
        const address = document.getElementById('profile-address').value.trim();

        // Validation
        if (!fullname) {
            app.showMessage('Vui lòng nhập họ và tên!', 'error');
            return;
        }

        if (phone && !this.isValidPhone(phone)) {
            app.showMessage('Số điện thoại không hợp lệ!', 'error');
            return;
        }

        // Update user data
        const users = JSON.parse(localStorage.getItem('fashionstore_users') || '[]');
        const userIndex = users.findIndex(u => u.id === app.currentUser.id);

        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex],
                fullname: fullname,
                phone: phone,
                address: address,
                updatedAt: new Date().toISOString()
            };

            localStorage.setItem('fashionstore_users', JSON.stringify(users));

            // Update current user
            app.currentUser.fullname = fullname;
            app.saveUserToStorage();
            app.updateUI();

            app.showMessage('Cập nhật thông tin thành công!', 'success');
        }
    }

    isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    updateProfileStats() {
        // Update order count
        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
        const userOrders = orders.filter(order => order.customer.id === app.currentUser.id);
        const totalOrdersEl = document.getElementById('total-orders');
        if (totalOrdersEl) {
            totalOrdersEl.textContent = userOrders.length;
        }

        // Update wishlist count
        if (window.wishlistManager) {
            const wishlistCount = wishlistManager.getUserWishlist().length;
            const totalWishlistEl = document.getElementById('total-wishlist');
            if (totalWishlistEl) {
                totalWishlistEl.textContent = wishlistCount;
            }
        }
    }

    displayOrderHistory() {
        if (!app.currentUser) {
            showSection('login');
            return;
        }

        const orderHistoryList = document.getElementById('order-history-list');
        if (!orderHistoryList) return;

        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
        const userOrders = orders
            .filter(order => order.customer.id === app.currentUser.id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (userOrders.length === 0) {
            orderHistoryList.innerHTML = `
                <div class="empty-orders">
                    <i class="fas fa-shopping-bag"></i>
                    <h3>Chưa có đơn hàng nào</h3>
                    <p>Hãy đặt hàng ngay để trải nghiệm dịch vụ của chúng tôi</p>
                    <button onclick="showSection('products')" class="btn-primary">
                        Mua sắm ngay
                    </button>
                </div>
            `;
            return;
        }

        orderHistoryList.innerHTML = userOrders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <div class="order-id">Đơn hàng: ${order.id}</div>
                        <div class="order-date">${this.formatDate(order.createdAt)}</div>
                    </div>
                    <span class="order-status ${order.status}">${this.getStatusText(order.status)}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.name} x ${item.quantity}</span>
                            <span>${app.formatPrice(item.total)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <div>
                        <strong>Phương thức thanh toán:</strong> ${this.getPaymentMethodName(order.payment.method)}
                    </div>
                    <div>
                        <strong>Tổng cộng:</strong> ${app.formatPrice(order.totals.total)}
                    </div>
                </div>
            </div>
        `).join('');
    }

    getStatusText(status) {
        const statusMap = {
            'pending': 'Chờ xác nhận',
            'confirmed': 'Đã xác nhận',
            'shipping': 'Đang giao hàng',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy'
        };
        return statusMap[status] || status;
    }

    getPaymentMethodName(method) {
        const methods = {
            'cod': 'Thanh toán khi nhận hàng',
            'bank': 'Chuyển khoản ngân hàng',
            'momo': 'Ví MoMo'
        };
        return methods[method] || method;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    submitContactForm() {
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);

        // Simulate sending contact message
        app.showMessage('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.', 'success');
        form.reset();
    }

    // Get user statistics
    getUserStats() {
        if (!app.currentUser) return null;

        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
        const userOrders = orders.filter(order => order.customer.id === app.currentUser.id);

        const totalSpent = userOrders.reduce((sum, order) => sum + order.totals.total, 0);
        const completedOrders = userOrders.filter(order => order.status === 'completed').length;

        return {
            totalOrders: userOrders.length,
            completedOrders: completedOrders,
            totalSpent: totalSpent,
            averageOrderValue: userOrders.length > 0 ? totalSpent / userOrders.length : 0,
            wishlistCount: wishlistManager ? wishlistManager.getUserWishlist().length : 0
        };
    }
}

// ProfileManager will be initialized from app.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.profileManager = new ProfileManager();
// });