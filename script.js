/* ===========================================
   VOICEFLOW AI - INTERACTIVE FUNCTIONALITY
   =========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavigation();
    initFAQ();
    initSmoothScroll();
    initScrollEffects();
    initAnimations();
    initBusinessTypes();
    initDemoModal();
    initMobileLazyLoading(); // Initialize mobile lazy loading
    initMobileOptimizations(); // Initialize mobile optimizations
    initTouchOptimizations(); // Initialize touch optimizations
    
});

/* ===========================================
   NAVIGATION FUNCTIONALITY
   =========================================== */
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA attributes
        const isActive = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isActive);
        navMenu.setAttribute('aria-hidden', !isActive);
        
        // Prevent body scroll when menu is open
        if (window.innerWidth <= 768) {
            initMobileLazyLoading();
        }
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', false);
            navMenu.setAttribute('aria-hidden', true);
            
            // Smooth scrolling to section
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', false);
            navMenu.setAttribute('aria-hidden', true);
        }
    });
    
    // Close mobile menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', false);
            navMenu.setAttribute('aria-hidden', true);
            
            // Return focus to hamburger button
            hamburger.focus();
        }
    });
    
    // Close mobile menu on orientation change
    window.addEventListener('orientationchange', function() {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', false);
            navMenu.setAttribute('aria-hidden', true);
        }
    });
    
    // Close mobile menu on window resize (desktop/mobile switch)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', false);
            navMenu.setAttribute('aria-hidden', true);
        }
    });
    
    // Touch gesture support for mobile menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    navMenu.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    navMenu.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });
    
    function handleSwipeGesture() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        // Close menu on swipe left
        if (swipeDistance < -swipeThreshold && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', false);
            navMenu.setAttribute('aria-hidden', true);
        }
    }
    
    // Initialize mobile lazy loading if on mobile device
    if (window.innerWidth <= 768) {
        initMobileLazyLoading();
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

/* ===========================================
   FAQ ACCORDION FUNCTIONALITY
   =========================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqAnswer.style.maxHeight = '0';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/* ===========================================
   SMOOTH SCROLL FUNCTIONALITY
   =========================================== */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===========================================
   SCROLL EFFECTS AND ANIMATIONS
   =========================================== */
function initScrollEffects() {
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ===========================================
   ANIMATIONS ON SCROLL
   =========================================== */
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll(`
        .problem-item,
        .step,
        .feature-card,
        .pricing-card,
        .faq-item
    `);
    
    // Set initial styles and observe elements
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Counter animation for stats
    animateCounters();
}

/* ===========================================
   COUNTER ANIMATION
   =========================================== */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 2000; // Animation duration
    
    const animateCounter = (counter) => {
        const target = counter.innerText;
        const isPercentage = target.includes('%');
        const isTime = target.includes('min') || target.includes('/7');
        
        let numericTarget;
        
        if (isPercentage) {
            numericTarget = parseInt(target.replace('%', ''));
        } else if (isTime) {
            if (target.includes('min')) {
                numericTarget = parseInt(target.replace('min', ''));
            } else {
                return; // Skip 24/7 animation
            }
        } else {
            return; // Skip non-numeric counters
        }
        
        const increment = numericTarget / speed * 16; // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                counter.innerText = Math.floor(current) + '%';
            } else if (isTime) {
                counter.innerText = Math.floor(current) + 'min';
            }
        }, 16);
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/* ===========================================
   BUTTON INTERACTIONS
   =========================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            createRipple(e, this);
            
            // Handle different button actions
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Demo') || buttonText.includes('Professional')) {
                handleDemoRequest();
            } else if (buttonText.includes('Akcji')) {
                handleVideoDemo();
            } else if (buttonText.includes('Essentials')) {
                handlePlanSelection('essentials');
            } else if (buttonText.includes('Enterprise') || buttonText.includes('Skontaktuj')) {
                handleContactRequest();
            }
        });
    });
});

/* ===========================================
   RIPPLE EFFECT
   =========================================== */
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    // Add ripple animation CSS if not exists
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/* ===========================================
   CTA BUTTON HANDLERS
   =========================================== */
function handleDemoRequest() {
    // In a real implementation, this would open a booking calendar or contact form
    showNotification('Przekierowujemy do formularza rezerwacji demo...', 'info');
    
    // Simulate redirect after delay
    setTimeout(() => {
        // window.location.href = '/demo-booking';
        console.log('Redirect to demo booking page');
    }, 2000);
}

function handleVideoDemo() {
    // In a real implementation, this would open a video modal or redirect to demo video
    showNotification('Ładujemy demo wideo...', 'info');
    
    // Simulate video loading
    setTimeout(() => {
        console.log('Open video demo modal');
    }, 1000);
}

function handlePlanSelection(plan) {
    showNotification(`Wybrano plan: ${plan}. Przekierowujemy do checkout...`, 'success');
    
    setTimeout(() => {
        // window.location.href = `/checkout?plan=${plan}`;
        console.log(`Redirect to checkout with plan: ${plan}`);
    }, 2000);
}

function handleContactRequest() {
    showNotification('Przekierowujemy do formularza kontaktowego...', 'info');
    
    setTimeout(() => {
        // window.location.href = '/contact';
        console.log('Redirect to contact form');
    }, 2000);
}

/* ===========================================
   NOTIFICATION SYSTEM
   =========================================== */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    if (!document.querySelector('#notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                padding: 1rem 1.5rem;
                z-index: 9999;
                max-width: 400px;
                transform: translateX(420px);
                transition: transform 0.3s ease;
                border-left: 4px solid #2563eb;
            }
            
            .notification-success {
                border-left-color: #10b981;
            }
            
            .notification-error {
                border-left-color: #ef4444;
            }
            
            .notification-warning {
                border-left-color: #f59e0b;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: #374151;
            }
            
            .notification-content i {
                color: #2563eb;
            }
            
            .notification-success .notification-content i {
                color: #10b981;
            }
            
            .notification-error .notification-content i {
                color: #ef4444;
            }
            
            .notification-warning .notification-content i {
                color: #f59e0b;
            }
            
            .notification-close {
                position: absolute;
                top: 8px;
                right: 8px;
                background: none;
                border: none;
                cursor: pointer;
                color: #9ca3af;
                font-size: 0.875rem;
            }
            
            .notification-close:hover {
                color: #6b7280;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Add close handler
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

/* ===========================================
   PERFORMANCE OPTIMIZATIONS
   =========================================== */

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll listeners
window.addEventListener('scroll', throttle(function() {
    // Handle scroll-dependent functionality here
}, 16)); // ~60fps

/* ===========================================
   ACCESSIBILITY ENHANCEMENTS
   =========================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add ARIA labels to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Przejdź do głównej treści';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

/* ===========================================
   BUSINESS TYPES INTERACTIVE FUNCTIONALITY
   =========================================== */
function initBusinessTypes() {
    const businessTypeItems = document.querySelectorAll('.business-type-item');
    const businessDisplayContents = document.querySelectorAll('.business-display-content');
    
    if (businessTypeItems.length === 0 || businessDisplayContents.length === 0) {
        return; // Exit if elements don't exist
    }
    
    businessTypeItems.forEach(item => {
        item.addEventListener('click', function() {
            const businessType = this.getAttribute('data-business');
            
            // Remove active class from all menu items
            businessTypeItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all content sections
            businessDisplayContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected content section
            const targetContent = document.getElementById(`content-${businessType}`);
            if (targetContent) {
                // Add small delay for smooth transition
                setTimeout(() => {
                    targetContent.classList.add('active');
                }, 100);
            }
        });
        
        // Add hover effect for better UX
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

/* ===========================================
   DEMO MODAL FUNCTIONALITY
   =========================================== */
function initDemoModal() {
    const modal = document.getElementById('demo-modal');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('demo-form');
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        closeDemoModal();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeDemoModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            closeDemoModal();
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        form.classList.add('form-loading');
        
        // Create FormData object
        const formData = new FormData(form);
        
        // Submit to Sendy
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Handle success
            showMessage('Dziękujemy! Skontaktujemy się z Tobą w ciągu 24 godzin.', 'success');
            form.reset();
            
            // Close modal after 3 seconds
            setTimeout(() => {
                closeDemoModal();
            }, 3000);
        })
        .catch(error => {
            // Handle error
            showMessage('Przepraszamy, wystąpił błąd. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.', 'error');
            console.error('Error:', error);
        })
        .finally(() => {
            // Remove loading state
            form.classList.remove('form-loading');
        });
    });
}

function openDemoModal() {
    const modal = document.getElementById('demo-modal');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 100);
}

function closeDemoModal() {
    const modal = document.getElementById('demo-modal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    
    // Clear any messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Make functions globally available
window.openDemoModal = openDemoModal;
window.closeModal = closeDemoModal;

function validateForm() {
    const required = ['name', 'email', 'phone', 'company'];
    let isValid = true;
    
    // Check required fields
    required.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e5e7eb';
        }
    });
    
    // Check email format
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        email.style.borderColor = '#ef4444';
        isValid = false;
    }
    
    // Check phone format (basic)
    const phone = document.getElementById('phone');
    const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
    if (phone.value && !phoneRegex.test(phone.value)) {
        phone.style.borderColor = '#ef4444';
        isValid = false;
    }
    
    // Check GDPR checkbox
    const gdpr = document.getElementById('gdpr');
    if (!gdpr.checked) {
        gdpr.parentElement.style.color = '#ef4444';
        isValid = false;
    } else {
        gdpr.parentElement.style.color = '';
    }
    
    if (!isValid) {
        showMessage('Proszę wypełnić wszystkie wymagane pola poprawnie.', 'error');
    }
    
    return isValid;
}

function showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    
    // Insert at the top of modal body
    const modalBody = document.querySelector('.modal-body');
    modalBody.insertBefore(message, modalBody.firstChild);
    
    // Auto-remove error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
}

console.log('🎤 VoiceFlow AI - Landing Page Loaded Successfully!'); 

/* ===========================================
   MOBILE LAZY LOADING FUNCTIONALITY
   =========================================== */
function initMobileLazyLoading() {
    // Only initialize if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Replace data-src with src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Add loaded class for animation
                    img.classList.add('loaded');
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            // Load images 100px before they enter viewport
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        
        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
        
        // Observe all images in carousel and business types
        const carouselImages = document.querySelectorAll('.client-logo, .business-placeholder');
        carouselImages.forEach(img => {
            // Add loading attribute for better performance
            img.setAttribute('loading', 'lazy');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        });
    }
}

/* ===========================================
   MOBILE PERFORMANCE OPTIMIZATIONS
   =========================================== */
function initMobileOptimizations() {
    // Optimize animations on mobile
    if (window.innerWidth <= 768) {
        // Reduce animation duration for better performance
        const animatedElements = document.querySelectorAll('.hero-background, .pulse-ring, .typing-indicator');
        animatedElements.forEach(element => {
            element.style.animationDuration = '20s';
        });
        
        // Pause carousel animation when not visible
        const carousel = document.querySelector('.clients-carousel');
        if (carousel) {
            const carouselObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        carousel.style.animationPlayState = 'running';
                    } else {
                        carousel.style.animationPlayState = 'paused';
                    }
                });
            });
            carouselObserver.observe(carousel);
        }
        
        // Optimize scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Trigger any scroll-based animations here
                updateScrollAnimations();
            }, 16); // ~60fps
        }, { passive: true });
    }
}

function updateScrollAnimations() {
    // Add scroll-based animations for mobile
    const scrollY = window.pageYOffset;
    const elements = document.querySelectorAll('.hero-background');
    
    elements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

/* ===========================================
   MOBILE TOUCH OPTIMIZATIONS
   =========================================== */
function initTouchOptimizations() {
    // Improve touch response for buttons
    const touchElements = document.querySelectorAll('.btn, .nav-link, .business-type-item, .faq-question');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // Optimize modal touch handling
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('touchmove', function(e) {
            // Prevent background scrolling when modal is open
            if (e.target === modal) {
                e.preventDefault();
            }
        }, { passive: false });
    });
}

/* ===========================================
   INITIALIZE MOBILE ENHANCEMENTS
   =========================================== */
// Initialize mobile enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        initMobileOptimizations();
        initTouchOptimizations();
    }
});

// Re-initialize on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        initMobileOptimizations();
        initTouchOptimizations();
    }
}); 