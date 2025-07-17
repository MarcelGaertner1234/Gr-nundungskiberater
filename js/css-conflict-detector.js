/* CSS CONFLICT DETECTOR - Findet was unsere Fixes überschreibt */

console.log('🔍 CSS CONFLICT DETECTOR: Starting investigation...');

class CSSConflictDetector {
    constructor() {
        this.conflicts = [];
        this.styleObserver = null;
        this.init();
    }
    
    init() {
        console.log('🕵️ CSS CONFLICT DETECTOR: Initializing...');
        this.detectCSSOverrides();
        this.monitorStyleChanges();
        this.analyzeSpecificity();
    }
    
    detectCSSOverrides() {
        console.log('🔍 DETECTING CSS OVERRIDES...');
        
        const header = document.querySelector('.header') || document.querySelector('header');
        const heroSection = document.querySelector('.section-hero');
        
        if (header) {
            this.analyzeElementStyles(header, 'HEADER');
        }
        
        if (heroSection) {
            this.analyzeElementStyles(heroSection, 'HERO SECTION');
        }
    }
    
    analyzeElementStyles(element, name) {
        console.log(`🔍 ANALYZING ${name} STYLES...`);
        
        // Get all applied CSS rules
        const computedStyle = window.getComputedStyle(element);
        
        // Try to find which stylesheets are affecting this element
        const allStyleSheets = Array.from(document.styleSheets);
        const affectingRules = [];
        
        allStyleSheets.forEach((sheet, sheetIndex) => {
            try {
                const rules = Array.from(sheet.cssRules || sheet.rules || []);
                rules.forEach((rule, ruleIndex) => {
                    if (rule.selectorText && element.matches && element.matches(rule.selectorText)) {
                        affectingRules.push({
                            sheet: sheet.href || 'inline-styles',
                            sheetIndex,
                            ruleIndex,
                            selector: rule.selectorText,
                            cssText: rule.cssText,
                            specificity: this.calculateSpecificity(rule.selectorText)
                        });
                    }
                });
            } catch (e) {
                console.warn('Could not access stylesheet:', sheet.href, e);
            }
        });
        
        console.log(`📊 ${name} - AFFECTING CSS RULES (${affectingRules.length} total):`);
        
        // Sort by specificity (highest first)
        affectingRules.sort((a, b) => b.specificity - a.specificity);
        
        affectingRules.slice(0, 10).forEach((rule, index) => {
            console.log(`  ${index + 1}. [${rule.specificity}] ${rule.selector}`);
            console.log(`     From: ${rule.sheet.split('/').pop() || 'inline'}`);
            
            // Check if this rule conflicts with our fix
            if (this.isConflictingRule(rule, name)) {
                this.conflicts.push({
                    element: name,
                    rule: rule,
                    conflict: 'High specificity rule may override our fixes'
                });
            }
        });
        
        // Check for important inline styles
        if (element.style.cssText) {
            console.log(`📋 ${name} INLINE STYLES:`, element.style.cssText);
        }
    }
    
    isConflictingRule(rule, elementName) {
        const cssText = rule.cssText.toLowerCase();
        
        if (elementName === 'HEADER') {
            return cssText.includes('position') || 
                   cssText.includes('top') || 
                   cssText.includes('z-index') ||
                   cssText.includes('height');
        }
        
        if (elementName === 'HERO SECTION') {
            return cssText.includes('padding-top') || 
                   cssText.includes('margin-top') ||
                   cssText.includes('position');
        }
        
        return false;
    }
    
    calculateSpecificity(selector) {
        // Simple specificity calculation
        let specificity = 0;
        
        // Count IDs
        specificity += (selector.match(/#/g) || []).length * 100;
        
        // Count classes, attributes, pseudo-classes
        specificity += (selector.match(/\./g) || []).length * 10;
        specificity += (selector.match(/\[/g) || []).length * 10;
        specificity += (selector.match(/:/g) || []).length * 10;
        
        // Count elements
        specificity += (selector.match(/\b[a-z]+/g) || []).length * 1;
        
        return specificity;
    }
    
    monitorStyleChanges() {
        console.log('🔍 MONITORING STYLE CHANGES...');
        
        const header = document.querySelector('.header') || document.querySelector('header');
        const heroSection = document.querySelector('.section-hero');
        
        if (header) {
            this.observeElement(header, 'HEADER');
        }
        
        if (heroSection) {
            this.observeElement(heroSection, 'HERO SECTION');
        }
    }
    
    observeElement(element, name) {
        // Create a MutationObserver to watch for style changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    console.log(`🔄 ${name} STYLE CHANGED:`, element.style.cssText);
                    console.log('  Change detected at:', new Date().toISOString());
                    console.log('  Previous style:', mutation.oldValue);
                    console.log('  Current style:', element.style.cssText);
                    
                    // Check if our fix is being overridden
                    this.checkForOverride(element, name);
                }
            });
        });
        
        observer.observe(element, {
            attributes: true,
            attributeFilter: ['style'],
            attributeOldValue: true
        });
        
        console.log(`👁️ Now monitoring ${name} for style changes...`);
    }
    
    checkForOverride(element, name) {
        const computedStyle = window.getComputedStyle(element);
        
        if (name === 'HEADER') {
            if (computedStyle.position !== 'fixed') {
                console.log('🚨 OVERRIDE DETECTED: Header position changed from fixed to', computedStyle.position);
                this.conflicts.push({
                    element: name,
                    type: 'Style Override',
                    description: `Position changed to ${computedStyle.position}`,
                    timestamp: new Date().toISOString()
                });
            }
        }
        
        if (name === 'HERO SECTION') {
            const paddingTop = parseInt(computedStyle.paddingTop);
            if (paddingTop < 150) {
                console.log('🚨 OVERRIDE DETECTED: Hero padding changed to', computedStyle.paddingTop);
                this.conflicts.push({
                    element: name,
                    type: 'Style Override', 
                    description: `Padding-top changed to ${computedStyle.paddingTop}`,
                    timestamp: new Date().toISOString()
                });
            }
        }
    }
    
    analyzeSpecificity() {
        console.log('🔍 ANALYZING CSS SPECIFICITY CONFLICTS...');
        
        // Check our fix CSS specificity
        const ourSelectors = [
            'html body .header',
            'html body .section-hero',
            '.header',
            '.section-hero'
        ];
        
        console.log('📊 OUR CSS SELECTORS SPECIFICITY:');
        ourSelectors.forEach(selector => {
            const specificity = this.calculateSpecificity(selector);
            console.log(`  ${selector}: ${specificity}`);
        });
        
        // Find potentially conflicting high-specificity rules
        this.findHighSpecificityRules();
    }
    
    findHighSpecificityRules() {
        console.log('🔍 FINDING HIGH SPECIFICITY RULES...');
        
        const highSpecificityRules = [];
        const allStyleSheets = Array.from(document.styleSheets);
        
        allStyleSheets.forEach((sheet) => {
            try {
                const rules = Array.from(sheet.cssRules || sheet.rules || []);
                rules.forEach((rule) => {
                    if (rule.selectorText) {
                        const specificity = this.calculateSpecificity(rule.selectorText);
                        if (specificity > 100) { // High specificity threshold
                            highSpecificityRules.push({
                                selector: rule.selectorText,
                                specificity: specificity,
                                sheet: sheet.href || 'inline',
                                cssText: rule.cssText
                            });
                        }
                    }
                });
            } catch (e) {
                // Skip inaccessible stylesheets
            }
        });
        
        // Sort by specificity
        highSpecificityRules.sort((a, b) => b.specificity - a.specificity);
        
        console.log('📊 HIGH SPECIFICITY RULES (top 10):');
        highSpecificityRules.slice(0, 10).forEach((rule, index) => {
            console.log(`  ${index + 1}. [${rule.specificity}] ${rule.selector}`);
            console.log(`     From: ${rule.sheet.split('/').pop() || 'inline'}`);
        });
    }
    
    getConflictReport() {
        return {
            timestamp: new Date().toISOString(),
            conflicts: this.conflicts,
            summary: {
                totalConflicts: this.conflicts.length,
                headerConflicts: this.conflicts.filter(c => c.element === 'HEADER').length,
                heroConflicts: this.conflicts.filter(c => c.element === 'HERO SECTION').length
            }
        };
    }
}

// Initialize immediately
const conflictDetector = new CSSConflictDetector();

// Expose globally
window.conflictDetector = conflictDetector;

// Report after 3 seconds
setTimeout(() => {
    const report = conflictDetector.getConflictReport();
    console.log('📋 CSS CONFLICT REPORT:', report);
    localStorage.setItem('css-conflict-report', JSON.stringify(report));
}, 3000);