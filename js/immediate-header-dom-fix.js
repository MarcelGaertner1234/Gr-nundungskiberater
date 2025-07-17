/* SOFORTIGE DOM-MANIPULATION - HEADER-FIX */
/* Dieses Script läuft SOFORT und korrigiert alle Positionierungen */

console.log('🚨 IMMEDIATE HEADER DOM FIX: Starting aggressive intervention...');

// SOFORT AUSFÜHREN - Nicht auf DOM Ready warten
(function immediateHeaderFix() {
    
    // STUFE 1: INLINE STYLES FORCIEREN
    function forceHeaderPosition() {
        const header = document.querySelector('.header') || document.querySelector('header');
        if (header) {
            console.log('🔧 Forciere Header Position...');
            header.style.cssText = `
                position: fixed !important;
                top: 0px !important;
                left: 0px !important;
                right: 0px !important;
                width: 100vw !important;
                height: 140px !important;
                z-index: 2147483647 !important;
                background: rgba(255, 255, 255, 0.98) !important;
                backdrop-filter: blur(20px) !important;
                box-shadow: 0 2px 20px rgba(0,0,0,0.15) !important;
                border: 5px solid blue !important;
                outline: 5px solid cyan !important;
            `;
            
            // Header Content
            const headerContent = header.querySelector('.header-content');
            if (headerContent) {
                headerContent.style.cssText = `
                    height: 140px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    padding: 0 24px !important;
                    max-width: 1400px !important;
                    margin: 0 auto !important;
                `;
            }
        }
    }
    
    // STUFE 2: HERO SECTION SPACING FORCIEREN
    function forceHeroSpacing() {
        const heroSection = document.querySelector('.section-hero') || document.querySelector('section.section-hero');
        if (heroSection) {
            console.log('🔧 Forciere Hero Spacing...');
            heroSection.style.cssText = `
                margin-top: 0px !important;
                padding-top: 300px !important;
                min-height: calc(100vh - 140px) !important;
                position: relative !important;
                z-index: 1 !important;
                border: 5px solid orange !important;
                outline: 5px solid red !important;
                background: rgba(255, 0, 0, 0.1) !important;
            `;
            
            // Container innerhalb Hero
            const container = heroSection.querySelector('.container');
            if (container) {
                container.style.cssText = `
                    padding-top: 60px !important;
                    position: relative !important;
                    z-index: 10 !important;
                `;
            }
            
            // H1 Element
            const h1 = heroSection.querySelector('h1');
            if (h1) {
                h1.style.cssText = `
                    margin-top: 0px !important;
                    padding-top: 20px !important;
                    position: relative !important;
                    z-index: 100 !important;
                    border: 5px solid lime !important;
                    outline: 5px solid green !important;
                    background: rgba(0, 255, 0, 0.2) !important;
                    padding: 20px !important;
                `;
            }
        }
    }
    
    // STUFE 3: BODY RESET
    function forceBodyReset() {
        document.body.style.cssText = `
            margin-top: 0px !important;
            padding-top: 0px !important;
        `;
        document.documentElement.style.cssText = `
            margin-top: 0px !important;
            padding-top: 0px !important;
        `;
    }
    
    // STUFE 4: ALLE ANDEREN SECTIONS FIXEN
    function fixAllSections() {
        const allSections = document.querySelectorAll('section, .section');
        allSections.forEach((section, index) => {
            if (section.classList.contains('section-hero') || index === 0) {
                // Erste Section oder Hero - speziell behandeln
                section.style.marginTop = '0px !important';
                section.style.paddingTop = '300px !important';
            }
        });
    }
    
    // SOFORT AUSFÜHREN
    forceBodyReset();
    forceHeaderPosition();
    forceHeroSpacing();
    fixAllSections();
    
    console.log('✅ IMMEDIATE HEADER DOM FIX: Erste Welle abgeschlossen');
    
    // INTERVAL FÜR KONTINUIERLICHE ÜBERWACHUNG
    let fixInterval = setInterval(function() {
        const header = document.querySelector('.header');
        const heroSection = document.querySelector('.section-hero');
        
        if (header && heroSection) {
            // Überprüfe ob Header-Position korrekt ist
            const headerStyle = window.getComputedStyle(header);
            const heroStyle = window.getComputedStyle(heroSection);
            
            if (headerStyle.position !== 'fixed') {
                console.warn('🔄 Header Position korrigiert');
                forceHeaderPosition();
            }
            
            if (parseInt(heroStyle.paddingTop) < 250) {
                console.warn('🔄 Hero Padding korrigiert');
                forceHeroSpacing();
            }
        }
    }, 1000);
    
    // Nach 30 Sekunden stoppen
    setTimeout(() => {
        clearInterval(fixInterval);
        console.log('🛑 IMMEDIATE HEADER DOM FIX: Überwachung beendet');
    }, 30000);
    
})();

// ZUSÄTZLICHE DOM READY ABSICHERUNG
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM Ready - Zusätzliche Header-Fix-Prüfung...');
    
    setTimeout(function() {
        const header = document.querySelector('.header');
        const heroSection = document.querySelector('.section-hero');
        const h1 = heroSection ? heroSection.querySelector('h1') : null;
        
        if (header && heroSection && h1) {
            const headerRect = header.getBoundingClientRect();
            const h1Rect = h1.getBoundingClientRect();
            
            console.log('📊 FINAL CHECK:');
            console.log('Header Bottom:', headerRect.bottom);
            console.log('H1 Top:', h1Rect.top);
            console.log('Gap:', h1Rect.top - headerRect.bottom);
            
            if (h1Rect.top > headerRect.bottom + 20) {
                console.log('🎉 SUCCESS: Header-Hero-Überlappung erfolgreich behoben!');
                
                // SUCCESS ALERT
                const successAlert = document.createElement('div');
                successAlert.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: #10b981;
                        color: white;
                        padding: 30px 40px;
                        border-radius: 12px;
                        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                        z-index: 9999999;
                        font-family: system-ui, -apple-system, sans-serif;
                        font-size: 18px;
                        font-weight: 600;
                        text-align: center;
                        border: 3px solid white;
                    ">
                        🎉 ERFOLGREICH! 🎉<br>
                        Header-Hero-Problem behoben!<br>
                        <small style="font-size: 14px; opacity: 0.9;">Gap: ${Math.round(h1Rect.top - headerRect.bottom)}px</small>
                    </div>
                `;
                document.body.appendChild(successAlert);
                
                setTimeout(() => {
                    successAlert.style.transition = 'opacity 1s';
                    successAlert.style.opacity = '0';
                    setTimeout(() => successAlert.remove(), 1000);
                }, 4000);
                
            } else {
                console.error('❌ NOCH IMMER PROBLEM: Header überlappt Hero');
                
                // ERROR ALERT
                const errorAlert = document.createElement('div');
                errorAlert.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: #ef4444;
                        color: white;
                        padding: 30px 40px;
                        border-radius: 12px;
                        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                        z-index: 9999999;
                        font-family: system-ui, -apple-system, sans-serif;
                        font-size: 18px;
                        font-weight: 600;
                        text-align: center;
                        border: 3px solid white;
                    ">
                        ⚠️ PROBLEM ERKANNT! ⚠️<br>
                        Header überlappt noch immer<br>
                        <small style="font-size: 14px; opacity: 0.9;">Gap: ${Math.round(h1Rect.top - headerRect.bottom)}px</small>
                    </div>
                `;
                document.body.appendChild(errorAlert);
                
                setTimeout(() => {
                    errorAlert.style.transition = 'opacity 1s';
                    errorAlert.style.opacity = '0';
                    setTimeout(() => errorAlert.remove(), 1000);
                }, 6000);
            }
        }
    }, 1000);
});