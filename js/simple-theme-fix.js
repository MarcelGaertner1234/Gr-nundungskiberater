/* ==========================================================================
   SIMPLE THEME FIX v1.0 - DIREKT UND ZUVERLÄSSIG
   Ein einfacher, funktionierender Ansatz für bidirektionale Theme-Fixes
   ========================================================================== */

class SimpleThemeFix {
    constructor() {
        this.originalStyles = new Map(); // Store original styles
        this.init();
    }
    
    init() {
        console.log('🎯 Simple Theme Fix - Starting...');
        this.saveOriginalStyles();
        this.setupThemeWatcher();
    }
    
    saveOriginalStyles() {
        // Save original inline styles for restoration
        const elementsWithStyle = document.querySelectorAll('[style]');
        elementsWithStyle.forEach(el => {
            this.originalStyles.set(el, el.style.cssText);
        });
        console.log('💾 Saved', this.originalStyles.size, 'original styles');
    }
    
    setupThemeWatcher() {
        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    const theme = document.documentElement.getAttribute('data-theme');
                    setTimeout(() => this.applyThemeFix(theme), 0);
                    setTimeout(() => this.applyThemeFix(theme), 50);
                    setTimeout(() => this.applyThemeFix(theme), 150);
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
    
    applyThemeFix(theme) {
        if (theme === 'dark') {
            this.applyDarkMode();
        } else {
            this.restoreLightMode();
        }
    }
    
    applyDarkMode() {
        console.log('🌙 Applying Dark Mode Fixes');
        
        // Fix specific background colors
        this.fixBackgroundColor('#F0F0F0', '#1e293b');
        this.fixBackgroundColor('#f5f5f5', '#1e293b');
        this.fixBackgroundColor('#FFF8E7', '#1e293b');
        this.fixBackgroundColor('#EBF5FF', '#1e293b');
        this.fixBackgroundColor('#F3E5F5', '#1e293b');
        this.fixBackgroundColor('#E8F5E9', '#1e293b');
        this.fixBackgroundColor('#FFF5F5', '#1e293b');
        this.fixBackgroundColor('#FFF3E0', '#1e293b');
        this.fixBackgroundColor('white', '#1e293b');
        this.fixBackgroundColor('#ffffff', '#1e293b');
        this.fixBackgroundColor('#fff', '#1e293b');
        
        // Fix text colors
        this.fixTextColor('#000', '#fafafa');
        this.fixTextColor('#000000', '#fafafa');
        this.fixTextColor('black', '#fafafa');
        this.fixTextColor('#333', '#fafafa');
        this.fixTextColor('#333333', '#fafafa');
        this.fixTextColor('#666', '#fafafa');
        this.fixTextColor('#666666', '#fafafa');
        this.fixTextColor('#1a1a1a', '#fafafa');
        
        // Fix body
        document.body.style.background = '#0d0d0d';
        document.body.style.color = '#fafafa';
    }
    
    restoreLightMode() {
        console.log('☀️ Restoring Light Mode');
        
        // Restore ALL original styles
        this.originalStyles.forEach((originalStyle, element) => {
            if (document.contains(element)) {
                element.style.cssText = originalStyle;
            }
        });
        
        // Reset body
        document.body.style.background = '';
        document.body.style.color = '';
    }
    
    fixBackgroundColor(searchColor, newColor) {
        const elements = document.querySelectorAll(`[style*="background-color: ${searchColor}"], [style*="background: ${searchColor}"]`);
        elements.forEach(el => {
            if (el.style.backgroundColor === searchColor || el.style.backgroundColor === this.normalizeColor(searchColor)) {
                el.style.backgroundColor = newColor;
            }
            if (el.style.background === searchColor || el.style.background === this.normalizeColor(searchColor)) {
                el.style.background = newColor;
            }
            el.style.color = '#fafafa';
            el.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        });
    }
    
    fixTextColor(searchColor, newColor) {
        const elements = document.querySelectorAll(`[style*="color: ${searchColor}"]`);
        elements.forEach(el => {
            if (el.style.color === searchColor || el.style.color === this.normalizeColor(searchColor)) {
                el.style.color = newColor;
            }
        });
    }
    
    normalizeColor(color) {
        // Convert colors to RGB format for comparison
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        return ctx.fillStyle;
    }
    
    // Force immediate fix
    forceFixNow() {
        const theme = document.documentElement.getAttribute('data-theme');
        this.applyThemeFix(theme);
        console.log('🔥 Force fix applied for theme:', theme);
    }
}

// Initialize immediately
const simpleThemeFix = new SimpleThemeFix();

// Make globally available
window.SimpleThemeFix = simpleThemeFix;

// Add to window for debugging
window.forceThemeFix = () => simpleThemeFix.forceFixNow();

console.log('🎯 Simple Theme Fix loaded and ready!');