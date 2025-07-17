/**
 * DARK MODE EMERGENCY FIX - Version 2.0
 * Ultra-aggressive solution for persistent text visibility issues
 * Specifically targets "Intelligente Suche" card problems
 */

class DarkModeEmergencyFix {
    constructor() {
        this.init();
        this.setupAutoFix();
    }

    init() {
        console.log('🚨 Dark Mode Emergency Fix v2.0 aktiviert');
        this.fixAllProblematicElements();
        this.fixIntelligenteSucheCard();
        
        // Auto-fix nach Theme-Wechsel
        this.observeThemeChanges();
        
        // Periodische Checks
        setInterval(() => {
            this.fixAllProblematicElements();
            this.fixIntelligenteSucheCard();
        }, 2000);
    }

    // NEUE SPEZIELLE FUNKTION FÜR INTELLIGENTE SUCHE
    fixIntelligenteSucheCard() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        if (!isDarkMode) return;

        console.log('🔍 Fixing Intelligente Suche card...');

        // Finde die spezifische "Intelligente Suche" Kachel
        const searchCards = document.querySelectorAll('div[style*="background-color: #EBF5FF"]');
        
        searchCards.forEach(card => {
            // Prüfe ob es die richtige Kachel ist (enthält Suchicon)
            const hasSearchIcon = card.querySelector('span[style*="font-size: 1.5rem"]')?.textContent?.includes('🔍');
            
            if (hasSearchIcon) {
                console.log('📍 Intelligente Suche Kachel gefunden - applying fixes');
                
                // Alle Text-Elemente in der Kachel
                const allElements = card.querySelectorAll('*');
                allElements.forEach(element => {
                    if (element.nodeType === Node.ELEMENT_NODE) {
                        element.style.setProperty('color', '#ffffff', 'important');
                        element.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                        element.style.setProperty('text-shadow', '0 1px 3px rgba(0, 0, 0, 0.5)', 'important');
                        element.style.setProperty('opacity', '1', 'important');
                    }
                });

                // Spezielle Behandlung für verschiedene Element-Typen
                const badges = card.querySelectorAll('span[style*="color: #666"]');
                badges.forEach(badge => {
                    badge.style.setProperty('color', '#ffffff', 'important');
                    badge.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                });

                const titles = card.querySelectorAll('h3[style*="color: #1a1a1a"]');
                titles.forEach(title => {
                    title.style.setProperty('color', '#ffffff', 'important');
                    title.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                    title.style.setProperty('text-shadow', '0 1px 3px rgba(0, 0, 0, 0.7)', 'important');
                });

                const searchIcons = card.querySelectorAll('span[style*="color: #999"]');
                searchIcons.forEach(icon => {
                    icon.style.setProperty('color', '#ffffff', 'important');
                    icon.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                });

                const descriptions = card.querySelectorAll('p[style*="color: #666"]');
                descriptions.forEach(desc => {
                    desc.style.setProperty('color', '#ffffff', 'important');
                    desc.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                });

                // Input Felder
                const inputs = card.querySelectorAll('input');
                inputs.forEach(input => {
                    input.style.setProperty('color', '#ffffff', 'important');
                    input.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                });

                console.log('✅ Intelligente Suche Kachel erfolgreich gefixt');
            }
        });
    }

    fixAllProblematicElements() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        if (!isDarkMode) return;

        // ULTRA-AGGRESSIVE FIXES FÜR ALLE KACHELN
        const problematicBackgrounds = [
            '#EBF5FF', '#FFF5F5', '#FFF8E7', '#F5F5F5'
        ];

        problematicBackgrounds.forEach(bgColor => {
            const elements = document.querySelectorAll(`div[style*="background-color: ${bgColor}"]`);
            elements.forEach(element => {
                const allChildren = element.querySelectorAll('*');
                allChildren.forEach(child => {
                    child.style.setProperty('color', '#ffffff', 'important');
                    child.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                    child.style.setProperty('text-shadow', '0 1px 2px rgba(0, 0, 0, 0.5)', 'important');
                    child.style.setProperty('opacity', '1', 'important');
                });
            });
        });

        // SPEZIFISCHE FARB-FIXES
        const problematicColors = ['#666', '#1a1a1a', '#999', '#333'];
        problematicColors.forEach(color => {
            const elements = document.querySelectorAll(`[style*="color: ${color}"]`);
            elements.forEach(element => {
                element.style.setProperty('color', '#ffffff', 'important');
                element.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
            });
        });
    }

    setupAutoFix() {
        // DOM-Änderungen überwachen
        const observer = new MutationObserver((mutations) => {
            let shouldFix = false;
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    shouldFix = true;
                }
            });
            
            if (shouldFix) {
                setTimeout(() => {
                    this.fixAllProblematicElements();
                    this.fixIntelligenteSucheCard();
                }, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-theme', 'style']
        });
    }

    observeThemeChanges() {
        const themeObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    setTimeout(() => {
                        this.fixAllProblematicElements();
                        this.fixIntelligenteSucheCard();
                    }, 100);
                    
                    setTimeout(() => {
                        this.fixAllProblematicElements();
                        this.fixIntelligenteSucheCard();
                    }, 500);
                }
            });
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    // MANUELLER TRIGGER FÜR DEBUGGING
    fixSpecificProblemCards() {
        console.log('🔧 Manueller Fix für alle Problem-Kacheln...');
        this.fixAllProblematicElements();
        this.fixIntelligenteSucheCard();
        
        // Zusätzlicher aggressive Fix
        const allCards = document.querySelectorAll('[style*="background-color"]');
        allCards.forEach(card => {
            const allText = card.querySelectorAll('*');
            allText.forEach(element => {
                if (element.textContent && element.textContent.trim()) {
                    element.style.setProperty('color', '#ffffff', 'important');
                    element.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                }
            });
        });
        
        console.log('✅ Manueller Fix abgeschlossen');
    }
}

// SOFORTIGE AKTIVIERUNG
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeEmergencyFix = new DarkModeEmergencyFix();
    
    // Zusätzliche Checks
    setTimeout(() => {
        window.darkModeEmergencyFix.fixIntelligenteSucheCard();
    }, 1000);
    
    setTimeout(() => {
        window.darkModeEmergencyFix.fixIntelligenteSucheCard();
    }, 3000);
});

// FALLBACK WENN DOM BEREITS GELADEN
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.darkModeEmergencyFix = new DarkModeEmergencyFix();
    });
} else {
    window.darkModeEmergencyFix = new DarkModeEmergencyFix();
}

// GLOBALE KONSOLEN-COMMANDS FÜR DEBUGGING
window.fixIntelligenteSuche = () => {
    if (window.darkModeEmergencyFix) {
        window.darkModeEmergencyFix.fixIntelligenteSucheCard();
    }
};

window.fixAllCards = () => {
    if (window.darkModeEmergencyFix) {
        window.darkModeEmergencyFix.fixSpecificProblemCards();
    }
};

console.log('🚀 Dark Mode Emergency Fix v2.0 geladen - Commands: fixIntelligenteSuche(), fixAllCards()');