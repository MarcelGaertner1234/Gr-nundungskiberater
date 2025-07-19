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
    
    applyTheme(theme, withTransition = true) {
        // Route to enhanced version with instant fix integration
        this.applyThemeWithInstantFix(theme, withTransition);
    }
    
    toggleTheme() {
        if (this.isTransitioning) return;
        
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        // ENHANCED TOGGLE with Instant Theme Fix Integration
        this.applyThemeWithInstantFix(newTheme, true);
    }
    
    applyThemeWithInstantFix(theme, withTransition = true) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Add transition prevention class
        if (withTransition) {
            document.documentElement.classList.add('theme-changing');
        }
        
        // Apply theme to html element IMMEDIATELY
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        
        // INSTANT THEME FIX INTEGRATION
        if (window.InstantThemeFix) {
            if (theme === 'dark') {
                window.InstantThemeFix.forceDarkMode();
            } else {
                window.InstantThemeFix.forceLightMode();
            }
            
            // ADDITIONAL CARD FIXES - multiple passes for reliability
            setTimeout(() => {
                if (theme === 'dark') {
                    window.InstantThemeFix.fixAllCards();
                } else {
                    window.InstantThemeFix.restoreAllCards();
                }
            }, 10);
            
            setTimeout(() => {
                if (theme === 'dark') {
                    window.InstantThemeFix.fixAllCards();
                } else {
                    window.InstantThemeFix.restoreAllCards();
                }
            }, 50);
            
            setTimeout(() => {
                if (theme === 'dark') {
                    window.InstantThemeFix.fixAllCards();
                } else {
                    window.InstantThemeFix.restoreAllCards();
                }
            }, 100);
        }
        
        // Update current theme
        this.currentTheme = theme;
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Update toggle icon
        this.updateThemeIcon(theme);
        
        // Remove transition class after animation
        if (withTransition) {
            setTimeout(() => {
                document.documentElement.classList.remove('theme-changing');
                this.isTransitioning = false;
            }, this.transitionDuration);
        } else {
            this.isTransitioning = false;
        }
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: theme }
        }));
        
        console.log('🎨 Enhanced Theme applied with Instant Fix:', theme);
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
}

// Initialize theme system immediately
const themeSystem = new ThemeSystem();

// Make globally available
window.ThemeSystem = themeSystem;

// Legacy support - keep existing function names working
window.toggleTheme = () => themeSystem.toggleTheme();
window.updateThemeToggleIcon = (theme) => themeSystem.updateThemeIcon(theme);

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSystem;
}

console.log('🚀 Unified Theme System loaded successfully!');