// Enhanced JavaScript with Cool Animations for OSIS Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions when page loads
    initSmoothScrolling();
    initActiveNavigation();
    initScrollAnimations();
    initHeaderScrollEffect();
    initMobileMenu();
    initLoadingAnimations();
    initScrollProgress();
    initParallaxEffect();
    initTypewriterEffect();
    initFloatingElements();
    initMouseFollower();
    initScrollToTop();
    initInteractiveElements();
    initParticleEffect();
});

// Enhanced Smooth Scrolling with Easing
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                // Add smooth scroll with custom easing
                smoothScrollTo(targetPosition, 1000);
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    const startTime = performance.now();

    function scroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (ease-out-cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, start + (distance * easeProgress));
        
        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }
    
    requestAnimationFrame(scroll);
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create scroll progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-indicator';
    progressContainer.innerHTML = '<div class="scroll-progress"></div>';
    document.body.prepend(progressContainer);
    
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Enhanced Parallax Effect
function initParallaxEffect() {
    const parallaxElements = [];
    
    // Add parallax to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('parallax-element');
        parallaxElements.push({ element: hero, speed: 0.5 });
    }
    
    // Add parallax to about image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.classList.add('parallax-element');
        parallaxElements.push({ element: aboutImage, speed: 0.3 });
    }
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(({ element, speed }) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.bottom >= 0 && rect.top <= window.innerHeight;
            
            if (isVisible) {
                const yPos = scrolled * speed;
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    });
}

// Typewriter Effect for Hero Title
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid white';
        
        let i = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Remove cursor after typing is done
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Floating Animation Elements
function initFloatingElements() {
    // Create floating geometric shapes
    const shapes = ['circle', 'triangle', 'square'];
    const colors = ['rgba(255,255,255,0.1)', 'rgba(99,102,241,0.1)', 'rgba(239,68,68,0.1)'];
    
    for (let i = 0; i < 6; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.style.cssText = `
            position: fixed;
            width: ${20 + Math.random() * 60}px;
            height: ${20 + Math.random() * 60}px;
            background: ${color};
            border-radius: ${shapeType === 'circle' ? '50%' : shapeType === 'triangle' ? '0' : '10px'};
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            z-index: -1;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
        `;
        
        if (shapeType === 'triangle') {
            shape.style.background = 'transparent';
            shape.style.borderLeft = `${shape.style.width} solid transparent`;
            shape.style.borderRight = `${shape.style.width} solid transparent`;
            shape.style.borderBottom = `${shape.style.height} solid ${color}`;
            shape.style.width = '0';
            shape.style.height = '0';
        }
        
        document.body.appendChild(shape);
    }
}

// Mouse Follower Effect
function initMouseFollower() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(239,68,68,0.8), rgba(239,68,68,0.2));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Enhance cursor on hover
    const interactiveElements = document.querySelectorAll('a, button, .vm-card, .journal-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(99,102,241,0.8), rgba(99,102,241,0.2))';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(239,68,68,0.8), rgba(239,68,68,0.2))';
        });
    });
}

// Enhanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('journal-card') || 
                    entry.target.classList.contains('vm-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                
                // Add special effects for different elements
                if (entry.target.classList.contains('about-content')) {
                    entry.target.style.animation = 'slideInRight 1s ease-out both';
                }
                
                if (entry.target.classList.contains('about-image')) {
                    entry.target.style.animation = 'slideInLeft 1s ease-out both';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.vm-card, .journal-card, .about-content, .about-image, .footer-section').forEach(el => {
        observer.observe(el);
    });
}

// Interactive Elements with Sound Effects (Visual Feedback)
function initInteractiveElements() {
    // Add ripple effect to cards
    const cards = document.querySelectorAll('.vm-card, .journal-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(255,255,255,0.3), transparent);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Particle Effect for Background
function initParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Enhanced Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #ef4444, #ff6666);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
            scrollBtn.style.transform = 'scale(0.8)';
        }
    });
    
    // Add hover effects
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
        scrollBtn.style.boxShadow = '0 12px 35px rgba(239, 68, 68, 0.4)';
        scrollBtn.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.3)';
        scrollBtn.style.background = 'linear-gradient(135deg, #ef4444, #ff6666)';
    });
    
    // Scroll to top functionality with animation
    scrollBtn.addEventListener('click', () => {
        scrollBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            scrollBtn.style.transform = 'scale(1)';
        }, 150);
        
        smoothScrollTo(0, 1000);
    });
}

// Enhanced Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.pageYOffset;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show header on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add transition for smooth header movement
    header.style.transition = 'all 0.3s ease';
}

// Enhanced Active Navigation
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                
                // Add pulse animation to active link
                link.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    link.style.animation = '';
                }, 600);
            }
        });
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateActiveLink);
            ticking = true;
        }
    });
}

// Enhanced Mobile Menu
function initMobileMenu() {
    const nav = document.querySelector('nav');
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenuBtn) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #333;
            cursor: pointer;
            padding: 10px;
            border-radius: 8px;
            transition: all 0.3s ease;
        `;
        nav.appendChild(mobileMenuBtn);
    }
    
    const navLinks = document.querySelector('.nav-links');
    
    // Enhanced mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.style.transform = 'rotate(180deg)';
        
        setTimeout(() => {
            mobileMenuBtn.style.transform = 'rotate(0deg)';
        }, 300);
        
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
            mobileMenuBtn.style.background = 'rgba(239, 68, 68, 0.1)';
        } else {
            icon.className = 'fas fa-bars';
            mobileMenuBtn.style.background = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            mobileMenuBtn.style.background = 'none';
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            mobileMenuBtn.style.background = 'none';
        }
    });
}

// Enhanced Loading Animations with Stagger Effect
function initLoadingAnimations() {
    const elementsToAnimate = [
        { selector: '.logo-icon', delay: 0 },
        { selector: '.logo-text', delay: 200 },
        { selector: '.nav-links li', delay: 400, stagger: 100 },
        { selector: '.hero h1', delay: 800 },
        { selector: '.hero p', delay: 1000 },
        { selector: '.cta-button', delay: 1200 }
    ];
    
    elementsToAnimate.forEach(({ selector, delay, stagger }) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            const totalDelay = delay + (stagger ? index * stagger : 0);
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, totalDelay);
        });
    });
}

// Text Animation Effects
function initTextAnimations() {
    const textElements = document.querySelectorAll('.hero h1, .hero p, .about-content h2, .journal h2');
    
    textElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(20px);">${word}</span>`
        ).join(' ');
        
        const wordElements = element.querySelectorAll('.word');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wordElements.forEach((word, index) => {
                        setTimeout(() => {
                            word.style.transition = 'all 0.6s ease';
                            word.style.opacity = '1';
                            word.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Image Reveal Animation
function initImageRevealAnimation() {
    const images = document.querySelectorAll('.school-icon, .journal-image');
    
    images.forEach(img => {
        img.style.position = 'relative';
        img.style.overflow = 'hidden';
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ef4444;
            z-index: 2;
            transform: translateX(0);
            transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        img.appendChild(overlay);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        overlay.style.transform = 'translateX(100%)';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(img);
    });
}

// Counter Animation for Statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    // Easing function (ease-out)
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentCount = Math.floor(target * easeProgress);
                    
                    counter.textContent = currentCount;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// 3D Tilt Effect for Cards
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.vm-card, .journal-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            
            const rotateX = (deltaY / rect.height) * 20;
            const rotateY = (deltaX / rect.width) * 20;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
        
        card.style.transition = 'transform 0.1s ease-out';
    });
}

// Magnetic Button Effect
function initMagneticEffect() {
    const buttons = document.querySelectorAll('.cta-button, .scroll-to-top');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.3;
            const deltaY = (e.clientY - centerY) * 0.3;
            
            button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0px, 0px)';
        });
        
        button.style.transition = 'transform 0.2s ease-out';
    });
}

// Performance Optimization
function optimizePerformance() {
    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                if (originalScrollHandler) originalScrollHandler();
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    };
    
    // Preload critical animations
    const style = document.createElement('style');
    style.textContent = `
        * { will-change: auto; }
        .hero, .vm-card, .journal-card { will-change: transform; }
    `;
    document.head.appendChild(style);
}

// Initialize additional effects
setTimeout(() => {
    initTextAnimations();
    initImageRevealAnimation();
    initCounterAnimation();
    init3DTiltEffect();
    initMagneticEffect();
    optimizePerformance();
}, 100);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Animation Error:', e.error);
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Enhanced animations loaded in ${loadTime.toFixed(2)}ms`);
    
    // Remove loading states
    document.body.classList.add('loaded');
});