/* FINALER HEADER-HERO-TEST - Eindeutige Statusmeldung */

console.log('🔍 FINALER HEADER-HERO-TEST: Starting comprehensive analysis...');

// Warte auf DOM und alle Fixes
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        performFinalAnalysis();
    }, 2000); // 2 Sekunden warten bis alle Fixes gelaufen sind
});

function performFinalAnalysis() {
    console.log('🔍 STARTING FINAL ANALYSIS...');
    
    const header = document.querySelector('.header') || document.querySelector('header');
    const heroSection = document.querySelector('.section-hero');
    const h1 = heroSection ? heroSection.querySelector('h1') : null;
    
    if (!header) {
        showResult('ERROR', 'Header-Element nicht gefunden!', '#ef4444');
        return;
    }
    
    if (!heroSection) {
        showResult('ERROR', 'Hero-Section nicht gefunden!', '#ef4444');
        return;
    }
    
    if (!h1) {
        showResult('ERROR', 'H1-Element nicht gefunden!', '#ef4444');
        return;
    }
    
    // DETAILLIERTE MESSUNGEN
    const headerRect = header.getBoundingClientRect();
    const h1Rect = h1.getBoundingClientRect();
    const gap = h1Rect.top - headerRect.bottom;
    
    // CSS-WERTE ANALYSIEREN
    const headerStyle = window.getComputedStyle(header);
    const heroStyle = window.getComputedStyle(heroSection);
    
    console.log('📊 FINAL MEASUREMENTS:');
    console.log('Header Position:', headerStyle.position);
    console.log('Header Height:', headerStyle.height);
    console.log('Header Z-Index:', headerStyle.zIndex);
    console.log('Header Bottom:', headerRect.bottom + 'px');
    console.log('Hero Padding-Top:', heroStyle.paddingTop);
    console.log('H1 Top:', h1Rect.top + 'px');
    console.log('GAP:', gap + 'px');
    
    // ERFOLGS-/FEHLER-BESTIMMUNG
    const isHeaderFixed = headerStyle.position === 'fixed';
    const hasEnoughPadding = parseInt(heroStyle.paddingTop) >= 200;
    const hasPositiveGap = gap > 20;
    
    let status, message, color;
    
    if (isHeaderFixed && hasEnoughPadding && hasPositiveGap) {
        status = 'ERFOLG';
        message = `✅ Problem gelöst! Gap: ${Math.round(gap)}px`;
        color = '#10b981';
        console.log('🎉 SUCCESS: Header-Hero-Problem erfolgreich behoben!');
    } else if (isHeaderFixed && hasEnoughPadding && gap > 0) {
        status = 'TEILWEISE';
        message = `⚠️ Teilweise gelöst! Gap: ${Math.round(gap)}px (sollte >20px sein)`;
        color = '#f59e0b';
        console.log('⚠️ PARTIAL SUCCESS: Problem teilweise behoben, aber Gap zu klein');
    } else {
        status = 'FEHLER';
        message = `❌ Problem besteht! Gap: ${Math.round(gap)}px`;
        color = '#ef4444';
        console.log('❌ FAILURE: Problem besteht weiterhin');
        
        // DEBUGGING INFO
        if (!isHeaderFixed) console.log('🔍 DEBUG: Header ist nicht fixed positioned');
        if (!hasEnoughPadding) console.log('🔍 DEBUG: Hero hat nicht genug Padding');
        if (gap <= 0) console.log('🔍 DEBUG: Negative oder null Gap - Header überlappt');
    }
    
    showResult(status, message, color);
    
    // DETAILBERICHT SENDEN
    createDetailReport(status, {
        headerPosition: headerStyle.position,
        headerHeight: headerStyle.height,
        headerZIndex: headerStyle.zIndex,
        heroPadding: heroStyle.paddingTop,
        gap: gap,
        isHeaderFixed: isHeaderFixed,
        hasEnoughPadding: hasEnoughPadding,
        hasPositiveGap: hasPositiveGap
    });
}

function showResult(status, message, color) {
    // GROSSER VOLLBILD-ALERT
    const alertDiv = document.createElement('div');
    alertDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999999;
            font-family: system-ui, -apple-system, sans-serif;
        ">
            <div style="
                background: ${color};
                color: white;
                padding: 40px 60px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                text-align: center;
                max-width: 600px;
                border: 5px solid white;
            ">
                <h1 style="font-size: 36px; margin: 0 0 20px 0; font-weight: 700;">
                    HEADER-HERO-TEST
                </h1>
                <h2 style="font-size: 24px; margin: 0 0 30px 0; font-weight: 600;">
                    Status: ${status}
                </h2>
                <p style="font-size: 18px; margin: 0 0 30px 0; line-height: 1.6;">
                    ${message}
                </p>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                    background: white;
                    color: ${color};
                    border: none;
                    padding: 15px 30px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                ">
                    OK, verstanden
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Automatisch nach 15 Sekunden schließen
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.style.transition = 'opacity 1s';
            alertDiv.style.opacity = '0';
            setTimeout(() => alertDiv.remove(), 1000);
        }
    }, 15000);
}

function createDetailReport(status, data) {
    console.log('📋 CREATING DETAIL REPORT...');
    
    const report = {
        timestamp: new Date().toISOString(),
        status: status,
        measurements: data,
        browserInfo: {
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    };
    
    console.log('📊 FINAL REPORT:', report);
    
    // REPORT IN LOCALSTORAGE SPEICHERN
    try {
        localStorage.setItem('header-hero-test-report', JSON.stringify(report));
        console.log('💾 Report in localStorage gespeichert');
    } catch (e) {
        console.warn('⚠️ Konnte Report nicht in localStorage speichern:', e);
    }
}