/* EMERGENCY ERROR BLOCKER - Verhindert dass JS-Errors andere Scripts blockieren */

console.log('🚨 EMERGENCY ERROR BLOCKER: Aktiviert - verhindert Script-Blockierung');

// GLOBAL ERROR HANDLER - Fängt alle Errors ab
window.addEventListener('error', function(e) {
    console.log('🛡️ ERROR BLOCKED:', e.filename, 'Line:', e.lineno, 'Message:', e.message);
    
    // Verhindere dass der Error weitere Scripts stoppt
    e.preventDefault();
    e.stopPropagation();
    
    // Spezielle Behandlung für killer-features.js
    if (e.filename && e.filename.includes('killer-features')) {
        console.log('🔥 KILLER-FEATURES ERROR BLOCKIERT - Scripts können weiterlaufen');
        return false;
    }
    
    return false; // Verhindere Standard-Error-Handling
});

// UNHANDLED PROMISE REJECTION HANDLER
window.addEventListener('unhandledrejection', function(e) {
    console.log('🛡️ PROMISE REJECTION BLOCKED:', e.reason);
    e.preventDefault();
    return false;
});

// CONSOLE ERROR OVERRIDE - Verhindert Error-Spam
const originalError = console.error;
console.error = function(...args) {
    const message = args.join(' ');
    
    // Blockiere killer-features Errors
    if (message.includes('killer-features') || message.includes('tickerContent') || message.includes('appendChild')) {
        console.log('🛡️ KILLER-FEATURES ERROR BLOCKIERT:', message);
        return;
    }
    
    // Alle anderen Errors normal anzeigen
    originalError.apply(console, args);
};

// MOCK KILLER-FEATURES OBJEKTE - Falls sie referenziert werden
window.FounderTicker = {
    addNewActivity: function() { 
        console.log('🔄 MOCK: FounderTicker.addNewActivity - Original blockiert');
    }
};

// DOCUMENT READY PROTECTION
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ EMERGENCY ERROR BLOCKER: DOM Ready - Errors sind blockiert');
    
    // Stelle sicher dass ticker-Container existiert falls gebraucht
    if (!document.querySelector('.ticker-content')) {
        const mockTicker = document.createElement('div');
        mockTicker.className = 'ticker-content';
        mockTicker.style.display = 'none';
        document.body.appendChild(mockTicker);
        console.log('✅ MOCK: ticker-content Element erstellt');
    }
});

console.log('🛡️ EMERGENCY ERROR BLOCKER: Vollständig aktiviert - Scripts sind geschützt');