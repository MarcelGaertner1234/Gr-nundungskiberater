/**
 * i18n Update Script
 * Aktualisiert alle übersetzten Inhalte beim Sprachwechsel
 */

// i18n System erweitern um Title-Update-Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    // Title-Tag Support hinzufügen
    function updateTitle() {
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement && window.i18n && window.i18n.t) {
            const key = titleElement.getAttribute('data-i18n');
            const translatedTitle = window.i18n.t(key);
            if (translatedTitle) {
                titleElement.textContent = translatedTitle;
                document.title = translatedTitle;
            }
        }
    }

    // Meta-Tags Support hinzufügen  
    function updateMetaTags() {
        const metaTags = document.querySelectorAll('meta[data-i18n]');
        metaTags.forEach(meta => {
            const key = meta.getAttribute('data-i18n');
            if (window.i18n && window.i18n.t) {
                const translatedContent = window.i18n.t(key);
                if (translatedContent) {
                    meta.setAttribute('content', translatedContent);
                }
            }
        });
    }

    // Dynamische Zahlen in Tags updaten
    function updateDynamicContent() {
        // Tag-Zahlen könnten von API kommen
        const tagCounts = {
            'cards.search.tags.businessplan_count': '52',
            'cards.search.tags.funding_count': '36', 
            'cards.search.tags.finance_count': '18'
        };

        Object.keys(tagCounts).forEach(key => {
            const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
            elements.forEach(el => {
                el.textContent = tagCounts[key];
            });
        });
    }

    // Beta Counter Zahlen aktualisieren (falls von API geladen)
    function updateBetaCounter() {
        const betaNumberElement = document.getElementById('betaCounterNumber');
        if (betaNumberElement) {
            // Simuliere API-Call oder lade aus localStorage
            const storedCount = localStorage.getItem('betaCount');
            if (storedCount) {
                betaNumberElement.textContent = storedCount;
            }
        }
    }

    // Alle Updates ausführen
    function performFullUpdate() {
        updateTitle();
        updateMetaTags();
        updateDynamicContent();
        updateBetaCounter();
        
        // Standard i18n-Update aufrufen falls verfügbar
        if (window.updateAllTranslations) {
            window.updateAllTranslations();
        }
    }

    // Initial ausführen
    performFullUpdate();

    // Event-Listener für Sprachwechsel
    document.addEventListener('languageChanged', performFullUpdate);
    
    // Custom Event für manuelle Updates
    window.updateI18nContent = performFullUpdate;

    console.log('🌍 i18n Update System geladen');
});

// Hilfsfunktion für Sprachwechsel
function changeLanguage(newLang) {
    if (window.i18n && window.i18n.changeLanguage) {
        window.i18n.changeLanguage(newLang).then(() => {
            // Custom Event triggern
            document.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: newLang } 
            }));
        });
    }
}

// Global verfügbar machen
window.changeLanguage = changeLanguage;