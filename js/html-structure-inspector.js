/* HTML STRUCTURE INSPECTOR - Überprüft DOM-Struktur */

console.log('🔍 HTML STRUCTURE INSPECTOR: Starting DOM investigation...');

class HTMLStructureInspector {
    constructor() {
        this.issues = [];
        this.init();
    }
    
    init() {
        console.log('🕵️ HTML STRUCTURE INSPECTOR: Analyzing DOM structure...');
        
        // Sofort starten
        this.inspectImmediate();
        
        // Nach DOM Ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.fullInspection());
        } else {
            this.fullInspection();
        }
    }
    
    inspectImmediate() {
        console.log('⚡ IMMEDIATE STRUCTURE INSPECTION...');
        
        setTimeout(() => {
            this.inspectBasicStructure();
            this.inspectHeaderStructure();
            this.inspectHeroStructure();
        }, 50);
    }
    
    inspectBasicStructure() {
        console.log('🔍 INSPECTING BASIC STRUCTURE...');
        
        console.log('📋 DOCUMENT READY STATE:', document.readyState);
        console.log('📋 DOCUMENT TITLE:', document.title);
        console.log('📋 BODY CLASSES:', document.body.className);
        console.log('📋 HTML CLASSES:', document.documentElement.className);
        
        // Check for conflicting body styles
        const bodyStyle = window.getComputedStyle(document.body);
        console.log('📋 BODY COMPUTED STYLES:');
        console.log('  margin:', bodyStyle.margin);
        console.log('  padding:', bodyStyle.padding);
        console.log('  position:', bodyStyle.position);
        console.log('  overflow:', bodyStyle.overflow);
        
        if (bodyStyle.position !== 'static') {
            this.addIssue('MEDIUM', 'Body has non-static positioning', `Body position is "${bodyStyle.position}"`);
        }
    }
    
    inspectHeaderStructure() {
        console.log('🔍 INSPECTING HEADER STRUCTURE...');
        
        // Find all possible header elements
        const headerElements = {
            '.header': document.querySelector('.header'),
            'header': document.querySelector('header'),
            '.header-content': document.querySelector('.header-content'),
            '.nav': document.querySelector('.nav'),
            '.header-nav': document.querySelector('.header-nav')
        };
        
        console.log('📋 HEADER ELEMENTS FOUND:');
        Object.entries(headerElements).forEach(([selector, element]) => {
            if (element) {
                console.log(`  ✅ ${selector}: Found`);
                this.inspectElement(element, selector);
            } else {
                console.log(`  ❌ ${selector}: NOT FOUND`);
                if (selector === '.header') {
                    this.addIssue('CRITICAL', 'Main header element missing', 'No .header element found in DOM');
                }
            }
        });
        
        // Check header nesting
        const header = headerElements['.header'] || headerElements['header'];
        if (header) {
            this.checkHeaderNesting(header);
        }
    }
    
    inspectHeroStructure() {
        console.log('🔍 INSPECTING HERO STRUCTURE...');
        
        const heroElements = {
            '.section-hero': document.querySelector('.section-hero'),
            'section.section-hero': document.querySelector('section.section-hero'),
            '.hero': document.querySelector('.hero'),
            '.hero-section': document.querySelector('.hero-section')
        };
        
        console.log('📋 HERO ELEMENTS FOUND:');
        Object.entries(heroElements).forEach(([selector, element]) => {
            if (element) {
                console.log(`  ✅ ${selector}: Found`);
                this.inspectElement(element, selector);
            } else {
                console.log(`  ❌ ${selector}: NOT FOUND`);
                if (selector === '.section-hero') {
                    this.addIssue('CRITICAL', 'Main hero element missing', 'No .section-hero element found in DOM');
                }
            }
        });
        
        // Check hero content
        const heroSection = heroElements['.section-hero'] || heroElements['section.section-hero'];
        if (heroSection) {
            this.checkHeroContent(heroSection);
        }
    }
    
    inspectElement(element, selector) {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        
        console.log(`📊 ${selector} DETAILS:`);
        console.log(`  Position: ${style.position}`);
        console.log(`  Dimensions: ${rect.width}x${rect.height}`);
        console.log(`  Location: top:${rect.top}, left:${rect.left}`);
        console.log(`  Z-Index: ${style.zIndex}`);
        console.log(`  Display: ${style.display}`);
        console.log(`  Visibility: ${style.visibility}`);
        
        // Check if element is visible
        if (rect.width === 0 || rect.height === 0) {
            this.addIssue('HIGH', `${selector} has no dimensions`, 'Element exists but has 0 width or height');
        }
        
        if (style.display === 'none') {
            this.addIssue('HIGH', `${selector} is hidden`, 'Element has display: none');
        }
        
        if (style.visibility === 'hidden') {
            this.addIssue('MEDIUM', `${selector} is invisible`, 'Element has visibility: hidden');
        }
    }
    
    checkHeaderNesting(header) {
        console.log('🔍 CHECKING HEADER NESTING...');
        
        const headerContent = header.querySelector('.header-content');
        const logo = header.querySelector('.header-logo, .logo');
        const nav = header.querySelector('.nav, .header-nav');
        const actions = header.querySelector('.header-actions');
        
        console.log('📋 HEADER CHILD ELEMENTS:');
        console.log('  .header-content:', headerContent ? '✅ Found' : '❌ Missing');
        console.log('  .header-logo/.logo:', logo ? '✅ Found' : '❌ Missing');
        console.log('  .nav/.header-nav:', nav ? '✅ Found' : '❌ Missing');
        console.log('  .header-actions:', actions ? '✅ Found' : '❌ Missing');
        
        if (!headerContent) {
            this.addIssue('HIGH', 'Header content container missing', 'No .header-content found inside header');
        }
        
        // Check for interfering elements inside header
        const allChildren = header.querySelectorAll('*');
        console.log(`📋 TOTAL HEADER CHILD ELEMENTS: ${allChildren.length}`);
        
        // Look for elements that might interfere
        const interferingElements = Array.from(allChildren).filter(child => {
            const style = window.getComputedStyle(child);
            return style.position === 'absolute' || style.position === 'fixed';
        });
        
        if (interferingElements.length > 0) {
            console.log('⚠️ POTENTIALLY INTERFERING ELEMENTS IN HEADER:');
            interferingElements.forEach(el => {
                console.log(`  ${el.tagName}.${el.className}`);
            });
        }
    }
    
    checkHeroContent(heroSection) {
        console.log('🔍 CHECKING HERO CONTENT...');
        
        const container = heroSection.querySelector('.container');
        const h1 = heroSection.querySelector('h1');
        const title = heroSection.querySelector('[data-i18n="hero.title"]');
        
        console.log('📋 HERO CHILD ELEMENTS:');
        console.log('  .container:', container ? '✅ Found' : '❌ Missing');
        console.log('  h1:', h1 ? '✅ Found' : '❌ Missing');
        console.log('  title element:', title ? '✅ Found' : '❌ Missing');
        
        if (!container) {
            this.addIssue('HIGH', 'Hero container missing', 'No .container found inside .section-hero');
        }
        
        if (!h1) {
            this.addIssue('MEDIUM', 'Hero h1 missing', 'No h1 element found inside hero section');
        }
        
        // Check h1 content
        if (h1) {
            console.log('📋 H1 CONTENT:', h1.textContent);
            console.log('📋 H1 HTML:', h1.innerHTML);
            
            if (!h1.textContent.includes('Gründen')) {
                this.addIssue('MEDIUM', 'H1 content unexpected', 'H1 does not contain expected "Gründen" text');
            }
        }
        
        // Check for text that should be visible
        const textElements = heroSection.querySelectorAll('p, span, div');
        let hasVisibleText = false;
        
        textElements.forEach(el => {
            if (el.textContent.trim().length > 0) {
                const style = window.getComputedStyle(el);
                if (style.display !== 'none' && style.visibility !== 'hidden') {
                    hasVisibleText = true;
                }
            }
        });
        
        if (!hasVisibleText) {
            this.addIssue('HIGH', 'No visible text in hero', 'Hero section contains no visible text content');
        }
    }
    
    fullInspection() {
        console.log('🔍 FULL HTML STRUCTURE INSPECTION...');
        
        setTimeout(() => {
            this.inspectDOMTree();
            this.inspectScrollBehavior();
            this.generateStructureReport();
        }, 500);
    }
    
    inspectDOMTree() {
        console.log('🔍 INSPECTING DOM TREE...');
        
        // Get all sections
        const sections = document.querySelectorAll('section, .section');
        console.log(`📋 TOTAL SECTIONS FOUND: ${sections.length}`);
        
        sections.forEach((section, index) => {
            const classes = section.className;
            const id = section.id;
            const rect = section.getBoundingClientRect();
            console.log(`  ${index + 1}. ${section.tagName}${id ? '#' + id : ''}${classes ? '.' + classes.replace(/\s+/g, '.') : ''}`);
            console.log(`     Position: top:${Math.round(rect.top)}, height:${Math.round(rect.height)}`);
        });
        
        // Check section order
        const heroIndex = Array.from(sections).findIndex(s => s.classList.contains('section-hero'));
        if (heroIndex > 0) {
            this.addIssue('MEDIUM', 'Hero section not first', `Hero section is at position ${heroIndex + 1}, should be first`);
        }
    }
    
    inspectScrollBehavior() {
        console.log('🔍 INSPECTING SCROLL BEHAVIOR...');
        
        console.log('📋 SCROLL POSITION:', window.scrollY);
        console.log('📋 DOCUMENT HEIGHT:', document.documentElement.scrollHeight);
        console.log('📋 VIEWPORT HEIGHT:', window.innerHeight);
        
        // Check if page is scrollable
        const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
        console.log('📋 PAGE IS SCROLLABLE:', isScrollable);
        
        if (!isScrollable) {
            this.addIssue('LOW', 'Page not scrollable', 'Document height equals viewport height');
        }
    }
    
    addIssue(severity, title, description) {
        this.issues.push({ severity, title, description, timestamp: new Date().toISOString() });
        console.log(`🚨 STRUCTURE ISSUE [${severity}]: ${title} - ${description}`);
    }
    
    generateStructureReport() {
        console.log('📋 GENERATING STRUCTURE REPORT...');
        
        const report = {
            timestamp: new Date().toISOString(),
            issues: this.issues,
            elementCounts: {
                headers: document.querySelectorAll('.header, header').length,
                heroSections: document.querySelectorAll('.section-hero').length,
                sections: document.querySelectorAll('section, .section').length,
                totalElements: document.querySelectorAll('*').length
            },
            documentInfo: {
                readyState: document.readyState,
                title: document.title,
                url: window.location.href,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            }
        };
        
        console.log('🔍 HTML STRUCTURE ANALYSIS COMPLETE');
        console.log('📊 STRUCTURE REPORT:', report);
        
        // Store in localStorage
        localStorage.setItem('html-structure-report', JSON.stringify(report));
        
        return report;
    }
}

// Initialize immediately
const structureInspector = new HTMLStructureInspector();

// Expose globally
window.structureInspector = structureInspector;