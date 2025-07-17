// Privacy Page i18n System
class PrivacyI18n {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = {};
        this.supportedLanguages = ['de', 'en', 'fr', 'es', 'it'];
        this.fallbackLanguage = 'de';
    }

    // Initialize the i18n system
    async init() {
        console.log('🔧 Initializing Privacy i18n system...');
        
        // Detect user's preferred language
        this.currentLanguage = this.detectLanguage();
        
        // Load translations
        await this.loadTranslations(this.currentLanguage);
        
        // Apply translations to the page
        this.applyTranslations();
        
        // Setup language switcher if it exists
        this.setupLanguageSwitcher();
        
        console.log(`✅ Privacy i18n initialized with language: ${this.currentLanguage}`);
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
            const response = await fetch(`i18n/privacy/${language}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${language}`);
            }
            this.translations = await response.json();
            console.log(`📝 Loaded ${language} translations for privacy page`);
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
        console.log('🌐 Applying privacy translations...');

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

        // Handle special list items
        this.updateListItems();
        
        // Update language-specific attributes
        document.documentElement.lang = this.currentLanguage;
        
        console.log('✅ Privacy translations applied successfully');
    }

    // Handle list items that need to be populated from arrays
    updateListItems() {
        // Server logs items
        const serverLogsContainer = document.querySelector('[data-i18n-list="section3.server_logs_items"]');
        if (serverLogsContainer && this.translations.section3?.server_logs_items) {
            this.populateList(serverLogsContainer, this.translations.section3.server_logs_items);
        }

        // Registration items
        const registrationContainer = document.querySelector('[data-i18n-list="section3.registration_items"]');
        if (registrationContainer && this.translations.section3?.registration_items) {
            this.populateList(registrationContainer, this.translations.section3.registration_items);
        }

        // Local storage items
        const localStorageContainer = document.querySelector('[data-i18n-list="section4.local_storage_items"]');
        if (localStorageContainer && this.translations.section4?.local_storage_items) {
            this.populateList(localStorageContainer, this.translations.section4.local_storage_items);
        }

        // Stripe items
        const stripeContainer = document.querySelector('[data-i18n-list="section5.stripe_items"]');
        if (stripeContainer && this.translations.section5?.stripe_items) {
            this.populateList(stripeContainer, this.translations.section5.stripe_items);
        }

        // Retention items
        const retentionContainer = document.querySelector('[data-i18n-list="section9.retention_items"]');
        if (retentionContainer && this.translations.section9?.retention_items) {
            this.populateList(retentionContainer, this.translations.section9.retention_items);
        }
    }

    // Helper function to populate list items
    populateList(container, items) {
        container.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            container.appendChild(li);
        });
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
}

// Initialize the privacy i18n system when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Create global instance
        window.privacyI18n = new PrivacyI18n();
        await window.privacyI18n.init();
        
        console.log('🌍 Privacy page i18n system ready!');
    } catch (error) {
        console.error('Failed to initialize privacy i18n system:', error);
    }
});

// Expose functions globally for easy access
window.changePrivacyLanguage = (language) => {
    if (window.privacyI18n) {
        window.privacyI18n.changeLanguage(language);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PrivacyI18n;
}