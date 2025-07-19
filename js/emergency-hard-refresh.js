/* ==========================================================================
   EMERGENCY HARD REFRESH v1.0
   Direkte Button-Override für garantierten Hard-Refresh
   ========================================================================== */

console.log('🚨 Emergency Hard Refresh Script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Looking for theme toggle button...');
    
    // Find the theme button
    const themeButton = document.querySelector('.theme-toggle');
    
    if (themeButton) {
        console.log('✅ Theme button found! Overriding click behavior...');
        
        // Remove existing onclick attribute
        themeButton.removeAttribute('onclick');
        
        // Add our own click listener that forces hard refresh
        themeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔄 EMERGENCY HARD REFRESH TRIGGERED!');
            
            // Get current theme
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log(`Switching from ${currentTheme} to ${newTheme}`);
            
            // Save theme
            localStorage.setItem('theme', newTheme);
            
            // Force hard refresh - multiple methods for maximum compatibility
            console.log('🔄 Executing hard refresh...');
            
            try {
                // Method 1: Standard reload with force
                window.location.reload(true);
            } catch (e) {
                console.log('Method 1 failed, trying method 2...');
                try {
                    // Method 2: Assign current location
                    window.location.href = window.location.href;
                } catch (e2) {
                    console.log('Method 2 failed, trying method 3...');
                    // Method 3: Replace current location
                    window.location.replace(window.location.href);
                }
            }
        }, true); // Use capture to ensure it runs first
        
        console.log('✅ Emergency click handler attached!');
        
        // Test function
        window.emergencyToggle = function() {
            console.log('🧪 Emergency toggle test');
            themeButton.click();
        };
        
    } else {
        console.error('❌ Theme button not found!');
        
        // Try to find any button with theme-related text
        const allButtons = document.querySelectorAll('button');
        console.log(`Found ${allButtons.length} buttons total`);
        
        allButtons.forEach((btn, index) => {
            if (btn.innerHTML.includes('theme') || btn.innerHTML.includes('dark') || btn.innerHTML.includes('light')) {
                console.log(`Potential theme button ${index}:`, btn);
            }
        });
    }
    
    // Add visual indicator that this script is active
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 50px;
        right: 10px;
        background: #ff4444;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 9999;
        font-family: monospace;
    `;
    indicator.textContent = 'EMERGENCY REFRESH ACTIVE';
    document.body.appendChild(indicator);
    
    // Remove indicator after 3 seconds
    setTimeout(() => {
        indicator.remove();
    }, 3000);
    
    console.log('🚨 Emergency Hard Refresh ready! Use emergencyToggle() to test');
});