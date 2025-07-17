/* DEBUG/CLEAN MODE SWITCHER - Schaltet zwischen Debug und Clean Modus um */

console.log('🔄 DEBUG/CLEAN MODE SWITCHER: Initialisiert');

// GLOBALER STATE
window.debugMode = localStorage.getItem('debugMode') === 'true' || false;

// DEBUG MODE TOGGLER
function toggleDebugMode() {
    window.debugMode = !window.debugMode;
    localStorage.setItem('debugMode', window.debugMode);
    
    console.log(`🔄 DEBUG MODE: ${window.debugMode ? 'AKTIVIERT' : 'DEAKTIVIERT'}`);
    
    applyDebugMode();
    updateToggleButton();
}

// APPLY DEBUG MODE STYLES
function applyDebugMode() {
    const body = document.body;
    
    if (window.debugMode) {
        console.log('🔴 DEBUG MODE: Aktiviere visuelle Debug-Indikatoren');
        body.classList.add('debug-mode');
        body.classList.remove('clean-mode');
        
        // AKTIVIERE DEBUG BORDERS
        addDebugCSS();
        
        // FORENSISCHE TOOLS AKTIVIEREN
        if (window.runForensicAnalysis) {
            setTimeout(() => window.runForensicAnalysis(), 1000);
        }
        
    } else {
        console.log('✨ CLEAN MODE: Entferne Debug-Indikatoren, behalte Positionierung');
        body.classList.add('clean-mode');
        body.classList.remove('debug-mode');
        
        // ENTFERNE DEBUG BORDERS, BEHALTE POSITIONIERUNG
        removeDebugCSS();
    }
}

// ADD DEBUG CSS
function addDebugCSS() {
    const debugCSS = `
        <style id="debug-mode-styles">
        /* DEBUG MODE STYLES - Nur sichtbar im Debug Modus */
        body.debug-mode .header {
            border: 10px solid blue !important;
            background: rgba(0, 0, 255, 0.1) !important;
        }
        
        body.debug-mode .section-hero {
            border: 10px solid red !important;
            background: rgba(255, 0, 0, 0.1) !important;
        }
        
        body.debug-mode .section-hero h1 {
            border: 5px solid green !important;
            background: rgba(0, 255, 0, 0.1) !important;
        }
        
        /* DEBUG INFO OVERLAY */
        body.debug-mode::before {
            content: "🔴 DEBUG MODE AKTIV - Header/Hero Debug-Borders sichtbar";
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            background: red;
            color: white;
            padding: 10px 20px;
            z-index: 9999999;
            font-weight: bold;
            border-radius: 0 0 10px 10px;
        }
        </style>
    `;
    
    if (!document.getElementById('debug-mode-styles')) {
        document.head.insertAdjacentHTML('beforeend', debugCSS);
    }
}

// REMOVE DEBUG CSS
function removeDebugCSS() {
    const debugStyles = document.getElementById('debug-mode-styles');
    if (debugStyles) {
        debugStyles.remove();
    }
}

// CREATE TOGGLE BUTTON
function createDebugToggleButton() {
    const toggleButton = document.createElement('div');
    toggleButton.id = 'debug-toggle-button';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999999;
        background: #333;
        color: white;
        padding: 15px 20px;
        border-radius: 30px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        user-select: none;
    `;
    
    toggleButton.addEventListener('click', toggleDebugMode);
    toggleButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(0,0,0,0.4)';
    });
    
    toggleButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    });
    
    document.body.appendChild(toggleButton);
    updateToggleButton();
}

// UPDATE TOGGLE BUTTON
function updateToggleButton() {
    const button = document.getElementById('debug-toggle-button');
    if (button) {
        if (window.debugMode) {
            button.textContent = '🔴 DEBUG MODE';
            button.style.background = '#e74c3c';
        } else {
            button.textContent = '✨ CLEAN MODE';
            button.style.background = '#27ae60';
        }
    }
}

// INIT ON DOM READY
function initDebugModeSwitch() {
    console.log('🔄 INITIALISIERE DEBUG/CLEAN MODE SWITCHER');
    
    // APPLY CURRENT MODE
    applyDebugMode();
    
    // CREATE TOGGLE BUTTON
    createDebugToggleButton();
    
    // KEYBOARD SHORTCUT: Strg+D
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleDebugMode();
        }
    });
    
    console.log('✅ DEBUG/CLEAN MODE SWITCHER: Bereit (Strg+D oder Button verwenden)');
    console.log(`📊 AKTUELLER MODUS: ${window.debugMode ? 'DEBUG' : 'CLEAN'}`);
}

// AUTO-INIT
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDebugModeSwitch);
} else {
    initDebugModeSwitch();
}

// GLOBALE EXPORTS
window.toggleDebugMode = toggleDebugMode;
window.debugMode = window.debugMode;