/* MEGA GAP FINAL SOLUTION - Erstellt massiven 100px Abstand für garantierte Sichtbarkeit */

console.log('🚀 MEGA GAP FINAL SOLUTION: Startet - Erstellt MASSIVEN 100px Abstand!');

function applyMegaGapSolution() {
    console.log('💥 MEGA GAP: Erstelle MASSIVEN Abstand - 100px GAP garantiert!');
    
    // HEADER - KOMPAKT UND EFFIZIENT
    const headers = document.querySelectorAll('.header, header, [class*="header"], [id*="header"]');
    headers.forEach(header => {
        console.log('💥 MEGA HEADER FIX:', header);
        
        header.style.cssText = `
            position: fixed !important;
            top: 0px !important;
            left: 0px !important;
            right: 0px !important;
            width: 100% !important;
            height: 100px !important;
            min-height: 100px !important;
            max-height: 100px !important;
            z-index: 2147483647 !important;
            background: white !important;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2) !important;
            margin: 0 !important;
            padding: 5px 0 !important;
            transform: none !important;
            translate: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            border: none !important;
            border-bottom: 3px solid #007acc !important;
        `;
    });
    
    // HERO - MASSIVER ABSTAND
    const heroSections = document.querySelectorAll('.section-hero, .hero, [class*="hero"], [id*="hero"]');
    heroSections.forEach(hero => {
        console.log('💥 MEGA HERO FIX:', hero);
        
        // MEGA ABSTAND: 100px Header + 100px Gap + 100px Padding = 300px total
        hero.style.cssText = `
            position: relative !important;
            top: 0px !important;
            margin-top: 200px !important;
            padding-top: 100px !important;
            z-index: 1 !important;
            background: white !important;
            min-height: calc(100vh - 100px) !important;
            transform: none !important;
            translate: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            border: none !important;
            border-top: 5px solid #28a745 !important;
        `;
    });
    
    // HERO H1 - PERFEKTE SICHTBARKEIT
    const heroH1s = document.querySelectorAll('.section-hero h1, .hero h1, [class*="hero"] h1');
    heroH1s.forEach(h1 => {
        console.log('💥 MEGA H1 FIX:', h1);
        
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
            line-height: 1.3 !important;
            font-size: 2.5rem !important;
        `;
    });
    
    // DARK MODE MEGA SUPPORT
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        console.log('🌙 MEGA GAP: Dark Mode Mega Anpassung');
        
        headers.forEach(header => {
            header.style.background = '#1a1a1a !important';
            header.style.borderBottom = '3px solid #007acc !important';
        });
        
        heroSections.forEach(hero => {
            hero.style.background = '#1a1a1a !important';
            hero.style.borderTop = '5px solid #28a745 !important';
        });
        
        heroH1s.forEach(h1 => {
            h1.style.color = 'white !important';
        });
    }
    
    // MEGA MESSUNG
    setTimeout(() => {
        performMegaGapMeasurement();
    }, 300);
}

function performMegaGapMeasurement() {
    console.log('📊 MEGA GAP MEASUREMENT: Messe MASSIVEN Abstand');
    
    const header = document.querySelector('.header, header');
    const hero = document.querySelector('.section-hero, .hero');
    
    if (header && hero) {
        const headerRect = header.getBoundingClientRect();
        const heroRect = hero.getBoundingClientRect();
        
        const headerHeight = headerRect.height;
        const headerBottom = headerRect.bottom;
        const heroTop = heroRect.top;
        const gap = heroTop - headerBottom;
        
        console.log('💥 MEGA GAP FINAL MEASUREMENT:');
        console.log('   ================================');
        console.log('   Header Height:', headerHeight + 'px');
        console.log('   Header Bottom:', headerBottom + 'px');
        console.log('   Hero Top:', heroTop + 'px');
        console.log('   MEGA GAP:', gap + 'px');
        console.log('   ================================');
        
        if (gap >= 90) {
            console.log('🎉 MEGA SUCCESS! MASSIVER GAP von', gap + 'px - UNMÖGLICH zu übersehen!');
            console.log('💥 MEGA VICTORY: Header und Hero haben RIESIGEN Abstand!');
            showMegaGapVictoryNotification(gap);
        } else if (gap >= 50) {
            console.log('✅ GROSS! GAP von', gap + 'px - Deutlich sichtbar');
            console.log('🔧 MEGA BOOST: Vergrößere auf 100px für maximale Sichtbarkeit');
            applyMegaBoost(gap);
        } else if (gap >= 0) {
            console.log('⚠️ ZU KLEIN! GAP von nur', gap + 'px - MEGA BOOST erforderlich');
            applyMegaBoost(gap);
        } else {
            console.log('❌ MEGA PROBLEM! Noch', Math.abs(gap) + 'px Überlappung - ULTRA MEGA BOOST');
            applyUltraMegaBoost(Math.abs(gap));
        }
    }
}

function applyMegaBoost(currentGap) {
    console.log('🚀 MEGA BOOST: Vergrößere auf 100px für maximale Sichtbarkeit');
    
    const hero = document.querySelector('.section-hero, .hero');
    if (hero) {
        const targetGap = 100; // MEGA Ziel: 100px
        const neededIncrease = targetGap - currentGap;
        
        const currentMarginTop = parseInt(hero.style.marginTop) || 200;
        const newMarginTop = currentMarginTop + neededIncrease;
        
        hero.style.marginTop = newMarginTop + 'px !important';
        
        console.log('🔧 MEGA BOOST: Hero margin-top auf', newMarginTop + 'px erhöht');
        console.log('🎯 MEGA ZIEL: Erreiche', targetGap + 'px MEGA GAP');
        
        setTimeout(() => {
            performMegaGapMeasurement();
        }, 200);
    }
}

function applyUltraMegaBoost(overlapAmount) {
    console.log('🚨 ULTRA MEGA BOOST: Behebe', overlapAmount + 'px + 120px MEGA Sicherheit');
    
    const hero = document.querySelector('.section-hero, .hero');
    if (hero) {
        const currentMarginTop = parseInt(hero.style.marginTop) || 200;
        const newMarginTop = currentMarginTop + overlapAmount + 120; // Überlappung + 120px MEGA Gap
        
        hero.style.marginTop = newMarginTop + 'px !important';
        
        console.log('🔧 ULTRA MEGA: Hero margin-top auf', newMarginTop + 'px erhöht');
        
        setTimeout(() => {
            performMegaGapMeasurement();
        }, 200);
    }
}

function showMegaGapVictoryNotification(gap) {
    // ENTFERNE ALLE VORHERIGEN NOTIFICATIONS
    const existingNotifications = document.querySelectorAll('[data-notification]');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.setAttribute('data-notification', 'mega-gap-victory');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b6b, #ee5a24, #ff9ff3, #54a0ff);
        color: white;
        padding: 40px;
        border-radius: 20px;
        z-index: 2147483647;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        box-shadow: 0 10px 40px rgba(255, 107, 107, 0.5);
        max-width: 500px;
        text-align: center;
        animation: megaVictoryBounce 1s ease-out;
        border: 5px solid #ffffff;
    `;
    
    notification.innerHTML = `
        <div style="margin-bottom: 20px;">
            <span style="font-size: 60px;">🎉</span>
        </div>
        <div style="font-size: 28px; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            <strong>MEGA GAP VICTORY!</strong>
        </div>
        <div style="font-size: 18px; opacity: 0.95; line-height: 1.6; margin-bottom: 15px;">
            <strong>MASSIVER Abstand erreicht!</strong><br>
            MEGA GAP: <strong style="font-size: 24px; color: #ffff00;">${gap}px</strong><br>
            <span style="color: #b8e994;">Header und Hero PERFEKT getrennt!</span>
        </div>
        <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; font-size: 16px;">
            ✅ KEINE Überlappung mehr!<br>
            ✅ MEGA professioneller Abstand!<br>
            ✅ UNMÖGLICH zu übersehen!
        </div>
        <div style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
            Problem ENDGÜLTIG gelöst! 🚀
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // AUTO-REMOVE NACH 30 SEKUNDEN
    setTimeout(() => {
        notification.style.animation = 'megaVictoryOut 1s ease-in forwards';
        setTimeout(() => notification.remove(), 1000);
    }, 30000);
}

// MEGA VICTORY ANIMATIONS
const megaStyle = document.createElement('style');
megaStyle.textContent = `
    @keyframes megaVictoryBounce {
        0% { transform: translate(-50%, -50%) scale(0.3) rotate(-180deg); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2) rotate(10deg); opacity: 1; }
        70% { transform: translate(-50%, -50%) scale(0.9) rotate(-5deg); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
    }
    
    @keyframes megaVictoryOut {
        from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        to { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
    }
`;
document.head.appendChild(megaStyle);

// INIT MEGA GAP SOLUTION
function initMegaGapSolution() {
    console.log('🚀 MEGA GAP SOLUTION: Initialisierung - MASSIVER 100px Abstand');
    
    // MEHRFACHE ANWENDUNG FÜR ABSOLUTE SICHERHEIT
    applyMegaGapSolution();
    setTimeout(() => applyMegaGapSolution(), 500);
    setTimeout(() => applyMegaGapSolution(), 1000);
    setTimeout(() => applyMegaGapSolution(), 2500);
    
    console.log('💥 MEGA GAP SOLUTION: Aktiviert - Ziel: 100px MEGA GAP!');
}

// AUTO-INIT
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMegaGapSolution);
} else {
    initMegaGapSolution();
}

// GLOBAL EXPORT
window.applyMegaGapSolution = applyMegaGapSolution;
window.performMegaGapMeasurement = performMegaGapMeasurement;