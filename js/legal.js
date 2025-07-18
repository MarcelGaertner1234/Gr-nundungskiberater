/**
 * Legal Pages JavaScript
 * Handles theme toggle and legal page interactions
 */

// Initialize legal page
document.addEventListener('DOMContentLoaded', function() {
    initializeLegalPage();
});

// Initialize legal page functionality
function initializeLegalPage() {
    setupThemeToggle();
    loadTheme();
    setupSmoothScrolling();
    setupActiveNavigation();
    setupPrintFunctionality();
}

// Setup theme toggle
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Remove any existing click handlers to prevent duplicates
        const newToggle = themeToggle.cloneNode(true);
        themeToggle.parentNode.replaceChild(newToggle, themeToggle);
        
        // Add fresh click handler
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition class to prevent flashing
    document.documentElement.classList.add('theme-transitioning');
    
    // Set theme on both html and body
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle button
    updateThemeToggleIcon(newTheme);
    
    // Remove transition class after animation
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
    }, 300);
}

// Load theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    // Set theme on both html and body
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

// Update theme toggle icon
function updateThemeToggleIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Icons are controlled by CSS, but we'll ensure they're properly set
    // The CSS already handles the opacity based on data-theme attribute
    // This function is kept for compatibility but the CSS does the actual work
    
    // Force a repaint to ensure CSS updates are applied
    if (sunIcon && moonIcon) {
        void sunIcon.offsetHeight;
        void moonIcon.offsetHeight;
    }
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup active navigation highlighting
function setupActiveNavigation() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (currentPath.includes(itemPath)) {
            item.classList.add('active');
        }
    });
}

// Setup print functionality
function setupPrintFunctionality() {
    // Add print button if needed
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', printDocument);
    }
    
    // Add keyboard shortcut for printing
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            printDocument();
        }
    });
}

// Print document
function printDocument() {
    // Show print-specific styles
    document.body.classList.add('print-mode');
    
    // Print
    window.print();
    
    // Remove print-specific styles after printing
    setTimeout(() => {
        document.body.classList.remove('print-mode');
    }, 100);
}

// Add section navigation
function addSectionNavigation() {
    const sections = document.querySelectorAll('.legal-section');
    const navContainer = document.querySelector('.legal-nav');
    
    if (sections.length > 5 && navContainer) {
        const sectionNav = document.createElement('div');
        sectionNav.className = 'section-nav';
        sectionNav.innerHTML = '<h4>Schnellnavigation</h4>';
        
        const sectionList = document.createElement('ul');
        sectionList.className = 'section-list';
        
        sections.forEach((section, index) => {
            const title = section.querySelector('h2').textContent;
            const sectionId = `section-${index}`;
            section.id = sectionId;
            
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="#${sectionId}">${title}</a>`;
            sectionList.appendChild(listItem);
        });
        
        sectionNav.appendChild(sectionList);
        navContainer.appendChild(sectionNav);
    }
}

// Track legal page interactions
function trackLegalPageView() {
    const pageName = document.title;
    const timestamp = new Date().toISOString();
    
    // Store page view (in real app, this would go to analytics)
    const pageViews = JSON.parse(localStorage.getItem('legalPageViews') || '[]');
    pageViews.push({
        page: pageName,
        timestamp: timestamp,
        userAgent: navigator.userAgent
    });
    
    // Keep only last 100 views
    if (pageViews.length > 100) {
        pageViews.splice(0, pageViews.length - 100);
    }
    
    localStorage.setItem('legalPageViews', JSON.stringify(pageViews));
    
    console.log('Legal page view tracked:', pageName);
}

// Initialize legal page tracking
document.addEventListener('DOMContentLoaded', function() {
    trackLegalPageView();
});

// Export functions for use in other scripts
window.LegalPage = {
    toggleTheme: toggleTheme,
    printDocument: printDocument
};

// CSS for print mode
const printStyles = `
    @media print {
        .header,
        .footer,
        .legal-nav,
        .theme-toggle,
        .btn {
            display: none !important;
        }
        
        .legal-main {
            padding-top: 0 !important;
        }
        
        .legal-document {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
        }
        
        .legal-section {
            page-break-inside: avoid;
            margin-bottom: 24px !important;
        }
        
        .legal-section h2 {
            page-break-after: avoid;
        }
        
        body {
            font-size: 12pt !important;
            line-height: 1.5 !important;
        }
        
        .info-grid {
            display: block !important;
        }
        
        .info-item {
            margin-bottom: 16px !important;
            border: 1px solid #ccc !important;
            padding: 12px !important;
        }
    }
`;

// Add print styles to document
const printStyleSheet = document.createElement('style');
printStyleSheet.textContent = printStyles;
document.head.appendChild(printStyleSheet);