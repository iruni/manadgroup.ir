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
 * Floating Contact Widget - Professional
 */
function initFloatingContact() {
    const toggle = document.getElementById('contact-toggle');
    const options = document.getElementById('contact-options');
    const tooltip = document.getElementById('contact-tooltip');
    const badge = document.getElementById('contact-badge');
    const iconChat = document.getElementById('contact-icon-chat');
    const iconClose = document.getElementById('contact-icon-close');
    
    if (!toggle || !options) return;
    
    let isOpen = false;
    let tooltipShown = false;
    
    // Show tooltip after 3 seconds
    setTimeout(function() {
        if (!isOpen && !tooltipShown && tooltip) {
            tooltip.classList.remove('opacity-0', 'translate-y-2');
            tooltip.classList.add('opacity-100', 'translate-y-0');
            tooltipShown = true;
        }
    }, 3000);
    
    // Hide tooltip after 10 seconds
    setTimeout(function() {
        hideTooltip();
    }, 10000);
    
    function hideTooltip() {
        if (tooltip) {
            tooltip.classList.add('opacity-0', 'translate-y-2');
            tooltip.classList.remove('opacity-100', 'translate-y-0');
        }
    }
    
    function openOptions() {
        isOpen = true;
        hideTooltip();
        if (badge) badge.style.display = 'none';
        options.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4', 'scale-95');
        options.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
        if (iconChat) iconChat.classList.add('opacity-0', 'rotate-90', 'scale-0');
        if (iconClose) {
            iconClose.classList.remove('opacity-0');
            iconClose.classList.add('rotate-180');
        }
    }
    
    function closeOptions() {
        isOpen = false;
        options.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4', 'scale-95');
        options.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
        if (iconChat) iconChat.classList.remove('opacity-0', 'rotate-90', 'scale-0');
        if (iconClose) {
            iconClose.classList.add('opacity-0');
            iconClose.classList.remove('rotate-180');
        }
    }
    
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        hideTooltip();
        if (isOpen) {
            closeOptions();
        } else {
            openOptions();
        }
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (isOpen && !e.target.closest('#floating-contact')) {
            closeOptions();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) {
            closeOptions();
        }
    });
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initFloatingContact();
});


/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        progressBar.style.transform = 'scaleX(' + scrollPercent + ')';
    });
}

/**
 * Section Navigation Dots
 */
function initSectionNav() {
    const dots = document.querySelectorAll('.section-dot');
    const sections = ['hero', 'stats', 'problem-solution', 'modules', 'ims', 'features', 'why-us', 'industries', 'timeline', 'comparison', 'faq', 'cta', 'contact'];
    
    if (dots.length === 0) return;
    
    // Click handler for dots
    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Update active dot on scroll
    var observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };
    
    var sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var sectionId = entry.target.id;
                dots.forEach(function(dot) {
                    if (dot.getAttribute('data-section') === sectionId) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(function(sectionId) {
        var section = document.getElementById(sectionId);
        if (section) {
            sectionObserver.observe(section);
        }
    });
}

/**
 * Keyboard Navigation for Sections
 */
function initKeyboardNav() {
    var sections = document.querySelectorAll('[class*="snap-section"]');
    var currentIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            currentIndex = Math.min(currentIndex + 1, sections.length - 1);
            sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            currentIndex = Math.max(currentIndex - 1, 0);
            sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Initialize all scroll features
document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initSectionNav();
    initKeyboardNav();
});


/**
 * Theme Switcher - Dark/Light Mode
 * Saves preference to localStorage for persistence across pages
 */
function initThemeSwitcher() {
    const toggle = document.getElementById('theme-toggle');
    const iconDark = document.getElementById('theme-icon-dark');
    const iconLight = document.getElementById('theme-icon-light');
    
    if (!toggle) return;
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('manad-theme') || 'dark';
    applyTheme(savedTheme);
    
    toggle.addEventListener('click', function() {
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('manad-theme', newTheme);
    });
    
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            if (iconDark) iconDark.classList.add('hidden');
            if (iconLight) iconLight.classList.remove('hidden');
        } else {
            document.body.classList.remove('light-theme');
            if (iconDark) iconDark.classList.remove('hidden');
            if (iconLight) iconLight.classList.add('hidden');
        }
    }
}

// Apply theme immediately on page load (before DOMContentLoaded)
(function() {
    const savedTheme = localStorage.getItem('manad-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
})();

// Initialize theme switcher
document.addEventListener('DOMContentLoaded', function() {
    initThemeSwitcher();
});
