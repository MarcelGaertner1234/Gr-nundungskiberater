// OAuth Demo Implementation
// This is a demonstration version that simulates OAuth flow
// Replace with oauth-config.js when you have real OAuth credentials

class OAuthDemo {
    constructor() {
        this.isDemo = true;
        console.log('OAuth Demo Mode - Replace with real OAuth in production');
    }

    // Simulate Google Sign-In
    async handleGoogleLogin() {
        // Show a demo dialog
        const modal = this.createOAuthModal('Google');
        document.body.appendChild(modal);
    }

    // Simulate Microsoft Sign-In
    async handleMicrosoftLogin() {
        // Show a demo dialog
        const modal = this.createOAuthModal('Microsoft');
        document.body.appendChild(modal);
    }

    createOAuthModal(provider) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        const dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 32px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        `;

        dialog.innerHTML = `
            <h2 style="margin: 0 0 16px 0; color: #1f2937;">
                ${provider} OAuth Demo
            </h2>
            <p style="color: #6b7280; margin-bottom: 24px;">
                Dies ist eine Demo-Version. In der Produktion würde hier die echte ${provider} Anmeldung erscheinen.
            </p>
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 500;">
                    E-Mail-Adresse:
                </label>
                <input 
                    type="email" 
                    id="oauthEmail" 
                    placeholder="name@example.com"
                    style="width: 100%; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px;"
                >
            </div>
            <div style="margin-bottom: 24px;">
                <label style="display: block; margin-bottom: 8px; color: #374151; font-weight: 500;">
                    Name (optional):
                </label>
                <input 
                    type="text" 
                    id="oauthName" 
                    placeholder="Max Mustermann"
                    style="width: 100%; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px;"
                >
            </div>
            <div style="display: flex; gap: 12px;">
                <button 
                    onclick="window.oauthDemo.processLogin('${provider}')"
                    style="flex: 1; padding: 10px 20px; background: #097fe8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;"
                >
                    Mit ${provider} anmelden
                </button>
                <button 
                    onclick="window.oauthDemo.closeModal()"
                    style="padding: 10px 20px; background: #f3f4f6; color: #374151; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;"
                >
                    Abbrechen
                </button>
            </div>
            <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
                ℹ️ OAuth-Integration verfügbar nach Konfiguration der Client IDs
            </p>
        `;

        modal.appendChild(dialog);
        modal.id = 'oauthModal';
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        return modal;
    }

    closeModal() {
        const modal = document.getElementById('oauthModal');
        if (modal) {
            modal.remove();
        }
    }

    async processLogin(provider) {
        const email = document.getElementById('oauthEmail').value.trim().toLowerCase();
        const name = document.getElementById('oauthName').value.trim();

        if (!email) {
            alert(window.i18n && window.i18n.t ? window.i18n.t('alerts.oauth.enter_email') : 'Bitte gib eine E-Mail-Adresse ein.');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(window.i18n && window.i18n.t ? window.i18n.t('alerts.oauth.valid_email') : 'Bitte gib eine gültige E-Mail-Adresse ein.');
            return;
        }

        try {
            // Check if user exists
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            const existingUser = users[email];
            const isLogin = window.location.pathname.includes('login.html');

            if (isLogin && !existingUser) {
                // No account found - redirect to register
                alert(window.i18n && window.i18n.t ? window.i18n.t('alerts.oauth.no_account') : 'Kein Konto gefunden. Du wirst zur Registrierung weitergeleitet.');
                const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
                onboardingData.email = email;
                onboardingData.name = name;
                localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
                window.location.href = 'register.html';
                return;
            }

            if (!isLogin && existingUser) {
                // Account exists - redirect to login
                alert(window.i18n && window.i18n.t ? window.i18n.t('alerts.oauth.account_exists') : 'Ein Konto mit dieser E-Mail existiert bereits. Bitte melde dich an.');
                window.location.href = 'login.html';
                return;
            }

            // Process OAuth login/registration
            const userInfo = {
                email: email,
                name: name || email.split('@')[0],
                provider: provider.toLowerCase(),
                providerId: `demo_${provider.toLowerCase()}_${Date.now()}`,
                picture: null,
                isVerified: true
            };

            if (!existingUser) {
                // Register new user
                users[email] = {
                    ...userInfo,
                    createdAt: new Date().toISOString()
                };
                localStorage.setItem('users', JSON.stringify(users));

                // Save to database if available
                if (window.db) {
                    await window.db.create('users', users[email]);
                }
            }

            // Create session
            const session = {
                email: email,
                name: userInfo.name,
                loginTime: new Date().toISOString(),
                sessionId: 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                provider: provider.toLowerCase()
            };

            localStorage.setItem('currentSession', JSON.stringify(session));

            // Update onboarding data
            const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
            onboardingData.email = email;
            onboardingData.name = userInfo.name;
            onboardingData.isLoggedIn = true;
            onboardingData.isRegistered = true;
            onboardingData.sessionId = session.sessionId;
            localStorage.setItem('onboardingData', JSON.stringify(onboardingData));

            // Track event
            if (window.DataTracking) {
                window.DataTracking.communications.add(
                    email,
                    'appointment_note',
                    'user_to_advisor',
                    `${isLogin ? 'Anmeldung' : 'Registrierung'} über ${provider} (Demo)`,
                    []
                );
            }

            // Close modal
            this.closeModal();

            // Redirect
            setTimeout(() => {
                if (isLogin) {
                    // Check if user has onboarding data
                    if (onboardingData.phase || onboardingData.businessIdea) {
                        window.location.href = 'onboarding.html?type=beratung&step=1';
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                } else {
                    // New registration - go to onboarding
                    window.location.href = 'onboarding.html?type=beratung&step=1';
                }
            }, 1000);

        } catch (error) {
            console.error('OAuth Demo error:', error);
            alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        }
    }
}

// Initialize OAuth Demo
window.oauthDemo = new OAuthDemo();

// Replace the OAuth handlers
window.handleGoogleLogin = function() {
    window.oauthDemo.handleGoogleLogin();
};

window.handleGoogleSignUp = function() {
    window.oauthDemo.handleGoogleLogin();
};

window.handleMicrosoftLogin = function() {
    window.oauthDemo.handleMicrosoftLogin();
};

window.handleMicrosoftSignUp = function() {
    window.oauthDemo.handleMicrosoftLogin();
};