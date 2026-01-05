// Authentication Logic
class AuthManager {
    constructor() {
        this.users = this.loadUsersFromStorage();
        this.createDefaultAdmin();
        this.bindAuthEvents();
    }

    createDefaultAdmin() {
        // Tạo tài khoản admin mặc định nếu chưa có
        const adminExists = this.users.find(u => u.email === 'admin@fashionstore.com');
        if (!adminExists) {
            const adminUser = {
                id: 1,
                fullname: 'Quản trị viên',
                email: 'admin@fashionstore.com',
                password: this.hashPassword('admin123'),
                role: 'admin',
                createdAt: new Date().toISOString()
            };
            this.users.push(adminUser);
            this.saveUsersToStorage();
        }
    }

    loadUsersFromStorage() {
        const usersData = localStorage.getItem('fashionstore_users');
        return usersData ? JSON.parse(usersData) : [];
    }

    saveUsersToStorage() {
        localStorage.setItem('fashionstore_users', JSON.stringify(this.users));
    }

    bindAuthEvents() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Register form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }

    handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        // Validation
        if (!email || !password) {
            app.showMessage('Vui lòng nhập đầy đủ thông tin!', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            app.showMessage('Email không hợp lệ!', 'error');
            return;
        }

        // Find user
        const user = this.users.find(u => u.email === email);
        
        if (!user) {
            app.showMessage('Email không tồn tại!', 'error');
            return;
        }

        if (user.password !== this.hashPassword(password)) {
            app.showMessage('Mật khẩu không chính xác!', 'error');
            return;
        }

        // Login successful
        app.currentUser = {
            id: user.id,
            fullname: user.fullname,
            email: user.email
        };
        
        app.saveUserToStorage();
        app.updateUI();
        
        // Clear form
        document.getElementById('login-form').reset();
        
        app.showMessage(`Chào mừng ${user.fullname}!`, 'success');
        showSection('home');
    }

    handleRegister() {
        const fullname = document.getElementById('register-fullname').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // Validation
        if (!fullname || !email || !password || !confirmPassword) {
            app.showMessage('Vui lòng nhập đầy đủ thông tin!', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            app.showMessage('Email không hợp lệ!', 'error');
            return;
        }

        if (password.length < 6) {
            app.showMessage('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
            return;
        }

        if (password !== confirmPassword) {
            app.showMessage('Mật khẩu xác nhận không khớp!', 'error');
            return;
        }

        // Check if email already exists
        if (this.users.find(u => u.email === email)) {
            app.showMessage('Email đã được sử dụng!', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            fullname: fullname,
            email: email,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsersToStorage();

        // Auto login after registration
        app.currentUser = {
            id: newUser.id,
            fullname: newUser.fullname,
            email: newUser.email
        };
        
        app.saveUserToStorage();
        app.updateUI();

        // Clear form
        document.getElementById('register-form').reset();

        app.showMessage('Đăng ký thành công!', 'success');
        showSection('home');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    hashPassword(password) {
        // Simple hash function - trong thực tế nên dùng bcrypt hoặc tương tự
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    // Method to check if user is logged in
    isLoggedIn() {
        return app.currentUser !== null;
    }

    // Method to get current user
    getCurrentUser() {
        return app.currentUser;
    }

    // Method to logout (called from app.js)
    logout() {
        app.currentUser = null;
        app.cart = [];
        app.saveUserToStorage();
        app.saveCartToStorage();
        app.updateUI();
        showSection('home');
        app.showMessage('Đã đăng xuất thành công!', 'success');
    }
}

// AuthManager will be initialized from app.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.authManager = new AuthManager();
// });

// Global logout function for easy access
function logout() {
    if (window.authManager) {
        authManager.logout();
    }
}