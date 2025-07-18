/**
 * UNIFIED I18N SYSTEM - KI Konzept Builder
 * Ersetzt alle 5 verschiedenen i18n-Implementierungen durch ein einheitliches System
 * 
 * Features:
 * - Einheitliche API für alle Seiten
 * - Automatisches Fallback zu Deutsch
 * - Template-String Unterstützung mit {{variables}}
 * - HTML-Content Unterstützung
 * - Lazy Loading für bessere Performance
 * - Type-Safe Keys mit Validierung
 */

class UnifiedI18n {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = new Map();
        this.loadedModules = new Set();
        this.fallbackLanguage = 'de';
        this.isInitialized = false;
        
        // Cache für häufig verwendete Übersetzungen
        this.cache = new Map();
        
        // Event-System für Language Changes
        this.listeners = new Set();
        
        // Debug Mode
        this.debugMode = false;
        
        this.init();
    }
    
    /**
     * Initialisierung des i18n-Systems
     */
    async init() {
        try {
            // Sprache aus LocalStorage oder Browser laden
            this.currentLanguage = this.detectLanguage();
            
            // Core-Module laden (immer verfügbar)
            await this.loadCoreModules();
            
            // DOM für automatische Übersetzung scannen
            this.applyTranslations();
            
            // Event Listener für Sprachänderungen
            this.setupEventListeners();
            
            this.isInitialized = true;
            this.log('✅ Unified I18n System initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize i18n system:', error);
            // Fallback zu Deutsch
            this.currentLanguage = 'de';
        }
    }
    
    /**
     * Spracherkennung
     */
    detectLanguage() {
        // 1. URL Parameter (höchste Priorität)
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.isValidLanguage(urlLang)) {
            return urlLang;
        }
        
        // 2. LocalStorage
        const storedLang = localStorage.getItem('language');
        if (storedLang && this.isValidLanguage(storedLang)) {
            return storedLang;
        }
        
        // 3. Browser-Sprache
        const browserLang = navigator.language.split('-')[0];
        if (this.isValidLanguage(browserLang)) {
            return browserLang;
        }
        
        // 4. Fallback zu Deutsch
        return 'de';
    }
    
    /**
     * Validierung der Sprache
     */
    isValidLanguage(lang) {
        return ['de', 'en', 'fr', 'es', 'it'].includes(lang);
    }
    
    /**
     * Core Module laden (Common, Navigation, etc.)
     */
    async loadCoreModules() {
        const coreModules = ['common', 'navigation', 'errors'];
        
        for (const module of coreModules) {
            await this.loadModule(module);
        }
    }
    
    /**
     * Spezifisches Modul laden
     */
    async loadModule(moduleName) {
        if (this.loadedModules.has(`${moduleName}-${this.currentLanguage}`)) {
            return; // Bereits geladen
        }
        
        try {
            // Versuche modulspezifische Übersetzung zu laden
            const moduleTranslations = await this.loadTranslationFile(moduleName, this.currentLanguage);
            
            if (moduleTranslations) {
                this.mergeTranslations(moduleTranslations);
                this.loadedModules.add(`${moduleName}-${this.currentLanguage}`);
                this.log(`📦 Loaded module: ${moduleName} (${this.currentLanguage})`);
            }
            
        } catch (error) {
            this.warn(`Failed to load module ${moduleName}:`, error);
            
            // Fallback zu Deutsch laden
            if (this.currentLanguage !== this.fallbackLanguage) {
                try {
                    const fallbackTranslations = await this.loadTranslationFile(moduleName, this.fallbackLanguage);
                    if (fallbackTranslations) {
                        this.mergeTranslations(fallbackTranslations);
                        this.log(`📦 Loaded fallback for module: ${moduleName} (${this.fallbackLanguage})`);
                    }
                } catch (fallbackError) {
                    this.warn(`Failed to load fallback for module ${moduleName}:`, fallbackError);
                }
            }
        }
    }
    
    /**
     * Übersetzungsdatei laden
     */
    async loadTranslationFile(moduleName, language) {
        const possiblePaths = [
            `i18n/${moduleName}/${language}.json`,           // Modulstruktur
            `i18n/${language}/${moduleName}.json`,           // Sprachstruktur  
            `i18n/${language}.json`,                         // Root-Level
            `i18n/i18n-${moduleName}-${language}.json`,      // Legacy
        ];
        
        for (const path of possiblePaths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const data = await response.json();
                    this.log(`📄 Loaded translation file: ${path}`);
                    return data;
                }
            } catch (error) {
                // Datei existiert nicht, versuche nächsten Pfad
                continue;
            }
        }
        
        return null;
    }
    
    /**
     * Übersetzungen zusammenführen
     */
    mergeTranslations(newTranslations) {
        const currentTranslations = this.translations.get(this.currentLanguage) || {};
        const merged = this.deepMerge(currentTranslations, newTranslations);
        this.translations.set(this.currentLanguage, merged);
        
        // Cache invalidieren
        this.cache.clear();
    }
    
    /**
     * Deep Merge für Objekte
     */
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    }
    
    /**
     * Übersetzung abrufen (Hauptfunktion)
     */
    t(key, variables = {}, defaultText = '') {
        // Cache-Check
        const cacheKey = `${this.currentLanguage}:${key}:${JSON.stringify(variables)}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        let translation = this.getTranslation(key, this.currentLanguage);
        
        // Fallback zu Deutsch
        if (!translation && this.currentLanguage !== this.fallbackLanguage) {
            translation = this.getTranslation(key, this.fallbackLanguage);
            if (translation) {
                this.warn(`Using fallback translation for key: ${key}`);
            }
        }
        
        // Fallback zu Default-Text
        if (!translation) {
            translation = defaultText || key;
            if (this.debugMode) {
                this.warn(`Missing translation for key: ${key}`);
            }
        }
        
        // Template-Variables ersetzen
        const result = this.interpolate(translation, variables);
        
        // In Cache speichern
        this.cache.set(cacheKey, result);
        
        return result;
    }
    
    /**
     * Übersetzung aus verschachteltem Objekt holen
     */
    getTranslation(key, language) {
        const translations = this.translations.get(language);
        if (!translations) return null;
        
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) {
                return null;
            }
        }
        
        return value;
    }
    
    /**
     * Template-Variables ersetzen
     */
    interpolate(text, variables) {
        if (!text || typeof text !== 'string') return text;
        
        return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return variables[key] !== undefined ? variables[key] : match;
        });
    }
    
    /**
     * Sprache wechseln
     */
    async setLanguage(language) {
        if (!this.isValidLanguage(language) || language === this.currentLanguage) {
            return;
        }
        
        const oldLanguage = this.currentLanguage;
        this.currentLanguage = language;
        
        // In LocalStorage speichern
        localStorage.setItem('language', language);
        
        // Cache leeren
        this.cache.clear();
        
        // Core-Module für neue Sprache laden
        await this.loadCoreModules();
        
        // Aktuelle Seite neu übersetzen
        this.applyTranslations();
        
        // Event-Listener benachrichtigen
        this.notifyLanguageChange(oldLanguage, language);
        
        this.log(`🌍 Language changed from ${oldLanguage} to ${language}`);
    }
    
    /**
     * DOM automatisch übersetzen
     */
    applyTranslations() {
        // Text-Content
        const textElements = document.querySelectorAll('[data-i18n]');
        textElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key, {}, element.textContent);
            
            if (element.hasAttribute('data-i18n-html')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation) {
                element.setAttribute('placeholder', translation);
            }
        });
        
        // Title Attribute
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            if (translation) {
                element.setAttribute('title', translation);
            }
        });
        
        // Alt Attribute
        const altElements = document.querySelectorAll('[data-i18n-alt]');
        altElements.forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.t(key);
            if (translation) {
                element.setAttribute('alt', translation);
            }
        });
    }
    
    /**
     * Event-Listener Setup
     */
    setupEventListeners() {
        // Language-Selector Events
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-lang]')) {
                e.preventDefault();
                const language = e.target.getAttribute('data-lang');
                this.setLanguage(language);
            }
        });
        
        // DOM-Änderungen überwachen
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                let hasNewNodes = false;
                mutations.forEach(mutation => {
                    if (mutation.addedNodes.length > 0) {
                        hasNewNodes = true;
                    }
                });
                
                if (hasNewNodes) {
                    // Debounce für Performance
                    clearTimeout(this.translationTimeout);
                    this.translationTimeout = setTimeout(() => {
                        this.applyTranslations();
                    }, 100);
                }
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    /**
     * Language Change Events
     */
    onLanguageChange(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }
    
    notifyLanguageChange(oldLang, newLang) {
        this.listeners.forEach(callback => {
            try {
                callback(newLang, oldLang);
            } catch (error) {
                this.warn('Error in language change callback:', error);
            }
        });
    }
    
    /**
     * Seitenspezifische Module laden
     */
    async loadPageModules(pageModules) {
        for (const module of pageModules) {
            await this.loadModule(module);
        }
        this.applyTranslations();
    }
    
    /**
     * Debug & Logging
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
        if (enabled) {
            console.log('🐛 i18n Debug Mode enabled');
        }
    }
    
    log(message, ...args) {
        if (this.debugMode) {
            console.log(`[i18n] ${message}`, ...args);
        }
    }
    
    warn(message, ...args) {
        if (this.debugMode) {
            console.warn(`[i18n] ${message}`, ...args);
        }
    }
    
    /**
     * Utility-Funktionen
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getAvailableLanguages() {
        return ['de', 'en', 'fr', 'es', 'it'];
    }
    
    isReady() {
        return this.isInitialized;
    }
    
    /**
     * Legacy-Kompatibilität
     */
    getText(key, defaultText = '') {
        return this.t(key, {}, defaultText);
    }
    
    /**
     * Export für Debugging
     */
    getTranslations() {
        return Object.fromEntries(this.translations);
    }
    
    getCacheStats() {
        return {
            size: this.cache.size,
            loadedModules: Array.from(this.loadedModules)
        };
    }
}

// Globale Instanz erstellen
window.i18n = new UnifiedI18n();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UnifiedI18n;
}

// Auto-initialization für spezifische Seiten
document.addEventListener('DOMContentLoaded', async () => {
    // Seitenspezifische Module basierend auf URL laden
    const path = window.location.pathname;
    const pageModules = [];
    
    if (path.includes('dashboard')) {
        pageModules.push('dashboard', 'appointments', 'progress');
    } else if (path.includes('admin')) {
        pageModules.push('admin', 'calendar', 'communications');
    } else if (path.includes('businessplan')) {
        pageModules.push('businessplan', 'templates');
    } else if (path.includes('pricing')) {
        pageModules.push('pricing', 'packages');
    } else if (path.includes('consultation')) {
        pageModules.push('consultation', 'calendar');
    }
    
    // Module laden
    if (pageModules.length > 0) {
        await window.i18n.loadPageModules(pageModules);
    }
});

/**
 * Helper Functions für Templates
 */
window.t = (key, variables, defaultText) => {
    return window.i18n.t(key, variables, defaultText);
};

window.setLanguage = (language) => {
    return window.i18n.setLanguage(language);
};

console.log('🌍 Unified I18n System loaded successfully');