# Hệ Thống Bán Thời Trang Nam - Fashion Store

## Mô tả dự án
Đây là một ứng dụng web bán thời trang nam được xây dựng bằng HTML, CSS và JavaScript thuần. Ứng dụng cung cấp đầy đủ các chức năng của một trang thương mại điện tử hiện đại với hệ thống phân quyền người dùng.

## Phân quyền người dùng

### 👤 Người dùng chưa đăng ký
- Xem danh mục sản phẩm
- Xem chi tiết sản phẩm và đánh giá
- Tìm kiếm sản phẩm
- Xem tin tức và khuyến mãi
- Xem trang giới thiệu và liên hệ

### 🔐 Người dùng đã đăng ký
**Tất cả quyền của người dùng chưa đăng ký, plus:**
- Đăng nhập/đăng xuất
- Xem và chỉnh sửa thông tin tài khoản
- Thêm sản phẩm vào danh sách yêu thích
- Thêm sản phẩm vào giỏ hàng
- Đặt mua sản phẩm
- Xem lịch sử đơn hàng
- Nhận thông báo đặt hàng (mô phỏng email)

### 👑 Quản trị viên
**Tất cả quyền của người dùng đã đăng ký, plus:**
- Truy cập bảng điều khiển quản trị
- Quản lý sản phẩm (xem, thêm, sửa, xóa)
- Quản lý danh mục (xem, thêm, sửa, xóa)
- Quản lý tin tức (xem, thêm, sửa, xóa)
- Quản lý đơn hàng (xem, cập nhật trạng thái)
- Xem thông tin người dùng
- Xem thống kê doanh thu theo ngày

## Tính năng chính

### 🔐 Hệ thống xác thực
- **Đăng ký tài khoản**: Tạo tài khoản với validation đầy đủ
- **Đăng nhập**: Xác thực với email và mật khẩu
- **Phân quyền**: Hệ thống phân quyền user/admin
- **Quản lý phiên**: Lưu trữ thông tin đăng nhập

### 🛍️ Quản lý sản phẩm
- **Danh sách sản phẩm**: Hiển thị với phân trang và lọc
- **Chi tiết sản phẩm**: Trang chi tiết với ảnh, mô tả, đánh giá
- **Tìm kiếm**: Tìm kiếm theo tên và mô tả
- **Lọc và sắp xếp**: Theo danh mục, giá, đánh giá
- **Đánh giá sản phẩm**: Hệ thống đánh giá 5 sao

### ❤️ Danh sách yêu thích
- **Thêm/xóa yêu thích**: Quản lý sản phẩm yêu thích
- **Xem danh sách**: Trang riêng cho sản phẩm yêu thích
- **Thống kê**: Đếm số lượng sản phẩm yêu thích

### 🛒 Giỏ hàng
- **Thêm sản phẩm**: Thêm với số lượng tùy chọn
- **Cập nhật**: Thay đổi số lượng hoặc xóa sản phẩm
- **Tính toán**: Tự động tính tổng tiền và phí ship
- **Miễn phí ship**: Cho đơn hàng trên 1.000.000đ

### 💳 Thanh toán
- **Thông tin giao hàng**: Form nhập địa chỉ và liên hệ
- **Phương thức thanh toán**: COD, chuyển khoản, ví MoMo
- **Xác nhận đơn hàng**: Tạo mã đơn hàng và lưu trữ
- **Thông báo**: Mô phỏng gửi email xác nhận

### 📰 Tin tức & Khuyến mãi
- **Hiển thị tin tức**: Danh sách tin tức và khuyến mãi
- **Chi tiết bài viết**: Trang chi tiết với lượt xem
- **Phân loại**: Tab riêng cho tin tức và khuyến mãi
- **Quản lý**: Admin có thể thêm/sửa/xóa tin tức

### 👤 Quản lý tài khoản
- **Thông tin cá nhân**: Xem và chỉnh sửa thông tin
- **Lịch sử đơn hàng**: Xem tất cả đơn hàng đã đặt
- **Thống kê cá nhân**: Số đơn hàng, sản phẩm yêu thích

### 🏢 Trang thông tin
- **Giới thiệu**: Thông tin về công ty
- **Liên hệ**: Form liên hệ và thông tin liên lạc

### 👑 Bảng điều khiển Admin
- **Tổng quan**: Thống kê tổng quan hệ thống
- **Quản lý sản phẩm**: CRUD sản phẩm
- **Quản lý danh mục**: CRUD danh mục
- **Quản lý đơn hàng**: Xem và cập nhật trạng thái
- **Quản lý người dùng**: Xem thông tin người dùng
- **Quản lý tin tức**: CRUD tin tức
- **Thống kê doanh thu**: Biểu đồ doanh thu theo ngày

## Cấu trúc dự án

```
├── main.html              # Trang chính
├── css/
│   └── style.css         # Stylesheet với responsive design
├── js/
│   ├── app.js           # Logic ứng dụng chính
│   ├── auth.js          # Xử lý đăng ký/đăng nhập
│   ├── products.js      # Quản lý sản phẩm
│   ├── cart.js          # Quản lý giỏ hàng
│   ├── checkout.js      # Xử lý thanh toán
│   ├── wishlist.js      # Quản lý danh sách yêu thích
│   ├── news.js          # Quản lý tin tức
│   ├── profile.js       # Quản lý tài khoản
│   └── admin.js         # Bảng điều khiển admin
├── data/
│   └── products.json    # Dữ liệu sản phẩm mẫu
├── images/              # Thư mục chứa hình ảnh
└── README.md           # Tài liệu hướng dẫn
```

## Hướng dẫn sử dụng

### 1. Khởi chạy ứng dụng
- Mở file `main.html` trong trình duyệt web
- Hoặc sử dụng Live Server extension trong VS Code

### 2. Tài khoản mặc định
**Quản trị viên:**
- Email: admin@fashionstore.com
- Mật khẩu: admin123

**Người dùng thường:**
- Tạo tài khoản mới qua form đăng ký

### 3. Chức năng chính

#### Dành cho khách vãng lai:
- Duyệt sản phẩm và xem chi tiết
- Tìm kiếm và lọc sản phẩm
- Đọc tin tức và khuyến mãi
- Xem thông tin liên hệ

#### Dành cho người dùng đã đăng ký:
- Đăng nhập để sử dụng đầy đủ tính năng
- Thêm sản phẩm vào yêu thích và giỏ hàng
- Đặt hàng và theo dõi đơn hàng
- Quản lý thông tin cá nhân

#### Dành cho quản trị viên:
- Đăng nhập với tài khoản admin
- Truy cập menu "Quản trị" để vào dashboard
- Quản lý toàn bộ hệ thống

## Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web semantic
- **CSS3**: Styling với Flexbox/Grid, animations
- **JavaScript ES6+**: Logic ứng dụng với OOP
- **LocalStorage**: Lưu trữ dữ liệu phía client
- **Font Awesome**: Icon library
- **Responsive Design**: Mobile-first approach

## Tính năng nổi bật

### 🎨 Giao diện người dùng
- Thiết kế hiện đại, responsive
- Dark/Light theme support
- Smooth animations và transitions
- Intuitive navigation

### 💾 Quản lý dữ liệu
- LocalStorage cho persistence
- Structured data models
- Data validation và sanitization
- Backup và restore functionality

### 🔒 Bảo mật
- Password hashing
- Input validation
- XSS protection
- Role-based access control

### 📱 Responsive Design
- Mobile-first approach
- Tablet và desktop optimization
- Touch-friendly interface
- Progressive Web App ready

## Dữ liệu mẫu

### Sản phẩm (12 items):
- Áo sơ mi (3 sản phẩm)
- Áo thun (4 sản phẩm) 
- Quần jean (2 sản phẩm)
- Quần tây (2 sản phẩm)
- Phụ kiện (2 sản phẩm)

### Tin tức (4 bài):
- 2 tin tức thời trang
- 2 chương trình khuyến mãi

## Hướng dẫn phát triển

### Thêm sản phẩm mới:
```javascript
// Trong js/app.js, thêm vào mảng products
{
    id: 13,
    name: "Tên sản phẩm",
    price: 500000,
    category: "ao-so-mi",
    description: "Mô tả sản phẩm",
    image: "image.jpg",
    featured: false,
    rating: 4.5,
    reviews: 100
}
```

### Thêm danh mục mới:
1. Cập nhật dropdown trong `main.html`
2. Thêm logic trong `filterProducts()`
3. Cập nhật admin categories

### Tùy chỉnh theme:
```css
/* Trong css/style.css */
:root {
    --primary-color: #e74c3c;
    --secondary-color: #2c3e50;
    --accent-color: #3498db;
}
```

## API Integration (Tương lai)

Ứng dụng được thiết kế để dễ dàng tích hợp với backend:

```javascript
// Ví dụ API calls
const api = {
    products: '/api/products',
    orders: '/api/orders',
    users: '/api/users',
    auth: '/api/auth'
};
```

## Testing

### Manual Testing Checklist:
- [ ] Đăng ký/đăng nhập
- [ ] Thêm sản phẩm vào giỏ hàng
- [ ] Đặt hàng thành công
- [ ] Admin dashboard functionality
- [ ] Responsive design trên mobile

## Performance

### Optimization Features:
- Lazy loading cho images
- Minified CSS/JS (production)
- LocalStorage caching
- Efficient DOM manipulation

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Deployment

### Static Hosting:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

### With Backend:
- Node.js + Express
- PHP + MySQL
- Python + Django
- .NET Core

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - Tự do sử dụng cho mục đích học tập và thương mại.

## Tác giả

Dự án được phát triển như một bài tập đồ án cơ sở ngành về ứng dụng JavaScript trong xây dựng hệ thống thương mại điện tử hoàn chỉnh.

## Changelog

### Version 2.0.0
- ✅ Thêm hệ thống phân quyền user/admin
- ✅ Danh sách yêu thích
- ✅ Chi tiết sản phẩm với đánh giá
- ✅ Tin tức và khuyến mãi
- ✅ Bảng điều khiển admin
- ✅ Thống kê doanh thu
- ✅ Responsive design cải tiến

### Version 1.0.0
- ✅ Chức năng cơ bản: đăng ký, đăng nhập, giỏ hàng, thanh toán