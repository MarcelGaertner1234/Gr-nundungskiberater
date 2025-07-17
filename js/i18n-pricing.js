/**
 * i18n System for Pricing Page
 * Handles translations for pricing components
 */

class PricingInternationalization {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'de';
        this.translations = {};
        this.fallbackLanguage = 'de';
        
        // Initialize immediately
        this.initialize();
    }

    async initialize() {
        console.log('Pricing i18n initializing...');
        
        // Load translations for current language
        await this.loadTranslations(this.currentLanguage);
        
        // Apply translations
        this.applyTranslations();
        
        // Update page title
        this.updatePageTitle();
        
        console.log('Pricing i18n initialization complete');
    }

    async loadTranslations(language) {
        if (this.translations[language]) {
            console.log(`Pricing translations for ${language} already loaded`);
            return;
        }

        try {
            console.log(`Loading pricing translations for ${language}...`);
            const response = await fetch(`i18n/pricing/${language}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            this.translations[language] = data.pricing;
            console.log(`Pricing translations for ${language} loaded successfully`);
            
        } catch (error) {
            console.error(`Failed to load pricing translations for ${language}:`, error);
            
            if (language !== this.fallbackLanguage) {
                console.log(`Falling back to ${this.fallbackLanguage}`);
                await this.loadTranslations(this.fallbackLanguage);
                this.currentLanguage = this.fallbackLanguage;
            }
        }
    }

    updatePageTitle() {
        const navPricing = this.getTranslation('nav.pricing');
        if (navPricing) {
            document.title = `${navPricing} & Pakete - KI Konzept Builder`;
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
        console.log('Applying pricing translations...');
        
        // Apply basic data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.textContent = translation;
            }
        });

        // Apply pricing-specific content
        this.applyPricingContent();
        
        console.log('Pricing translations applied');
    }

    applyPricingContent() {
        // Update consultation pricing
        this.updateConsultationPricing();
        
        // Update package pricing
        this.updatePackagePricing();
        
        // Update FAQ section
        this.updateFAQSection();
        
        // Update CTA section
        this.updateCTASection();
        
        // Update footer
        this.updateFooter();
    }

    updateConsultationPricing() {
        // Individual consultation pricing is handled by data-i18n attributes
        // but we can add dynamic pricing here if needed
        
        // Update per session text for paid consultations
        document.querySelectorAll('.consultation-price .price-note').forEach((element, index) => {
            // Skip the first one (free consultation)
            if (index > 0) {
                const perSessionText = this.getTranslation('consultations.per_session');
                if (perSessionText && !element.hasAttribute('data-i18n')) {
                    element.textContent = perSessionText;
                }
            }
        });
    }

    updatePackagePricing() {
        // Package pricing is mostly handled by data-i18n
        // Add any dynamic package updates here
        
        // Update popular badge
        const popularBadge = document.querySelector('.package-badge');
        if (popularBadge) {
            const badgeText = this.getTranslation('packages.professional.badge');
            if (badgeText) {
                popularBadge.textContent = badgeText;
            }
        }
    }

    updateFAQSection() {
        const faqSection = document.querySelector('.pricing-faq');
        if (!faqSection) return;

        const faqTitle = faqSection.querySelector('.section-title');
        if (faqTitle) {
            faqTitle.textContent = this.getTranslation('faq.title');
        }

        // Update FAQ items
        const faqItems = faqSection.querySelectorAll('.faq-item');
        ['q1', 'q2', 'q3', 'q4'].forEach((questionKey, index) => {
            if (faqItems[index]) {
                const questionElement = faqItems[index].querySelector('.faq-question h3');
                const answerElement = faqItems[index].querySelector('.faq-answer p');
                
                if (questionElement) {
                    questionElement.textContent = this.getTranslation(`faq.${questionKey}.question`);
                }
                if (answerElement) {
                    answerElement.textContent = this.getTranslation(`faq.${questionKey}.answer`);
                }
            }
        });
    }

    updateCTASection() {
        const ctaSection = document.querySelector('.pricing-cta');
        if (!ctaSection) return;

        const ctaTitle = ctaSection.querySelector('h2');
        const ctaSubtitle = ctaSection.querySelector('p');
        const ctaButton = ctaSection.querySelector('.button');

        if (ctaTitle) {
            ctaTitle.textContent = this.getTranslation('cta.title');
        }
        if (ctaSubtitle) {
            ctaSubtitle.textContent = this.getTranslation('cta.subtitle');
        }
        if (ctaButton) {
            ctaButton.textContent = this.getTranslation('cta.button');
        }
    }

    updateFooter() {
        const footerCopyright = document.querySelector('.footer-content p');
        if (footerCopyright) {
            footerCopyright.textContent = this.getTranslation('footer.copyright');
        }
    }

    // Method to update package selection modal
    updatePackageModal(packageType) {
        const modal = document.querySelector('.package-modal');
        if (!modal) return;

        const modalTitle = modal.querySelector('.modal-title');
        const packageTitle = modal.querySelector('.package-title');
        const packageFeatures = modal.querySelector('.package-features');
        const savingsText = modal.querySelector('.savings-text');
        const cancelButton = modal.querySelector('.btn-cancel');
        const proceedButton = modal.querySelector('.btn-proceed');

        if (modalTitle) {
            modalTitle.textContent = this.getTranslation('modal.title');
        }

        if (packageTitle) {
            packageTitle.textContent = this.getTranslation(`packages.${packageType}.title`);
        }

        if (cancelButton) {
            cancelButton.textContent = this.getTranslation('modal.cancel');
        }

        if (proceedButton) {
            proceedButton.textContent = this.getTranslation('modal.proceed');
        }

        // Update savings text
        if (savingsText) {
            const savings = this.getTranslation(`packages.${packageType}.savings`);
            if (savings) {
                savingsText.textContent = savings;
            }
        }

        // Update features list
        if (packageFeatures) {
            const featuresHtml = this.generatePackageFeaturesList(packageType);
            packageFeatures.innerHTML = featuresHtml;
        }
    }

    generatePackageFeaturesList(packageType) {
        const packageData = this.getTranslation(`packages.${packageType}`);
        if (!packageData) return '';

        let html = `<h4>${this.getTranslation('modal.includes')}</h4><ul>`;
        
        // Add features dynamically
        let featureIndex = 1;
        while (packageData[`feature${featureIndex}`]) {
            html += `<li>${packageData[`feature${featureIndex}`]}</li>`;
            featureIndex++;
        }
        
        html += '</ul>';
        return html;
    }

    async switchLanguage(newLanguage) {
        if (newLanguage === this.currentLanguage) return;
        
        console.log(`Switching pricing language from ${this.currentLanguage} to ${newLanguage}`);
        
        try {
            await this.loadTranslations(newLanguage);
            this.currentLanguage = newLanguage;
            localStorage.setItem('language', newLanguage);
            
            this.applyTranslations();
            this.updatePageTitle();
            
            console.log(`Pricing language switched to ${newLanguage}`);
            
        } catch (error) {
            console.error('Failed to switch pricing language:', error);
        }
    }
}

// Global variable for pricing i18n
let pricingI18n;

// Initialize pricing internationalization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    pricingI18n = new PricingInternationalization();
});

// Global function for language switching
window.switchPricingLanguage = (language) => {
    if (pricingI18n) {
        pricingI18n.switchLanguage(language);
    }
};

// Enhanced package selection function with i18n
window.selectPackage = (packageType) => {
    if (pricingI18n) {
        pricingI18n.updatePackageModal(packageType);
    }
    
    // Show modal (if modal system exists)
    const modal = document.querySelector('.package-modal');
    if (modal) {
        modal.style.display = 'flex';
    } else {
        // Fallback: redirect to payment or show alert
        const checkoutMessage = pricingI18n ? 
            pricingI18n.getTranslation('modal.checkout_message') : 
            'Weiterleitung zur Zahlung... (In Entwicklung)';
        alert(checkoutMessage);
    }
};

// Enhanced consultation booking with i18n
window.bookConsultation = (consultationType) => {
    const bookingMessage = pricingI18n ?
        `${pricingI18n.getTranslation('consultations.book_now')} - ${pricingI18n.getTranslation(`consultations.${consultationType}.title`)}` :
        'Buchung wird verarbeitet...';
    
    alert(bookingMessage);
    
    // In production, this would redirect to booking system
    // window.location.href = `/book/${consultationType}`;
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PricingInternationalization;
}