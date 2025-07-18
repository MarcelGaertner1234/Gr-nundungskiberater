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
        "description": "Erhalte personalisierte Beratung rund um die Uhr. Unser KI-Berater hilft dir bei allen Fragen zur Existenzgründung.",
        "assistant_title": "KI Assistent"
      },
      "business_plan": {
        "title": "Intelligenter Businessplan",
        "description": "Erstelle bankfähige Businesspläne mit KI-Unterstützung. Automatische Marktanalyse und Finanzplanung inklusive.",
        "professional_description": "Erstelle professionelle Businesspläne, die Banken und Investoren überzeugen - in wenigen Stunden statt Wochen.",
        "editor_title": "Businessplan Editor"
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
        "ai_description": "Intelligente Algorithmen helfen dir bei der Erstellung realistischer Finanzprognosen und Liquiditätspläne.",
        "tool_title": "Finanzplan Tool"
      },
      "team_management": {
        "title": "Team-Verwaltung",
        "description": "Verwalte dein Gründungsteam und arbeite gemeinsam an euren Projekten.",
        "collaboration_title": "Team Collaboration"
      },
      "personal_support": {
        "description": "Bei Bedarf erhältst du persönliche Unterstützung von erfahrenen Gründungsberatern - digital oder vor Ort."
      },
      "contracts": {
        "automatic_creation": "Automatische Erstellung von Verträgen und Geschäftsdokumenten.",
        "generator_title": "Dokument Generator"
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
      "title": "Sicherheit & Datenschutz",
      "gdpr": "DSGVO-konforme Datenverarbeitung",
      "ssl": "SSL-verschlüsselte Übertragung",
      "german_servers": "Deutsche Server & Rechenzentren",
      "no_third_party": "Keine Weitergabe an Dritte"
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
        "yc_companies": "Über 50% der YC Unternehmen",
        "community_members": "1.4M+ Community Mitglieder"
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
      },
      "testimonial_1": {
        "quote": "Optimierte Workflows um Timelines um 3x zu reduzieren."
      },
      "testimonial_2": {
        "quote": "Mit KI Konzept Builder hat jede Person bei Ramp einen KI-Assistenten."
      },
      "testimonial_3": {
        "quote": "KI Konzept Builder versteht, dass du viele Probleme mit einem Tool lösen kannst."
      },
      "testimonial_4": {
        "quote": "KI Konzept Builder war der mächtigste und wirkungsvollste Weg, unseren Workflow zu optimieren."
      },
      "testimonial_5": {
        "quote": "Jemand könnte Deel beitreten und sich ohne jegliches Onboarding einarbeiten."
      },
      "testimonial_6": {
        "quote": "Von sechs Apps zu einer: Skalierung schneller mit allen Teams auf KI Konzept Builder."
      }
    },
    "readiness_check": {
      "title": "Dein persönlicher Gründer-Readiness-Check",
      "subtitle": "Beantworte 5 gezielte Fragen und erhalte eine fundierte Einschätzung deiner Gründungsreife plus einen maßgeschneiderten Aktionsplan.",
      "question_1_of_5": "Frage 1 von 5",
      "question_2_of_5": "Frage 2 von 5",
      "question_3_of_5": "Frage 3 von 5",
      "question_4_of_5": "Frage 4 von 5",
      "question_5_of_5": "Frage 5 von 5",
      "progress_text": "Fortschritt: {{current}} von 5 Fragen",
      "estimated_time": "Geschätzte Zeit: noch {{seconds}} Sekunden",
      "q1": {
        "title": "Wie klar ist dein Geschäftsmodell definiert?",
        "option1_title": "Kristallklar",
        "option1_desc": "Ich weiß genau, was ich verkaufe, an wen und wie ich Geld verdiene",
        "option2_title": "Grobe Richtung",
        "option2_desc": "Die Idee steht, aber Details müssen noch ausgearbeitet werden",
        "option3_title": "Noch vage",
        "option3_desc": "Ich habe eine Idee, bin aber noch am Anfang der Entwicklung"
      },
      "q2": {
        "title": "Hast du deine Geschäftsidee bereits validiert?",
        "option1_title": "Ja, mit echten Kunden",
        "option1_desc": "Ich habe bereits mit potenziellen Kunden gesprochen oder erste Verkäufe",
        "option2_title": "Marktrecherche gemacht",
        "option2_desc": "Ich habe Umfragen durchgeführt und Marktdaten analysiert",
        "option3_title": "Noch keine Validierung",
        "option3_desc": "Ich stütze mich auf meine Einschätzung und Erfahrung"
      },
      "q3": {
        "title": "Wie steht es um deine Finanzierung?",
        "option1_title": "Gesichert",
        "option1_desc": "Eigenkapital vorhanden oder Investoren/Kredite zugesagt",
        "option2_title": "Teilweise geklärt",
        "option2_desc": "Grundfinanzierung steht, aber weitere Mittel werden benötigt",
        "option3_title": "In Planung",
        "option3_desc": "Ich recherchiere noch Fördermittel und Finanzierungsoptionen",
        "option4_title": "Noch offen",
        "option4_desc": "Die Finanzierung ist noch komplett ungeklärt"
      },
      "q4": {
        "title": "Welche unternehmerischen Kompetenzen bringst du mit?",
        "option1_title": "Erfahrener Unternehmer",
        "option1_desc": "Ich habe bereits erfolgreich gegründet oder Führungserfahrung",
        "option2_title": "Relevante Berufserfahrung",
        "option2_desc": "Ich kenne die Branche gut und habe fachliche Expertise",
        "option3_title": "Quereinsteiger mit Potenzial",
        "option3_desc": "Ich bin motiviert und lernbereit, aber noch ohne direkte Erfahrung"
      },
      "q5": {
        "title": "Wann planst du die konkrete Umsetzung?",
        "option1_title": "Sofort",
        "option1_desc": "Ich bin bereit und will innerhalb der nächsten 4 Wochen starten",
        "option2_title": "In 1-3 Monaten",
        "option2_desc": "Ich bereite mich vor und plane den Start in naher Zukunft",
        "option3_title": "In 3-6 Monaten",
        "option3_desc": "Ich brauche noch Zeit für Vorbereitung und Planung",
        "option4_title": "Später als 6 Monate",
        "option4_desc": "Es ist noch ein längerfristiges Projekt"
      },
      "results": {
        "points": "Punkte",
        "title_ready": "Du bist bereit durchzustarten!",
        "title_good": "Du bist auf einem guten Weg!",
        "title_potential": "Du hast großes Potenzial!",
        "title_early": "Du stehst noch am Anfang",
        "level_high": "Hohe Gründungsreife",
        "level_medium": "Mittlere Gründungsreife",
        "level_low": "Entwicklungspotenzial",
        "analysis_title": "Deine Analyse im Detail:",
        "next_steps_title": "Deine nächsten Schritte:",
        "get_action_plan": "Kostenlosen Aktionsplan erhalten →",
        "download_pdf": "Ergebnis als PDF",
        "restart_test": "Test wiederholen",
        "analysis": {
          "business_model": {
            "strong": "Dein Geschäftsmodell ist sehr gut durchdacht. Das ist eine starke Basis!",
            "medium": "Dein Geschäftsmodell hat eine klare Richtung, aber einige Details fehlen noch.",
            "weak": "Dein Geschäftsmodell braucht noch mehr Klarheit und Struktur."
          },
          "validation": {
            "strong": "Exzellent! Du hast bereits Marktfeedback – das reduziert dein Risiko erheblich.",
            "medium": "Gut! Marktrecherche ist ein wichtiger erster Schritt.",
            "weak": "Eine Marktvalidierung würde dir mehr Sicherheit geben."
          },
          "financing": {
            "strong": "Perfekt! Mit gesicherter Finanzierung kannst du dich voll auf die Umsetzung konzentrieren.",
            "partial": "Solide Basis! Mit teilweiser Finanzierung hast du einen guten Start.",
            "planning": "Du bist auf dem richtigen Weg. Die Finanzierungsplanung ist wichtig.",
            "weak": "Die Finanzierung sollte eine deiner Prioritäten werden."
          },
          "experience": {
            "strong": "Deine Erfahrung ist ein großer Vorteil für den Erfolg!",
            "medium": "Deine Branchenkenntnisse sind wertvoll für dein Vorhaben.",
            "weak": "Als Quereinsteiger bringst du frische Perspektiven mit."
          },
          "timeline": {
            "immediate": "Deine Entschlossenheit ist beeindruckend!",
            "soon": "Ein realistischer Zeitplan zeigt gute Vorbereitung.",
            "later": "Nimm dir die Zeit, die du brauchst für eine solide Grundlage."
          }
        },
        "recommendations": {
          "high": [
            "Erstelle jetzt deinen detaillierten Businessplan mit unserem KI-Tool",
            "Sichere dir Fördermittel mit unserem automatischen Matching",
            "Starte mit der Rechtsformwahl und Gründungsformalitäten",
            "Nutze unsere Pitch-Deck-Vorlagen für Investorengespräche"
          ],
          "medium": [
            "Verfeinere dein Geschäftsmodell mit unserem Business Model Canvas",
            "Führe eine professionelle Marktanalyse durch",
            "Erstelle realistische Finanzprognosen",
            "Vernetze dich mit anderen Gründern in unserer Community"
          ],
          "low": [
            "Nutze unseren KI-Berater für die Ideenfindung",
            "Erkunde verschiedene Geschäftsmodelle in unserer Bibliothek",
            "Nimm an unserem Gründer-Grundkurs teil",
            "Lass dich persönlich beraten für einen klaren Fahrplan"
          ]
        },
        "download": {
          "title": "GRÜNDER-READINESS-CHECK ERGEBNIS",
          "total_score": "Gesamtpunktzahl",
          "readiness_level": "Gründungsreife",
          "your_analysis": "Deine Analyse",
          "next_steps": "Deine nächsten Schritte",
          "created_on": "Erstellt am",
          "footer_text": "KI Konzept Builder - Dein Partner für erfolgreiche Gründung"
        }
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
        "submit": "Kostenlose Beratung anfordern →",
        "country_germany": "Deutschland",
        "country_austria": "Österreich",
        "country_switzerland": "Schweiz",
        "country_liechtenstein": "Liechtenstein",
        "country_luxembourg": "Luxemburg",
        "country_france": "Frankreich",
        "country_italy": "Italien",
        "country_spain": "Spanien",
        "country_netherlands": "Niederlande",
        "country_belgium": "Belgien",
        "country_poland": "Polen",
        "country_czech": "Tschechien",
        "country_uk": "Vereinigtes Königreich",
        "country_usa": "USA",
        "country_other": "Anderes Land",
        "no_credit_card": "Keine Kreditkarte erforderlich • 100% kostenlos & unverbindlich"
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
        "subtitle": "Unsere Software bietet dir alles, was du für eine erfolgreiche Gründung brauchst.",
        "discover_all": "Alle Features entdecken →"
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
      "spots_counter": "43 von 50 Plätzen verfügbar",
      "limited_offer": "⚡ Limitiertes Angebot",
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
        "consultation": "Erstberatung",
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
      "premium": "Premium",
      "in_development": "In Entwicklung"
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
    },
    "story_modal": {
      "subtitle": "KI-gestütztes Marketing-Startup",
      "main_quote": "Es gibt Power in einer einzigen Plattform, die dir Zeit spart, Ressourcen schont und trotzdem Ergebnisse liefert, die deine Investoren beeindrucken.",
      "challenge_title": "Die Herausforderung",
      "challenge_content": "StartupBoost stand vor der typischen Herausforderung vieler Tech-Startups: Eine innovative Idee, aber keine klare Struktur für die Umsetzung. Das Team brauchte einen überzeugenden Businessplan für Investoren, musste die richtigen Fördermittel finden und gleichzeitig das operative Geschäft aufbauen.",
      "solution_title": "Die Lösung mit KI Konzept Builder",
      "solution_item_1": "Businessplan in 5 Tagen statt 5 Wochen erstellt",
      "solution_item_2": "150.000€ Fördermittel durch intelligentes Matching gefunden",
      "solution_item_3": "Investor-Pitch perfektioniert mit KI-Unterstützung",
      "solution_item_4": "Marktanalyse automatisiert und validiert",
      "results_title": "Die Ergebnisse",
      "revenue_label": "Umsatz nach 12 Monaten",
      "funding_label": "Gesamtfinanzierung",
      "team_label": "Team gewachsen auf",
      "testimonial_quote": "Der KI Konzept Builder war der Game-Changer für uns. Wir konnten uns auf unser Produkt konzentrieren, während die Plattform uns bei allem Organisatorischen unterstützt hat. Die Zeitersparnis war unbezahlbar.",
      "testimonial_author": "Lisa Chen, CEO StartupBoost",
      "cta_text": "Starte auch du deine Erfolgsgeschichte mit dem KI Konzept Builder."
    },
    "techcraft_modal": {
      "subtitle": "Software-Entwicklung & Consulting",
      "main_quote": "Der KI Konzept Builder hat unsere Workflows revolutioniert. Wir konnten unsere Projektzeiten um 70% reduzieren und gleichzeitig die Qualität steigern.",
      "challenge_title": "Die Herausforderung",
      "challenge_content": "TechCraft stand vor der Herausforderung, ihre Entwicklungsprozesse zu skalieren und gleichzeitig die hohe Qualität beizubehalten. Mit einem wachsenden Team und komplexeren Projekten wurde die Koordination zunehmend schwieriger.",
      "solution_title": "Die Lösung mit KI Konzept Builder",
      "solution_item_1": "Automatisierte Projektplanung und Ressourcenallokation",
      "solution_item_2": "KI-gestützte Code-Reviews und Qualitätssicherung",
      "solution_item_3": "Integrierte Dokumentation und Wissensmanagement",
      "solution_item_4": "Echtzeit-Kollaboration für Remote-Teams",
      "results_title": "Die Ergebnisse",
      "productivity_label": "Produktivitätssteigerung",
      "quality_label": "Weniger Bugs",
      "revenue_label": "Jahresumsatz",
      "testimonial_quote": "Die Implementierung des KI Konzept Builders war ein Wendepunkt für unser Unternehmen. Wir können nun Projekte übernehmen, die vorher unmöglich gewesen wären.",
      "testimonial_author": "- Marcus Weber, CTO TechCraft"
    },
    "ramp_modal": {
      "subtitle": "Finanzautomatisierung für Unternehmen",
      "main_quote": "Mit KI Konzept Builder hat jede Person bei Ramp einen persönlichen KI-Assistenten, der ihre Arbeit transformiert.",
      "challenge_title": "Die Herausforderung",
      "challenge_content": "Als schnell wachsendes FinTech-Unternehmen musste Ramp seine internen Prozesse ständig optimieren, während gleichzeitig neue Features für Kunden entwickelt wurden. Die Balance zwischen Innovation und operativer Exzellenz war kritisch.",
      "solution_title": "Die Lösung mit KI Konzept Builder",
      "solution_item_1": "Automatisierte Finanzanalysen und Reporting",
      "solution_item_2": "KI-gestützte Kundenbetreuung und Support",
      "solution_item_3": "Intelligente Prozessoptimierung",
      "solution_item_4": "Personalisierte Mitarbeiter-Dashboards",
      "results_title": "Die Ergebnisse",
      "employees_label": "Mitarbeiter mit KI-Support",
      "efficiency_label": "Effizienzsteigerung",
      "valuation_label": "Unternehmensbewertung",
      "testimonial_quote": "Der KI Konzept Builder ist nicht nur ein Tool - es ist ein strategischer Partner, der uns hilft, schneller und intelligenter zu wachsen.",
      "testimonial_author": "- Karim Atiyeh, CTO Ramp"
    },
    "vercel_modal": {
      "subtitle": "Frontend-Infrastruktur Platform",
      "main_quote": "KI Konzept Builder versteht, dass moderne Teams eine einheitliche Plattform brauchen, um ihre Vision zu verwirklichen.",
      "challenge_title": "Die Herausforderung",
      "challenge_content": "Vercel musste seine Developer Experience kontinuierlich verbessern und gleichzeitig die Infrastruktur für Millionen von Deployments skalieren. Die Herausforderung lag darin, Komplexität zu reduzieren ohne Flexibilität zu verlieren.",
      "solution_title": "Die Lösung mit KI Konzept Builder",
      "solution_item_1": "Automatisierte Performance-Optimierung",
      "solution_item_2": "KI-gestützte Deployment-Strategien",
      "solution_item_3": "Intelligente Fehlerdiagnose und Behebung",
      "solution_item_4": "Predictive Scaling und Ressourcenmanagement",
      "results_title": "Die Ergebnisse",
      "deployments_label": "Deployments/Monat",
      "uptime_label": "Uptime",
      "latency_label": "Durchschn. Latenz",
      "testimonial_quote": "Mit dem KI Konzept Builder konnten wir unsere Vision einer perfekten Developer Experience endlich vollständig umsetzen.",
      "testimonial_author": "- Guillermo Rauch, CEO Vercel"
    },
    "matchgroup_modal": {
      "subtitle": "Global Dating Technology Leader",
      "main_quote": "KI Konzept Builder war der mächtigste und wirkungsvollste Weg, unseren globalen Workflow zu transformieren.",
      "challenge_title": "Die Herausforderung",
      "challenge_content": "Mit über 45 Dating-Apps weltweit stand MatchGroup vor der Herausforderung, konsistente User Experiences zu liefern und gleichzeitig lokale Marktbedürfnisse zu berücksichtigen. Die Koordination zwischen Teams war komplex.",
      "solution_title": "Die Lösung mit KI Konzept Builder",
      "solution_item_1": "Zentralisierte Produktentwicklung mit lokaler Flexibilität",
      "solution_item_2": "KI-gestützte User-Matching-Algorithmen",
      "solution_item_3": "Automatisierte A/B-Tests und Optimierung",
      "solution_item_4": "Cross-Platform Analytics und Insights",
      "results_title": "Die Ergebnisse",
      "users_label": "Aktive Nutzer",
      "brands_label": "Dating-Marken",
      "revenue_label": "Jahresumsatz",
      "testimonial_quote": "Die Implementierung des KI Konzept Builders hat unsere Produktentwicklung revolutioniert und uns geholfen, bessere Verbindungen für Millionen von Menschen zu schaffen.",
      "testimonial_author": "- Sharmeen Browarek, CEO MatchGroup"
    },
    "deel_modal": {
      "subtitle": "Global Payroll & Compliance Platform",
      "main_quote": "Jemand könnte Deel beitreten und sich ohne jegliches Onboarding einarbeiten - dank KI Konzept Builder.",
      "challenge_title": "Die Herausforderung",
      "challenge_content": "Als eine der am schnellsten wachsenden HR-Tech-Plattformen musste Deel seine Prozesse ständig skalieren und dabei Compliance in über 150 Ländern sicherstellen. Die Komplexität war enorm.",
      "solution_title": "Die Lösung mit KI Konzept Builder",
      "solution_item_1": "Automatisierte Compliance-Prüfungen weltweit",
      "solution_item_2": "KI-gestütztes Onboarding für neue Mitarbeiter",
      "solution_item_3": "Intelligente Dokumentenverwaltung",
      "solution_item_4": "Selbstlernende Support-Systeme",
      "results_title": "Die Ergebnisse",
      "companies_label": "Unternehmen",
      "countries_label": "Länder",
      "valuation_label": "Bewertung",
      "testimonial_quote": "Der KI Konzept Builder hat es uns ermöglicht, unser hyperschnelles Wachstum zu bewältigen und dabei die Qualität unseres Services zu verbessern.",
      "testimonial_author": "- Alex Bouaziz, CEO Deel"
    },
    "planful_modal": {
      "subtitle": "Financial Performance Management",
      "main_quote": "Von sechs verschiedenen Apps zu einer einzigen Plattform - KI Konzept Builder hat unsere Arbeitsweise revolutioniert.",
      "challenge_title": "Die Herausforderung",
      "challenge_content": "Planful's Teams arbeiteten mit verschiedenen Tools für Planung, Reporting und Analyse. Die fehlende Integration führte zu Ineffizienzen und inkonsistenten Daten.",
      "solution_title": "Die Lösung mit KI Konzept Builder",
      "solution_item_1": "Vereinheitlichte Plattform für alle Finanzprozesse",
      "solution_item_2": "KI-gestützte Finanzprognosen",
      "solution_item_3": "Automatisierte Berichterstattung",
      "solution_item_4": "Echtzeit-Kollaboration zwischen Teams",
      "results_title": "Die Ergebnisse",
      "time_saved_label": "Zeitersparnis",
      "platform_label": "Einheitliche Plattform",
      "customers_label": "Kunden weltweit",
      "testimonial_quote": "Die Migration zu KI Konzept Builder war die beste Entscheidung für unser Unternehmen. Unsere Teams sind produktiver und zufriedener als je zuvor.",
      "testimonial_author": "- Grant Halloran, CEO Planful"
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
        "description": "Get personalized advice around the clock. Our AI advisor helps you with all questions about starting your business.",
        "assistant_title": "AI Assistant"
      },
      "business_plan": {
        "title": "Smart Business Plan",
        "description": "Create bankable business plans with AI support. Automatic market analysis and financial planning included.",
        "editor_title": "Business Plan Editor"
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
        "ai_description": "Intelligent algorithms help you create realistic financial forecasts and liquidity plans.",
        "tool_title": "Financial Planning Tool"
      },
      "team_management": {
        "title": "Team Management",
        "description": "Manage your founding team and work together on your projects.",
        "collaboration_title": "Team Collaboration"
      }
    },
    "security": {
      "title": "Security & Privacy",
      "gdpr": "GDPR compliant data processing",
      "ssl": "SSL encrypted transmission",
      "german_servers": "German servers & data centers",
      "no_third_party": "No sharing with third parties"
    },
    "project_status": {
      "finished": "✅ Finished",
      "completed": "Completed",
      "api_release": "API v2.0 Release"
    },
    "customer_stories": {
      "title": "Success stories from our entrepreneurs",
      "subtitle": "Over 500 entrepreneurs have already successfully started with the AI Concept Builder",
      "stats": {
        "leading_companies": "Leading companies use AI Concept Builder (G2)",
        "top_rated": "#1 rated AI tool for entrepreneurs (G2)",
        "yc_companies": "Over 50% of YC companies",
        "community_members": "1.4M+ community members"
      },
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
      },
      "testimonial_1": {
        "quote": "Optimized workflows to reduce timelines by 3x."
      },
      "testimonial_2": {
        "quote": "With AI Concept Builder, every person at Ramp has an AI assistant."
      },
      "testimonial_3": {
        "quote": "AI Concept Builder understands that you can solve many problems with one tool."
      },
      "testimonial_4": {
        "quote": "AI Concept Builder was the most powerful and impactful way to optimize our workflow."
      },
      "testimonial_5": {
        "quote": "Someone could join Deel and onboard without any training."
      },
      "testimonial_6": {
        "quote": "From six apps to one: Scaling faster with all teams on AI Concept Builder."
      }
    },
    "readiness_check": {
      "title": "Your Personal Founder Readiness Check",
      "subtitle": "Answer 5 targeted questions and receive a well-founded assessment of your entrepreneurial readiness plus a customized action plan.",
      "question_1_of_5": "Question 1 of 5",
      "question_2_of_5": "Question 2 of 5",
      "question_3_of_5": "Question 3 of 5",
      "question_4_of_5": "Question 4 of 5",
      "question_5_of_5": "Question 5 of 5",
      "progress_text": "Progress: {{current}} of 5 questions",
      "estimated_time": "Estimated time: {{seconds}} seconds remaining",
      "q1": {
        "title": "How clearly is your business model defined?",
        "option1_title": "Crystal clear",
        "option1_desc": "I know exactly what I'm selling, to whom, and how I'm making money",
        "option2_title": "General direction",
        "option2_desc": "The idea is set, but details still need to be worked out",
        "option3_title": "Still vague",
        "option3_desc": "I have an idea, but I'm still at the beginning of development"
      },
      "q2": {
        "title": "Have you already validated your business idea?",
        "option1_title": "Yes, with real customers",
        "option1_desc": "I've already spoken with potential customers or made first sales",
        "option2_title": "Market research done",
        "option2_desc": "I've conducted surveys and analyzed market data",
        "option3_title": "No validation yet",
        "option3_desc": "I'm relying on my assessment and experience"
      },
      "q3": {
        "title": "How is your financing situation?",
        "option1_title": "Secured",
        "option1_desc": "Own capital available or investors/loans confirmed",
        "option2_title": "Partially clarified",
        "option2_desc": "Basic financing is set, but additional funds are needed",
        "option3_title": "In planning",
        "option3_desc": "I'm still researching grants and financing options",
        "option4_title": "Still open",
        "option4_desc": "Financing is still completely unclear"
      },
      "q4": {
        "title": "What entrepreneurial skills do you bring?",
        "option1_title": "Experienced entrepreneur",
        "option1_desc": "I've already successfully founded or have leadership experience",
        "option2_title": "Relevant professional experience",
        "option2_desc": "I know the industry well and have technical expertise",
        "option3_title": "Career changer with potential",
        "option3_desc": "I'm motivated and eager to learn, but without direct experience"
      },
      "q5": {
        "title": "When do you plan the concrete implementation?",
        "option1_title": "Immediately",
        "option1_desc": "I'm ready and want to start within the next 4 weeks",
        "option2_title": "In 1-3 months",
        "option2_desc": "I'm preparing and planning to start in the near future",
        "option3_title": "In 3-6 months",
        "option3_desc": "I still need time for preparation and planning",
        "option4_title": "Later than 6 months",
        "option4_desc": "It's still a longer-term project"
      },
      "results": {
        "points": "Points",
        "title_ready": "You're ready to launch!",
        "title_good": "You're on the right track!",
        "title_potential": "You have great potential!",
        "title_early": "You're still at the beginning",
        "level_high": "High entrepreneurial readiness",
        "level_medium": "Medium entrepreneurial readiness",
        "level_low": "Development potential",
        "analysis_title": "Your detailed analysis:",
        "next_steps_title": "Your next steps:",
        "get_action_plan": "Get free action plan →",
        "download_pdf": "Download result as PDF",
        "restart_test": "Retake test",
        "analysis": {
          "business_model": {
            "strong": "Your business model is very well thought out. That's a strong foundation!",
            "medium": "Your business model has a clear direction, but some details are still missing.",
            "weak": "Your business model needs more clarity and structure."
          },
          "validation": {
            "strong": "Excellent! You already have market feedback – this significantly reduces your risk.",
            "medium": "Good! Market research is an important first step.",
            "weak": "Market validation would give you more confidence."
          },
          "financing": {
            "strong": "Perfect! With secured financing, you can fully focus on implementation.",
            "partial": "Solid foundation! With partial financing, you have a good start.",
            "planning": "You're on the right track. Financial planning is important.",
            "weak": "Financing should become one of your priorities."
          },
          "experience": {
            "strong": "Your experience is a major advantage for success!",
            "medium": "Your industry knowledge is valuable for your venture.",
            "weak": "As a career changer, you bring fresh perspectives."
          },
          "timeline": {
            "immediate": "Your determination is impressive!",
            "soon": "A realistic timeline shows good preparation.",
            "later": "Take the time you need for a solid foundation."
          }
        },
        "recommendations": {
          "high": [
            "Create your detailed business plan now with our AI tool",
            "Secure funding with our automatic matching",
            "Start with legal form selection and incorporation formalities",
            "Use our pitch deck templates for investor meetings"
          ],
          "medium": [
            "Refine your business model with our Business Model Canvas",
            "Conduct a professional market analysis",
            "Create realistic financial projections",
            "Network with other founders in our community"
          ],
          "low": [
            "Use our AI advisor for idea generation",
            "Explore different business models in our library",
            "Take our founder fundamentals course",
            "Get personal consulting for a clear roadmap"
          ]
        },
        "download": {
          "title": "FOUNDER READINESS CHECK RESULT",
          "total_score": "Total Score",
          "readiness_level": "Readiness Level",
          "your_analysis": "Your Analysis",
          "next_steps": "Your Next Steps",
          "created_on": "Created on",
          "footer_text": "KI Konzept Builder - Your Partner for Successful Entrepreneurship"
        }
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
        "submit": "Request free consultation →",
        "country_germany": "Germany",
        "country_austria": "Austria",
        "country_switzerland": "Switzerland",
        "country_liechtenstein": "Liechtenstein",
        "country_luxembourg": "Luxembourg",
        "country_france": "France",
        "country_italy": "Italy",
        "country_spain": "Spain",
        "country_netherlands": "Netherlands",
        "country_belgium": "Belgium",
        "country_poland": "Poland",
        "country_czech": "Czech Republic",
        "country_uk": "United Kingdom",
        "country_usa": "USA",
        "country_other": "Other Country",
        "no_credit_card": "No credit card required • 100% free & non-binding"
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
        "subtitle": "Our software provides everything you need for successful startup formation.",
        "discover_all": "Discover all features →"
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
        "employment": "Employment contracts",
        "generator_title": "Document Generator"
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
        "description": "Get personalized advice around the clock. Our AI advisor helps you with all questions about starting your business.",
        "assistant_title": "AI Assistant"
      },
      "business_plan": {
        "title": "Smart Business Plan",
        "description": "Create bankable business plans with AI support. Automatic market analysis and financial planning included.",
        "professional_description": "Create professional business plans that convince banks and investors - in hours instead of weeks.",
        "editor_title": "Business Plan Editor"
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
        "ai_description": "Intelligent algorithms help you create realistic financial forecasts and liquidity plans.",
        "tool_title": "Financial Planning Tool"
      },
      "team_management": {
        "title": "Team Management",
        "description": "Manage your founding team and work together on your projects.",
        "collaboration_title": "Team Collaboration"
      },
      "personal_support": {
        "description": "If needed, you get personal support from experienced business consultants - digital or on-site."
      },
      "contracts": {
        "automatic_creation": "Automatic creation of contracts and business documents.",
        "generator_title": "Document Generator"
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
      "premium": "Premium",
      "in_development": "In Development"
    },
    "beta": {
      "title": "Become a Beta Tester",
      "limited_spots": "Limited spots available • Free during beta phase",
      "spots_counter": "43 of 50 spots available",
      "limited_offer": "⚡ Limited offer",
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
      "subtitle": "Everything you need to know about the AI Concept Builder",
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
        },
        "funding": {
          "question": "Which funding options can I find through the platform?",
          "answer": "We have a database with over 2,000 funding programs at federal, state, and EU level. Our AI automatically matches your business idea with suitable funding opportunities such as EXIST, INVEST, KfW loans, and regional grants."
        },
        "cost": {
          "question": "Is the consultation really free?",
          "answer": "Yes, the initial consultation and AI analysis are completely free. You'll receive a detailed assessment of your business idea and appropriate recommendations. Costs only arise for further personal consultation, which will be communicated transparently."
        },
        "security": {
          "question": "How secure is my data?",
          "answer": "We take data protection very seriously. All data is transmitted encrypted and stored in German data centers according to GDPR standards. Your business idea and plans are protected by modern security technologies."
        },
        "offline": {
          "question": "Can I also work on the business plan offline?",
          "answer": "Yes, you can export your business plan as a PDF or Word document at any time and edit it offline. Changes can then be integrated back into the platform. Additionally, there is an offline function for the most important features."
        },
        "timeline": {
          "question": "How long does it take to see results?",
          "answer": "The AI analysis is completed in a few minutes. You'll receive a first business plan draft within 24 hours. For the complete development with funding matching, you should plan for 3-5 days."
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
        "consultation": "Consultation",
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
      "premium": "Premium",
      "in_development": "In Development"
    },
    "story_modal": {
      "subtitle": "AI-powered Marketing Startup",
      "main_quote": "There's power in a single platform that saves you time, conserves resources, and still delivers results that impress your investors.",
      "challenge_title": "The Challenge",
      "challenge_content": "StartupBoost faced the typical challenge of many tech startups: An innovative idea, but no clear structure for implementation. The team needed a convincing business plan for investors, had to find the right funding, and simultaneously build the operational business.",
      "solution_title": "The Solution with AI Concept Builder",
      "solution_item_1": "Business plan created in 5 days instead of 5 weeks",
      "solution_item_2": "€150,000 in funding found through intelligent matching",
      "solution_item_3": "Investor pitch perfected with AI support",
      "solution_item_4": "Market analysis automated and validated",
      "results_title": "The Results",
      "revenue_label": "Revenue after 12 months",
      "funding_label": "Total funding",
      "team_label": "Team grown to",
      "testimonial_quote": "The AI Concept Builder was a game-changer for us. We could focus on our product while the platform supported us with all organizational matters. The time savings were invaluable.",
      "testimonial_author": "Lisa Chen, CEO StartupBoost",
      "cta_text": "Start your success story with the AI Concept Builder too."
    },
    "techcraft_modal": {
      "subtitle": "Software Development & Consulting",
      "main_quote": "The AI Concept Builder revolutionized our workflows. We were able to reduce our project times by 70% while increasing quality.",
      "challenge_title": "The Challenge",
      "challenge_content": "TechCraft faced the challenge of scaling their development processes while maintaining high quality. With a growing team and more complex projects, coordination became increasingly difficult.",
      "solution_title": "The Solution with AI Concept Builder",
      "solution_item_1": "Automated project planning and resource allocation",
      "solution_item_2": "AI-powered code reviews and quality assurance",
      "solution_item_3": "Integrated documentation and knowledge management",
      "solution_item_4": "Real-time collaboration for remote teams",
      "results_title": "The Results",
      "productivity_label": "Productivity increase",
      "quality_label": "Fewer bugs",
      "revenue_label": "Annual revenue",
      "testimonial_quote": "Implementing the AI Concept Builder was a turning point for our company. We can now take on projects that would have been impossible before.",
      "testimonial_author": "- Marcus Weber, CTO TechCraft"
    },
    "ramp_modal": {
      "subtitle": "Financial Automation for Businesses",
      "main_quote": "With AI Concept Builder, every person at Ramp has a personal AI assistant that transforms their work.",
      "challenge_title": "The Challenge",
      "challenge_content": "As a rapidly growing FinTech company, Ramp had to constantly optimize its internal processes while developing new features for customers. The balance between innovation and operational excellence was critical.",
      "solution_title": "The Solution with AI Concept Builder",
      "solution_item_1": "Automated financial analysis and reporting",
      "solution_item_2": "AI-powered customer service and support",
      "solution_item_3": "Intelligent process optimization",
      "solution_item_4": "Personalized employee dashboards",
      "results_title": "The Results",
      "employees_label": "Employees with AI support",
      "efficiency_label": "Efficiency increase",
      "valuation_label": "Company valuation",
      "testimonial_quote": "The AI Concept Builder is not just a tool - it's a strategic partner that helps us grow faster and smarter.",
      "testimonial_author": "- Karim Atiyeh, CTO Ramp"
    },
    "vercel_modal": {
      "subtitle": "Frontend Infrastructure Platform",
      "main_quote": "AI Concept Builder understands that modern teams need a unified platform to realize their vision.",
      "challenge_title": "The Challenge",
      "challenge_content": "Vercel had to continuously improve its developer experience while scaling infrastructure for millions of deployments. The challenge was to reduce complexity without losing flexibility.",
      "solution_title": "The Solution with AI Concept Builder",
      "solution_item_1": "Automated performance optimization",
      "solution_item_2": "AI-powered deployment strategies",
      "solution_item_3": "Intelligent error diagnosis and resolution",
      "solution_item_4": "Predictive scaling and resource management",
      "results_title": "The Results",
      "deployments_label": "Deployments/month",
      "uptime_label": "Uptime",
      "latency_label": "Avg. latency",
      "testimonial_quote": "With the AI Concept Builder, we were finally able to fully realize our vision of a perfect developer experience.",
      "testimonial_author": "- Guillermo Rauch, CEO Vercel"
    },
    "matchgroup_modal": {
      "subtitle": "Global Dating Technology Leader",
      "main_quote": "AI Concept Builder was the most powerful and effective way to transform our global workflow.",
      "challenge_title": "The Challenge",
      "challenge_content": "With over 45 dating apps worldwide, MatchGroup faced the challenge of delivering consistent user experiences while considering local market needs. Coordination between teams was complex.",
      "solution_title": "The Solution with AI Concept Builder",
      "solution_item_1": "Centralized product development with local flexibility",
      "solution_item_2": "AI-powered user matching algorithms",
      "solution_item_3": "Automated A/B testing and optimization",
      "solution_item_4": "Cross-platform analytics and insights",
      "results_title": "The Results",
      "users_label": "Active users",
      "brands_label": "Dating brands",
      "revenue_label": "Annual revenue",
      "testimonial_quote": "Implementing the AI Concept Builder revolutionized our product development and helped us create better connections for millions of people.",
      "testimonial_author": "- Sharmeen Browarek, CEO MatchGroup"
    },
    "deel_modal": {
      "subtitle": "Global Payroll & Compliance Platform",
      "main_quote": "Someone could join Deel and onboard themselves without any training - thanks to AI Concept Builder.",
      "challenge_title": "The Challenge",
      "challenge_content": "As one of the fastest-growing HR tech platforms, Deel had to constantly scale its processes while ensuring compliance in over 150 countries. The complexity was enormous.",
      "solution_title": "The Solution with AI Concept Builder",
      "solution_item_1": "Automated compliance checks worldwide",
      "solution_item_2": "AI-powered onboarding for new employees",
      "solution_item_3": "Intelligent document management",
      "solution_item_4": "Self-learning support systems",
      "results_title": "The Results",
      "companies_label": "Companies",
      "countries_label": "Countries",
      "valuation_label": "Valuation",
      "testimonial_quote": "The AI Concept Builder enabled us to handle our hyper-fast growth while improving the quality of our service.",
      "testimonial_author": "- Alex Bouaziz, CEO Deel"
    },
    "planful_modal": {
      "subtitle": "Financial Performance Management",
      "main_quote": "From six different apps to a single platform - AI Concept Builder revolutionized the way we work.",
      "challenge_title": "The Challenge",
      "challenge_content": "Planful's teams worked with various tools for planning, reporting, and analysis. The lack of integration led to inefficiencies and inconsistent data.",
      "solution_title": "The Solution with AI Concept Builder",
      "solution_item_1": "Unified platform for all financial processes",
      "solution_item_2": "AI-powered financial forecasting",
      "solution_item_3": "Automated reporting",
      "solution_item_4": "Real-time collaboration between teams",
      "results_title": "The Results",
      "time_saved_label": "Time saved",
      "platform_label": "Unified platform",
      "customers_label": "Customers worldwide",
      "testimonial_quote": "Migrating to AI Concept Builder was the best decision for our company. Our teams are more productive and satisfied than ever before.",
      "testimonial_author": "- Grant Halloran, CEO Planful"
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
        "description": "Obtenez des conseils personnalisés 24h/24. Notre conseiller IA vous aide avec toutes les questions sur la création d'entreprise.",
        "assistant_title": "Assistant IA"
      },
      "business_plan": {
        "title": "Business Plan Intelligent",
        "description": "Créez des business plans bancables avec l'aide de l'IA. Analyse de marché automatique et planification financière incluses.",
        "editor_title": "Éditeur de Business Plan"
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
        "ai_description": "Des algorithmes intelligents vous aident à créer des prévisions financières réalistes et des plans de liquidité.",
        "tool_title": "Outil de Planification Financière"
      },
      "team_management": {
        "title": "Gestion d'équipe",
        "description": "Gérez votre équipe fondatrice et travaillez ensemble sur vos projets.",
        "collaboration_title": "Collaboration d'Équipe"
      }
    },
    "security": {
      "title": "Sécurité et confidentialité",
      "gdpr": "Traitement des données conforme au RGPD",
      "ssl": "Transmission cryptée SSL",
      "german_servers": "Serveurs et centres de données allemands",
      "no_third_party": "Aucun partage avec des tiers"
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
    "readiness_check": {
      "title": "Votre test de préparation entrepreneuriale personnel",
      "subtitle": "Répondez à 5 questions ciblées et recevez une évaluation fondée de votre maturité entrepreneuriale plus un plan d'action personnalisé.",
      "question_1_of_5": "Question 1 sur 5",
      "question_2_of_5": "Question 2 sur 5",
      "question_3_of_5": "Question 3 sur 5",
      "question_4_of_5": "Question 4 sur 5",
      "question_5_of_5": "Question 5 sur 5",
      "progress_text": "Progression : {{current}} sur 5 questions",
      "estimated_time": "Temps estimé : encore {{seconds}} secondes",
      "q1": {
        "title": "À quel point votre modèle d'affaires est-il défini ?",
        "option1_title": "Cristallin",
        "option1_desc": "Je sais exactement ce que je vends, à qui et comment je gagne de l'argent",
        "option2_title": "Direction générale",
        "option2_desc": "L'idée est établie, mais les détails doivent encore être élaborés",
        "option3_title": "Encore vague",
        "option3_desc": "J'ai une idée, mais je suis encore au début du développement"
      },
      "q2": {
        "title": "Avez-vous déjà validé votre idée d'entreprise ?",
        "option1_title": "Oui, avec de vrais clients",
        "option1_desc": "J'ai déjà parlé avec des clients potentiels ou réalisé des premières ventes",
        "option2_title": "Étude de marché faite",
        "option2_desc": "J'ai mené des enquêtes et analysé les données du marché",
        "option3_title": "Pas encore de validation",
        "option3_desc": "Je me fie à mon évaluation et mon expérience"
      },
      "q3": {
        "title": "Quelle est votre situation financière ?",
        "option1_title": "Sécurisée",
        "option1_desc": "Capital propre disponible ou investisseurs/prêts confirmés",
        "option2_title": "Partiellement clarifiée",
        "option2_desc": "Le financement de base est établi, mais des fonds supplémentaires sont nécessaires",
        "option3_title": "En planification",
        "option3_desc": "Je recherche encore des subventions et des options de financement",
        "option4_title": "Encore ouverte",
        "option4_desc": "Le financement est encore complètement flou"
      },
      "q4": {
        "title": "Quelles compétences entrepreneuriales apportez-vous ?",
        "option1_title": "Entrepreneur expérimenté",
        "option1_desc": "J'ai déjà fondé avec succès ou j'ai de l'expérience en leadership",
        "option2_title": "Expérience professionnelle pertinente",
        "option2_desc": "Je connais bien l'industrie et j'ai une expertise technique",
        "option3_title": "Reconversion avec potentiel",
        "option3_desc": "Je suis motivé et prêt à apprendre, mais sans expérience directe"
      },
      "q5": {
        "title": "Quand prévoyez-vous la mise en œuvre concrète ?",
        "option1_title": "Immédiatement",
        "option1_desc": "Je suis prêt et je veux commencer dans les 4 prochaines semaines",
        "option2_title": "Dans 1-3 mois",
        "option2_desc": "Je me prépare et prévois de commencer dans un avenir proche",
        "option3_title": "Dans 3-6 mois",
        "option3_desc": "J'ai encore besoin de temps pour la préparation et la planification",
        "option4_title": "Plus de 6 mois",
        "option4_desc": "C'est encore un projet à plus long terme"
      },
      "results": {
        "points": "Points",
        "title_ready": "Vous êtes prêt à vous lancer !",
        "title_good": "Vous êtes sur la bonne voie !",
        "title_potential": "Vous avez un grand potentiel !",
        "title_early": "Vous êtes encore au début",
        "level_high": "Haute maturité entrepreneuriale",
        "level_medium": "Maturité entrepreneuriale moyenne",
        "level_low": "Potentiel de développement",
        "analysis_title": "Votre analyse détaillée :",
        "next_steps_title": "Vos prochaines étapes :",
        "get_action_plan": "Obtenir un plan d'action gratuit →",
        "download_pdf": "Télécharger le résultat en PDF",
        "restart_test": "Refaire le test",
        "analysis": {
          "business_model": {
            "strong": "Votre modèle d'affaires est très bien pensé. C'est une base solide !",
            "medium": "Votre modèle d'affaires a une direction claire, mais certains détails manquent encore.",
            "weak": "Votre modèle d'affaires a besoin de plus de clarté et de structure."
          },
          "validation": {
            "strong": "Excellent ! Vous avez déjà des retours du marché – cela réduit considérablement votre risque.",
            "medium": "Bien ! L'étude de marché est une première étape importante.",
            "weak": "Une validation du marché vous donnerait plus de confiance."
          },
          "financing": {
            "strong": "Parfait ! Avec un financement sécurisé, vous pouvez vous concentrer pleinement sur la mise en œuvre.",
            "partial": "Base solide ! Avec un financement partiel, vous avez un bon départ.",
            "planning": "Vous êtes sur la bonne voie. La planification financière est importante.",
            "weak": "Le financement devrait devenir l'une de vos priorités."
          },
          "experience": {
            "strong": "Votre expérience est un atout majeur pour le succès !",
            "medium": "Votre connaissance du secteur est précieuse pour votre projet.",
            "weak": "En tant que reconverti, vous apportez des perspectives nouvelles."
          },
          "timeline": {
            "immediate": "Votre détermination est impressionnante !",
            "soon": "Un calendrier réaliste montre une bonne préparation.",
            "later": "Prenez le temps dont vous avez besoin pour une base solide."
          }
        },
        "recommendations": {
          "high": [
            "Créez maintenant votre business plan détaillé avec notre outil IA",
            "Sécurisez des financements avec notre matching automatique",
            "Commencez par le choix de la forme juridique et les formalités de création",
            "Utilisez nos modèles de pitch deck pour les réunions avec les investisseurs"
          ],
          "medium": [
            "Affinez votre modèle d'affaires avec notre Business Model Canvas",
            "Effectuez une analyse de marché professionnelle",
            "Créez des projections financières réalistes",
            "Réseautez avec d'autres fondateurs dans notre communauté"
          ],
          "low": [
            "Utilisez notre conseiller IA pour la génération d'idées",
            "Explorez différents modèles d'affaires dans notre bibliothèque",
            "Suivez notre cours de base pour fondateurs",
            "Obtenez un conseil personnalisé pour une feuille de route claire"
          ]
        },
        "download": {
          "title": "RÉSULTAT DU TEST DE PRÉPARATION ENTREPRENEURIALE",
          "total_score": "Score total",
          "readiness_level": "Niveau de préparation",
          "your_analysis": "Votre analyse",
          "next_steps": "Vos prochaines étapes",
          "created_on": "Créé le",
          "footer_text": "KI Konzept Builder - Votre partenaire pour une création d'entreprise réussie"
        }
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
        "submit": "Demander une consultation gratuite →",
        "country_germany": "Allemagne",
        "country_austria": "Autriche",
        "country_switzerland": "Suisse",
        "country_liechtenstein": "Liechtenstein",
        "country_luxembourg": "Luxembourg",
        "country_france": "France",
        "country_italy": "Italie",
        "country_spain": "Espagne",
        "country_netherlands": "Pays-Bas",
        "country_belgium": "Belgique",
        "country_poland": "Pologne",
        "country_czech": "République tchèque",
        "country_uk": "Royaume-Uni",
        "country_usa": "États-Unis",
        "country_other": "Autre pays",
        "no_credit_card": "Aucune carte de crédit requise • 100% gratuit et sans engagement"
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
        "subtitle": "Notre logiciel vous fournit tout ce dont vous avez besoin pour créer une startup avec succès.",
        "discover_all": "Découvrir toutes les fonctionnalités →"
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
        "employment": "Contrats de travail",
        "generator_title": "Générateur de Documents"
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
        "description": "Obtenez des conseils personnalisés 24h/24. Notre conseiller IA vous aide avec toutes les questions sur la création d'entreprise.",
        "assistant_title": "Assistant IA"
      },
      "business_plan": {
        "title": "Business Plan Intelligent",
        "description": "Créez des business plans bancables avec l'aide de l'IA. Analyse de marché automatique et planification financière incluses.",
        "professional_description": "Créez des business plans professionnels qui convainquent les banques et investisseurs - en heures au lieu de semaines.",
        "editor_title": "Éditeur de Business Plan"
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
        "ai_description": "Des algorithmes intelligents vous aident à créer des prévisions financières réalistes et des plans de liquidité.",
        "tool_title": "Outil de Planification Financière"
      },
      "team_management": {
        "title": "Gestion d'équipe",
        "description": "Gérez votre équipe fondatrice et travaillez ensemble sur vos projets.",
        "collaboration_title": "Collaboration d'Équipe"
      },
      "personal_support": {
        "description": "Si nécessaire, vous obtenez un soutien personnel de consultants expérimentés - numérique ou sur site."
      },
      "contracts": {
        "automatic_creation": "Création automatique de contrats et documents d'affaires.",
        "generator_title": "Générateur de Documents"
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
      "spots_counter": "43 de 50 places disponibles",
      "limited_offer": "⚡ Offre limitée",
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
      "subtitle": "Tout ce que vous devez savoir sur l'AI Concept Builder",
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
        },
        "funding": {
          "question": "Quels financements puis-je trouver via la plateforme ?",
          "answer": "Nous avons une base de données avec plus de 2 000 programmes de financement au niveau fédéral, régional et européen. Notre IA associe automatiquement votre idée d'entreprise avec des opportunités de financement appropriées comme EXIST, INVEST, les prêts KfW et les subventions régionales."
        },
        "cost": {
          "question": "La consultation est-elle vraiment gratuite ?",
          "answer": "Oui, la consultation initiale et l'analyse IA sont entièrement gratuites. Vous recevrez une évaluation détaillée de votre idée d'entreprise et des recommandations appropriées. Des coûts ne surviennent que pour des consultations personnelles supplémentaires, qui seront communiqués de manière transparente."
        },
        "security": {
          "question": "Mes données sont-elles sécurisées ?",
          "answer": "Nous prenons la protection des données très au sérieux. Toutes les données sont transmises de manière cryptée et stockées dans des centres de données allemands selon les normes RGPD. Votre idée d'entreprise et vos plans sont protégés par des technologies de sécurité modernes."
        },
        "offline": {
          "question": "Puis-je également travailler sur le business plan hors ligne ?",
          "answer": "Oui, vous pouvez exporter votre business plan en PDF ou document Word à tout moment et le modifier hors ligne. Les modifications peuvent ensuite être réintégrées dans la plateforme. De plus, il existe une fonction hors ligne pour les fonctionnalités les plus importantes."
        },
        "timeline": {
          "question": "Combien de temps faut-il pour voir des résultats ?",
          "answer": "L'analyse IA est terminée en quelques minutes. Vous recevrez un premier projet de business plan dans les 24 heures. Pour le développement complet avec correspondance de financement, vous devez prévoir 3 à 5 jours."
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
        "consultation": "Consultation",
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
      "premium": "Premium",
      "in_development": "En développement"
    },
    "story_modal": {
      "subtitle": "Startup Marketing alimenté par l'IA",
      "main_quote": "Il y a de la puissance dans une plateforme unique qui vous fait gagner du temps, préserve les ressources et livre des résultats qui impressionnent vos investisseurs.",
      "challenge_title": "Le Défi",
      "challenge_content": "StartupBoost a fait face au défi typique de nombreuses startups technologiques : Une idée innovante, mais aucune structure claire pour la mise en œuvre. L'équipe avait besoin d'un business plan convaincant pour les investisseurs, devait trouver le bon financement et construire simultanément l'entreprise opérationnelle.",
      "solution_title": "La Solution avec AI Concept Builder",
      "solution_item_1": "Business plan créé en 5 jours au lieu de 5 semaines",
      "solution_item_2": "150 000 € de financement trouvés grâce au matching intelligent",
      "solution_item_3": "Pitch investisseur perfectionné avec le support de l'IA",
      "solution_item_4": "Analyse de marché automatisée et validée",
      "results_title": "Les Résultats",
      "revenue_label": "Chiffre d'affaires après 12 mois",
      "funding_label": "Financement total",
      "team_label": "Équipe agrandie à",
      "testimonial_quote": "L'AI Concept Builder a été un changement radical pour nous. Nous avons pu nous concentrer sur notre produit pendant que la plateforme nous soutenait dans toutes les questions organisationnelles. Le gain de temps était inestimable.",
      "testimonial_author": "Lisa Chen, PDG StartupBoost",
      "cta_text": "Commencez aussi votre histoire de succès avec l'AI Concept Builder."
    },
    "techcraft_modal": {
      "subtitle": "Développement de Logiciels & Conseil",
      "main_quote": "L'AI Concept Builder a révolutionné nos flux de travail. Nous avons pu réduire nos délais de projet de 70% tout en augmentant la qualité.",
      "challenge_title": "Le Défi",
      "challenge_content": "TechCraft a fait face au défi de faire évoluer ses processus de développement tout en maintenant une qualité élevée. Avec une équipe grandissante et des projets plus complexes, la coordination devenait de plus en plus difficile.",
      "solution_title": "La Solution avec AI Concept Builder",
      "solution_item_1": "Planification de projet automatisée et allocation des ressources",
      "solution_item_2": "Revues de code et assurance qualité alimentées par l'IA",
      "solution_item_3": "Documentation intégrée et gestion des connaissances",
      "solution_item_4": "Collaboration en temps réel pour équipes distantes",
      "results_title": "Les Résultats",
      "productivity_label": "Augmentation de productivité",
      "quality_label": "Moins de bugs",
      "revenue_label": "Chiffre d'affaires annuel",
      "testimonial_quote": "La mise en œuvre de l'AI Concept Builder a été un tournant pour notre entreprise. Nous pouvons maintenant entreprendre des projets qui auraient été impossibles auparavant.",
      "testimonial_author": "- Marcus Weber, CTO TechCraft"
    },
    "ramp_modal": {
      "subtitle": "Automatisation Financière pour Entreprises",
      "main_quote": "Avec AI Concept Builder, chaque personne chez Ramp a un assistant IA personnel qui transforme son travail.",
      "challenge_title": "Le Défi",
      "challenge_content": "En tant qu'entreprise FinTech en croissance rapide, Ramp devait constamment optimiser ses processus internes tout en développant de nouvelles fonctionnalités pour les clients. L'équilibre entre innovation et excellence opérationnelle était critique.",
      "solution_title": "La Solution avec AI Concept Builder",
      "solution_item_1": "Analyses financières automatisées et reporting",
      "solution_item_2": "Service client et support alimentés par l'IA",
      "solution_item_3": "Optimisation intelligente des processus",
      "solution_item_4": "Tableaux de bord personnalisés pour employés",
      "results_title": "Les Résultats",
      "employees_label": "Employés avec support IA",
      "efficiency_label": "Augmentation d'efficacité",
      "valuation_label": "Valorisation de l'entreprise",
      "testimonial_quote": "L'AI Concept Builder n'est pas seulement un outil - c'est un partenaire stratégique qui nous aide à grandir plus vite et plus intelligemment.",
      "testimonial_author": "- Karim Atiyeh, CTO Ramp"
    },
    "vercel_modal": {
      "subtitle": "Plateforme d'Infrastructure Frontend",
      "main_quote": "AI Concept Builder comprend que les équipes modernes ont besoin d'une plateforme unifiée pour réaliser leur vision.",
      "challenge_title": "Le Défi",
      "challenge_content": "Vercel devait continuellement améliorer son expérience développeur tout en faisant évoluer l'infrastructure pour des millions de déploiements. Le défi était de réduire la complexité sans perdre de flexibilité.",
      "solution_title": "La Solution avec AI Concept Builder",
      "solution_item_1": "Optimisation automatisée des performances",
      "solution_item_2": "Stratégies de déploiement alimentées par l'IA",
      "solution_item_3": "Diagnostic et résolution intelligents des erreurs",
      "solution_item_4": "Scaling prédictif et gestion des ressources",
      "results_title": "Les Résultats",
      "deployments_label": "Déploiements/mois",
      "uptime_label": "Disponibilité",
      "latency_label": "Latence moyenne",
      "testimonial_quote": "Avec l'AI Concept Builder, nous avons enfin pu réaliser pleinement notre vision d'une expérience développeur parfaite.",
      "testimonial_author": "- Guillermo Rauch, CEO Vercel"
    },
    "matchgroup_modal": {
      "subtitle": "Leader Mondial de la Technologie de Rencontres",
      "main_quote": "AI Concept Builder était le moyen le plus puissant et efficace de transformer notre flux de travail mondial.",
      "challenge_title": "Le Défi",
      "challenge_content": "Avec plus de 45 applications de rencontres dans le monde, MatchGroup a fait face au défi de fournir des expériences utilisateur cohérentes tout en tenant compte des besoins locaux du marché. La coordination entre les équipes était complexe.",
      "solution_title": "La Solution avec AI Concept Builder",
      "solution_item_1": "Développement de produit centralisé avec flexibilité locale",
      "solution_item_2": "Algorithmes de matching utilisateur alimentés par l'IA",
      "solution_item_3": "Tests A/B automatisés et optimisation",
      "solution_item_4": "Analytics et insights cross-platform",
      "results_title": "Les Résultats",
      "users_label": "Utilisateurs actifs",
      "brands_label": "Marques de rencontres",
      "revenue_label": "Chiffre d'affaires annuel",
      "testimonial_quote": "La mise en œuvre de l'AI Concept Builder a révolutionné notre développement produit et nous a aidés à créer de meilleures connexions pour des millions de personnes.",
      "testimonial_author": "- Sharmeen Browarek, CEO MatchGroup"
    },
    "deel_modal": {
      "subtitle": "Plateforme Mondiale de Paie & Conformité",
      "main_quote": "Quelqu'un pourrait rejoindre Deel et s'intégrer sans aucune formation - grâce à AI Concept Builder.",
      "challenge_title": "Le Défi",
      "challenge_content": "En tant que l'une des plateformes HR tech à la croissance la plus rapide, Deel devait constamment faire évoluer ses processus tout en assurant la conformité dans plus de 150 pays. La complexité était énorme.",
      "solution_title": "La Solution avec AI Concept Builder",
      "solution_item_1": "Vérifications de conformité automatisées dans le monde entier",
      "solution_item_2": "Onboarding alimenté par l'IA pour nouveaux employés",
      "solution_item_3": "Gestion intelligente des documents",
      "solution_item_4": "Systèmes de support auto-apprenants",
      "results_title": "Les Résultats",
      "companies_label": "Entreprises",
      "countries_label": "Pays",
      "valuation_label": "Valorisation",
      "testimonial_quote": "L'AI Concept Builder nous a permis de gérer notre croissance ultra-rapide tout en améliorant la qualité de notre service.",
      "testimonial_author": "- Alex Bouaziz, CEO Deel"
    },
    "planful_modal": {
      "subtitle": "Gestion de Performance Financière",
      "main_quote": "De six applications différentes à une seule plateforme - AI Concept Builder a révolutionné notre façon de travailler.",
      "challenge_title": "Le Défi",
      "challenge_content": "Les équipes de Planful travaillaient avec divers outils pour la planification, le reporting et l'analyse. Le manque d'intégration conduisait à des inefficacités et des données incohérentes.",
      "solution_title": "La Solution avec AI Concept Builder",
      "solution_item_1": "Plateforme unifiée pour tous les processus financiers",
      "solution_item_2": "Prévisions financières alimentées par l'IA",
      "solution_item_3": "Reporting automatisé",
      "solution_item_4": "Collaboration en temps réel entre équipes",
      "results_title": "Les Résultats",
      "time_saved_label": "Temps économisé",
      "platform_label": "Plateforme unifiée",
      "customers_label": "Clients dans le monde",
      "testimonial_quote": "La migration vers AI Concept Builder a été la meilleure décision pour notre entreprise. Nos équipes sont plus productives et satisfaites que jamais.",
      "testimonial_author": "- Grant Halloran, CEO Planful"
    },
    "beta": {
      "limited_spots": "Places limitées disponibles • Gratuit pendant la phase bêta"
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
      "new": "Nuevo",
      "in_development": "En desarrollo"
    },
    "story_modal": {
      "subtitle": "Startup de Marketing impulsado por IA",
      "main_quote": "Hay poder en una plataforma única que te ahorra tiempo, conserva recursos y aún así ofrece resultados que impresionan a tus inversores.",
      "challenge_title": "El Desafío",
      "challenge_content": "StartupBoost enfrentó el desafío típico de muchas startups tecnológicas: Una idea innovadora, pero sin estructura clara para la implementación. El equipo necesitaba un plan de negocios convincente para inversores, tenía que encontrar la financiación adecuada y simultáneamente construir el negocio operativo.",
      "solution_title": "La Solución con AI Concept Builder",
      "solution_item_1": "Plan de negocios creado en 5 días en lugar de 5 semanas",
      "solution_item_2": "150.000€ en financiación encontrados a través de matching inteligente",
      "solution_item_3": "Pitch para inversores perfeccionado con soporte de IA",
      "solution_item_4": "Análisis de mercado automatizado y validado",
      "results_title": "Los Resultados",
      "revenue_label": "Ingresos después de 12 meses",
      "funding_label": "Financiación total",
      "team_label": "Equipo crecido a",
      "testimonial_quote": "El AI Concept Builder fue un cambio radical para nosotros. Pudimos enfocarnos en nuestro producto mientras la plataforma nos apoyaba con todos los asuntos organizacionales. El ahorro de tiempo fue invaluable.",
      "testimonial_author": "Lisa Chen, CEO StartupBoost",
      "cta_text": "Comienza también tu historia de éxito con el AI Concept Builder."
    },
    "techcraft_modal": {
      "subtitle": "Desarrollo de Software y Consultoría",
      "main_quote": "El AI Concept Builder revolucionó nuestros flujos de trabajo. Pudimos reducir nuestros tiempos de proyecto en un 70% mientras aumentábamos la calidad.",
      "challenge_title": "El Desafío",
      "challenge_content": "TechCraft enfrentó el desafío de escalar sus procesos de desarrollo manteniendo alta calidad. Con un equipo creciente y proyectos más complejos, la coordinación se volvía cada vez más difícil.",
      "solution_title": "La Solución con AI Concept Builder",
      "solution_item_1": "Planificación de proyectos automatizada y asignación de recursos",
      "solution_item_2": "Revisiones de código y control de calidad impulsados por IA",
      "solution_item_3": "Documentación integrada y gestión del conocimiento",
      "solution_item_4": "Colaboración en tiempo real para equipos remotos",
      "results_title": "Los Resultados",
      "productivity_label": "Aumento de productividad",
      "quality_label": "Menos errores",
      "revenue_label": "Ingresos anuales",
      "testimonial_quote": "Implementar el AI Concept Builder fue un punto de inflexión para nuestra empresa. Ahora podemos asumir proyectos que antes habrían sido imposibles.",
      "testimonial_author": "- Marcus Weber, CTO TechCraft"
    },
    "ramp_modal": {
      "subtitle": "Automatización Financiera para Empresas",
      "main_quote": "Con AI Concept Builder, cada persona en Ramp tiene un asistente de IA personal que transforma su trabajo.",
      "challenge_title": "El Desafío",
      "challenge_content": "Como empresa FinTech de rápido crecimiento, Ramp tenía que optimizar constantemente sus procesos internos mientras desarrollaba nuevas funciones para clientes. El equilibrio entre innovación y excelencia operativa era crítico.",
      "solution_title": "La Solución con AI Concept Builder",
      "solution_item_1": "Análisis financiero automatizado y reportes",
      "solution_item_2": "Servicio al cliente y soporte impulsados por IA",
      "solution_item_3": "Optimización inteligente de procesos",
      "solution_item_4": "Tableros personalizados para empleados",
      "results_title": "Los Resultados",
      "employees_label": "Empleados con soporte de IA",
      "efficiency_label": "Aumento de eficiencia",
      "valuation_label": "Valoración de la empresa",
      "testimonial_quote": "El AI Concept Builder no es solo una herramienta - es un socio estratégico que nos ayuda a crecer más rápido e inteligentemente.",
      "testimonial_author": "- Karim Atiyeh, CTO Ramp"
    },
    "vercel_modal": {
      "subtitle": "Plataforma de Infraestructura Frontend",
      "main_quote": "AI Concept Builder entiende que los equipos modernos necesitan una plataforma unificada para realizar su visión.",
      "challenge_title": "El Desafío",
      "challenge_content": "Vercel tenía que mejorar continuamente su experiencia de desarrollador mientras escalaba la infraestructura para millones de despliegues. El desafío era reducir la complejidad sin perder flexibilidad.",
      "solution_title": "La Solución con AI Concept Builder",
      "solution_item_1": "Optimización de rendimiento automatizada",
      "solution_item_2": "Estrategias de despliegue impulsadas por IA",
      "solution_item_3": "Diagnóstico y resolución inteligente de errores",
      "solution_item_4": "Escalado predictivo y gestión de recursos",
      "results_title": "Los Resultados",
      "deployments_label": "Despliegues/mes",
      "uptime_label": "Tiempo de actividad",
      "latency_label": "Latencia promedio",
      "testimonial_quote": "Con el AI Concept Builder, finalmente pudimos realizar completamente nuestra visión de una experiencia de desarrollador perfecta.",
      "testimonial_author": "- Guillermo Rauch, CEO Vercel"
    },
    "matchgroup_modal": {
      "subtitle": "Líder Global en Tecnología de Citas",
      "main_quote": "AI Concept Builder fue la forma más poderosa y efectiva de transformar nuestro flujo de trabajo global.",
      "challenge_title": "El Desafío",
      "challenge_content": "Con más de 45 aplicaciones de citas en todo el mundo, MatchGroup enfrentó el desafío de ofrecer experiencias de usuario consistentes mientras consideraba las necesidades del mercado local. La coordinación entre equipos era compleja.",
      "solution_title": "La Solución con AI Concept Builder",
      "solution_item_1": "Desarrollo de productos centralizado con flexibilidad local",
      "solution_item_2": "Algoritmos de emparejamiento de usuarios impulsados por IA",
      "solution_item_3": "Pruebas A/B automatizadas y optimización",
      "solution_item_4": "Análisis e insights multiplataforma",
      "results_title": "Los Resultados",
      "users_label": "Usuarios activos",
      "brands_label": "Marcas de citas",
      "revenue_label": "Ingresos anuales",
      "testimonial_quote": "Implementar el AI Concept Builder revolucionó nuestro desarrollo de productos y nos ayudó a crear mejores conexiones para millones de personas.",
      "testimonial_author": "- Sharmeen Browarek, CEO MatchGroup"
    },
    "deel_modal": {
      "subtitle": "Plataforma Global de Nómina y Cumplimiento",
      "main_quote": "Alguien podría unirse a Deel e incorporarse sin ninguna capacitación - gracias a AI Concept Builder.",
      "challenge_title": "El Desafío",
      "challenge_content": "Como una de las plataformas HR tech de más rápido crecimiento, Deel tenía que escalar constantemente sus procesos mientras aseguraba el cumplimiento en más de 150 países. La complejidad era enorme.",
      "solution_title": "La Solución con AI Concept Builder",
      "solution_item_1": "Verificaciones de cumplimiento automatizadas en todo el mundo",
      "solution_item_2": "Incorporación impulsada por IA para nuevos empleados",
      "solution_item_3": "Gestión inteligente de documentos",
      "solution_item_4": "Sistemas de soporte de autoaprendizaje",
      "results_title": "Los Resultados",
      "companies_label": "Empresas",
      "countries_label": "Países",
      "valuation_label": "Valoración",
      "testimonial_quote": "El AI Concept Builder nos permitió manejar nuestro crecimiento hiperrápido mientras mejorábamos la calidad de nuestro servicio.",
      "testimonial_author": "- Alex Bouaziz, CEO Deel"
    },
    "planful_modal": {
      "subtitle": "Gestión del Rendimiento Financiero",
      "main_quote": "De seis aplicaciones diferentes a una sola plataforma - AI Concept Builder revolucionó nuestra forma de trabajar.",
      "challenge_title": "El Desafío",
      "challenge_content": "Los equipos de Planful trabajaban con varias herramientas para planificación, informes y análisis. La falta de integración llevaba a ineficiencias y datos inconsistentes.",
      "solution_title": "La Solución con AI Concept Builder",
      "solution_item_1": "Plataforma unificada para todos los procesos financieros",
      "solution_item_2": "Pronósticos financieros impulsados por IA",
      "solution_item_3": "Reportes automatizados",
      "solution_item_4": "Colaboración en tiempo real entre equipos",
      "results_title": "Los Resultados",
      "time_saved_label": "Tiempo ahorrado",
      "platform_label": "Plataforma unificada",
      "customers_label": "Clientes en todo el mundo",
      "testimonial_quote": "Migrar a AI Concept Builder fue la mejor decisión para nuestra empresa. Nuestros equipos son más productivos y satisfechos que nunca.",
      "testimonial_author": "- Grant Halloran, CEO Planful"
    },
    "customer_stories": {
      "title": "Historias de éxito de nuestros emprendedores",
      "subtitle": "Más de 500 emprendedores ya han comenzado exitosamente con el AI Concept Builder",
      "stats": {
        "leading_companies": "Empresas líderes usan AI Concept Builder (G2)",
        "top_rated": "#1 herramienta IA mejor calificada para emprendedores (G2)",
        "yc_companies": "Más del 50% de las empresas YC",
        "community_members": "1.4M+ miembros de la comunidad"
      },
      "testimonial_1": {
        "quote": "Flujos de trabajo optimizados para reducir los plazos en 3x."
      },
      "testimonial_2": {
        "quote": "Con AI Concept Builder, cada persona en Ramp tiene un asistente de IA."
      },
      "testimonial_3": {
        "quote": "AI Concept Builder entiende que puedes resolver muchos problemas con una herramienta."
      },
      "testimonial_4": {
        "quote": "AI Concept Builder fue la forma más poderosa e impactante de optimizar nuestro flujo de trabajo."
      },
      "testimonial_5": {
        "quote": "Alguien podría unirse a Deel e incorporarse sin ninguna capacitación."
      },
      "testimonial_6": {
        "quote": "De seis aplicaciones a una: Escalando más rápido con todos los equipos en AI Concept Builder."
      }
    },
    "readiness_check": {
      "title": "Tu prueba personal de preparación emprendedora",
      "subtitle": "Responde 5 preguntas específicas y recibe una evaluación fundamentada de tu madurez emprendedora más un plan de acción personalizado.",
      "question_1_of_5": "Pregunta 1 de 5",
      "question_2_of_5": "Pregunta 2 de 5",
      "question_3_of_5": "Pregunta 3 de 5",
      "question_4_of_5": "Pregunta 4 de 5",
      "question_5_of_5": "Pregunta 5 de 5",
      "progress_text": "Progreso: {{current}} de 5 preguntas",
      "estimated_time": "Tiempo estimado: {{seconds}} segundos restantes",
      "q1": {
        "title": "¿Qué tan claro está definido tu modelo de negocio?",
        "option1_title": "Cristalino",
        "option1_desc": "Sé exactamente qué vendo, a quién y cómo gano dinero",
        "option2_title": "Dirección general",
        "option2_desc": "La idea está establecida, pero los detalles aún deben elaborarse",
        "option3_title": "Todavía vago",
        "option3_desc": "Tengo una idea, pero todavía estoy al principio del desarrollo"
      },
      "q2": {
        "title": "¿Ya has validado tu idea de negocio?",
        "option1_title": "Sí, con clientes reales",
        "option1_desc": "Ya he hablado con clientes potenciales o hecho primeras ventas",
        "option2_title": "Investigación de mercado hecha",
        "option2_desc": "He realizado encuestas y analizado datos del mercado",
        "option3_title": "Sin validación aún",
        "option3_desc": "Me baso en mi evaluación y experiencia"
      },
      "q3": {
        "title": "¿Cómo está tu situación financiera?",
        "option1_title": "Asegurada",
        "option1_desc": "Capital propio disponible o inversores/préstamos confirmados",
        "option2_title": "Parcialmente aclarada",
        "option2_desc": "La financiación básica está establecida, pero se necesitan más fondos",
        "option3_title": "En planificación",
        "option3_desc": "Todavía estoy investigando subvenciones y opciones de financiación",
        "option4_title": "Todavía abierta",
        "option4_desc": "La financiación todavía está completamente sin aclarar"
      },
      "q4": {
        "title": "¿Qué competencias empresariales aportas?",
        "option1_title": "Empresario experimentado",
        "option1_desc": "Ya he fundado con éxito o tengo experiencia de liderazgo",
        "option2_title": "Experiencia profesional relevante",
        "option2_desc": "Conozco bien la industria y tengo experiencia técnica",
        "option3_title": "Cambio de carrera con potencial",
        "option3_desc": "Estoy motivado y dispuesto a aprender, pero sin experiencia directa"
      },
      "q5": {
        "title": "¿Cuándo planeas la implementación concreta?",
        "option1_title": "Inmediatamente",
        "option1_desc": "Estoy listo y quiero empezar en las próximas 4 semanas",
        "option2_title": "En 1-3 meses",
        "option2_desc": "Me estoy preparando y planeo comenzar en el futuro cercano",
        "option3_title": "En 3-6 meses",
        "option3_desc": "Todavía necesito tiempo para preparación y planificación",
        "option4_title": "Más de 6 meses",
        "option4_desc": "Todavía es un proyecto a más largo plazo"
      },
      "results": {
        "points": "Puntos",
        "title_ready": "¡Estás listo para lanzarte!",
        "title_good": "¡Vas por buen camino!",
        "title_potential": "¡Tienes un gran potencial!",
        "title_early": "Todavía estás al principio",
        "level_high": "Alta madurez emprendedora",
        "level_medium": "Madurez emprendedora media",
        "level_low": "Potencial de desarrollo",
        "analysis_title": "Tu análisis detallado:",
        "next_steps_title": "Tus próximos pasos:",
        "get_action_plan": "Obtener plan de acción gratuito →",
        "download_pdf": "Descargar resultado como PDF",
        "restart_test": "Repetir la prueba",
        "analysis": {
          "business_model": {
            "strong": "Tu modelo de negocio está muy bien pensado. ¡Es una base sólida!",
            "medium": "Tu modelo de negocio tiene una dirección clara, pero aún faltan algunos detalles.",
            "weak": "Tu modelo de negocio necesita más claridad y estructura."
          },
          "validation": {
            "strong": "¡Excelente! Ya tienes retroalimentación del mercado, esto reduce significativamente tu riesgo.",
            "medium": "¡Bien! La investigación de mercado es un primer paso importante.",
            "weak": "Una validación del mercado te daría más confianza."
          },
          "financing": {
            "strong": "¡Perfecto! Con financiación asegurada, puedes concentrarte completamente en la implementación.",
            "partial": "¡Base sólida! Con financiación parcial, tienes un buen comienzo.",
            "planning": "Estás en el camino correcto. La planificación financiera es importante.",
            "weak": "La financiación debería convertirse en una de tus prioridades."
          },
          "experience": {
            "strong": "¡Tu experiencia es una gran ventaja para el éxito!",
            "medium": "Tu conocimiento del sector es valioso para tu proyecto.",
            "weak": "Como persona en reconversión profesional, aportas perspectivas frescas."
          },
          "timeline": {
            "immediate": "¡Tu determinación es impresionante!",
            "soon": "Un calendario realista muestra buena preparación.",
            "later": "Tómate el tiempo que necesites para una base sólida."
          }
        },
        "recommendations": {
          "high": [
            "Crea ahora tu plan de negocio detallado con nuestra herramienta de IA",
            "Asegura financiación con nuestro matching automático",
            "Comienza con la elección de forma jurídica y los trámites de constitución",
            "Usa nuestras plantillas de pitch deck para reuniones con inversores"
          ],
          "medium": [
            "Refina tu modelo de negocio con nuestro Business Model Canvas",
            "Realiza un análisis de mercado profesional",
            "Crea proyecciones financieras realistas",
            "Conéctate con otros fundadores en nuestra comunidad"
          ],
          "low": [
            "Usa nuestro asesor de IA para generar ideas",
            "Explora diferentes modelos de negocio en nuestra biblioteca",
            "Toma nuestro curso básico para fundadores",
            "Obtén consultoría personalizada para una hoja de ruta clara"
          ]
        },
        "download": {
          "title": "RESULTADO DE LA PRUEBA DE PREPARACIÓN EMPRENDEDORA",
          "total_score": "Puntuación total",
          "readiness_level": "Nivel de preparación",
          "your_analysis": "Tu análisis",
          "next_steps": "Tus próximos pasos",
          "created_on": "Creado el",
          "footer_text": "KI Konzept Builder - Tu socio para el emprendimiento exitoso"
        }
      }
    },
    "onboarding": {
      "title": "Comienza tu viaje emprendedor ahora",
      "subtitle": "Cuéntanos sobre tu idea de negocio y crearemos un plan personalizado para ti.",
      "steps": {
        "1": {
          "title": "Completar formulario",
          "desc": "Comparte tu idea con nosotros"
        },
        "2": {
          "title": "Email de incorporación",
          "desc": "Captura detallada de tus planes"
        },
        "3": {
          "title": "Análisis IA",
          "desc": "Evaluación inicial gratuita"
        },
        "4": {
          "title": "Llamada de consulta",
          "desc": "Oferta individual"
        }
      },
      "form": {
        "name": "Nombre",
        "name_placeholder": "Juan Pérez",
        "email": "Correo electrónico",
        "email_placeholder": "juan@ejemplo.com",
        "phone": "Teléfono",
        "phone_placeholder": "+34 123 456789",
        "country": "País",
        "country_placeholder": "Por favor selecciona...",
        "business_idea": "Idea de negocio",
        "business_idea_placeholder": "Describe brevemente tu idea de negocio...",
        "phase": "Fase de inicio",
        "phase_placeholder": "Por favor selecciona...",
        "phase_idea": "Fase de idea",
        "phase_concept": "Fase de concepto",
        "phase_founding": "Fase de fundación",
        "phase_growth": "Fase de crecimiento",
        "submit": "Solicitar consulta gratuita →",
        "country_germany": "Alemania",
        "country_austria": "Austria",
        "country_switzerland": "Suiza",
        "country_liechtenstein": "Liechtenstein",
        "country_luxembourg": "Luxemburgo",
        "country_france": "Francia",
        "country_italy": "Italia",
        "country_spain": "España",
        "country_netherlands": "Países Bajos",
        "country_belgium": "Bélgica",
        "country_poland": "Polonia",
        "country_czech": "República Checa",
        "country_uk": "Reino Unido",
        "country_usa": "Estados Unidos",
        "country_other": "Otro país",
        "no_credit_card": "No se requiere tarjeta de crédito • 100% gratis y sin compromiso"
      },
      "benefits": {
        "title": "🎁 Lo que recibirás:",
        "form": "Formulario de incorporación detallado por correo",
        "analysis": "✓ Análisis inicial gratuito de tu idea de negocio",
        "advisor": "✓ Asesor IA personal durante 7 días",
        "funding": "✓ Investigación inicial de financiación",
        "plan": "✓ Hoja de ruta individual para tu startup",
        "free_assessment": "Evaluación inicial gratuita y recomendaciones",
        "custom_package": "Paquete de consultoría personalizado"
      }
    },
    "security": {
      "title": "Seguridad y Privacidad",
      "gdpr": "Procesamiento de datos conforme al GDPR",
      "ssl": "Transmisión cifrada SSL",
      "german_servers": "Servidores y centros de datos alemanes",
      "no_third_party": "Sin compartir con terceros"
    },
    "project_status": {
      "finished": "✅ Terminado",
      "completed": "Completado",
      "api_release": "Lanzamiento API v2.0"
    },
    "software": {
      "all_tools": {
        "title": "Todas las herramientas para tu éxito",
        "subtitle": "Nuestro software te proporciona todo lo que necesitas para crear una startup exitosa.",
        "discover_all": "Descubrir todas las funciones →"
      },
      "roadmap": {
        "title": "Hoja de ruta pública",
        "beta_release": "Lanzamiento beta",
        "final_version": "Versión final",
        "status": "Estado",
        "updates": "Actualizaciones",
        "q1_2025": "T1 2025",
        "q2_2025": "T2 2025",
        "progress_65": "Progreso: 65%",
        "status": {
          "planned": "🔵 Planificado",
          "in_progress": "🟡 En progreso",
          "completed": "✅ Completado"
        },
        "features": {
          "drag_drop_ui": "Mejoras de interfaz de arrastrar y soltar",
          "ai_bmc": "Generación BMC basada en IA",
          "two_factor": "Autenticación de dos factores"
        }
      }
    },
    "roadmap": {
      "status": "Estado",
      "updates": "Actualizaciones",
      "q1_2025": "T1 2025",
      "q2_2025": "T2 2025",
      "progress_65": "Progreso: 65%",
      "status": {
        "planned": "🔵 Planificado",
        "in_progress": "🟡 En progreso",
        "completed": "✅ Completado"
      },
      "features": {
        "drag_drop_ui": "Mejoras de interfaz de arrastrar y soltar",
        "ai_bmc": "Generación BMC basada en IA",
        "two_factor": "Autenticación de dos factores"
      }
    },
    "faq": {
      "title": "Preguntas Frecuentes",
      "subtitle": "Todo lo que necesitas saber sobre el AI Concept Builder",
      "items": {
        "q1": {
          "question": "¿Qué es el AI Concept Builder?",
          "answer": "El AI Concept Builder es una plataforma todo-en-uno para emprendedores que combina consultoría asistida por IA, creación de planes de negocio, investigación de financiación y gestión de equipos en una herramienta."
        },
        "q2": {
          "question": "¿Cómo funciona la consultoría con IA?",
          "answer": "Nuestra IA ha sido especialmente entrenada para consultoría empresarial y puede ayudarte con todas las preguntas sobre la creación de tu negocio - desde la idea de negocio hasta la financiación."
        },
        "q3": {
          "question": "¿Es gratuito el servicio?",
          "answer": "Ofrecemos un análisis inicial gratuito y varios planes de precios para funcionalidades avanzadas. Los probadores beta obtienen 3 meses de acceso gratuito."
        },
        "q4": {
          "question": "¿Para quién es adecuada la plataforma?",
          "answer": "Nuestra plataforma es adecuada para todos los emprendedores - desde fundadores primerizos hasta emprendedores en serie. No importa en qué etapa de tu viaje emprendedor te encuentres."
        },
        "q5": {
          "question": "¿Qué tan seguros están mis datos?",
          "answer": "La protección de datos y la seguridad tienen la máxima prioridad. Todos los datos se transmiten cifrados y se almacenan en centros de datos alemanes."
        },
        "funding": {
          "question": "¿Qué financiaciones puedo encontrar a través de la plataforma?",
          "answer": "Tenemos una base de datos con más de 2,000 programas de financiación a nivel federal, estatal y de la UE. Nuestra IA hace coincidencias automáticas de tu idea de negocio con oportunidades de financiación adecuadas como EXIST, INVEST, préstamos KfW y subvenciones regionales."
        },
        "cost": {
          "question": "¿Es realmente gratuita la consultoría?",
          "answer": "Sí, la consultoría inicial y el análisis de IA son completamente gratuitos. Recibirás una evaluación detallada de tu idea de negocio y recomendaciones adecuadas. Solo surgen costos para consultoría personal adicional, que se comunican de manera transparente."
        },
        "security": {
          "question": "¿Qué tan seguros están mis datos?",
          "answer": "Tomamos la protección de datos muy en serio. Todos los datos se transmiten cifrados y se almacenan en centros de datos alemanes según los estándares GDPR. Tu idea de negocio y planes están protegidos por tecnologías de seguridad modernas."
        },
        "offline": {
          "question": "¿Puedo trabajar también en el plan de negocio sin conexión?",
          "answer": "Sí, puedes exportar tu plan de negocio como PDF o documento Word en cualquier momento y editarlo sin conexión. Los cambios pueden luego integrarse de vuelta en la plataforma. Además, existe una función sin conexión para las características más importantes."
        },
        "timeline": {
          "question": "¿Cuánto tiempo toma ver resultados?",
          "answer": "El análisis de IA se completa en unos minutos. Recibirás un primer borrador del plan de negocio dentro de 24 horas. Para el desarrollo completo con coincidencias de financiación, deberías planificar 3-5 días."
        }
      }
    },
    "beta": {
      "limited_spots": "Plazas limitadas disponibles • Gratis durante la fase beta",
      "spots_counter": "43 de 50 plazas disponibles",
      "limited_offer": "⚡ Oferta limitada"
    },
    "footer": {
      "newsletter": {
        "title": "Mantente actualizado",
        "description": "Recibe las últimas actualizaciones, consejos e historias de éxito directamente en tu bandeja de entrada.",
        "email_placeholder": "Tu dirección de correo electrónico",
        "submit": "Suscribirse al boletín",
        "disclaimer": "Gratis • Cancelar en cualquier momento • Conforme al RGPD"
      },
      "company": {
        "title": "AI Concept Builder",
        "description": "El espacio de trabajo todo-en-uno para emprendedores exitosos. Desde la idea hasta la financiación."
      },
      "product": {
        "title": "Producto",
        "features": "Características",
        "beta_access": "Acceso beta",
        "pricing": "Precios"
      },
      "resources": {
        "title": "Recursos",
        "faq": "FAQ",
        "consultation": "Consultoría",
        "about": "Sobre mí",
        "contact": "Contacto"
      },
      "legal": {
        "title": "Legal",
        "imprint": "Aviso legal",
        "privacy": "Privacidad",
        "terms": "Términos"
      },
      "copyright": "© 2024 AI Concept Builder. Todos los derechos reservados."
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
      "new": "Nuovo",
      "in_development": "In sviluppo"
    },
    "story_modal": {
      "subtitle": "Startup di Marketing basato su IA",
      "main_quote": "C'è potere in una piattaforma unica che ti fa risparmiare tempo, conserva le risorse e offre comunque risultati che impressionano i tuoi investitori.",
      "challenge_title": "La Sfida",
      "challenge_content": "StartupBoost ha affrontato la sfida tipica di molte startup tecnologiche: Un'idea innovativa, ma nessuna struttura chiara per l'implementazione. Il team aveva bisogno di un business plan convincente per gli investitori, doveva trovare i giusti finanziamenti e contemporaneamente costruire il business operativo.",
      "solution_title": "La Soluzione con AI Concept Builder",
      "solution_item_1": "Business plan creato in 5 giorni invece di 5 settimane",
      "solution_item_2": "150.000€ di finanziamenti trovati tramite matching intelligente",
      "solution_item_3": "Pitch per investitori perfezionato con supporto IA",
      "solution_item_4": "Analisi di mercato automatizzata e validata",
      "results_title": "I Risultati",
      "revenue_label": "Fatturato dopo 12 mesi",
      "funding_label": "Finanziamento totale",
      "team_label": "Team cresciuto a",
      "testimonial_quote": "L'AI Concept Builder è stato un punto di svolta per noi. Abbiamo potuto concentrarci sul nostro prodotto mentre la piattaforma ci supportava con tutte le questioni organizzative. Il risparmio di tempo è stato inestimabile.",
      "testimonial_author": "Lisa Chen, CEO StartupBoost",
      "cta_text": "Inizia anche tu la tua storia di successo con l'AI Concept Builder."
    },
    "techcraft_modal": {
      "subtitle": "Sviluppo Software e Consulenza",
      "main_quote": "L'AI Concept Builder ha rivoluzionato i nostri flussi di lavoro. Siamo riusciti a ridurre i tempi di progetto del 70% aumentando la qualità.",
      "challenge_title": "La Sfida",
      "challenge_content": "TechCraft ha affrontato la sfida di scalare i propri processi di sviluppo mantenendo l'alta qualità. Con un team in crescita e progetti più complessi, il coordinamento diventava sempre più difficile.",
      "solution_title": "La Soluzione con AI Concept Builder",
      "solution_item_1": "Pianificazione progetti automatizzata e allocazione risorse",
      "solution_item_2": "Code review e controllo qualità supportati da IA",
      "solution_item_3": "Documentazione integrata e gestione della conoscenza",
      "solution_item_4": "Collaborazione in tempo reale per team remoti",
      "results_title": "I Risultati",
      "productivity_label": "Aumento produttività",
      "quality_label": "Meno bug",
      "revenue_label": "Fatturato annuale",
      "testimonial_quote": "L'implementazione dell'AI Concept Builder è stata un punto di svolta per la nostra azienda. Ora possiamo assumere progetti che prima sarebbero stati impossibili.",
      "testimonial_author": "- Marcus Weber, CTO TechCraft"
    },
    "ramp_modal": {
      "subtitle": "Automazione Finanziaria per Aziende",
      "main_quote": "Con AI Concept Builder, ogni persona in Ramp ha un assistente IA personale che trasforma il suo lavoro.",
      "challenge_title": "La Sfida",
      "challenge_content": "Come azienda FinTech in rapida crescita, Ramp doveva ottimizzare costantemente i suoi processi interni mentre sviluppava nuove funzionalità per i clienti. L'equilibrio tra innovazione ed eccellenza operativa era critico.",
      "solution_title": "La Soluzione con AI Concept Builder",
      "solution_item_1": "Analisi finanziarie automatizzate e reporting",
      "solution_item_2": "Servizio clienti e supporto alimentato da IA",
      "solution_item_3": "Ottimizzazione intelligente dei processi",
      "solution_item_4": "Dashboard personalizzate per dipendenti",
      "results_title": "I Risultati",
      "employees_label": "Dipendenti con supporto IA",
      "efficiency_label": "Aumento efficienza",
      "valuation_label": "Valutazione aziendale",
      "testimonial_quote": "L'AI Concept Builder non è solo uno strumento - è un partner strategico che ci aiuta a crescere più velocemente e intelligentemente.",
      "testimonial_author": "- Karim Atiyeh, CTO Ramp"
    },
    "vercel_modal": {
      "subtitle": "Piattaforma di Infrastruttura Frontend",
      "main_quote": "AI Concept Builder capisce che i team moderni hanno bisogno di una piattaforma unificata per realizzare la loro visione.",
      "challenge_title": "La Sfida",
      "challenge_content": "Vercel doveva migliorare continuamente la sua developer experience mentre scalava l'infrastruttura per milioni di deployment. La sfida era ridurre la complessità senza perdere flessibilità.",
      "solution_title": "La Soluzione con AI Concept Builder",
      "solution_item_1": "Ottimizzazione automatizzata delle performance",
      "solution_item_2": "Strategie di deployment alimentate da IA",
      "solution_item_3": "Diagnosi e risoluzione intelligente degli errori",
      "solution_item_4": "Scaling predittivo e gestione risorse",
      "results_title": "I Risultati",
      "deployments_label": "Deployment/mese",
      "uptime_label": "Uptime",
      "latency_label": "Latenza media",
      "testimonial_quote": "Con l'AI Concept Builder, siamo finalmente riusciti a realizzare completamente la nostra visione di una developer experience perfetta.",
      "testimonial_author": "- Guillermo Rauch, CEO Vercel"
    },
    "matchgroup_modal": {
      "subtitle": "Leader Globale nella Tecnologia del Dating",
      "main_quote": "AI Concept Builder è stato il modo più potente ed efficace per trasformare il nostro workflow globale.",
      "challenge_title": "La Sfida",
      "challenge_content": "Con oltre 45 app di dating in tutto il mondo, MatchGroup ha affrontato la sfida di fornire esperienze utente coerenti considerando le esigenze locali del mercato. Il coordinamento tra i team era complesso.",
      "solution_title": "La Soluzione con AI Concept Builder",
      "solution_item_1": "Sviluppo prodotto centralizzato con flessibilità locale",
      "solution_item_2": "Algoritmi di matching utenti alimentati da IA",
      "solution_item_3": "Test A/B automatizzati e ottimizzazione",
      "solution_item_4": "Analytics e insights cross-platform",
      "results_title": "I Risultati",
      "users_label": "Utenti attivi",
      "brands_label": "Brand di dating",
      "revenue_label": "Fatturato annuale",
      "testimonial_quote": "L'implementazione dell'AI Concept Builder ha rivoluzionato il nostro sviluppo prodotto e ci ha aiutato a creare connessioni migliori per milioni di persone.",
      "testimonial_author": "- Sharmeen Browarek, CEO MatchGroup"
    },
    "deel_modal": {
      "subtitle": "Piattaforma Globale Payroll e Compliance",
      "main_quote": "Qualcuno potrebbe unirsi a Deel e integrarsi senza alcuna formazione - grazie ad AI Concept Builder.",
      "challenge_title": "La Sfida",
      "challenge_content": "Come una delle piattaforme HR tech in più rapida crescita, Deel doveva scalare costantemente i suoi processi garantendo la compliance in oltre 150 paesi. La complessità era enorme.",
      "solution_title": "La Soluzione con AI Concept Builder",
      "solution_item_1": "Verifiche di compliance automatizzate in tutto il mondo",
      "solution_item_2": "Onboarding alimentato da IA per nuovi dipendenti",
      "solution_item_3": "Gestione intelligente dei documenti",
      "solution_item_4": "Sistemi di supporto auto-apprendenti",
      "results_title": "I Risultati",
      "companies_label": "Aziende",
      "countries_label": "Paesi",
      "valuation_label": "Valutazione",
      "testimonial_quote": "L'AI Concept Builder ci ha permesso di gestire la nostra crescita iperveloce migliorando la qualità del nostro servizio.",
      "testimonial_author": "- Alex Bouaziz, CEO Deel"
    },
    "planful_modal": {
      "subtitle": "Gestione delle Performance Finanziarie",
      "main_quote": "Da sei app diverse a una singola piattaforma - AI Concept Builder ha rivoluzionato il nostro modo di lavorare.",
      "challenge_title": "La Sfida",
      "challenge_content": "I team di Planful lavoravano con vari strumenti per pianificazione, reporting e analisi. La mancanza di integrazione portava a inefficienze e dati incoerenti.",
      "solution_title": "La Soluzione con AI Concept Builder",
      "solution_item_1": "Piattaforma unificata per tutti i processi finanziari",
      "solution_item_2": "Previsioni finanziarie alimentate da IA",
      "solution_item_3": "Reporting automatizzato",
      "solution_item_4": "Collaborazione in tempo reale tra team",
      "results_title": "I Risultati",
      "time_saved_label": "Tempo risparmiato",
      "platform_label": "Piattaforma unificata",
      "customers_label": "Clienti in tutto il mondo",
      "testimonial_quote": "La migrazione ad AI Concept Builder è stata la decisione migliore per la nostra azienda. I nostri team sono più produttivi e soddisfatti che mai.",
      "testimonial_author": "- Grant Halloran, CEO Planful"
    },
    "customer_stories": {
      "title": "Storie di successo dei nostri imprenditori",
      "subtitle": "Oltre 500 imprenditori hanno già iniziato con successo con l'AI Concept Builder",
      "stats": {
        "leading_companies": "Aziende leader usano AI Concept Builder (G2)",
        "top_rated": "#1 strumento IA più votato per imprenditori (G2)",
        "yc_companies": "Oltre il 50% delle aziende YC",
        "community_members": "1.4M+ membri della comunità"
      },
      "testimonial_1": {
        "quote": "Flussi di lavoro ottimizzati per ridurre le tempistiche di 3x."
      },
      "testimonial_2": {
        "quote": "Con AI Concept Builder, ogni persona in Ramp ha un assistente IA."
      },
      "testimonial_3": {
        "quote": "AI Concept Builder capisce che puoi risolvere molti problemi con uno strumento."
      },
      "testimonial_4": {
        "quote": "AI Concept Builder è stato il modo più potente ed efficace per ottimizzare il nostro flusso di lavoro."
      },
      "testimonial_5": {
        "quote": "Qualcuno potrebbe unirsi a Deel e integrarsi senza alcuna formazione."
      },
      "testimonial_6": {
        "quote": "Da sei app a una: scalare più velocemente con tutti i team su AI Concept Builder."
      }
    },
    "readiness_check": {
      "title": "Il tuo test personale di preparazione imprenditoriale",
      "subtitle": "Rispondi a 5 domande mirate e ricevi una valutazione fondata della tua maturità imprenditoriale più un piano d'azione personalizzato.",
      "question_1_of_5": "Domanda 1 di 5",
      "question_2_of_5": "Domanda 2 di 5",
      "question_3_of_5": "Domanda 3 di 5",
      "question_4_of_5": "Domanda 4 di 5",
      "question_5_of_5": "Domanda 5 di 5",
      "progress_text": "Progresso: {{current}} di 5 domande",
      "estimated_time": "Tempo stimato: ancora {{seconds}} secondi",
      "q1": {
        "title": "Quanto è definito il tuo modello di business?",
        "option1_title": "Cristallino",
        "option1_desc": "So esattamente cosa vendo, a chi e come guadagno",
        "option2_title": "Direzione generale",
        "option2_desc": "L'idea è stabilita, ma i dettagli devono ancora essere elaborati",
        "option3_title": "Ancora vago",
        "option3_desc": "Ho un'idea, ma sono ancora all'inizio dello sviluppo"
      },
      "q2": {
        "title": "Hai già validato la tua idea di business?",
        "option1_title": "Sì, con clienti reali",
        "option1_desc": "Ho già parlato con potenziali clienti o fatto prime vendite",
        "option2_title": "Ricerca di mercato fatta",
        "option2_desc": "Ho condotto sondaggi e analizzato i dati di mercato",
        "option3_title": "Ancora nessuna validazione",
        "option3_desc": "Mi baso sulla mia valutazione ed esperienza"
      },
      "q3": {
        "title": "Com'è la tua situazione finanziaria?",
        "option1_title": "Assicurata",
        "option1_desc": "Capitale proprio disponibile o investitori/prestiti confermati",
        "option2_title": "Parzialmente chiarita",
        "option2_desc": "Il finanziamento di base è stabilito, ma sono necessari ulteriori fondi",
        "option3_title": "In pianificazione",
        "option3_desc": "Sto ancora ricercando sovvenzioni e opzioni di finanziamento",
        "option4_title": "Ancora aperta",
        "option4_desc": "Il finanziamento è ancora completamente poco chiaro"
      },
      "q4": {
        "title": "Quali competenze imprenditoriali porti?",
        "option1_title": "Imprenditore esperto",
        "option1_desc": "Ho già fondato con successo o ho esperienza di leadership",
        "option2_title": "Esperienza professionale rilevante",
        "option2_desc": "Conosco bene il settore e ho competenze tecniche",
        "option3_title": "Cambio carriera con potenziale",
        "option3_desc": "Sono motivato e desideroso di imparare, ma senza esperienza diretta"
      },
      "q5": {
        "title": "Quando pianifichi l'implementazione concreta?",
        "option1_title": "Immediatamente",
        "option1_desc": "Sono pronto e voglio iniziare entro le prossime 4 settimane",
        "option2_title": "In 1-3 mesi",
        "option2_desc": "Mi sto preparando e pianifico di iniziare nel prossimo futuro",
        "option3_title": "In 3-6 mesi",
        "option3_desc": "Ho ancora bisogno di tempo per la preparazione e la pianificazione",
        "option4_title": "Più di 6 mesi",
        "option4_desc": "È ancora un progetto a più lungo termine"
      },
      "results": {
        "points": "Punti",
        "title_ready": "Sei pronto per partire!",
        "title_good": "Sei sulla strada giusta!",
        "title_potential": "Hai un grande potenziale!",
        "title_early": "Sei ancora all'inizio",
        "level_high": "Alta maturità imprenditoriale",
        "level_medium": "Media maturità imprenditoriale",
        "level_low": "Potenziale di sviluppo",
        "analysis_title": "La tua analisi dettagliata:",
        "next_steps_title": "I tuoi prossimi passi:",
        "get_action_plan": "Ottieni piano d'azione gratuito →",
        "download_pdf": "Scarica risultato come PDF",
        "restart_test": "Ripeti il test",
        "analysis": {
          "business_model": {
            "strong": "Il tuo modello di business è molto ben pensato. È una base solida!",
            "medium": "Il tuo modello di business ha una direzione chiara, ma mancano ancora alcuni dettagli.",
            "weak": "Il tuo modello di business ha bisogno di più chiarezza e struttura."
          },
          "validation": {
            "strong": "Eccellente! Hai già feedback dal mercato – questo riduce significativamente il tuo rischio.",
            "medium": "Bene! La ricerca di mercato è un primo passo importante.",
            "weak": "Una validazione del mercato ti darebbe più sicurezza."
          },
          "financing": {
            "strong": "Perfetto! Con finanziamenti assicurati, puoi concentrarti completamente sull'implementazione.",
            "partial": "Base solida! Con finanziamenti parziali, hai un buon inizio.",
            "planning": "Sei sulla strada giusta. La pianificazione finanziaria è importante.",
            "weak": "Il finanziamento dovrebbe diventare una delle tue priorità."
          },
          "experience": {
            "strong": "La tua esperienza è un grande vantaggio per il successo!",
            "medium": "La tua conoscenza del settore è preziosa per il tuo progetto.",
            "weak": "Come persona in riconversione professionale, porti prospettive fresche."
          },
          "timeline": {
            "immediate": "La tua determinazione è impressionante!",
            "soon": "Un calendario realistico mostra una buona preparazione.",
            "later": "Prenditi il tempo necessario per una base solida."
          }
        },
        "recommendations": {
          "high": [
            "Crea ora il tuo business plan dettagliato con il nostro strumento IA",
            "Assicura finanziamenti con il nostro matching automatico",
            "Inizia con la scelta della forma giuridica e le formalità di costituzione",
            "Usa i nostri modelli di pitch deck per gli incontri con gli investitori"
          ],
          "medium": [
            "Perfeziona il tuo modello di business con il nostro Business Model Canvas",
            "Conduci un'analisi di mercato professionale",
            "Crea proiezioni finanziarie realistiche",
            "Connettiti con altri fondatori nella nostra community"
          ],
          "low": [
            "Usa il nostro consulente IA per la generazione di idee",
            "Esplora diversi modelli di business nella nostra biblioteca",
            "Segui il nostro corso base per fondatori",
            "Ottieni consulenza personalizzata per una roadmap chiara"
          ]
        },
        "download": {
          "title": "RISULTATO DEL TEST DI PREPARAZIONE IMPRENDITORIALE",
          "total_score": "Punteggio totale",
          "readiness_level": "Livello di preparazione",
          "your_analysis": "La tua analisi",
          "next_steps": "I tuoi prossimi passi",
          "created_on": "Creato il",
          "footer_text": "KI Konzept Builder - Il tuo partner per l'imprenditoria di successo"
        }
      }
    },
    "onboarding": {
      "title": "Inizia ora il tuo viaggio imprenditoriale",
      "subtitle": "Raccontaci la tua idea di business e creeremo un piano personalizzato per te.",
      "steps": {
        "1": {
          "title": "Compila il modulo",
          "desc": "Condividi la tua idea con noi"
        },
        "2": {
          "title": "Email di onboarding",
          "desc": "Acquisizione dettagliata dei tuoi piani"
        },
        "3": {
          "title": "Analisi IA",
          "desc": "Valutazione iniziale gratuita"
        },
        "4": {
          "title": "Chiamata di consulenza",
          "desc": "Offerta individuale"
        }
      },
      "form": {
        "name": "Nome",
        "name_placeholder": "Mario Rossi",
        "email": "Email",
        "email_placeholder": "mario@esempio.it",
        "phone": "Telefono",
        "phone_placeholder": "+39 123 456789",
        "country": "Paese",
        "country_placeholder": "Seleziona...",
        "business_idea": "Idea di business",
        "business_idea_placeholder": "Descrivi brevemente la tua idea di business...",
        "phase": "Fase di avvio",
        "phase_placeholder": "Seleziona...",
        "phase_idea": "Fase ideale",
        "phase_concept": "Fase concettuale",
        "phase_founding": "Fase di fondazione",
        "phase_growth": "Fase di crescita",
        "submit": "Richiedi consulenza gratuita →",
        "country_germany": "Germania",
        "country_austria": "Austria",
        "country_switzerland": "Svizzera",
        "country_liechtenstein": "Liechtenstein",
        "country_luxembourg": "Lussemburgo",
        "country_france": "Francia",
        "country_italy": "Italia",
        "country_spain": "Spagna",
        "country_netherlands": "Paesi Bassi",
        "country_belgium": "Belgio",
        "country_poland": "Polonia",
        "country_czech": "Repubblica Ceca",
        "country_uk": "Regno Unito",
        "country_usa": "Stati Uniti",
        "country_other": "Altro paese",
        "no_credit_card": "Nessuna carta di credito richiesta • 100% gratuito e senza impegno"
      },
      "benefits": {
        "title": "🎁 Cosa riceverai:",
        "form": "Modulo di onboarding dettagliato via email",
        "analysis": "✓ Analisi iniziale gratuita della tua idea di business",
        "advisor": "✓ Consulente IA personale per 7 giorni",
        "funding": "✓ Ricerca iniziale di finanziamenti",
        "plan": "✓ Roadmap individuale per la tua startup",
        "free_assessment": "Valutazione iniziale gratuita e raccomandazioni",
        "custom_package": "Pacchetto di consulenza personalizzato"
      }
    },
    "security": {
      "title": "Sicurezza e Privacy",
      "gdpr": "Trattamento dati conforme al GDPR",
      "ssl": "Trasmissione crittografata SSL",
      "german_servers": "Server e data center tedeschi",
      "no_third_party": "Nessuna condivisione con terze parti"
    },
    "project_status": {
      "finished": "✅ Terminato",
      "completed": "Completato",
      "api_release": "Rilascio API v2.0"
    },
    "software": {
      "all_tools": {
        "title": "Tutti gli strumenti per il tuo successo",
        "subtitle": "Il nostro software ti fornisce tutto ciò di cui hai bisogno per creare una startup di successo.",
        "discover_all": "Scopri tutte le funzionalità →"
      },
      "roadmap": {
        "title": "Roadmap pubblica",
        "beta_release": "Rilascio beta",
        "final_version": "Versione finale",
        "status": "Stato",
        "updates": "Aggiornamenti",
        "q1_2025": "T1 2025",
        "q2_2025": "T2 2025",
        "progress_65": "Progresso: 65%",
        "status": {
          "planned": "🔵 Pianificato",
          "in_progress": "🟡 In corso",
          "completed": "✅ Completato"
        },
        "features": {
          "drag_drop_ui": "Miglioramenti UI drag-and-drop",
          "ai_bmc": "Generazione BMC basata su IA",
          "two_factor": "Autenticazione a due fattori"
        }
      }
    },
    "roadmap": {
      "status": "Stato",
      "updates": "Aggiornamenti",
      "q1_2025": "T1 2025",
      "q2_2025": "T2 2025",
      "progress_65": "Progresso: 65%",
      "status": {
        "planned": "🔵 Pianificato",
        "in_progress": "🟡 In corso",
        "completed": "✅ Completato"
      },
      "features": {
        "drag_drop_ui": "Miglioramenti UI drag-and-drop",
        "ai_bmc": "Generazione BMC basata su IA",
        "two_factor": "Autenticazione a due fattori"
      }
    },
    "faq": {
      "title": "Domande Frequenti",
      "subtitle": "Tutto quello che devi sapere sull'AI Concept Builder",
      "items": {
        "q1": {
          "question": "Cos'è l'AI Concept Builder?",
          "answer": "L'AI Concept Builder è una piattaforma tutto-in-uno per imprenditori che combina consulenza assistita da IA, creazione di business plan, ricerca di finanziamenti e gestione del team in un unico strumento."
        },
        "q2": {
          "question": "Come funziona la consulenza IA?",
          "answer": "La nostra IA è stata appositamente addestrata per la consulenza aziendale e può aiutarti con tutte le domande sulla creazione della tua attività - dall'idea di business al finanziamento."
        },
        "q3": {
          "question": "Il servizio è gratuito?",
          "answer": "Offriamo un'analisi iniziale gratuita e vari piani tariffari per funzionalità avanzate. I beta tester ottengono 3 mesi di accesso gratuito."
        },
        "q4": {
          "question": "Per chi è adatta la piattaforma?",
          "answer": "La nostra piattaforma è adatta a tutti gli imprenditori - dai fondatori alle prime armi agli imprenditori seriali. Non importa in quale fase del tuo percorso imprenditoriale ti trovi."
        },
        "q5": {
          "question": "Quanto sono sicuri i miei dati?",
          "answer": "La protezione dei dati e la sicurezza hanno la massima priorità. Tutti i dati vengono trasmessi crittografati e archiviati in centri dati tedeschi."
        },
        "funding": {
          "question": "Quali finanziamenti posso trovare attraverso la piattaforma?",
          "answer": "Abbiamo un database con oltre 2.000 programmi di finanziamento a livello federale, statale e UE. La nostra IA abbina automaticamente la tua idea di business con opportunità di finanziamento adeguate come EXIST, INVEST, prestiti KfW e sovvenzioni regionali."
        },
        "cost": {
          "question": "La consulenza è davvero gratuita?",
          "answer": "Sì, la consulenza iniziale e l'analisi IA sono completamente gratuite. Riceverai una valutazione dettagliata della tua idea di business e raccomandazioni appropriate. I costi sorgono solo per consulenza personale aggiuntiva, che viene comunicata in modo trasparente."
        },
        "security": {
          "question": "Quanto sono sicuri i miei dati?",
          "answer": "Prendiamo la protezione dei dati molto seriamente. Tutti i dati vengono trasmessi crittografati e archiviati in centri dati tedeschi secondo gli standard GDPR. La tua idea di business e i tuoi piani sono protetti da tecnologie di sicurezza moderne."
        },
        "offline": {
          "question": "Posso lavorare anche sul business plan offline?",
          "answer": "Sì, puoi esportare il tuo business plan come PDF o documento Word in qualsiasi momento e modificarlo offline. Le modifiche possono poi essere integrate nuovamente nella piattaforma. Inoltre, esiste una funzione offline per le caratteristiche più importanti."
        },
        "timeline": {
          "question": "Quanto tempo ci vuole per vedere i risultati?",
          "answer": "L'analisi IA è completata in pochi minuti. Riceverai una prima bozza del business plan entro 24 ore. Per lo sviluppo completo con matching dei finanziamenti, dovresti pianificare 3-5 giorni."
        }
      }
    },
    "beta": {
      "limited_spots": "Posti limitati disponibili • Gratuito durante la fase beta",
      "spots_counter": "43 di 50 posti disponibili",
      "limited_offer": "⚡ Offerta limitata"
    },
    "footer": {
      "newsletter": {
        "title": "Resta aggiornato",
        "description": "Ricevi gli ultimi aggiornamenti, consigli e storie di successo direttamente nella tua casella di posta.",
        "email_placeholder": "Il tuo indirizzo email",
        "submit": "Iscriviti alla newsletter",
        "disclaimer": "Gratuito • Annulla in qualsiasi momento • Conforme al GDPR"
      },
      "company": {
        "title": "AI Concept Builder",
        "description": "Lo spazio di lavoro tutto-in-uno per imprenditori di successo. Dall'idea al finanziamento."
      },
      "product": {
        "title": "Prodotto",
        "features": "Caratteristiche",
        "beta_access": "Accesso beta",
        "pricing": "Prezzi"
      },
      "resources": {
        "title": "Risorse",
        "faq": "FAQ",
        "consultation": "Consulenza",
        "about": "Chi sono",
        "contact": "Contatto"
      },
      "legal": {
        "title": "Legale",
        "imprint": "Impressum",
        "privacy": "Privacy",
        "terms": "Termini"
      },
      "copyright": "© 2024 AI Concept Builder. Tutti i diritti riservati."
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