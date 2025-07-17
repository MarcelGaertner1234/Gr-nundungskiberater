/* HERO SPACING SUCCESS INDICATOR */

// Warte bis DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 HERO SPACING FIX: Initialisierung gestartet...');
    
    // Warte ein wenig für CSS-Ladung
    setTimeout(function() {
        const header = document.querySelector('.header');
        const heroSection = document.querySelector('.section-hero');
        
        if (header && heroSection) {
            // Überprüfe Header Position
            const headerStyle = window.getComputedStyle(header);
            const headerPosition = headerStyle.position;
            const headerZIndex = headerStyle.zIndex;
            
            // Überprüfe Hero Padding
            const heroStyle = window.getComputedStyle(heroSection);
            const heroPaddingTop = heroStyle.paddingTop;
            
            console.log('📊 HEADER ANALYSIS:');
            console.log('   Position:', headerPosition);
            console.log('   Z-Index:', headerZIndex);
            console.log('   Height:', headerStyle.height);
            
            console.log('📊 HERO ANALYSIS:');
            console.log('   Padding-Top:', heroPaddingTop);
            console.log('   Margin-Top:', heroStyle.marginTop);
            console.log('   Position:', heroStyle.position);
            
            // Erfolgs-Check
            const headerFixed = headerPosition === 'fixed';
            const heroSpaced = parseInt(heroPaddingTop) >= 150; // Mindestens 150px padding
            
            if (headerFixed && heroSpaced) {
                console.log('✅ ERFOLG: Header-Hero-Überlappung behoben!');
                console.log('✅ Header ist fixed positioned');
                console.log('✅ Hero hat ausreichend Abstand');
                
                // Visuelle Bestätigung (optional)
                const successDiv = document.createElement('div');
                successDiv.innerHTML = `
                    <div style="
                        position: fixed; 
                        bottom: 20px; 
                        right: 20px; 
                        background: #10b981; 
                        color: white; 
                        padding: 12px 20px; 
                        border-radius: 8px; 
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        z-index: 1000000;
                        font-family: system-ui, -apple-system, sans-serif;
                        font-size: 14px;
                        font-weight: 500;
                    ">
                        ✅ Header-Hero-Fix erfolgreich geladen!
                    </div>
                `;
                document.body.appendChild(successDiv);
                
                // Nach 5 Sekunden ausblenden
                setTimeout(() => {
                    successDiv.style.opacity = '0';
                    successDiv.style.transition = 'opacity 0.5s';
                    setTimeout(() => successDiv.remove(), 500);
                }, 5000);
                
            } else {
                console.warn('⚠️ WARNUNG: Header-Hero-Fix möglicherweise nicht vollständig wirksam');
                if (!headerFixed) console.warn('   Header ist nicht fixed positioned');
                if (!heroSpaced) console.warn('   Hero hat nicht genügend Abstand');
            }
        } else {
            console.error('❌ FEHLER: Header oder Hero-Section nicht gefunden');
        }
    }, 500);
});

// Zusätzliche Scroll-Position-Überprüfung
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    if (scrollY < 50) { // Nur am Seitenanfang prüfen
        const header = document.querySelector('.header');
        const heroH1 = document.querySelector('.section-hero h1');
        
        if (header && heroH1) {
            const headerRect = header.getBoundingClientRect();
            const h1Rect = heroH1.getBoundingClientRect();
            
            if (h1Rect.top < headerRect.bottom) {
                console.warn('⚠️ ÜBERLAPPUNG ERKANNT: H1 ist noch unter dem Header!');
                console.log('Header Bottom:', headerRect.bottom);
                console.log('H1 Top:', h1Rect.top);
            }
        }
    }
});