/* ==========================================================================
   UNIFIED THEME SYSTEM v1.0
   Behebt alle Dark Mode Rendering-Probleme durch einheitliches System
   
   Features:
   - Smooth Transitions ohne Flash
   - Local Storage Persistence
   - Cross-Page Consistency
   - Performance Optimiert
   ========================================================================== */

class ThemeSystem {
    constructor() {
        this.currentTheme = 'light';
        this.isTransitioning = false;
        this.transitionDuration = 300;
        this.hardRefreshMode = false;
        
        this.init();
    }
    
    init() {
        // Load saved theme from localStorage
        this.loadSavedTheme();
        
        // Apply theme immediately (prevents flash)
        this.applyTheme(this.currentTheme, false);
        
        // Setup theme toggle button
        this.setupThemeToggle();
        
        // Setup global event listeners
        this.setupEventListeners();
        
        // Debug info
        console.log('🎨 Theme System initialized:', this.currentTheme);
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        // Check system preference if no saved theme
        if (!savedTheme) {
            const prefersDark = window.matchMedia && 
                              window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        } else {
            this.currentTheme = savedTheme;
        }
    }
    

    
    toggleTheme() {
        if (this.isTransitioning) return;
        
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme, true);
    }
    
    applyTheme(theme, withTransition = true) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Add transition class if needed
        if (withTransition) {
            document.documentElement.classList.add('theme-transitioning');
        }
        
        // Apply theme to html element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Apply theme to body (fallback)
        document.body.setAttribute('data-theme', theme);
        
        // Update current theme
        this.currentTheme = theme;
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update toggle icon
        this.updateThemeIcon(theme);
        
        // Remove transition class after animation
        if (withTransition) {
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transitioning');
                this.isTransitioning = false;
            }, this.transitionDuration);
        } else {
            this.isTransitioning = false;
        }
        
        // FORCE BROWSER REFLOW/REPAINT after theme change
        setTimeout(() => {
            this.forceReflow();
            
            // If hard refresh mode is enabled, refresh the page
            if (this.hardRefreshMode) {
                setTimeout(() => {
                    console.log('🔄 Hard refresh triggered after theme toggle');
                    window.location.reload(true);
                }, 100);
            }
        }, 50);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: theme }
        }));
        
        console.log('🎨 Theme applied:', theme);
    }
    
    setupThemeToggle() {
        // Find or create theme toggle button
        let toggleButton = document.querySelector('.theme-toggle');
        
        if (!toggleButton) {
            toggleButton = this.createThemeToggle();
            document.body.appendChild(toggleButton);
        }
        
        // Remove any existing event listeners
        const newToggle = toggleButton.cloneNode(true);
        toggleButton.parentNode.replaceChild(newToggle, toggleButton);
        
        // Add fresh event listener
        newToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleTheme();
        });
        
        // Initial icon state
        this.updateThemeIcon(this.currentTheme);
    }
    
    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle theme');
        toggle.innerHTML = `
            <div class="theme-toggle-icon">
                <svg class="sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg class="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </div>
        `;
        return toggle;
    }
    
    updateThemeIcon(theme) {
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.style.opacity = '0';
                moonIcon.style.opacity = '1';
            } else {
                sunIcon.style.opacity = '1';
                moonIcon.style.opacity = '0';
            }
        }
    }
    
    setupEventListeners() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set theme
                const hasManualTheme = localStorage.getItem('theme');
                if (!hasManualTheme) {
                    this.applyTheme(e.matches ? 'dark' : 'light', true);
                }
            });
        }
        
        // Force theme application on page load (prevents flash)
        window.addEventListener('DOMContentLoaded', () => {
            this.applyTheme(this.currentTheme, false);
        });
        
        // Re-apply theme on page focus (cross-tab sync)
        window.addEventListener('focus', () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme && savedTheme !== this.currentTheme) {
                this.applyTheme(savedTheme, false);
            }
        });
        
        // Handle storage events (cross-tab theme sync)
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme' && e.newValue !== this.currentTheme) {
                this.applyTheme(e.newValue, true);
            }
        });
    }
    
    // Force browser to recalculate styles and reflow
    forceReflow() {
        console.log('🔄 Forcing browser reflow/repaint...');
        
        // Method 1: Force reflow by reading layout properties
        document.body.offsetHeight;
        
        // Method 2: Temporarily hide/show body to force repaint
        const originalDisplay = document.body.style.display;
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = originalDisplay;
        
        // Method 3: Force style recalculation on problematic elements
        const problemElements = document.querySelectorAll('[style*="background-color: #F0F0F0"], [style*="background-color: #FFF8E7"], [style*="background-color: #E8F5E9"]');
        problemElements.forEach(el => {
            // Force style recalculation
            const computedStyle = window.getComputedStyle(el);
            el.style.transform = 'translateZ(0)';
            el.offsetHeight; // Trigger reflow
            el.style.transform = '';
        });
        
        console.log('✅ Browser reflow forced on', problemElements.length, 'elements');
    }
    
    // Public API methods
    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.applyTheme(theme, true);
        }
    }
    
    getTheme() {
        return this.currentTheme;
    }
    
    isDark() {
        return this.currentTheme === 'dark';
    }
    
    isLight() {
        return this.currentTheme === 'light';
    }
    
    // Emergency option: Hard refresh after theme toggle
    enableHardRefreshMode() {
        this.hardRefreshMode = true;
        console.log('🔄 Hard refresh mode enabled - page will refresh after theme toggle');
    }
    
    disableHardRefreshMode() {
        this.hardRefreshMode = false;
        console.log('✅ Hard refresh mode disabled');
    }
}

// Initialize theme system immediately
const themeSystem = new ThemeSystem();

// Make globally available
window.ThemeSystem = themeSystem;

// Legacy support - keep existing function names working
window.toggleTheme = () => themeSystem.toggleTheme();
window.updateThemeToggleIcon = (theme) => themeSystem.updateThemeIcon(theme);

// Debug/Testing functions
window.enableHardRefresh = () => themeSystem.enableHardRefreshMode();
window.disableHardRefresh = () => themeSystem.disableHardRefreshMode();
window.forceReflow = () => themeSystem.forceReflow();

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSystem;
}

console.log('🚀 Unified Theme System loaded successfully!');