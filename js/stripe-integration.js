/**
 * Stripe Payment Integration
 * Handles payment processing for consultation packages
 */

// Stripe Configuration (Test mode)
const STRIPE_CONFIG = {
    publishableKey: 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY', // Replace with your key
    successUrl: window.location.origin + '/payment-success.html',
    cancelUrl: window.location.origin + '/pricing.html'
};

// Product IDs (these would come from your Stripe dashboard)
const STRIPE_PRODUCTS = {
    // Individual consultations
    businessplan: 'price_businessplan_consultation',
    gruendung: 'price_gruendung_consultation',
    finanzierung: 'price_finanzierung_consultation',
    marketing: 'price_marketing_consultation',
    
    // Packages
    starter: 'price_starter_package',
    professional: 'price_professional_package',
    premium: 'price_premium_package'
};

// Initialize Stripe
let stripe = null;

// Load Stripe.js
function loadStripe() {
    return new Promise((resolve, reject) => {
        if (window.Stripe) {
            stripe = window.Stripe(STRIPE_CONFIG.publishableKey);
            resolve(stripe);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = () => {
            stripe = window.Stripe(STRIPE_CONFIG.publishableKey);
            resolve(stripe);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Create Checkout Session
async function createCheckoutSession(productType, isPackage = false) {
    try {
        // Get current currency from currency config
        const currency = window.currencyConfig ? window.currencyConfig.getCurrency() : { code: 'EUR' };
        
        // Get user data
        const userData = getUserDataForCheckout();
        
        // Prepare line items - all use enterprise pricing now
        const lineItems = getServiceLineItems(productType);
        
        // Create session on backend (this is a placeholder for the actual API call)
        const sessionData = await createSessionOnBackend({
            lineItems,
            customerEmail: userData.email,
            currency: currency.code.toLowerCase(), // Stripe expects lowercase currency codes
            metadata: {
                userId: userData.userId,
                productType: productType,
                isPackage: isPackage,
                locale: currency.locale
            }
        });
        
        // Redirect to Stripe Checkout
        if (stripe && sessionData.sessionId) {
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionData.sessionId
            });
            
            if (error) {
                console.error('Stripe redirect error:', error);
                showPaymentError(error.message);
            }
        }
    } catch (error) {
        console.error('Checkout session error:', error);
        showPaymentError('Payment initialization failed. Please try again.');
    }
}

// Get user data for checkout
function getUserDataForCheckout() {
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
        const data = JSON.parse(onboardingData);
        return {
            email: data.email || '',
            name: data.name || '',
            userId: data.userId || generateTempUserId()
        };
    }
    
    return {
        email: '',
        name: '',
        userId: generateTempUserId()
    };
}

// Generate temporary user ID
function generateTempUserId() {
    return 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get service line items (updated to match enterprise pricing)
function getServiceLineItems(serviceType) {
    const currency = window.currencyConfig ? window.currencyConfig.getCurrency() : { code: 'EUR', exchangeRate: 1 };
    
    const services = {
        gesamtpaket: {
            name: 'Gesamtpaket - Vollständige Gründungsbegleitung',
            priceEUR: 7900000, // €79,000 in cents
            description: 'Komplette Unternehmensgründung von der Idee bis zur Markteinführung'
        },
        finanzierung: {
            name: 'Finanzierung & Fördermittel',
            priceEUR: 1250000, // €12,500 in cents
            description: 'Komplette Finanzierungsberatung für Gründer'
        },
        rechtsform: {
            name: 'Rechtsform & Gründung',
            priceEUR: 550000, // €5,500 in cents
            description: 'Vollständige rechtliche Gründungsbegleitung'
        },
        businessplan: {
            name: 'Professioneller Businessplan',
            priceEUR: 1500000, // €15,000 in cents
            description: 'Bankfähiger Businessplan für Investoren'
        },
        marketing: {
            name: 'Marketing & Vertrieb',
            priceEUR: 1800000, // €18,000 in cents
            description: 'Komplette Marketing-Strategie & Umsetzung'
        },
        webseite: {
            name: 'Professionelle Webseite',
            priceEUR: 2500000, // €25,000 in cents
            description: 'Vollständige Webentwicklung mit CMS'
        },
        software: {
            name: 'Software-Entwicklung',
            priceEUR: 4500000, // €45,000 in cents
            description: 'Individuelle Software-Lösung (MVP)'
        },
        ki_integration: {
            name: 'KI-Integration & Automatisierung',
            priceEUR: 2200000, // €22,000 in cents
            description: 'Künstliche Intelligenz für Ihr Unternehmen'
        },
        stundenbasis: {
            name: 'Stundenbasierte Beratung',
            priceEUR: 25000, // €250 per hour in cents
            description: 'Individuelle Beratung nach Aufwand'
        }
    };
    
    const selectedService = services[serviceType];
    if (!selectedService) return [];
    
    const convertedPrice = Math.round(selectedService.priceEUR * currency.exchangeRate);
    
    return [{
        price_data: {
            currency: currency.code.toLowerCase(),
            product_data: {
                name: selectedService.name,
                description: selectedService.description
            },
            unit_amount: convertedPrice
        },
        quantity: 1
    }];
}

// Deprecated - use getServiceLineItems instead
function getConsultationLineItems(consultationType) {
    // Redirect to service line items with enterprise pricing
    return getServiceLineItems(consultationType);
}

// Create session on backend (placeholder)
async function createSessionOnBackend(sessionData) {
    // In production, this would call your backend API
    // For now, we'll simulate the response
    
    console.log('Creating checkout session with:', sessionData);
    
    // Simulated API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                sessionId: 'cs_test_' + Math.random().toString(36).substr(2, 9),
                url: STRIPE_CONFIG.successUrl
            });
        }, 1000);
    });
}

// Show payment error
function showPaymentError(message) {
    const modal = document.createElement('div');
    modal.className = 'payment-error-modal';
    modal.innerHTML = `
        <div class="payment-error-content">
            <h3>Zahlungsfehler</h3>
            <p>${message}</p>
            <button onclick="this.closest('.payment-error-modal').remove()">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Handle payment success (to be called on success page)
async function handlePaymentSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
        // Verify payment on backend and unlock features
        const paymentData = await verifyPaymentOnBackend(sessionId);
        
        if (paymentData.success) {
            // Update user status
            updateUserAfterPayment(paymentData);
            
            // Show success message
            showPaymentSuccessMessage(paymentData);
        }
    }
}

// Verify payment on backend (placeholder)
async function verifyPaymentOnBackend(sessionId) {
    // In production, this would verify the payment with your backend
    console.log('Verifying payment:', sessionId);
    
    return {
        success: true,
        productType: 'professional',
        isPackage: true,
        unlockedFeatures: ['businessplan', 'gruendung', 'finanzierung', 'marketing']
    };
}

// Update user after payment
function updateUserAfterPayment(paymentData) {
    if (paymentData.isPackage) {
        // Unlock package features
        const userEmail = getUserDataForCheckout().email;
        const unlockedPackages = JSON.parse(localStorage.getItem('unlockedPackages') || '{}');
        
        unlockedPackages[userEmail] = [
            ...(unlockedPackages[userEmail] || []),
            ...paymentData.unlockedFeatures
        ];
        
        localStorage.setItem('unlockedPackages', JSON.stringify(unlockedPackages));
    }
    
    // Update user status
    localStorage.setItem('userStatus', 'active');
}

// Show payment success message
function showPaymentSuccessMessage(paymentData) {
    const message = paymentData.isPackage ? 
        'Dein Paket wurde erfolgreich gebucht! Alle Beratungen sind jetzt freigeschaltet.' :
        'Deine Beratung wurde erfolgreich gebucht!';
    
    alert(message); // In production, use a nicer modal
}

// Export functions for use in other files
window.StripeIntegration = {
    loadStripe,
    createCheckoutSession,
    handlePaymentSuccess
};