// DARK MODE EMERGENCY FIX - JAVASCRIPT FALLBACK
// Diese Funktion überschreibt ALLE Text-Styles im Dark Mode mit maximaler Aggression

class DarkModeEmergencyFix {
    constructor() {
        this.isEnabled = false;
        this.observer = null;
        this.init();
    }

    init() {
        // Automatisch aktivieren wenn Dark Mode erkannt wird
        this.checkAndApplyFix();
        
        // Observer für DOM-Änderungen
        this.setupMutationObserver();
        
        // Theme-Change Listener
        this.setupThemeListener();
        
        // Periodische Überprüfung als Fallback
        setInterval(() => this.emergencyCheck(), 1000);
    }

    checkAndApplyFix() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' ||
                          document.body.getAttribute('data-theme') === 'dark' ||
                          document.documentElement.classList.contains('dark') ||
                          document.body.classList.contains('dark');

        if (isDarkMode) {
            this.applyEmergencyFix();
        }
    }

    applyEmergencyFix() {
        console.log('🚨 DARK MODE EMERGENCY FIX: Applying aggressive text visibility fixes...');
        
        // Alle möglichen Kachel-Container finden
        const cardSelectors = [
            'div[style*="background-color"]',
            'div[style*="background:"]',
            'div[style*="border-radius"]',
            'div[style*="padding: 32px"]',
            'div[style*="padding: 24px"]',
            'div[style*="padding: 40px"]',
            'div[style*="padding: 48px"]',
            '.card',
            '.feature-card',
            '.software-card',
            '.tool-card',
            '.story-card',
            '.preview-card'
        ];

        cardSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(card => this.fixCardText(card));
            } catch (e) {
                console.warn('Error with selector:', selector, e);
            }
        });

        // Grid-Container spezial behandeln
        this.fixGridContainers();

        // Alle Texte mit problematischen Inline-Styles
        this.fixInlineStyles();

        // SPEZIAL-FIX für problematische Kacheln wie "Intelligente Suche"
        this.fixSpecificProblemCards();

        // CSS-Klasse hinzufügen für zusätzliche CSS-Regeln
        document.documentElement.classList.add('dark-mode-emergency-fix-applied');
    }

    fixCardText(card) {
        if (!card) return;

        // Hintergrund des Containers dunkel machen
        card.style.setProperty('background-color', 'rgba(26, 26, 26, 0.98)', 'important');
        card.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.3)', 'important');

        // Alle Text-Elemente in der Kachel finden und hell machen
        const textElements = card.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, a, li');
        
        textElements.forEach(element => {
            element.style.setProperty('color', '#ffffff', 'important');
            element.style.setProperty('opacity', '1', 'important');
            element.style.setProperty('visibility', 'visible', 'important');
            element.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
            element.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
        });

        // Spezielle Behandlung für verschachtelte Elemente
        const allChildren = card.querySelectorAll('*');
        allChildren.forEach(child => {
            if (this.isTextElement(child)) {
                child.style.setProperty('color', '#ffffff', 'important');
                child.style.setProperty('opacity', '1', 'important');
            }
        });
    }

    fixGridContainers() {
        const gridContainers = document.querySelectorAll('div[style*="display: grid"], div[style*="display:grid"]');
        
        gridContainers.forEach(grid => {
            const gridItems = grid.children;
            
            Array.from(gridItems).forEach(item => {
                if (item.hasAttribute('style')) {
                    this.fixCardText(item);
                }
            });
        });
    }

    fixInlineStyles() {
        // ULTRA-AGGRESSIVE Problematische Farben überschreiben
        const problematicColors = [
            '#1a1a1a', '#333', '#666', '#000', '#0f172a',
            '#333333', '#666666', '#000000', '#999', '#555', '#777'
        ];

        problematicColors.forEach(color => {
            const elements = document.querySelectorAll(`[style*="color: ${color}"], [style*="color:${color}"]`);
            elements.forEach(element => {
                element.style.setProperty('color', '#ffffff', 'important');
                element.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
                element.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
            });
        });

        // Spezifische problematische Hintergründe
        const problematicBackgrounds = [
            '#EBF5FF', '#FFF5F5', '#FFF8E7', '#FFF3E0', '#F0F9FF', 
            '#EFF6FF', '#e8f4f8', '#E5F5E5', '#f0f0f0', '#ffffff', '#fff'
        ];

        problematicBackgrounds.forEach(bg => {
            const elements = document.querySelectorAll(`[style*="background-color: ${bg}"], [style*="background: ${bg}"]`);
            elements.forEach(container => {
                // Container selbst dunkel machen
                container.style.setProperty('background-color', 'rgba(26, 26, 26, 0.98)', 'important');
                container.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.3)', 'important');
                
                // ALLE Texte im Container weiß machen
                const allTextInContainer = container.querySelectorAll('*');
                allTextInContainer.forEach(textEl => {
                    if (this.isTextElement(textEl) || this.containsText(textEl)) {
                        textEl.style.setProperty('color', '#ffffff', 'important');
                        textEl.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
                        textEl.style.setProperty('opacity', '1', 'important');
                        textEl.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                    }
                });
            });
        });

        // Opacity-Probleme beheben
        const opacityElements = document.querySelectorAll('[style*="opacity: 0."], [style*="opacity:0."]');
        opacityElements.forEach(element => {
            if (this.isTextElement(element) || this.containsText(element)) {
                element.style.setProperty('opacity', '1', 'important');
                element.style.setProperty('color', '#ffffff', 'important');
            }
        });

        // NUKLEAR-OPTION: Alle Spans und h3 mit problematischen Styles
        const allSpans = document.querySelectorAll('span[style], h1[style], h2[style], h3[style], h4[style], h5[style], h6[style], p[style]');
        allSpans.forEach(el => {
            const style = el.getAttribute('style');
            if (style && (style.includes('color: #') || style.includes('color:#'))) {
                // Wenn es eine problematische Farbe hat, überschreiben
                el.style.setProperty('color', '#ffffff', 'important');
                el.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
                el.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
            }
        });
    }

    isTextElement(element) {
        const textTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'LI', 'LABEL'];
        return textTags.includes(element.tagName);
    }

    containsText(element) {
        return element.textContent && element.textContent.trim().length > 0;
    }

    setupMutationObserver() {
        if (this.observer) {
            this.observer.disconnect();
        }

        this.observer = new MutationObserver((mutations) => {
            let shouldCheck = false;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            shouldCheck = true;
                        }
                    });
                } else if (mutation.type === 'attributes') {
                    if (mutation.attributeName === 'data-theme' || 
                        mutation.attributeName === 'class' ||
                        mutation.attributeName === 'style') {
                        shouldCheck = true;
                    }
                }
            });

            if (shouldCheck) {
                setTimeout(() => this.checkAndApplyFix(), 100);
            }
        });

        this.observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-theme', 'class', 'style']
        });
    }

    setupThemeListener() {
        // Custom Event Listener für Theme-Änderungen
        document.addEventListener('themeChanged', () => {
            setTimeout(() => this.checkAndApplyFix(), 100);
        });

        // Storage Event für Theme-Änderungen
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme' || e.key === 'darkMode') {
                setTimeout(() => this.checkAndApplyFix(), 100);
            }
        });
    }

    emergencyCheck() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' ||
                          document.body.getAttribute('data-theme') === 'dark';

        if (isDarkMode) {
            // Prüfen ob es unsichtbare Texte gibt
            const potentiallyInvisibleElements = document.querySelectorAll(
                'div[style*="background"] h1, div[style*="background"] h2, div[style*="background"] h3, ' +
                'div[style*="background"] p, div[style*="background"] span'
            );

            let foundInvisible = false;
            potentiallyInvisibleElements.forEach(element => {
                const styles = window.getComputedStyle(element);
                const color = styles.color;
                const opacity = parseFloat(styles.opacity);
                
                // Prüfen auf dunkle Farben oder niedrige Opacity
                if (this.isDarkColor(color) || opacity < 0.8) {
                    foundInvisible = true;
                    element.style.setProperty('color', '#ffffff', 'important');
                    element.style.setProperty('opacity', '1', 'important');
                }
            });

            if (foundInvisible) {
                console.log('🚨 Emergency check found invisible text, applying fixes...');
            }
        }
    }

    isDarkColor(colorString) {
        // Einfache Prüfung auf dunkle Farben
        const darkColors = ['rgb(26, 26, 26)', 'rgb(51, 51, 51)', 'rgb(102, 102, 102)', 'rgb(0, 0, 0)'];
        return darkColors.some(dark => colorString.includes(dark.replace(/rgb\(|\)/g, '').replace(/, /g, ',')));
    }

    // Manueller Trigger für Debug-Zwecke
    forceApply() {
        console.log('🔧 MANUAL TRIGGER: Forcing dark mode emergency fix...');
        this.applyEmergencyFix();
    }

    // SPEZIAL-FIX für "Intelligente Suche" und ähnliche Kacheln
    fixSpecificProblemCards() {
        console.log('🎯 FIXING SPECIFIC PROBLEM CARDS like "Intelligente Suche"...');
        
        // Alle Spans mit color: #666 sofort überschreiben
        const greySpans = document.querySelectorAll('span[style*="color: #666"], span[style*="color:#666"]');
        greySpans.forEach(span => {
            span.style.setProperty('color', '#ffffff', 'important');
            span.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
            span.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
            console.log('Fixed grey span:', span.textContent);
        });

        // Alle H3 mit color: #1a1a1a sofort überschreiben
        const darkH3s = document.querySelectorAll('h3[style*="color: #1a1a1a"], h3[style*="color:#1a1a1a"]');
        darkH3s.forEach(h3 => {
            h3.style.setProperty('color', '#ffffff', 'important');
            h3.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
            h3.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
            h3.style.setProperty('font-weight', '700', 'important');
            console.log('Fixed dark h3:', h3.textContent);
        });

        // Alle Spans mit color: #999 überschreiben
        const lightGreySpans = document.querySelectorAll('span[style*="color: #999"], span[style*="color:#999"]');
        lightGreySpans.forEach(span => {
            span.style.setProperty('color', '#ffffff', 'important');
            span.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
            span.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
            console.log('Fixed light grey span:', span.textContent);
        });

        // Spezifisch die "Intelligente Suche" Kachel finden und alle Texte überschreiben
        const searchCards = document.querySelectorAll('div[style*="background-color: #EBF5FF"]');
        searchCards.forEach(card => {
            console.log('🔍 Found Enterprise Search Card, fixing all text...');
            const allElements = card.querySelectorAll('*');
            allElements.forEach(el => {
                if (el.textContent && el.textContent.trim().length > 0) {
                    el.style.setProperty('color', '#ffffff', 'important');
                    el.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
                    el.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                    el.style.setProperty('opacity', '1', 'important');
                }
            });
        });
    }

    // Debug-Modus aktivieren
    enableDebugMode() {
        document.documentElement.classList.add('debug-dark-mode-emergency');
        console.log('🐛 DEBUG MODE: All cards with inline styles will be highlighted');
    }

    disableDebugMode() {
        document.documentElement.classList.remove('debug-dark-mode-emergency');
    }
}

// Automatisch initialisieren
let darkModeEmergencyFix;

function initDarkModeEmergencyFix() {
    if (!darkModeEmergencyFix) {
        darkModeEmergencyFix = new DarkModeEmergencyFix();
        
        // Global verfügbar machen für Debug-Zwecke
        window.darkModeEmergencyFix = darkModeEmergencyFix;
        
        console.log('🚨 Dark Mode Emergency Fix initialized');
        console.log('Use window.darkModeEmergencyFix.forceApply() to manually trigger');
        console.log('Use window.darkModeEmergencyFix.enableDebugMode() for debugging');
    }
}

// DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkModeEmergencyFix);
} else {
    initDarkModeEmergencyFix();
}

// Sofortiger Trigger falls schon im Dark Mode
setTimeout(() => {
    if (darkModeEmergencyFix) {
        darkModeEmergencyFix.checkAndApplyFix();
    }
}, 500);

// ULTRA-AGGRESSIVE SOFORT-FIX für "Intelligente Suche" Kachel
setTimeout(() => {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        console.log('🚨 ULTRA-AGGRESSIVE IMMEDIATE FIX for "Intelligente Suche"...');
        
        // Sofortiger Fix für ALLE spans mit color: #666
        document.querySelectorAll('span[style*="color: #666"]').forEach(span => {
            span.style.setProperty('color', '#ffffff', 'important');
            span.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
            span.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
            console.log('🎯 IMMEDIATE FIX applied to:', span.textContent);
        });

        // Sofortiger Fix für ALLE h3 mit color: #1a1a1a
        document.querySelectorAll('h3[style*="color: #1a1a1a"]').forEach(h3 => {
            h3.style.setProperty('color', '#ffffff', 'important');
            h3.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
            h3.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
            console.log('🎯 IMMEDIATE FIX applied to h3:', h3.textContent);
        });

        // Spezifisch für die "Intelligente Suche" Kachel
        document.querySelectorAll('div[style*="background-color: #EBF5FF"]').forEach(card => {
            console.log('🔍 IMMEDIATE FIX for Enterprise Search Card');
            card.style.setProperty('background-color', 'rgba(26, 26, 26, 0.98)', 'important');
            
            card.querySelectorAll('*').forEach(el => {
                if (el.textContent && el.textContent.trim()) {
                    el.style.setProperty('color', '#ffffff', 'important');
                    el.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
                    el.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
                }
            });
        });
    }
}, 100);

// Wiederholende Überprüfung für hartnäckige Fälle
setInterval(() => {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        const problematicSpans = document.querySelectorAll('span[style*="color: #666"]');
        if (problematicSpans.length > 0) {
            console.log(`🚨 Found ${problematicSpans.length} problematic spans, fixing...`);
            problematicSpans.forEach(span => {
                span.style.setProperty('color', '#ffffff', 'important');
                span.style.setProperty('text-shadow', '0 2px 4px rgba(0, 0, 0, 0.8)', 'important');
            });
        }
    }
}, 2000);