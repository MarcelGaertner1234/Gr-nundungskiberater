/* LARGE GAP FIX - Erstellt einen deutlich größeren, sichtbaren Abstand */

console.log('🎯 LARGE GAP FIX: Startet - Erstellt deutlichen 50px+ Abstand');

function applyLargeGapFix() {
    console.log('🔧 LARGE GAP: Erstelle deutlich sichtbaren Abstand zwischen Header und Hero');
    
    // HEADER POSITIONING - KOMPAKT ABER SICHTBAR
    const headers = document.querySelectorAll('.header, header, [class*="header"], [id*="header"]');
    headers.forEach(header => {
        console.log('🔧 HEADER LARGE GAP FIX:', header);
        
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
            box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important;
            margin: 0 !important;
            padding: 8px 0 !important;
            transform: none !important;
            translate: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            border: none !important;
            border-bottom: 2px solid #e0e0e0 !important;
        `;
    });
    
    // HERO POSITIONING - DEUTLICHER ABSTAND
    const heroSections = document.querySelectorAll('.section-hero, .hero, [class*="hero"], [id*="hero"]');
    heroSections.forEach(hero => {
        console.log('🔧 HERO LARGE GAP FIX:', hero);
        
        // GROSSER ABSTAND: 120px Header + 50px Gap + 80px Padding = 250px
        hero.style.cssText = `
            position: relative !important;
            top: 0px !important;
            margin-top: 170px !important;
            padding-top: 80px !important;
            z-index: 1 !important;
            background: white !important;
            min-height: calc(100vh - 120px) !important;
            transform: none !important;
            translate: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            border: none !important;
        `;
    });
    
    // HERO H1 OPTIMIERUNG
    const heroH1s = document.querySelectorAll('.section-hero h1, .hero h1, [class*="hero"] h1');
    heroH1s.forEach(h1 => {
        console.log('🔧 HERO H1 LARGE GAP FIX:', h1);
        
        h1.style.cssText = `
            position: relative !important;
            z-index: 10 !important;
            color: #1a1a1a !important;
            margin-top: 0 !important;
            padding-top: 0 !important;
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
            transform: none !important;
            translate: none !important;
            border: none !important;
            line-height: 1.2 !important;
        `;
    });
    
    // DARK MODE SUPPORT
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        console.log('🌙 LARGE GAP: Dark Mode Anpassung');
        
        headers.forEach(header => {
            header.style.background = '#1a1a1a !important';
            header.style.borderBottom = '2px solid #333 !important';
        });
        
        heroSections.forEach(hero => {
            hero.style.background = '#1a1a1a !important';
        });
        
        heroH1s.forEach(h1 => {
            h1.style.color = 'white !important';
        });
    }
    
    // MESSUNG NACH ANWENDUNG
    setTimeout(() => {
        performLargeGapMeasurement();
    }, 200);
}

function performLargeGapMeasurement() {
    console.log('📊 LARGE GAP MEASUREMENT: Messe deutlichen Abstand');
    
    const header = document.querySelector('.header, header');
    const hero = document.querySelector('.section-hero, .hero');
    
    if (header && hero) {
        const headerRect = header.getBoundingClientRect();
        const heroRect = hero.getBoundingClientRect();
        
        const headerHeight = headerRect.height;
        const headerBottom = headerRect.bottom;
        const heroTop = heroRect.top;
        const gap = heroTop - headerBottom;
        
        console.log('🎯 LARGE GAP FINAL MEASUREMENT:');
        console.log('   Header Height:', headerHeight + 'px');
        console.log('   Header Bottom Position:', headerBottom + 'px');
        console.log('   Hero Top Position:', heroTop + 'px');
        console.log('   VISIBLE GAP:', gap + 'px');
        console.log('   ================================');
        
        if (gap >= 50) {
            console.log('✅ PERFEKT! Großer GAP von', gap + 'px - Deutlich sichtbarer Abstand!');
            console.log('🎉 LARGE GAP SUCCESS: Header und Hero perfekt getrennt!');
            showLargeGapSuccessNotification(gap);
        } else if (gap >= 20) {
            console.log('✅ GUT! GAP von', gap + 'px - Sichtbarer Abstand vorhanden');
            console.log('ℹ️ HINWEIS: Falls visuell noch zu nah, wird größerer Abstand erstellt...');
            
            // AUTOMATISCHE VERGRÖSSERUNG FÜR NOCH BESSERE SICHTBARKEIT
            applyExtraLargeGap(gap);
        } else if (gap >= 0) {
            console.log('⚠️ MINIMAL: GAP von nur', gap + 'px - Vergrößere auf 50px+');
            applyExtraLargeGap(gap);
        } else {
            console.log('❌ PROBLEM: Noch', Math.abs(gap) + 'px Überlappung - Emergency Fix');
            applyEmergencyLargeGap(Math.abs(gap));
        }
    }
}

function applyExtraLargeGap(currentGap) {
    console.log('🚀 EXTRA LARGE GAP: Vergrößere Abstand für bessere Sichtbarkeit');
    
    const hero = document.querySelector('.section-hero, .hero');
    if (hero) {
        const targetGap = 60; // Ziel: 60px sichtbarer Abstand
        const neededIncrease = targetGap - currentGap;
        
        const currentMarginTop = parseInt(hero.style.marginTop) || 170;
        const newMarginTop = currentMarginTop + neededIncrease;
        
        hero.style.marginTop = newMarginTop + 'px !important';
        
        console.log('🔧 EXTRA LARGE: Hero margin-top auf', newMarginTop + 'px erhöht');
        console.log('🎯 ZIEL: Erreiche', targetGap + 'px sichtbaren Abstand');
        
        // ERNEUTE MESSUNG
        setTimeout(() => {
            performLargeGapMeasurement();
        }, 100);
    }
}

function applyEmergencyLargeGap(overlapAmount) {
    console.log('🚨 EMERGENCY LARGE GAP: Behebe', overlapAmount + 'px Überlappung + 60px Extra');
    
    const hero = document.querySelector('.section-hero, .hero');
    if (hero) {
        const currentMarginTop = parseInt(hero.style.marginTop) || 170;
        const newMarginTop = currentMarginTop + overlapAmount + 60; // Überlappung + 60px Gap
        
        hero.style.marginTop = newMarginTop + 'px !important';
        
        console.log('🔧 EMERGENCY: Hero margin-top auf', newMarginTop + 'px erhöht');
        
        setTimeout(() => {
            performLargeGapMeasurement();
        }, 100);
    }
}

function showLargeGapSuccessNotification(gap) {
    // ENTFERNE ALTE NOTIFICATIONS
    const existingNotifications = document.querySelectorAll('[data-notification="large-gap-success"]');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.setAttribute('data-notification', 'large-gap-success');
    notification.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        padding: 25px;
        border-radius: 15px;
        z-index: 2147483647;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        box-shadow: 0 6px 30px rgba(52, 152, 219, 0.4);
        max-width: 350px;
        animation: largeGapBounce 0.8s ease-out;
        border: 3px solid #2471a3;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 32px; margin-right: 15px;">🎯</span>
            <strong style="font-size: 18px;">LARGE GAP SUCCESS!</strong>
        </div>
        <div style="font-size: 15px; opacity: 0.95; line-height: 1.5;">
            <strong>Deutlicher Abstand erreicht!</strong><br>
            Sichtbarer GAP: <strong>${gap}px</strong><br>
            <span style="color: #85c1e9;">Header und Hero perfekt getrennt! 🎉</span>
        </div>
        <div style="margin-top: 12px; font-size: 13px; opacity: 0.85; background: rgba(255,255,255,0.1); padding: 8px; border-radius: 6px;">
            ✅ Kein Overlap mehr!<br>
            ✅ Professioneller Abstand!
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // AUTO-REMOVE NACH 20 SEKUNDEN
    setTimeout(() => {
        notification.style.animation = 'largeGapOut 0.6s ease-in forwards';
        setTimeout(() => notification.remove(), 600);
    }, 20000);
}

// ANIMATION STYLES
const largeGapStyle = document.createElement('style');
largeGapStyle.textContent = `
    @keyframes largeGapBounce {
        0% { transform: translateX(100%) scale(0.7); opacity: 0; }
        70% { transform: translateX(-15px) scale(1.08); opacity: 1; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
    }
    
    @keyframes largeGapOut {
        from { transform: translateX(0) scale(1); opacity: 1; }
        to { transform: translateX(100%) scale(0.8); opacity: 0; }
    }
`;
document.head.appendChild(largeGapStyle);

// INIT LARGE GAP FIX
function initLargeGapFix() {
    console.log('🚀 LARGE GAP FIX: Initialisierung - Erstelle deutlichen Abstand');
    
    // MEHRFACHE ANWENDUNG FÜR SICHERHEIT
    applyLargeGapFix();
    setTimeout(() => applyLargeGapFix(), 300);
    setTimeout(() => applyLargeGapFix(), 800);
    setTimeout(() => applyLargeGapFix(), 2000);
    
    console.log('✅ LARGE GAP FIX: Aktiviert - Ziel: 50-60px sichtbarer Abstand');
}

// AUTO-INIT
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLargeGapFix);
} else {
    initLargeGapFix();
}

// GLOBAL EXPORT
window.applyLargeGapFix = applyLargeGapFix;
window.performLargeGapMeasurement = performLargeGapMeasurement;