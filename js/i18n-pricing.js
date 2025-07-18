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
        // Embedded translations for all languages
        const allTranslations = {
            'de': {
                "nav": {
                    "home": "Startseite",
                    "pricing": "Preise",
                    "contact": "Kontakt",
                    "dashboard": "Dashboard"
                },
                "navigation": {
                    "beratung": "Beratung",
                    "software": "Software",
                    "pricing": "Preise",
                    "beta": "Beta",
                    "uber_mich": "Über mich",
                    "beta_testen": "Erstgespräch buchen",
                    "beratung_starten": "Beratung starten →",
                    "anmelden": "Anmelden"
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
                },
                "hero": {
                    "subtitle": "Professionelle Lösungen für nachhaltige Geschäftsentwicklung"
                },
                "pricing": {
                    "hero": {
                        "title": "Enterprise Services für Ihren Erfolg",
                        "subtitle": "Professionelle Lösungen für nachhaltige Geschäftsentwicklung"
                    },
                    "services": {
                        "title": "Enterprise Services",
                        "description": "Umfassende Lösungen für Ihr Unternehmen - mit Sonderkonditionen",
                        "bestseller": "BESTSELLER",
                        "contact": "Beratung anfragen",
                        "project": "Projektpreis",
                        "request_consultation": "Beratung anfragen",
                        "project_price": "Projektpreis",
                        "per_hour": "pro Stunde",
                        "one_time_payment": "Einmalzahlung oder Raten",
                        "gesamtpaket": {
                            "title": "Komplettpaket Enterprise",
                            "description": "Die All-in-One Lösung für Ihre Geschäftsentwicklung",
                            "feature1": "Alle Services inklusive",
                            "feature2": "12 Monate Betreuung",
                            "feature3": "Dediziertes Expertenteam",
                            "feature4": "Priority Support 24/7"
                        },
                        "businessplan": {
                            "title": "Businessplan Professional",
                            "description": "Umfassende Businessplan-Entwicklung für Investoren und Banken",
                            "feature1": "Vollständiger Businessplan",
                            "feature2": "Finanzmodell & Prognosen",
                            "feature3": "Markt- & Wettbewerbsanalyse",
                            "feature4": "3 Revisionsrunden inklusive"
                        },
                        "rechtsform": {
                            "title": "Rechtsform & Gründung",
                            "description": "Komplette Gründungsbegleitung mit Rechtsberatung",
                            "feature1": "Rechtsformberatung & -wahl",
                            "feature2": "Gesellschaftsverträge",
                            "feature3": "Notartermine & Anmeldungen",
                            "feature4": "Steuerliche Erstberatung"
                        },
                        "finanzierung": {
                            "title": "Finanzierung & Förderung",
                            "description": "Kapitalbeschaffung und Fördermittelmanagement",
                            "feature1": "Fördermittelrecherche",
                            "feature2": "Antragsstellung komplett",
                            "feature3": "Investorenpräsentationen",
                            "feature4": "Bankgespräche begleiten"
                        },
                        "marketing": {
                            "title": "Marketing & Vertrieb",
                            "description": "Ganzheitliche Marketing- und Vertriebsstrategie",
                            "feature1": "Marketingstrategie komplett",
                            "feature2": "Brand Identity & Design",
                            "feature3": "Social Media Setup",
                            "feature4": "Content-Strategie 6 Monate"
                        },
                        "webseite": {
                            "title": "Webseite & E-Commerce",
                            "description": "Professionelle Webentwicklung und Online-Shop",
                            "feature1": "Responsive Webdesign",
                            "feature2": "CMS Integration",
                            "feature3": "SEO Optimierung",
                            "feature4": "12 Monate Wartung inkl."
                        },
                        "software": {
                            "title": "Software Entwicklung",
                            "description": "Maßgeschneiderte Software-Lösungen",
                            "feature1": "Individuelle Softwarelösung",
                            "feature2": "Agile Entwicklung",
                            "feature3": "Cloud-native Architektur",
                            "feature4": "Support & Wartung"
                        },
                        "ki_integration": {
                            "title": "KI Integration",
                            "description": "Künstliche Intelligenz für Ihr Unternehmen",
                            "feature1": "KI-Strategie Entwicklung",
                            "feature2": "Prozessautomatisierung",
                            "feature3": "Custom AI Modelle",
                            "feature4": "Mitarbeiter-Schulung"
                        },
                        "stundenbasis": {
                            "title": "Flexible Beratung",
                            "description": "Individuelle Beratung nach Bedarf",
                            "feature1": "Senior Consultants",
                            "feature2": "Flexible Buchung",
                            "feature3": "Remote oder Vor-Ort",
                            "feature4": "Min. 2 Stunden",
                            "per_hour": "pro Stunde"
                        }
                    },
                    "why": {
                        "title": "Warum Enterprise Services?",
                        "description": "Maximale Effizienz durch professionelle Komplettlösungen",
                        "expertise": {
                            "title": "Bewiesene Expertise",
                            "feature1": "Über 500 erfolgreiche Projekte",
                            "feature2": "Zertifizierte Experten",
                            "feature3": "Branchenführende Methoden",
                            "feature4": "Nachweisbare Erfolgsbilanz",
                            "feature5": "Internationale Standards"
                        },
                        "value": {
                            "title": "Unschlagbarer Wert",
                            "badge": "TOP-PREIS",
                            "feature1": "Bis zu 30% Ersparnis",
                            "feature2": "Sonderkonditionen aktiv",
                            "feature3": "Flexible Zahlungspläne",
                            "feature4": "Keine versteckten Kosten",
                            "feature5": "ROI-Garantie",
                            "feature6": "Erfolgsbasierte Abrechnung möglich"
                        },
                        "support": {
                            "title": "Premium Support",
                            "feature1": "Rund um die Uhr verfügbar",
                            "feature2": "24/7 Erreichbarkeit",
                            "feature3": "Dedizierter Account Manager",
                            "feature4": "Garantierte Reaktionszeit",
                            "feature5": "Regelmäßige Status-Updates"
                        }
                    },
                    "faq_enterprise": {
                        "title": "Häufige Fragen",
                        "q1": {
                            "question": "Können Services auch einzeln gebucht werden?",
                            "answer": "Ja, alle Enterprise Services können individuell gebucht werden. Das Komplettpaket bietet jedoch maximale Synergie-Effekte und den besten Preis."
                        },
                        "q2": {
                            "question": "Wie lange dauert die Projektumsetzung?",
                            "answer": "Die Projektdauer variiert je nach Service. Im Durchschnitt rechnen Sie mit 3-6 Monaten für Einzelprojekte und 9-12 Monaten für das Komplettpaket."
                        },
                        "q3": {
                            "question": "Welche Zahlungsoptionen gibt es?",
                            "answer": "Wir bieten flexible Zahlungspläne: Einmalzahlung mit 5% Skonto, monatliche Raten oder erfolgsbasierte Modelle nach Vereinbarung."
                        },
                        "q4": {
                            "question": "Wie wird die Qualität sichergestellt?",
                            "answer": "Alle Projekte durchlaufen unser zertifiziertes Qualitätsmanagement mit regelmäßigen Reviews, Meilensteinen und transparenter Dokumentation."
                        }
                    },
                    "enterprise_cta": {
                        "title": "Bereit für Enterprise-Lösungen?",
                        "subtitle": "Lassen Sie uns gemeinsam Ihre Geschäftsziele erreichen",
                        "button": "Unverbindliche Beratung anfragen"
                    },
                    "footer": {
                        "copyright": "© 2024 KI Konzept Builder. Alle Rechte vorbehalten."
                    },
                    "faq": {
                        "title": "Häufige Fragen",
                        "q1": {
                            "question": "Können Services auch einzeln gebucht werden?",
                            "answer": "Ja, alle Enterprise Services können individuell gebucht werden. Das Komplettpaket bietet jedoch maximale Synergie-Effekte und den besten Preis."
                        },
                        "q2": {
                            "question": "Wie lange dauert die Projektumsetzung?",
                            "answer": "Die Projektdauer variiert je nach Service. Im Durchschnitt rechnen Sie mit 3-6 Monaten für Einzelprojekte und 9-12 Monaten für das Komplettpaket."
                        },
                        "q3": {
                            "question": "Welche Zahlungsoptionen gibt es?",
                            "answer": "Wir bieten flexible Zahlungspläne: Einmalzahlung mit 5% Skonto, monatliche Raten oder erfolgsbasierte Modelle nach Vereinbarung."
                        },
                        "q4": {
                            "question": "Wie wird die Qualität sichergestellt?",
                            "answer": "Alle Projekte durchlaufen unser zertifiziertes Qualitätsmanagement mit regelmäßigen Reviews, Meilensteinen und transparenter Dokumentation."
                        }
                    },
                    "cta": {
                        "title": "Bereit für Enterprise-Lösungen?",
                        "subtitle": "Lassen Sie uns gemeinsam Ihre Geschäftsziele erreichen",
                        "button": "Unverbindliche Beratung anfragen"
                    }
                }
            },
            'en': {
                "nav": {
                    "home": "Home",
                    "pricing": "Pricing",
                    "contact": "Contact",
                    "dashboard": "Dashboard"
                },
                "navigation": {
                    "beratung": "Consulting",
                    "software": "Software",
                    "pricing": "Pricing",
                    "beta": "Beta",
                    "uber_mich": "About me",
                    "beta_testen": "Book consultation",
                    "beratung_starten": "Start consulting →",
                    "anmelden": "Sign in"
                },
                "hero": {
                    "title": "Transparent Pricing for Your Success",
                    "subtitle": "Choose the right package for your startup journey"
                },
                "consultations": {
                    "title": "Individual Consultations",
                    "description": "Book exactly the consultation you need right now",
                    "free_badge": "FREE",
                    "per_session": "per session",
                    "book_now": "Book now",
                    "erstgespraech": {
                        "title": "Free Initial Consultation",
                        "description": "Get to know us and discuss your startup idea",
                        "feature1": "30 minutes personal consultation",
                        "feature2": "Initial assessment of your idea",
                        "feature3": "Recommendation for next steps",
                        "note": "Once per person"
                    },
                    "businessplan": {
                        "title": "Business Plan Consultation",
                        "description": "Professional support for business plan creation",
                        "feature1": "90 minutes intensive consultation",
                        "feature2": "Structure & financial planning",
                        "feature3": "Templates & checklists"
                    },
                    "gruendung": {
                        "title": "Startup Consultation",
                        "description": "Legal form, registrations and startup process",
                        "feature1": "60 minutes consultation",
                        "feature2": "Legal form recommendation",
                        "feature3": "Government procedures & forms"
                    },
                    "finanzierung": {
                        "title": "Funding Consultation",
                        "description": "Grants, loans and investor search",
                        "feature1": "90 minutes consultation",
                        "feature2": "Funding check",
                        "feature3": "Financing strategy"
                    },
                    "marketing": {
                        "title": "Marketing Consultation",
                        "description": "Marketing strategy and customer acquisition",
                        "feature1": "60 minutes consultation",
                        "feature2": "Target group analysis",
                        "feature3": "Channel recommendations"
                    }
                },
                "packages": {
                    "title": "Complete Package Offers",
                    "description": "Save with our package deals and get comprehensive support",
                    "select": "Select package",
                    "starter": {
                        "title": "Starter Package",
                        "tagline": "The perfect start",
                        "savings": "Save €90",
                        "feature1": "1x Initial consultation (free)",
                        "feature2": "1x Business plan consultation",
                        "feature3": "1x Startup consultation",
                        "feature4": "Email support for 3 months"
                    },
                    "professional": {
                        "title": "Professional",
                        "tagline": "All-round support",
                        "badge": "POPULAR",
                        "savings": "Save €190",
                        "feature1": "Everything from Starter Package",
                        "feature2": "1x Funding consultation",
                        "feature3": "1x Marketing consultation",
                        "feature4": "Priority support for 6 months",
                        "feature5": "Monthly check-ins"
                    },
                    "premium": {
                        "title": "Premium Plus",
                        "tagline": "Maximum support",
                        "savings": "Save €390",
                        "feature1": "Everything from Professional Package",
                        "feature2": "2x additional consultation sessions",
                        "feature3": "WhatsApp Business support",
                        "feature4": "1 year support",
                        "feature5": "Network access"
                    }
                },
                "faq": {
                    "title": "Frequently Asked Questions",
                    "q1": {
                        "question": "Can I book consultations individually?",
                        "answer": "Yes, all consultations can also be booked individually. However, packages offer a significant price advantage."
                    },
                    "q2": {
                        "question": "How long are the packages valid?",
                        "answer": "The consultation sessions can be flexibly redeemed within 12 months after purchase."
                    },
                    "q3": {
                        "question": "Is there a money-back guarantee?",
                        "answer": "We offer a 14-day money-back guarantee if no consultation has been used yet."
                    },
                    "q4": {
                        "question": "Can I choose between online and in-person consultation?",
                        "answer": "Yes, all consultations are available both online and in-person at our office."
                    }
                },
                "cta": {
                    "title": "Ready to get started?",
                    "subtitle": "Start now with a free initial consultation",
                    "button": "Book free initial consultation"
                },
                "modal": {
                    "title": "Select Package",
                    "cancel": "Cancel",
                    "proceed": "Proceed to payment",
                    "savings": "You save {{amount}}",
                    "includes": "This package includes",
                    "payment_info": "After confirmation you will be redirected to secure payment.",
                    "checkout_message": "Redirecting to payment... (In Development)"
                },
                "hero": {
                    "subtitle": "Professional solutions for sustainable business development"
                },
                "pricing": {
                    "hero": {
                        "title": "Enterprise Services for Your Success",
                        "subtitle": "Professional solutions for sustainable business development"
                    },
                    "services": {
                        "title": "Enterprise Services",
                        "description": "Comprehensive solutions for your business - with special conditions",
                        "bestseller": "BESTSELLER",
                        "contact": "Request consultation",
                        "project": "Project price",
                        "request_consultation": "Request consultation",
                        "project_price": "Project price",
                        "per_hour": "per hour",
                        "one_time_payment": "One-time payment or installments",
                        "gesamtpaket": {
                            "title": "Complete Enterprise Package",
                            "description": "The all-in-one solution for your business development",
                            "feature1": "All services included",
                            "feature2": "12 months support",
                            "feature3": "Dedicated expert team",
                            "feature4": "Priority Support 24/7"
                        },
                        "businessplan": {
                            "title": "Business Plan Professional",
                            "description": "Comprehensive business plan development for investors and banks",
                            "feature1": "Complete business plan",
                            "feature2": "Financial model & forecasts",
                            "feature3": "Market & competitive analysis",
                            "feature4": "3 revision rounds included"
                        },
                        "rechtsform": {
                            "title": "Legal Form & Incorporation",
                            "description": "Complete incorporation support with legal advice",
                            "feature1": "Legal form consulting & selection",
                            "feature2": "Corporate agreements",
                            "feature3": "Notary appointments & registrations",
                            "feature4": "Initial tax consultation"
                        },
                        "finanzierung": {
                            "title": "Financing & Funding",
                            "description": "Capital acquisition and funding management",
                            "feature1": "Funding research",
                            "feature2": "Complete application process",
                            "feature3": "Investor presentations",
                            "feature4": "Bank meeting support"
                        },
                        "marketing": {
                            "title": "Marketing & Sales",
                            "description": "Comprehensive marketing and sales strategy",
                            "feature1": "Complete marketing strategy",
                            "feature2": "Brand identity & design",
                            "feature3": "Social media setup",
                            "feature4": "Content strategy 6 months"
                        },
                        "webseite": {
                            "title": "Website & E-Commerce",
                            "description": "Professional web development and online shop",
                            "feature1": "Responsive web design",
                            "feature2": "CMS integration",
                            "feature3": "SEO optimization",
                            "feature4": "12 months maintenance incl."
                        },
                        "software": {
                            "title": "Software Development",
                            "description": "Custom software solutions",
                            "feature1": "Individual software solution",
                            "feature2": "Agile development",
                            "feature3": "Cloud-native architecture",
                            "feature4": "Support & maintenance"
                        },
                        "ki_integration": {
                            "title": "AI Integration",
                            "description": "Artificial intelligence for your business",
                            "feature1": "AI strategy development",
                            "feature2": "Process automation",
                            "feature3": "Custom AI models",
                            "feature4": "Employee training"
                        },
                        "stundenbasis": {
                            "title": "Flexible Consulting",
                            "description": "Individual consulting as needed",
                            "feature1": "Senior consultants",
                            "feature2": "Flexible booking",
                            "feature3": "Remote or on-site",
                            "feature4": "Min. 2 hours",
                            "per_hour": "per hour"
                        }
                    },
                    "why": {
                        "title": "Why Enterprise Services?",
                        "description": "Maximum efficiency through professional complete solutions",
                        "expertise": {
                            "title": "Proven Expertise",
                            "feature1": "Over 500 successful projects",
                            "feature2": "Certified experts",
                            "feature3": "Industry-leading methods",
                            "feature4": "Proven track record",
                            "feature5": "International standards"
                        },
                        "value": {
                            "title": "Unbeatable Value",
                            "badge": "TOP PRICE",
                            "feature1": "Up to 30% savings",
                            "feature2": "Special conditions active",
                            "feature3": "Flexible payment plans",
                            "feature4": "No hidden costs",
                            "feature5": "ROI guarantee",
                            "feature6": "Success-based billing possible"
                        },
                        "support": {
                            "title": "Premium Support",
                            "feature1": "Available around the clock",
                            "feature2": "24/7 accessibility",
                            "feature3": "Dedicated account manager",
                            "feature4": "Guaranteed response time",
                            "feature5": "Regular status updates"
                        }
                    },
                    "faq_enterprise": {
                        "title": "Frequently Asked Questions",
                        "q1": {
                            "question": "Can services be booked individually?",
                            "answer": "Yes, all Enterprise Services can be booked individually. However, the complete package offers maximum synergy effects and the best price."
                        },
                        "q2": {
                            "question": "How long does project implementation take?",
                            "answer": "Project duration varies by service. On average, expect 3-6 months for individual projects and 9-12 months for the complete package."
                        },
                        "q3": {
                            "question": "What payment options are available?",
                            "answer": "We offer flexible payment plans: one-time payment with 5% discount, monthly installments, or success-based models by agreement."
                        },
                        "q4": {
                            "question": "How is quality ensured?",
                            "answer": "All projects go through our certified quality management with regular reviews, milestones, and transparent documentation."
                        }
                    },
                    "enterprise_cta": {
                        "title": "Ready for Enterprise Solutions?",
                        "subtitle": "Let's achieve your business goals together",
                        "button": "Request non-binding consultation"
                    },
                    "footer": {
                        "copyright": "© 2024 AI Concept Builder. All rights reserved."
                    },
                    "faq": {
                        "title": "Frequently Asked Questions",
                        "q1": {
                            "question": "Can services be booked individually?",
                            "answer": "Yes, all Enterprise Services can be booked individually. However, the complete package offers maximum synergy effects and the best price."
                        },
                        "q2": {
                            "question": "How long does project implementation take?",
                            "answer": "Project duration varies by service. On average, expect 3-6 months for individual projects and 9-12 months for the complete package."
                        },
                        "q3": {
                            "question": "What payment options are available?",
                            "answer": "We offer flexible payment plans: one-time payment with 5% discount, monthly installments, or success-based models by agreement."
                        },
                        "q4": {
                            "question": "How is quality ensured?",
                            "answer": "All projects go through our certified quality management with regular reviews, milestones, and transparent documentation."
                        }
                    },
                    "cta": {
                        "title": "Ready for Enterprise Solutions?",
                        "subtitle": "Let's achieve your business goals together",
                        "button": "Request non-binding consultation"
                    }
                }
            },
            'fr': {
                "nav": {
                    "home": "Accueil",
                    "pricing": "Tarifs",
                    "contact": "Contact",
                    "dashboard": "Tableau de bord"
                },
                "navigation": {
                    "beratung": "Conseil",
                    "software": "Logiciel",
                    "pricing": "Tarifs",
                    "beta": "Beta",
                    "uber_mich": "À propos de moi",
                    "beta_testen": "Réserver consultation",
                    "beratung_starten": "Commencer conseil →",
                    "anmelden": "Se connecter"
                },
                "hero": {
                    "title": "Tarifs transparents pour votre succès",
                    "subtitle": "Choisissez le package adapté à votre parcours entrepreneurial"
                },
                "consultations": {
                    "title": "Consultations individuelles",
                    "description": "Réservez exactement la consultation dont vous avez besoin maintenant",
                    "free_badge": "GRATUIT",
                    "per_session": "par session",
                    "book_now": "Réserver maintenant",
                    "erstgespraech": {
                        "title": "Consultation initiale gratuite",
                        "description": "Apprenez à nous connaître et discutez de votre idée de startup",
                        "feature1": "30 minutes de consultation personnelle",
                        "feature2": "Évaluation initiale de votre idée",
                        "feature3": "Recommandation pour les prochaines étapes",
                        "note": "Une fois par personne"
                    },
                    "businessplan": {
                        "title": "Consultation Plan d'affaires",
                        "description": "Soutien professionnel pour la création de plan d'affaires",
                        "feature1": "90 minutes de consultation intensive",
                        "feature2": "Structure et planification financière",
                        "feature3": "Modèles et listes de contrôle"
                    },
                    "gruendung": {
                        "title": "Consultation Création d'entreprise",
                        "description": "Forme juridique, enregistrements et processus de création",
                        "feature1": "60 minutes de consultation",
                        "feature2": "Recommandation de forme juridique",
                        "feature3": "Procédures gouvernementales et formulaires"
                    },
                    "finanzierung": {
                        "title": "Consultation Financement",
                        "description": "Subventions, prêts et recherche d'investisseurs",
                        "feature1": "90 minutes de consultation",
                        "feature2": "Vérification du financement",
                        "feature3": "Stratégie de financement"
                    },
                    "marketing": {
                        "title": "Consultation Marketing",
                        "description": "Stratégie marketing et acquisition de clients",
                        "feature1": "60 minutes de consultation",
                        "feature2": "Analyse des groupes cibles",
                        "feature3": "Recommandations de canaux"
                    }
                },
                "packages": {
                    "title": "Offres de packages complets",
                    "description": "Économisez avec nos offres de packages et obtenez un soutien complet",
                    "select": "Sélectionner le package",
                    "starter": {
                        "title": "Package Débutant",
                        "tagline": "Le début parfait",
                        "savings": "Économisez €90",
                        "feature1": "1x Consultation initiale (gratuite)",
                        "feature2": "1x Consultation plan d'affaires",
                        "feature3": "1x Consultation création d'entreprise",
                        "feature4": "Support email pendant 3 mois"
                    },
                    "professional": {
                        "title": "Professionnel",
                        "tagline": "Support complet",
                        "badge": "POPULAIRE",
                        "savings": "Économisez €190",
                        "feature1": "Tout du Package Débutant",
                        "feature2": "1x Consultation financement",
                        "feature3": "1x Consultation marketing",
                        "feature4": "Support prioritaire pendant 6 mois",
                        "feature5": "Vérifications mensuelles"
                    },
                    "premium": {
                        "title": "Premium Plus",
                        "tagline": "Support maximum",
                        "savings": "Économisez €390",
                        "feature1": "Tout du Package Professionnel",
                        "feature2": "2x sessions de consultation supplémentaires",
                        "feature3": "Support WhatsApp Business",
                        "feature4": "1 an de support",
                        "feature5": "Accès au réseau"
                    }
                },
                "faq": {
                    "title": "Questions fréquemment posées",
                    "q1": {
                        "question": "Puis-je réserver des consultations individuellement?",
                        "answer": "Oui, toutes les consultations peuvent également être réservées individuellement. Cependant, les packages offrent un avantage de prix significatif."
                    },
                    "q2": {
                        "question": "Combien de temps les packages sont-ils valides?",
                        "answer": "Les sessions de consultation peuvent être utilisées de manière flexible dans les 12 mois après l'achat."
                    },
                    "q3": {
                        "question": "Y a-t-il une garantie de remboursement?",
                        "answer": "Nous offrons une garantie de remboursement de 14 jours si aucune consultation n'a encore été utilisée."
                    },
                    "q4": {
                        "question": "Puis-je choisir entre consultation en ligne et en personne?",
                        "answer": "Oui, toutes les consultations sont disponibles en ligne et en personne dans notre bureau."
                    }
                },
                "cta": {
                    "title": "Prêt à commencer?",
                    "subtitle": "Commencez maintenant avec une consultation initiale gratuite",
                    "button": "Réserver une consultation initiale gratuite"
                },
                "modal": {
                    "title": "Sélectionner le package",
                    "cancel": "Annuler",
                    "proceed": "Procéder au paiement",
                    "savings": "Vous économisez {{amount}}",
                    "includes": "Ce package inclut",
                    "payment_info": "Après confirmation, vous serez redirigé vers le paiement sécurisé.",
                    "checkout_message": "Redirection vers le paiement... (En développement)"
                },
                "pricing": {
                    "services": {
                        "title": "Services Entreprise",
                        "description": "Solutions complètes pour votre entreprise - avec conditions spéciales",
                        "bestseller": "BESTSELLER",
                        "gesamtpaket": {
                            "title": "Package Entreprise Complet",
                            "description": "La solution tout-en-un pour votre développement d'entreprise"
                        },
                        "businessplan": {
                            "title": "Plan d'Affaires Professionnel",
                            "description": "Développement complet de plan d'affaires pour investisseurs et banques"
                        },
                        "rechtsform": {
                            "title": "Forme Juridique & Création",
                            "description": "Accompagnement complet de création avec conseil juridique"
                        },
                        "finanzierung": {
                            "title": "Financement & Subventions",
                            "description": "Acquisition de capital et gestion des subventions"
                        },
                        "marketing": {
                            "title": "Marketing & Ventes",
                            "description": "Stratégie marketing et ventes complète"
                        },
                        "webseite": {
                            "title": "Site Web & E-Commerce",
                            "description": "Développement web professionnel et boutique en ligne"
                        },
                        "software": {
                            "title": "Développement Logiciel",
                            "description": "Solutions logicielles sur mesure"
                        },
                        "ki_integration": {
                            "title": "Intégration IA",
                            "description": "Intelligence artificielle pour votre entreprise"
                        },
                        "stundenbasis": {
                            "title": "Conseil Flexible",
                            "description": "Conseil individuel selon les besoins",
                            "feature1": "Consultants seniors",
                            "feature2": "Réservation flexible",
                            "feature3": "À distance ou sur site",
                            "feature4": "Min. 2 heures",
                            "per_hour": "par heure"
                        }
                    },
                    "why": {
                        "title": "Pourquoi Services Entreprise?",
                        "description": "Efficacité maximale grâce à des solutions complètes professionnelles"
                    }
                },
                "hero": {
                    "subtitle": "Solutions professionnelles pour le développement durable des entreprises"
                },
                "pricing": {
                    "hero": {
                        "title": "Services Entreprise pour Votre Succès",
                        "subtitle": "Solutions professionnelles pour le développement durable des entreprises"
                    },
                    "services": {
                        "contact": "Demander une consultation",
                        "project": "Prix du projet",
                        "request_consultation": "Demander une consultation",
                        "project_price": "Prix du projet",
                        "per_hour": "par heure",
                        "one_time_payment": "Paiement unique ou versements"
                    },
                    "enterprise_cta": {
                        "title": "Prêt pour les solutions d'entreprise?",
                        "subtitle": "Atteignons ensemble vos objectifs commerciaux",
                        "button": "Demander une consultation sans engagement"
                    },
                    "footer": {
                        "copyright": "© 2024 AI Concept Builder. Tous droits réservés."
                    },
                    "faq": {
                        "title": "Questions fréquemment posées",
                        "q1": {
                            "question": "Les services peuvent-ils être réservés individuellement?",
                            "answer": "Oui, tous les Services Entreprise peuvent être réservés individuellement. Cependant, le package complet offre des effets de synergie maximaux et le meilleur prix."
                        },
                        "q2": {
                            "question": "Combien de temps dure la mise en œuvre du projet?",
                            "answer": "La durée du projet varie selon le service. En moyenne, comptez 3-6 mois pour les projets individuels et 9-12 mois pour le package complet."
                        },
                        "q3": {
                            "question": "Quelles options de paiement sont disponibles?",
                            "answer": "Nous offrons des plans de paiement flexibles: paiement unique avec 5% de remise, versements mensuels ou modèles basés sur le succès par accord."
                        },
                        "q4": {
                            "question": "Comment la qualité est-elle assurée?",
                            "answer": "Tous les projets passent par notre gestion qualité certifiée avec des revues régulières, des jalons et une documentation transparente."
                        }
                    },
                    "cta": {
                        "title": "Prêt pour les solutions d'entreprise?",
                        "subtitle": "Atteignons ensemble vos objectifs commerciaux",
                        "button": "Demander une consultation sans engagement"
                    }
                }
            },
            'es': {
                "nav": {
                    "home": "Inicio",
                    "pricing": "Precios",
                    "contact": "Contacto",
                    "dashboard": "Panel de control"
                },
                "navigation": {
                    "beratung": "Consultoría",
                    "software": "Software",
                    "pricing": "Precios",
                    "beta": "Beta",
                    "uber_mich": "Sobre mí",
                    "beta_testen": "Reservar consulta",
                    "beratung_starten": "Iniciar consultoría →",
                    "anmelden": "Iniciar sesión"
                },
                "hero": {
                    "title": "Precios transparentes para tu éxito",
                    "subtitle": "Elige el paquete adecuado para tu viaje emprendedor"
                },
                "consultations": {
                    "title": "Consultas individuales",
                    "description": "Reserva exactamente la consulta que necesitas ahora",
                    "free_badge": "GRATIS",
                    "per_session": "por sesión",
                    "book_now": "Reservar ahora",
                    "erstgespraech": {
                        "title": "Consulta inicial gratuita",
                        "description": "Conócenos y discute tu idea de startup",
                        "feature1": "30 minutos de consulta personal",
                        "feature2": "Evaluación inicial de tu idea",
                        "feature3": "Recomendación para próximos pasos",
                        "note": "Una vez por persona"
                    },
                    "businessplan": {
                        "title": "Consulta de Plan de Negocio",
                        "description": "Apoyo profesional para la creación de plan de negocio",
                        "feature1": "90 minutos de consulta intensiva",
                        "feature2": "Estructura y planificación financiera",
                        "feature3": "Plantillas y listas de verificación"
                    },
                    "gruendung": {
                        "title": "Consulta de Creación de Empresa",
                        "description": "Forma jurídica, registros y proceso de creación",
                        "feature1": "60 minutos de consulta",
                        "feature2": "Recomendación de forma jurídica",
                        "feature3": "Procedimientos gubernamentales y formularios"
                    },
                    "finanzierung": {
                        "title": "Consulta de Financiación",
                        "description": "Subvenciones, préstamos y búsqueda de inversores",
                        "feature1": "90 minutos de consulta",
                        "feature2": "Verificación de financiación",
                        "feature3": "Estrategia de financiación"
                    },
                    "marketing": {
                        "title": "Consulta de Marketing",
                        "description": "Estrategia de marketing y adquisición de clientes",
                        "feature1": "60 minutos de consulta",
                        "feature2": "Análisis de grupos objetivo",
                        "feature3": "Recomendaciones de canales"
                    }
                },
                "packages": {
                    "title": "Ofertas de paquetes completos",
                    "description": "Ahorra con nuestras ofertas de paquetes y obtén apoyo integral",
                    "select": "Seleccionar paquete",
                    "starter": {
                        "title": "Paquete Inicial",
                        "tagline": "El comienzo perfecto",
                        "savings": "Ahorra €90",
                        "feature1": "1x Consulta inicial (gratis)",
                        "feature2": "1x Consulta de plan de negocio",
                        "feature3": "1x Consulta de creación de empresa",
                        "feature4": "Soporte por email durante 3 meses"
                    },
                    "professional": {
                        "title": "Profesional",
                        "tagline": "Apoyo integral",
                        "badge": "POPULAR",
                        "savings": "Ahorra €190",
                        "feature1": "Todo del Paquete Inicial",
                        "feature2": "1x Consulta de financiación",
                        "feature3": "1x Consulta de marketing",
                        "feature4": "Soporte prioritario durante 6 meses",
                        "feature5": "Revisiones mensuales"
                    },
                    "premium": {
                        "title": "Premium Plus",
                        "tagline": "Apoyo máximo",
                        "savings": "Ahorra €390",
                        "feature1": "Todo del Paquete Profesional",
                        "feature2": "2x sesiones de consulta adicionales",
                        "feature3": "Soporte WhatsApp Business",
                        "feature4": "1 año de soporte",
                        "feature5": "Acceso a la red"
                    }
                },
                "faq": {
                    "title": "Preguntas frecuentes",
                    "q1": {
                        "question": "¿Puedo reservar consultas individualmente?",
                        "answer": "Sí, todas las consultas también se pueden reservar individualmente. Sin embargo, los paquetes ofrecen una ventaja de precio significativa."
                    },
                    "q2": {
                        "question": "¿Cuánto tiempo son válidos los paquetes?",
                        "answer": "Las sesiones de consulta se pueden usar de manera flexible dentro de los 12 meses posteriores a la compra."
                    },
                    "q3": {
                        "question": "¿Hay garantía de devolución de dinero?",
                        "answer": "Ofrecemos una garantía de devolución de dinero de 14 días si aún no se ha utilizado ninguna consulta."
                    },
                    "q4": {
                        "question": "¿Puedo elegir entre consulta en línea y en persona?",
                        "answer": "Sí, todas las consultas están disponibles tanto en línea como en persona en nuestra oficina."
                    }
                },
                "cta": {
                    "title": "¿Listo para empezar?",
                    "subtitle": "Comienza ahora con una consulta inicial gratuita",
                    "button": "Reservar consulta inicial gratuita"
                },
                "modal": {
                    "title": "Seleccionar paquete",
                    "cancel": "Cancelar",
                    "proceed": "Proceder al pago",
                    "savings": "Ahorras {{amount}}",
                    "includes": "Este paquete incluye",
                    "payment_info": "Después de la confirmación serás redirigido al pago seguro.",
                    "checkout_message": "Redirigiendo al pago... (En desarrollo)"
                },
                "pricing": {
                    "services": {
                        "title": "Servicios Empresariales",
                        "description": "Soluciones integrales para su empresa - con condiciones especiales",
                        "bestseller": "BESTSELLER",
                        "gesamtpaket": {
                            "title": "Paquete Empresarial Completo",
                            "description": "La solución todo-en-uno para el desarrollo de su negocio"
                        },
                        "businessplan": {
                            "title": "Plan de Negocio Profesional",
                            "description": "Desarrollo integral de plan de negocio para inversores y bancos"
                        },
                        "rechtsform": {
                            "title": "Forma Jurídica & Constitución",
                            "description": "Acompañamiento completo de constitución con asesoramiento jurídico"
                        },
                        "finanzierung": {
                            "title": "Financiación & Subvenciones",
                            "description": "Adquisición de capital y gestión de subvenciones"
                        },
                        "marketing": {
                            "title": "Marketing & Ventas",
                            "description": "Estrategia integral de marketing y ventas"
                        },
                        "webseite": {
                            "title": "Sitio Web & E-Commerce",
                            "description": "Desarrollo web profesional y tienda online"
                        },
                        "software": {
                            "title": "Desarrollo de Software",
                            "description": "Soluciones de software a medida"
                        },
                        "ki_integration": {
                            "title": "Integración IA",
                            "description": "Inteligencia artificial para su empresa"
                        },
                        "stundenbasis": {
                            "title": "Consultoría Flexible",
                            "description": "Consultoría individual según necesidades",
                            "feature1": "Consultores senior",
                            "feature2": "Reserva flexible",
                            "feature3": "Remoto o en sitio",
                            "feature4": "Mín. 2 horas",
                            "per_hour": "por hora"
                        }
                    },
                    "why": {
                        "title": "¿Por qué Servicios Empresariales?",
                        "description": "Máxima eficiencia a través de soluciones profesionales completas"
                    }
                },
                "hero": {
                    "subtitle": "Soluciones profesionales para el desarrollo empresarial sostenible"
                },
                "pricing": {
                    "hero": {
                        "title": "Servicios Empresariales para Su Éxito",
                        "subtitle": "Soluciones profesionales para el desarrollo empresarial sostenible"
                    },
                    "services": {
                        "contact": "Solicitar consulta",
                        "project": "Precio del proyecto",
                        "request_consultation": "Solicitar consulta",
                        "project_price": "Precio del proyecto",
                        "per_hour": "por hora",
                        "one_time_payment": "Pago único o a plazos"
                    },
                    "enterprise_cta": {
                        "title": "¿Listo para soluciones empresariales?",
                        "subtitle": "Alcancemos juntos sus objetivos comerciales",
                        "button": "Solicitar consulta sin compromiso"
                    },
                    "footer": {
                        "copyright": "© 2024 AI Concept Builder. Todos los derechos reservados."
                    },
                    "faq": {
                        "title": "Preguntas frecuentes",
                        "q1": {
                            "question": "¿Se pueden reservar servicios individualmente?",
                            "answer": "Sí, todos los Servicios Empresariales pueden reservarse individualmente. Sin embargo, el paquete completo ofrece efectos de sinergia máximos y el mejor precio."
                        },
                        "q2": {
                            "question": "¿Cuánto tiempo tarda la implementación del proyecto?",
                            "answer": "La duración del proyecto varía según el servicio. En promedio, espere 3-6 meses para proyectos individuales y 9-12 meses para el paquete completo."
                        },
                        "q3": {
                            "question": "¿Qué opciones de pago están disponibles?",
                            "answer": "Ofrecemos planes de pago flexibles: pago único con 5% de descuento, cuotas mensuales o modelos basados en éxito por acuerdo."
                        },
                        "q4": {
                            "question": "¿Cómo se asegura la calidad?",
                            "answer": "Todos los proyectos pasan por nuestra gestión de calidad certificada con revisiones regulares, hitos y documentación transparente."
                        }
                    },
                    "cta": {
                        "title": "¿Listo para soluciones empresariales?",
                        "subtitle": "Alcancemos juntos sus objetivos comerciales",
                        "button": "Solicitar consulta sin compromiso"
                    }
                }
            },
            'it': {
                "nav": {
                    "home": "Home",
                    "pricing": "Prezzi",
                    "contact": "Contatti",
                    "dashboard": "Dashboard"
                },
                "navigation": {
                    "beratung": "Consulenza",
                    "software": "Software",
                    "pricing": "Prezzi",
                    "beta": "Beta",
                    "uber_mich": "Chi sono",
                    "beta_testen": "Prenota consulenza",
                    "beratung_starten": "Inizia consulenza →",
                    "anmelden": "Accedi"
                },
                "hero": {
                    "title": "Prezzi trasparenti per il tuo successo",
                    "subtitle": "Scegli il pacchetto giusto per il tuo percorso imprenditoriale"
                },
                "consultations": {
                    "title": "Consulenze individuali",
                    "description": "Prenota esattamente la consulenza di cui hai bisogno adesso",
                    "free_badge": "GRATUITO",
                    "per_session": "per sessione",
                    "book_now": "Prenota ora",
                    "erstgespraech": {
                        "title": "Consulenza iniziale gratuita",
                        "description": "Conoscici e discuti la tua idea di startup",
                        "feature1": "30 minuti di consulenza personale",
                        "feature2": "Valutazione iniziale della tua idea",
                        "feature3": "Raccomandazione per i prossimi passi",
                        "note": "Una volta per persona"
                    },
                    "businessplan": {
                        "title": "Consulenza Business Plan",
                        "description": "Supporto professionale per la creazione del business plan",
                        "feature1": "90 minuti di consulenza intensiva",
                        "feature2": "Struttura e pianificazione finanziaria",
                        "feature3": "Modelli e checklist"
                    },
                    "gruendung": {
                        "title": "Consulenza Creazione Impresa",
                        "description": "Forma giuridica, registrazioni e processo di creazione",
                        "feature1": "60 minuti di consulenza",
                        "feature2": "Raccomandazione forma giuridica",
                        "feature3": "Procedure governative e moduli"
                    },
                    "finanzierung": {
                        "title": "Consulenza Finanziamenti",
                        "description": "Sovvenzioni, prestiti e ricerca investitori",
                        "feature1": "90 minuti di consulenza",
                        "feature2": "Verifica finanziamenti",
                        "feature3": "Strategia di finanziamento"
                    },
                    "marketing": {
                        "title": "Consulenza Marketing",
                        "description": "Strategia di marketing e acquisizione clienti",
                        "feature1": "60 minuti di consulenza",
                        "feature2": "Analisi gruppi target",
                        "feature3": "Raccomandazioni canali"
                    }
                },
                "packages": {
                    "title": "Offerte pacchetti completi",
                    "description": "Risparmia con le nostre offerte pacchetti e ottieni supporto completo",
                    "select": "Seleziona pacchetto",
                    "starter": {
                        "title": "Pacchetto Starter",
                        "tagline": "L'inizio perfetto",
                        "savings": "Risparmia €90",
                        "feature1": "1x Consulenza iniziale (gratuita)",
                        "feature2": "1x Consulenza business plan",
                        "feature3": "1x Consulenza creazione impresa",
                        "feature4": "Supporto email per 3 mesi"
                    },
                    "professional": {
                        "title": "Professionale",
                        "tagline": "Supporto completo",
                        "badge": "POPOLARE",
                        "savings": "Risparmia €190",
                        "feature1": "Tutto dal Pacchetto Starter",
                        "feature2": "1x Consulenza finanziamenti",
                        "feature3": "1x Consulenza marketing",
                        "feature4": "Supporto prioritario per 6 mesi",
                        "feature5": "Check-in mensili"
                    },
                    "premium": {
                        "title": "Premium Plus",
                        "tagline": "Supporto massimo",
                        "savings": "Risparmia €390",
                        "feature1": "Tutto dal Pacchetto Professionale",
                        "feature2": "2x sessioni di consulenza aggiuntive",
                        "feature3": "Supporto WhatsApp Business",
                        "feature4": "1 anno di supporto",
                        "feature5": "Accesso alla rete"
                    }
                },
                "faq": {
                    "title": "Domande frequenti",
                    "q1": {
                        "question": "Posso prenotare consulenze individualmente?",
                        "answer": "Sì, tutte le consulenze possono essere prenotate anche individualmente. Tuttavia, i pacchetti offrono un significativo vantaggio di prezzo."
                    },
                    "q2": {
                        "question": "Quanto tempo sono validi i pacchetti?",
                        "answer": "Le sessioni di consulenza possono essere utilizzate in modo flessibile entro 12 mesi dall'acquisto."
                    },
                    "q3": {
                        "question": "C'è una garanzia di rimborso?",
                        "answer": "Offriamo una garanzia di rimborso di 14 giorni se non è ancora stata utilizzata nessuna consulenza."
                    },
                    "q4": {
                        "question": "Posso scegliere tra consulenza online e di persona?",
                        "answer": "Sì, tutte le consulenze sono disponibili sia online che di persona nel nostro ufficio."
                    }
                },
                "cta": {
                    "title": "Pronto per iniziare?",
                    "subtitle": "Inizia ora con una consulenza iniziale gratuita",
                    "button": "Prenota consulenza iniziale gratuita"
                },
                "modal": {
                    "title": "Seleziona pacchetto",
                    "cancel": "Annulla",
                    "proceed": "Procedi al pagamento",
                    "savings": "Risparmi {{amount}}",
                    "includes": "Questo pacchetto include",
                    "payment_info": "Dopo la conferma sarai reindirizzato al pagamento sicuro.",
                    "checkout_message": "Reindirizzamento al pagamento... (In sviluppo)"
                },
                "pricing": {
                    "services": {
                        "title": "Servizi Aziendali",
                        "description": "Soluzioni complete per la vostra azienda - con condizioni speciali",
                        "bestseller": "BESTSELLER",
                        "gesamtpaket": {
                            "title": "Pacchetto Aziendale Completo",
                            "description": "La soluzione tutto-in-uno per lo sviluppo del vostro business"
                        },
                        "businessplan": {
                            "title": "Business Plan Professionale",
                            "description": "Sviluppo completo di business plan per investitori e banche"
                        },
                        "rechtsform": {
                            "title": "Forma Giuridica & Costituzione",
                            "description": "Accompagnamento completo di costituzione con consulenza legale"
                        },
                        "finanzierung": {
                            "title": "Finanziamenti & Sovvenzioni",
                            "description": "Acquisizione di capitale e gestione sovvenzioni"
                        },
                        "marketing": {
                            "title": "Marketing & Vendite",
                            "description": "Strategia integrale di marketing e vendite"
                        },
                        "webseite": {
                            "title": "Sito Web & E-Commerce",
                            "description": "Sviluppo web professionale e negozio online"
                        },
                        "software": {
                            "title": "Sviluppo Software",
                            "description": "Soluzioni software su misura"
                        },
                        "ki_integration": {
                            "title": "Integrazione AI",
                            "description": "Intelligenza artificiale per la vostra azienda"
                        },
                        "stundenbasis": {
                            "title": "Consulenza Flessibile",
                            "description": "Consulenza individuale secondo necessità",
                            "feature1": "Consulenti senior",
                            "feature2": "Prenotazione flessibile",
                            "feature3": "Remoto o in loco",
                            "feature4": "Min. 2 ore",
                            "per_hour": "all'ora"
                        }
                    },
                    "why": {
                        "title": "Perché Servizi Aziendali?",
                        "description": "Massima efficienza attraverso soluzioni professionali complete"
                    }
                },
                "hero": {
                    "subtitle": "Soluzioni professionali per lo sviluppo aziendale sostenibile"
                },
                "pricing": {
                    "hero": {
                        "title": "Servizi Aziendali per il Vostro Successo",
                        "subtitle": "Soluzioni professionali per lo sviluppo aziendale sostenibile"
                    },
                    "services": {
                        "contact": "Richiedi consulenza",
                        "project": "Prezzo del progetto",
                        "request_consultation": "Richiedi consulenza",
                        "project_price": "Prezzo del progetto",
                        "per_hour": "all'ora",
                        "one_time_payment": "Pagamento unico o rateale"
                    },
                    "enterprise_cta": {
                        "title": "Pronti per le soluzioni aziendali?",
                        "subtitle": "Raggiungiamo insieme i vostri obiettivi commerciali",
                        "button": "Richiedi consulenza senza impegno"
                    },
                    "footer": {
                        "copyright": "© 2024 AI Concept Builder. Tutti i diritti riservati."
                    },
                    "faq": {
                        "title": "Domande frequenti",
                        "q1": {
                            "question": "I servizi possono essere prenotati individualmente?",
                            "answer": "Sì, tutti i Servizi Aziendali possono essere prenotati individualmente. Tuttavia, il pacchetto completo offre effetti di sinergia massimi e il miglior prezzo."
                        },
                        "q2": {
                            "question": "Quanto tempo richiede l'implementazione del progetto?",
                            "answer": "La durata del progetto varia per servizio. In media, aspettatevi 3-6 mesi per progetti individuali e 9-12 mesi per il pacchetto completo."
                        },
                        "q3": {
                            "question": "Quali opzioni di pagamento sono disponibili?",
                            "answer": "Offriamo piani di pagamento flessibili: pagamento unico con 5% di sconto, rate mensili o modelli basati sul successo per accordo."
                        },
                        "q4": {
                            "question": "Come viene assicurata la qualità?",
                            "answer": "Tutti i progetti passano attraverso la nostra gestione qualità certificata con revisioni regolari, milestone e documentazione trasparente."
                        }
                    },
                    "cta": {
                        "title": "Pronti per le soluzioni aziendali?",
                        "subtitle": "Raggiungiamo insieme i vostri obiettivi commerciali",
                        "button": "Richiedi consulenza senza impegno"
                    }
                }
            }
        };
        
        this.translations = allTranslations[this.currentLang] || allTranslations['de'];
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