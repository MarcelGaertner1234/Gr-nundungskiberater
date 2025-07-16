/**
 * i18n System for Dashboard
 * Handles translations for dashboard components
 */

class DashboardI18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'de';
        this.translations = {};
        this.isLoaded = false;
        this.loadTranslations();
    }

    async loadTranslations() {
        try {
            const response = await fetch(`/i18n/dashboard/${this.currentLang}.json`);
            const data = await response.json();
            this.translations = data.dashboard;
            this.isLoaded = true;
        } catch (error) {
            console.error('Failed to load dashboard translations:', error);
            // Fallback to German
            this.currentLang = 'de';
            try {
                const response = await fetch(`/i18n/dashboard/de.json`);
                const data = await response.json();
                this.translations = data.dashboard;
                this.isLoaded = true;
            } catch (fallbackError) {
                console.error('Failed to load fallback translations:', fallbackError);
            }
        }
    }

    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            value = value?.[k];
            if (!value) {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        // Replace placeholders
        if (typeof value === 'string') {
            return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
                return params[param] || match;
            });
        }
        
        return value;
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.loadTranslations().then(() => {
            // Trigger re-render of dashboard
            if (window.updateDashboardTranslations) {
                window.updateDashboardTranslations();
            }
        });
    }
}

// Initialize i18n
const dashboardI18n = new DashboardI18n();

// Make it globally available
window.dashboardI18n = dashboardI18n;

// Helper function for easier access
window.t = (key, params) => dashboardI18n.t(key, params);