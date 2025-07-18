/**
 * Legal Page Specific JavaScript
 * Handles mobile menu and URL hash navigation for legal pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const mobileNav = document.getElementById('mobileNav');
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const mobileNav = document.getElementById('mobileNav');
            const mobileToggle = document.getElementById('mobileMenuToggle');
            if (mobileNav) mobileNav.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
        });
    });
    
    // Handle tab navigation based on URL hash
    function handleTabNavigation() {
        const hash = window.location.hash;
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        if (hash === '#datenschutz') {
            const privacyTab = document.querySelector('.nav-item[href="datenschutz.html"]');
            if (privacyTab) privacyTab.classList.add('active');
            // Redirect to privacy page
            window.location.href = 'datenschutz.html';
        } else if (hash === '#agb') {
            const termsTab = document.querySelector('.nav-item[href="agb.html"]');
            if (termsTab) termsTab.classList.add('active');
            // Redirect to terms page
            window.location.href = 'agb.html';
        } else {
            // Ensure the correct tab is active based on current page
            const currentPage = window.location.pathname.split('/').pop();
            const activeTab = document.querySelector(`.nav-item[href="${currentPage}"]`);
            if (activeTab) activeTab.classList.add('active');
        }
    }
    
    // Run on page load
    handleTabNavigation();
    window.addEventListener('hashchange', handleTabNavigation);
});