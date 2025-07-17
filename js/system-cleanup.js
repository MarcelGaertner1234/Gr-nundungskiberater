/**
 * System Cleanup Manager
 * Verhindert Memory Leaks und stabilisiert das System
 */

class SystemCleanup {
    constructor() {
        this.intervals = new Set();
        this.timeouts = new Set();
        this.eventListeners = new Map();
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        if (this.initialized) return;
        
        // Überwache alle setInterval/setTimeout Aufrufe
        this.interceptTimers();
        
        // Cleanup vor Page Unload
        window.addEventListener('beforeunload', () => this.cleanup());
        
        // Cleanup bei Visibility Change (Tab wechseln)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseNonEssentialOperations();
            } else {
                this.resumeOperations();
            }
        });
        
        this.initialized = true;
        console.log('✅ System Cleanup Manager initialisiert');
    }
    
    interceptTimers() {
        // Originale Funktionen speichern
        const originalSetInterval = window.setInterval;
        const originalSetTimeout = window.setTimeout;
        const originalClearInterval = window.clearInterval;
        const originalClearTimeout = window.clearTimeout;
        
        // setInterval überwachen
        window.setInterval = (callback, delay, ...args) => {
            const id = originalSetInterval(callback, delay, ...args);
            this.intervals.add(id);
            return id;
        };
        
        // setTimeout überwachen
        window.setTimeout = (callback, delay, ...args) => {
            const id = originalSetTimeout(callback, delay, ...args);
            this.timeouts.add(id);
            return id;
        };
        
        // clearInterval überwachen
        window.clearInterval = (id) => {
            this.intervals.delete(id);
            return originalClearInterval(id);
        };
        
        // clearTimeout überwachen
        window.clearTimeout = (id) => {
            this.timeouts.delete(id);
            return originalClearTimeout(id);
        };
    }
    
    pauseNonEssentialOperations() {
        // Pausiere nicht-essentielle Operationen wenn Tab nicht aktiv
        console.log('🔄 Pausiere nicht-essentielle Operationen...');
        
        // Pausiere alle Animationen
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }
    
    resumeOperations() {
        // Setze Operationen fort
        console.log('▶️ Setze Operationen fort...');
        
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
    
    cleanup() {
        console.log('🧹 System Cleanup wird ausgeführt...');
        
        // Alle Intervals bereinigen
        this.intervals.forEach(id => {
            clearInterval(id);
        });
        this.intervals.clear();
        
        // Alle Timeouts bereinigen
        this.timeouts.forEach(id => {
            clearTimeout(id);
        });
        this.timeouts.clear();
        
        // Event Listeners bereinigen
        this.eventListeners.forEach((listeners, element) => {
            listeners.forEach(({ event, handler }) => {
                element.removeEventListener(event, handler);
            });
        });
        this.eventListeners.clear();
        
        // Spezifische Cleanup-Funktionen aufrufen
        this.callSpecificCleanups();
        
        console.log('✅ System Cleanup abgeschlossen');
    }
    
    callSpecificCleanups() {
        // Rufe Cleanup-Funktionen spezifischer Komponenten auf
        if (window.founderTicker && typeof window.founderTicker.cleanup === 'function') {
            window.founderTicker.cleanup();
        }
        
        if (window.betaSystem && typeof window.betaSystem.cleanup === 'function') {
            window.betaSystem.cleanup();
        }
        
        if (typeof cleanupRetryMechanism === 'function') {
            cleanupRetryMechanism();
        }
        
        if (typeof stopAutoSave === 'function') {
            stopAutoSave();
        }
    }
    
    addEventListenerTracking(element, event, handler) {
        if (!this.eventListeners.has(element)) {
            this.eventListeners.set(element, []);
        }
        this.eventListeners.get(element).push({ event, handler });
        element.addEventListener(event, handler);
    }
    
    getSystemStatus() {
        return {
            activeIntervals: this.intervals.size,
            activeTimeouts: this.timeouts.size,
            trackedEventListeners: this.eventListeners.size,
            memoryUsage: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + ' MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + ' MB',
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + ' MB'
            } : 'Nicht verfügbar'
        };
    }
}

// Globale Instanz erstellen
window.systemCleanup = new SystemCleanup();

// Debug-Funktion für Entwicklung
window.getSystemStatus = () => {
    console.table(window.systemCleanup.getSystemStatus());
};

// Notfall-Cleanup Funktion
window.emergencyCleanup = () => {
    window.systemCleanup.cleanup();
    location.reload();
};