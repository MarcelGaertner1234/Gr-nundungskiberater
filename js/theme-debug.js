/* ==========================================================================
   THEME DEBUG & TEST UTILITY v1.0
   Diagnostiziert und testet Theme-Rendering-Probleme
   ========================================================================== */

class ThemeDebugger {
    constructor() {
        this.testResults = [];
        this.init();
    }
    
    init() {
        console.log('🔍 Theme Debugger initialized');
        this.logSystemStatus();
        
        // Auto-run basic tests after DOM loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.runBasicTests(), 1000);
            });
        } else {
            setTimeout(() => this.runBasicTests(), 1000);
        }
    }
    
    logSystemStatus() {
        console.group('🔍 THEME SYSTEM STATUS');
        
        console.log('InstantThemeFix:', window.InstantThemeFix ? '✅ Available' : '❌ Missing');
        console.log('ThemeSystem:', window.ThemeSystem ? '✅ Available' : '❌ Missing');
        console.log('toggleTheme:', typeof window.toggleTheme === 'function' ? '✅ Available' : '❌ Missing');
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.log('Current Theme:', currentTheme || 'none set');
        
        const savedTheme = localStorage.getItem('theme');
        console.log('Saved Theme:', savedTheme || 'none');
        
        console.groupEnd();
    }
    
    runBasicTests() {
        console.group('🧪 BASIC THEME TESTS');
        
        this.testCardElements();
        this.testInlineStyles();
        this.testThemeToggle();
        
        console.groupEnd();
    }
    
    testCardElements() {
        const cardSelectors = [
            '.card', '.feature-card', '.story-card', '.preview-card',
            '[class*="card"]', '[class*="Card"]'
        ];
        
        let totalCards = 0;
        let problematicCards = 0;
        
        cardSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            totalCards += elements.length;
            
            elements.forEach(el => {
                const computedStyle = window.getComputedStyle(el);
                const bgColor = computedStyle.backgroundColor;
                const color = computedStyle.color;
                
                // Check for problematic combinations
                if (this.isProblematicStyling(bgColor, color)) {
                    problematicCards++;
                    console.warn('⚠️ Problematic card:', el, {
                        selector,
                        backgroundColor: bgColor,
                        color: color,
                        inlineStyle: el.style.cssText
                    });
                }
            });
        });
        
        console.log(`📊 Cards found: ${totalCards}, Problematic: ${problematicCards}`);
        
        if (problematicCards > 0) {
            console.warn(`❌ ${problematicCards} cards have rendering issues`);
        } else {
            console.log('✅ All cards appear to be rendered correctly');
        }
    }
    
    testInlineStyles() {
        const inlineStyleElements = document.querySelectorAll('[style]');
        let problematicInlineStyles = 0;
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        inlineStyleElements.forEach(el => {
            const style = el.style.cssText;
            
            if (currentTheme === 'dark' && this.hasLightModeInlineStyles(style)) {
                problematicInlineStyles++;
                console.warn('⚠️ Light mode inline style in dark theme:', el, style);
            } else if (currentTheme === 'light' && this.hasDarkModeInlineStyles(style)) {
                problematicInlineStyles++;
                console.warn('⚠️ Dark mode inline style in light theme:', el, style);
            }
        });
        
        console.log(`📊 Inline styles: ${inlineStyleElements.length}, Problematic: ${problematicInlineStyles}`);
    }
    
    testThemeToggle() {
        console.log('🔄 Testing theme toggle...');
        
        const originalTheme = document.documentElement.getAttribute('data-theme');
        const startTime = performance.now();
        
        // Test toggle
        if (window.toggleTheme) {
            window.toggleTheme();
            
            setTimeout(() => {
                const newTheme = document.documentElement.getAttribute('data-theme');
                const endTime = performance.now();
                const duration = endTime - startTime;
                
                console.log(`🔄 Theme toggle test:`);
                console.log(`   From: ${originalTheme} → To: ${newTheme}`);
                console.log(`   Duration: ${duration.toFixed(2)}ms`);
                
                if (newTheme !== originalTheme) {
                    console.log('✅ Theme toggle working');
                } else {
                    console.error('❌ Theme toggle failed');
                }
                
                // Toggle back
                setTimeout(() => {
                    window.toggleTheme();
                }, 100);
                
            }, 150);
        } else {
            console.error('❌ toggleTheme function not available');
        }
    }
    
    isProblematicStyling(bgColor, textColor) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // In dark mode, cards should have dark backgrounds
            return (
                bgColor.includes('rgb(255, 255, 255)') || // white background
                bgColor.includes('rgb(240, 240, 240)') || // light gray
                bgColor.includes('rgb(245, 245, 245)')    // very light gray
            );
        } else if (currentTheme === 'light') {
            // In light mode, cards should have light backgrounds
            return (
                bgColor.includes('rgb(30, 41, 59)') ||    // dark slate
                bgColor.includes('rgb(15, 23, 42)') ||    // darker slate
                bgColor.includes('rgb(24, 24, 27)')       // zinc dark
            );
        }
        
        return false;
    }
    
    hasLightModeInlineStyles(style) {
        return (
            style.includes('background-color: white') ||
            style.includes('background: white') ||
            style.includes('background-color: #fff') ||
            style.includes('background-color: #F0F0F0') ||
            style.includes('color: black') ||
            style.includes('color: #000')
        );
    }
    
    hasDarkModeInlineStyles(style) {
        return (
            style.includes('background: linear-gradient(135deg, #1e293b') ||
            style.includes('background-color: #1e293b') ||
            style.includes('color: #fafafa') ||
            style.includes('color: #ffffff')
        );
    }
    
    // PUBLIC API
    forceThemeToggleTest() {
        console.log('🔄 Manual theme toggle test initiated...');
        this.testThemeToggle();
    }
    
    analyzeElement(element) {
        if (!element) {
            console.error('No element provided');
            return;
        }
        
        console.group(`🔍 ELEMENT ANALYSIS: ${element.tagName}`);
        
        const computedStyle = window.getComputedStyle(element);
        console.log('Computed styles:', {
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
            border: computedStyle.border,
            boxShadow: computedStyle.boxShadow
        });
        
        console.log('Inline styles:', element.style.cssText);
        console.log('Classes:', element.className);
        
        console.groupEnd();
    }
    
    highlightProblematicElements() {
        const problematicElements = this.findProblematicElements();
        
        problematicElements.forEach(el => {
            el.style.outline = '3px solid red';
            el.style.outlineOffset = '2px';
        });
        
        console.log(`🔍 Highlighted ${problematicElements.length} problematic elements`);
        
        // Remove highlights after 5 seconds
        setTimeout(() => {
            problematicElements.forEach(el => {
                el.style.outline = '';
                el.style.outlineOffset = '';
            });
        }, 5000);
    }
    
    findProblematicElements() {
        const problematic = [];
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        document.querySelectorAll('*').forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            if (this.isProblematicStyling(computedStyle.backgroundColor, computedStyle.color)) {
                problematic.push(el);
            }
        });
        
        return problematic;
    }
}

// Initialize debugger
const themeDebugger = new ThemeDebugger();

// Make globally available
window.ThemeDebugger = themeDebugger;

// Add convenience functions to console
window.debugTheme = () => themeDebugger.runBasicTests();
window.highlightProblems = () => themeDebugger.highlightProblematicElements();
window.testToggle = () => themeDebugger.forceThemeToggleTest();

console.log('🔍 Theme Debugger loaded! Use debugTheme(), highlightProblems(), or testToggle() in console');