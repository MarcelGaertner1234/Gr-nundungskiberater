// Currency configuration for different regions
class CurrencyConfig {
    constructor() {
        this.currencies = {
            de: {
                code: 'EUR',
                symbol: '€',
                locale: 'de-DE',
                position: 'after', // €100
                exchangeRate: 1
            },
            en: {
                code: 'USD',
                symbol: '$',
                locale: 'en-US',
                position: 'before', // $100
                exchangeRate: 1.08 // 1 EUR = 1.08 USD (approximate)
            },
            es: {
                code: 'EUR',
                symbol: '€',
                locale: 'es-ES',
                position: 'after',
                exchangeRate: 1
            },
            fr: {
                code: 'EUR',
                symbol: '€',
                locale: 'fr-FR',
                position: 'after',
                exchangeRate: 1
            },
            it: {
                code: 'EUR',
                symbol: '€',
                locale: 'it-IT',
                position: 'after',
                exchangeRate: 1
            }
        };

        this.currentLang = localStorage.getItem('selectedLanguage') || 'de';
        this.currentCurrency = this.currencies[this.currentLang];
        this.init();
    }

    init() {
        // Listen for language changes
        window.addEventListener('languageChanged', (event) => {
            this.currentLang = event.detail.language;
            this.currentCurrency = this.currencies[this.currentLang];
            this.updateAllPrices();
            this.savePreferences();
        });
        
        // Load saved preferences on init
        this.loadPreferences();
    }

    formatPrice(amountInEUR, options = {}) {
        const {
            showSymbol = true,
            showCode = false,
            decimals = 0
        } = options;

        // Convert EUR to target currency
        const convertedAmount = amountInEUR * this.currentCurrency.exchangeRate;
        
        // Format number
        const formattedNumber = new Intl.NumberFormat(this.currentCurrency.locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(convertedAmount);

        // Build final string
        let result = '';
        if (showSymbol) {
            if (this.currentCurrency.position === 'before') {
                result = `${this.currentCurrency.symbol}${formattedNumber}`;
            } else {
                result = `${formattedNumber}${this.currentCurrency.symbol}`;
            }
        } else {
            result = formattedNumber;
        }

        if (showCode) {
            result += ` ${this.currentCurrency.code}`;
        }

        return result;
    }

    updateAllPrices() {
        // Update all price elements with data-price attribute
        document.querySelectorAll('[data-price]').forEach(element => {
            const priceInEUR = parseFloat(element.getAttribute('data-price'));
            const options = {
                showSymbol: element.getAttribute('data-show-symbol') !== 'false',
                showCode: element.getAttribute('data-show-code') === 'true',
                decimals: parseInt(element.getAttribute('data-decimals') || '0')
            };
            
            element.textContent = this.formatPrice(priceInEUR, options);
        });

        // Update currency indicators
        document.querySelectorAll('[data-currency-symbol]').forEach(element => {
            element.textContent = this.currentCurrency.symbol;
        });

        document.querySelectorAll('[data-currency-code]').forEach(element => {
            element.textContent = this.currentCurrency.code;
        });

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('currencyChanged', {
            detail: {
                currency: this.currentCurrency,
                language: this.currentLang
            }
        }));
    }

    getCurrency() {
        return this.currentCurrency;
    }

    convertFromEUR(amountInEUR) {
        return amountInEUR * this.currentCurrency.exchangeRate;
    }

    convertToEUR(amount) {
        return amount / this.currentCurrency.exchangeRate;
    }
    
    async savePreferences() {
        // Get current user ID
        const currentSession = JSON.parse(localStorage.getItem('currentSession') || '{}');
        const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
        const userId = currentSession.userId || onboardingData.userId;
        
        if (userId && window.db) {
            await window.db.updateLanguageAndCurrency(
                userId,
                this.currentLang,
                this.currentCurrency.code
            );
        }
        
        // Also save to localStorage for quick access
        localStorage.setItem('userPreferences', JSON.stringify({
            language: this.currentLang,
            currency: this.currentCurrency.code
        }));
    }
    
    async loadPreferences() {
        try {
            // Try to get from database first
            const currentSession = JSON.parse(localStorage.getItem('currentSession') || '{}');
            const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
            const userId = currentSession.userId || onboardingData.userId;
            
            if (userId && window.db) {
                const result = await window.db.getUserPreferences(userId);
                if (result.success && result.data) {
                    this.currentLang = result.data.language || this.currentLang;
                    this.currentCurrency = this.currencies[this.currentLang];
                    this.updateAllPrices();
                    return;
                }
            }
            
            // Fallback to localStorage
            const savedPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
            if (savedPrefs.language) {
                this.currentLang = savedPrefs.language;
                this.currentCurrency = this.currencies[this.currentLang];
                this.updateAllPrices();
            }
        } catch (error) {
            console.error('Error loading preferences:', error);
        }
    }
}

// Initialize global currency config
window.currencyConfig = new CurrencyConfig();

// Helper function for templates
window.formatPrice = (amountInEUR, options) => {
    return window.currencyConfig.formatPrice(amountInEUR, options);
};