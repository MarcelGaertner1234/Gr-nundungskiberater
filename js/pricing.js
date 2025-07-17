/**
 * Pricing Page JavaScript
 * Handles package selection and pricing interactions
 */

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Wait for i18n to load
    const checkI18n = setInterval(() => {
        if (window.pricingI18n && window.pricingI18n.isLoaded) {
            clearInterval(checkI18n);
            initializePricing();
        }
    }, 50);
});

// Initialize Pricing Page
function initializePricing() {
    // Update all translations
    updatePricingTranslations();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Update translations
function updatePricingTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = window.pricingT(key);
        if (translation && translation !== key) {
            element.textContent = translation;
        }
    });
}

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Select Package
function selectPackage(packageType) {
    const packages = {
        starter: {
            name: window.pricingT('pricing.packages.starter.title'),
            price: '€490',
            savings: '€90',
            features: [
                window.pricingT('pricing.packages.starter.feature1'),
                window.pricingT('pricing.packages.starter.feature2'),
                window.pricingT('pricing.packages.starter.feature3'),
                window.pricingT('pricing.packages.starter.feature4')
            ]
        },
        professional: {
            name: window.pricingT('pricing.packages.professional.title'),
            price: '€890',
            savings: '€190',
            features: [
                window.pricingT('pricing.packages.professional.feature1'),
                window.pricingT('pricing.packages.professional.feature2'),
                window.pricingT('pricing.packages.professional.feature3'),
                window.pricingT('pricing.packages.professional.feature4'),
                window.pricingT('pricing.packages.professional.feature5')
            ]
        },
        premium: {
            name: window.pricingT('pricing.packages.premium.title'),
            price: '€1490',
            savings: '€390',
            features: [
                window.pricingT('pricing.packages.premium.feature1'),
                window.pricingT('pricing.packages.premium.feature2'),
                window.pricingT('pricing.packages.premium.feature3'),
                window.pricingT('pricing.packages.premium.feature4'),
                window.pricingT('pricing.packages.premium.feature5')
            ]
        }
    };
    
    const selectedPackage = packages[packageType];
    
    if (selectedPackage) {
        showPackageModal(selectedPackage, packageType);
    }
}

// Show Package Modal
function showPackageModal(packageData, packageType) {
    const modal = document.getElementById('packageModal');
    const modalBody = document.getElementById('packageModalBody');
    
    modalBody.innerHTML = `
        <div class="package-summary">
            <h3>${packageData.name}</h3>
            <div class="package-price-summary">
                <span class="price">${packageData.price}</span>
                <span class="savings">${window.pricingT('pricing.modal.savings', { amount: packageData.savings })}</span>
            </div>
            
            <div class="package-features-summary">
                <h4>${window.pricingT('pricing.modal.includes')}:</h4>
                <ul>
                    ${packageData.features.map(feature => `
                        <li>
                            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="payment-info">
                <p>${window.pricingT('pricing.modal.payment_info')}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    window.selectedPackageType = packageType;
}

// Close Package Modal
function closePackageModal() {
    document.getElementById('packageModal').style.display = 'none';
}

// Proceed to Checkout
async function proceedToCheckout() {
    const packageType = window.selectedPackageType;
    
    // Store selected package
    localStorage.setItem('selectedPackage', packageType);
    
    // Show loading state
    const proceedButton = document.querySelector('.modal-footer .button-primary');
    const originalText = proceedButton.textContent;
    proceedButton.textContent = 'Wird geladen...';
    proceedButton.disabled = true;
    
    try {
        // Load Stripe if not already loaded
        if (window.StripeIntegration) {
            await window.StripeIntegration.loadStripe();
            
            // Create checkout session
            await window.StripeIntegration.createCheckoutSession(packageType, true);
        } else {
            // Fallback if Stripe integration not loaded
            alert(window.pricingT('pricing.modal.checkout_message'));
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Es gab einen Fehler beim Starten des Zahlungsvorgangs. Bitte versuchen Sie es erneut.');
        
        // Reset button
        proceedButton.textContent = originalText;
        proceedButton.disabled = false;
    }
}

// Book individual consultation
async function bookConsultation(consultationType) {
    // Check if user is logged in
    const userData = localStorage.getItem('onboardingData');
    if (!userData) {
        if (confirm('Bitte melde dich zuerst an, um eine Beratung zu buchen. Zum Onboarding?')) {
            window.location.href = 'onboarding.html';
        }
        return;
    }
    
    // Check if consultation is unlocked
    const userEmail = JSON.parse(userData).email;
    const unlockedPackages = JSON.parse(localStorage.getItem('unlockedPackages') || '{}');
    const userUnlocked = unlockedPackages[userEmail] || [];
    
    if (consultationType !== 'erstgespraech' && !userUnlocked.includes(consultationType)) {
        // Need to pay for this consultation
        try {
            if (window.StripeIntegration) {
                await window.StripeIntegration.loadStripe();
                await window.StripeIntegration.createCheckoutSession(consultationType, false);
            } else {
                alert('Diese Beratung muss erst freigeschaltet werden.');
                window.location.href = 'dashboard.html';
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Es gab einen Fehler. Bitte versuchen Sie es erneut.');
        }
    } else {
        // Consultation is unlocked, go to dashboard to book appointment
        localStorage.setItem('bookingConsultationType', consultationType);
        window.location.href = 'dashboard.html#book-appointment';
    }
}

// Handle window click to close modal
window.onclick = function(event) {
    const modal = document.getElementById('packageModal');
    if (event.target === modal) {
        closePackageModal();
    }
}