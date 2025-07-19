/* ==========================================================================
   CARD TEST HELPER v1.0 - Überprüfung aller Card-Rendering-Probleme
   Hilft beim Testen ob alle Cards korrekt rendern
   ========================================================================== */

class CardTestHelper {
    constructor() {
        this.cardSelectors = [
            '.card', '.feature-card', '.story-card', '.preview-card',
            '.consultation-card', '.package-card', '.admin-card', '.faq-item',
            '.pricing-cta', '.onboarding-card', '.modal-content',
            '[class*="card"]', '[class*="Card"]'
        ];
        
        this.backgroundColors = [
            '#F0F0F0', '#f5f5f5', '#F5F5F5',
            '#FFF8E7', '#EBF5FF', '#F3E5F5',
            '#E8F5E9', '#FFF5F5', 'white', '#fff'
        ];
        
        console.log('🎴 Card Test Helper loaded');
    }
    
    runFullTest() {
        console.log('🧪 Starting FULL Card Rendering Test...');
        
        const results = {
            cardsFound: this.findAllCards(),
            themeTest: this.testThemeToggle(),
            backgroundTest: this.testBackgrounds(),
            textTest: this.testTextColors(),
            performanceTest: this.testPerformance()
        };
        
        this.displayResults(results);
        return results;
    }
    
    findAllCards() {
        const foundCards = [];
        
        this.cardSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                foundCards.push({
                    selector: selector,
                    count: elements.length,
                    elements: Array.from(elements)
                });
            }
        });
        
        console.log('🔍 Cards found:', foundCards);
        return foundCards;
    }
    
    testThemeToggle() {
        const originalTheme = document.documentElement.getAttribute('data-theme');
        let results = { passed: 0, failed: 0, issues: [] };
        
        console.log('🔄 Testing theme toggle...');
        
        // Test Dark Mode
        this.setTheme('dark');
        setTimeout(() => {
            const darkModeIssues = this.checkDarkModeCards();
            results.darkMode = darkModeIssues;
            
            // Test Light Mode
            this.setTheme('light');
            setTimeout(() => {
                const lightModeIssues = this.checkLightModeCards();
                results.lightMode = lightModeIssues;
                
                // Restore original theme
                this.setTheme(originalTheme);
                
                console.log('✅ Theme toggle test completed');
            }, 100);
        }, 100);
        
        return results;
    }
    
    testBackgrounds() {
        const issues = [];
        
        this.backgroundColors.forEach(color => {
            const elements = document.querySelectorAll(`[style*="background: ${color}"], [style*="background-color: ${color}"]`);
            elements.forEach(el => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                if (currentTheme === 'dark') {
                    const computedStyle = window.getComputedStyle(el);
                    const bgColor = computedStyle.backgroundColor;
                    
                    if (bgColor.includes('255, 255, 255') && !bgColor.includes('0.')) {
                        issues.push({
                            element: el,
                            originalColor: color,
                            computedColor: bgColor,
                            problem: 'White background in dark mode'
                        });
                    }
                }
            });
        });
        
        console.log('🎨 Background test results:', issues);
        return issues;
    }
    
    testTextColors() {
        const issues = [];
        const problematicColors = ['#000', 'black', '#333', '#666', '#1a1a1a'];
        
        problematicColors.forEach(color => {
            const elements = document.querySelectorAll(`[style*="color: ${color}"]`);
            elements.forEach(el => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                if (currentTheme === 'dark') {
                    const computedStyle = window.getComputedStyle(el);
                    const textColor = computedStyle.color;
                    
                    // Check if text is still dark
                    if (textColor.includes('rgb(0, 0, 0)') || textColor.includes('rgb(51, 51, 51)')) {
                        issues.push({
                            element: el,
                            originalColor: color,
                            computedColor: textColor,
                            problem: 'Dark text in dark mode'
                        });
                    }
                }
            });
        });
        
        console.log('📝 Text color test results:', issues);
        return issues;
    }
    
    testPerformance() {
        const startTime = performance.now();
        
        // Simulate theme toggle
        const originalTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = originalTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Force card fixes
        if (window.InstantThemeFix) {
            InstantThemeFix.fixAllCards();
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Restore theme
        document.documentElement.setAttribute('data-theme', originalTheme);
        
        console.log('⚡ Performance test: Theme switch took', duration.toFixed(2), 'ms');
        
        return {
            duration: duration,
            acceptable: duration < 100,
            rating: duration < 50 ? 'Excellent' : duration < 100 ? 'Good' : 'Needs improvement'
        };
    }
    
    checkDarkModeCards() {
        const issues = [];
        
        this.cardSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const computedStyle = window.getComputedStyle(el);
                const bgColor = computedStyle.backgroundColor;
                
                // Check if background is still light
                if (bgColor.includes('255, 255, 255') && !bgColor.includes('0.')) {
                    issues.push({
                        element: el,
                        selector: selector,
                        problem: 'Light background in dark mode',
                        bgColor: bgColor
                    });
                }
            });
        });
        
        return issues;
    }
    
    checkLightModeCards() {
        const issues = [];
        
        this.cardSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const computedStyle = window.getComputedStyle(el);
                const bgColor = computedStyle.backgroundColor;
                
                // Check if background is still dark
                if (bgColor.includes('30, 41, 59') || bgColor.includes('15, 23, 42')) {
                    issues.push({
                        element: el,
                        selector: selector,
                        problem: 'Dark background in light mode',
                        bgColor: bgColor
                    });
                }
            });
        });
        
        return issues;
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (window.InstantThemeFix) {
            if (theme === 'dark') {
                InstantThemeFix.forceDarkMode();
            } else {
                InstantThemeFix.forceLightMode();
            }
        }
    }
    
    displayResults(results) {
        console.log('\n🎯 CARD RENDERING TEST RESULTS');
        console.log('================================');
        
        console.log('\n📊 Cards Found:');
        results.cardsFound.forEach(card => {
            console.log(`  ${card.selector}: ${card.count} elements`);
        });
        
        console.log('\n🎨 Background Issues:', results.backgroundTest.length);
        if (results.backgroundTest.length > 0) {
            results.backgroundTest.forEach(issue => {
                console.warn('  ⚠️', issue.problem, issue.originalColor, '→', issue.computedColor);
            });
        } else {
            console.log('  ✅ All backgrounds OK');
        }
        
        console.log('\n📝 Text Color Issues:', results.textTest.length);
        if (results.textTest.length > 0) {
            results.textTest.forEach(issue => {
                console.warn('  ⚠️', issue.problem, issue.originalColor, '→', issue.computedColor);
            });
        } else {
            console.log('  ✅ All text colors OK');
        }
        
        console.log('\n⚡ Performance:');
        console.log(`  Duration: ${results.performanceTest.duration.toFixed(2)}ms`);
        console.log(`  Rating: ${results.performanceTest.rating}`);
        console.log(`  Acceptable: ${results.performanceTest.acceptable ? '✅' : '❌'}`);
        
        const totalIssues = results.backgroundTest.length + results.textTest.length;
        console.log('\n🏆 OVERALL RESULT:');
        if (totalIssues === 0 && results.performanceTest.acceptable) {
            console.log('  🎉 ALL TESTS PASSED! Card rendering is perfect.');
        } else {
            console.log(`  ⚠️ ${totalIssues} issues found. Performance: ${results.performanceTest.rating}`);
        }
        
        console.log('\n================================\n');
    }
    
    // Hilfsfunktionen für manuelle Tests
    highlightAllCards() {
        this.cardSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.outline = '3px solid #ff0000';
                el.style.outlineOffset = '2px';
            });
        });
        
        console.log('🔍 All cards highlighted with red outline');
        
        setTimeout(() => {
            this.removeHighlights();
        }, 5000);
    }
    
    removeHighlights() {
        this.cardSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.outline = '';
                el.style.outlineOffset = '';
            });
        });
        
        console.log('✅ Highlights removed');
    }
    
    rapidToggleTest(count = 10) {
        console.log(`🔄 Starting rapid toggle test (${count} toggles)...`);
        
        let toggleCount = 0;
        const startTime = performance.now();
        
        const toggleInterval = setInterval(() => {
            this.setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
            toggleCount++;
            
            if (toggleCount >= count) {
                clearInterval(toggleInterval);
                const endTime = performance.now();
                const avgTime = (endTime - startTime) / count;
                
                console.log(`✅ Rapid toggle test completed:`);
                console.log(`  Total time: ${(endTime - startTime).toFixed(2)}ms`);
                console.log(`  Average per toggle: ${avgTime.toFixed(2)}ms`);
                console.log(`  Performance: ${avgTime < 50 ? 'Excellent' : avgTime < 100 ? 'Good' : 'Needs improvement'}`);
            }
        }, 150);
    }
}

// Global verfügbar machen
window.CardTestHelper = new CardTestHelper();

// Convenience functions
window.testCards = () => CardTestHelper.runFullTest();
window.highlightCards = () => CardTestHelper.highlightAllCards();
window.rapidToggle = (count) => CardTestHelper.rapidToggleTest(count);

console.log('🧪 Card Test Helper ready! Use: testCards(), highlightCards(), rapidToggle(10)');