/**
 * Businessplan Templates
 * Contains all business plan templates and their chapter structures
 */

// Business Plan Templates
const businessPlanTemplates = {
    startup: {
        name: "Startup / Tech",
        description: "Für innovative Startups und Technologieunternehmen",
        chapters: [
            {
                id: "executive-summary",
                title: "Executive Summary",
                description: "Zusammenfassung des Businessplans",
                sections: [
                    {
                        title: "Geschäftsidee",
                        description: "Beschreibe deine Geschäftsidee in 2-3 Sätzen",
                        type: "textarea",
                        placeholder: "Unser Startup entwickelt eine innovative Plattform für..."
                    },
                    {
                        title: "Zielgruppe",
                        description: "Wer ist deine Hauptzielgruppe?",
                        type: "input",
                        placeholder: "Tech-affine Unternehmen, Startups, Entwickler"
                    },
                    {
                        title: "USP (Unique Selling Proposition)",
                        description: "Was macht euer Produkt einzigartig?",
                        type: "textarea",
                        placeholder: "Unsere Lösung bietet als erste..."
                    },
                    {
                        title: "Finanzierungsbedarf",
                        description: "Wie viel Kapital benötigt ihr?",
                        type: "input",
                        placeholder: "€500.000"
                    }
                ]
            },
            {
                id: "company-description",
                title: "Unternehmenskonzept",
                description: "Detaillierte Beschreibung des Unternehmens",
                sections: [
                    {
                        title: "Mission Statement",
                        description: "Was ist die Mission eures Unternehmens?",
                        type: "textarea",
                        placeholder: "Unsere Mission ist es..."
                    },
                    {
                        title: "Vision",
                        description: "Wo seht ihr euer Unternehmen in 5 Jahren?",
                        type: "textarea",
                        placeholder: "In 5 Jahren werden wir..."
                    },
                    {
                        title: "Rechtsform",
                        description: "Welche Rechtsform hat euer Unternehmen?",
                        type: "select",
                        options: ["GmbH", "UG (haftungsbeschränkt)", "AG", "GbR", "Einzelunternehmen"]
                    },
                    {
                        title: "Standort",
                        description: "Wo ist euer Hauptsitz?",
                        type: "input",
                        placeholder: "Berlin, Deutschland"
                    },
                    {
                        title: "Gründungsteam",
                        description: "Wer sind die Gründer und Schlüsselpersonen?",
                        type: "textarea",
                        placeholder: "CEO: Max Mustermann (Background in...)"
                    }
                ]
            },
            {
                id: "market-analysis",
                title: "Marktanalyse",
                description: "Analyse des Zielmarktes",
                sections: [
                    {
                        title: "Marktgröße",
                        description: "Wie groß ist der adressierbare Markt?",
                        type: "textarea",
                        placeholder: "Der TAM (Total Addressable Market) beträgt..."
                    },
                    {
                        title: "Markttrends",
                        description: "Welche Trends beeinflussen euren Markt?",
                        type: "textarea",
                        placeholder: "Aktuelle Markttrends zeigen..."
                    },
                    {
                        title: "Zielkunden",
                        description: "Wer sind eure idealen Kunden?",
                        type: "textarea",
                        placeholder: "Unsere primären Zielkunden sind..."
                    },
                    {
                        title: "Customer Personas",
                        description: "Beschreibt eure wichtigsten Kundentypen",
                        type: "textarea",
                        placeholder: "Persona 1: Tech-Startup-Gründer, 25-35 Jahre..."
                    }
                ]
            },
            {
                id: "competitive-analysis",
                title: "Wettbewerbsanalyse",
                description: "Analyse der Konkurrenz",
                sections: [
                    {
                        title: "Hauptkonkurrenten",
                        description: "Wer sind eure direkten Konkurrenten?",
                        type: "textarea",
                        placeholder: "Konkurrent 1: [Name] - Stärken: ... Schwächen: ..."
                    },
                    {
                        title: "Competitive Advantage",
                        description: "Was ist euer Wettbewerbsvorteil?",
                        type: "textarea",
                        placeholder: "Unser Wettbewerbsvorteil liegt in..."
                    },
                    {
                        title: "SWOT-Analyse",
                        description: "Stärken, Schwächen, Chancen, Risiken",
                        type: "textarea",
                        placeholder: "Stärken: ...\nSchwächen: ...\nChancen: ...\nRisiken: ..."
                    }
                ]
            },
            {
                id: "product-service",
                title: "Produkt/Service",
                description: "Detaillierte Produktbeschreibung",
                sections: [
                    {
                        title: "Produktbeschreibung",
                        description: "Was ist euer Produkt/Service?",
                        type: "textarea",
                        placeholder: "Unser Produkt ist eine Software-Plattform..."
                    },
                    {
                        title: "Features & Funktionen",
                        description: "Welche Features bietet euer Produkt?",
                        type: "textarea",
                        placeholder: "Hauptfeatures:\n- Feature 1: ...\n- Feature 2: ..."
                    },
                    {
                        title: "MVP (Minimum Viable Product)",
                        description: "Was ist euer MVP?",
                        type: "textarea",
                        placeholder: "Unser MVP umfasst die Kernfunktionen..."
                    },
                    {
                        title: "Technologie-Stack",
                        description: "Welche Technologien nutzt ihr?",
                        type: "textarea",
                        placeholder: "Frontend: React, Backend: Node.js, Database: MongoDB..."
                    },
                    {
                        title: "Intellectual Property",
                        description: "Habt ihr Patente oder Schutzrechte?",
                        type: "textarea",
                        placeholder: "Patente: ...\nTrademarks: ...\nCopyright: ..."
                    }
                ]
            },
            {
                id: "marketing-sales",
                title: "Marketing & Vertrieb",
                description: "Marketing- und Vertriebsstrategie",
                sections: [
                    {
                        title: "Go-to-Market Strategie",
                        description: "Wie bringt ihr euer Produkt auf den Markt?",
                        type: "textarea",
                        placeholder: "Unsere Go-to-Market Strategie basiert auf..."
                    },
                    {
                        title: "Vertriebskanäle",
                        description: "Über welche Kanäle verkauft ihr?",
                        type: "textarea",
                        placeholder: "Primäre Vertriebskanäle:\n- Online-Plattform\n- Direktvertrieb..."
                    },
                    {
                        title: "Customer Acquisition",
                        description: "Wie gewinnt ihr Kunden?",
                        type: "textarea",
                        placeholder: "Kundenakquisition erfolgt durch..."
                    },
                    {
                        title: "Preismodell",
                        description: "Wie ist euer Pricing strukturiert?",
                        type: "textarea",
                        placeholder: "Preismodell: SaaS-Abonnement\n- Basic: €29/Monat\n- Pro: €99/Monat..."
                    }
                ]
            },
            {
                id: "operations",
                title: "Betrieb & Management",
                description: "Operative Struktur und Management",
                sections: [
                    {
                        title: "Organisationsstruktur",
                        description: "Wie ist euer Unternehmen organisiert?",
                        type: "textarea",
                        placeholder: "Organisationsstruktur:\n- CEO: ...\n- CTO: ...\n- CMO: ..."
                    },
                    {
                        title: "Key Personnel",
                        description: "Wer sind die Schlüsselpersonen?",
                        type: "textarea",
                        placeholder: "Schlüsselpersonen und deren Qualifikationen..."
                    },
                    {
                        title: "Entwicklungsplan",
                        description: "Wie entwickelt ihr euer Produkt weiter?",
                        type: "textarea",
                        placeholder: "Entwicklungsroadmap:\nQ1: ...\nQ2: ..."
                    },
                    {
                        title: "Skalierungsplan",
                        description: "Wie skaliert ihr euer Unternehmen?",
                        type: "textarea",
                        placeholder: "Skalierungsstrategie:\n- Jahr 1: ...\n- Jahr 2: ..."
                    }
                ]
            },
            {
                id: "financials",
                title: "Finanzplanung",
                description: "Finanzielle Prognosen und Planung",
                sections: [
                    {
                        title: "Umsatzprognose",
                        description: "Wie entwickelt sich euer Umsatz?",
                        type: "textarea",
                        placeholder: "Umsatzprognose:\nJahr 1: €...\nJahr 2: €...\nJahr 3: €..."
                    },
                    {
                        title: "Kostenstruktur",
                        description: "Welche Kosten habt ihr?",
                        type: "textarea",
                        placeholder: "Hauptkostenpositionen:\n- Personalkosten: €...\n- Technologie: €..."
                    },
                    {
                        title: "Break-Even-Analyse",
                        description: "Wann erreicht ihr die Rentabilität?",
                        type: "textarea",
                        placeholder: "Break-Even Point: Monat ...\nBegründung: ..."
                    },
                    {
                        title: "Finanzierungsbedarf",
                        description: "Wie viel Kapital benötigt ihr?",
                        type: "textarea",
                        placeholder: "Finanzierungsbedarf: €...\nVerwendung:\n- Produktentwicklung: €...\n- Marketing: €..."
                    },
                    {
                        title: "Exit-Strategie",
                        description: "Wie stellt ihr euch eine Exitstrategie vor?",
                        type: "textarea",
                        placeholder: "Mögliche Exit-Optionen:\n- IPO in Jahr ...\n- Acquisition durch..."
                    }
                ]
            },
            {
                id: "funding",
                title: "Finanzierung",
                description: "Finanzierungsrunden und Investoren",
                sections: [
                    {
                        title: "Finanzierungsstrategie",
                        description: "Wie finanziert ihr euer Wachstum?",
                        type: "textarea",
                        placeholder: "Finanzierungsstrategie:\nSeed-Runde: €...\nSeries A: €..."
                    },
                    {
                        title: "Investoren",
                        description: "Welche Investoren habt ihr im Blick?",
                        type: "textarea",
                        placeholder: "Ziel-Investoren:\n- VC-Fonds: ...\n- Business Angels: ..."
                    },
                    {
                        title: "Valuation",
                        description: "Wie bewertet ihr euer Unternehmen?",
                        type: "textarea",
                        placeholder: "Aktuelle Bewertung: €...\nBewertungsgrundlage: ..."
                    }
                ]
            },
            {
                id: "risks",
                title: "Risiken",
                description: "Identifizierung und Bewertung von Risiken",
                sections: [
                    {
                        title: "Hauptrisiken",
                        description: "Welche Risiken seht ihr?",
                        type: "textarea",
                        placeholder: "Hauptrisiken:\n1. Technische Risiken: ...\n2. Marktrisiken: ..."
                    },
                    {
                        title: "Risikominderung",
                        description: "Wie geht ihr mit diesen Risiken um?",
                        type: "textarea",
                        placeholder: "Risikomanagement:\n- Risiko 1: Maßnahme ...\n- Risiko 2: Maßnahme ..."
                    }
                ]
            },
            {
                id: "appendix",
                title: "Anhang",
                description: "Zusätzliche Dokumente und Informationen",
                sections: [
                    {
                        title: "Zusätzliche Dokumente",
                        description: "Welche Dokumente sind relevant?",
                        type: "textarea",
                        placeholder: "Anhang:\n- Marktforschungsstudien\n- Technische Spezifikationen\n- Verträge..."
                    }
                ]
            }
        ]
    },
    traditional: {
        name: "Klassisches Unternehmen",
        description: "Für traditionelle Geschäftsmodelle und etablierte Branchen",
        chapters: [
            {
                id: "executive-summary",
                title: "Zusammenfassung",
                description: "Überblick über das Unternehmen",
                sections: [
                    {
                        title: "Geschäftsidee",
                        description: "Beschreibe deine Geschäftsidee",
                        type: "textarea",
                        placeholder: "Unser Unternehmen wird..."
                    },
                    {
                        title: "Zielgruppe",
                        description: "Wer sind deine Kunden?",
                        type: "input",
                        placeholder: "Privatkunden, Unternehmen, lokale Betriebe"
                    },
                    {
                        title: "Alleinstellungsmerkmal",
                        description: "Was macht dich besonders?",
                        type: "textarea",
                        placeholder: "Unser Alleinstellungsmerkmal ist..."
                    },
                    {
                        title: "Kapitalbedarf",
                        description: "Wie viel Startkapital benötigst du?",
                        type: "input",
                        placeholder: "€100.000"
                    }
                ]
            },
            {
                id: "company-description",
                title: "Unternehmensbeschreibung",
                description: "Detaillierte Beschreibung des Unternehmens",
                sections: [
                    {
                        title: "Unternehmensgegenstand",
                        description: "Was ist der Gegenstand deines Unternehmens?",
                        type: "textarea",
                        placeholder: "Unser Unternehmen beschäftigt sich mit..."
                    },
                    {
                        title: "Rechtsform",
                        description: "Welche Rechtsform wählst du?",
                        type: "select",
                        options: ["Einzelunternehmen", "GbR", "GmbH", "UG (haftungsbeschränkt)", "OHG", "KG"]
                    },
                    {
                        title: "Standort",
                        description: "Wo wird dein Unternehmen ansässig sein?",
                        type: "input",
                        placeholder: "München, Deutschland"
                    },
                    {
                        title: "Gründerpersönlichkeit",
                        description: "Stelle dich als Gründer vor",
                        type: "textarea",
                        placeholder: "Mein Name ist... und ich bringe folgende Erfahrungen mit..."
                    }
                ]
            },
            {
                id: "market-analysis",
                title: "Marktanalyse",
                description: "Analyse des Zielmarktes",
                sections: [
                    {
                        title: "Marktbeschreibung",
                        description: "Beschreibe deinen Zielmarkt",
                        type: "textarea",
                        placeholder: "Der Markt für... ist charakterisiert durch..."
                    },
                    {
                        title: "Marktvolumen",
                        description: "Wie groß ist der Markt?",
                        type: "textarea",
                        placeholder: "Das Marktvolumen beträgt..."
                    },
                    {
                        title: "Zielkunden",
                        description: "Wer sind deine Kunden?",
                        type: "textarea",
                        placeholder: "Unsere Zielkunden sind..."
                    },
                    {
                        title: "Marktentwicklung",
                        description: "Wie entwickelt sich der Markt?",
                        type: "textarea",
                        placeholder: "Die Marktentwicklung zeigt..."
                    }
                ]
            },
            {
                id: "competitive-analysis",
                title: "Wettbewerbsanalyse",
                description: "Analyse der Konkurrenz",
                sections: [
                    {
                        title: "Konkurrenten",
                        description: "Wer sind deine Konkurrenten?",
                        type: "textarea",
                        placeholder: "Hauptkonkurrenten:\n1. [Name] - Stärken/Schwächen\n2. [Name] - Stärken/Schwächen"
                    },
                    {
                        title: "Wettbewerbsvorteil",
                        description: "Was ist dein Wettbewerbsvorteil?",
                        type: "textarea",
                        placeholder: "Unser Wettbewerbsvorteil besteht in..."
                    },
                    {
                        title: "Positionierung",
                        description: "Wie positionierst du dich im Markt?",
                        type: "textarea",
                        placeholder: "Unsere Positionierung ist..."
                    }
                ]
            },
            {
                id: "products-services",
                title: "Produkte/Dienstleistungen",
                description: "Beschreibung des Angebots",
                sections: [
                    {
                        title: "Leistungsangebot",
                        description: "Was bietest du an?",
                        type: "textarea",
                        placeholder: "Unser Leistungsangebot umfasst..."
                    },
                    {
                        title: "Produktportfolio",
                        description: "Welche Produkte/Services hast du?",
                        type: "textarea",
                        placeholder: "Produkt 1: ...\nProdukt 2: ...\nService 1: ..."
                    },
                    {
                        title: "Qualitätsmerkmale",
                        description: "Was zeichnet deine Qualität aus?",
                        type: "textarea",
                        placeholder: "Unsere Qualitätsmerkmale sind..."
                    },
                    {
                        title: "Preisgestaltung",
                        description: "Wie gestaltest du deine Preise?",
                        type: "textarea",
                        placeholder: "Preisgestaltung:\n- Produkt A: €...\n- Service B: €..."
                    }
                ]
            },
            {
                id: "marketing-sales",
                title: "Marketing & Vertrieb",
                description: "Marketing- und Vertriebsstrategie",
                sections: [
                    {
                        title: "Marketingstrategie",
                        description: "Wie vermarktest du dein Angebot?",
                        type: "textarea",
                        placeholder: "Unsere Marketingstrategie basiert auf..."
                    },
                    {
                        title: "Vertriebswege",
                        description: "Über welche Kanäle verkaufst du?",
                        type: "textarea",
                        placeholder: "Vertriebswege:\n- Direktvertrieb\n- Einzelhandel\n- Online..."
                    },
                    {
                        title: "Kundengewinnung",
                        description: "Wie gewinnst du Kunden?",
                        type: "textarea",
                        placeholder: "Kundengewinnung erfolgt durch..."
                    },
                    {
                        title: "Kundenbindung",
                        description: "Wie bindest du deine Kunden?",
                        type: "textarea",
                        placeholder: "Kundenbindung durch..."
                    }
                ]
            },
            {
                id: "operations",
                title: "Betrieb & Organisation",
                description: "Operative Abläufe und Organisation",
                sections: [
                    {
                        title: "Betriebsablauf",
                        description: "Wie läuft dein Geschäft ab?",
                        type: "textarea",
                        placeholder: "Betriebsablauf:\n1. Schritt...\n2. Schritt..."
                    },
                    {
                        title: "Standort & Räumlichkeiten",
                        description: "Wo und wie arbeitest du?",
                        type: "textarea",
                        placeholder: "Standort: ...\nRäumlichkeiten: ...\nAusstattung: ..."
                    },
                    {
                        title: "Personal",
                        description: "Welches Personal benötigst du?",
                        type: "textarea",
                        placeholder: "Personalplanung:\n- Vollzeit: ... Personen\n- Teilzeit: ... Personen"
                    },
                    {
                        title: "Lieferanten",
                        description: "Wer sind deine Lieferanten?",
                        type: "textarea",
                        placeholder: "Hauptlieferanten:\n- Lieferant 1: ...\n- Lieferant 2: ..."
                    }
                ]
            },
            {
                id: "financials",
                title: "Finanzplanung",
                description: "Finanzielle Planung und Prognosen",
                sections: [
                    {
                        title: "Investitionsplanung",
                        description: "Welche Investitionen sind nötig?",
                        type: "textarea",
                        placeholder: "Investitionen:\n- Anlagegüter: €...\n- Ausstattung: €...\n- Lager: €..."
                    },
                    {
                        title: "Umsatzplanung",
                        description: "Wie entwickelt sich dein Umsatz?",
                        type: "textarea",
                        placeholder: "Umsatzplanung:\nJahr 1: €...\nJahr 2: €...\nJahr 3: €..."
                    },
                    {
                        title: "Kostenplanung",
                        description: "Welche Kosten entstehen?",
                        type: "textarea",
                        placeholder: "Kostenplanung:\n- Fixkosten: €...\n- Variable Kosten: €..."
                    },
                    {
                        title: "Finanzierungsplan",
                        description: "Wie finanzierst du dein Unternehmen?",
                        type: "textarea",
                        placeholder: "Finanzierung:\n- Eigenkapital: €...\n- Fremdkapital: €..."
                    },
                    {
                        title: "Break-Even-Analyse",
                        description: "Ab wann bist du rentabel?",
                        type: "textarea",
                        placeholder: "Break-Even-Point: Monat...\nBegründung: ..."
                    }
                ]
            },
            {
                id: "risks",
                title: "Chancen & Risiken",
                description: "Bewertung von Chancen und Risiken",
                sections: [
                    {
                        title: "Chancen",
                        description: "Welche Chancen siehst du?",
                        type: "textarea",
                        placeholder: "Chancen:\n1. ...\n2. ...\n3. ..."
                    },
                    {
                        title: "Risiken",
                        description: "Welche Risiken bestehen?",
                        type: "textarea",
                        placeholder: "Risiken:\n1. ...\n2. ...\n3. ..."
                    },
                    {
                        title: "Gegenmaßnahmen",
                        description: "Wie gehst du mit Risiken um?",
                        type: "textarea",
                        placeholder: "Gegenmaßnahmen:\n- Risiko 1: Maßnahme...\n- Risiko 2: Maßnahme..."
                    }
                ]
            }
        ]
    },
    ecommerce: {
        name: "E-Commerce",
        description: "Für Online-Shops und E-Commerce-Plattformen",
        chapters: [
            {
                id: "executive-summary",
                title: "Executive Summary",
                description: "Überblick über den Online-Shop",
                sections: [
                    {
                        title: "E-Commerce-Konzept",
                        description: "Beschreibe dein Online-Shop-Konzept",
                        type: "textarea",
                        placeholder: "Unser Online-Shop wird..."
                    },
                    {
                        title: "Zielgruppe",
                        description: "Wer sind deine Online-Kunden?",
                        type: "input",
                        placeholder: "Online-Käufer, Alter 25-45, technikaffin"
                    },
                    {
                        title: "Unique Value Proposition",
                        description: "Was macht deinen Shop besonders?",
                        type: "textarea",
                        placeholder: "Unser Shop bietet einzigartig..."
                    },
                    {
                        title: "Startkapital",
                        description: "Wie viel Kapital benötigst du?",
                        type: "input",
                        placeholder: "€50.000"
                    }
                ]
            },
            {
                id: "business-model",
                title: "Geschäftsmodell",
                description: "E-Commerce Geschäftsmodell",
                sections: [
                    {
                        title: "Geschäftsmodell-Typ",
                        description: "Welches E-Commerce-Modell verfolgst du?",
                        type: "select",
                        options: ["B2C (Business-to-Consumer)", "B2B (Business-to-Business)", "C2C (Consumer-to-Consumer)", "Marketplace", "Subscription", "Dropshipping"]
                    },
                    {
                        title: "Produktsortiment",
                        description: "Was verkaufst du?",
                        type: "textarea",
                        placeholder: "Produktkategorien:\n- Kategorie 1: ...\n- Kategorie 2: ..."
                    },
                    {
                        title: "Beschaffung",
                        description: "Wie beschaffst du deine Produkte?",
                        type: "textarea",
                        placeholder: "Beschaffungsstrategie:\n- Eigenproduktion\n- Großhandel\n- Dropshipping..."
                    },
                    {
                        title: "Lagerung & Logistik",
                        description: "Wie organisierst du Lagerung und Versand?",
                        type: "textarea",
                        placeholder: "Logistikkonzept:\n- Lagerort: ...\n- Versandpartner: ..."
                    }
                ]
            },
            {
                id: "market-analysis",
                title: "Marktanalyse",
                description: "Online-Markt Analyse",
                sections: [
                    {
                        title: "E-Commerce-Markt",
                        description: "Wie ist der E-Commerce-Markt in deiner Branche?",
                        type: "textarea",
                        placeholder: "Der E-Commerce-Markt für... zeigt..."
                    },
                    {
                        title: "Zielkundenanalyse",
                        description: "Wer kauft online in deiner Branche?",
                        type: "textarea",
                        placeholder: "Zielkunden:\n- Demografische Merkmale\n- Kaufverhalten\n- Präferenzen"
                    },
                    {
                        title: "Markttrends",
                        description: "Welche Trends beeinflussen den Online-Handel?",
                        type: "textarea",
                        placeholder: "Relevante Trends:\n- Mobile Commerce\n- Social Commerce..."
                    },
                    {
                        title: "Saisonalität",
                        description: "Gibt es saisonale Schwankungen?",
                        type: "textarea",
                        placeholder: "Saisonale Faktoren:\n- Weihnachtsgeschäft\n- Sommersaison..."
                    }
                ]
            },
            {
                id: "competitive-analysis",
                title: "Wettbewerbsanalyse",
                description: "Analyse der Online-Konkurrenz",
                sections: [
                    {
                        title: "Direkte Konkurrenten",
                        description: "Wer sind deine direkten Online-Konkurrenten?",
                        type: "textarea",
                        placeholder: "Hauptkonkurrenten:\n1. [Shop-Name] - Stärken/Schwächen\n2. [Shop-Name] - Stärken/Schwächen"
                    },
                    {
                        title: "Indirekte Konkurrenten",
                        description: "Welche indirekten Konkurrenten gibt es?",
                        type: "textarea",
                        placeholder: "Indirekte Konkurrenten:\n- Stationärer Handel\n- Marktplätze..."
                    },
                    {
                        title: "Competitive Advantage",
                        description: "Was ist dein Wettbewerbsvorteil?",
                        type: "textarea",
                        placeholder: "Unser Wettbewerbsvorteil:\n- Preis\n- Qualität\n- Service..."
                    }
                ]
            },
            {
                id: "technology-platform",
                title: "Technologie & Plattform",
                description: "E-Commerce-Plattform und Technologie",
                sections: [
                    {
                        title: "E-Commerce-Plattform",
                        description: "Welche Shop-Software nutzt du?",
                        type: "select",
                        options: ["Shopify", "WooCommerce", "Magento", "PrestaShop", "Shopware", "Custom Development"]
                    },
                    {
                        title: "Website-Features",
                        description: "Welche Features hat dein Shop?",
                        type: "textarea",
                        placeholder: "Shop-Features:\n- Produktkatalog\n- Warenkorbsystem\n- Zahlungsabwicklung..."
                    },
                    {
                        title: "Mobile Optimierung",
                        description: "Wie optimierst du für mobile Geräte?",
                        type: "textarea",
                        placeholder: "Mobile Strategie:\n- Responsive Design\n- Mobile App..."
                    },
                    {
                        title: "Sicherheit",
                        description: "Wie sicherst du deinen Shop ab?",
                        type: "textarea",
                        placeholder: "Sicherheitsmaßnahmen:\n- SSL-Zertifikat\n- DSGVO-Compliance..."
                    }
                ]
            },
            {
                id: "marketing-sales",
                title: "Online-Marketing & Vertrieb",
                description: "Digital Marketing Strategie",
                sections: [
                    {
                        title: "SEO-Strategie",
                        description: "Wie optimierst du für Suchmaschinen?",
                        type: "textarea",
                        placeholder: "SEO-Strategie:\n- Keyword-Recherche\n- Content-Marketing\n- Linkbuilding..."
                    },
                    {
                        title: "Paid Advertising",
                        description: "Welche bezahlten Werbekanäle nutzt du?",
                        type: "textarea",
                        placeholder: "Paid Advertising:\n- Google Ads\n- Facebook Ads\n- Instagram Ads..."
                    },
                    {
                        title: "Social Media Marketing",
                        description: "Wie nutzt du Social Media?",
                        type: "textarea",
                        placeholder: "Social Media Strategie:\n- Instagram: ...\n- Facebook: ...\n- TikTok: ..."
                    },
                    {
                        title: "Email Marketing",
                        description: "Wie setzt du Email Marketing ein?",
                        type: "textarea",
                        placeholder: "Email Marketing:\n- Newsletter\n- Abandoned Cart\n- Kundenbindung..."
                    },
                    {
                        title: "Conversion Optimization",
                        description: "Wie optimierst du deine Conversion-Rate?",
                        type: "textarea",
                        placeholder: "Conversion-Optimierung:\n- A/B-Tests\n- UX-Verbesserungen\n- Checkout-Prozess..."
                    }
                ]
            },
            {
                id: "operations",
                title: "Betrieb & Logistik",
                description: "Operative Abläufe im E-Commerce",
                sections: [
                    {
                        title: "Bestellabwicklung",
                        description: "Wie läuft die Bestellabwicklung ab?",
                        type: "textarea",
                        placeholder: "Bestellprozess:\n1. Bestellung eingegangen\n2. Zahlungsverarbeitung\n3. Kommissionierung..."
                    },
                    {
                        title: "Versand & Fulfillment",
                        description: "Wie organisierst du den Versand?",
                        type: "textarea",
                        placeholder: "Versandstrategie:\n- Versandpartner: ...\n- Versandkosten: ...\n- Lieferzeiten: ..."
                    },
                    {
                        title: "Retouren-Management",
                        description: "Wie behandelst du Retouren?",
                        type: "textarea",
                        placeholder: "Retouren-Prozess:\n- Retourenrichtlinie\n- Rücksendekosten\n- Bearbeitungszeit..."
                    },
                    {
                        title: "Kundenservice",
                        description: "Wie organisierst du den Kundenservice?",
                        type: "textarea",
                        placeholder: "Kundenservice:\n- Supportkanäle\n- Reaktionszeiten\n- FAQ-Bereich..."
                    }
                ]
            },
            {
                id: "financials",
                title: "Finanzplanung",
                description: "E-Commerce Finanzplanung",
                sections: [
                    {
                        title: "Umsatzplanung",
                        description: "Wie entwickelt sich dein Online-Umsatz?",
                        type: "textarea",
                        placeholder: "Umsatzprognose:\n- Monat 1-3: €...\n- Monat 4-6: €...\n- Jahr 1: €..."
                    },
                    {
                        title: "Kostenstruktur",
                        description: "Welche Kosten entstehen?",
                        type: "textarea",
                        placeholder: "Kostenstruktur:\n- Plattformkosten: €...\n- Marketing: €...\n- Lagerung: €..."
                    },
                    {
                        title: "Key Performance Indicators",
                        description: "Welche KPIs sind wichtig?",
                        type: "textarea",
                        placeholder: "Wichtige KPIs:\n- Conversion Rate: %\n- Average Order Value: €\n- Customer Lifetime Value: €..."
                    },
                    {
                        title: "Finanzierung",
                        description: "Wie finanzierst du den Start?",
                        type: "textarea",
                        placeholder: "Finanzierungsplan:\n- Eigenkapital: €...\n- Kredite: €...\n- Investoren: €..."
                    }
                ]
            },
            {
                id: "growth-scaling",
                title: "Wachstum & Skalierung",
                description: "Skalierungsstrategie für E-Commerce",
                sections: [
                    {
                        title: "Wachstumsstrategie",
                        description: "Wie skalierst du deinen Shop?",
                        type: "textarea",
                        placeholder: "Wachstumsstrategie:\n- Produkterweiterung\n- Neue Märkte\n- Automatisierung..."
                    },
                    {
                        title: "Internationalisierung",
                        description: "Planst du internationale Expansion?",
                        type: "textarea",
                        placeholder: "Internationalisierungspläne:\n- Zielmärkte\n- Lokalisierung\n- Logistik..."
                    },
                    {
                        title: "Automatisierung",
                        description: "Welche Prozesse automatisierst du?",
                        type: "textarea",
                        placeholder: "Automatisierung:\n- Inventory Management\n- Customer Service\n- Marketing..."
                    }
                ]
            }
        ]
    },
    service: {
        name: "Dienstleistung",
        description: "Für Beratungen, Agenturen und Serviceunternehmen",
        chapters: [
            {
                id: "executive-summary",
                title: "Executive Summary",
                description: "Überblick über das Dienstleistungsunternehmen",
                sections: [
                    {
                        title: "Dienstleistungskonzept",
                        description: "Beschreibe dein Dienstleistungskonzept",
                        type: "textarea",
                        placeholder: "Unser Dienstleistungsunternehmen bietet..."
                    },
                    {
                        title: "Zielgruppe",
                        description: "Wer sind deine Kunden?",
                        type: "input",
                        placeholder: "Unternehmen, Privatpersonen, Startups"
                    },
                    {
                        title: "Kernkompetenz",
                        description: "Was ist deine Hauptkompetenz?",
                        type: "textarea",
                        placeholder: "Unsere Kernkompetenz liegt in..."
                    },
                    {
                        title: "Startkapital",
                        description: "Wie viel Kapital benötigst du?",
                        type: "input",
                        placeholder: "€25.000"
                    }
                ]
            },
            {
                id: "services-portfolio",
                title: "Leistungsportfolio",
                description: "Detaillierte Beschreibung der Dienstleistungen",
                sections: [
                    {
                        title: "Hauptdienstleistungen",
                        description: "Welche Hauptdienstleistungen bietest du an?",
                        type: "textarea",
                        placeholder: "Hauptdienstleistungen:\n1. Beratung: ...\n2. Implementierung: ...\n3. Support: ..."
                    },
                    {
                        title: "Service-Pakete",
                        description: "Wie strukturierst du deine Services?",
                        type: "textarea",
                        placeholder: "Service-Pakete:\n- Basic: €... (Umfang: ...)\n- Premium: €... (Umfang: ...)"
                    },
                    {
                        title: "Zusatzleistungen",
                        description: "Welche Zusatzleistungen bietest du?",
                        type: "textarea",
                        placeholder: "Zusatzleistungen:\n- Schulungen\n- Wartung\n- Notfallsupport..."
                    },
                    {
                        title: "Expertise & Qualifikationen",
                        description: "Welche Qualifikationen bringst du mit?",
                        type: "textarea",
                        placeholder: "Qualifikationen:\n- Zertifizierungen: ...\n- Berufserfahrung: ...\n- Referenzen: ..."
                    }
                ]
            },
            {
                id: "market-analysis",
                title: "Marktanalyse",
                description: "Analyse des Dienstleistungsmarktes",
                sections: [
                    {
                        title: "Marktbeschreibung",
                        description: "Wie ist der Markt für deine Dienstleistungen?",
                        type: "textarea",
                        placeholder: "Der Markt für... ist geprägt von..."
                    },
                    {
                        title: "Zielkundensegmente",
                        description: "Welche Kundensegmente adressierst du?",
                        type: "textarea",
                        placeholder: "Zielkundensegmente:\n- Segment 1: ...\n- Segment 2: ..."
                    },
                    {
                        title: "Marktbedarf",
                        description: "Welchen Bedarf gibt es für deine Services?",
                        type: "textarea",
                        placeholder: "Marktbedarf:\n- Problem 1: ...\n- Problem 2: ..."
                    },
                    {
                        title: "Marktpotential",
                        description: "Wie groß ist das Marktpotential?",
                        type: "textarea",
                        placeholder: "Marktpotential:\n- Lokaler Markt: €...\n- Regionaler Markt: €..."
                    }
                ]
            },
            {
                id: "competitive-analysis",
                title: "Wettbewerbsanalyse",
                description: "Analyse der Konkurrenz",
                sections: [
                    {
                        title: "Konkurrenten",
                        description: "Wer sind deine direkten Konkurrenten?",
                        type: "textarea",
                        placeholder: "Hauptkonkurrenten:\n1. [Name] - Spezialisierung: ...\n2. [Name] - Spezialisierung: ..."
                    },
                    {
                        title: "Wettbewerbsposition",
                        description: "Wie positionierst du dich gegenüber Konkurrenten?",
                        type: "textarea",
                        placeholder: "Unsere Position:\n- Preis: ...\n- Qualität: ...\n- Spezialisierung: ..."
                    },
                    {
                        title: "Differenzierung",
                        description: "Was unterscheidet dich von der Konkurrenz?",
                        type: "textarea",
                        placeholder: "Differenzierungsmerkmale:\n- Methodisches Vorgehen\n- Branchenerfahrung\n- Kundenbetreuung..."
                    }
                ]
            },
            {
                id: "marketing-sales",
                title: "Marketing & Vertrieb",
                description: "Marketing- und Vertriebsstrategie",
                sections: [
                    {
                        title: "Kundenakquisition",
                        description: "Wie gewinnst du neue Kunden?",
                        type: "textarea",
                        placeholder: "Kundenakquisition:\n- Networking\n- Empfehlungen\n- Content Marketing..."
                    },
                    {
                        title: "Vertriebskanäle",
                        description: "Über welche Kanäle vertreibst du?",
                        type: "textarea",
                        placeholder: "Vertriebskanäle:\n- Direktvertrieb\n- Partnervertrieb\n- Online-Präsenz..."
                    },
                    {
                        title: "Preisgestaltung",
                        description: "Wie gestaltest du deine Preise?",
                        type: "textarea",
                        placeholder: "Preismodelle:\n- Stundensatz: €...\n- Pauschale: €...\n- Erfolgsbeteiligung: ..."
                    },
                    {
                        title: "Marketing-Mix",
                        description: "Welche Marketing-Instrumente nutzt du?",
                        type: "textarea",
                        placeholder: "Marketing-Mix:\n- Website & SEO\n- Social Media\n- Fachartikel\n- Vorträge..."
                    }
                ]
            },
            {
                id: "operations",
                title: "Betrieb & Prozesse",
                description: "Operative Abläufe und Prozesse",
                sections: [
                    {
                        title: "Service-Delivery",
                        description: "Wie lieferst du deine Dienstleistungen?",
                        type: "textarea",
                        placeholder: "Service-Delivery-Prozess:\n1. Erstberatung\n2. Angebot\n3. Durchführung\n4. Nachbetreuung"
                    },
                    {
                        title: "Projektmanagement",
                        description: "Wie managst du deine Projekte?",
                        type: "textarea",
                        placeholder: "Projektmanagement:\n- Methodik: ...\n- Tools: ...\n- Dokumentation: ..."
                    },
                    {
                        title: "Qualitätssicherung",
                        description: "Wie sicherst du die Qualität?",
                        type: "textarea",
                        placeholder: "Qualitätssicherung:\n- Prozessstandards\n- Kundenfeedback\n- Weiterbildung..."
                    },
                    {
                        title: "Kapazitätsplanung",
                        description: "Wie planst du deine Kapazitäten?",
                        type: "textarea",
                        placeholder: "Kapazitätsplanung:\n- Arbeitszeit: ... Stunden/Woche\n- Projektlaufzeiten: ...\n- Auslastung: ..."
                    }
                ]
            },
            {
                id: "team-organization",
                title: "Team & Organisation",
                description: "Personalstruktur und Organisation",
                sections: [
                    {
                        title: "Gründerteam",
                        description: "Wer gehört zum Gründerteam?",
                        type: "textarea",
                        placeholder: "Gründerteam:\n- Gründer 1: Rolle, Qualifikation\n- Gründer 2: Rolle, Qualifikation"
                    },
                    {
                        title: "Personalplanung",
                        description: "Welches Personal benötigst du?",
                        type: "textarea",
                        placeholder: "Personalplanung:\n- Berater: ... Personen\n- Assistenz: ... Personen\n- Freelancer: ..."
                    },
                    {
                        title: "Partnerschaften",
                        description: "Welche Partnerschaften planst du?",
                        type: "textarea",
                        placeholder: "Partnerschaften:\n- Kooperationspartner\n- Subunternehmer\n- Netzwerk..."
                    },
                    {
                        title: "Skalierungsstrategie",
                        description: "Wie skalierst du dein Team?",
                        type: "textarea",
                        placeholder: "Skalierung:\n- Jahr 1: ... Personen\n- Jahr 2: ... Personen\n- Expansion: ..."
                    }
                ]
            },
            {
                id: "financials",
                title: "Finanzplanung",
                description: "Finanzielle Planung und Prognosen",
                sections: [
                    {
                        title: "Umsatzplanung",
                        description: "Wie entwickelt sich dein Umsatz?",
                        type: "textarea",
                        placeholder: "Umsatzplanung:\n- Monat 1-6: €...\n- Jahr 1: €...\n- Jahr 2: €..."
                    },
                    {
                        title: "Kostenstruktur",
                        description: "Welche Kosten entstehen?",
                        type: "textarea",
                        placeholder: "Kostenstruktur:\n- Personalkosten: €...\n- Bürokosten: €...\n- Marketing: €..."
                    },
                    {
                        title: "Stundensatz-Kalkulation",
                        description: "Wie kalkulierst du deine Stundensätze?",
                        type: "textarea",
                        placeholder: "Stundensatz-Kalkulation:\n- Zielstundensatz: €...\n- Basis: Kosten + Gewinn\n- Marktvergleich: €..."
                    },
                    {
                        title: "Finanzierungsbedarf",
                        description: "Wie viel Kapital benötigst du?",
                        type: "textarea",
                        placeholder: "Finanzierungsbedarf:\n- Startkosten: €...\n- Laufende Kosten: €...\n- Puffer: €..."
                    },
                    {
                        title: "Break-Even-Analyse",
                        description: "Ab wann bist du rentabel?",
                        type: "textarea",
                        placeholder: "Break-Even-Analyse:\n- Monat: ...\n- Auslastung: ...%\n- Umsatz: €..."
                    }
                ]
            },
            {
                id: "growth-strategy",
                title: "Wachstumsstrategie",
                description: "Langfristige Wachstumspläne",
                sections: [
                    {
                        title: "Expansion",
                        description: "Wie willst du expandieren?",
                        type: "textarea",
                        placeholder: "Expansionspläne:\n- Neue Services\n- Geografische Expansion\n- Partnerschaften..."
                    },
                    {
                        title: "Spezialisierung",
                        description: "In welche Richtung spezialisierst du dich?",
                        type: "textarea",
                        placeholder: "Spezialisierung:\n- Branchenfokus\n- Methodenexpertise\n- Zielgruppenfokus..."
                    },
                    {
                        title: "Innovation",
                        description: "Wie innovierst du deine Services?",
                        type: "textarea",
                        placeholder: "Innovation:\n- Neue Methoden\n- Technologie-Integration\n- Service-Entwicklung..."
                    }
                ]
            }
        ]
    }
};

// Export templates
window.BusinessPlanTemplates = businessPlanTemplates;