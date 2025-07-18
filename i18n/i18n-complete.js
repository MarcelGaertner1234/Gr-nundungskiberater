/**
 * Complete Internationalization (i18n) System for Landing Page - Embedded Version
 * Works with both HTTP and file:// protocols
 * Supports 5 languages: DE, EN, FR, ES, IT
 */

// Embedded translations with ALL content
const translations = {
  de: {
    "meta": {
      "title": "Gründen. Fördern. Durchstarten. | KI Konzept Builder",
      "description": "Der All-in-One Workspace für Gründer. Erstelle bankfähige Businesspläne, finde Fördermittel und erhalte KI-gestützte Beratung – alles in einem Tool.",
      "keywords": "Gründungsberatung, Businessplan, KI, Fördermittel, Startup, Gründer, Finanzierung, Existenzgründung"
    },
    "navigation": {
      "beratung": "Beratung",
      "software": "Software",
      "beta": "Beta",
      "uber_mich": "Über mich",
      "beta_testen": "Beta testen",
      "beratung_starten": "Beratung starten →"
    },
    "hero": {
      "title": "Gründen. <span class=\"text-primary\">Fördern.</span> Durchstarten.",
      "subtitle": "Der All-in-One Workspace für Gründer. Erstelle bankfähige Businesspläne, finde Fördermittel und erhalte KI-gestützte Beratung – alles in einem Tool.",
      "cta_primary": "Gründungsberatung starten →",
      "cta_secondary": "Software entdecken",
      "icon_placeholder": "Icon Platzhalter"
    },
    "partners": {
      "title": "Vertraut von führenden Unternehmen"
    },
    "cards": {
      "meeting_notes": {
        "badge": "KI Beratungsprotokolle",
        "new": "Neu",
        "title": "Perfekte Protokolle bei jedem Gespräch.",
        "demo_title": "Gründungsberatung @Heute",
        "demo_time": "@Heute 15:45 Uhr",
        "demo_content": "Willkommen zur Gründungsberatung. Heute besprechen wir Ihre Geschäftsidee, analysieren Fördermöglichkeiten und erstellen einen Fahrplan für die nächsten Schritte..."
      },
      "search": {
        "badge": "Intelligente Suche",
        "new": "Neu",
        "title": "Eine Suche für alle Dokumente.",
        "placeholder": "Förderprogramme für Startups",
        "tags": {
          "businessplan": "📄 Businessplan 52",
          "funding": "💰 Förderung 36",
          "finance": "📊 Finanzplan 18",
          "more": "+ Mehr"
        },
        "result_title": "KfW Gründerkredit",
        "result_desc": "Zinsgünstige Förderung für Existenzgründer..."
      },
      "projects": {
        "badge": "📊 Projekte",
        "title": "Behalte jeden Plan im Blick."
      },
      "share": {
        "badge": "👥 Teilen",
        "title": "Von jedem und überall auf deine Pläne zugreifen.",
        "button": "Jetzt teilen →"
      }
    },
    "features": {
      "title": "Alles was du für dein Business brauchst",
      "subtitle": "Eine einzige Plattform für alle Schritte deiner Gründungsreise",
      "ai_advisor": {
        "title": "KI-Gründungsberater",
        "description": "Erhalte personalisierte Beratung rund um die Uhr. Unser KI-Berater hilft dir bei allen Fragen zur Existenzgründung."
      },
      "business_plan": {
        "title": "Intelligenter Businessplan",
        "description": "Erstelle bankfähige Businesspläne mit KI-Unterstützung. Automatische Marktanalyse und Finanzplanung inklusive.",
        "professional_description": "Erstelle professionelle Businesspläne, die Banken und Investoren überzeugen - in wenigen Stunden statt Wochen."
      },
      "funding": {
        "title": "Fördermittel-Finder",
        "description": "Finde die passenden Fördermittel für dein Startup. Automatische Recherche und Antragshilfe.",
        "automatic_matching": "Finde automatisch passende Förderprogramme und Zuschüsse für dein Gründungsvorhaben aus über 2.000 Programmen.",
        "ai_matching": "KI-basiertes Matching mit über 2.000 Förderprogrammen bundesweit."
      },
      "business_in_a_box": {
        "title": "Business-in-a-Box",
        "description": "Komplette Vorlagen für verschiedene Geschäftsmodelle. Von der Idee bis zur Umsetzung."
      },
      "ai_coach": {
        "title": "KI Business Coach",
        "description": "Dein persönlicher Business Coach begleitet dich durch alle Phasen der Gründung.",
        "personal_advisor": "Dein persönlicher Gründungsberater"
      },
      "legal_companion": {
        "title": "Rechts-Begleiter",
        "description": "Hilfe bei allen rechtlichen Fragen rund um deine Gründung. Verträge, Gesellschaftsformen und mehr."
      },
      "market_analysis": {
        "title": "Marktanalyse-Tool",
        "description": "Verstehe deinen Markt mit KI-gestützter Analyse. Zielgruppen, Wettbewerb und Trends."
      },
      "financial_planning": {
        "title": "Finanzplanung",
        "description": "Professionelle Finanzplanung mit automatischen Berechnungen und Prognosen.",
        "ai_title": "KI-gestützte Finanzplanung",
        "ai_description": "Intelligente Algorithmen helfen dir bei der Erstellung realistischer Finanzprognosen und Liquiditätspläne."
      },
      "team_management": {
        "title": "Team-Verwaltung",
        "description": "Verwalte dein Gründungsteam und arbeite gemeinsam an euren Projekten."
      },
      "personal_support": {
        "description": "Bei Bedarf erhältst du persönliche Unterstützung von erfahrenen Gründungsberatern - digital oder vor Ort."
      },
      "contracts": {
        "automatic_creation": "Automatische Erstellung von Verträgen und Geschäftsdokumenten."
      },
      "advisor": {
        "24_7": "24/7 verfügbarer Gründungsberater für alle deine Fragen."
      },
      "collaboration": {
        "description": "Gemeinsam mit Mitgründern und Beratern arbeiten."
      },
      "email": {
        "intelligent": "Intelligente E-Mail",
        "title": "Der Posteingang, der mitdenkt.",
        "important": "⭐ Wichtig",
        "filtering": "Filterung",
        "tax_number": "Steuernummer zugeteilt"
      },
      "analytics": {
        "title": "Deine Zahlen im Blick",
        "this_month": "Diesen Monat",
        "growth": "↑ 23%"
      },
      "business_hub": {
        "badge": "Business-in-a-box",
        "company_hq": "Unternehmens-HQ",
        "general": "Allgemein",
        "values": "Werte",
        "employee_directory": "Mitarbeiter-Verzeichnis"
      },
      "invoice": {
        "badge": "Rechnungsgenerator",
        "title": "Professionelle Rechnungen in Sekunden",
        "invoice_number": "Rechnung #2025-001",
        "paid": "Bezahlt",
        "consulting_service": "Beratungsleistung",
        "vat": "MwSt. (19%)"
      }
    },
    "security": {
      "gdpr": "DSGVO-konforme Datenverarbeitung",
      "ssl": "SSL-verschlüsselte Übertragung",
      "german_servers": "Deutsche Rechenzentren"
    },
    "project_status": {
      "finished": "✅ Fertig",
      "completed": "Abgeschlossen",
      "api_release": "API v2.0 Release"
    },
    "customer_stories": {
      "title": "Erfolgsgeschichten unserer Gründer",
      "subtitle": "Über 500 Gründer haben bereits erfolgreich mit dem KI Konzept Builder gestartet",
      "stats": {
        "leading_companies": "Führende Unternehmen nutzen KI Konzept Builder (G2)",
        "top_rated": "#1 bewertetes KI Tool für Gründer (G2)",
        "yc_companies": "Über 50% der YC Unternehmen"
      },
      "story_1": {
        "quote": "Dank des KI Konzept Builders konnte ich meinen Businessplan in nur 3 Tagen fertigstellen. Die Bank war begeistert!",
        "author": "Sarah M.",
        "company": "Tech Startup"
      },
      "story_2": {
        "quote": "Der Fördermittel-Finder hat mir geholfen, 50.000€ Startkapital zu bekommen. Unglaublich!",
        "author": "Michael K.",
        "company": "E-Commerce"
      },
      "story_3": {
        "quote": "Die KI-Beratung war wie ein persönlicher Mentor. Jederzeit verfügbar und super kompetent.",
        "author": "Lisa R.",
        "company": "Beratungsagentur"
      }
    },
    "onboarding": {
      "title": "Starte jetzt deine Gründungsreise",
      "subtitle": "Erzähle uns von deiner Geschäftsidee und wir erstellen einen maßgeschneiderten Plan für dich.",
      "steps": {
        "1": {
          "title": "Formular ausfüllen",
          "desc": "Teile deine Idee mit uns"
        },
        "2": {
          "title": "Onboarding E-Mail",
          "desc": "Detaillierte Erfassung deiner Pläne"
        },
        "3": {
          "title": "KI-Analyse",
          "desc": "Kostenlose Ersteinschätzung"
        },
        "4": {
          "title": "Beratungsgespräch",
          "desc": "Individuelles Angebot"
        }
      },
      "form": {
        "name": "Name",
        "name_placeholder": "Max Mustermann",
        "email": "E-Mail",
        "email_placeholder": "max@beispiel.de",
        "phone": "Telefon",
        "phone_placeholder": "+49 123 456789",
        "country": "Land",
        "country_placeholder": "Bitte wählen...",
        "business_idea": "Geschäftsidee",
        "business_idea_placeholder": "Beschreibe kurz deine Geschäftsidee...",
        "phase": "Gründungsphase",
        "phase_placeholder": "Bitte wählen...",
        "phase_idea": "Ideenphase",
        "phase_concept": "Konzeptphase",
        "phase_founding": "Gründungsphase",
        "phase_growth": "Wachstumsphase",
        "submit": "Kostenlose Beratung anfordern →"
      },
      "benefits": {
        "title": "🎁 Was du erhältst:",
        "form": "Detailliertes Onboarding-Formular per E-Mail",
        "analysis": "✓ Kostenlose Erstanalyse deiner Geschäftsidee",
        "advisor": "✓ Persönlicher KI-Berater für 7 Tage",
        "funding": "✓ Erste Fördermittel-Recherche",
        "plan": "✓ Individueller Fahrplan für deine Gründung",
        "free_assessment": "Kostenlose Ersteinschätzung & Empfehlungen",
        "custom_package": "Maßgeschneidertes Beratungspaket"
      },
      "call_to_action": "Erzähle uns von deiner Geschäftsidee und erhalte eine kostenlose Ersteinschätzung",
      "services": {
        "title": "Wähle das Gesamtpaket oder einzelne Services",
        "description": "Mehrfachauswahl möglich",
        "gesamtpaket": {
          "name": "Gesamtpaket",
          "description": "Rundum-Betreuung von A bis Z"
        },
        "finanzierung": {
          "name": "Finanzierung",
          "description": "Fördermittel, Kredite & Investoren"
        },
        "rechtsform": {
          "name": "Rechtsform",
          "description": "GmbH, UG oder Einzelunternehmen?"
        },
        "businessplan": {
          "name": "Businessplan",
          "description": "Strategie & Geschäftsmodell"
        },
        "marketing": {
          "name": "Marketing",
          "description": "Kundengewinnung & Vertrieb"
        },
        "webseite": {
          "name": "Webseite",
          "description": "Professionelle Online-Präsenz"
        },
        "software": {
          "name": "Software",
          "description": "Individuelle Softwarelösungen"
        },
        "ki_integration": {
          "name": "KI-Integration",
          "description": "Automatisierung & KI-Tools"
        },
        "hourly": {
          "name": "Stundenbasis",
          "description": "Flexible Beratung nach Bedarf"
        }
      },
      "completion": {
        "title": "Perfekt! Deine Auswahl wurde gespeichert",
        "subtitle": "Jetzt erstellen wir gemeinsam dein individuelles Angebot",
        "summary_title": "Deine gewählten Services:",
        "button": "Los geht's →"
      }
    },
    "software": {
      "title": "Deine Gründungsplattform",
      "subtitle": "Alles was du brauchst, um dein Startup erfolgreich zu starten",
      "preview_title": "Software-Vorschau",
      "preview_subtitle": "Sieh dir an, wie unsere Plattform aussieht und funktioniert",
      "features": {
        "dashboard": "Übersichtliches Dashboard",
        "ai_chat": "KI-Chat Integration",
        "templates": "Professionelle Vorlagen",
        "collaboration": "Team-Zusammenarbeit",
        "beta_available": "Verfügbar in Beta",
        "interactive_editor": "Interaktiver Editor mit Vorlagen und KI-Unterstützung für professionelle Businesspläne.",
        "financial_planning": "Automatische Erstellung von GuV, Liquiditätsplan und Rentabilitätsvorschau."
      },
      "all_tools": {
        "title": "Alle Tools für deinen Erfolg",
        "subtitle": "Unsere Software bietet dir alles, was du für eine erfolgreiche Gründung brauchst."
      },
      "tracking": {
        "title": "Gründungs-Tracker",
        "pre_founding": "▼ Vor-Gründung"
      },
      "tracker": {
        "checklist": "Checkliste",
        "timeline": "Timeline"
      },
      "roadmap": {
        "beta_release": "Beta Release",
        "final_version": "Finale Version",
        "status": "Status",
        "updates": "Updates",
        "q1_2025": "Q1 2025",
        "q2_2025": "Q2 2025",
        "progress_65": "Fortschritt: 65%",
        "status": {
          "planned": "🔵 Geplant",
          "in_progress": "🟡 In Arbeit",
          "completed": "✅ Fertig"
        },
        "features": {
          "drag_drop_ui": "Drag-and-Drop UI Verbesserungen",
          "ai_bmc": "KI-basierte BMC Generierung",
          "two_factor": "Zwei-Faktor-Authentifizierung"
        }
      },
      "checklist": {
        "idea_validated": "Geschäftsidee validiert",
        "market_analyzed": "Marktanalyse durchgeführt",
        "businessplan_created": "Businessplan erstellt"
      },
      "notifications": {
        "funding_bank": "Willkommen bei der Förderbank",
        "ihk_munich": "IHK München",
        "consultation_appointment": "Gründerberatung Termin"
      },
      "business_model": "Geschäftsmodell / Vision / Mission",
      "roadmap": {
        "title": "Öffentliche Roadmap"
      },
      "analytics": {
        "business_plans": "Businesspläne",
        "funding_applications": "Förderanträge"
      },
      "knowledge": {
        "title": "Dein Gründerwissen zentral gespeichert",
        "funding_guidelines": "Förderrichtlinien 2025"
      },
      "templates": {
        "available": "15 Vorlagen verfügbar"
      },
      "contracts": {
        "title": "Rechtssichere Verträge erstellen",
        "employment": "Arbeitsverträge"
      },
      "investors": {
        "title": "Überzeuge Investoren mit professionellen Unterlagen"
      },
      "ai_recommendation": {
        "exist_grant": "Basierend auf deiner Geschäftsidee empfehle ich dir das EXIST-Gründerstipendium. Deine Chancen stehen gut, weil..."
      },
      "funding": {
        "apply_button": "Förderung beantragen"
      }
    },
    "beta": {
      "title": "Werde Beta-Tester",
      "subtitle": "Sei einer der ersten, die Zugang zu unserer revolutionären Gründungsplattform bekommen.",
      "early_access_description": "Sei einer der Ersten und gestalte die Zukunft der Gründungsberatung mit.",
      "limited_spots": "Limitierte Plätze verfügbar • Kostenlos während der Beta-Phase",
      "benefits": {
        "early_access": "Früher Zugang zu neuen Features",
        "free_period": "3 Monate kostenlos",
        "priority_support": "Prioritäts-Support",
        "community": "Exklusive Beta-Community"
      },
      "form": {
        "email": "E-Mail-Adresse",
        "email_placeholder": "deine@email.de",
        "name": "Name",
        "name_placeholder": "Dein Name",
        "company": "Unternehmen",
        "company_placeholder": "Dein Unternehmen (optional)",
        "submit": "Beta-Zugang beantragen →"
      }
    },
    "faq": {
      "title": "Häufig gestellte Fragen",
      "subtitle": "Alles was du über den KI Konzept Builder wissen musst",
      "items": {
        "q1": {
          "question": "Was ist der KI Konzept Builder?",
          "answer": "Der KI Konzept Builder ist eine All-in-One Plattform für Gründer, die KI-gestützte Beratung, Businessplan-Erstellung, Fördermittel-Recherche und Team-Management in einem Tool vereint."
        },
        "q2": {
          "question": "Wie funktioniert die KI-Beratung?",
          "answer": "Unsere KI wurde speziell für Gründungsberatung trainiert und kann dir bei allen Fragen rund um deine Existenzgründung helfen - von der Geschäftsidee bis zur Finanzierung."
        },
        "q3": {
          "question": "Ist der Service kostenlos?",
          "answer": "Wir bieten eine kostenlose Erstanalyse und verschiedene Preispläne für erweiterte Features. Beta-Tester erhalten 3 Monate kostenlosen Zugang."
        },
        "q4": {
          "question": "Für wen ist die Plattform geeignet?",
          "answer": "Unsere Plattform ist für alle Gründer geeignet - vom Erstgründer bis zum Serial Entrepreneur. Egal in welcher Phase deiner Gründung du dich befindest."
        },
        "q5": {
          "question": "Wie sicher sind meine Daten?",
          "answer": "Datenschutz und Sicherheit haben höchste Priorität. Alle Daten werden verschlüsselt übertragen und in deutschen Rechenzentren gespeichert."
        },
        "funding": {
          "question": "Welche Fördermittel kann ich über die Plattform finden?",
          "answer": "Wir haben eine Datenbank mit über 2.000 Förderprogrammen auf Bundes-, Landes- und EU-Ebene. Unsere KI matcht deine Geschäftsidee automatisch mit passenden Fördermöglichkeiten wie EXIST, INVEST, KfW-Krediten und regionalen Zuschüssen."
        },
        "cost": {
          "question": "Ist die Beratung wirklich kostenlos?",
          "answer": "Ja, die Erstberatung und KI-Analyse sind komplett kostenlos. Du erhältst eine detaillierte Einschätzung deiner Geschäftsidee und passende Empfehlungen. Nur bei weiterführender persönlicher Beratung entstehen Kosten, die transparent kommuniziert werden."
        },
        "security": {
          "question": "Wie sicher sind meine Daten?",
          "answer": "Wir nehmen Datenschutz sehr ernst. Alle Daten werden verschlüsselt übertragen und in deutschen Rechenzentren nach DSGVO-Standards gespeichert. Deine Geschäftsidee und Pläne sind durch moderne Sicherheitstechnologien geschützt."
        },
        "offline": {
          "question": "Kann ich den Businessplan auch offline bearbeiten?",
          "answer": "Ja, du kannst deinen Businessplan jederzeit als PDF oder Word-Dokument exportieren und offline bearbeiten. Änderungen können dann wieder in die Plattform eingepflegt werden. Zusätzlich gibt es eine Offline-Funktion für die wichtigsten Features."
        },
        "timeline": {
          "question": "Wie lange dauert es, bis ich Ergebnisse sehe?",
          "answer": "Die KI-Analyse ist in wenigen Minuten abgeschlossen. Einen ersten Businessplan-Entwurf erhältst du innerhalb von 24 Stunden. Für die komplette Ausarbeitung mit Fördermittel-Matching solltest du 3-5 Tage einplanen."
        }
      }
    },
    "about": {
      "title": "Über den Gründer",
      "subtitle": "Marcel Gärtner - Gründungsberater und Software-Entwickler",
      "description": "Als erfahrener Gründungsberater und Software-Entwickler kenne ich die Herausforderungen von Gründern aus erster Hand. Mit dem KI Konzept Builder möchte ich den Gründungsprozess revolutionieren und jedem Gründer die Tools an die Hand geben, die für eine erfolgreiche Unternehmensgründung notwendig sind.",
      "image_alt": "Marcel Gärtner - Gründer des KI Konzept Builders",
      "experience": {
        "title": "Erfahrung",
        "items": {
          "software": "10+ Jahre Softwareentwicklung",
          "consulting": "5+ Jahre Gründungsberatung",
          "startups": "20+ erfolgreiche Startups begleitet",
          "funding": "2+ Mio. € Fördermittel vermittelt"
        }
      },
      "mission": {
        "title": "Mission",
        "text": "Meine Mission: Gründung soll einfach, effizient und erfolgreich sein - für jeden."
      }
    },
    "footer": {
      "newsletter": {
        "title": "Bleibe auf dem Laufenden",
        "description": "Erhalte die neuesten Updates, Tipps und Erfolgsgeschichten direkt in dein Postfach.",
        "email_placeholder": "Deine E-Mail-Adresse",
        "submit": "Newsletter abonnieren",
        "disclaimer": "Kostenlos • Jederzeit kündbar • DSGVO-konform"
      },
      "company": {
        "title": "KI Konzept Builder",
        "description": "Der All-in-One Workspace für erfolgreiche Gründer. Von der Idee bis zur Finanzierung."
      },
      "product": {
        "title": "Produkt",
        "features": "Features",
        "beta_access": "Beta-Zugang",
        "pricing": "Preise"
      },
      "resources": {
        "title": "Ressourcen",
        "faq": "FAQ",
        "about": "Über mich",
        "contact": "Kontakt"
      },
      "legal": {
        "title": "Rechtliches",
        "imprint": "Impressum",
        "privacy": "Datenschutz",
        "terms": "AGB"
      },
      "copyright": "© 2024 KI Konzept Builder. Alle Rechte vorbehalten."
    },
    "common": {
      "email": "E-Mail",
      "phone": "Telefon",
      "new": "Neu",
      "premium": "Premium"
    },
    "calendar": {
      "monday": "Mo",
      "tuesday": "Di",
      "wednesday": "Mi",
      "thursday": "Do",
      "friday": "Fr",
      "saturday": "Sa",
      "sunday": "So"
    },
    "payment": {
      "title": "Dein individuelles Angebot",
      "subtitle": "Wähle deine bevorzugte Zahlungsmethode und starte deine Gründungsreise",
      "services_title": "Deine ausgewählten Services",
      "pricing_title": "Preisübersicht",
      "payment_methods_title": "Zahlungsmethode wählen",
      "services": {
        "gesamtpaket": {
          "name": "🚀 Gesamtpaket - Rundum-Betreuung",
          "description": "Komplette Gründungsbegleitung von A-Z inkl. aller Services - Sie sparen über 50.000€!"
        },
        "finanzierung": {
          "name": "💰 Finanzierung & Förderung",
          "description": "Umfassende Förderberatung, Antragsstellung und Begleitung"
        },
        "rechtsform": {
          "name": "⚖️ Rechtsform-Beratung",
          "description": "Detaillierte Analyse und Beratung zur optimalen Rechtsform"
        },
        "businessplan": {
          "name": "📊 Businessplan-Erstellung",
          "description": "Professioneller, bankfähiger Businessplan inkl. Finanzplanung"
        },
        "marketing": {
          "name": "📱 Marketing & Vertrieb",
          "description": "Komplette Marketing-Strategie, CI/CD, und Vertriebskonzept"
        },
        "webseite": {
          "name": "🌐 Webseiten-Entwicklung",
          "description": "Professionelle Unternehmenswebseite - Design, Entwicklung, CMS, SEO, 1 Jahr Support"
        },
        "software": {
          "name": "💻 Software-Entwicklung",
          "description": "Individuelle Softwarelösung - Konzept, Entwicklung, Testing, Deployment, Support"
        },
        "ki_integration": {
          "name": "🤖 KI-Integration",
          "description": "Maßgeschneiderte KI-Lösungen und Automatisierung für Ihre Prozesse"
        },
        "stundenbasis": {
          "name": "⏰ Stundenbasis",
          "description": "Flexible Beratung nach Bedarf - Abrechnung pro Stunde"
        }
      },
      "pricing": {
        "subtotal": "Zwischensumme:",
        "discount": "Rabatt:",
        "tax": "MwSt. (19%):",
        "total": "Gesamtbetrag:",
        "variable_note": "* Die angezeigten Preise sind Startpreise. Der finale Preis wird nach detaillierter Projektbesprechung festgelegt."
      },
      "methods": {
        "stripe": {
          "name": "Kreditkarte / Debitkarte",
          "description": "Sichere Zahlung mit Stripe"
        },
        "paypal": {
          "name": "PayPal",
          "description": "Schnell und sicher mit PayPal bezahlen"
        },
        "sepa": {
          "name": "SEPA-Lastschrift",
          "description": "Bequem per Bankeinzug"
        },
        "invoice": {
          "name": "Rechnung",
          "description": "Zahlung auf Rechnung (nur für Unternehmen)"
        }
      },
      "buttons": {
        "back": "← Zurück",
        "checkout": "Jetzt kostenpflichtig buchen"
      }
    },
    "auth": {
      "login": {
        "title": "Willkommen zurück",
        "subtitle": "Melde dich an, um zu deiner Gründungsberatung zu gelangen",
        "email": "E-Mail Adresse",
        "password": "Passwort",
        "forgot_password": "Passwort vergessen?",
        "submit": "Anmelden",
        "register_link": "Noch kein Konto? Jetzt registrieren",
        "beta_title": "Beta Software Login",
        "beta_subtitle": "Melde dich an, um die Beta-Version zu testen",
        "consulting_title": "Beratungskunden Login",
        "consulting_subtitle": "Melde dich an, um zu deiner Gründungsberatung zu gelangen"
      },
      "register": {
        "title": "Konto erstellen",
        "subtitle": "Sichere dir deinen Zugang zu deiner persönlichen Gründungsberatung",
        "email": "E-Mail Adresse",
        "password": "Passwort erstellen",
        "confirm_password": "Passwort bestätigen",
        "terms": "Ich akzeptiere die AGB und die Datenschutzerklärung",
        "submit": "Konto erstellen",
        "login_link": "Du hast bereits ein Konto? Jetzt anmelden",
        "password_requirements": {
          "length": "Mindestens 8 Zeichen",
          "uppercase": "Einen Großbuchstaben",
          "number": "Eine Zahl"
        }
      },
      "social": {
        "google_login": "Mit Google anmelden",
        "google_register": "Mit Google registrieren",
        "microsoft_login": "Mit Microsoft anmelden",
        "microsoft_register": "Mit Microsoft registrieren"
      }
    }
  },
  en: {
    "meta": {
      "title": "Start. Fund. Launch. | AI Concept Builder",
      "description": "The All-in-One Workspace for Entrepreneurs. Create bankable business plans, find funding, and get AI-powered consulting – all in one tool.",
      "keywords": "business consulting, business plan, AI, funding, startup, entrepreneur, financing, business formation"
    },
    "navigation": {
      "beratung": "Consulting",
      "software": "Software",
      "beta": "Beta",
      "uber_mich": "About me",
      "beta_testen": "Try Beta",
      "beratung_starten": "Start Consulting →"
    },
    "hero": {
      "title": "Start. <span class=\"text-primary\">Fund.</span> Launch.",
      "subtitle": "The All-in-One Workspace for Entrepreneurs. Create bankable business plans, find funding, and get AI-powered consulting – all in one tool.",
      "cta_primary": "Start Business Consulting →",
      "cta_secondary": "Discover Software",
      "icon_placeholder": "Icon Placeholder"
    },
    "partners": {
      "title": "Trusted by leading companies"
    },
    "cards": {
      "meeting_notes": {
        "badge": "AI Meeting Notes",
        "new": "New",
        "title": "Perfect notes for every meeting.",
        "demo_title": "Business Consultation @Today",
        "demo_time": "@Today 3:45 PM",
        "demo_content": "Welcome to business consultation. Today we'll discuss your business idea, analyze funding opportunities and create a roadmap for the next steps..."
      },
      "search": {
        "badge": "Smart Search",
        "new": "New",
        "title": "One search for all documents.",
        "placeholder": "Funding programs for startups",
        "tags": {
          "businessplan": "📄 Business Plan 52",
          "funding": "💰 Funding 36",
          "finance": "📊 Finance Plan 18",
          "more": "+ More"
        },
        "result_title": "KfW Startup Loan",
        "result_desc": "Low-interest funding for entrepreneurs..."
      },
      "projects": {
        "badge": "📊 Projects",
        "title": "Keep track of every plan."
      },
      "share": {
        "badge": "👥 Share",
        "title": "Access your plans from anywhere and anyone.",
        "button": "Share now →"
      }
    },
    "features": {
      "title": "Everything you need for your startup",
      "subtitle": "A single platform for all steps of your entrepreneurial journey",
      "ai_advisor": {
        "title": "AI Business Advisor",
        "description": "Get personalized advice around the clock. Our AI advisor helps you with all questions about starting your business."
      },
      "business_plan": {
        "title": "Smart Business Plan",
        "description": "Create bankable business plans with AI support. Automatic market analysis and financial planning included."
      },
      "funding": {
        "title": "Funding Finder",
        "description": "Find the right funding for your startup. Automatic research and application assistance."
      },
      "business_in_a_box": {
        "title": "Business-in-a-Box",
        "description": "Complete templates for various business models. From idea to implementation."
      },
      "ai_coach": {
        "title": "AI Business Coach",
        "description": "Your personal business coach guides you through all phases of starting your business.",
        "personal_advisor": "Your personal business advisor"
      },
      "legal_companion": {
        "title": "Legal Companion",
        "description": "Help with all legal questions around your startup. Contracts, business structures and more."
      },
      "market_analysis": {
        "title": "Market Analysis Tool",
        "description": "Understand your market with AI-powered analysis. Target groups, competition and trends."
      },
      "financial_planning": {
        "title": "Financial Planning",
        "description": "Professional financial planning with automatic calculations and forecasts.",
        "ai_title": "AI-powered Financial Planning",
        "ai_description": "Intelligent algorithms help you create realistic financial forecasts and liquidity plans."
      },
      "team_management": {
        "title": "Team Management",
        "description": "Manage your founding team and work together on your projects."
      }
    },
    "security": {
      "gdpr": "GDPR compliant data processing",
      "ssl": "SSL encrypted transmission",
      "german_servers": "German data centers"
    },
    "project_status": {
      "finished": "✅ Finished",
      "completed": "Completed",
      "api_release": "API v2.0 Release"
    },
    "customer_stories": {
      "title": "Success stories from our entrepreneurs",
      "subtitle": "Over 500 entrepreneurs have already successfully started with the AI Concept Builder",
      "story_1": {
        "quote": "Thanks to the AI Concept Builder, I was able to complete my business plan in just 3 days. The bank was thrilled!",
        "author": "Sarah M.",
        "company": "Tech Startup"
      },
      "story_2": {
        "quote": "The funding finder helped me get €50,000 in startup capital. Incredible!",
        "author": "Michael K.",
        "company": "E-Commerce"
      },
      "story_3": {
        "quote": "The AI consulting was like having a personal mentor. Always available and super competent.",
        "author": "Lisa R.",
        "company": "Consulting Agency"
      }
    },
    "onboarding": {
      "title": "Start your entrepreneurial journey now",
      "subtitle": "Tell us about your business idea and we'll create a customized plan for you.",
      "steps": {
        "1": {
          "title": "Fill out form",
          "desc": "Share your idea with us"
        },
        "2": {
          "title": "Onboarding Email",
          "desc": "Detailed capture of your plans"
        },
        "3": {
          "title": "AI Analysis",
          "desc": "Free initial assessment"
        },
        "4": {
          "title": "Consultation Call",
          "desc": "Individual offer"
        }
      },
      "form": {
        "name": "Name",
        "name_placeholder": "John Doe",
        "email": "Email",
        "email_placeholder": "john@example.com",
        "phone": "Phone",
        "phone_placeholder": "+1 234 567890",
        "country": "Country",
        "country_placeholder": "Please select...",
        "business_idea": "Business idea",
        "business_idea_placeholder": "Describe your business idea briefly...",
        "phase": "Startup phase",
        "phase_placeholder": "Please select...",
        "phase_idea": "Idea phase",
        "phase_concept": "Concept phase",
        "phase_founding": "Founding phase",
        "phase_growth": "Growth phase",
        "submit": "Request free consultation →"
      },
      "benefits": {
        "title": "🎁 What you'll receive:",
        "form": "Detailed onboarding form via email",
        "analysis": "✓ Free initial analysis of your business idea",
        "advisor": "✓ Personal AI advisor for 7 days",
        "funding": "✓ Initial funding research",
        "plan": "✓ Individual roadmap for your startup"
      }
    },
    "software": {
      "title": "Your startup platform",
      "subtitle": "Everything you need to successfully launch your startup",
      "preview_title": "Software Preview",
      "preview_subtitle": "See how our platform looks and works",
      "features": {
        "dashboard": "Clear dashboard",
        "ai_chat": "AI chat integration",
        "templates": "Professional templates",
        "collaboration": "Team collaboration",
        "beta_available": "Available in Beta",
        "interactive_editor": "Interactive editor with templates and AI support for professional business plans.",
        "financial_planning": "Automatic creation of P&L, cash flow and profitability forecasts."
      },
      "all_tools": {
        "title": "All tools for your success",
        "subtitle": "Our software provides everything you need for successful startup formation."
      },
      "tracking": {
        "title": "Startup Tracker",
        "pre_founding": "▼ Pre-Founding"
      },
      "tracker": {
        "checklist": "Checklist",
        "timeline": "Timeline"
      },
      "checklist": {
        "idea_validated": "Business idea validated",
        "market_analyzed": "Market analysis completed",
        "businessplan_created": "Business plan created"
      },
      "notifications": {
        "funding_bank": "Welcome to the funding bank",
        "ihk_munich": "IHK Munich",
        "consultation_appointment": "Business consultation appointment"
      },
      "business_model": "Business Model / Vision / Mission",
      "roadmap": {
        "title": "Public Roadmap",
        "beta_release": "Beta Release",
        "final_version": "Final Version",
        "status": "Status",
        "updates": "Updates",
        "q1_2025": "Q1 2025",
        "q2_2025": "Q2 2025",
        "progress_65": "Progress: 65%",
        "status": {
          "planned": "🔵 Planned",
          "in_progress": "🟡 In Progress",
          "completed": "✅ Completed"
        },
        "features": {
          "drag_drop_ui": "Drag-and-Drop UI Improvements",
          "ai_bmc": "AI-based BMC Generation",
          "two_factor": "Two-Factor Authentication"
        }
      },
      "analytics": {
        "business_plans": "Business Plans",
        "funding_applications": "Funding Applications"
      },
      "knowledge": {
        "title": "Your startup knowledge centrally stored",
        "funding_guidelines": "Funding Guidelines 2025"
      },
      "templates": {
        "available": "15 templates available"
      },
      "contracts": {
        "title": "Create legally compliant contracts",
        "employment": "Employment contracts"
      },
      "investors": {
        "title": "Convince investors with professional documents"
      },
      "ai_recommendation": {
        "exist_grant": "Based on your business idea, I recommend the EXIST startup grant. Your chances are good because..."
      },
      "funding": {
        "apply_button": "Apply for funding"
      }
    },
    "features": {
      "title": "Everything you need for your business",
      "subtitle": "A single platform for all steps of your startup journey",
      "ai_advisor": {
        "title": "AI Business Advisor",
        "description": "Get personalized advice around the clock. Our AI advisor helps you with all questions about starting your business."
      },
      "business_plan": {
        "title": "Smart Business Plan",
        "description": "Create bankable business plans with AI support. Automatic market analysis and financial planning included.",
        "professional_description": "Create professional business plans that convince banks and investors - in hours instead of weeks."
      },
      "funding": {
        "title": "Funding Finder",
        "description": "Find the right funding for your startup. Automatic research and application assistance.",
        "automatic_matching": "Automatically find matching funding programs and grants for your startup from over 2,000 programs.",
        "ai_matching": "AI-based matching with over 2,000 funding programs nationwide."
      },
      "business_in_a_box": {
        "title": "Business-in-a-Box",
        "description": "Complete templates for various business models. From idea to implementation."
      },
      "ai_coach": {
        "title": "AI Business Coach",
        "description": "Your personal business coach guides you through all phases of starting your business.",
        "personal_advisor": "Your personal business advisor"
      },
      "legal_companion": {
        "title": "Legal Companion",
        "description": "Help with all legal questions around your startup. Contracts, business structures and more."
      },
      "market_analysis": {
        "title": "Market Analysis Tool",
        "description": "Understand your market with AI-powered analysis. Target groups, competition and trends."
      },
      "financial_planning": {
        "title": "Financial Planning",
        "description": "Professional financial planning with automatic calculations and forecasts.",
        "ai_title": "AI-powered Financial Planning",
        "ai_description": "Intelligent algorithms help you create realistic financial forecasts and liquidity plans."
      },
      "team_management": {
        "title": "Team Management",
        "description": "Manage your founding team and work together on your projects."
      },
      "personal_support": {
        "description": "If needed, you get personal support from experienced business consultants - digital or on-site."
      },
      "contracts": {
        "automatic_creation": "Automatic creation of contracts and business documents."
      },
      "advisor": {
        "24_7": "24/7 available business advisor for all your questions."
      },
      "collaboration": {
        "description": "Work together with co-founders and advisors."
      },
      "email": {
        "intelligent": "Smart Email",
        "title": "The inbox that thinks along.",
        "important": "⭐ Important",
        "filtering": "Filtering",
        "tax_number": "Tax number assigned"
      },
      "analytics": {
        "title": "Your numbers at a glance",
        "this_month": "This month",
        "growth": "↑ 23%"
      },
      "business_hub": {
        "badge": "Business-in-a-box",
        "company_hq": "Company HQ",
        "general": "General",
        "values": "Values",
        "employee_directory": "Employee Directory"
      },
      "invoice": {
        "badge": "Invoice Generator",
        "title": "Professional invoices in seconds",
        "invoice_number": "Invoice #2025-001",
        "paid": "Paid",
        "consulting_service": "Consulting Service",
        "vat": "VAT (19%)"
      }
    },
    "calendar": {
      "monday": "Mon",
      "tuesday": "Tue",
      "wednesday": "Wed",
      "thursday": "Thu",
      "friday": "Fri",
      "saturday": "Sat",
      "sunday": "Sun"
    },
    "common": {
      "email": "Email",
      "phone": "Phone",
      "new": "New",
      "premium": "Premium"
    },
    "beta": {
      "title": "Become a Beta Tester",
      "subtitle": "Be one of the first to get access to our revolutionary startup platform.",
      "benefits": {
        "early_access": "Early access to new features",
        "free_period": "3 months free",
        "priority_support": "Priority support",
        "community": "Exclusive beta community"
      },
      "form": {
        "email": "Email address",
        "email_placeholder": "your@email.com",
        "name": "Name",
        "name_placeholder": "Your name",
        "company": "Company",
        "company_placeholder": "Your company (optional)",
        "submit": "Request beta access →"
      }
    },
    "faq": {
      "title": "Frequently Asked Questions",
      "items": {
        "q1": {
          "question": "What is the AI Concept Builder?",
          "answer": "The AI Concept Builder is an all-in-one platform for entrepreneurs that combines AI-powered consulting, business plan creation, funding research, and team management in one tool."
        },
        "q2": {
          "question": "How does the AI consulting work?",
          "answer": "Our AI has been specially trained for startup consulting and can help you with all questions about starting your business - from the business idea to financing."
        },
        "q3": {
          "question": "Is the service free?",
          "answer": "We offer a free initial analysis and various pricing plans for advanced features. Beta testers get 3 months of free access."
        },
        "q4": {
          "question": "Who is the platform suitable for?",
          "answer": "Our platform is suitable for all entrepreneurs - from first-time founders to serial entrepreneurs. No matter what stage of your startup journey you're in."
        },
        "q5": {
          "question": "How secure is my data?",
          "answer": "Data protection and security have the highest priority. All data is transmitted encrypted and stored in German data centers."
        }
      }
    },
    "about": {
      "title": "About the Founder",
      "subtitle": "Marcel Gärtner - Business Consultant and Software Developer",
      "description": "With over 10 years of experience in software development and business consulting, I help aspiring entrepreneurs turn their visions into successful businesses.",
      "experience": {
        "title": "Experience",
        "items": {
          "software": "10+ years software development",
          "consulting": "5+ years business consulting",
          "startups": "20+ successful startups supported",
          "funding": "€2+ million in funding facilitated"
        }
      },
      "mission": {
        "title": "Mission",
        "text": "My mission is to give every entrepreneur the tools and knowledge they need to succeed. The AI Concept Builder is the result of this vision."
      }
    },
    "footer": {
      "newsletter": {
        "title": "Stay updated",
        "description": "Get the latest updates, tips and success stories delivered directly to your inbox.",
        "email_placeholder": "Your email address",
        "submit": "Subscribe to newsletter",
        "disclaimer": "Free • Cancel anytime • GDPR compliant"
      },
      "company": {
        "title": "AI Concept Builder",
        "description": "The All-in-One Workspace for successful entrepreneurs. From idea to funding."
      },
      "product": {
        "title": "Product",
        "features": "Features",
        "beta_access": "Beta access",
        "pricing": "Pricing"
      },
      "resources": {
        "title": "Resources",
        "faq": "FAQ",
        "about": "About me",
        "contact": "Contact"
      },
      "legal": {
        "title": "Legal",
        "imprint": "Imprint",
        "privacy": "Privacy",
        "terms": "Terms"
      },
      "copyright": "© 2024 AI Concept Builder. All rights reserved."
    },
    "common": {
      "email": "Email",
      "phone": "Phone",
      "new": "New",
      "premium": "Premium"
    }
  },
  fr: {
    "meta": {
      "title": "Créer. Financer. Lancer. | AI Concept Builder",
      "description": "L'espace de travail tout-en-un pour les entrepreneurs. Créez des business plans bancables, trouvez des financements et obtenez des conseils IA – le tout dans un seul outil.",
      "keywords": "conseil en création d'entreprise, business plan, IA, financement, startup, entrepreneur, financement, création d'entreprise"
    },
    "navigation": {
      "beratung": "Conseil",
      "software": "Logiciel",
      "beta": "Bêta",
      "uber_mich": "À propos",
      "beta_testen": "Tester la bêta",
      "beratung_starten": "Commencer le conseil →"
    },
    "hero": {
      "title": "Créer. <span class=\"text-primary\">Financer.</span> Lancer.",
      "subtitle": "L'espace de travail tout-en-un pour les entrepreneurs. Créez des business plans bancables, trouvez des financements et obtenez des conseils IA – le tout dans un seul outil.",
      "cta_primary": "Commencer le conseil entrepreneurial →",
      "cta_secondary": "Découvrir le logiciel",
      "icon_placeholder": "Espace réservé à l'icône"
    },
    "partners": {
      "title": "Approuvé par des entreprises leader"
    },
    "cards": {
      "meeting_notes": {
        "badge": "Notes de réunion IA",
        "new": "Nouveau",
        "title": "Notes parfaites pour chaque réunion.",
        "demo_title": "Consultation d'entreprise @Aujourd'hui",
        "demo_time": "@Aujourd'hui 15h45",
        "demo_content": "Bienvenue à la consultation d'entreprise. Aujourd'hui, nous discuterons de votre idée d'entreprise, analyserons les opportunités de financement et créerons une feuille de route pour les prochaines étapes..."
      },
      "search": {
        "badge": "Recherche intelligente",
        "new": "Nouveau",
        "title": "Une recherche pour tous les documents.",
        "placeholder": "Programmes de financement pour startups",
        "tags": {
          "businessplan": "📄 Business Plan 52",
          "funding": "💰 Financement 36",
          "finance": "📊 Plan financier 18",
          "more": "+ Plus"
        },
        "result_title": "Prêt KfW pour startups",
        "result_desc": "Financement à faible taux d'intérêt pour les entrepreneurs..."
      },
      "projects": {
        "badge": "📊 Projets",
        "title": "Gardez une trace de chaque plan."
      },
      "share": {
        "badge": "👥 Partager",
        "title": "Accédez à vos plans de n'importe où et par n'importe qui.",
        "button": "Partager maintenant →"
      }
    },
    "features": {
      "title": "Tout ce dont vous avez besoin pour votre startup",
      "subtitle": "Une plateforme unique pour toutes les étapes de votre parcours entrepreneurial",
      "ai_advisor": {
        "title": "Conseiller IA en entrepreneuriat",
        "description": "Obtenez des conseils personnalisés 24h/24. Notre conseiller IA vous aide avec toutes les questions sur la création d'entreprise."
      },
      "business_plan": {
        "title": "Business Plan Intelligent",
        "description": "Créez des business plans bancables avec l'aide de l'IA. Analyse de marché automatique et planification financière incluses."
      },
      "funding": {
        "title": "Trouveur de financement",
        "description": "Trouvez le bon financement pour votre startup. Recherche automatique et aide aux demandes."
      },
      "business_in_a_box": {
        "title": "Business-in-a-Box",
        "description": "Modèles complets pour différents modèles d'affaires. De l'idée à la mise en œuvre."
      },
      "ai_coach": {
        "title": "Coach IA Business",
        "description": "Votre coach business personnel vous guide à travers toutes les phases de création d'entreprise."
      },
      "legal_companion": {
        "title": "Compagnon juridique",
        "description": "Aide pour toutes les questions juridiques autour de votre startup. Contrats, formes juridiques et plus."
      },
      "market_analysis": {
        "title": "Outil d'analyse de marché",
        "description": "Comprenez votre marché avec une analyse assistée par IA. Groupes cibles, concurrence et tendances."
      },
      "financial_planning": {
        "title": "Planification financière",
        "description": "Planification financière professionnelle avec calculs automatiques et prévisions.",
        "ai_title": "Planification financière assistée par IA",
        "ai_description": "Des algorithmes intelligents vous aident à créer des prévisions financières réalistes et des plans de liquidité."
      },
      "team_management": {
        "title": "Gestion d'équipe",
        "description": "Gérez votre équipe fondatrice et travaillez ensemble sur vos projets."
      }
    },
    "security": {
      "gdpr": "Traitement des données conforme au RGPD",
      "ssl": "Transmission cryptée SSL",
      "german_servers": "Centres de données allemands"
    },
    "project_status": {
      "finished": "✅ Terminé",
      "completed": "Terminé",
      "api_release": "Version API v2.0"
    },
    "customer_stories": {
      "title": "Histoires de succès de nos entrepreneurs",
      "subtitle": "Plus de 500 entrepreneurs ont déjà lancé avec succès avec l'AI Concept Builder",
      "read_more": "Lire l'histoire complète",
      "stats": {
        "leading_companies": "Entreprises leader utilisent AI Concept Builder (G2)",
        "top_rated": "#1 Outil IA le mieux noté pour entrepreneurs (G2)",
        "yc_companies": "Plus de 50% des entreprises YC",
        "community_members": "1.4M+ Membres de la communauté"
      },
      "story_1": {
        "quote": "Grâce à l'AI Concept Builder, j'ai pu terminer mon business plan en seulement 3 jours. La banque était ravie !",
        "author": "Sarah M.",
        "company": "Tech Startup"
      },
      "story_2": {
        "quote": "Le trouveur de financement m'a aidé à obtenir 50 000 € de capital de démarrage. Incroyable !",
        "author": "Michael K.",
        "company": "E-Commerce"
      },
      "story_3": {
        "quote": "Le conseil IA était comme avoir un mentor personnel. Toujours disponible et super compétent.",
        "author": "Lisa R.",
        "company": "Agence de conseil"
      },
      "testimonial_1": {
        "quote": "Workflows optimisés pour réduire les délais de 3x.",
        "company": "TechCraft"
      },
      "testimonial_2": {
        "quote": "Avec AI Concept Builder, chaque personne chez Ramp a un assistant IA.",
        "company": "ramp"
      },
      "testimonial_3": {
        "quote": "AI Concept Builder comprend que tu peux résoudre de nombreux problèmes avec un seul outil.",
        "company": "Vercel"
      },
      "testimonial_4": {
        "quote": "AI Concept Builder était la façon la plus puissante et efficace d'optimiser notre workflow.",
        "company": "MatchGroup"
      },
      "testimonial_5": {
        "quote": "Quelqu'un pourrait rejoindre Deel et s'intégrer sans aucune intégration.",
        "company": "deel"
      },
      "testimonial_6": {
        "quote": "De six apps à une : mise à l'échelle plus rapide avec toutes les équipes sur AI Concept Builder.",
        "company": "planful"
      }
    },
    "onboarding": {
      "title": "Commencez votre parcours entrepreneurial maintenant",
      "subtitle": "Parlez-nous de votre idée d'entreprise et nous créerons un plan personnalisé pour vous.",
      "steps": {
        "1": {
          "title": "Remplir le formulaire",
          "desc": "Partagez votre idée avec nous"
        },
        "2": {
          "title": "Email d'intégration",
          "desc": "Capture détaillée de vos plans"
        },
        "3": {
          "title": "Analyse IA",
          "desc": "Évaluation initiale gratuite"
        },
        "4": {
          "title": "Appel de consultation",
          "desc": "Offre individuelle"
        }
      },
      "form": {
        "name": "Nom",
        "name_placeholder": "Jean Dupont",
        "email": "Email",
        "email_placeholder": "jean@exemple.fr",
        "phone": "Téléphone",
        "phone_placeholder": "+33 1 23 45 67 89",
        "country": "Pays",
        "country_placeholder": "Veuillez sélectionner...",
        "business_idea": "Idée d'entreprise",
        "business_idea_placeholder": "Décrivez brièvement votre idée d'entreprise...",
        "phase": "Phase de démarrage",
        "phase_placeholder": "Veuillez sélectionner...",
        "phase_idea": "Phase d'idée",
        "phase_concept": "Phase de concept",
        "phase_founding": "Phase de création",
        "phase_growth": "Phase de croissance",
        "submit": "Demander une consultation gratuite →"
      },
      "benefits": {
        "title": "🎁 Ce que vous recevrez :",
        "form": "Formulaire d'intégration détaillé par e-mail",
        "analysis": "✓ Analyse initiale gratuite de votre idée d'entreprise",
        "advisor": "✓ Conseiller IA personnel pendant 7 jours",
        "funding": "✓ Recherche initiale de financement",
        "plan": "✓ Feuille de route individuelle pour votre startup"
      }
    },
    "software": {
      "title": "Votre plateforme de démarrage",
      "subtitle": "Tout ce dont vous avez besoin pour lancer votre startup avec succès",
      "preview_title": "Aperçu du logiciel",
      "preview_subtitle": "Voyez comment notre plateforme fonctionne",
      "features": {
        "dashboard": "Tableau de bord clair",
        "ai_chat": "Intégration chat IA",
        "templates": "Modèles professionnels",
        "collaboration": "Collaboration d'équipe",
        "beta_available": "Disponible en bêta",
        "interactive_editor": "Éditeur interactif avec modèles et support IA pour des business plans professionnels.",
        "financial_planning": "Création automatique de comptes de résultat, plans de trésorerie et prévisions de rentabilité."
      },
      "all_tools": {
        "title": "Tous les outils pour votre succès",
        "subtitle": "Notre logiciel vous fournit tout ce dont vous avez besoin pour créer une startup avec succès."
      },
      "tracking": {
        "title": "Suivi de création d'entreprise",
        "pre_founding": "▼ Pré-création"
      },
      "tracker": {
        "checklist": "Liste de vérification",
        "timeline": "Chronologie"
      },
      "checklist": {
        "idea_validated": "Idée d'entreprise validée",
        "market_analyzed": "Analyse de marché effectuée",
        "businessplan_created": "Business plan créé"
      },
      "notifications": {
        "funding_bank": "Bienvenue à la banque de financement",
        "ihk_munich": "CCI Munich",
        "consultation_appointment": "Rendez-vous de consultation d'entreprise"
      },
      "business_model": "Modèle d'affaires / Vision / Mission",
      "roadmap": {
        "title": "Feuille de route publique",
        "beta_release": "Version bêta",
        "final_version": "Version finale",
        "status": "Statut",
        "updates": "Mises à jour",
        "q1_2025": "T1 2025",
        "q2_2025": "T2 2025",
        "progress_65": "Progrès : 65%",
        "status": {
          "planned": "🔵 Planifié",
          "in_progress": "🟡 En cours",
          "completed": "✅ Terminé"
        },
        "features": {
          "drag_drop_ui": "Améliorations UI glisser-déposer",
          "ai_bmc": "Génération BMC basée sur l'IA",
          "two_factor": "Authentification à deux facteurs"
        }
      },
      "analytics": {
        "business_plans": "Business Plans",
        "funding_applications": "Demandes de financement"
      },
      "knowledge": {
        "title": "Vos connaissances de startup stockées centralement",
        "funding_guidelines": "Directives de financement 2025"
      },
      "templates": {
        "available": "15 modèles disponibles"
      },
      "contracts": {
        "title": "Créer des contrats juridiquement conformes",
        "employment": "Contrats de travail"
      },
      "investors": {
        "title": "Convaincre les investisseurs avec des documents professionnels"
      },
      "ai_recommendation": {
        "exist_grant": "Basé sur votre idée d'entreprise, je recommande la bourse EXIST. Vos chances sont bonnes parce que..."
      },
      "funding": {
        "apply_button": "Demander un financement"
      }
    },
    "software": {
      "all_tools": {
        "discover_all": "Découvrir toutes les fonctionnalités →"
      }
    },
    "roadmap": {
      "status": "Statut",
      "updates": "Mises à jour",
      "q1_2025": "T1 2025",
      "q2_2025": "T2 2025",
      "progress_65": "Progrès : 65%",
      "status": {
        "planned": "🔵 Planifié",
        "in_progress": "🟡 En cours",
        "completed": "✅ Terminé"
      },
      "features": {
        "drag_drop_ui": "Améliorations UI glisser-déposer",
        "ai_bmc": "Génération BMC basée sur l'IA",
        "two_factor": "Authentification à deux facteurs"
      }
    },
    "features": {
      "title": "Tout ce dont vous avez besoin pour votre entreprise",
      "subtitle": "Une plateforme unique pour toutes les étapes de votre parcours entrepreneurial",
      "ai_advisor": {
        "title": "Conseiller IA en entrepreneuriat",
        "description": "Obtenez des conseils personnalisés 24h/24. Notre conseiller IA vous aide avec toutes les questions sur la création d'entreprise."
      },
      "business_plan": {
        "title": "Business Plan Intelligent",
        "description": "Créez des business plans bancables avec l'aide de l'IA. Analyse de marché automatique et planification financière incluses.",
        "professional_description": "Créez des business plans professionnels qui convainquent les banques et investisseurs - en heures au lieu de semaines."
      },
      "funding": {
        "title": "Trouveur de financement",
        "description": "Trouvez le bon financement pour votre startup. Recherche automatique et aide aux demandes.",
        "automatic_matching": "Trouvez automatiquement des programmes de financement et subventions correspondants pour votre startup parmi plus de 2 000 programmes.",
        "ai_matching": "Correspondance basée sur l'IA avec plus de 2 000 programmes de financement à l'échelle nationale."
      },
      "business_in_a_box": {
        "title": "Business-in-a-Box",
        "description": "Modèles complets pour différents modèles d'affaires. De l'idée à la mise en œuvre."
      },
      "ai_coach": {
        "title": "Coach IA Business",
        "description": "Votre coach business personnel vous guide à travers toutes les phases de création d'entreprise.",
        "personal_advisor": "Votre conseiller personnel en entrepreneuriat"
      },
      "legal_companion": {
        "title": "Compagnon juridique",
        "description": "Aide pour toutes les questions juridiques autour de votre startup. Contrats, formes juridiques et plus."
      },
      "market_analysis": {
        "title": "Outil d'analyse de marché",
        "description": "Comprenez votre marché avec une analyse assistée par IA. Groupes cibles, concurrence et tendances."
      },
      "financial_planning": {
        "title": "Planification financière",
        "description": "Planification financière professionnelle avec calculs automatiques et prévisions.",
        "ai_title": "Planification financière assistée par IA",
        "ai_description": "Des algorithmes intelligents vous aident à créer des prévisions financières réalistes et des plans de liquidité."
      },
      "team_management": {
        "title": "Gestion d'équipe",
        "description": "Gérez votre équipe fondatrice et travaillez ensemble sur vos projets."
      },
      "personal_support": {
        "description": "Si nécessaire, vous obtenez un soutien personnel de consultants expérimentés - numérique ou sur site."
      },
      "contracts": {
        "automatic_creation": "Création automatique de contrats et documents d'affaires."
      },
      "advisor": {
        "24_7": "Conseiller en entrepreneuriat disponible 24h/24 pour toutes vos questions."
      },
      "collaboration": {
        "description": "Travaillez ensemble avec des co-fondateurs et conseillers."
      },
      "email": {
        "intelligent": "E-mail intelligent",
        "title": "La boîte de réception qui pense avec vous.",
        "important": "⭐ Important",
        "filtering": "Filtrage",
        "tax_number": "Numéro fiscal attribué"
      },
      "analytics": {
        "title": "Vos chiffres en un coup d'œil",
        "this_month": "Ce mois-ci",
        "growth": "↑ 23%"
      },
      "business_hub": {
        "badge": "Business-in-a-box",
        "company_hq": "Siège social",
        "general": "Général",
        "values": "Valeurs",
        "employee_directory": "Répertoire des employés"
      },
      "invoice": {
        "badge": "Générateur de factures",
        "title": "Factures professionnelles en secondes",
        "invoice_number": "Facture #2025-001",
        "paid": "Payé",
        "consulting_service": "Service de conseil",
        "vat": "TVA (19%)"
      }
    },
    "beta": {
      "title": "Devenir testeur bêta",
      "subtitle": "Soyez parmi les premiers à accéder à notre plateforme révolutionnaire de création d'entreprise.",
      "benefits": {
        "early_access": "Accès anticipé aux nouvelles fonctionnalités",
        "free_period": "3 mois gratuits",
        "priority_support": "Support prioritaire",
        "community": "Communauté bêta exclusive"
      },
      "form": {
        "email": "Adresse e-mail",
        "email_placeholder": "votre@email.com",
        "name": "Nom",
        "name_placeholder": "Votre nom",
        "company": "Entreprise",
        "company_placeholder": "Votre entreprise (optionnel)",
        "submit": "Demander l'accès bêta →"
      }
    },
    "faq": {
      "title": "Questions fréquemment posées",
      "items": {
        "q1": {
          "question": "Qu'est-ce que l'AI Concept Builder ?",
          "answer": "L'AI Concept Builder est une plateforme tout-en-un pour entrepreneurs qui combine conseil assisté par IA, création de business plan, recherche de financement et gestion d'équipe en un seul outil."
        },
        "q2": {
          "question": "Comment fonctionne le conseil IA ?",
          "answer": "Notre IA a été spécialement formée pour le conseil en création d'entreprise et peut vous aider avec toutes les questions sur la création d'entreprise - de l'idée d'entreprise au financement."
        },
        "q3": {
          "question": "Le service est-il gratuit ?",
          "answer": "Nous offrons une analyse initiale gratuite et différents plans tarifaires pour les fonctionnalités avancées. Les testeurs bêta obtiennent 3 mois d'accès gratuit."
        },
        "q4": {
          "question": "Pour qui la plateforme est-elle adaptée ?",
          "answer": "Notre plateforme convient à tous les entrepreneurs - des fondateurs débutants aux entrepreneurs en série. Peu importe à quelle étape de votre parcours entrepreneurial vous vous trouvez."
        },
        "q5": {
          "question": "Mes données sont-elles sécurisées ?",
          "answer": "La protection des données et la sécurité sont notre priorité absolue. Toutes les données sont transmises cryptées et stockées dans des centres de données allemands."
        }
      }
    },
    "about": {
      "title": "À propos du fondateur",
      "subtitle": "Marcel Gärtner - Consultant en affaires et développeur logiciel",
      "description": "Avec plus de 10 ans d'expérience en développement logiciel et conseil en affaires, j'aide les entrepreneurs ambitieux à transformer leurs visions en entreprises prospères.",
      "experience": {
        "title": "Expérience",
        "items": {
          "software": "10+ ans de développement logiciel",
          "consulting": "5+ ans de conseil en affaires",
          "startups": "20+ startups accompagnées avec succès",
          "funding": "2+ millions d'euros de financement facilité"
        }
      },
      "mission": {
        "title": "Mission",
        "text": "Ma mission est de donner à chaque entrepreneur les outils et connaissances nécessaires pour réussir. L'AI Concept Builder est le résultat de cette vision."
      }
    },
    "footer": {
      "newsletter": {
        "title": "Restez informé",
        "description": "Recevez les dernières mises à jour, conseils et histoires de succès directement dans votre boîte de réception.",
        "email_placeholder": "Votre adresse e-mail",
        "submit": "S'abonner à la newsletter",
        "disclaimer": "Gratuit • Annuler à tout moment • Conforme RGPD"
      },
      "company": {
        "title": "AI Concept Builder",
        "description": "L'espace de travail tout-en-un pour entrepreneurs prospères. De l'idée au financement."
      },
      "product": {
        "title": "Produit",
        "features": "Fonctionnalités",
        "beta_access": "Accès bêta",
        "pricing": "Tarifs"
      },
      "resources": {
        "title": "Ressources",
        "faq": "FAQ",
        "about": "À propos",
        "contact": "Contact"
      },
      "legal": {
        "title": "Juridique",
        "imprint": "Mentions légales",
        "privacy": "Confidentialité",
        "terms": "Conditions"
      },
      "copyright": "© 2024 AI Concept Builder. Tous droits réservés."
    },
    "calendar": {
      "monday": "Lun",
      "tuesday": "Mar",
      "wednesday": "Mer",
      "thursday": "Jeu",
      "friday": "Ven",
      "saturday": "Sam",
      "sunday": "Dim"
    },
    "common": {
      "email": "Email",
      "phone": "Téléphone",
      "new": "Nouveau",
      "premium": "Premium"
    }
  },
  es: {
    "meta": {
      "title": "Crear. Financiar. Lanzar. | AI Concept Builder",
      "description": "El espacio de trabajo todo-en-uno para emprendedores. Crea planes de negocio bancables, encuentra financiación y obtén consultoría con IA – todo en una herramienta.",
      "keywords": "consultoría empresarial, plan de negocio, IA, financiación, startup, emprendedor, financiamiento, creación de empresas"
    },
    "navigation": {
      "beratung": "Consultoría",
      "software": "Software",
      "beta": "Beta",
      "uber_mich": "Sobre mí",
      "beta_testen": "Probar Beta",
      "beratung_starten": "Comenzar consultoría →"
    },
    "hero": {
      "title": "Crear. <span class=\"text-primary\">Financiar.</span> Lanzar.",
      "subtitle": "El espacio de trabajo todo-en-uno para emprendedores. Crea planes de negocio bancables, encuentra financiación y obtén consultoría con IA – todo en una herramienta.",
      "cta_primary": "Comenzar consultoría empresarial →",
      "cta_secondary": "Descubrir software",
      "icon_placeholder": "Marcador de posición de icono"
    },
    "partners": {
      "title": "Confiado por empresas líderes"
    },
    "cards": {
      "meeting_notes": {
        "badge": "Notas de reunión IA",
        "new": "Nuevo",
        "title": "Notas perfectas para cada reunión.",
        "demo_title": "Consultoría empresarial @Hoy",
        "demo_time": "@Hoy 15:45",
        "demo_content": "Bienvenido a la consultoría empresarial. Hoy discutiremos tu idea de negocio, analizaremos las oportunidades de financiación y crearemos una hoja de ruta para los próximos pasos..."
      },
      "search": {
        "badge": "Búsqueda inteligente",
        "new": "Nuevo",
        "title": "Una búsqueda para todos los documentos.",
        "placeholder": "Programas de financiación para startups",
        "tags": {
          "businessplan": "📄 Plan de Negocio 52",
          "funding": "💰 Financiación 36",
          "finance": "📊 Plan Financiero 18",
          "more": "+ Más"
        },
        "result_title": "Préstamo KfW para Startups",
        "result_desc": "Financiación a bajo interés para emprendedores..."
      },
      "projects": {
        "badge": "📊 Proyectos",
        "title": "Mantén el control de cada plan."
      },
      "share": {
        "badge": "👥 Compartir",
        "title": "Accede a tus planes desde cualquier lugar y por cualquier persona.",
        "button": "Compartir ahora →"
      }
    },
    "common": {
      "email": "Correo",
      "phone": "Teléfono",
      "new": "Nuevo"
    }
  },
  it: {
    "meta": {
      "title": "Creare. Finanziare. Lanciare. | AI Concept Builder",
      "description": "Lo spazio di lavoro tutto-in-uno per imprenditori. Crea business plan bancabili, trova finanziamenti e ottieni consulenza IA – tutto in uno strumento.",
      "keywords": "consulenza aziendale, business plan, IA, finanziamenti, startup, imprenditore, finanziamento, creazione d'impresa"
    },
    "navigation": {
      "beratung": "Consulenza",
      "software": "Software",
      "beta": "Beta",
      "uber_mich": "Chi sono",
      "beta_testen": "Prova Beta",
      "beratung_starten": "Inizia consulenza →"
    },
    "hero": {
      "title": "Creare. <span class=\"text-primary\">Finanziare.</span> Lanciare.",
      "subtitle": "Lo spazio di lavoro tutto-in-uno per imprenditori. Crea business plan bancabili, trova finanziamenti e ottieni consulenza IA – tutto in uno strumento.",
      "cta_primary": "Inizia consulenza aziendale →",
      "cta_secondary": "Scopri il software",
      "icon_placeholder": "Segnaposto icona"
    },
    "partners": {
      "title": "Scelto da aziende leader"
    },
    "cards": {
      "meeting_notes": {
        "badge": "Note riunioni IA",
        "new": "Nuovo",
        "title": "Note perfette per ogni riunione.",
        "demo_title": "Consulenza aziendale @Oggi",
        "demo_time": "@Oggi 15:45",
        "demo_content": "Benvenuto alla consulenza aziendale. Oggi discuteremo la tua idea di business, analizzeremo le opportunità di finanziamento e creeremo una roadmap per i prossimi passi..."
      },
      "search": {
        "badge": "Ricerca intelligente",
        "new": "Nuovo",
        "title": "Una ricerca per tutti i documenti.",
        "placeholder": "Programmi di finanziamento per startup",
        "tags": {
          "businessplan": "📄 Business Plan 52",
          "funding": "💰 Finanziamento 36",
          "finance": "📊 Piano Finanziario 18",
          "more": "+ Altro"
        },
        "result_title": "Prestito KfW per Startup",
        "result_desc": "Finanziamento a basso interesse per imprenditori..."
      },
      "projects": {
        "badge": "📊 Progetti",
        "title": "Tieni traccia di ogni piano."
      },
      "share": {
        "badge": "👥 Condividi",
        "title": "Accedi ai tuoi piani da ovunque e da chiunque.",
        "button": "Condividi ora →"
      }
    },
    "common": {
      "email": "Email",
      "phone": "Telefono",
      "new": "Nuovo"
    }
  }
};

class I18nManager {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = translations;
        this.supportedLanguages = ['de', 'en', 'fr', 'es', 'it'];
        this.defaultLanguage = 'de';
        
        // Initialize
        this.init();
    }

    init() {
        // Get language from localStorage or browser
        this.currentLanguage = this.getInitialLanguage();
        
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

    changeLanguage(newLanguage) {
        if (!this.supportedLanguages.includes(newLanguage)) {
            console.error(`Language ${newLanguage} is not supported`);
            return;
        }

        this.currentLanguage = newLanguage;
        
        // Save to localStorage
        localStorage.setItem('selectedLanguage', newLanguage);
        
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
            const translation = this.getText(key, element.textContent);
            
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
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && translation.meta.description) {
            metaDescription.setAttribute('content', translation.meta.description);
        }

        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords && translation.meta.keywords) {
            metaKeywords.setAttribute('content', translation.meta.keywords);
        }

        // Update Open Graph meta tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && translation.meta.title) {
            ogTitle.setAttribute('content', translation.meta.title);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription && translation.meta.description) {
            ogDescription.setAttribute('content', translation.meta.description);
        }

        // Update Twitter Card meta tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle && translation.meta.title) {
            twitterTitle.setAttribute('content', translation.meta.title);
        }

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
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