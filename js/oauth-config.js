// OAuth Configuration for Google and Microsoft
class OAuthConfig {
    constructor() {
        // OAuth Configuration (replace with your actual credentials)
        this.config = {
            google: {
                clientId: 'DEINE_CLIENT_ID_HIER.apps.googleusercontent.com', // <-- Hier deine echte Client-ID einfügen!
                redirectUri: window.location.origin + '/auth/google/callback',
                scope: 'openid email profile',
                authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
                tokenEndpoint: 'https://oauth2.googleapis.com/token'
            },
            microsoft: {
                clientId: 'YOUR_MICROSOFT_CLIENT_ID',
                redirectUri: window.location.origin + '/auth/microsoft/callback',
                scope: 'openid email profile',
                authEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
                tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
                tenant: 'common'
            }
        };

        // Initialize OAuth SDKs if available
        this.initializeSDKs();
    }

    initializeSDKs() {
        // Initialize Google Sign-In
        this.loadGoogleSDK();
        
        // Initialize Microsoft Authentication Library (MSAL)
        this.loadMicrosoftSDK();
    }

    // Google OAuth Methods
    loadGoogleSDK() {
        // Check if Google SDK is already loaded
        if (window.gapi) {
            this.initializeGoogle();
            return;
        }

        // Load Google SDK
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => this.initializeGoogle();
        document.head.appendChild(script);
    }

    initializeGoogle() {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: this.config.google.clientId,
                callback: this.handleGoogleResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true
            });
        }
    }

    async handleGoogleResponse(response) {
        console.log('Google OAuth response:', response);
        
        // The response contains a JWT credential
        if (response.credential) {
            try {
                // Decode the JWT to get user info
                const userInfo = this.decodeJWT(response.credential);
                console.log('Google user info:', userInfo);
                
                // Process the login/registration
                await this.processOAuthLogin('google', {
                    email: userInfo.email,
                    name: userInfo.name,
                    picture: userInfo.picture,
                    sub: userInfo.sub, // Google user ID
                    email_verified: userInfo.email_verified
                });
            } catch (error) {
                console.error('Error processing Google login:', error);
                this.showError('Google-Anmeldung fehlgeschlagen. Bitte versuche es erneut.');
            }
        }
    }

    // Microsoft OAuth Methods
    loadMicrosoftSDK() {
        // Check if MSAL is already loaded
        if (window.msal) {
            this.initializeMicrosoft();
            return;
        }

        // Load MSAL
        const script = document.createElement('script');
        script.src = 'https://alcdn.msauth.net/browser/2.30.0/js/msal-browser.min.js';
        script.async = true;
        script.onload = () => this.initializeMicrosoft();
        document.head.appendChild(script);
    }

    initializeMicrosoft() {
        if (window.msal) {
            // Initialize MSAL
            this.msalInstance = new msal.PublicClientApplication({
                auth: {
                    clientId: this.config.microsoft.clientId,
                    authority: `https://login.microsoftonline.com/${this.config.microsoft.tenant}`,
                    redirectUri: this.config.microsoft.redirectUri
                },
                cache: {
                    cacheLocation: 'sessionStorage',
                    storeAuthStateInCookie: false
                }
            });
        }
    }

    async loginWithMicrosoft() {
        if (!this.msalInstance) {
            console.error('MSAL not initialized');
            return;
        }

        try {
            const loginRequest = {
                scopes: this.config.microsoft.scope.split(' ')
            };

            // Try popup login first
            const response = await this.msalInstance.loginPopup(loginRequest);
            console.log('Microsoft login response:', response);

            if (response.account) {
                await this.processOAuthLogin('microsoft', {
                    email: response.account.username,
                    name: response.account.name,
                    sub: response.account.localAccountId
                });
            }
        } catch (error) {
            console.error('Microsoft login error:', error);
            
            // Fallback to redirect if popup blocked
            if (error.errorCode === 'popup_window_error') {
                try {
                    await this.msalInstance.loginRedirect({
                        scopes: this.config.microsoft.scope.split(' ')
                    });
                } catch (redirectError) {
                    console.error('Microsoft redirect error:', redirectError);
                    this.showError('Microsoft-Anmeldung fehlgeschlagen. Bitte versuche es erneut.');
                }
            } else {
                this.showError('Microsoft-Anmeldung fehlgeschlagen. Bitte versuche es erneut.');
            }
        }
    }

    // Common OAuth Processing
    async processOAuthLogin(provider, userInfo) {
        try {
            // Check if user exists
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            const existingUser = users[userInfo.email];

            if (existingUser) {
                // User exists - login
                if (existingUser.provider && existingUser.provider !== provider) {
                    this.showError(`Dieses Konto wurde mit ${existingUser.provider} erstellt. Bitte verwende diese Anmeldemethode.`);
                    return;
                }

                // Create session
                const session = {
                    email: userInfo.email,
                    name: userInfo.name,
                    loginTime: new Date().toISOString(),
                    sessionId: this.generateSessionId(),
                    provider: provider
                };

                localStorage.setItem('currentSession', JSON.stringify(session));

                // Update onboarding data
                const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
                onboardingData.isLoggedIn = true;
                onboardingData.sessionId = session.sessionId;
                onboardingData.email = userInfo.email;
                onboardingData.name = userInfo.name;
                localStorage.setItem('onboardingData', JSON.stringify(onboardingData));

                // Save to database if available
                if (window.db) {
                    await window.db.update('users', existingUser.id, {
                        lastLogin: new Date().toISOString(),
                        loginCount: (existingUser.loginCount || 0) + 1
                    });
                }

                // Redirect to appropriate page
                this.redirectAfterLogin();
            } else {
                // New user - register
                const newUser = {
                    email: userInfo.email,
                    name: userInfo.name,
                    provider: provider,
                    providerId: userInfo.sub,
                    picture: userInfo.picture,
                    createdAt: new Date().toISOString(),
                    isVerified: true // OAuth users are pre-verified
                };

                users[userInfo.email] = newUser;
                localStorage.setItem('users', JSON.stringify(users));

                // Save to database if available
                if (window.db) {
                    const result = await window.db.create('users', newUser);
                    if (result.success) {
                        newUser.id = result.data.id;
                    }
                }

                // Create session
                const session = {
                    email: userInfo.email,
                    name: userInfo.name,
                    loginTime: new Date().toISOString(),
                    sessionId: this.generateSessionId(),
                    provider: provider
                };

                localStorage.setItem('currentSession', JSON.stringify(session));

                // Update onboarding data
                const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
                onboardingData.isRegistered = true;
                onboardingData.isLoggedIn = true;
                onboardingData.sessionId = session.sessionId;
                onboardingData.email = userInfo.email;
                onboardingData.name = userInfo.name;
                localStorage.setItem('onboardingData', JSON.stringify(onboardingData));

                // Track registration
                if (window.DataTracking) {
                    window.DataTracking.communications.add(
                        userInfo.email,
                        'appointment_note',
                        'user_to_advisor',
                        `Neuer Benutzer über ${provider} registriert`,
                        []
                    );
                }

                // Redirect to onboarding
                window.location.href = 'onboarding.html?type=beratung&step=1';
            }
        } catch (error) {
            console.error('OAuth processing error:', error);
            this.showError('Anmeldung fehlgeschlagen. Bitte versuche es erneut.');
        }
    }

    // Helper Methods
    decodeJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    redirectAfterLogin() {
        const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
        
        if (onboardingData.phase || onboardingData.businessIdea) {
            // User has started onboarding - continue
            window.location.href = 'onboarding.html?type=beratung&step=1';
        } else {
            // Go to dashboard
            window.location.href = 'dashboard.html';
        }
    }

    showError(message) {
        // Show error in UI (this should be replaced with proper UI notification)
        alert(message);
    }

    // Public methods for buttons
    showGoogleSignIn(buttonId) {
        if (window.google && window.google.accounts) {
            window.google.accounts.id.renderButton(
                document.getElementById(buttonId),
                {
                    theme: 'outline',
                    size: 'large',
                    width: '100%',
                    text: 'signin_with',
                    locale: 'de'
                }
            );
        }
    }

    triggerGoogleSignIn() {
        if (window.google && window.google.accounts) {
            window.google.accounts.id.prompt();
        }
    }

    triggerMicrosoftSignIn() {
        this.loginWithMicrosoft();
    }
}

// Initialize OAuth
window.oauthConfig = new OAuthConfig();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OAuthConfig;
}