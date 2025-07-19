/* ==========================================================================
   SIMPLE THEME TEST v1.0
   Einfache Tests für das neue minimalistische Theme-System
   ========================================================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🧪 Simple Theme Test loaded');
    
    // Test functions available in console
    window.testTheme = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.log('Current theme:', currentTheme);
        
        const cardsWithInlineStyles = document.querySelectorAll('[style*="background-color: #F0F0F0"], [style*="background-color: #FFF8E7"], [style*="background-color: #E8F5E9"]');
        console.log('Found', cardsWithInlineStyles.length, 'cards with inline background styles');
        
        const darkTextElements = document.querySelectorAll('[style*="color: #1a1a1a"], [style*="color: #333"], [style*="color: #666"]');
        console.log('Found', darkTextElements.length, 'elements with dark text styles');
        
        return {
            theme: currentTheme,
            cardsWithInlineStyles: cardsWithInlineStyles.length,
            darkTextElements: darkTextElements.length
        };
    };
    
    window.forceToggle = function() {
        if (window.toggleTheme) {
            console.log('🔄 Force toggling theme...');
            window.toggleTheme();
            
            setTimeout(() => {
                const result = window.testTheme();
                console.log('Theme toggle result:', result);
            }, 300);
        } else {
            console.log('❌ toggleTheme function not found');
        }
    };
    
    // Auto-test on load
    setTimeout(() => {
        console.log('🔍 Initial theme test:');
        window.testTheme();
    }, 1000);
    
    console.log('✅ Use testTheme() or forceToggle() in console to test');
});