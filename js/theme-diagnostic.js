/* ==========================================================================
   THEME DIAGNOSTIC v1.0 - PROBLEM FINDEN STATT RATEN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Theme Diagnostic loaded');
    
    // Find all elements with problematic inline styles
    function findProblematicElements() {
        const problemStyles = [
            'background-color: #F0F0F0',
            'background-color: #f5f5f5', 
            'background-color: #FFF8E7',
            'background-color: #EBF5FF',
            'background-color: #F3E5F5',
            'background-color: #E8F5E9',
            'background-color: #FFF5F5',
            'background-color: #FFF3E0',
            'color: #1a1a1a',
            'color: #333',
            'color: #666'
        ];
        
        const found = [];
        problemStyles.forEach(style => {
            const elements = document.querySelectorAll(`[style*="${style}"]`);
            if (elements.length > 0) {
                found.push({
                    style: style,
                    count: elements.length,
                    elements: Array.from(elements).slice(0, 3) // First 3 examples
                });
            }
        });
        
        return found;
    }
    
    // Log current theme state
    function logThemeState() {
        const theme = document.documentElement.getAttribute('data-theme');
        const bodyTheme = document.body.getAttribute('data-theme');
        const problematic = findProblematicElements();
        
        console.group(`🎨 THEME STATE: ${theme}`);
        console.log('HTML data-theme:', theme);
        console.log('Body data-theme:', bodyTheme);
        console.log('Problematic elements found:', problematic.length);
        
        problematic.forEach(item => {
            console.log(`  ${item.style}: ${item.count} elements`);
            if (item.elements.length > 0) {
                console.log('    Examples:', item.elements);
            }
        });
        
        console.groupEnd();
        
        return {
            theme,
            bodyTheme,
            problematicCount: problematic.length,
            details: problematic
        };
    }
    
    // Test what happens during theme toggle
    function testThemeToggle() {
        console.log('🔄 TESTING THEME TOGGLE...');
        
        const beforeState = logThemeState();
        console.log('BEFORE toggle:', beforeState);
        
        if (window.toggleTheme) {
            window.toggleTheme();
            
            // Check immediately
            setTimeout(() => {
                const afterState = logThemeState();
                console.log('AFTER toggle (immediate):', afterState);
                
                // Check again after 500ms
                setTimeout(() => {
                    const finalState = logThemeState();
                    console.log('AFTER toggle (final):', finalState);
                    
                    // Compare states
                    console.group('📊 TOGGLE ANALYSIS');
                    console.log('Theme changed:', beforeState.theme !== finalState.theme);
                    console.log('Problematic elements before:', beforeState.problematicCount);
                    console.log('Problematic elements after:', finalState.problematicCount);
                    
                    if (finalState.problematicCount > 0) {
                        console.warn('❌ Theme toggle did not fix all problematic elements!');
                        console.log('Remaining problems:', finalState.details);
                    } else {
                        console.log('✅ Theme toggle successful!');
                    }
                    console.groupEnd();
                    
                }, 500);
            }, 50);
        } else {
            console.error('❌ toggleTheme function not found!');
        }
    }
    
    // Check CSS overrides
    function checkCSSOverrides() {
        console.group('🎨 CSS OVERRIDE CHECK');
        
        const testElement = document.querySelector('[style*="background-color: #F0F0F0"]');
        if (testElement) {
            const computedStyle = window.getComputedStyle(testElement);
            const inlineStyle = testElement.style.backgroundColor;
            
            console.log('Test element found:', testElement);
            console.log('Inline style backgroundColor:', inlineStyle);
            console.log('Computed backgroundColor:', computedStyle.backgroundColor);
            console.log('Computed color:', computedStyle.color);
            
            // Check if our CSS overrides are working
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                if (computedStyle.backgroundColor.includes('30, 41, 59')) { // #1e293b
                    console.log('✅ CSS override working');
                } else {
                    console.warn('❌ CSS override NOT working');
                }
            }
        } else {
            console.log('No test elements found');
        }
        
        console.groupEnd();
    }
    
    // Make functions globally available
    window.diagnosticState = logThemeState;
    window.diagnosticToggle = testThemeToggle;
    window.diagnosticCSS = checkCSSOverrides;
    window.diagnosticFind = findProblematicElements;
    
    // Auto-run initial diagnostic
    setTimeout(() => {
        console.log('🔍 INITIAL DIAGNOSTIC:');
        logThemeState();
        checkCSSOverrides();
        
        console.log('');
        console.log('🧪 DIAGNOSTIC FUNCTIONS AVAILABLE:');
        console.log('diagnosticState() - Show current theme state');
        console.log('diagnosticToggle() - Test theme toggle');
        console.log('diagnosticCSS() - Check CSS overrides');
        console.log('diagnosticFind() - Find problematic elements');
    }, 1000);
});

console.log('🔍 Theme Diagnostic ready!');