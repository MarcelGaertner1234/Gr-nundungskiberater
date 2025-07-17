/**
 * i18n System for Dashboard
 * Handles translations for dashboard components
 */

class DashboardI18n {
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
            const response = await fetch(`/i18n/dashboard/${this.currentLang}.json`);
            const data = await response.json();
            this.translations = data.dashboard;
            this.isLoaded = true;
        } catch (error) {
            console.error('Failed to load dashboard translations:', error);
            // Fallback to embedded translations
            this.loadEmbeddedTranslations();
        }
    }
    
    loadEmbeddedTranslations() {
        // Embedded German translations for file:// protocol
        const germanTranslations = {
            "welcome": {
                "title": "Willkommen zurück, {{name}}! 👋",
                "subtitle": "Hier ist dein persönlicher Überblick über deine Gründungsreise.",
                "profile_incomplete": {
                    "title": "Profil vervollständigen",
                    "description": "Vervollständige dein Profil für personalisierte Empfehlungen",
                    "button": "Jetzt vervollständigen"
                }
            },
            "appointments": {
                "title": "Anstehende Termine",
                "consultation": {
                    "types": {
                        "erstgespraech": {
                            "title": "Kostenloses Erstgespräch",
                            "description": "Lerne uns kennen und bespreche deine Gründungsidee",
                            "duration": "30 Minuten",
                            "price": "Kostenlos"
                        },
                        "businessplan": {
                            "title": "Businessplan-Beratung",
                            "description": "Professionelle Unterstützung bei der Businessplan-Erstellung",
                            "duration": "90 Minuten",
                            "price": "250€"
                        },
                        "gruendung": {
                            "title": "Gründungsberatung",
                            "description": "Rechtsform, Anmeldungen und Gründungsprozess",
                            "duration": "60 Minuten",
                            "price": "180€"
                        },
                        "finanzierung": {
                            "title": "Finanzierungsberatung",
                            "description": "Fördermittel, Kredite und Investorensuche",
                            "duration": "90 Minuten",
                            "price": "300€"
                        },
                        "marketing": {
                            "title": "Marketing-Beratung",
                            "description": "Marketingstrategie und Kundengewinnung",
                            "duration": "60 Minuten",
                            "price": "150€"
                        }
                    },
                    "messages": {
                        "already_used": "Bereits genutzt",
                        "unlock_required": "Freischaltung erforderlich",
                        "choose_type": "Wähle deine Beratungsart:",
                        "choose_type_description": "Wähle die Art der Beratung, die du benötigst.",
                        "choose_slot": "Wähle einen Termin:",
                        "choose_slot_description": "Wähle einen passenden Termin für: {{type}} ({{duration}})",
                        "selected_appointment": "Gewählter Termin:",
                        "consultation_type": "Beratungsart: {{type}}",
                        "contact_details": "Deine Kontaktdaten:",
                        "special_topics": "Gibt es spezielle Themen, die du besprechen möchtest?"
                    },
                    "form": {
                        "name": "Name",
                        "email": "E-Mail",
                        "phone": "Telefon (optional)",
                        "cancel": "Abbrechen",
                        "confirm": "Termin bestätigen",
                        "back": "← Zurück"
                    },
                    "status": {
                        "available": "Verfügbar",
                        "booked": "Belegt"
                    },
                    "upgrade_prompts": {
                        "businessplan": "Für Businessplan-Beratungen benötigst du ein Beratungspaket.",
                        "gruendung": "Für Gründungsberatungen benötigst du ein Beratungspaket.",
                        "finanzierung": "Für Finanzierungsberatungen benötigst du ein Beratungspaket.",
                        "marketing": "Für Marketing-Beratungen benötigst du ein Beratungspaket.",
                        "view_packages": "Möchtest du unsere Beratungspakete ansehen?"
                    }
                }
            },
            "notifications": {
                "appointment_success": "✅ Termin erfolgreich gebucht! Du erhältst eine Bestätigungs-E-Mail.",
                "funding_found": "💰 {{count}} neue Fördermöglichkeiten gefunden!",
                "appointment_booking": "📅 Terminbuchung öffnet sich...",
                "feature_coming": "➕ {{feature}} kommt bald!",
                "locked_feature": "🔒 {{message}} Klicke hier für mehr Infos."
            },
            "ai_assistant": {
                "analyzing": "🤖 KI-Berater analysiert deine Anfrage...",
                "response_ready": "💡 Antwort bereit! Check deine Nachrichten."
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
            // Trigger re-render of dashboard
            if (window.updateDashboardTranslations) {
                window.updateDashboardTranslations();
            }
        });
    }
}

// Initialize i18n
const dashboardI18n = new DashboardI18n();

// Make it globally available
window.dashboardI18n = dashboardI18n;

// Helper function for easier access
window.t = (key, params) => dashboardI18n.t(key, params);