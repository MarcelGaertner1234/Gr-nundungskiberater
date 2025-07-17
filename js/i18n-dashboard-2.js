/**
 * Internationalization (i18n) System for Dashboard 2
 * Loads dashboard-2-specific translations and provides helper functions
 * Supports 5 languages: DE, EN, FR, ES, IT
 */

class Dashboard2I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.translations = {};
        this.isLoaded = false;
        
        // Initialize i18n system
        this.init();
    }
    
    detectLanguage() {
        // Priority: URL param -> localStorage -> browser lang -> default DE
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        
        if (urlLang && ['de', 'en', 'fr', 'es', 'it'].includes(urlLang)) {
            localStorage.setItem('preferred_language', urlLang);
            return urlLang;
        }
        
        const storedLang = localStorage.getItem('preferred_language');
        if (storedLang && ['de', 'en', 'fr', 'es', 'it'].includes(storedLang)) {
            return storedLang;
        }
        
        const browserLang = navigator.language.substring(0, 2);
        if (['de', 'en', 'fr', 'es', 'it'].includes(browserLang)) {
            return browserLang;
        }
        
        return 'de'; // Default
    }
    
    async init() {
        try {
            await this.loadTranslations();
            this.applyTranslations();
            this.isLoaded = true;
            console.log('Dashboard 2 i18n loaded successfully');
        } catch (error) {
            console.warn('Failed to load dashboard 2 i18n translations, using fallback', error);
            this.loadFallbackTranslations();
        }
    }
    
    async loadTranslations() {
        const response = await fetch(`./i18n/dashboard-2/${this.currentLang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${this.currentLang}.json`);
        
        const data = await response.json();
        this.translations = data.dashboard_2 || {};
    }
    
    loadFallbackTranslations() {
        // Embedded German fallback translations for offline use
        this.translations = {
            meta: {
                title: "KI Konzept Builder - Dein Gründer-Dashboard"
            },
            header: {
                logo_text: "KI Konzept Builder",
                navigation: {
                    dashboard: "Dashboard",
                    dokumente: "Dokumente",
                    beratung: "Beratung",
                    fortschritt: "Fortschritt"
                }
            },
            welcome: {
                title: "Willkommen zurück, Marcel! 👋",
                subtitle: "Hier ist dein persönlicher Überblick über deine Gründungsreise."
            },
            quick_actions: {
                title: "Schnellzugriff"
            },
            next_steps: {
                title: "Deine nächsten Schritte"
            },
            documents: {
                title: "Aktuelle Dokumente",
                view_all: "Alle anzeigen →"
            },
            appointments: {
                title: "Anstehende Termine"
            }
        };
        this.isLoaded = true;
    }
    
    applyTranslations() {
        // Update existing HTML data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.get(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        // Update document title
        if (this.translations.meta && this.translations.meta.title) {
            document.title = this.translations.meta.title;
        }
    }
    
    get(key, fallback = key) {
        if (!this.isLoaded) {
            return fallback;
        }
        
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return fallback;
            }
        }
        
        return typeof value === 'string' ? value : fallback;
    }
    
    switchLanguage(newLang) {
        if (['de', 'en', 'fr', 'es', 'it'].includes(newLang) && newLang !== this.currentLang) {
            this.currentLang = newLang;
            localStorage.setItem('preferred_language', newLang);
            this.init(); // Reload translations
            
            // Update URL without reload
            const url = new URL(window.location);
            url.searchParams.set('lang', newLang);
            window.history.replaceState({}, '', url);
        }
    }
}

// Global instance
window.dashboard2I18n = new Dashboard2I18n();