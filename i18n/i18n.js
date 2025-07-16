/**
 * Internationalization (i18n) System for Landing Page
 * Supports 5 languages: DE, EN, FR, ES, IT
 */

class I18nManager {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = {};
        this.supportedLanguages = ['de', 'en', 'fr', 'es', 'it'];
        this.defaultLanguage = 'de';
        
        // Initialize
        this.init();
    }

    async init() {
        // Get language from localStorage or browser
        this.currentLanguage = this.getInitialLanguage();
        
        // Load translations
        await this.loadTranslations(this.currentLanguage);
        
        // Apply translations to page
        this.applyTranslations();
        
        // Set up language switcher
        this.setupLanguageSwitcher();
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    }

    getInitialLanguage() {
        // Check localStorage first
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
            return savedLanguage;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }

        // Default to German
        return this.defaultLanguage;
    }

    async loadTranslations(language) {
        if (this.translations[language]) {
            return this.translations[language];
        }

        try {
            const response = await fetch(`i18n/landing/${language}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${language} translations`);
            }
            this.translations[language] = await response.json();
            return this.translations[language];
        } catch (error) {
            console.error(`Error loading translations for ${language}:`, error);
            
            // Fallback to default language
            if (language !== this.defaultLanguage) {
                return this.loadTranslations(this.defaultLanguage);
            }
            
            return {};
        }
    }

    async changeLanguage(newLanguage) {
        if (!this.supportedLanguages.includes(newLanguage)) {
            console.error(`Language ${newLanguage} is not supported`);
            return;
        }

        this.currentLanguage = newLanguage;
        
        // Save to localStorage
        localStorage.setItem('selectedLanguage', newLanguage);
        
        // Load translations if not already loaded
        await this.loadTranslations(newLanguage);
        
        // Apply translations
        this.applyTranslations();
        
        // Update HTML lang attribute
        document.documentElement.lang = newLanguage;
        
        // Update active language in switcher
        this.updateLanguageSwitcher();
        
        // Update meta tags
        this.updateMetaTags();
    }

    getText(key, defaultText = '') {
        const translation = this.translations[this.currentLanguage];
        if (!translation) {
            return defaultText;
        }

        const keys = key.split('.');
        let value = translation;
        
        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) {
                return defaultText;
            }
        }
        
        return value || defaultText;
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getText(key);
            
            if (translation) {
                if (element.hasAttribute('data-i18n-html')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Handle placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getText(key);
            
            if (translation) {
                element.setAttribute('placeholder', translation);
            }
        });

        // Handle alt attributes
        const altElements = document.querySelectorAll('[data-i18n-alt]');
        altElements.forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            const translation = this.getText(key);
            
            if (translation) {
                element.setAttribute('alt', translation);
            }
        });

        // Handle title attributes
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.getText(key);
            
            if (translation) {
                element.setAttribute('title', translation);
            }
        });
    }

    updateMetaTags() {
        const translation = this.translations[this.currentLanguage];
        if (!translation?.meta) return;

        // Update title
        if (translation.meta.title) {
            document.title = translation.meta.title;
        }

        // Update meta description
        const metaDescription = document.querySelector('meta[name=\"description\"]');
        if (metaDescription && translation.meta.description) {
            metaDescription.setAttribute('content', translation.meta.description);
        }

        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name=\"keywords\"]');
        if (metaKeywords && translation.meta.keywords) {
            metaKeywords.setAttribute('content', translation.meta.keywords);
        }

        // Update Open Graph meta tags
        const ogTitle = document.querySelector('meta[property=\"og:title\"]');
        if (ogTitle && translation.meta.title) {
            ogTitle.setAttribute('content', translation.meta.title);
        }

        const ogDescription = document.querySelector('meta[property=\"og:description\"]');
        if (ogDescription && translation.meta.description) {
            ogDescription.setAttribute('content', translation.meta.description);
        }

        // Update Twitter Card meta tags
        const twitterTitle = document.querySelector('meta[name=\"twitter:title\"]');
        if (twitterTitle && translation.meta.title) {
            twitterTitle.setAttribute('content', translation.meta.title);
        }

        const twitterDescription = document.querySelector('meta[name=\"twitter:description\"]');
        if (twitterDescription && translation.meta.description) {
            twitterDescription.setAttribute('content', translation.meta.description);
        }
    }

    setupLanguageSwitcher() {
        // Create language switcher if it doesn't exist
        if (!document.getElementById('languageSwitcher')) {
            this.createLanguageSwitcher();
        }

        // Add event listeners
        const languageButtons = document.querySelectorAll('[data-language]');
        languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const language = button.getAttribute('data-language');
                this.changeLanguage(language);
            });
        });

        this.updateLanguageSwitcher();
    }

    createLanguageSwitcher() {
        const languageConfig = {
            de: { name: 'Deutsch', flag: '🇩🇪' },
            en: { name: 'English', flag: '🇺🇸' },
            fr: { name: 'Français', flag: '🇫🇷' },
            es: { name: 'Español', flag: '🇪🇸' },
            it: { name: 'Italiano', flag: '🇮🇹' }
        };

        const switcher = document.createElement('div');
        switcher.id = 'languageSwitcher';
        switcher.className = 'language-switcher';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        
        const button = document.createElement('button');
        button.className = 'language-button';
        button.innerHTML = `
            <span class="language-flag">${languageConfig[this.currentLanguage].flag}</span>
            <span class="language-name">${languageConfig[this.currentLanguage].name}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L2 4h8L6 8z"/>
            </svg>
        `;
        
        const menu = document.createElement('div');
        menu.className = 'language-menu';
        
        this.supportedLanguages.forEach(lang => {
            const item = document.createElement('button');
            item.className = 'language-item';
            item.setAttribute('data-language', lang);
            item.innerHTML = `
                <span class="language-flag">${languageConfig[lang].flag}</span>
                <span class="language-name">${languageConfig[lang].name}</span>
            `;
            menu.appendChild(item);
        });
        
        dropdown.appendChild(button);
        dropdown.appendChild(menu);
        switcher.appendChild(dropdown);
        
        // Add to header
        const headerActions = document.querySelector('.header-actions');
        if (headerActions) {
            headerActions.insertBefore(switcher, headerActions.firstChild);
        }
        
        // Toggle dropdown
        button.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Add CSS
        this.addLanguageSwitcherStyles();
    }

    addLanguageSwitcherStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .language-switcher {
                position: relative;
                z-index: 1001;
            }
            
            .language-dropdown {
                position: relative;
            }
            
            .language-button {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 0.75rem;
                border: 1px solid var(--color-border);
                border-radius: var(--border-radius-500);
                background: var(--color-page);
                color: var(--color-text);
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 0.875rem;
                font-weight: 500;
            }
            
            .language-button:hover {
                background: var(--color-hover);
            }
            
            .language-dropdown.active .language-button {
                background: var(--color-hover);
            }
            
            .language-menu {
                position: absolute;
                top: 100%;
                right: 0;
                min-width: 150px;
                background: var(--color-page);
                border: 1px solid var(--color-border);
                border-radius: var(--border-radius-500);
                box-shadow: var(--shadow-level-200);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.2s ease;
                z-index: 1000;
                overflow: hidden;
            }
            
            .language-dropdown.active .language-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .language-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                width: 100%;
                padding: 0.75rem 1rem;
                border: none;
                background: transparent;
                color: var(--color-text);
                cursor: pointer;
                transition: background-color 0.2s ease;
                font-size: 0.875rem;
                font-weight: 500;
                text-align: left;
            }
            
            .language-item:hover {
                background: var(--color-hover);
            }
            
            .language-item[data-language="${this.currentLanguage}"] {
                background: var(--color-primary);
                color: white;
            }
            
            .language-flag {
                font-size: 1rem;
                line-height: 1;
            }
            
            .language-name {
                flex: 1;
            }
            
            @media (max-width: 768px) {
                .language-switcher {
                    order: -1;
                    margin-right: 1rem;
                }
                
                .language-button {
                    padding: 0.4rem 0.6rem;
                    font-size: 0.8rem;
                }
                
                .language-menu {
                    right: auto;
                    left: 0;
                    min-width: 130px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    updateLanguageSwitcher() {
        const languageConfig = {
            de: { name: 'Deutsch', flag: '🇩🇪' },
            en: { name: 'English', flag: '🇺🇸' },
            fr: { name: 'Français', flag: '🇫🇷' },
            es: { name: 'Español', flag: '🇪🇸' },
            it: { name: 'Italiano', flag: '🇮🇹' }
        };

        const button = document.querySelector('.language-button');
        if (button) {
            button.innerHTML = `
                <span class="language-flag">${languageConfig[this.currentLanguage].flag}</span>
                <span class="language-name">${languageConfig[this.currentLanguage].name}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 8L2 4h8L6 8z"/>
                </svg>
            `;
        }

        // Update active item
        const languageItems = document.querySelectorAll('.language-item');
        languageItems.forEach(item => {
            const lang = item.getAttribute('data-language');
            if (lang === this.currentLanguage) {
                item.style.background = 'var(--color-primary)';
                item.style.color = 'white';
            } else {
                item.style.background = 'transparent';
                item.style.color = 'var(--color-text)';
            }
        });
    }

    // Utility method to get language name
    getLanguageName(code) {
        const languageNames = {
            de: 'Deutsch',
            en: 'English',
            fr: 'Français',
            es: 'Español',
            it: 'Italiano'
        };
        return languageNames[code] || code;
    }
}

// Initialize i18n system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18nManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nManager;
}