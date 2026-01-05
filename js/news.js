// News Management
class NewsManager {
    constructor() {
        this.news = [];
        this.currentTab = 'all';
        this.loadNewsFromStorage();
        this.initializeDefaultNews();
    }

    loadNewsFromStorage() {
        const newsData = localStorage.getItem('fashionstore_news');
        if (newsData) {
            this.news = JSON.parse(newsData);
        }
    }

    saveNewsToStorage() {
        localStorage.setItem('fashionstore_news', JSON.stringify(this.news));
    }

    initializeDefaultNews() {
        if (this.news.length === 0) {
            this.news = [
                {
                    id: 1,
                    title: 'Bộ sưu tập Thu Đông 2024',
                    excerpt: 'Khám phá bộ sưu tập thời trang nam mới nhất cho mùa Thu Đông 2024 với những thiết kế độc đáo và phong cách.',
                    content: 'Bộ sưu tập Thu Đông 2024 của Fashion Store mang đến những thiết kế độc đáo, kết hợp giữa phong cách cổ điển và hiện đại...',
                    type: 'news',
                    image: 'news1.jpg',
                    author: 'Admin',
                    publishedAt: new Date('2024-11-01').toISOString(),
                    views: 1250
                },
                {
                    id: 2,
                    title: 'Giảm giá 50% toàn bộ áo sơ mi',
                    excerpt: 'Chương trình khuyến mãi lớn - Giảm giá 50% cho tất cả các mẫu áo sơ mi. Áp dụng từ 01/12 đến 31/12.',
                    content: 'Nhân dịp cuối năm, Fashion Store triển khai chương trình khuyến mãi đặc biệt với mức giảm giá lên đến 50% cho toàn bộ áo sơ mi...',
                    type: 'promotion',
                    image: 'promo1.jpg',
                    author: 'Admin',
                    publishedAt: new Date('2024-12-01').toISOString(),
                    views: 2340
                },
                {
                    id: 3,
                    title: 'Xu hướng thời trang nam 2025',
                    excerpt: 'Cập nhật những xu hướng thời trang nam nổi bật sẽ thống trị trong năm 2025.',
                    content: 'Năm 2025 hứa hẹn mang đến nhiều xu hướng thời trang nam mới mẻ và thú vị. Từ phong cách tối giản đến những họa tiết táo bạo...',
                    type: 'news',
                    image: 'news2.jpg',
                    author: 'Admin',
                    publishedAt: new Date('2024-12-15').toISOString(),
                    views: 890
                },
                {
                    id: 4,
                    title: 'Mua 2 tặng 1 - Áo thun basic',
                    excerpt: 'Chương trình mua 2 tặng 1 áp dụng cho tất cả áo thun basic. Số lượng có hạn!',
                    content: 'Fashion Store triển khai chương trình ưu đãi đặc biệt: Mua 2 áo thun basic bất kỳ và nhận ngay 1 áo thun miễn phí...',
                    type: 'promotion',
                    image: 'promo2.jpg',
                    author: 'Admin',
                    publishedAt: new Date('2024-12-20').toISOString(),
                    views: 1560
                }
            ];
            this.saveNewsToStorage();
        }
    }

    getAllNews() {
        return this.news.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    getNewsByType(type) {
        return this.news
            .filter(item => item.type === type)
            .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    getNewsById(id) {
        return this.news.find(item => item.id === id);
    }

    addNews(newsData) {
        const newNews = {
            id: Date.now(),
            ...newsData,
            publishedAt: new Date().toISOString(),
            views: 0
        };

        this.news.push(newNews);
        this.saveNewsToStorage();
        return newNews;
    }

    updateNews(id, newsData) {
        const index = this.news.findIndex(item => item.id === id);
        if (index !== -1) {
            this.news[index] = {
                ...this.news[index],
                ...newsData,
                updatedAt: new Date().toISOString()
            };
            this.saveNewsToStorage();
            return this.news[index];
        }
        return null;
    }

    deleteNews(id) {
        this.news = this.news.filter(item => item.id !== id);
        this.saveNewsToStorage();
    }

    incrementViews(id) {
        const newsItem = this.getNewsById(id);
        if (newsItem) {
            newsItem.views = (newsItem.views || 0) + 1;
            this.saveNewsToStorage();
        }
    }

    displayNews(type = 'all') {
        const newsGrid = document.getElementById('news-grid');
        if (!newsGrid) return;

        let newsToDisplay = type === 'all' ? this.getAllNews() : this.getNewsByType(type);

        if (newsToDisplay.length === 0) {
            newsGrid.innerHTML = `
                <div class="no-news">
                    <i class="fas fa-newspaper"></i>
                    <h3>Chưa có tin tức</h3>
                </div>
            `;
            return;
        }

        newsGrid.innerHTML = newsToDisplay.map(item => `
            <div class="news-card" onclick="showNewsDetail(${item.id})">
                <div class="news-image">
                    <i class="fas fa-${item.type === 'promotion' ? 'tag' : 'newspaper'}"></i>
                </div>
                <div class="news-content">
                    <span class="news-badge ${item.type}">${item.type === 'promotion' ? 'Khuyến mãi' : 'Tin tức'}</span>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-excerpt">${item.excerpt}</p>
                    <div class="news-meta">
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(item.publishedAt)}</span>
                        <span><i class="fas fa-eye"></i> ${item.views || 0} lượt xem</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayNewsDetail(id) {
        const newsItem = this.getNewsById(id);
        if (!newsItem) return;

        this.incrementViews(id);

        const detailContent = document.getElementById('news-detail-content');
        if (!detailContent) return;

        detailContent.innerHTML = `
            <article class="news-detail">
                <span class="news-badge ${newsItem.type}">${newsItem.type === 'promotion' ? 'Khuyến mãi' : 'Tin tức'}</span>
                <h1>${newsItem.title}</h1>
                <div class="news-meta">
                    <span><i class="fas fa-user"></i> ${newsItem.author}</span>
                    <span><i class="fas fa-calendar"></i> ${this.formatDate(newsItem.publishedAt)}</span>
                    <span><i class="fas fa-eye"></i> ${newsItem.views || 0} lượt xem</span>
                </div>
                <div class="news-image-large">
                    <i class="fas fa-${newsItem.type === 'promotion' ? 'tag' : 'newspaper'}"></i>
                </div>
                <div class="news-body">
                    ${newsItem.content}
                </div>
            </article>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    searchNews(query) {
        const lowerQuery = query.toLowerCase();
        return this.news.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.excerpt.toLowerCase().includes(lowerQuery) ||
            item.content.toLowerCase().includes(lowerQuery)
        );
    }

    getNewsStats() {
        return {
            total: this.news.length,
            news: this.getNewsByType('news').length,
            promotions: this.getNewsByType('promotion').length,
            totalViews: this.news.reduce((sum, item) => sum + (item.views || 0), 0)
        };
    }
}

// Global functions
function showNewsTab(type) {
    newsManager.currentTab = type;
    newsManager.displayNews(type);

    // Update tab buttons
    document.querySelectorAll('.news-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function showNewsDetail(id) {
    newsManager.displayNewsDetail(id);
    showSection('news-detail');
}

// NewsManager will be initialized from app.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.newsManager = new NewsManager();
//     newsManager.displayNews();
// });