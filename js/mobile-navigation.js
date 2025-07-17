// Mobile Navigation System - Comprehensive mobile navigation for all pages

// Global state
let mobileNavOpen = false;
let currentPage = 'dashboard';
let swipeStartX = 0;
let swipeStartY = 0;
let isSwipeEnabled = true;

// Navigation structure for different pages
const navigationStructure = {
    'dashboard': {
        title: 'Dashboard',
        sections: [
            {
                title: 'Dashboard',
                links: [
                    { id: 'overview', label: 'Übersicht', icon: '📊', href: '#overview', active: true },
                    { id: 'progress', label: 'Fortschritt', icon: '📈', href: '#progress' },
                    { id: 'documents', label: 'Dokumente', icon: '📄', href: '#documents' },
                    { id: 'appointments', label: 'Termine', icon: '📅', href: '#appointments' }
                ]
            },
            {
                title: 'Tools',
                links: [
                    { id: 'businessplan', label: 'Businessplan', icon: '📋', href: 'businessplan-creator.html' },
                    { id: 'funding', label: 'Förderungen', icon: '💰', href: '#funding' },
                    { id: 'ai-assistant', label: 'KI-Berater', icon: '🤖', href: '#ai-assistant' }
                ]
            },
            {
                title: 'Support',
                links: [
                    { id: 'help', label: 'Hilfe', icon: '❓', href: 'faq.html' },
                    { id: 'contact', label: 'Kontakt', icon: '📞', href: 'contact.html' }
                ]
            }
        ]
    },
    'businessplan': {
        title: 'Businessplan Creator',
        sections: [
            {
                title: 'Businessplan',
                links: [
                    { id: 'creator', label: 'Creator', icon: '📋', href: '#creator', active: true },
                    { id: 'templates', label: 'Vorlagen', icon: '📁', href: '#templates' },
                    { id: 'export', label: 'Export', icon: '📥', href: '#export' }
                ]
            },
            {
                title: 'Navigation',
                links: [
                    { id: 'dashboard', label: 'Dashboard', icon: '🏠', href: 'dashboard.html' },
                    { id: 'documents', label: 'Dokumente', icon: '📄', href: 'dashboard.html#documents' }
                ]
            }
        ]
    },
    'admin': {
        title: 'Admin Dashboard',
        sections: [
            {
                title: 'Administration',
                links: [
                    { id: 'overview', label: 'Übersicht', icon: '📊', href: '#overview', active: true },
                    { id: 'users', label: 'Nutzer', icon: '👥', href: '#users' },
                    { id: 'appointments', label: 'Termine', icon: '📅', href: '#appointments' },
                    { id: 'communication', label: 'Kommunikation', icon: '💬', href: '#communication' }
                ]
            },
            {
                title: 'System',
                links: [
                    { id: 'payments', label: 'Zahlungen', icon: '💳', href: '#payments' },
                    { id: 'analytics', label: 'Analytics', icon: '📈', href: '#analytics' },
                    { id: 'cancellations', label: 'Stornierungen', icon: '❌', href: '#cancellations' }
                ]
            }
        ]
    }
};

// Quick actions for different pages
const quickActions = {
    'dashboard': [
        { id: 'new-appointment', label: 'Termin buchen', icon: '📅', href: '#book-appointment' },
        { id: 'create-businessplan', label: 'Businessplan', icon: '📋', href: 'businessplan-creator.html' },
        { id: 'check-funding', label: 'Förderungen', icon: '💰', href: '#funding' },
        { id: 'ai-assistant', label: 'KI-Berater', icon: '🤖', href: '#ai-assistant' }
    ],
    'businessplan': [
        { id: 'new-plan', label: 'Neuer Plan', icon: '➕', href: '#new-plan' },
        { id: 'templates', label: 'Vorlagen', icon: '📁', href: '#templates' },
        { id: 'export', label: 'Export', icon: '📥', href: '#export' },
        { id: 'save', label: 'Speichern', icon: '💾', href: '#save' }
    ],
    'admin': [
        { id: 'new-user', label: 'Neuer Nutzer', icon: '👤', href: '#new-user' },
        { id: 'new-appointment', label: 'Termin', icon: '📅', href: '#new-appointment' },
        { id: 'send-message', label: 'Nachricht', icon: '💬', href: '#send-message' },
        { id: 'export-data', label: 'Export', icon: '📥', href: '#export-data' }
    ]
};

// User information (would come from authentication system)
const userInfo = {
    name: 'Marcel Gärtner',
    email: 'marcel@example.com',
    initials: 'MG',
    role: 'Gründer',
    notifications: 3
};

// Initialize mobile navigation
function initializeMobileNavigation() {
    console.log('Initializing Mobile Navigation...');
    
    // Detect current page
    detectCurrentPage();
    
    // Create mobile navigation elements
    createMobileNavigation();
    
    // Set up event listeners
    setupMobileNavEventListeners();
    
    // Set up swipe gestures
    setupSwipeGestures();
    
    console.log('Mobile Navigation initialized for page:', currentPage);
}

// Detect current page based on URL or body class
function detectCurrentPage() {
    const pathname = window.location.pathname;
    const bodyClass = document.body.className;
    
    if (pathname.includes('admin-dashboard') || bodyClass.includes('admin')) {
        currentPage = 'admin';
    } else if (pathname.includes('businessplan-creator') || bodyClass.includes('businessplan')) {
        currentPage = 'businessplan';
    } else {
        currentPage = 'dashboard';
    }
}

// Create mobile navigation elements
function createMobileNavigation() {
    // Create mobile toggle button
    createMobileToggleButton();
    
    // Create mobile navigation overlay and menu
    createMobileNavigationMenu();
    
    // Populate navigation content
    populateNavigationContent();
}

// Create mobile toggle button
function createMobileToggleButton() {
    const header = document.querySelector('.header-content');
    if (!header) return;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-nav-toggle';
    toggleButton.id = 'mobileNavToggle';
    toggleButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insert before header actions
    const headerActions = header.querySelector('.header-actions');
    if (headerActions) {
        headerActions.insertBefore(toggleButton, headerActions.firstChild);
    } else {
        header.appendChild(toggleButton);
    }
}

// Create mobile navigation menu
function createMobileNavigationMenu() {
    const existingMenu = document.getElementById('mobileNavMenu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.id = 'mobileNavOverlay';
    
    const menu = document.createElement('div');
    menu.className = 'mobile-nav-menu';
    menu.id = 'mobileNavMenu';
    
    // Create menu structure
    menu.innerHTML = `
        <div class="mobile-nav-content">
            <div class="mobile-nav-header">
                <a href="#" class="mobile-nav-logo">
                    <div class="mobile-nav-logo-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                        </svg>
                    </div>
                    <span class="mobile-nav-logo-text">KI Konzept Builder</span>
                </a>
                <button class="mobile-nav-close" id="mobileNavClose">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <div class="mobile-nav-search">
                <div class="mobile-nav-search-box">
                    <svg class="mobile-nav-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input type="text" class="mobile-nav-search-input" placeholder="Suchen..." id="mobileNavSearchInput">
                </div>
            </div>
            
            <div class="mobile-nav-quick-actions">
                <div class="mobile-nav-quick-actions-title">Schnellzugriff</div>
                <div class="mobile-nav-quick-actions-grid" id="mobileNavQuickActions">
                    <!-- Quick actions will be populated here -->
                </div>
            </div>
            
            <div class="mobile-nav-main">
                <div class="mobile-nav-links" id="mobileNavLinks">
                    <!-- Navigation links will be populated here -->
                </div>
            </div>
            
            <div class="mobile-nav-user">
                <div class="mobile-nav-user-info">
                    <div class="mobile-nav-user-avatar">${userInfo.initials}</div>
                    <div class="mobile-nav-user-details">
                        <div class="mobile-nav-user-name">${userInfo.name}</div>
                        <div class="mobile-nav-user-email">${userInfo.email}</div>
                    </div>
                </div>
                <div class="mobile-nav-user-actions">
                    <button class="mobile-nav-user-action" onclick="openUserProfile()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Profil
                    </button>
                    <button class="mobile-nav-user-action" onclick="toggleTheme()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        Theme
                    </button>
                    <button class="mobile-nav-user-action" onclick="logout()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Abmelden
                    </button>
                </div>
            </div>
            
            <div class="mobile-nav-footer">
                <div class="mobile-nav-footer-text">© 2024 KI Konzept Builder</div>
                <div class="mobile-nav-footer-links">
                    <a href="impressum.html" class="mobile-nav-footer-link">Impressum</a>
                    <a href="datenschutz.html" class="mobile-nav-footer-link">Datenschutz</a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(menu);
}

// Populate navigation content
function populateNavigationContent() {
    const navStructure = navigationStructure[currentPage];
    const quickActionsData = quickActions[currentPage];
    
    // Populate quick actions
    const quickActionsContainer = document.getElementById('mobileNavQuickActions');
    if (quickActionsContainer && quickActionsData) {
        quickActionsContainer.innerHTML = quickActionsData.map(action => `
            <a href="${action.href}" class="mobile-nav-quick-action" onclick="handleQuickAction('${action.id}')">
                <div class="mobile-nav-quick-action-icon">${action.icon}</div>
                <div class="mobile-nav-quick-action-text">${action.label}</div>
            </a>
        `).join('');
    }
    
    // Populate navigation links
    const navLinksContainer = document.getElementById('mobileNavLinks');
    if (navLinksContainer && navStructure) {
        navLinksContainer.innerHTML = navStructure.sections.map(section => `
            <div class="mobile-nav-section">
                <div class="mobile-nav-section-title">${section.title}</div>
                ${section.links.map(link => `
                    <div class="mobile-nav-link-wrapper">
                        <a href="${link.href}" class="mobile-nav-link ${link.active ? 'active' : ''}" data-nav-id="${link.id}">
                            <div class="mobile-nav-link-icon">${link.icon}</div>
                            <span>${link.label}</span>
                            ${link.badge ? `<span class="mobile-nav-badge">${link.badge}</span>` : ''}
                        </a>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }
}

// Set up event listeners
function setupMobileNavEventListeners() {
    const toggleButton = document.getElementById('mobileNavToggle');
    const closeButton = document.getElementById('mobileNavClose');
    const overlay = document.getElementById('mobileNavOverlay');
    const searchInput = document.getElementById('mobileNavSearchInput');
    
    // Toggle button
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMobileNav);
    }
    
    // Close button
    if (closeButton) {
        closeButton.addEventListener('click', closeMobileNav);
    }
    
    // Overlay click
    if (overlay) {
        overlay.addEventListener('click', closeMobileNav);
    }
    
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Navigation links
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('mobile-nav-link')) {
            handleNavLinkClick(e);
        }
    });
    
    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavOpen) {
            closeMobileNav();
        }
    });
    
    // Prevent body scroll when nav is open
    document.addEventListener('touchmove', function(e) {
        if (mobileNavOpen && !e.target.closest('.mobile-nav-menu')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Set up swipe gestures
function setupSwipeGestures() {
    const menu = document.getElementById('mobileNavMenu');
    if (!menu) return;
    
    menu.addEventListener('touchstart', handleSwipeStart, { passive: true });
    menu.addEventListener('touchmove', handleSwipeMove, { passive: true });
    menu.addEventListener('touchend', handleSwipeEnd, { passive: true });
}

// Handle swipe start
function handleSwipeStart(e) {
    if (!isSwipeEnabled) return;
    
    const touch = e.touches[0];
    swipeStartX = touch.clientX;
    swipeStartY = touch.clientY;
}

// Handle swipe move
function handleSwipeMove(e) {
    if (!isSwipeEnabled) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeStartX;
    const deltaY = touch.clientY - swipeStartY;
    
    // Only handle horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 100) {
        closeMobileNav();
    }
}

// Handle swipe end
function handleSwipeEnd(e) {
    swipeStartX = 0;
    swipeStartY = 0;
}

// Toggle mobile navigation
function toggleMobileNav() {
    if (mobileNavOpen) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
}

// Open mobile navigation
function openMobileNav() {
    console.log('Opening mobile navigation...');
    
    const toggleButton = document.getElementById('mobileNavToggle');
    const overlay = document.getElementById('mobileNavOverlay');
    const menu = document.getElementById('mobileNavMenu');
    
    mobileNavOpen = true;
    
    // Update button state
    if (toggleButton) {
        toggleButton.classList.add('active');
    }
    
    // Show overlay
    if (overlay) {
        overlay.classList.add('active');
    }
    
    // Show menu
    if (menu) {
        menu.classList.add('active');
        menu.classList.add('animating-in');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            menu.classList.remove('animating-in');
        }, 300);
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first link for accessibility
    const firstLink = menu?.querySelector('.mobile-nav-link');
    if (firstLink) {
        setTimeout(() => firstLink.focus(), 300);
    }
}

// Close mobile navigation
function closeMobileNav() {
    console.log('Closing mobile navigation...');
    
    const toggleButton = document.getElementById('mobileNavToggle');
    const overlay = document.getElementById('mobileNavOverlay');
    const menu = document.getElementById('mobileNavMenu');
    
    mobileNavOpen = false;
    
    // Update button state
    if (toggleButton) {
        toggleButton.classList.remove('active');
    }
    
    // Hide overlay
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    // Hide menu
    if (menu) {
        menu.classList.add('animating-out');
        
        setTimeout(() => {
            menu.classList.remove('active');
            menu.classList.remove('animating-out');
        }, 300);
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Handle search input
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const navLinks = document.querySelectorAll('.mobile-nav-link');
    
    navLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        const wrapper = link.closest('.mobile-nav-link-wrapper');
        
        if (text.includes(query)) {
            wrapper.style.display = 'block';
        } else {
            wrapper.style.display = 'none';
        }
    });
    
    // Show/hide sections based on visible links
    const sections = document.querySelectorAll('.mobile-nav-section');
    sections.forEach(section => {
        const visibleLinks = section.querySelectorAll('.mobile-nav-link-wrapper:not([style*="display: none"])');
        section.style.display = visibleLinks.length > 0 ? 'block' : 'none';
    });
}

// Handle navigation link click
function handleNavLinkClick(e) {
    const link = e.target.closest('.mobile-nav-link');
    if (!link) return;
    
    const navId = link.dataset.navId;
    console.log('Navigation link clicked:', navId);
    
    // Update active state
    document.querySelectorAll('.mobile-nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    // Close mobile nav after navigation
    setTimeout(() => {
        closeMobileNav();
    }, 200);
}

// Handle quick action click
function handleQuickAction(actionId) {
    console.log('Quick action clicked:', actionId);
    
    // Add loading state
    LoadingStates?.showButtonLoading?.(event.target, 'Laden...');
    
    setTimeout(() => {
        LoadingStates?.hideButtonLoading?.(event.target);
        closeMobileNav();
    }, 1000);
}

// User profile actions
function openUserProfile() {
    console.log('Opening user profile...');
    closeMobileNav();
}

function logout() {
    console.log('Logging out...');
    if (confirm('Möchten Sie sich wirklich abmelden?')) {
        // In real implementation, would handle logout
        window.location.href = 'index.html';
    }
}

// Update navigation for current page
function updateNavigationForPage(page) {
    currentPage = page;
    populateNavigationContent();
}

// Add notification badge
function addNotificationBadge(navId, count) {
    const link = document.querySelector(`[data-nav-id="${navId}"]`);
    if (link) {
        const wrapper = link.closest('.mobile-nav-link-wrapper');
        let badge = wrapper.querySelector('.mobile-nav-badge');
        
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'mobile-nav-badge';
            wrapper.appendChild(badge);
        }
        
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Remove notification badge
function removeNotificationBadge(navId) {
    const link = document.querySelector(`[data-nav-id="${navId}"]`);
    if (link) {
        const wrapper = link.closest('.mobile-nav-link-wrapper');
        const badge = wrapper.querySelector('.mobile-nav-badge');
        if (badge) {
            badge.remove();
        }
    }
}

// Global exports for mobile navigation
window.MobileNavigation = {
    initialize: initializeMobileNavigation,
    open: openMobileNav,
    close: closeMobileNav,
    toggle: toggleMobileNav,
    updateForPage: updateNavigationForPage,
    addNotificationBadge,
    removeNotificationBadge
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileNavigation);
} else {
    initializeMobileNavigation();
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileNavOpen) {
        closeMobileNav();
    }
});

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        if (mobileNavOpen) {
            // Recalculate menu position after orientation change
            const menu = document.getElementById('mobileNavMenu');
            if (menu) {
                menu.style.height = '100vh';
            }
        }
    }, 100);
});