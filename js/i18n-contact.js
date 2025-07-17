// Modern Contact Page i18n System
class ContactI18n {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = {};
        this.supportedLanguages = ['de', 'en', 'fr', 'es', 'it'];
        this.fallbackLanguage = 'de';
    }

    // Initialize the i18n system
    async init() {
        console.log('🔧 Initializing Contact i18n system...');
        
        // Detect user's preferred language
        this.currentLanguage = this.detectLanguage();
        
        // Load translations
        await this.loadTranslations(this.currentLanguage);
        
        // Apply translations to the page immediately
        this.applyTranslations();
        
        // Setup language switcher if it exists
        this.setupLanguageSwitcher();
        
        console.log(`✅ Contact i18n initialized with language: ${this.currentLanguage}`);
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
            const response = await fetch(`i18n/contact/${language}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${language}`);
            }
            this.translations = await response.json();
            console.log(`📝 Loaded ${language} translations for contact page`);
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
        console.log('🌐 Applying contact translations...');

        // Update page title
        if (this.translations.contact?.meta?.title) {
            document.title = this.translations.contact.meta.title;
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

        // Apply placeholders for input fields
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getNestedTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Handle complex HTML structures like privacy checkbox
        this.handleComplexStructures();
        
        // Update language-specific attributes
        document.documentElement.lang = this.currentLanguage;
        
        console.log('✅ Contact translations applied successfully');
    }

    // Handle complex HTML structures that need special treatment
    handleComplexStructures() {
        // Handle privacy checkbox text with embedded link
        const privacyElement = document.querySelector('[data-i18n="contact.form.fields.privacy.text"]');
        if (privacyElement && this.translations.contact?.form?.fields?.privacy) {
            const privacyData = this.translations.contact.form.fields.privacy;
            const linkText = privacyData.privacy_link_text || 'Datenschutzerklärung';
            const privacyText = privacyData.text || '';
            
            // Replace {privacy_link} placeholder in text
            if (privacyText.includes('{privacy_link}')) {
                privacyElement.innerHTML = privacyText.replace('{privacy_link}', `<a href="privacy.html" target="_blank">${linkText}</a>`);
            }
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

    // Form validation with i18n
    validateForm(formData) {
        const errors = [];
        const t = this.translations.contact?.form?.validation || {};

        if (!formData.firstName) {
            errors.push(t.first_name_required || 'First name is required');
        }
        if (!formData.lastName) {
            errors.push(t.last_name_required || 'Last name is required');
        }
        if (!formData.email) {
            errors.push(t.email_required || 'Email is required');
        }
        if (!formData.subject) {
            errors.push(t.subject_required || 'Subject is required');
        }
        if (!formData.message) {
            errors.push(t.message_required || 'Message is required');
        }
        if (!formData.privacy) {
            errors.push(t.privacy_required || 'Privacy consent is required');
        }

        return errors;
    }
}

// Initialize the contact i18n system when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Create global instance
        window.contactI18n = new ContactI18n();
        await window.contactI18n.init();
        
        console.log('🌍 Contact page i18n system ready!');
    } catch (error) {
        console.error('Failed to initialize contact i18n system:', error);
    }
});

// Expose functions globally for easy access
window.changeContactLanguage = (language) => {
    if (window.contactI18n) {
        window.contactI18n.changeLanguage(language);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactI18n;
}