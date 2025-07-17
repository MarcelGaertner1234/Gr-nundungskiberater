/**
 * i18n System for Pricing Page
 * Handles translations for pricing components
 */

class PricingI18n {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'de';
        this.translations = {};
        this.isLoaded = false;
        this.loadTranslations();
    }

    async loadTranslations() {
        // Check if running from file:// protocol
        if (window.location.protocol === 'file:') {
            console.warn('Running from file:// protocol, using embedded translations');
            this.loadEmbeddedTranslations();
            return;
        }
        
        try {
            const response = await fetch(`/i18n/pricing/${this.currentLang}.json`);
            const data = await response.json();
            this.translations = data.pricing;
            this.isLoaded = true;
        } catch (error) {
            console.error('Failed to load pricing translations:', error);
            // Fallback to embedded translations
            this.loadEmbeddedTranslations();
        }
    }
    
    loadEmbeddedTranslations() {
        // Embedded German translations for file:// protocol
        const germanTranslations = {
            "nav": {
                "home": "Startseite",
                "pricing": "Preise",
                "contact": "Kontakt",
                "dashboard": "Dashboard"
            },
            "hero": {
                "title": "Transparente Preise für deinen Erfolg",
                "subtitle": "Wähle das passende Paket für deine Gründungsphase"
            },
            "consultations": {
                "title": "Einzelberatungen",
                "description": "Buche gezielt die Beratung, die du gerade brauchst",
                "free_badge": "KOSTENLOS",
                "per_session": "pro Sitzung",
                "book_now": "Jetzt buchen",
                "erstgespraech": {
                    "title": "Kostenloses Erstgespräch",
                    "description": "Lerne uns kennen und bespreche deine Gründungsidee",
                    "feature1": "30 Minuten persönliche Beratung",
                    "feature2": "Erste Einschätzung deiner Idee",
                    "feature3": "Empfehlung für nächste Schritte",
                    "note": "Einmalig pro Person"
                },
                "businessplan": {
                    "title": "Businessplan-Beratung",
                    "description": "Professionelle Unterstützung bei der Businessplan-Erstellung",
                    "feature1": "90 Minuten intensive Beratung",
                    "feature2": "Struktur & Finanzplanung",
                    "feature3": "Vorlagen & Checklisten"
                },
                "gruendung": {
                    "title": "Gründungsberatung",
                    "description": "Rechtsform, Anmeldungen und Gründungsprozess",
                    "feature1": "60 Minuten Beratung",
                    "feature2": "Rechtsform-Empfehlung",
                    "feature3": "Behördengänge & Formulare"
                },
                "finanzierung": {
                    "title": "Finanzierungsberatung",
                    "description": "Fördermittel, Kredite und Investorensuche",
                    "feature1": "90 Minuten Beratung",
                    "feature2": "Fördermittel-Check",
                    "feature3": "Finanzierungsstrategie"
                },
                "marketing": {
                    "title": "Marketing-Beratung",
                    "description": "Marketingstrategie und Kundengewinnung",
                    "feature1": "60 Minuten Beratung",
                    "feature2": "Zielgruppen-Analyse",
                    "feature3": "Kanal-Empfehlungen"
                }
            },
            "packages": {
                "title": "Komplettpaket-Angebote",
                "description": "Spare mit unseren Paket-Angeboten und erhalte umfassende Betreuung",
                "select": "Paket wählen",
                "starter": {
                    "title": "Starter-Paket",
                    "tagline": "Der perfekte Einstieg",
                    "savings": "Spare €90",
                    "feature1": "1x Erstgespräch (kostenlos)",
                    "feature2": "1x Businessplan-Beratung",
                    "feature3": "1x Gründungsberatung",
                    "feature4": "E-Mail Support für 3 Monate"
                },
                "professional": {
                    "title": "Professional",
                    "tagline": "Rundum-Betreuung",
                    "badge": "BELIEBT",
                    "savings": "Spare €190",
                    "feature1": "Alles aus dem Starter-Paket",
                    "feature2": "1x Finanzierungsberatung",
                    "feature3": "1x Marketing-Beratung",
                    "feature4": "Priority Support für 6 Monate",
                    "feature5": "Monatliche Check-ins"
                },
                "premium": {
                    "title": "Premium Plus",
                    "tagline": "Maximale Unterstützung",
                    "savings": "Spare €390",
                    "feature1": "Alles aus dem Professional-Paket",
                    "feature2": "2x zusätzliche Beratungssitzungen",
                    "feature3": "WhatsApp Business Support",
                    "feature4": "1 Jahr Betreuung",
                    "feature5": "Netzwerk-Zugang"
                }
            },
            "faq": {
                "title": "Häufige Fragen",
                "q1": {
                    "question": "Kann ich Beratungen auch einzeln buchen?",
                    "answer": "Ja, alle Beratungen können auch einzeln gebucht werden. Die Pakete bieten jedoch einen deutlichen Preisvorteil."
                },
                "q2": {
                    "question": "Wie lange sind die Pakete gültig?",
                    "answer": "Die Beratungssitzungen können innerhalb von 12 Monaten nach Kauf flexibel eingelöst werden."
                },
                "q3": {
                    "question": "Gibt es eine Geld-zurück-Garantie?",
                    "answer": "Wir bieten eine 14-tägige Geld-zurück-Garantie, wenn noch keine Beratung in Anspruch genommen wurde."
                },
                "q4": {
                    "question": "Kann ich zwischen Online- und Vor-Ort-Beratung wählen?",
                    "answer": "Ja, alle Beratungen sind sowohl online als auch vor Ort in unserem Büro möglich."
                }
            },
            "cta": {
                "title": "Bereit durchzustarten?",
                "subtitle": "Starte jetzt mit einem kostenlosen Erstgespräch",
                "button": "Kostenloses Erstgespräch buchen"
            },
            "modal": {
                "title": "Paket auswählen",
                "cancel": "Abbrechen",
                "proceed": "Zur Zahlung",
                "savings": "Du sparst {{amount}}",
                "includes": "Dieses Paket beinhaltet",
                "payment_info": "Nach der Bestätigung wirst du zur sicheren Zahlung weitergeleitet.",
                "checkout_message": "Weiterleitung zur Zahlung... (In Entwicklung)"
            }
        };
        
        this.translations = this.currentLang === 'de' ? germanTranslations : germanTranslations; // For now, only German
        this.isLoaded = true;
    }

    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            value = value?.[k];
            if (!value) {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        // Replace placeholders
        if (typeof value === 'string') {
            return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
                return params[param] || match;
            });
        }
        
        return value;
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.loadTranslations().then(() => {
            // Trigger re-render of pricing page
            if (window.updatePricingTranslations) {
                window.updatePricingTranslations();
            }
        });
    }
}

// Initialize i18n
const pricingI18n = new PricingI18n();

// Make it globally available
window.pricingI18n = pricingI18n;

// Helper function for easier access
window.pricingT = (key, params) => pricingI18n.t(key, params);