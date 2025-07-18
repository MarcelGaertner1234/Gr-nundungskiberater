/**
 * SECURITY CLEANUP - DSGVO-konformer LocalStorage
 * Entfernt alle sensiblen Kundendaten und implementiert sichere Alternativen
 */

class SecurityCleanup {
    constructor() {
        this.sensitiveKeys = [
            'onboardingData',           // ❌ E-Mail + Businessideen
            'businessPlanData',         // ❌ Komplette Businesspläne
            'fundingRequests',          // ❌ Förderanträge mit Finanzinfos
            'contactSubmissions',       // ❌ Kontaktformular-Daten
            'uploadedFiles',            // ❌ File-Inhalte
            'appointments',             // ❌ Termin-Daten mit persönlichen Infos
            'waitlistUsers',            // ❌ E-Mail-Adressen von Beta-Usern
            'currentUser',              // ❌ User-Profile
            'communications',           // ❌ Nachrichten-Inhalte
            'payments',                 // ❌ Zahlungsinformationen
            'userStatus',               // ❌ User-spezifische Daten
            'unlockedPackages',         // ❌ User-Package-Zuordnungen
            'selectedPackage',          // ❌ User-Auswahl-Daten
            'completedChapters',        // ❌ User-Progress-Daten
            'dashboardSteps',           // ❌ User-Progress-Tracking
            'serviceStatus',            // ❌ Service-Status mit User-Bezug
            'legalPageViews',           // ❌ User-Tracking-Daten
            'contactFormData'           // ❌ Formulardaten
        ];
        
        this.allowedKeys = [
            'language',                 // ✅ UI-Präferenz (nicht personenbezogen)
            'theme',                    // ✅ UI-Präferenz (nicht personenbezogen)
            'cookieConsent',            // ✅ Cookie-Einstellungen
            'betaTaken',                // ✅ Anonymer Counter
            'uiPreferences'             // ✅ UI-Einstellungen ohne Personenbezug
        ];
        
        this.init();
    }
    
    init() {
        console.log('🔒 SECURITY CLEANUP: Starte DSGVO-konforme LocalStorage-Bereinigung...');
        
        // Sofortiger Cleanup
        this.removeSensitiveData();
        
        // Setup sichere Alternativen
        this.setupSecureAlternatives();
        
        // Monitoring installieren
        this.setupStorageMonitoring();
        
        console.log('✅ SECURITY CLEANUP: Abgeschlossen - LocalStorage ist jetzt DSGVO-konform');
    }
    
    removeSensitiveData() {
        let removedCount = 0;
        const backupData = {};
        
        this.sensitiveKeys.forEach(key => {
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    // Backup für mögliche Migration (ohne personenbezogene Daten)
                    const parsedData = JSON.parse(data);
                    const anonymizedData = this.anonymizeData(parsedData, key);
                    
                    if (anonymizedData && Object.keys(anonymizedData).length > 0) {
                        backupData[key] = anonymizedData;
                    }
                    
                    // Sensible Daten entfernen
                    localStorage.removeItem(key);
                    removedCount++;
                    
                    console.warn(`🚮 Entfernt sensible Daten: ${key}`);
                    
                } catch (e) {
                    // Falls parsing fehlschlägt, trotzdem entfernen
                    localStorage.removeItem(key);
                    removedCount++;
                    console.warn(`🚮 Entfernt korrupte Daten: ${key}`);
                }
            }
        });
        
        // Anonymisierte Backup-Daten für UI-Funktionalität
        if (Object.keys(backupData).length > 0) {
            sessionStorage.setItem('anonymizedBackup', JSON.stringify(backupData));
        }
        
        console.log(`✅ ${removedCount} sensible LocalStorage-Schlüssel entfernt`);
    }
    
    anonymizeData(data, keyType) {
        if (!data || typeof data !== 'object') return null;
        
        switch (keyType) {
            case 'onboardingData':
                return {
                    profile: data.profile || null,
                    timeline: data.timeline || null,
                    consulting: data.consulting || null
                    // E-Mail und businessIdea werden entfernt
                };
                
            case 'appointments':
                if (Array.isArray(data)) {
                    return data.map(apt => ({
                        type: apt.type || null,
                        date: apt.date || null,
                        time: apt.time || null
                        // Keine Namen, E-Mails oder Details
                    }));
                }
                return null;
                
            case 'businessPlanData':
                return {
                    template: data.template || null,
                    createdAt: data.createdAt || null
                    // Alle Inhalte werden entfernt
                };
                
            default:
                // Für andere Datentypen: nur Struktur-Info behalten
                return { type: keyType, itemCount: Array.isArray(data) ? data.length : 1 };
        }
    }
    
    setupSecureAlternatives() {
        // Sichere Session-basierte Alternativen für UI-State
        const SecureStorage = {
            // Nur für UI-State, keine persönlichen Daten
            setUIState(key, value) {
                try {
                    sessionStorage.setItem(`ui_${key}`, JSON.stringify(value));
                } catch (e) {
                    console.warn('SessionStorage voll oder nicht verfügbar');
                }
            },
            
            getUIState(key) {
                try {
                    const data = sessionStorage.getItem(`ui_${key}`);
                    return data ? JSON.parse(data) : null;
                } catch (e) {
                    return null;
                }
            },
            
            // Sichere temporary storage für Formulardaten (nur während Session)
            setFormState(formId, data) {
                // Entferne sensible Felder
                const safeData = this.sanitizeFormData(data);
                sessionStorage.setItem(`form_${formId}`, JSON.stringify(safeData));
            },
            
            sanitizeFormData(data) {
                const sensitive = ['email', 'phone', 'name', 'address', 'businessIdea', 'message'];
                const safe = { ...data };
                
                sensitive.forEach(field => {
                    if (safe[field]) {
                        delete safe[field];
                    }
                });
                
                return safe;
            }
        };
        
        // Global verfügbar machen
        window.SecureStorage = SecureStorage;
        
        console.log('✅ Sichere Storage-Alternativen installiert');
    }
    
    setupStorageMonitoring() {
        // Überwache neue LocalStorage-Zugriffe
        const originalSetItem = localStorage.setItem;
        
        localStorage.setItem = function(key, value) {
            // Prüfe ob sensible Daten gespeichert werden sollen
            if (window.securityCleanup && window.securityCleanup.sensitiveKeys.includes(key)) {
                console.error(`🚨 BLOCKED: Versuch sensible Daten zu speichern: ${key}`);
                console.error('Verwende stattdessen SecureStorage oder Backend-API');
                return;
            }
            
            // Prüfe auf potentiell sensible Inhalte
            try {
                const data = JSON.parse(value);
                if (window.securityCleanup && window.securityCleanup.containsSensitiveData(data)) {
                    console.error(`🚨 BLOCKED: Potentiell sensible Daten erkannt in: ${key}`);
                    return;
                }
            } catch (e) {
                // Nicht-JSON Daten sind meist unbedenklich
            }
            
            // Erlaubte Daten speichern
            originalSetItem.call(this, key, value);
        };
        
        console.log('✅ LocalStorage-Monitoring aktiviert');
    }
    
    containsSensitiveData(data) {
        const sensitivePatterns = [
            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,  // E-Mail
            /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,            // Kreditkarte
            /\b\d{2,4}\/\d{2,4}\/\d{2,4}\b/,                         // Datum (potentiell Geburtsdatum)
            /\b(?:\+49|0049|0)\s*\d+[\s\d-]*\d\b/,                   // Deutsche Telefonnummer
            /\biban\b/i,                                              // IBAN
            /\bbic\b/i,                                               // BIC
            /\bsteuer\b/i,                                            // Steuernummer
        ];
        
        const dataString = JSON.stringify(data).toLowerCase();
        
        return sensitivePatterns.some(pattern => pattern.test(dataString));
    }
    
    // Debug-Funktion für Entwicklung
    debugStorage() {
        console.log('📊 STORAGE DEBUG:');
        console.log('LocalStorage Keys:', Object.keys(localStorage));
        console.log('SessionStorage Keys:', Object.keys(sessionStorage));
        
        // Prüfe auf potentiell problematische Keys
        Object.keys(localStorage).forEach(key => {
            if (!this.allowedKeys.includes(key)) {
                console.warn(`⚠️ Unbekannter LocalStorage Key: ${key}`);
            }
        });
    }
}

// Sofortige Ausführung beim Laden
window.securityCleanup = new SecurityCleanup();

// Migration Helper für bestehende Funktionen
window.DEPRECATED_LOCALSTORAGE = {
    // Temporäre Backwards-Compatibility
    getOnboardingData: () => {
        console.warn('DEPRECATED: getOnboardingData() - Verwende Backend-API');
        return window.SecureStorage?.getUIState('onboardingFlow') || {};
    },
    
    getBusinessPlanData: () => {
        console.warn('DEPRECATED: getBusinessPlanData() - Verwende Backend-API');
        return null; // Keine sensiblen Daten mehr verfügbar
    },
    
    // Sichere Alternative für UI-State
    setUIState: (key, value) => window.SecureStorage?.setUIState(key, value),
    getUIState: (key) => window.SecureStorage?.getUIState(key)
};

console.log('🔒 SECURITY MODULE LOADED - LocalStorage ist jetzt DSGVO-konform');