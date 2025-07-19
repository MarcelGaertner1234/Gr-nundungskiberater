/* ==========================================================================
   DEBUG THEME BUTTON v1.0
   Überprüft, ob der Theme-Button korrekt funktioniert
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Debug Theme Button loaded');
    
    // Find the theme toggle button
    const themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
        console.log('✅ Theme button found:', themeButton);
        console.log('Button onclick:', themeButton.getAttribute('onclick'));
        
        // Add click listener to debug
        themeButton.addEventListener('click', function(e) {
            console.log('🖱️ Theme button clicked!');
            console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
            console.log('toggleTheme function type:', typeof window.toggleTheme);
        });
    } else {
        console.error('❌ Theme button not found!');
    }
    
    // Check if toggleTheme function exists
    console.log('toggleTheme function available:', typeof window.toggleTheme === 'function');
    
    // Add manual test function
    window.manualToggle = function() {
        console.log('🧪 Manual toggle test');
        if (window.toggleTheme) {
            window.toggleTheme();
        } else {
            console.error('❌ toggleTheme not available');
        }
    };
    
    console.log('🧪 Use manualToggle() in console to test directly');
});