/* FINAL 20PX GAP FIX - Behebt die letzten 20px Überlappung präzise */

console.log('🎯 FINAL 20PX GAP FIX: Startet - Behebt letzte 20px Überlappung');

function applyFinal20pxFix() {
    console.log('🔧 FINAL FIX: Anwendung der präzisen 20px Korrektur');
    
    // HEADER FINAL POSITIONING
    const headers = document.querySelectorAll('.header, header, [class*="header"], [id*="header"]');
    headers.forEach(header => {
        console.log('🔧 HEADER FINAL FIX:', header);
        
        // PRÄZISE INLINE STYLES
        header.style.cssText = `
            position: fixed !important;
            top: 0px !important;
            left: 0px !important;
            right: 0px !important;
            width: 100% !important;
            height: 140px !important;
            min-height: 140px !important;
            max-height: 140px !important;
            z-index: 2147483647 !important;
            background: white !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
            margin: 0 !important;
            padding: 10px 0 !important;
            transform: none !important;
            translate: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            border: none !important;
        `;
    });
    
    // HERO FINAL POSITIONING WITH 20PX BUFFER
    const heroSections = document.querySelectorAll('.section-hero, .hero, [class*="hero"], [id*="hero"]');
    heroSections.forEach(hero => {
        console.log('🔧 HERO FINAL FIX:', hero);
        
        // PRÄZISE INLINE STYLES - EXTRA 20PX BUFFER
        hero.style.cssText = `
            position: relative !important;
            top: 0px !important;
            margin-top: 160px !important;
            padding-top: 60px !important;
            z-index: 1 !important;
            background: white !important;
            min-height: calc(100vh - 140px) !important;
            transform: none !important;
            translate: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            border: none !important;
        `;
    });
    
    // HERO H1 FINAL POSITIONING
    const heroH1s = document.querySelectorAll('.section-hero h1, .hero h1, [class*="hero"] h1');
    heroH1s.forEach(h1 => {
        console.log('🔧 HERO H1 FINAL FIX:', h1);
        
        h1.style.cssText = `
            position: relative !important;
            z-index: 10 !important;
            color: #1a1a1a !important;
            margin-top: 0 !important;
            padding-top: 20px !important;
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
            transform: none !important;
            translate: none !important;
            border: none !important;
        `;
    });
    
    // DARK MODE ANPASSUNG
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        console.log('🌙 FINAL FIX: Dark Mode Anpassung');
        
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
    
    // FINALE MESSUNG NACH 100MS
    setTimeout(() => {
        performFinalMeasurement();
    }, 100);
}

function performFinalMeasurement() {
    console.log('📊 FINAL MEASUREMENT: Überprüfe 20px Fix');
    
    const header = document.querySelector('.header, header');
    const hero = document.querySelector('.section-hero, .hero');
    
    if (header && hero) {
        const headerRect = header.getBoundingClientRect();
        const heroRect = hero.getBoundingClientRect();
        
        const headerBottom = headerRect.bottom;
        const heroTop = heroRect.top;
        const gap = heroTop - headerBottom;
        
        console.log('🎯 FINAL 20PX FIX MEASUREMENT:');
        console.log('   Header Height:', headerRect.height + 'px');
        console.log('   Header Bottom:', headerBottom + 'px');
        console.log('   Hero Top:', heroTop + 'px');
        console.log('   FINAL GAP:', gap + 'px');
        
        if (gap >= 20) {
            console.log('✅ PERFEKT! GAP von', gap + 'px - Optimaler Abstand erreicht!');
            showFinalSuccessNotification(gap);
        } else if (gap >= 0) {
            console.log('✅ GUT! Minimaler GAP von', gap + 'px - Keine Überlappung!');
            showFinalSuccessNotification(gap);
        } else {
            console.log('❌ ACHTUNG! Noch', Math.abs(gap) + 'px Überlappung - Weitere Korrektur nötig');
            applyEmergency20pxBoost(Math.abs(gap));
        }
    }
}

function applyEmergency20pxBoost(remainingOverlap) {
    console.log('🚨 EMERGENCY 20PX BOOST: Zusätzliche', remainingOverlap + 20, 'px Korrektur');
    
    const hero = document.querySelector('.section-hero, .hero');
    if (hero) {
        const currentMarginTop = parseInt(hero.style.marginTop) || 160;
        const newMarginTop = currentMarginTop + remainingOverlap + 20; // +20px Sicherheit
        
        hero.style.marginTop = newMarginTop + 'px !important';
        
        console.log('🔧 EMERGENCY BOOST: Hero margin-top auf', newMarginTop + 'px erhöht');
        
        // ERNEUTE MESSUNG
        setTimeout(() => {
            performFinalMeasurement();
        }, 100);
    }
}

function showFinalSuccessNotification(gap) {
    // ENTFERNE VORHERIGE NOTIFICATIONS
    const existingNotifications = document.querySelectorAll('[data-notification="final-success"]');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.setAttribute('data-notification', 'final-success');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 20px;
        border-radius: 15px;
        z-index: 2147483647;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        box-shadow: 0 4px 25px rgba(39, 174, 96, 0.4);
        max-width: 320px;
        animation: finalSuccessBounce 0.6s ease-out;
        border: 2px solid #1e8449;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 28px; margin-right: 12px;">🎯</span>
            <strong style="font-size: 16px;">FINAL SUCCESS!</strong>
        </div>
        <div style="font-size: 14px; opacity: 0.95; line-height: 1.4;">
            <strong>20px Fix erfolgreich!</strong><br>
            Final GAP: <strong>${gap}px</strong><br>
            Header-Hero Problem GELÖST! 🎉
        </div>
        <div style="margin-top: 10px; font-size: 12px; opacity: 0.8;">
            Nuclear Option + 20px Fix = Perfect!
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // AUTO-REMOVE NACH 15 SEKUNDEN
    setTimeout(() => {
        notification.style.animation = 'finalSuccessOut 0.5s ease-in forwards';
        setTimeout(() => notification.remove(), 500);
    }, 15000);
}

// FINAL SUCCESS ANIMATION
const finalStyle = document.createElement('style');
finalStyle.textContent = `
    @keyframes finalSuccessBounce {
        0% { transform: translateX(100%) scale(0.8); opacity: 0; }
        60% { transform: translateX(-10px) scale(1.05); opacity: 1; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
    }
    
    @keyframes finalSuccessOut {
        from { transform: translateX(0) scale(1); opacity: 1; }
        to { transform: translateX(100%) scale(0.9); opacity: 0; }
    }
`;
document.head.appendChild(finalStyle);

// INIT FINAL 20PX FIX
function initFinal20pxFix() {
    console.log('🚀 FINAL 20PX FIX: Initialisierung');
    
    // SOFORTIGE ANWENDUNG
    applyFinal20pxFix();
    
    // DELAYED ANWENDUNG FÜR SICHERHEIT
    setTimeout(() => applyFinal20pxFix(), 500);
    setTimeout(() => applyFinal20pxFix(), 1500);
    
    console.log('✅ FINAL 20PX FIX: Aktiviert - Header 140px, Hero margin 160px + padding 60px');
}

// AUTO-INIT
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFinal20pxFix);
} else {
    initFinal20pxFix();
}

// GLOBAL EXPORT
window.applyFinal20pxFix = applyFinal20pxFix;
window.performFinalMeasurement = performFinalMeasurement;