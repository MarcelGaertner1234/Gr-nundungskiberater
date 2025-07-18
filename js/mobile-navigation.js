/**
 * Mobile Navigation System
 * Handles responsive navigation, mobile menu, and user interactions
 * Version: 2.1.0 with i18n support
 */

class MobileNavigation {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.isMenuOpen = false;
        
        // Navigation menu items with i18n keys
        this.defaultMenuItems = [
            { id: 'overview', labelKey: 'mobile_navigation.menu_items.overview', icon: '📊', href: '#overview', active: true },
            { id: 'idea-eval', labelKey: 'common.idea_evaluation', icon: '💡', href: '#idea-evaluation' },
            { id: 'businessplan', labelKey: 'common.business_plan', icon: '📋', href: '#businessplan' },
            { id: 'legal-advisor', labelKey: 'common.legal_advisor', icon: '⚖️', href: '#legal' },
            { id: 'ai-assistant', labelKey: 'common.ai_assistant', icon: '🤖', href: '#ai-assistant' },
            { id: 'funding', labelKey: 'mobile_navigation.menu_items.funding', icon: '💰', href: '#funding' },
            { id: 'progress', labelKey: 'common.progress', icon: '📈', href: '#progress' },
            { id: 'calendar', labelKey: 'common.calendar', icon: '📅', href: '#calendar' },
            { id: 'profile', labelKey: 'common.profile', icon: '👤', href: '#profile' }
        ];
        
        // Different menu structures for different user types
        this.adminMenuItems = [
            { id: 'overview', labelKey: 'mobile_navigation.menu_items.overview', icon: '📊', href: '#overview', active: true },
            { id: 'users', labelKey: 'admin_dashboard.navigation.users', icon: '👥', href: '#users' },
            { id: 'appointments', labelKey: 'admin_dashboard.navigation.appointments', icon: '📅', href: '#appointments' },
            { id: 'documents', labelKey: 'admin_dashboard.navigation.documents', icon: '📄', href: '#documents' },
            { id: 'analytics', labelKey: 'admin_dashboard.navigation.analytics', icon: '📊', href: '#analytics' },
            { id: 'settings', labelKey: 'common.settings', icon: '⚙️', href: '#settings' }
        ];
        
        this.guestMenuItems = [
            { id: 'overview', labelKey: 'mobile_navigation.menu_items.overview', icon: '📊', href: '#overview', active: true },
            { id: 'pricing', labelKey: 'common.pricing', icon: '💳', href: '#pricing' },
            { id: 'about', labelKey: 'common.about', icon: 'ℹ️', href: '#about' },
            { id: 'login', labelKey: 'common.login', icon: '🔑', href: 'login.html' }
        ];
        
        // Service navigation for dashboard
        this.serviceMenuItems = [
            { id: 'overview', labelKey: 'mobile_navigation.menu_items.overview', icon: '📊', href: '#overview', active: true },
            { id: 'idea-development', labelKey: 'dashboard.service_nav.idea_development', icon: '💡', href: '#idea-development' },
            { id: 'business-planning', labelKey: 'dashboard.service_nav.business_planning', icon: '📋', href: '#business-planning' },
            { id: 'legal-setup', labelKey: 'dashboard.service_nav.legal_setup', icon: '⚖️', href: '#legal-setup' },
            { id: 'funding', labelKey: 'mobile_navigation.menu_items.funding', icon: '💰', href: '#funding' },
            { id: 'market-research', labelKey: 'dashboard.service_nav.market_research', icon: '🔍', href: '#market-research' },
            { id: 'ai-tools', labelKey: 'dashboard.service_nav.ai_tools', icon: '🤖', href: '#ai-tools' },
            { id: 'appointments', labelKey: 'admin_dashboard.navigation.appointments', icon: '📅', href: '#appointments' },
            { id: 'documents', labelKey: 'admin_dashboard.navigation.documents', icon: '📁', href: '#documents' },
            { id: 'progress-tracking', labelKey: 'dashboard.service_nav.progress_tracking', icon: '📈', href: '#progress' },
            { id: 'check-funding', labelKey: 'mobile_navigation.menu_items.funding', icon: '💰', href: '#funding' },
            { id: 'consultations', labelKey: 'dashboard.service_nav.consultations', icon: '💬', href: '#consultations' },
            { id: 'resources', labelKey: 'dashboard.service_nav.resources', icon: '📚', href: '#resources' }
        ];
        
        this.init();
    }
    
    init() {
        this.createMobileNav();
        this.bindEvents();
        this.updateUserInfo();
        this.initializeMenuItems();
        this.setupResponsiveMenu();
        
        // Initialize after i18n is loaded
        document.addEventListener('i18nReady', () => {
            this.updateLanguage();
        });
    }
    
    createMobileNav() {
        const existingNav = document.querySelector('.mobile-nav-container');
        if (existingNav) return;
        
        // Create user info with i18n placeholders
        const currentUser = this.getCurrentUser();
        const userName = currentUser ? currentUser.name : 'mobile_navigation.user.name';
        const userRole = currentUser ? currentUser.role : 'mobile_navigation.user.role';
        
        const mobileNavHTML = `
            <div class="mobile-nav-container">
                <div class="mobile-nav-header">
                    <div class="user-info" id="mobileUserInfo">
                        <div class="user-avatar" id="mobileUserAvatar">
                            ${currentUser ? currentUser.name.charAt(0).toUpperCase() : 'M'}
                        </div>
                        <div class="user-details">
                            <div class="user-name" id="mobileUserName" data-i18n="${currentUser ? '' : 'mobile_navigation.user.name'}">${userName}</div>
                            <div class="user-role" id="mobileUserRole" data-i18n="${currentUser ? '' : 'mobile_navigation.user.role'}">${userRole}</div>
                        </div>
                    </div>
                    <button class="mobile-nav-close" id="mobileNavClose">×</button>
                </div>
                
                <nav class="mobile-nav-menu" id="mobileNavMenu">
                    <!-- Menu items will be populated by JavaScript -->
                </nav>
                
                <div class="mobile-nav-footer">
                    <button class="nav-footer-btn theme-toggle-mobile" onclick="toggleTheme()">
                        <span class="nav-btn-icon">🌙</span>
                        <span class="nav-btn-text" data-i18n="common.theme_toggle">Theme</span>
                    </button>
                    <button class="nav-footer-btn language-toggle-mobile" onclick="toggleLanguage()">
                        <span class="nav-btn-icon">🌐</span>
                        <span class="nav-btn-text" data-i18n="common.language">Sprache</span>
                    </button>
                    <button class="nav-footer-btn logout-btn-mobile" onclick="this.handleLogout()">
                        <span class="nav-btn-icon">🚪</span>
                        <span class="nav-btn-text" data-i18n="common.logout">Abmelden</span>
                    </button>
                </div>
            </div>
            <div class="mobile-nav-overlay" id="mobileNavOverlay"></div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', mobileNavHTML);
    }
    
    initializeMenuItems() {
        const menuContainer = document.getElementById('mobileNavMenu');
        if (!menuContainer) return;
        
        const userType = this.getUserType();
        let menuItems = this.defaultMenuItems;
        
        switch (userType) {
            case 'admin':
                menuItems = this.adminMenuItems;
                break;
            case 'service':
                menuItems = this.serviceMenuItems;
                break;
            case 'guest':
                menuItems = this.guestMenuItems;
                break;
            default:
                menuItems = this.defaultMenuItems;
        }
        
        menuContainer.innerHTML = menuItems.map(item => `
            <a href="${item.href}" class="mobile-nav-item ${item.active ? 'active' : ''}" 
               data-nav="${item.id}">
                <span class="nav-item-icon">${item.icon}</span>
                <span class="nav-item-text" data-i18n="${item.labelKey}">
                    ${this.getI18nText(item.labelKey)}
                </span>
            </a>
        `).join('');
        
        this.bindMenuEvents();
    }
    
    getI18nText(key) {
        // Get text from i18n or return fallback
        if (typeof i18nManager !== 'undefined' && i18nManager.t) {
            return i18nManager.t(key);
        }
        
        // Fallback texts
        const fallbacks = {
            'mobile_navigation.menu_items.overview': 'Übersicht',
            'mobile_navigation.menu_items.funding': 'Förderungen',
            'mobile_navigation.user.name': 'Marcel Gärtner',
            'mobile_navigation.user.role': 'Gründer',
            'common.logout': 'Abmelden'
        };
        
        return fallbacks[key] || key;
    }
    
    updateLanguage() {
        // Update all menu items when language changes
        this.initializeMenuItems();
        
        // Update user info if needed
        const userNameEl = document.getElementById('mobileUserName');
        const userRoleEl = document.getElementById('mobileUserRole');
        
        if (userNameEl && userNameEl.hasAttribute('data-i18n')) {
            userNameEl.textContent = this.getI18nText(userNameEl.getAttribute('data-i18n'));
        }
        
        if (userRoleEl && userRoleEl.hasAttribute('data-i18n')) {
            userRoleEl.textContent = this.getI18nText(userRoleEl.getAttribute('data-i18n'));
        }
    }
    
    bindEvents() {
        // Mobile menu toggle
        document.addEventListener('click', (e) => {
            if (e.target.matches('.mobile-menu-btn, .mobile-menu-btn *')) {
                this.toggleMobileMenu();
            }
            
            if (e.target.matches('#mobileNavClose, #mobileNavOverlay')) {
                this.closeMobileMenu();
            }
        });
        
        // Escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }
    
    bindMenuEvents() {
        const menuItems = document.querySelectorAll('.mobile-nav-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Remove active state from all items
                menuItems.forEach(i => i.classList.remove('active'));
                
                // Add active state to clicked item
                item.classList.add('active');
                
                // Close mobile menu
                this.closeMobileMenu();
                
                // Track navigation
                this.trackNavigation(item.dataset.nav);
            });
        });
    }
    
    toggleMobileMenu() {
        const navContainer = document.querySelector('.mobile-nav-container');
        const overlay = document.getElementById('mobileNavOverlay');
        
        if (!navContainer || !overlay) return;
        
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            navContainer.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            navContainer.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        const navContainer = document.querySelector('.mobile-nav-container');
        const overlay = document.getElementById('mobileNavOverlay');
        
        if (!navContainer || !overlay) return;
        
        this.isMenuOpen = false;
        navContainer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupResponsiveMenu() {
        // Add mobile menu button to existing navigation
        const existingNav = document.querySelector('.nav, .admin-nav, .header-nav');
        if (existingNav && !existingNav.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = `
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            `;
            
            existingNav.appendChild(mobileMenuBtn);
        }
    }
    
    getCurrentUser() {
        // Get current user from localStorage or API
        try {
            const userData = localStorage.getItem('currentUser');
            if (userData) {
                return JSON.parse(userData);
            }
        } catch (error) {
            console.warn('Could not parse user data:', error);
        }
        
        return null;
    }
    
    updateUserInfo() {
        const user = this.getCurrentUser();
        const userInfoEl = document.getElementById('mobileUserInfo');
        const userAvatarEl = document.getElementById('mobileUserAvatar');
        const userNameEl = document.getElementById('mobileUserName');
        const userRoleEl = document.getElementById('mobileUserRole');
        
        if (user && userInfoEl) {
            userInfoEl.style.display = 'flex';
            
            if (userAvatarEl) {
                userAvatarEl.textContent = user.name ? user.name.charAt(0).toUpperCase() : 'U';
            }
            
            if (userNameEl) {
                userNameEl.textContent = user.name || this.getI18nText('mobile_navigation.user.name');
                userNameEl.removeAttribute('data-i18n');
            }
            
            if (userRoleEl) {
                userRoleEl.textContent = user.role || this.getI18nText('mobile_navigation.user.role');
                userRoleEl.removeAttribute('data-i18n');
            }
            
            this.isLoggedIn = true;
        } else if (userInfoEl) {
            userInfoEl.style.display = 'none';
            this.isLoggedIn = false;
        }
    }
    
    getUserType() {
        const currentUser = this.getCurrentUser();
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('admin')) {
            return 'admin';
        }
        
        if (currentPath.includes('dashboard') || currentPath.includes('service')) {
            return 'service';
        }
        
        if (!currentUser || !this.isLoggedIn) {
            return 'guest';
        }
        
        return 'user';
    }
    
    handleLogout() {
        if (typeof i18nManager !== 'undefined' && i18nManager.t) {
            const confirmMessage = i18nManager.t('mobile_navigation.logout_confirm');
            if (confirm(confirmMessage)) {
                this.performLogout();
            }
        } else {
            // Fallback
            const confirmMessage = this.getI18nText('messages.confirm_logout') || 'Möchten Sie sich wirklich abmelden?';
        if (confirm(confirmMessage)) {
                this.performLogout();
            }
        }
    }
    
    performLogout() {
        // Clear user data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        
        // Redirect to login
        window.location.href = 'login.html';
    }
    
    trackNavigation(navId) {
        // Track navigation events for analytics
        if (window.analytics && window.analytics.track) {
            window.analytics.track('Mobile Navigation Click', {
                navItem: navId,
                userType: this.getUserType(),
                timestamp: new Date().toISOString()
            });
        }
        
        console.log(`Mobile navigation: ${navId}`);
    }
    
    setActiveMenuItem(itemId) {
        const menuItems = document.querySelectorAll('.mobile-nav-item');
        menuItems.forEach(item => {
            item.classList.toggle('active', item.dataset.nav === itemId);
        });
    }
    
    updateNotificationBadge(count) {
        // Add notification badges to menu items
        const notificationItems = ['appointments', 'documents', 'messages'];
        
        notificationItems.forEach(itemId => {
            const menuItem = document.querySelector(`[data-nav="${itemId}"]`);
            if (menuItem) {
                let badge = menuItem.querySelector('.notification-badge');
                
                if (count > 0) {
                    if (!badge) {
                        badge = document.createElement('span');
                        badge.className = 'notification-badge';
                        menuItem.appendChild(badge);
                    }
                    badge.textContent = count > 99 ? '99+' : count;
                } else if (badge) {
                    badge.remove();
                }
            }
        });
    }
    
    destroy() {
        // Clean up event listeners and DOM elements
        const navContainer = document.querySelector('.mobile-nav-container');
        const overlay = document.getElementById('mobileNavOverlay');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navContainer) navContainer.remove();
        if (overlay) overlay.remove();
        if (menuBtn) menuBtn.remove();
        
        document.body.style.overflow = '';
        this.isMenuOpen = false;
    }
}

// Initialize mobile navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mobileNav = new MobileNavigation();
});

// Re-initialize when i18n is ready
document.addEventListener('i18nReady', () => {
    if (window.mobileNav) {
        window.mobileNav.updateLanguage();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileNavigation;
}