/**
 * i18n System for Admin Dashboard
 * Handles translations for admin components
 */

class AdminI18n {
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
            const response = await fetch(`/i18n/admin/${this.currentLang}.json`);
            const data = await response.json();
            this.translations = data.admin;
            this.isLoaded = true;
        } catch (error) {
            console.error('Failed to load admin translations:', error);
            // Fallback to embedded translations
            this.loadEmbeddedTranslations();
        }
    }
    
    loadEmbeddedTranslations() {
        // Embedded German translations for file:// protocol
        const germanTranslations = {
            "nav": {
                "overview": "Übersicht",
                "users": "Nutzer",
                "appointments": "Termine",
                "payments": "Zahlungen",
                "analytics": "Analytics"
            },
            "overview": {
                "title": "Dashboard Übersicht",
                "stats": {
                    "active_users": "Aktive Nutzer",
                    "today_appointments": "Termine heute",
                    "today_revenue": "Umsatz heute",
                    "pending": "Ausstehend",
                    "unlocks": "Freischaltungen",
                    "this_week": "diese Woche",
                    "compared": "im Vergleich"
                },
                "activities": {
                    "title": "Letzte Aktivitäten",
                    "new_user": "Neuer Nutzer",
                    "registered": "hat sich registriert",
                    "appointment_booked": "Termin gebucht",
                    "payment_received": "Zahlung erhalten",
                    "time": {
                        "minutes_ago": "vor {{count}} Minuten",
                        "hours_ago": "vor {{count}} Stunden",
                        "days_ago": "vor {{count}} Tag",
                        "days_ago_plural": "vor {{count}} Tagen"
                    }
                }
            },
            "users": {
                "title": "Nutzerverwaltung",
                "search_placeholder": "Nutzer suchen...",
                "filters": {
                    "all": "Alle",
                    "new": "Neue Nutzer",
                    "premium": "Premium",
                    "pending": "Ausstehend"
                },
                "table": {
                    "name": "Name",
                    "email": "E-Mail",
                    "status": "Status",
                    "registered": "Registriert",
                    "packages": "Pakete",
                    "actions": "Aktionen",
                    "packages_count": "{{count}} Pakete",
                    "no_users": "Keine Nutzer gefunden"
                },
                "status": {
                    "active": "Aktiv",
                    "new": "Neu",
                    "premium": "Premium",
                    "pending": "Ausstehend"
                },
                "actions": {
                    "view": "Details",
                    "edit": "Bearbeiten",
                    "unlock": "Pakete freischalten"
                },
                "modal": {
                    "title": "Nutzer Details",
                    "fields": {
                        "name": "Name",
                        "email": "E-Mail",
                        "status": "Status",
                        "unlocked_packages": "Freigeschaltete Pakete",
                        "registered_at": "Registriert am"
                    },
                    "buttons": {
                        "close": "Schließen",
                        "save": "Änderungen speichern"
                    }
                },
                "unlock_modal": {
                    "title": "Beratungspakete freischalten",
                    "subtitle": "Beratungspakete freischalten für:",
                    "available_packages": "Verfügbare Pakete:",
                    "already_unlocked": "Bereits freigeschaltet",
                    "not_unlocked": "Noch nicht freigeschaltet",
                    "note": "Hinweis:",
                    "note_text": "Die Freischaltung ermöglicht dem Nutzer die Buchung dieser Beratungsarten.",
                    "buttons": {
                        "cancel": "Abbrechen",
                        "save": "Freischaltungen speichern"
                    },
                    "success": "Pakete erfolgreich freigeschaltet für {{name}}!"
                }
            },
            "appointments": {
                "title": "Terminverwaltung",
                "this_week": "Termine diese Woche",
                "export": "Exportieren",
                "no_appointments": "Keine Termine diese Woche",
                "today": "Heute",
                "tomorrow": "Morgen",
                "duration": "{{time}} - {{duration}}"
            },
            "payments": {
                "title": "Zahlungen & Pakete",
                "revenue_month": "Umsatz diesen Monat",
                "popular_packages": "Beliebte Pakete",
                "packages": {
                    "starter": "Starter-Paket",
                    "professional": "Professional",
                    "premium": "Premium"
                },
                "sold": "{{count}} verkauft",
                "transactions": {
                    "title": "Letzte Transaktionen",
                    "table": {
                        "date": "Datum",
                        "user": "Nutzer",
                        "package": "Paket",
                        "amount": "Betrag",
                        "status": "Status",
                        "actions": "Aktionen"
                    },
                    "no_transactions": "Noch keine Transaktionen"
                }
            },
            "analytics": {
                "title": "Analytics & Berichte",
                "user_growth": "Nutzer-Wachstum",
                "conversion_rate": "Conversion-Rate",
                "chart_loading": "Chart wird geladen...",
                "conversions": {
                    "registration_to_meeting": "Registrierung → Erstgespräch",
                    "meeting_to_package": "Erstgespräch → Paket",
                    "package_to_completion": "Paket → Abschluss"
                }
            },
            "header": {
                "admin_badge": "Administrator",
                "user_dashboard": "User Dashboard"
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
            // Trigger re-render of admin dashboard
            if (window.updateAdminTranslations) {
                window.updateAdminTranslations();
            }
        });
    }
}

// Initialize i18n
const adminI18n = new AdminI18n();

// Make it globally available
window.adminI18n = adminI18n;

// Helper function for easier access
window.adminT = (key, params) => adminI18n.t(key, params);