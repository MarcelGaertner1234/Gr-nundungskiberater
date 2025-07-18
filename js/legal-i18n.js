// Legal pages i18n module
class LegalI18n {
    constructor() {
        this.currentLang = localStorage.getItem('selectedLanguage') || 'de';
        this.translations = null;
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.applyTranslations();
        this.setupLanguageDetection();
    }

    async loadTranslations() {
        try {
            const response = await fetch(`/i18n/${this.currentLang}.json`);
            const data = await response.json();
            this.translations = data.legal;
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to German
            try {
                const fallbackResponse = await fetch('/i18n/de.json');
                const fallbackData = await fallbackResponse.json();
                this.translations = fallbackData.legal;
            } catch (fallbackError) {
                console.error('Error loading fallback translations:', fallbackError);
            }
        }
    }

    applyTranslations() {
        if (!this.translations) return;

        // Apply translations based on data attributes
        document.querySelectorAll('[data-i18n-legal]').forEach(element => {
            const key = element.getAttribute('data-i18n-legal');
            const translation = this.getNestedProperty(this.translations, key);
            
            if (translation) {
                if (Array.isArray(translation)) {
                    // Handle arrays (like service lists)
                    if (element.tagName === 'UL') {
                        element.innerHTML = translation.map(item => `<li>${item}</li>`).join('');
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update page language
        document.documentElement.lang = this.currentLang;
    }

    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    setupLanguageDetection() {
        // Check URL parameters for language
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        
        if (langParam && ['de', 'en', 'es', 'fr', 'it'].includes(langParam)) {
            this.currentLang = langParam;
            localStorage.setItem('selectedLanguage', langParam);
            this.loadTranslations().then(() => this.applyTranslations());
        }

        // Listen for language changes
        window.addEventListener('languageChanged', (event) => {
            this.currentLang = event.detail.language;
            this.loadTranslations().then(() => this.applyTranslations());
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LegalI18n());
} else {
    new LegalI18n();
}