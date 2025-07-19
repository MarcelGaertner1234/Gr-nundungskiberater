/* ==========================================================================
   THEME TOGGLE WITH HARD REFRESH v1.0
   Direkte Lösung: Hard-Refresh nach Theme-Toggle
   ========================================================================== */

function toggleThemeWithRefresh() {
    console.log('🔄 Theme toggle with hard refresh triggered');
    
    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log(`Switching from ${currentTheme} to ${newTheme}`);
    
    // Save new theme to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Force hard refresh
    window.location.reload(true);
}

// Override the existing toggleTheme function
window.toggleTheme = toggleThemeWithRefresh;

console.log('✅ Theme toggle with hard refresh loaded!');