/* FORENSISCHE HEADER-ANALYSE - Root Cause Detective */

console.log('🔍 FORENSIC ANALYSIS: Starting root cause investigation...');

class HeaderForensicAnalyzer {
    constructor() {
        this.issues = [];
        this.cssConflicts = [];
        this.jsErrors = [];
        this.init();
    }
    
    init() {
        console.log('🕵️ FORENSIC ANALYZER: Initializing deep investigation...');
        
        // Sofort starten
        this.startImmediate();
        
        // DOM Ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.fullAnalysis());
        } else {
            this.fullAnalysis();
        }
    }
    
    startImmediate() {
        console.log('⚡ IMMEDIATE FORENSICS: Checking basic elements...');
        
        // 1. GRUNDLEGENDE ELEMENT-EXISTENZ
        setTimeout(() => {
            this.checkElementExistence();
            this.checkCSSLoadOrder();
            this.checkJavaScriptErrors();
        }, 100);
    }
    
    checkElementExistence() {
        console.log('🔍 CHECKING ELEMENT EXISTENCE...');
        
        const header = document.querySelector('.header') || document.querySelector('header');
        const heroSection = document.querySelector('.section-hero');
        const headerContent = header ? header.querySelector('.header-content') : null;
        
        console.log('📋 ELEMENT EXISTENCE REPORT:');
        console.log('  Header (.header):', header ? '✅ Found' : '❌ NOT FOUND');
        console.log('  Hero (.section-hero):', heroSection ? '✅ Found' : '❌ NOT FOUND');
        console.log('  Header Content (.header-content):', headerContent ? '✅ Found' : '❌ NOT FOUND');
        
        if (!header) {
            this.addIssue('CRITICAL', 'Header element not found', 'The .header or header element does not exist in DOM');
        }
        
        if (!heroSection) {
            this.addIssue('CRITICAL', 'Hero section not found', 'The .section-hero element does not exist in DOM');
        }
        
        return { header, heroSection, headerContent };
    }
    
    checkCSSLoadOrder() {
        console.log('🔍 CHECKING CSS LOAD ORDER...');
        
        const allStylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        console.log('📋 CSS FILES LOADED (in order):');
        
        allStylesheets.forEach((link, index) => {
            const href = link.href;
            const filename = href.split('/').pop();
            console.log(`  ${index + 1}. ${filename}`);
            
            // Check for our fix files
            if (filename.includes('immediate-header-fix')) {
                console.log('    🔧 Our mega-fix CSS found at position', index + 1);
            }
            if (filename.includes('clean-header-fix')) {
                console.log('    ✨ Our clean CSS found at position', index + 1);
            }
        });
        
        // Check if CSS might be loading after our fixes
        const suspiciousLateCSS = allStylesheets.slice(-3);
        console.log('⚠️ LAST 3 CSS FILES (might override our fixes):');
        suspiciousLateCSS.forEach((link, index) => {
            console.log(`  ${allStylesheets.length - 3 + index + 1}. ${link.href.split('/').pop()}`);
        });
    }
    
    checkJavaScriptErrors() {
        console.log('🔍 CHECKING JAVASCRIPT ERRORS...');
        
        // Override console.error to catch JS errors
        const originalError = console.error;
        console.error = (...args) => {
            this.jsErrors.push(args.join(' '));
            originalError.apply(console, args);
        };
        
        // Check for specific script errors
        window.addEventListener('error', (e) => {
            this.jsErrors.push(`${e.filename}:${e.lineno} - ${e.message}`);
            console.log('🚨 JavaScript Error detected:', e.message);
        });
    }
    
    fullAnalysis() {
        console.log('🔍 FULL FORENSIC ANALYSIS: Starting comprehensive investigation...');
        
        setTimeout(() => {
            this.analyzeCSS();
            this.analyzeDOM();
            this.analyzeBehavior();
            this.generateReport();
        }, 1000);
    }
    
    analyzeCSS() {
        console.log('🔍 ANALYZING CSS CONFLICTS...');
        
        const header = document.querySelector('.header') || document.querySelector('header');
        const heroSection = document.querySelector('.section-hero');
        
        if (header) {
            const headerStyles = window.getComputedStyle(header);
            console.log('📊 HEADER COMPUTED STYLES:');
            console.log('  position:', headerStyles.position);
            console.log('  top:', headerStyles.top);
            console.log('  left:', headerStyles.left);
            console.log('  right:', headerStyles.right);
            console.log('  width:', headerStyles.width);
            console.log('  height:', headerStyles.height);
            console.log('  z-index:', headerStyles.zIndex);
            console.log('  background:', headerStyles.background);
            console.log('  border:', headerStyles.border);
            console.log('  transform:', headerStyles.transform);
            
            // Check if our styles are applied
            if (headerStyles.position !== 'fixed') {
                this.addIssue('HIGH', 'Header not fixed positioned', `Position is "${headerStyles.position}", should be "fixed"`);
            }
            
            if (headerStyles.zIndex !== '2147483647' && headerStyles.zIndex !== '999999') {
                this.addIssue('MEDIUM', 'Header z-index too low', `Z-index is "${headerStyles.zIndex}", should be very high`);
            }
        }
        
        if (heroSection) {
            const heroStyles = window.getComputedStyle(heroSection);
            console.log('📊 HERO COMPUTED STYLES:');
            console.log('  margin-top:', heroStyles.marginTop);
            console.log('  padding-top:', heroStyles.paddingTop);
            console.log('  position:', heroStyles.position);
            console.log('  z-index:', heroStyles.zIndex);
            console.log('  border:', heroStyles.border);
            console.log('  background:', heroStyles.background);
            
            const paddingTop = parseInt(heroStyles.paddingTop);
            if (paddingTop < 150) {
                this.addIssue('HIGH', 'Hero padding too small', `Padding-top is "${heroStyles.paddingTop}", should be >150px`);
            }
        }
    }
    
    analyzeDOM() {
        console.log('🔍 ANALYZING DOM STRUCTURE...');
        
        // Check inline styles
        const header = document.querySelector('.header') || document.querySelector('header');
        const heroSection = document.querySelector('.section-hero');
        
        if (header && header.style.cssText) {
            console.log('📋 HEADER INLINE STYLES:', header.style.cssText);
        } else {
            console.log('⚠️ No inline styles found on header');
        }
        
        if (heroSection && heroSection.style.cssText) {
            console.log('📋 HERO INLINE STYLES:', heroSection.style.cssText);
        } else {
            console.log('⚠️ No inline styles found on hero section');
        }
        
        // Check for interfering elements
        const allFixedElements = Array.from(document.querySelectorAll('*')).filter(el => {
            const style = window.getComputedStyle(el);
            return style.position === 'fixed' || style.position === 'absolute';
        });
        
        console.log('📋 ALL POSITIONED ELEMENTS:');
        allFixedElements.forEach((el, index) => {
            const style = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            console.log(`  ${index + 1}. ${el.tagName}.${el.className} - ${style.position} - z:${style.zIndex} - top:${rect.top}`);
        });
    }
    
    analyzeBehavior() {
        console.log('🔍 ANALYZING RUNTIME BEHAVIOR...');
        
        const header = document.querySelector('.header') || document.querySelector('header');
        const heroSection = document.querySelector('.section-hero');
        const h1 = heroSection ? heroSection.querySelector('h1') : null;
        
        if (header && heroSection && h1) {
            const headerRect = header.getBoundingClientRect();
            const h1Rect = h1.getBoundingClientRect();
            const gap = h1Rect.top - headerRect.bottom;
            
            console.log('📊 POSITIONING MEASUREMENTS:');
            console.log('  Header Bottom:', headerRect.bottom + 'px');
            console.log('  H1 Top:', h1Rect.top + 'px');
            console.log('  Gap:', gap + 'px');
            console.log('  Viewport Height:', window.innerHeight + 'px');
            console.log('  Scroll Position:', window.scrollY + 'px');
            
            if (gap <= 0) {
                this.addIssue('CRITICAL', 'Header still overlapping', `Gap is ${gap}px, header is covering hero content`);
            } else if (gap < 20) {
                this.addIssue('MEDIUM', 'Gap too small', `Gap is ${gap}px, should be >20px for safe margin`);
            }
        }
    }
    
    addIssue(severity, title, description) {
        this.issues.push({ severity, title, description, timestamp: new Date().toISOString() });
        console.log(`🚨 ISSUE [${severity}]: ${title} - ${description}`);
    }
    
    generateReport() {
        console.log('📋 GENERATING FORENSIC REPORT...');
        
        const report = {
            timestamp: new Date().toISOString(),
            issues: this.issues,
            jsErrors: this.jsErrors,
            cssConflicts: this.cssConflicts,
            browserInfo: {
                userAgent: navigator.userAgent,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                scrollPosition: window.scrollY
            }
        };
        
        console.log('🔍 FORENSIC ANALYSIS COMPLETE');
        console.log('📊 FINAL REPORT:', report);
        
        // Show visual report
        this.showVisualReport(report);
        
        // Store in localStorage
        localStorage.setItem('header-forensic-report', JSON.stringify(report));
        
        return report;
    }
    
    showVisualReport(report) {
        const severity = this.getHighestSeverity();
        const color = severity === 'CRITICAL' ? '#ef4444' : severity === 'HIGH' ? '#f59e0b' : '#10b981';
        
        const reportDiv = document.createElement('div');
        reportDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999999;
                font-family: monospace;
                color: white;
            ">
                <div style="
                    background: ${color};
                    padding: 30px;
                    border-radius: 10px;
                    max-width: 80%;
                    max-height: 80%;
                    overflow-y: auto;
                    border: 3px solid white;
                ">
                    <h2 style="margin: 0 0 20px 0; font-size: 24px;">🔍 FORENSIC ANALYSIS REPORT</h2>
                    <p><strong>Highest Severity:</strong> ${severity}</p>
                    <p><strong>Total Issues:</strong> ${report.issues.length}</p>
                    <p><strong>JavaScript Errors:</strong> ${report.jsErrors.length}</p>
                    
                    <h3>🚨 Issues Found:</h3>
                    <div style="max-height: 300px; overflow-y: auto; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
                        ${report.issues.map(issue => `
                            <div style="margin-bottom: 10px; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 3px;">
                                <strong>[${issue.severity}]</strong> ${issue.title}<br>
                                <small>${issue.description}</small>
                            </div>
                        `).join('')}
                        
                        ${report.jsErrors.length > 0 ? `
                            <h4>JavaScript Errors:</h4>
                            ${report.jsErrors.map(error => `<div style="color: #fca5a5; font-size: 12px;">${error}</div>`).join('')}
                        ` : ''}
                    </div>
                    
                    <div style="margin-top: 20px; text-align: center;">
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                            background: white;
                            color: ${color};
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            font-weight: bold;
                            cursor: pointer;
                        ">CLOSE REPORT</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(reportDiv);
    }
    
    getHighestSeverity() {
        if (this.issues.some(i => i.severity === 'CRITICAL')) return 'CRITICAL';
        if (this.issues.some(i => i.severity === 'HIGH')) return 'HIGH';
        if (this.issues.some(i => i.severity === 'MEDIUM')) return 'MEDIUM';
        return 'LOW';
    }
}

// Initialize immediately
const forensicAnalyzer = new HeaderForensicAnalyzer();

// Expose globally
window.forensicAnalyzer = forensicAnalyzer;