class PaymentSuccessInternationalization {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'de';
        this.translations = {};
        this.fallbackLanguage = 'de';
        
        // Initialize immediately
        this.initialize();
    }

    async initialize() {
        console.log('Payment Success i18n initializing...');
        
        // Load translations for current language
        await this.loadTranslations(this.currentLanguage);
        
        // Apply translations
        this.applyTranslations();
        
        // Update page title
        this.updatePageTitle();
        
        console.log('Payment Success i18n initialization complete');
    }

    async loadTranslations(language) {
        if (this.translations[language]) {
            console.log(`Payment Success translations for ${language} already loaded`);
            return;
        }

        try {
            console.log(`Loading Payment Success translations for ${language}...`);
            const response = await fetch(`i18n/payment-success/${language}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            this.translations[language] = await response.json();
            console.log(`Payment Success translations for ${language} loaded successfully`);
            
        } catch (error) {
            console.error(`Failed to load Payment Success translations for ${language}:`, error);
            
            if (language !== this.fallbackLanguage) {
                console.log(`Falling back to ${this.fallbackLanguage}`);
                await this.loadTranslations(this.fallbackLanguage);
                this.currentLanguage = this.fallbackLanguage;
            }
        }
    }

    updatePageTitle() {
        const title = this.getTranslation('meta.title');
        if (title) {
            document.title = title;
        }
    }

    getTranslation(key, defaultValue = '') {
        const lang = this.currentLanguage;
        if (!this.translations[lang]) {
            return defaultValue;
        }

        const keys = key.split('.');
        let value = this.translations[lang];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Try fallback language
                if (lang !== this.fallbackLanguage && this.translations[this.fallbackLanguage]) {
                    value = this.translations[this.fallbackLanguage];
                    for (const fallbackKey of keys) {
                        if (value && typeof value === 'object' && fallbackKey in value) {
                            value = value[fallbackKey];
                        } else {
                            return defaultValue;
                        }
                    }
                    break;
                } else {
                    return defaultValue;
                }
            }
        }
        
        return value || defaultValue;
    }

    applyTranslations() {
        console.log('Applying Payment Success translations...');
        
        // Apply basic data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.textContent = translation;
            }
        });

        console.log('Payment Success translations applied');
    }

    // Generate localized payment details
    generatePaymentDetails(paymentData) {
        const packageName = this.getTranslation(`packages.${paymentData.package}`) || paymentData.package;
        
        return `
            <div class="detail-item">
                <span class="detail-label">${this.getTranslation('details.package')}</span>
                <span class="detail-value">${packageName}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">${this.getTranslation('details.amount')}</span>
                <span class="detail-value">€${paymentData.amount}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">${this.getTranslation('details.date')}</span>
                <span class="detail-value">${paymentData.date}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">${this.getTranslation('details.invoice')}</span>
                <span class="detail-value">KKB-${Date.now()}</span>
            </div>
        `;
    }

    // Format date according to current language
    formatDate(date = new Date()) {
        const localeMap = {
            'de': 'de-DE',
            'en': 'en-US',
            'fr': 'fr-FR',
            'es': 'es-ES',
            'it': 'it-IT'
        };
        
        const locale = localeMap[this.currentLanguage] || 'de-DE';
        return date.toLocaleDateString(locale);
    }

    async switchLanguage(newLanguage) {
        if (newLanguage === this.currentLanguage) return;
        
        console.log(`Switching Payment Success language from ${this.currentLanguage} to ${newLanguage}`);
        
        try {
            await this.loadTranslations(newLanguage);
            this.currentLanguage = newLanguage;
            localStorage.setItem('language', newLanguage);
            
            this.applyTranslations();
            this.updatePageTitle();
            
            // Re-render payment details if they exist
            const detailsElement = document.getElementById('paymentDetails');
            if (detailsElement && detailsElement.innerHTML.trim()) {
                // Extract data from existing details and re-render
                const urlParams = new URLSearchParams(window.location.search);
                const paymentData = {
                    package: urlParams.get('package') || 'professional',
                    amount: urlParams.get('amount') || '890',
                    date: this.formatDate()
                };
                
                detailsElement.innerHTML = this.generatePaymentDetails(paymentData);
            }
            
            console.log(`Payment Success language switched to ${newLanguage}`);
            
        } catch (error) {
            console.error('Failed to switch Payment Success language:', error);
        }
    }
}

// Global variable for payment success i18n
let paymentSuccessI18n;

// Enhanced DOMContentLoaded handler that includes i18n
const originalDOMContentLoaded = window.addEventListener;
window.addEventListener = function(type, listener, options) {
    if (type === 'DOMContentLoaded') {
        // Wrap the original listener to include i18n initialization
        const wrappedListener = async function(event) {
            // Initialize i18n first
            paymentSuccessI18n = new PaymentSuccessInternationalization();
            
            // Then call the original listener
            if (typeof listener === 'function') {
                // Wait a bit for i18n to load
                setTimeout(() => listener(event), 100);
            }
        };
        originalDOMContentLoaded.call(this, type, wrappedListener, options);
    } else {
        originalDOMContentLoaded.call(this, type, listener, options);
    }
};

// Global function for language switching
window.switchPaymentSuccessLanguage = (language) => {
    if (paymentSuccessI18n) {
        paymentSuccessI18n.switchLanguage(language);
    }
};

// Enhanced payment details generation for existing payment success logic
window.generateLocalizedPaymentDetails = (paymentData) => {
    if (paymentSuccessI18n) {
        return paymentSuccessI18n.generatePaymentDetails({
            ...paymentData,
            date: paymentSuccessI18n.formatDate()
        });
    }
    
    // Fallback for when i18n is not loaded yet
    return `
        <div class="detail-item">
            <span class="detail-label">Paket:</span>
            <span class="detail-value">${paymentData.package}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Betrag:</span>
            <span class="detail-value">€${paymentData.amount}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Datum:</span>
            <span class="detail-value">${paymentData.date}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Rechnungsnummer:</span>
            <span class="detail-value">KKB-${Date.now()}</span>
        </div>
    `;
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentSuccessInternationalization;
}