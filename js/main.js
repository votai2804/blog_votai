// ========== NAVIGATION MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Đóng menu khi click vào link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== SCROLL ANIMATION FOR PROGRESS BARS ==========
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFills = entry.target.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    observer.observe(skillsSection);
}

// ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create mailto link
        const mailtoLink = `mailto:nguyenvana@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Show success message
        alert('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ với bạn sớm.');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Open email client
        // window.location.href = mailtoLink;
    });
}

// ========== SCROLL TO TOP BUTTON ==========
window.addEventListener('scroll', () => {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.scrollY > 300) {
        if (!scrollButton) {
            const button = document.createElement('button');
            button.className = 'scroll-to-top';
            button.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(button);
            
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
});

// ========== HEADER SHADOW ON SCROLL ==========
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in';
        imageObserver.observe(img);
    });
}

console.log('Portfolio website loaded successfully!');

// ========== TOGGLE HIDDEN PROJECTS ==========
function toggleProjects() {
    const hiddenProjects = document.getElementById('hiddenProjects');
    const viewAllBtn = document.getElementById('viewAllBtn');
    
    hiddenProjects.classList.toggle('show');
    
    if (hiddenProjects.classList.contains('show')) {
        viewAllBtn.textContent = 'Ẩn Các Dự Án Khác';
        viewAllBtn.classList.add('active');
    } else {
        viewAllBtn.textContent = 'Xem Tất Cả Dự Án';
        viewAllBtn.classList.remove('active');
    }
}
