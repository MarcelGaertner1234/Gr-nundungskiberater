/* HEADER-FIX SWITCHER - Automatischer Wechsel zwischen Debug und Clean */

console.log('🔄 HEADER-FIX SWITCHER: Initializing...');

class HeaderFixSwitcher {
    constructor() {
        this.isDebugMode = this.getDebugMode();
        this.init();
    }
    
    init() {
        console.log(`🔧 HEADER-FIX SWITCHER: Mode = ${this.isDebugMode ? 'DEBUG' : 'CLEAN'}`);
        
        // URL-Parameter auslesen
        const urlParams = new URLSearchParams(window.location.search);
        const debugParam = urlParams.get('debug');
        const cleanParam = urlParams.get('clean');
        
        if (debugParam === 'true' || debugParam === '1') {
            this.enableDebugMode();
        } else if (cleanParam === 'true' || cleanParam === '1') {
            this.enableCleanMode();
        }
        
        // Keyboard Shortcuts
        this.setupKeyboardShortcuts();
        
        // Control Panel
        this.createControlPanel();
        
        // Auto-Switch nach 30 Sekunden wenn Debug funktioniert
        if (this.isDebugMode) {
            this.setupAutoSwitch();
        }
    }
    
    getDebugMode() {
        // Prüfe localStorage
        const saved = localStorage.getItem('header-fix-debug-mode');
        if (saved !== null) {
            return saved === 'true';
        }
        
        // Default: Debug Mode für ersten Test
        return true;
    }
    
    setDebugMode(enabled) {
        this.isDebugMode = enabled;
        localStorage.setItem('header-fix-debug-mode', enabled.toString());
        console.log(`💾 Debug Mode ${enabled ? 'aktiviert' : 'deaktiviert'}`);
    }
    
    enableDebugMode() {
        console.log('🐛 Switching to DEBUG MODE...');
        this.setDebugMode(true);
        this.loadDebugCSS();
        this.updateControlPanel();
    }
    
    enableCleanMode() {
        console.log('✨ Switching to CLEAN MODE...');
        this.setDebugMode(false);
        this.loadCleanCSS();
        this.updateControlPanel();
    }
    
    loadDebugCSS() {
        // Entferne Clean CSS
        this.removeCSS('landing-page-clean-header-fix');
        
        // Lade Debug CSS falls nicht vorhanden
        this.loadCSS('landing-page-immediate-header-fix', 'landing-page-immediate-header-fix.css');
        
        console.log('🐛 Debug CSS loaded - with visual borders');
    }
    
    loadCleanCSS() {
        // Entferne Debug CSS
        this.removeCSS('landing-page-immediate-header-fix');
        
        // Lade Clean CSS
        this.loadCSS('landing-page-clean-header-fix', 'landing-page-clean-header-fix.css');
        
        console.log('✨ Clean CSS loaded - professional appearance');
    }
    
    loadCSS(id, href) {
        if (document.getElementById(id)) return;
        
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
    
    removeCSS(id) {
        const link = document.getElementById(id);
        if (link) {
            link.remove();
        }
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+D = Toggle Debug Mode
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggle();
            }
            
            // Ctrl+Shift+C = Force Clean Mode
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                this.enableCleanMode();
            }
        });
        
        console.log('⌨️ Keyboard shortcuts active: Ctrl+Shift+D (toggle), Ctrl+Shift+C (clean)');
    }
    
    toggle() {
        if (this.isDebugMode) {
            this.enableCleanMode();
        } else {
            this.enableDebugMode();
        }
    }
    
    createControlPanel() {
        const panel = document.createElement('div');
        panel.id = 'header-fix-control-panel';
        panel.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                font-family: monospace;
                font-size: 12px;
                z-index: 9999998;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                border: 1px solid #333;
            ">
                <div style="margin-bottom: 10px; font-weight: bold;">
                    🔧 HEADER-FIX CONTROL
                </div>
                <div id="mode-status" style="margin-bottom: 10px;">
                    Mode: <span id="current-mode">${this.isDebugMode ? 'DEBUG' : 'CLEAN'}</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button id="debug-btn" style="
                        background: #ef4444;
                        color: white;
                        border: none;
                        padding: 6px 12px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 11px;
                    ">🐛 Debug</button>
                    <button id="clean-btn" style="
                        background: #10b981;
                        color: white;
                        border: none;
                        padding: 6px 12px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 11px;
                    ">✨ Clean</button>
                    <button id="toggle-btn" style="
                        background: #6b7280;
                        color: white;
                        border: none;
                        padding: 6px 12px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 11px;
                    ">🔄 Toggle</button>
                </div>
                <div style="margin-top: 8px; font-size: 10px; opacity: 0.7;">
                    Ctrl+Shift+D: Toggle | Ctrl+Shift+C: Clean
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Event Listeners
        document.getElementById('debug-btn').addEventListener('click', () => this.enableDebugMode());
        document.getElementById('clean-btn').addEventListener('click', () => this.enableCleanMode());
        document.getElementById('toggle-btn').addEventListener('click', () => this.toggle());
        
        console.log('🎛️ Control Panel created');
    }
    
    updateControlPanel() {
        const modeSpan = document.getElementById('current-mode');
        if (modeSpan) {
            modeSpan.textContent = this.isDebugMode ? 'DEBUG' : 'CLEAN';
            modeSpan.style.color = this.isDebugMode ? '#ef4444' : '#10b981';
        }
    }
    
    setupAutoSwitch() {
        console.log('⏰ Auto-Switch Setup: Will switch to CLEAN mode in 60 seconds if successful');
        
        setTimeout(() => {
            // Prüfe ob das Problem gelöst ist
            const header = document.querySelector('.header');
            const heroSection = document.querySelector('.section-hero');
            const h1 = heroSection ? heroSection.querySelector('h1') : null;
            
            if (header && heroSection && h1) {
                const headerRect = header.getBoundingClientRect();
                const h1Rect = h1.getBoundingClientRect();
                const gap = h1Rect.top - headerRect.bottom;
                
                if (gap > 20) {
                    console.log('🎉 Auto-Switch: Problem gelöst! Switching to CLEAN mode...');
                    this.enableCleanMode();
                    
                    // Success notification
                    this.showNotification('✅ Auto-Switch: Problem gelöst! Clean Mode aktiviert.', '#10b981');
                } else {
                    console.log('⚠️ Auto-Switch: Problem weiterhin vorhanden, bleibe in DEBUG mode');
                    this.showNotification('⚠️ Auto-Switch: Problem weiterhin vorhanden, bleibe in DEBUG mode', '#f59e0b');
                }
            }
        }, 60000); // 60 Sekunden
    }
    
    showNotification(message, color) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${color};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                font-family: system-ui, -apple-system, sans-serif;
                font-size: 14px;
                font-weight: 500;
                z-index: 9999999;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                border: 2px solid white;
            ">
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transition = 'opacity 0.5s';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    window.headerFixSwitcher = new HeaderFixSwitcher();
});

// Expose global functions
window.switchToDebugMode = () => window.headerFixSwitcher?.enableDebugMode();
window.switchToCleanMode = () => window.headerFixSwitcher?.enableCleanMode();