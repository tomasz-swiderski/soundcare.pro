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
    initNavigationAnimations();
    
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
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', false);
            navMenu.setAttribute('aria-hidden', true);
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
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
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', false);
            navMenu.setAttribute('aria-hidden', true);
            
            // Return focus to hamburger button
            hamburger.focus();
        }
    });
    
    // Old navbar scroll effect - now handled in initScrollEffects
    /*
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    });
    */
}

/* ===========================================
   FAQ ACCORDION FUNCTIONALITY
   =========================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize FAQ on page load
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
});

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
    // Active navigation link highlighting with enhanced styling
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

    // Enhanced navbar scroll effect with performance optimization
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, 10);
    }, { passive: true });
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

// Advanced Features Toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleAdvancedFeatures');
    const advancedFeatures = document.getElementById('advancedFeatures');
    
    if (toggleButton && advancedFeatures) {
        toggleButton.addEventListener('click', function() {
            const isShown = advancedFeatures.classList.contains('show');
            
            if (isShown) {
                // Hide advanced features
                advancedFeatures.classList.remove('show');
                toggleButton.innerHTML = '<i class="fas fa-plus"></i><span>Odkryj Zaawansowane Funkcjonalności AI</span>';
                toggleButton.classList.remove('active');
            } else {
                // Show advanced features
                advancedFeatures.classList.add('show');
                toggleButton.innerHTML = '<i class="fas fa-minus"></i><span>Ukryj Zaawansowane Funkcjonalności</span>';
                toggleButton.classList.add('active');
            }
        });
    }

    // Comparison Toggle
    const comparisonToggle = document.getElementById('toggleComparison');
    const expandableComparison = document.getElementById('expandableComparison');
    
    if (comparisonToggle && expandableComparison) {
        comparisonToggle.addEventListener('click', function() {
            const isShown = expandableComparison.classList.contains('show');
            
            if (isShown) {
                // Hide comparison
                expandableComparison.classList.remove('show');
                comparisonToggle.innerHTML = '<i class="fas fa-plus"></i><span>Zobacz Różnice</span>';
                comparisonToggle.classList.remove('active');
            } else {
                // Show comparison
                expandableComparison.classList.add('show');
                comparisonToggle.innerHTML = '<i class="fas fa-minus"></i><span>Ukryj Różnice</span>';
                comparisonToggle.classList.add('active');
            }
        });
    }

    // ROI Details Toggle
    const roiToggle = document.getElementById('toggleRoiDetails');
    const expandableRoi = document.getElementById('expandableRoi');
    
    if (roiToggle && expandableRoi) {
        roiToggle.addEventListener('click', function() {
            const isShown = expandableRoi.classList.contains('show');
            
            if (isShown) {
                // Hide ROI details
                expandableRoi.classList.remove('show');
                roiToggle.innerHTML = '<i class="fas fa-plus"></i><span>Zobacz Szczegółowe Wyliczenia</span>';
                roiToggle.classList.remove('active');
            } else {
                // Show ROI details
                expandableRoi.classList.add('show');
                roiToggle.innerHTML = '<i class="fas fa-minus"></i><span>Ukryj Szczegółowe Wyliczenia</span>';
                roiToggle.classList.add('active');
            }
        });
    }

    // Features Details Toggle
    const featuresToggle = document.getElementById('toggleFeatureDetails');
    const expandableFeatures = document.getElementById('expandableFeatures');
    
    if (featuresToggle && expandableFeatures) {
        featuresToggle.addEventListener('click', function() {
            const isShown = expandableFeatures.classList.contains('show');
            
            if (isShown) {
                // Hide feature details
                expandableFeatures.classList.remove('show');
                featuresToggle.innerHTML = '<i class="fas fa-plus"></i><span>Zobacz Wszystkie Funkcjonalności</span>';
                featuresToggle.classList.remove('active');
            } else {
                // Show feature details
                expandableFeatures.classList.add('show');
                featuresToggle.innerHTML = '<i class="fas fa-minus"></i><span>Ukryj Funkcjonalności</span>';
                featuresToggle.classList.add('active');
            }
        });
    }
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
                
                // Reset inline styles completely
                if (window.innerWidth <= 768) {
                    menuItem.style.cssText = '';
                    
                    // Reset span styles
                    const span = menuItem.querySelector('span');
                    if (span) {
                        span.style.cssText = '';
                    }
                    
                    // Reset icon styles
                    const icon = menuItem.querySelector('.business-icon');
                    if (icon) {
                        icon.style.cssText = '';
                    }
                }
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Apply subtle border-only styles on mobile (no blue background)
            if (window.innerWidth <= 768) {
                // NO BLUE BACKGROUND - Only border indication
                this.style.border = '2px solid #2563eb';
                this.style.backgroundColor = 'white';
                this.style.color = '#374151';
                this.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.1)';
                
                // Force span visibility with normal text color
                const span = this.querySelector('span');
                if (span) {
                    span.style.color = '#374151';
                    span.style.opacity = '1';
                    span.style.visibility = 'visible';
                    span.style.display = 'block';
                    span.style.fontWeight = '600';
                    span.style.textShadow = 'none';
                    span.style.textIndent = '0';
                    span.style.fontSize = '0.85rem';
                    span.style.lineHeight = '1.2';
                    span.style.textDecoration = 'none';
                    span.style.textTransform = 'none';
                }
                
                // Force icon visibility with blue accent
                const icon = this.querySelector('.business-icon');
                if (icon) {
                    icon.style.color = '#2563eb';
                    icon.style.backgroundColor = 'rgba(37, 99, 235, 0.15)';
                    icon.style.border = '2px solid #2563eb';
                    icon.style.opacity = '1';
                    icon.style.visibility = 'visible';
                    icon.style.display = 'flex';
                    icon.style.alignItems = 'center';
                    icon.style.justifyContent = 'center';
                }
                
                // Add extra class for CSS targeting
                this.classList.add('js-active');
            }
            
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
            
            // Enhanced debug logging for mobile
            if (window.innerWidth <= 768) {
                console.log('Mobile: Active business type selected:', businessType);
                console.log('Element classes:', this.className);
                console.log('Element background:', this.style.backgroundColor);
                console.log('Element color:', this.style.color);
                console.log('Element border:', this.style.border);
                
                const span = this.querySelector('span');
                const icon = this.querySelector('.business-icon');
                
                if (span) {
                    console.log('Span color:', span.style.color);
                    console.log('Span opacity:', span.style.opacity);
                    console.log('Span visibility:', span.style.visibility);
                    console.log('Span display:', span.style.display);
                    console.log('Span computed color:', getComputedStyle(span).color);
                }
                
                if (icon) {
                    console.log('Icon color:', icon.style.color);
                    console.log('Icon background:', icon.style.backgroundColor);
                    console.log('Icon border:', icon.style.border);
                    console.log('Icon computed color:', getComputedStyle(icon).color);
                }
                
                // Double-check visibility after a short delay
                setTimeout(() => {
                    if (span) {
                        const spanStyles = getComputedStyle(span);
                        console.log('Span final computed color:', spanStyles.color);
                        console.log('Span final computed opacity:', spanStyles.opacity);
                        console.log('Span final computed visibility:', spanStyles.visibility);
                        
                        // Emergency fix if text is still not visible
                        if (spanStyles.color === 'rgba(0, 0, 0, 0)' || spanStyles.color === 'transparent' || spanStyles.opacity === '0') {
                            console.log('Emergency: Forcing span visibility!');
                            span.style.setProperty('color', '#374151', 'important');
                            span.style.setProperty('opacity', '1', 'important');
                            span.style.setProperty('visibility', 'visible', 'important');
                            span.style.setProperty('display', 'block', 'important');
                        }
                    }
                }, 100);
            }
        });
        
        // Enhanced hover effects for desktop only
        if (window.innerWidth > 768) {
            item.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.15)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }
            });
        }
        
        // Add touch feedback for mobile
        if (window.innerWidth <= 768) {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    if (!this.classList.contains('active')) {
                        this.style.transform = '';
                    }
                }, 100);
            });
        }
    });
    
    // Ensure first item is properly activated on page load
    const firstItem = businessTypeItems[0];
    if (firstItem && window.innerWidth <= 768) {
        // Apply active styles to first item - NO BLUE BACKGROUND
        firstItem.classList.add('active');
        firstItem.style.border = '2px solid #2563eb';
        firstItem.style.backgroundColor = 'white';
        firstItem.style.color = '#374151';
        firstItem.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.1)';
        
        const span = firstItem.querySelector('span');
        if (span) {
            span.style.color = '#374151';
            span.style.opacity = '1';
            span.style.visibility = 'visible';
            span.style.display = 'block';
            span.style.fontWeight = '600';
        }
        
        const icon = firstItem.querySelector('.business-icon');
        if (icon) {
            icon.style.color = '#2563eb';
            icon.style.backgroundColor = 'rgba(37, 99, 235, 0.15)';
            icon.style.border = '2px solid #2563eb';
            icon.style.opacity = '1';
            icon.style.visibility = 'visible';
            icon.style.display = 'flex';
        }
    }
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

// Cookie banner integration
function showCookieBanner() {
    if (window.cookieBanner) {
        window.cookieBanner.revokeConsent();
    }
}

// Add click handler for cookie settings link
document.addEventListener('DOMContentLoaded', function() {
    const cookieSettingsLinks = document.querySelectorAll('.cookie-settings-link');
    cookieSettingsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.cookieBanner) {
                window.cookieBanner.revokeConsent();
            }
        });
    });
}); 

/* ===========================================
   ENHANCED NAVIGATION ANIMATIONS
   =========================================== */
function initNavigationAnimations() {
    // Add staggered animation to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate navigation on page load
    const navbar = document.querySelector('.navbar');
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-100%)';
    
    setTimeout(() => {
        navbar.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);
    
    // Enhanced smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
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
    
    // Add hover sound effect (optional)
    if (window.matchMedia('(min-width: 769px)').matches) {
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                // Add subtle hover feedback
                this.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = '';
                }
            });
        });
    }
    
    // Add breadcrumb indicator
    initBreadcrumbIndicator();
}

/* ===========================================
   BREADCRUMB INDICATOR
   =========================================== */
function initBreadcrumbIndicator() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create breadcrumb indicator
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'nav-breadcrumb';
    navbar.appendChild(breadcrumb);
    
    // Update breadcrumb position
    function updateBreadcrumb() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const rect = activeLink.getBoundingClientRect();
            const navRect = navbar.getBoundingClientRect();
            
            breadcrumb.style.left = `${rect.left - navRect.left}px`;
            breadcrumb.style.width = `${rect.width}px`;
            breadcrumb.style.opacity = '1';
        } else {
            breadcrumb.style.opacity = '0';
        }
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateBreadcrumb);
    
    // Update on resize
    window.addEventListener('resize', updateBreadcrumb);
    
    // Initial update
    setTimeout(updateBreadcrumb, 100);
} 