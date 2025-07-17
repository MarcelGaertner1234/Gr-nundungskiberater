/**
 * LANDING PAGE HEADER FORCE FIX
 * JavaScript-basierte Notfall-Lösung für das Header-Positionierungs-Problem
 * Erzwingt zur Laufzeit die korrekte Positionierung, egal was CSS sagt
 */

class LandingPageHeaderForceFix {
    constructor() {
        this.header = null;
        this.heroSection = null;
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        // Warte auf DOM Ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.forceHeaderPosition());
        } else {
            this.forceHeaderPosition();
        }
        
        // Überwache Größenänderungen
        window.addEventListener('resize', () => this.forceHeaderPosition());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.forceHeaderPosition(), 500);
        });
        
        // Überwache Theme-Änderungen
        new MutationObserver(() => this.forceHeaderPosition()).observe(
            document.documentElement,
            { attributes: true, attributeFilter: ['data-theme'] }
        );
    }
    
    forceHeaderPosition() {
        try {
            console.log('🔧 Landing Page Header Force Fix wird ausgeführt...');
            
            this.header = document.querySelector('.header');
            this.heroSection = document.querySelector('.section-hero');
            
            if (!this.header || !this.heroSection) {
                console.warn('⚠️ Header oder Hero-Section nicht gefunden');
                return;
            }
            
            // Messe die tatsächliche Header-Höhe
            const headerHeight = this.getActualHeaderHeight();
            console.log(`📏 Gemessene Header-Höhe: ${headerHeight}px`);
            
            // Berechne sichere Padding-Top Werte
            const safePaddingTop = headerHeight + 50; // Extra 50px Sicherheit
            const mobileSafePaddingTop = headerHeight + 80; // Extra 80px auf Mobile
            
            // Erzwinge Header-Positionierung
            this.forceHeaderStyles(headerHeight);
            
            // Erzwinge Hero-Section Positionierung
            this.forceHeroStyles(safePaddingTop, mobileSafePaddingTop);
            
            // Erzwinge Body-Styles
            this.forceBodyStyles();
            
            // Validiere Ergebnis
            setTimeout(() => this.validatePositioning(), 100);
            
            this.initialized = true;
            console.log('✅ Landing Page Header Force Fix erfolgreich angewendet');
            
        } catch (error) {
            console.error('❌ Fehler im Header Force Fix:', error);
        }
    }
    
    getActualHeaderHeight() {
        const rect = this.header.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(this.header);
        const marginTop = parseInt(computedStyle.marginTop) || 0;
        const marginBottom = parseInt(computedStyle.marginBottom) || 0;
        
        return Math.max(rect.height + marginTop + marginBottom, 120);
    }
    
    forceHeaderStyles(headerHeight) {
        // ULTIMATIVE Header-Styles mit höchster Priorität
        const headerStyles = {
            'position': 'fixed !important',
            'top': '0 !important',
            'left': '0 !important',
            'right': '0 !important',
            'width': '100% !important',
            'z-index': '999999 !important',
            'background': document.documentElement.dataset.theme === 'dark' 
                ? 'rgba(10, 10, 10, 0.98) !important' 
                : 'white !important',
            'border-bottom': '3px solid #eee !important',
            'box-shadow': '0 8px 25px rgba(0,0,0,0.15) !important',
            'min-height': `${headerHeight}px !important`,
            'height': 'auto !important'
        };
        
        this.applyStyles(this.header, headerStyles);
        
        // Header Content Styles
        const headerContent = this.header.querySelector('.header-content');
        if (headerContent) {
            const contentStyles = {
                'height': 'auto !important',
                'min-height': `${headerHeight}px !important`,
                'padding': '25px 20px !important',
                'display': 'flex !important',
                'align-items': 'center !important',
                'justify-content': 'space-between !important',
                'flex-wrap': 'wrap !important',
                'gap': '20px !important'
            };
            this.applyStyles(headerContent, contentStyles);
        }
    }
    
    forceHeroStyles(safePaddingTop, mobileSafePaddingTop) {
        const isMobile = window.innerWidth <= 768;
        const paddingTop = isMobile ? mobileSafePaddingTop : safePaddingTop;
        
        const heroStyles = {
            'padding-top': `${paddingTop}px !important`,
            'margin-top': '0 !important',
            'min-height': `calc(100vh - ${paddingTop}px) !important`,
            'position': 'relative !important',
            'z-index': '1 !important',
            'background': 'rgba(0, 255, 0, 0.1) !important', // Debug: Grün
            'border': '5px solid green !important' // Debug: Grüne Grenze
        };
        
        this.applyStyles(this.heroSection, heroStyles);
        
        // Zusätzlich Inline-Style setzen
        this.heroSection.style.cssText += `
            padding-top: ${paddingTop}px !important;
            margin-top: 0 !important;
            min-height: calc(100vh - ${paddingTop}px) !important;
        `;
    }
    
    forceBodyStyles() {
        const bodyStyles = {
            'margin': '0 !important',
            'padding': '0 !important'
        };
        this.applyStyles(document.body, bodyStyles);
        
        // Alle anderen Sections nach unten drücken
        const sections = document.querySelectorAll('.section:not(.section-hero)');
        sections.forEach(section => {
            this.applyStyles(section, {
                'margin-top': '120px !important'
            });
        });
    }
    
    applyStyles(element, styles) {
        if (!element) return;
        
        Object.entries(styles).forEach(([property, value]) => {
            element.style.setProperty(property, value, 'important');
        });
    }
    
    validatePositioning() {
        const headerRect = this.header.getBoundingClientRect();
        const heroRect = this.heroSection.getBoundingClientRect();
        
        console.log('📊 Positionierungs-Validierung:');
        console.log(`Header Top: ${headerRect.top}px, Height: ${headerRect.height}px`);
        console.log(`Hero Top: ${heroRect.top}px`);
        
        const overlap = (headerRect.bottom - heroRect.top);
        if (overlap > 0) {
            console.warn(`⚠️ PROBLEM: Hero-Section überlappt Header um ${overlap}px!`);
            // Notfall-Korrektur
            this.emergencyFix(overlap);
        } else {
            console.log('✅ Positionierung korrekt - Keine Überlappung');
        }
    }
    
    emergencyFix(overlapAmount) {
        console.log('🚨 Notfall-Korrektur wird angewendet...');
        const currentPaddingTop = parseInt(window.getComputedStyle(this.heroSection).paddingTop);
        const newPaddingTop = currentPaddingTop + overlapAmount + 50; // Extra 50px Sicherheit
        
        this.heroSection.style.setProperty('padding-top', `${newPaddingTop}px`, 'important');
        console.log(`🔧 Notfall-Padding erhöht auf ${newPaddingTop}px`);
    }
    
    getStatus() {
        return {
            initialized: this.initialized,
            headerHeight: this.header ? this.getActualHeaderHeight() : 0,
            heroTop: this.heroSection ? this.heroSection.getBoundingClientRect().top : 0,
            theme: document.documentElement.dataset.theme || 'light'
        };
    }
}

// Erstelle globale Instanz
window.landingPageHeaderFix = new LandingPageHeaderForceFix();

// Debug-Funktionen
window.fixHeaderNow = () => {
    window.landingPageHeaderFix.forceHeaderPosition();
};

window.getHeaderStatus = () => {
    console.table(window.landingPageHeaderFix.getStatus());
};

console.log('🚀 Landing Page Header Force Fix geladen');
console.log('Debug-Commands: fixHeaderNow(), getHeaderStatus()');