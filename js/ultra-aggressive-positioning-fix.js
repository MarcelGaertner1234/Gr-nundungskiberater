/* ULTRA-AGGRESSIVE POSITIONING FIX - Überschreibt ALLES mit maximaler Priorität */

console.log('🚨 ULTRA-AGGRESSIVE POSITIONING FIX: Startet - Überschreibt ALLE CSS-Regeln');

// SOFORTIGE INLINE-STYLE INJECTION - Kann NICHT überschrieben werden
function forceUltraAggressivePositioning() {
    console.log('🔥 ULTRA-AGGRESSIVE: Erzwinge Positionierung mit maximaler Priorität');
    
    // HEADER ULTRA-AGGRESSIVE POSITIONING
    const headers = document.querySelectorAll('.header, header, [class*="header"], [id*="header"]');
    headers.forEach(header => {
        console.log('🔥 HEADER GEFUNDEN:', header);
        
        // INLINE STYLES - HÖCHSTE PRIORITÄT
        header.style.cssText = `
            position: fixed !important;
            top: 0px !important;
            left: 0px !important;
            right: 0px !important;
            width: 100% !important;
            height: 120px !important;
            min-height: 120px !important;
            max-height: 120px !important;
            z-index: 2147483647 !important;
            background: white !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: none !important;
            translate: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        `;
        
        // ZUSÄTZLICHE ATTRIBUTE
        header.setAttribute('data-ultra-fix', 'header-fixed');
    });
    
    // HERO ULTRA-AGGRESSIVE POSITIONING
    const heroSections = document.querySelectorAll('.section-hero, .hero, [class*="hero"], [id*="hero"]');
    heroSections.forEach(hero => {
        console.log('🔥 HERO GEFUNDEN:', hero);
        
        // INLINE STYLES - HÖCHSTE PRIORITÄT
        hero.style.cssText = `
            position: relative !important;
            top: 0px !important;
            margin-top: 120px !important;
            padding-top: 150px !important;
            z-index: 1 !important;
            background: white !important;
            min-height: calc(100vh - 120px) !important;
            transform: none !important;
            translate: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        `;
        
        // ZUSÄTZLICHE ATTRIBUTE
        hero.setAttribute('data-ultra-fix', 'hero-spaced');
    });
    
    // HERO H1 ULTRA-AGGRESSIVE VISIBILITY
    const heroH1s = document.querySelectorAll('.section-hero h1, .hero h1, [class*="hero"] h1');
    heroH1s.forEach(h1 => {
        console.log('🔥 HERO H1 GEFUNDEN:', h1);
        
        h1.style.cssText = `
            position: relative !important;
            z-index: 10 !important;
            color: #1a1a1a !important;
            margin-top: 0 !important;
            padding-top: 20px !important;
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
            font-size: inherit !important;
            line-height: inherit !important;
            transform: none !important;
            translate: none !important;
        `;
        
        h1.setAttribute('data-ultra-fix', 'h1-visible');
    });
    
    // DARK MODE DETECTION UND ANPASSUNG
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        console.log('🌙 DARK MODE ERKANNT - Anpassung der Farben');
        
        headers.forEach(header => {
            header.style.background = '#1a1a1a !important';
            header.style.borderBottom = '1px solid #333 !important';
        });
        
        heroSections.forEach(hero => {
            hero.style.background = '#1a1a1a !important';
        });
        
        heroH1s.forEach(h1 => {
            h1.style.color = 'white !important';
        });
    }
    
    // MEASUREMENT UND VALIDATION
    setTimeout(() => {
        measureAndReport();
    }, 100);
}

// MESSUNG UND VALIDIERUNG
function measureAndReport() {
    const header = document.querySelector('.header, header');
    const hero = document.querySelector('.section-hero, .hero');
    
    if (header && hero) {
        const headerRect = header.getBoundingClientRect();
        const heroRect = hero.getBoundingClientRect();
        
        const headerBottom = headerRect.bottom;
        const heroTop = heroRect.top;
        const gap = heroTop - headerBottom;
        
        console.log('📊 ULTRA-AGGRESSIVE MEASUREMENT:');
        console.log('   Header Bottom:', headerBottom + 'px');
        console.log('   Hero Top:', heroTop + 'px');
        console.log('   GAP:', gap + 'px');
        
        if (gap >= 0) {
            console.log('✅ ERFOLG: Positiver GAP - Keine Überlappung!');
        } else {
            console.log('❌ WARNUNG: Negativer GAP - Überlappung von', Math.abs(gap) + 'px');
            
            // NOTFALL-KORREKTUR
            emergencyGapCorrection(Math.abs(gap));
        }
    }
}

// NOTFALL GAP-KORREKTUR
function emergencyGapCorrection(overlapAmount) {
    console.log('🚨 NOTFALL-KORREKTUR: Überlappung von', overlapAmount + 'px wird behoben');
    
    const hero = document.querySelector('.section-hero, .hero');
    if (hero) {
        const currentPaddingTop = parseInt(hero.style.paddingTop) || 150;
        const newPaddingTop = currentPaddingTop + overlapAmount + 50; // +50px Sicherheitsabstand
        
        hero.style.paddingTop = newPaddingTop + 'px !important';
        
        console.log('🔧 KORREKTUR: Hero padding-top auf', newPaddingTop + 'px erhöht');
        
        // ERNEUTE MESSUNG
        setTimeout(() => {
            measureAndReport();
        }, 100);
    }
}

// CONTINUOUS MONITORING - Überwacht Änderungen
function startContinuousMonitoring() {
    console.log('🔄 CONTINUOUS MONITORING: Startet - Überwacht Positionierung dauerhaft');
    
    setInterval(() => {
        // CHECK OB FIXES NOCH AKTIV SIND
        const header = document.querySelector('.header, header');
        const hero = document.querySelector('.section-hero, .hero');
        
        if (header && !header.getAttribute('data-ultra-fix')) {
            console.log('🚨 ULTRA-FIX VERLOREN - Erneute Anwendung');
            forceUltraAggressivePositioning();
        }
        
        if (hero && !hero.getAttribute('data-ultra-fix')) {
            console.log('🚨 ULTRA-FIX VERLOREN - Erneute Anwendung');
            forceUltraAggressivePositioning();
        }
    }, 1000); // Jede Sekunde prüfen
}

// OVERRIDE ALLE CSS MANIPULATION
const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
CSSStyleDeclaration.prototype.setProperty = function(property, value, priority) {
    // VERHINDERE ÜBERSCHREIBUNG UNSERER FIXES
    if (this.ownerNode && this.ownerNode.getAttribute && this.ownerNode.getAttribute('data-ultra-fix')) {
        console.log('🛡️ CSS OVERRIDE BLOCKIERT für:', property);
        return;
    }
    
    return originalSetProperty.call(this, property, value, priority);
};

// INIT SEQUENCE
function initUltraAggressiveFix() {
    console.log('🚀 ULTRA-AGGRESSIVE POSITIONING FIX: Initialisierung');
    
    // SOFORTIGE ANWENDUNG
    forceUltraAggressivePositioning();
    
    // DELAYED ANWENDUNG - Falls DOM noch lädt
    setTimeout(() => forceUltraAggressivePositioning(), 100);
    setTimeout(() => forceUltraAggressivePositioning(), 500);
    setTimeout(() => forceUltraAggressivePositioning(), 1000);
    
    // CONTINUOUS MONITORING STARTEN
    startContinuousMonitoring();
    
    console.log('✅ ULTRA-AGGRESSIVE FIX: Vollständig aktiviert');
}

// AUTO-INIT
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUltraAggressiveFix);
} else {
    initUltraAggressiveFix();
}

// EXPOSE GLOBALLY
window.forceUltraAggressivePositioning = forceUltraAggressivePositioning;
window.measureAndReport = measureAndReport;