// Authentication check for dashboard access
(function() {
    'use strict';
    
    // Check if user is logged in
    function checkAuthentication() {
        const currentSession = localStorage.getItem('currentSession');
        const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
        
        // Check if there's a valid session
        if (!currentSession || !onboardingData.isLoggedIn) {
            // No valid session, redirect to login
            window.location.href = 'login.html';
            return false;
        }
        
        // Parse session data
        const session = JSON.parse(currentSession);
        
        // Check session validity (optional: could add expiration check here)
        const loginTime = new Date(session.loginTime);
        const now = new Date();
        const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
        
        // Session expires after 24 hours
        if (hoursSinceLogin > 24) {
            // Session expired
            localStorage.removeItem('currentSession');
            onboardingData.isLoggedIn = false;
            localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
            
            // Redirect to login with expired message
            window.location.href = 'login.html?expired=true';
            return false;
        }
        
        // Check if user has completed onboarding
        const userEmail = session.email;
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[userEmail];
        
        if (user && !user.hasCompletedOnboarding) {
            // User hasn't completed onboarding, redirect to onboarding
            window.location.href = 'onboarding.html?type=beratung';
            return false;
        }
        
        // Valid session found
        return true;
    }
    
    // Function to get current user email
    window.getCurrentUserEmail = function() {
        const currentSession = localStorage.getItem('currentSession');
        if (currentSession) {
            const session = JSON.parse(currentSession);
            return session.email;
        }
        return null;
    };
    
    // Function to logout
    window.logout = function() {
        // Clear session
        localStorage.removeItem('currentSession');
        
        // Update onboarding data
        const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
        onboardingData.isLoggedIn = false;
        localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
        
        // Track logout
        if (window.DataTracking) {
            const userEmail = getCurrentUserEmail();
            if (userEmail) {
                DataTracking.communications.add(
                    userEmail,
                    'appointment_note',
                    'user_to_advisor',
                    'Benutzer abgemeldet',
                    []
                );
            }
        }
        
        // Redirect to landing page
        window.location.href = 'landing-page.html';
    };
    
    // Add logout button to header if not exists
    function addLogoutButton() {
        const headerActions = document.querySelector('.header-actions');
        if (headerActions && !document.querySelector('.logout-button')) {
            const logoutButton = document.createElement('button');
            logoutButton.className = 'button button-secondary logout-button';
            logoutButton.textContent = 'Abmelden';
            logoutButton.onclick = logout;
            logoutButton.style.marginLeft = '1rem';
            
            // Insert before admin link if exists
            const adminLink = headerActions.querySelector('a[href="admin-dashboard.html"]');
            if (adminLink) {
                headerActions.insertBefore(logoutButton, adminLink);
            } else {
                headerActions.appendChild(logoutButton);
            }
        }
    }
    
    // Check authentication on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (checkAuthentication()) {
            // User is authenticated, add logout button
            addLogoutButton();
            
            // Update any user-specific content
            const userEmail = getCurrentUserEmail();
            if (userEmail) {
                // Update email displays if needed
                const emailDisplays = document.querySelectorAll('[data-user-email]');
                emailDisplays.forEach(el => {
                    el.textContent = userEmail;
                });
            }
        }
    });
    
    // Also check immediately in case DOM is already loaded
    if (document.readyState !== 'loading') {
        if (!checkAuthentication()) {
            // Prevent any further script execution
            throw new Error('Authentication required');
        }
    }
})();