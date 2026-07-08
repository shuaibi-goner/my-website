// 导航栏 hamburger 菜单
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 点击链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// 数字滚动动画
const counters = document.querySelectorAll('.stat-number');

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 动画持续时间
        const step = target / (duration / 16); // 每帧增加的值
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
};

// 监听数字是否在视口内
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// 作品集筛选功能
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的 active 类
            filterBtns.forEach(b => b.classList.remove('active'));
            // 给当前点击的按钮添加 active 类
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 联系表单提交
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // 显示成功消息
        alert(`感谢您的留言！\n\n姓名: ${data.name}\n邮箱: ${data.email}\n主题: ${data.subject}\n内容: ${data.message}\n\n我们将尽快回复您！`);

        // 重置表单
        contactForm.reset();
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动显示动画
const observerOptions2 = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions2);

// 为所有需要动画的元素添加观察
document.querySelectorAll('.feature-card, .portfolio-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});

// 添加 visible 类时的样式
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('网站已加载');
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});