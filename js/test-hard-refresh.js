/* ==========================================================================
   TEST HARD REFRESH v1.0
   Test-Funktionen für Hard-Refresh beim Theme-Toggle
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧪 Hard Refresh Test loaded');
    
    // Test function
    window.testHardRefresh = function() {
        console.log('🧪 Testing hard refresh...');
        console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
        console.log('Current toggleTheme function:', window.toggleTheme);
        
        if (typeof window.toggleTheme === 'function') {
            console.log('✅ toggleTheme function available');
            console.log('🔄 Triggering theme toggle...');
            window.toggleTheme();
        } else {
            console.error('❌ toggleTheme function not found!');
        }
    };
    
    // Add test button to page (for debugging)
    window.addTestButton = function() {
        const button = document.createElement('button');
        button.textContent = 'TEST HARD REFRESH';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.zIndex = '9999';
        button.style.padding = '10px';
        button.style.background = 'red';
        button.style.color = 'white';
        button.onclick = window.testHardRefresh;
        document.body.appendChild(button);
        console.log('🔴 Test button added to page');
    };
    
    console.log('🧪 Use testHardRefresh() or addTestButton() in console');
});