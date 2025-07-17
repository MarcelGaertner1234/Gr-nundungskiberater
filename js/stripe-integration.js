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
        // Get user data
        const userData = getUserDataForCheckout();
        
        // Prepare line items
        const lineItems = isPackage ? 
            getPackageLineItems(productType) : 
            getConsultationLineItems(productType);
        
        // Create session on backend (this is a placeholder for the actual API call)
        const sessionData = await createSessionOnBackend({
            lineItems,
            customerEmail: userData.email,
            metadata: {
                userId: userData.userId,
                productType: productType,
                isPackage: isPackage
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

// Get package line items
function getPackageLineItems(packageType) {
    const packages = {
        starter: {
            name: 'Starter-Paket',
            price: 49000, // in cents
            description: 'Businessplan + Gründungsberatung + 3 Monate Support'
        },
        professional: {
            name: 'Professional Paket',
            price: 89000,
            description: 'Starter + Finanzierung + Marketing + 6 Monate Support'
        },
        premium: {
            name: 'Premium Plus Paket',
            price: 149000,
            description: 'Alles inklusive + 1 Jahr Support + WhatsApp'
        }
    };
    
    const selectedPackage = packages[packageType];
    
    return [{
        price_data: {
            currency: 'eur',
            product_data: {
                name: selectedPackage.name,
                description: selectedPackage.description
            },
            unit_amount: selectedPackage.price
        },
        quantity: 1
    }];
}

// Get consultation line items
function getConsultationLineItems(consultationType) {
    const consultations = {
        businessplan: {
            name: 'Businessplan-Beratung',
            price: 25000,
            description: '90 Minuten intensive Beratung'
        },
        gruendung: {
            name: 'Gründungsberatung',
            price: 18000,
            description: '60 Minuten Beratung'
        },
        finanzierung: {
            name: 'Finanzierungsberatung',
            price: 30000,
            description: '90 Minuten Beratung'
        },
        marketing: {
            name: 'Marketing-Beratung',
            price: 15000,
            description: '60 Minuten Beratung'
        }
    };
    
    const selectedConsultation = consultations[consultationType];
    
    return [{
        price_data: {
            currency: 'eur',
            product_data: {
                name: selectedConsultation.name,
                description: selectedConsultation.description
            },
            unit_amount: selectedConsultation.price
        },
        quantity: 1
    }];
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