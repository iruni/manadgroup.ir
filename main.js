/* ========================================
   پادکار - اسکریپت‌های اصلی
   Padkar Enterprise Platform Scripts
   ======================================== */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // Font Awesome Fallback Check
    checkFontAwesome();
    
    // Initialize Navbar Scroll Effect
    initNavbarScroll();
    
    // Initialize Smooth Scroll
    initSmoothScroll();
    
    // Initialize Stats Counter
    initStatsCounter();
});

/**
 * Check if Font Awesome loaded, if not load from another CDN
 */
function checkFontAwesome() {
    var testIcon = document.createElement('i');
    testIcon.className = 'fas fa-check';
    testIcon.style.display = 'none';
    document.body.appendChild(testIcon);
    
    var computed = window.getComputedStyle(testIcon, ':before');
    if (computed.fontFamily.indexOf('Font Awesome') === -1 && 
        computed.fontFamily.indexOf('FontAwesome') === -1) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://use.fontawesome.com/releases/v6.5.1/css/all.css';
        document.head.appendChild(link);
    }
    document.body.removeChild(testIcon);
}

/**
 * Navbar scroll effect - adds background on scroll
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('py-2');
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Stats counter animation using Intersection Observer
 */
function initStatsCounter() {
    var observerOptions = {
        threshold: 0.5
    };

    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(function(counter) {
                    counter.style.opacity = '1';
                });
            }
        });
    }, observerOptions);

    var statsSection = document.getElementById('stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
}

/**
 * Mobile menu toggle (if needed in future)
 */
function toggleMobileMenu() {
    var mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

/**
 * Form validation helper
 */
function validateForm(formId) {
    var form = document.getElementById(formId);
    if (!form) return false;
    
    var inputs = form.querySelectorAll('input[required], textarea[required]');
    var isValid = true;
    
    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

/**
 * Floating Contact Button Toggle
 */
function initFloatingContact() {
    const toggle = document.getElementById('contact-toggle');
    const options = document.getElementById('contact-options');
    const iconChat = document.getElementById('contact-icon-chat');
    const iconClose = document.getElementById('contact-icon-close');
    
    if (!toggle || !options) return;
    
    let isOpen = false;
    
    toggle.addEventListener('click', function() {
        isOpen = !isOpen;
        
        if (isOpen) {
            options.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
            options.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
            iconChat.classList.add('opacity-0', 'rotate-90');
            iconClose.classList.remove('opacity-0');
            iconClose.classList.add('rotate-90');
        } else {
            options.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            options.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            iconChat.classList.remove('opacity-0', 'rotate-90');
            iconClose.classList.add('opacity-0');
            iconClose.classList.remove('rotate-90');
        }
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (isOpen && !e.target.closest('#floating-contact')) {
            isOpen = false;
            options.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            options.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            iconChat.classList.remove('opacity-0', 'rotate-90');
            iconClose.classList.add('opacity-0');
            iconClose.classList.remove('rotate-90');
        }
    });
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initFloatingContact();
});
