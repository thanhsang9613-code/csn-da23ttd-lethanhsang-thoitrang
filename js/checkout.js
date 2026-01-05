// Checkout Process Logic
class CheckoutManager {
    constructor() {
        this.orderData = {
            customer: {},
            items: [],
            shipping: {},
            payment: {},
            totals: {}
        };
        this.bindCheckoutEvents();
    }

    bindCheckoutEvents() {
        // Checkout form submission
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processCheckout();
            });
        }

        // Update order summary when checkout section is shown
        document.addEventListener('click', (e) => {
            if (e.target.getAttribute('onclick') === "showSection('checkout')") {
                setTimeout(() => this.updateOrderSummary(), 100);
            }
        });
    }

    // Validate checkout form
    validateCheckoutForm() {
        const fullname = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const paymentMethod = document.getElementById('payment-method').value;

        const errors = [];

        if (!fullname) {
            errors.push('Vui lòng nhập họ và tên');
        }

        if (!phone) {
            errors.push('Vui lòng nhập số điện thoại');
        } else if (!this.isValidPhone(phone)) {
            errors.push('Số điện thoại không hợp lệ');
        }

        if (!address) {
            errors.push('Vui lòng nhập địa chỉ giao hàng');
        }

        if (!paymentMethod) {
            errors.push('Vui lòng chọn phương thức thanh toán');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    // Validate phone number
    isValidPhone(phone) {
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Process checkout
    async processCheckout() {
        // Validate cart
        const cartValidation = app.cart.length > 0;
        if (!cartValidation) {
            app.showMessage('Giỏ hàng trống!', 'error');
            return;
        }

        // Validate user login
        if (!app.currentUser) {
            app.showMessage('Vui lòng đăng nhập để tiếp tục!', 'error');
            showSection('login');
            return;
        }

        // Validate form
        const formValidation = this.validateCheckoutForm();
        if (!formValidation.valid) {
            app.showMessage(formValidation.errors.join('<br>'), 'error');
            return;
        }

        // Prepare order data
        this.prepareOrderData();

        // Show loading
        const submitBtn = document.querySelector('#checkout-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Đang xử lý...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.submitOrder();
            
            // Success
            this.handleOrderSuccess();
            
        } catch (error) {
            // Error
            app.showMessage('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!', 'error');
            console.error('Checkout error:', error);
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Prepare order data
    prepareOrderData() {
        const fullname = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const paymentMethod = document.getElementById('payment-method').value;

        this.orderData = {
            id: 'ORD' + Date.now(),
            customer: {
                id: app.currentUser.id,
                name: fullname,
                email: app.currentUser.email,
                phone: phone
            },
            shipping: {
                address: address,
                method: 'standard'
            },
            payment: {
                method: paymentMethod,
                status: 'pending'
            },
            items: app.cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            })),
            totals: {
                subtotal: this.calculateSubtotal(),
                shipping: this.calculateShipping(),
                total: this.calculateTotal()
            },
            status: 'pending',
            createdAt: new Date().toISOString()
        };
    }

    // Calculate subtotal
    calculateSubtotal() {
        return app.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Calculate shipping
    calculateShipping() {
        const subtotal = this.calculateSubtotal();
        return subtotal >= 1000000 ? 0 : 30000;
    }

    // Calculate total
    calculateTotal() {
        return this.calculateSubtotal() + this.calculateShipping();
    }

    // Submit order (simulate API call)
    async submitOrder() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                if (Math.random() > 0.1) { // 90% success rate
                    // Save order to localStorage
                    this.saveOrderToStorage();
                    resolve(this.orderData);
                } else {
                    reject(new Error('Order submission failed'));
                }
            }, 2000);
        });
    }

    // Save order to localStorage
    saveOrderToStorage() {
        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
        orders.push(this.orderData);
        localStorage.setItem('fashionstore_orders', JSON.stringify(orders));
    }

    // Handle successful order
    handleOrderSuccess() {
        // Clear cart
        app.cart = [];
        app.saveCartToStorage();
        app.updateCartUI();

        // Clear form
        document.getElementById('checkout-form').reset();

        // Show success message
        this.showOrderSuccessModal();
    }

    // Show order success modal
    showOrderSuccessModal() {
        const modal = document.createElement('div');
        modal.className = 'order-success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Đặt hàng thành công!</h2>
                <p>Mã đơn hàng: <strong>${this.orderData.id}</strong></p>
                <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.</p>
                <div class="order-summary-modal">
                    <h3>Thông tin đơn hàng:</h3>
                    <p><strong>Tên:</strong> ${this.orderData.customer.name}</p>
                    <p><strong>Điện thoại:</strong> ${this.orderData.customer.phone}</p>
                    <p><strong>Địa chỉ:</strong> ${this.orderData.shipping.address}</p>
                    <p><strong>Tổng tiền:</strong> ${this.formatPrice(this.orderData.totals.total)}</p>
                    <p><strong>Phương thức thanh toán:</strong> ${this.getPaymentMethodName(this.orderData.payment.method)}</p>
                </div>
                <div class="modal-actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove(); showSection('home')" class="btn-primary">
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .order-success-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                text-align: center;
            }
            .success-icon {
                font-size: 4rem;
                color: #27ae60;
                margin-bottom: 1rem;
            }
            .order-summary-modal {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 5px;
                margin: 1rem 0;
                text-align: left;
            }
            .modal-actions {
                margin-top: 2rem;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);
    }

    // Get payment method display name
    getPaymentMethodName(method) {
        const methods = {
            'cod': 'Thanh toán khi nhận hàng',
            'bank': 'Chuyển khoản ngân hàng',
            'momo': 'Ví MoMo'
        };
        return methods[method] || method;
    }

    // Update order summary in checkout form
    updateOrderSummary() {
        const orderItems = document.getElementById('order-items');
        const orderTotal = document.getElementById('order-total');

        if (!orderItems || !orderTotal) return;

        if (app.cart.length === 0) {
            orderItems.innerHTML = '<p>Giỏ hàng trống</p>';
            orderTotal.innerHTML = '';
            return;
        }

        // Display order items
        orderItems.innerHTML = app.cart.map(item => `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>${this.formatPrice(item.price * item.quantity)}</span>
            </div>
        `).join('');

        // Display totals
        const subtotal = this.calculateSubtotal();
        const shipping = this.calculateShipping();
        const total = this.calculateTotal();

        orderTotal.innerHTML = `
            <div class="order-item">
                <span>Tạm tính:</span>
                <span>${this.formatPrice(subtotal)}</span>
            </div>
            <div class="order-item">
                <span>Phí vận chuyển:</span>
                <span>${shipping === 0 ? 'Miễn phí' : this.formatPrice(shipping)}</span>
            </div>
            <div class="order-item total">
                <span><strong>Tổng cộng:</strong></span>
                <span><strong>${this.formatPrice(total)}</strong></span>
            </div>
        `;
    }

    // Format price
    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    // Get user's order history
    getUserOrders(userId) {
        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
        return orders.filter(order => order.customer.id === userId);
    }

    // Get order by ID
    getOrderById(orderId) {
        const orders = JSON.parse(localStorage.getItem('fashionstore_orders') || '[]');
        return orders.find(order => order.id === orderId);
    }
}

// CheckoutManager will be initialized from app.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.checkoutManager = new CheckoutManager();
// });