/**
 * Internationalization (i18n) System for Contact Page - JavaScript Integration
 * Loads contact-specific translations and provides helper functions
 * Supports 5 languages: DE, EN, FR, ES, IT
 */

class ContactI18n {
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
        } catch (error) {
            console.warn('Failed to load i18n translations, using fallback', error);
            this.loadFallbackTranslations();
        }
    }
    
    async loadTranslations() {
        const response = await fetch(`./i18n/contact/${this.currentLang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${this.currentLang}.json`);
        
        const data = await response.json();
        this.translations = data.contact || {};
    }
    
    loadFallbackTranslations() {
        // Embedded German fallback translations for offline use
        this.translations = {
            javascript: {
                validation: {
                    first_name_required: "Vorname ist erforderlich",
                    last_name_required: "Nachname ist erforderlich", 
                    email_required: "E-Mail-Adresse ist erforderlich",
                    email_invalid: "Bitte gebe eine gültige E-Mail-Adresse ein",
                    subject_required: "Bitte wähle einen Betreff aus",
                    message_required: "Nachricht ist erforderlich",
                    message_min_length: "Die Nachricht sollte mindestens 10 Zeichen lang sein",
                    privacy_required: "Du musst der Datenschutzerklärung zustimmen",
                    field_required: "ist erforderlich"
                },
                subjects: {
                    general: "Allgemeine Frage",
                    technical: "Technisches Problem", 
                    billing: "Abrechnung & Preise",
                    consultation: "Beratungsanfrage",
                    feedback: "Feedback & Vorschläge",
                    partnership: "Kooperation"
                },
                messages: {
                    success_title: "Nachricht erfolgreich gesendet!",
                    success_subject_label: "Betreff:",
                    success_followup: "Wir melden uns innerhalb von 24 Stunden bei dir.",
                    error_message: "Fehler beim Senden der Nachricht. Bitte versuche es später erneut oder kontaktiere uns direkt per E-Mail.",
                    send_button: "Nachricht senden"
                }
            }
        };
        this.isLoaded = true;
    }
    
    applyTranslations() {
        // Update existing HTML data-i18n attributes if needed
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
    
    // Helper methods for JavaScript integration
    getValidation(key) {
        return this.get(`javascript.validation.${key}`);
    }
    
    getSubject(key) {
        return this.get(`javascript.subjects.${key}`);
    }
    
    getMessage(key) {
        return this.get(`javascript.messages.${key}`);
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
window.contactI18n = new ContactI18n();