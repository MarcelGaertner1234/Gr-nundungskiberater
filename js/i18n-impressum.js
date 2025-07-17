// Impressum Page i18n System
class ImpressumI18n {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = {};
        this.supportedLanguages = ['de', 'en', 'fr', 'es', 'it'];
        this.fallbackLanguage = 'de';
    }

    // Initialize the i18n system
    async init() {
        console.log('🔧 Initializing Impressum i18n system...');
        
        // Detect user's preferred language
        this.currentLanguage = this.detectLanguage();
        
        // Load translations
        await this.loadTranslations(this.currentLanguage);
        
        // Apply translations to the page
        this.applyTranslations();
        
        // Setup language switcher if it exists
        this.setupLanguageSwitcher();
        
        console.log(`✅ Impressum i18n initialized with language: ${this.currentLanguage}`);
    }

    // Detect user's preferred language
    detectLanguage() {
        // Check localStorage first
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
            return savedLanguage;
        }

        // Check browser language
        const browserLanguage = navigator.language.substring(0, 2);
        if (this.supportedLanguages.includes(browserLanguage)) {
            return browserLanguage;
        }

        // Default to German
        return this.fallbackLanguage;
    }

    // Load translations for a specific language
    async loadTranslations(language) {
        try {
            const response = await fetch(`i18n/impressum/${language}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${language}`);
            }
            this.translations = await response.json();
            console.log(`📝 Loaded ${language} translations for impressum page`);
        } catch (error) {
            console.error('Error loading translations:', error);
            
            // Fallback to German if current language fails
            if (language !== this.fallbackLanguage) {
                console.log(`🔄 Falling back to ${this.fallbackLanguage}`);
                await this.loadTranslations(this.fallbackLanguage);
                this.currentLanguage = this.fallbackLanguage;
            }
        }
    }

    // Apply translations to all elements with data-i18n attributes
    applyTranslations() {
        console.log('🌐 Applying impressum translations...');

        // Update page title
        if (this.translations.meta?.title) {
            document.title = this.translations.meta.title;
        }

        // Apply translations to all elements with data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Handle special href attributes for external links
        this.updateExternalLinks();
        
        // Update language-specific attributes
        document.documentElement.lang = this.currentLanguage;
        
        console.log('✅ Impressum translations applied successfully');
    }

    // Handle external links that might need language-specific URLs
    updateExternalLinks() {
        // Update EU platform link if it exists
        const euPlatformLink = document.querySelector('[data-i18n-href="dispute_resolution.eu_platform_url"]');
        if (euPlatformLink && this.translations.dispute_resolution?.eu_platform_url) {
            euPlatformLink.href = this.translations.dispute_resolution.eu_platform_url;
        }
    }

    // Get nested translation using dot notation
    getNestedTranslation(key) {
        return key.split('.').reduce((obj, k) => obj && obj[k], this.translations);
    }

    // Change language
    async changeLanguage(language) {
        if (!this.supportedLanguages.includes(language)) {
            console.error(`Language ${language} is not supported`);
            return;
        }

        console.log(`🔄 Changing language to ${language}`);
        
        this.currentLanguage = language;
        localStorage.setItem('preferredLanguage', language);
        
        await this.loadTranslations(language);
        this.applyTranslations();
        
        // Update active language in switcher
        this.updateLanguageSwitcher();
        
        console.log(`✅ Language changed to ${language}`);
    }

    // Setup language switcher functionality
    setupLanguageSwitcher() {
        const languageButtons = document.querySelectorAll('[data-language]');
        
        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const language = button.getAttribute('data-language');
                this.changeLanguage(language);
            });
        });

        // Set initial active state
        this.updateLanguageSwitcher();
    }

    // Update language switcher active state
    updateLanguageSwitcher() {
        const languageButtons = document.querySelectorAll('[data-language]');
        
        languageButtons.forEach(button => {
            const language = button.getAttribute('data-language');
            if (language === this.currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Get available languages
    getAvailableLanguages() {
        return this.supportedLanguages;
    }

    // Get translation by key
    getTranslation(key) {
        return this.getNestedTranslation(key);
    }

    // Format company information for different languages
    formatCompanyInfo() {
        const companyInfo = this.translations.company_info;
        if (!companyInfo) return;

        // Language-specific formatting could be applied here
        // For example, address formatting conventions
        console.log('📍 Company info formatted for', this.currentLanguage);
    }

    // Update legal document references for different jurisdictions
    updateLegalReferences() {
        // Different countries might have different legal references
        // This could be extended to handle jurisdiction-specific legal texts
        console.log('⚖️ Legal references updated for', this.currentLanguage);
    }
}

// Initialize the impressum i18n system when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Create global instance
        window.impressumI18n = new ImpressumI18n();
        await window.impressumI18n.init();
        
        console.log('🌍 Impressum page i18n system ready!');
    } catch (error) {
        console.error('Failed to initialize impressum i18n system:', error);
    }
});

// Expose functions globally for easy access
window.changeImpressumLanguage = (language) => {
    if (window.impressumI18n) {
        window.impressumI18n.changeLanguage(language);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImpressumI18n;
}