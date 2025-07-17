/**
 * Internationalization (i18n) System for Businessplan Creator - JavaScript Integration
 * Loads businessplan-creator-specific translations and provides helper functions
 * Supports 5 languages: DE, EN, FR, ES, IT
 */

class BusinessplanCreatorI18n {
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
            console.log('Businessplan Creator i18n loaded successfully');
        } catch (error) {
            console.warn('Failed to load businessplan creator i18n translations, using fallback', error);
            this.loadFallbackTranslations();
        }
    }
    
    async loadTranslations() {
        const response = await fetch(`./i18n/businessplan-creator/${this.currentLang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${this.currentLang}.json`);
        
        const data = await response.json();
        this.translations = data.businessplan_creator || {};
    }
    
    loadFallbackTranslations() {
        // Embedded German fallback translations for offline use
        this.translations = {
            javascript: {
                select_placeholder: "Bitte wählen...",
                save_success: "Änderungen gespeichert",
                save_error: "Fehler beim Speichern",
                template_selected: "Vorlage ausgewählt",
                upload_success: "Datei erfolgreich hochgeladen",
                upload_error: "Fehler beim Hochladen",
                analysis_complete: "Analyse abgeschlossen",
                sending_to_advisor: "Wird an Berater gesendet...",
                sent_to_advisor: "Erfolgreich an Berater gesendet!",
                advisor_error: "Fehler beim Senden an Berater"
            },
            templates: {
                startup: {
                    name: "Startup / Tech",
                    description: "Für innovative Startups und Technologieunternehmen"
                },
                traditional: {
                    name: "Traditionelles Geschäft",
                    description: "Für klassische Geschäftsmodelle und lokale Unternehmen"
                },
                ecommerce: {
                    name: "E-Commerce",
                    description: "Für Online-Shops und digitale Marktplätze"
                },
                service: {
                    name: "Dienstleistung",
                    description: "Für Beratungen, Agenturen und Service-Unternehmen"
                },
                restaurant: {
                    name: "Gastronomie",
                    description: "Für Restaurants, Cafés und Catering-Services"
                }
            },
            chapters: {
                executive_summary: {
                    title: "Executive Summary",
                    description: "Zusammenfassung des Businessplans"
                },
                company_description: {
                    title: "Unternehmenskonzept",
                    description: "Detaillierte Beschreibung des Unternehmens"
                }
                // Add more chapters as needed
            }
        };
        this.isLoaded = true;
    }
    
    applyTranslations() {
        // Update existing HTML data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.get(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // Handle placeholder separately
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        
        // Handle placeholders separately
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.get(key);
            if (translation) {
                element.placeholder = translation;
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
    getJavaScript(key) {
        return this.get(`javascript.${key}`);
    }
    
    getTemplate(key) {
        return this.get(`templates.${key}`);
    }
    
    getChapter(key) {
        return this.get(`chapters.${key}`);
    }
    
    getUploadSection(key) {
        return this.get(`upload_section.${key}`);
    }
    
    getAdvisorModal(key) {
        return this.get(`advisor_modal.${key}`);
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
    
    // Template-specific helpers
    formatTemplateData(templateData) {
        if (!templateData || !this.isLoaded) return templateData;
        
        // Apply translations to template names and descriptions
        if (templateData.name && templateData.description) {
            return {
                ...templateData,
                name: this.getTemplate(`${templateData.id}.name`) || templateData.name,
                description: this.getTemplate(`${templateData.id}.description`) || templateData.description
            };
        }
        
        return templateData;
    }
    
    // Chapter-specific helpers  
    formatChapterData(chapterData) {
        if (!chapterData || !this.isLoaded) return chapterData;
        
        if (chapterData.title && chapterData.description) {
            return {
                ...chapterData,
                title: this.getChapter(`${chapterData.id}.title`) || chapterData.title,
                description: this.getChapter(`${chapterData.id}.description`) || chapterData.description
            };
        }
        
        return chapterData;
    }
}

// Global instance
window.businessplanCreatorI18n = new BusinessplanCreatorI18n();