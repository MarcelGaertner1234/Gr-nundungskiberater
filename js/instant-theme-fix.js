/* ==========================================================================
   INSTANT THEME FIX v1.0 - SOFORTIGER RENDERING-FIX
   Behebt alle verbleibenden Dark Mode Rendering-Probleme SOFORT
   ========================================================================== */

class InstantThemeFix {
    constructor() {
        this.isDebug = true;
        this.init();
    }
    
    init() {
        // Sofortiger Fix beim Laden
        this.applyInstantFix();
        
        // Theme Change Detection
        this.setupThemeDetection();
        
        // Aggressive Overrides
        this.injectAggressiveCSS();
        
        console.log('🔥 INSTANT THEME FIX - ACTIVE!');
    }
    
    applyInstantFix() {
        // Disable ALL transitions während Theme-Wechsel
        const style = document.createElement('style');
        style.id = 'instant-theme-fix';
        style.innerHTML = `
            /* INSTANT THEME FIX - DISABLE ALL TRANSITIONS */
            .theme-transitioning,
            .theme-transitioning *,
            .theme-transitioning *::before,
            .theme-transitioning *::after {
                transition: none !important;
                animation: none !important;
            }
            
            /* FORCE IMMEDIATE BACKGROUND CHANGES */
            [data-theme="dark"] * {
                transition-duration: 0s !important;
            }
            
            /* AGGRESSIVE INLINE STYLE OVERRIDES */
            [data-theme="dark"] [style*="background"] {
                background: var(--color-surface) !important;
            }
            
            [data-theme="dark"] [style*="color: white"],
            [data-theme="dark"] [style*="color: #fff"],
            [data-theme="dark"] [style*="color: #ffffff"] {
                color: #ffffff !important;
            }
            
            [data-theme="dark"] [style*="color: black"],
            [data-theme="dark"] [style*="color: #000"],
            [data-theme="dark"] [style*="color: #333"],
            [data-theme="dark"] [style*="color: #666"] {
                color: var(--color-text) !important;
            }
            
            /* NEWSLETTER SECTION FIX */
            [data-theme="dark"] [style*="background: rgba(255,255,255,0.05)"] {
                background: rgba(255,255,255,0.08) !important;
                border: 1px solid rgba(255,255,255,0.1) !important;
            }
            
            /* SOCIAL LINKS FIX */
            [data-theme="dark"] [style*="color: rgba(255,255,255,0.7)"] {
                color: rgba(255,255,255,0.8) !important;
            }
            
            /* IMAGE CONTAINER FIX */
            [data-theme="dark"] [style*="box-shadow: 0 10px 40px rgba(0,0,0,0.1)"] {
                box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
                border: 1px solid rgba(255,255,255,0.1) !important;
            }
            
            /* INPUT FIELDS FIX */
            [data-theme="dark"] [style*="background: rgba(255,255,255,0.1)"] {
                background: rgba(255,255,255,0.12) !important;
                color: white !important;
            }
            
            /* BUTTON FIX */
            [data-theme="dark"] [style*="background: var(--color-primary)"] {
                background: #6366f1 !important;
                color: white !important;
            }
            
            /* FORCE BODY BACKGROUND */
            [data-theme="dark"] body {
                background: #0d0d0d !important;
                color: #fafafa !important;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    setupThemeDetection() {
        // Observer für data-theme Änderungen
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    this.onThemeChange();
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // Event Listener für Theme Changes
        window.addEventListener('themeChanged', () => {
            this.onThemeChange();
        });
    }
    
    onThemeChange() {
        const theme = document.documentElement.getAttribute('data-theme');
        
        if (this.isDebug) {
            console.log('🔄 Theme Change detected:', theme);
        }
        
        // SOFORTIGE Überprüfung und Fix
        setTimeout(() => {
            this.forceRenderFix(theme);
        }, 0);
        
        // Weitere Checks
        setTimeout(() => {
            this.forceRenderFix(theme);
        }, 50);
        
        setTimeout(() => {
            this.forceRenderFix(theme);
        }, 150);
    }
    
    forceRenderFix(theme) {
        if (theme === 'dark') {
            this.applyDarkModeFixes();
        } else {
            this.applyLightModeFixes();
        }
    }
    
    applyDarkModeFixes() {
        // AGGRESSIVE ELEMENT TARGETING
        this.forceStyleElements([
            { selector: '[style*="background: rgba(255,255,255,0.05)"]', style: 'background: rgba(255,255,255,0.08) !important; border: 1px solid rgba(255,255,255,0.1) !important;' },
            { selector: '[style*="color: rgba(255,255,255,0.8)"]', style: 'color: rgba(255,255,255,0.9) !important;' },
            { selector: '[style*="color: rgba(255,255,255,0.7)"]', style: 'color: rgba(255,255,255,0.8) !important;' },
            { selector: '[style*="color: white"]', style: 'color: #ffffff !important;' },
            { selector: '[style*="background: rgba(255,255,255,0.1)"]', style: 'background: rgba(255,255,255,0.12) !important; color: white !important;' },
            { selector: '[style*="background: var(--color-primary)"]', style: 'background: #6366f1 !important; color: white !important;' }
        ]);
        
        // FORCE BODY STYLING
        document.body.style.background = '#0d0d0d';
        document.body.style.color = '#fafafa';
        
        if (this.isDebug) {
            console.log('✅ Dark Mode fixes applied');
        }
    }
    
    applyLightModeFixes() {
        // Reset alle overrides für Light Mode
        document.body.style.background = '';
        document.body.style.color = '';
        
        if (this.isDebug) {
            console.log('✅ Light Mode fixes applied');
        }
    }
    
    forceStyleElements(rules) {
        rules.forEach(rule => {
            const elements = document.querySelectorAll(rule.selector);
            elements.forEach(el => {
                el.style.cssText += rule.style;
            });
        });
    }
    
    injectAggressiveCSS() {
        const aggressiveCSS = document.createElement('style');
        aggressiveCSS.id = 'aggressive-theme-overrides';
        aggressiveCSS.innerHTML = `
            /* AGGRESSIVE THEME OVERRIDES - NUCLEAR OPTION */
            
            /* DISABLE TRANSITIONS GLOBALLY DURING THEME CHANGE */
            html.theme-changing * {
                transition: none !important;
                animation-duration: 0s !important;
            }
            
            /* FORCE IMMEDIATE DARK MODE STYLES */
            [data-theme="dark"] {
                --color-page: #0d0d0d !important;
                --color-text: #fafafa !important;
                --color-surface: #18181b !important;
                --color-border: rgba(255, 255, 255, 0.08) !important;
                --color-hover: rgba(255, 255, 255, 0.06) !important;
            }
            
            /* BODY OVERRIDE */
            [data-theme="dark"] body {
                background-color: #0d0d0d !important;
                color: #fafafa !important;
            }
            
            /* NEWSLETTER CONTAINER */
            [data-theme="dark"] .newsletter-container {
                background: rgba(255,255,255,0.08) !important;
                border: 1px solid rgba(255,255,255,0.1) !important;
            }
            
            /* SOCIAL LINKS */
            [data-theme="dark"] .social-link {
                color: rgba(255,255,255,0.8) !important;
            }
            
            /* IMAGE CONTAINER */
            [data-theme="dark"] .about-image-container {
                box-shadow: 0 10px 40px rgba(0,0,0,0.4) !important;
                border: 1px solid rgba(255,255,255,0.1) !important;
            }
            
            /* UNIVERSAL INLINE STYLE OVERRIDES */
            [data-theme="dark"] [style] {
                transition: none !important;
            }
            
            /* AGGRESSIVE BACKGROUND OVERRIDES */
            [data-theme="dark"] [style*="background-color: white"],
            [data-theme="dark"] [style*="background: white"],
            [data-theme="dark"] [style*="background: #fff"],
            [data-theme="dark"] [style*="background-color: #ffffff"] {
                background-color: #18181b !important;
                background: #18181b !important;
            }
            
            /* AGGRESSIVE TEXT COLOR OVERRIDES */
            [data-theme="dark"] [style*="color: #000000"],
            [data-theme="dark"] [style*="color: #000"],
            [data-theme="dark"] [style*="color: black"],
            [data-theme="dark"] [style*="color: #333333"],
            [data-theme="dark"] [style*="color: #333"],
            [data-theme="dark"] [style*="color: #666666"],
            [data-theme="dark"] [style*="color: #666"] {
                color: #fafafa !important;
            }
            
            /* PRESERVE WHITE TEXT */
            [data-theme="dark"] [style*="color: white"],
            [data-theme="dark"] [style*="color: #fff"],
            [data-theme="dark"] [style*="color: #ffffff"] {
                color: #ffffff !important;
            }
            
            /* TRANSPARENT BACKGROUNDS */
            [data-theme="dark"] [style*="background: rgba(255,255,255,"] {
                filter: invert(1) hue-rotate(180deg) !important;
            }
        `;
        
        document.head.appendChild(aggressiveCSS);
    }
    
    // Public API
    forceDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
        this.applyDarkModeFixes();
    }
    
    forceLightMode() {
        document.documentElement.setAttribute('data-theme', 'light');
        this.applyLightModeFixes();
    }
    
    debugMode(enabled = true) {
        this.isDebug = enabled;
        console.log('🐛 Debug mode:', enabled ? 'ON' : 'OFF');
    }
}

// SOFORTIGE INITIALISIERUNG
const instantThemeFix = new InstantThemeFix();

// Global verfügbar machen
window.InstantThemeFix = instantThemeFix;

// ENHANCED THEME TOGGLE FUNCTION
function instantThemeToggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition prevention class
    document.documentElement.classList.add('theme-changing');
    
    // Apply theme IMMEDIATELY
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Force immediate fixes
    if (newTheme === 'dark') {
        instantThemeFix.forceDarkMode();
    } else {
        instantThemeFix.forceLightMode();
    }
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Remove transition prevention after 100ms
    setTimeout(() => {
        document.documentElement.classList.remove('theme-changing');
    }, 100);
    
    console.log('⚡ INSTANT Theme switched to:', newTheme);
}

// Override existing toggle function
window.toggleTheme = instantThemeToggle;

console.log('🚀 INSTANT THEME FIX - LOADED & ACTIVE!');