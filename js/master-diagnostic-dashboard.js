/* MASTER DIAGNOSTIC DASHBOARD - Koordiniert alle Analysen */

console.log('🎯 MASTER DIAGNOSTIC DASHBOARD: Initializing comprehensive analysis...');

class MasterDiagnosticDashboard {
    constructor() {
        this.analyses = {};
        this.dashboard = null;
        this.init();
    }
    
    init() {
        console.log('🎯 MASTER DASHBOARD: Starting comprehensive diagnostics...');
        
        // Warte bis alle anderen Scripts geladen sind
        setTimeout(() => {
            this.collectAllAnalyses();
            this.createDashboard();
        }, 5000);
    }
    
    collectAllAnalyses() {
        console.log('📋 COLLECTING ALL ANALYSES...');
        
        // Sammle alle verfügbaren Analysen
        try {
            this.analyses.forensic = window.forensicAnalyzer?.getHighestSeverity() || 'No data';
        } catch (e) {
            this.analyses.forensic = 'Error: ' + e.message;
        }
        
        try {
            this.analyses.cssConflicts = window.conflictDetector?.getConflictReport() || 'No data';
        } catch (e) {
            this.analyses.cssConflicts = 'Error: ' + e.message;
        }
        
        try {
            this.analyses.structure = window.structureInspector?.issues || [];
        } catch (e) {
            this.analyses.structure = 'Error: ' + e.message;
        }
        
        // Aktueller Header/Hero Status
        this.analyses.currentStatus = this.getCurrentStatus();
        
        // Browser Info
        this.analyses.browser = {
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 ALL ANALYSES COLLECTED:', this.analyses);
    }
    
    getCurrentStatus() {
        console.log('🔍 GETTING CURRENT STATUS...');
        
        const header = document.querySelector('.header') || document.querySelector('header');
        const heroSection = document.querySelector('.section-hero');
        const h1 = heroSection ? heroSection.querySelector('h1') : null;
        
        if (!header || !heroSection || !h1) {
            return {
                status: 'CRITICAL',
                message: 'Essential elements missing',
                details: {
                    header: !!header,
                    heroSection: !!heroSection,
                    h1: !!h1
                }
            };
        }
        
        const headerStyle = window.getComputedStyle(header);
        const heroStyle = window.getComputedStyle(heroSection);
        const headerRect = header.getBoundingClientRect();
        const h1Rect = h1.getBoundingClientRect();
        const gap = h1Rect.top - headerRect.bottom;
        
        const status = {
            elements: {
                header: {
                    exists: true,
                    position: headerStyle.position,
                    zIndex: headerStyle.zIndex,
                    height: headerStyle.height,
                    top: headerRect.top,
                    bottom: headerRect.bottom
                },
                hero: {
                    exists: true,
                    paddingTop: heroStyle.paddingTop,
                    marginTop: heroStyle.marginTop,
                    position: heroStyle.position
                },
                h1: {
                    exists: true,
                    top: h1Rect.top,
                    text: h1.textContent.substring(0, 50) + '...'
                }
            },
            gap: gap,
            analysis: this.analyzeGap(gap, headerStyle.position, heroStyle.paddingTop)
        };
        
        return status;
    }
    
    analyzeGap(gap, headerPosition, heroPadding) {
        if (headerPosition !== 'fixed') {
            return {
                status: 'ERROR',
                message: 'Header is not fixed positioned',
                severity: 'CRITICAL'
            };
        }
        
        if (gap <= 0) {
            return {
                status: 'ERROR',
                message: `Header overlapping by ${Math.abs(gap)}px`,
                severity: 'CRITICAL'
            };
        }
        
        if (gap < 20) {
            return {
                status: 'WARNING',
                message: `Gap too small: ${gap}px`,
                severity: 'MEDIUM'
            };
        }
        
        return {
            status: 'SUCCESS',
            message: `Good gap: ${gap}px`,
            severity: 'LOW'
        };
    }
    
    createDashboard() {
        console.log('🎛️ CREATING DIAGNOSTIC DASHBOARD...');
        
        const severity = this.getOverallSeverity();
        const color = this.getSeverityColor(severity);
        
        this.dashboard = document.createElement('div');
        this.dashboard.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999999;
                font-family: monospace;
                color: white;
                overflow-y: auto;
            ">
                <div style="
                    background: ${color};
                    padding: 20px;
                    border-radius: 15px;
                    max-width: 90%;
                    max-height: 90%;
                    overflow-y: auto;
                    border: 4px solid white;
                    box-shadow: 0 0 50px rgba(0,0,0,0.5);
                ">
                    <h1 style="margin: 0 0 20px 0; font-size: 28px; text-align: center;">
                        🎯 MASTER DIAGNOSTIC DASHBOARD
                    </h1>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="margin: 0; font-size: 24px;">Overall Status: ${severity}</h2>
                        <p style="margin: 5px 0 0 0; font-size: 14px;">
                            ${this.analyses.currentStatus.analysis.message}
                        </p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                        ${this.createStatusCard('CURRENT MEASUREMENTS', this.formatCurrentStatus())}
                        ${this.createStatusCard('ELEMENT STATUS', this.formatElementStatus())}
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 30px;">
                        ${this.createAnalysisCard('FORENSIC ANALYSIS', this.formatForensicAnalysis())}
                        ${this.createAnalysisCard('CSS CONFLICTS', this.formatCSSConflicts())}
                        ${this.createAnalysisCard('STRUCTURE CHECK', this.formatStructureCheck())}
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 0; font-size: 16px;">🔧 QUICK ACTIONS</h3>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button onclick="window.masterDashboard.forceHeaderFix()" style="
                                background: #ef4444; color: white; border: none; padding: 8px 12px; 
                                border-radius: 4px; cursor: pointer; font-size: 12px;
                            ">🚨 Force Header Fix</button>
                            <button onclick="window.masterDashboard.testCleanMode()" style="
                                background: #10b981; color: white; border: none; padding: 8px 12px; 
                                border-radius: 4px; cursor: pointer; font-size: 12px;
                            ">✨ Test Clean Mode</button>
                            <button onclick="window.masterDashboard.refreshAnalysis()" style="
                                background: #6b7280; color: white; border: none; padding: 8px 12px; 
                                border-radius: 4px; cursor: pointer; font-size: 12px;
                            ">🔄 Refresh Analysis</button>
                            <button onclick="window.masterDashboard.exportReport()" style="
                                background: #3b82f6; color: white; border: none; padding: 8px 12px; 
                                border-radius: 4px; cursor: pointer; font-size: 12px;
                            ">📄 Export Report</button>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <button onclick="window.masterDashboard.closeDashboard()" style="
                            background: white;
                            color: ${color};
                            border: none;
                            padding: 15px 30px;
                            border-radius: 8px;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 16px;
                        ">CLOSE DASHBOARD</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.dashboard);
        console.log('🎛️ Dashboard created and displayed');
    }
    
    createStatusCard(title, content) {
        return `
            <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
                <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #fbbf24;">${title}</h3>
                <div style="font-size: 12px; line-height: 1.4;">${content}</div>
            </div>
        `;
    }
    
    createAnalysisCard(title, content) {
        return `
            <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px;">
                <h4 style="margin: 0 0 8px 0; font-size: 12px; color: #fbbf24;">${title}</h4>
                <div style="font-size: 11px; line-height: 1.3;">${content}</div>
            </div>
        `;
    }
    
    formatCurrentStatus() {
        const status = this.analyses.currentStatus;
        return `
            <strong>Gap:</strong> ${status.gap}px<br>
            <strong>Header Position:</strong> ${status.elements.header.position}<br>
            <strong>Header Z-Index:</strong> ${status.elements.header.zIndex}<br>
            <strong>Hero Padding:</strong> ${status.elements.hero.paddingTop}<br>
            <strong>Analysis:</strong> ${status.analysis.status}
        `;
    }
    
    formatElementStatus() {
        const status = this.analyses.currentStatus;
        return `
            <strong>Header:</strong> ${status.elements.header.exists ? '✅' : '❌'} Found<br>
            <strong>Hero Section:</strong> ${status.elements.hero.exists ? '✅' : '❌'} Found<br>
            <strong>H1 Element:</strong> ${status.elements.h1.exists ? '✅' : '❌'} Found<br>
            <strong>H1 Text:</strong> ${status.elements.h1.text || 'N/A'}
        `;
    }
    
    formatForensicAnalysis() {
        if (typeof this.analyses.forensic === 'string') {
            return this.analyses.forensic;
        }
        
        const report = window.forensicAnalyzer?.issues || [];
        return `
            <strong>Issues Found:</strong> ${report.length}<br>
            <strong>Critical:</strong> ${report.filter(i => i.severity === 'CRITICAL').length}<br>
            <strong>High:</strong> ${report.filter(i => i.severity === 'HIGH').length}<br>
            <strong>Medium:</strong> ${report.filter(i => i.severity === 'MEDIUM').length}
        `;
    }
    
    formatCSSConflicts() {
        if (typeof this.analyses.cssConflicts === 'string') {
            return this.analyses.cssConflicts;
        }
        
        const conflicts = this.analyses.cssConflicts.summary || {};
        return `
            <strong>Total Conflicts:</strong> ${conflicts.totalConflicts || 0}<br>
            <strong>Header Conflicts:</strong> ${conflicts.headerConflicts || 0}<br>
            <strong>Hero Conflicts:</strong> ${conflicts.heroConflicts || 0}<br>
            <strong>Status:</strong> ${conflicts.totalConflicts > 0 ? '⚠️ Issues' : '✅ Clean'}
        `;
    }
    
    formatStructureCheck() {
        if (typeof this.analyses.structure === 'string') {
            return this.analyses.structure;
        }
        
        const issues = this.analyses.structure || [];
        return `
            <strong>Structure Issues:</strong> ${issues.length}<br>
            <strong>Critical:</strong> ${issues.filter(i => i.severity === 'CRITICAL').length}<br>
            <strong>High:</strong> ${issues.filter(i => i.severity === 'HIGH').length}<br>
            <strong>Status:</strong> ${issues.length === 0 ? '✅ Good' : '⚠️ Issues'}
        `;
    }
    
    getOverallSeverity() {
        const status = this.analyses.currentStatus;
        
        if (status.analysis.severity === 'CRITICAL') return 'CRITICAL';
        if (status.analysis.severity === 'MEDIUM') return 'WARNING';
        return 'SUCCESS';
    }
    
    getSeverityColor(severity) {
        switch (severity) {
            case 'CRITICAL': return '#ef4444';
            case 'WARNING': return '#f59e0b';
            case 'SUCCESS': return '#10b981';
            default: return '#6b7280';
        }
    }
    
    forceHeaderFix() {
        console.log('🚨 FORCING HEADER FIX...');
        
        const header = document.querySelector('.header') || document.querySelector('header');
        const heroSection = document.querySelector('.section-hero');
        
        if (header) {
            header.style.cssText = `
                position: fixed !important;
                top: 0px !important;
                left: 0px !important;
                right: 0px !important;
                width: 100vw !important;
                height: 140px !important;
                z-index: 2147483647 !important;
                background: rgba(255, 255, 255, 0.98) !important;
                border: 5px solid blue !important;
            `;
        }
        
        if (heroSection) {
            heroSection.style.cssText = `
                margin-top: 0px !important;
                padding-top: 400px !important;
                position: relative !important;
                z-index: 1 !important;
                border: 5px solid red !important;
            `;
        }
        
        setTimeout(() => this.refreshAnalysis(), 1000);
    }
    
    testCleanMode() {
        console.log('✨ TESTING CLEAN MODE...');
        
        if (window.headerFixSwitcher) {
            window.headerFixSwitcher.enableCleanMode();
        }
        
        setTimeout(() => this.refreshAnalysis(), 1000);
    }
    
    refreshAnalysis() {
        console.log('🔄 REFRESHING ANALYSIS...');
        
        this.closeDashboard();
        
        setTimeout(() => {
            this.collectAllAnalyses();
            this.createDashboard();
        }, 500);
    }
    
    exportReport() {
        console.log('📄 EXPORTING REPORT...');
        
        const report = {
            timestamp: new Date().toISOString(),
            analyses: this.analyses,
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        const dataStr = JSON.stringify(report, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `header-diagnostic-report-${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }
    
    closeDashboard() {
        if (this.dashboard) {
            this.dashboard.remove();
            this.dashboard = null;
        }
    }
}

// Initialize after delay
setTimeout(() => {
    window.masterDashboard = new MasterDiagnosticDashboard();
}, 6000);

console.log('🎯 MASTER DIAGNOSTIC DASHBOARD: Will initialize in 6 seconds...');