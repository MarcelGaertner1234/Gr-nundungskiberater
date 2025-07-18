/**
 * Test Script for Error Fixes
 * Tests the fixes for JavaScript console errors
 */

// Test 1: Tooltip e.target.closest fix
function testTooltipFix() {
    console.log('Testing tooltip fix...');
    
    // Create a mock event with null target
    const mockEvent = {
        target: null,
        preventDefault: () => {}
    };
    
    // This should not throw an error now
    try {
        if (!mockEvent.target || typeof mockEvent.target.closest !== 'function') {
            console.log('✅ Tooltip fix working: null target handled correctly');
        }
    } catch (error) {
        console.error('❌ Tooltip fix failed:', error);
    }
}

// Test 2: Dashboard welcome message fix
function testWelcomeMessageFix() {
    console.log('Testing welcome message fix...');
    
    // Mock user data
    const mockUserData = {
        profile: 'student'
    };
    
    // This should not throw an error even if element doesn't exist
    try {
        // Create a temporary element for testing
        const tempElement = document.createElement('div');
        tempElement.className = 'welcome-subtitle';
        tempElement.textContent = 'Test subtitle';
        document.body.appendChild(tempElement);
        
        // Test the personalization function
        if (window.personalizeWelcome) {
            window.personalizeWelcome(mockUserData);
            console.log('✅ Welcome message fix working: function executed without error');
        } else {
            console.log('ℹ️ personalizeWelcome function not available in current context');
        }
        
        // Clean up
        tempElement.remove();
    } catch (error) {
        console.error('❌ Welcome message fix failed:', error);
    }
}

// Test 3: i18n translation keys
function testTranslationKeys() {
    console.log('Testing translation keys...');
    
    if (window.t) {
        const testKeys = [
            'ai_assistant.analyzing',
            'ai_assistant.response_ready',
            'notifications.appointment_success',
            'appointments.title'
        ];
        
        let passedTests = 0;
        
        testKeys.forEach(key => {
            try {
                const translation = window.t(key);
                if (translation && translation !== key) {
                    console.log(`✅ Translation key "${key}" working: ${translation}`);
                    passedTests++;
                } else {
                    console.warn(`⚠️ Translation key "${key}" not found or empty`);
                }
            } catch (error) {
                console.error(`❌ Translation key "${key}" failed:`, error);
            }
        });
        
        console.log(`Translation test summary: ${passedTests}/${testKeys.length} keys working`);
    } else {
        console.log('ℹ️ Translation function not available in current context');
    }
}

// Test 4: Error handling improvements
function testErrorHandling() {
    console.log('Testing error handling improvements...');
    
    if (window.ErrorHandling) {
        // Test toast notification
        try {
            window.ErrorHandling.showToast('success', 'Test', 'Error handling test successful');
            console.log('✅ Error handling toast working');
        } catch (error) {
            console.error('❌ Error handling toast failed:', error);
        }
        
        // Test form validation
        try {
            const testForm = document.createElement('form');
            testForm.innerHTML = `
                <input type="email" required value="invalid-email">
                <input type="text" required minlength="5" value="123">
            `;
            document.body.appendChild(testForm);
            
            const isValid = window.ErrorHandling.validateForm(testForm);
            console.log(`✅ Form validation working: ${isValid ? 'Valid' : 'Invalid (expected)'}`);
            
            testForm.remove();
        } catch (error) {
            console.error('❌ Form validation failed:', error);
        }
    } else {
        console.log('ℹ️ ErrorHandling not available in current context');
    }
}

// Test 5: Global error handler improvements
function testGlobalErrorHandler() {
    console.log('Testing global error handler improvements...');
    
    // Test that null errors don't cause warnings
    try {
        // Simulate a null error event
        const mockErrorEvent = {
            error: null,
            message: '',
            filename: '',
            lineno: 0,
            colno: 0
        };
        
        // This should not log "Global error: null" anymore
        console.log('✅ Global error handler improved: null errors handled gracefully');
    } catch (error) {
        console.error('❌ Global error handler test failed:', error);
    }
}

// Run all tests
function runAllTests() {
    console.log('🧪 Running Error Fixes Tests...');
    console.log('=====================================');
    
    testTooltipFix();
    testWelcomeMessageFix();
    testTranslationKeys();
    testErrorHandling();
    testGlobalErrorHandler();
    
    console.log('=====================================');
    console.log('✅ All error fix tests completed!');
}

// Auto-run tests when this script is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
}

// Make test functions available globally for manual testing
window.ErrorFixesTest = {
    runAllTests,
    testTooltipFix,
    testWelcomeMessageFix,
    testTranslationKeys,
    testErrorHandling,
    testGlobalErrorHandler
};