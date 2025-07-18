/**
 * Onboarding Flow JavaScript
 * Handles navigation, validation, and data collection
 */

// Global state
let currentStep = 1;
const totalSteps = 4;
const onboardingData = {
    profile: null,
    idea: null,
    timeline: null,
    consulting: null
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeStepHandlers();
    checkMagicLink();
    updateCharCount();
    
    // Get existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    console.log('Onboarding - Existing data:', existingData);
    
    // Check if coming from registration for consulting
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const step = urlParams.get('step');
    
    console.log('Onboarding - URL params:', { type, step });
    
    // Default to step 1 if no step is specified
    if (!step) {
        currentStep = 1;
        showStep(1);
    } else {
        currentStep = parseInt(step);
        showStep(currentStep);
    }
    
    console.log('Onboarding - Starting at step:', currentStep);
    
    // Pre-fill data from landing page (if available)
    if (existingData.businessIdea) {
        onboardingData.idea = existingData.businessIdea;
        
        // Try to fill immediately if field exists
        const ideaField = document.getElementById('businessIdea');
        if (ideaField && !ideaField.value) {
            ideaField.value = existingData.businessIdea;
            updateCharCount();
            // Enable next button if content is sufficient
            const hasContent = ideaField.value.trim().length > 20;
            const nextBtn = document.getElementById('nextBtn2');
            if (nextBtn) nextBtn.disabled = !hasContent;
        }
        
        // Also set up observer for when the field becomes available
        const observer = new MutationObserver(() => {
            const ideaField = document.getElementById('businessIdea');
            if (ideaField && !ideaField.value && existingData.businessIdea) {
                ideaField.value = existingData.businessIdea;
                updateCharCount();
                // Enable next button if content is sufficient
                const hasContent = ideaField.value.trim().length > 20;
                const nextBtn = document.getElementById('nextBtn2');
                if (nextBtn) nextBtn.disabled = !hasContent;
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // Pre-fill timeline based on foundation phase from landing page
    if (existingData.phase) {
        // Map foundation phases to timeline values
        const phaseToTimeline = {
            'ideenphase': 'sofort',     // Ideenphase -> Sofort
            'konzeptphase': '3monate',  // Konzeptphase -> In 3 Monaten
            'gruendungsphase': 'sofort', // Gründungsphase -> Sofort
            'wachstumsphase': 'sofort'   // Wachstumsphase -> Sofort
        };
        onboardingData.timeline = phaseToTimeline[existingData.phase] || null;
        
        // Pre-select the timeline option when we reach step 3
        const timelineObserver = new MutationObserver(() => {
            const timelineOption = document.querySelector(`.timeline-card[data-value="${onboardingData.timeline}"]`);
            if (timelineOption && currentStep === 3 && !document.querySelector('.timeline-card.selected')) {
                timelineOption.click();
            }
        });
        timelineObserver.observe(document.body, { childList: true, subtree: true });
    }
    
    // Also pre-fill profile data if available
    if (existingData.name || existingData.email) {
        onboardingData.profile = existingData.profile || 'founder';
    }
    
    // Update titles for consulting context if type=beratung
    if (type === 'beratung') {
        const titles = {
            1: 'Willkommen bei deiner Gründungsberatung! 🎯',
            2: 'Erzähl uns von deiner Geschäftsidee 💡',
            3: 'Wann möchtest du durchstarten? ⏰',
            4: 'Welche Unterstützung brauchst du? 🤝'
        };
        
        // Update all step titles
        Object.entries(titles).forEach(([step, title]) => {
            const titleElement = document.querySelector(`.onboarding-step[data-step="${step}"] h2`);
            if (titleElement) {
                titleElement.textContent = title;
            }
        });
    }
});

// Magic Link Simulation removed for 1:1 testing
function checkMagicLink() {
    // Token-based authentication removed for clean testing
    // Real implementation would validate authentication tokens here
}

// Step Handlers
function initializeStepHandlers() {
    // Step 1: Profile Selection
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            onboardingData.profile = this.dataset.value;
            document.getElementById('nextBtn1').disabled = false;
        });
    });
    
    // Step 2: Idea Input
    const ideaTextarea = document.getElementById('businessIdea');
    if (ideaTextarea) {
        ideaTextarea.addEventListener('input', function() {
            updateCharCount();
            const hasContent = this.value.trim().length > 20;
            document.getElementById('nextBtn2').disabled = !hasContent;
            onboardingData.idea = this.value.trim();
        });
    }
    
    // Step 3: Timeline Selection
    document.querySelectorAll('.timeline-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            onboardingData.timeline = this.dataset.value;
            document.getElementById('nextBtn3').disabled = false;
        });
    });
    
    // Step 4: Consulting Selection (Multiple choice or Gesamtpaket)
    document.querySelectorAll('.consulting-card').forEach(card => {
        card.addEventListener('click', function() {
            const isGesamtpaket = this.dataset.value === 'gesamtpaket';
            
            if (isGesamtpaket) {
                // If Gesamtpaket selected, deselect all others
                document.querySelectorAll('.consulting-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                onboardingData.consulting = ['gesamtpaket'];
            } else {
                // Remove Gesamtpaket if other option selected
                document.querySelector('.consulting-card[data-value="gesamtpaket"]').classList.remove('selected');
                
                // Toggle selection for individual services
                this.classList.toggle('selected');
                
                // Collect all selected services
                const selected = Array.from(document.querySelectorAll('.consulting-card.selected'))
                    .map(card => card.dataset.value);
                
                onboardingData.consulting = selected;
            }
            
            // Enable complete button if at least one option selected
            const hasSelection = document.querySelectorAll('.consulting-card.selected').length > 0;
            document.getElementById('completeBtn').disabled = !hasSelection;
        });
    });
}

// Character Count
function updateCharCount() {
    const textarea = document.getElementById('businessIdea');
    if (textarea) {
        const count = textarea.value.length;
        document.getElementById('charCount').textContent = count;
        
        if (count > 500) {
            textarea.value = textarea.value.substring(0, 500);
        }
    }
}

// Show specific step
function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.onboarding-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show target step
    const targetStep = document.querySelector(`.onboarding-step[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
        currentStep = stepNumber;
        updateProgress();
        updateStepIndicators();
    }
}

// Navigation
function nextStep() {
    if (currentStep < totalSteps) {
        // Hide current step
        document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show next step
        currentStep++;
        document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.add('active');
        
        // Update progress
        updateProgress();
        
        // Save progress
        saveProgress();
    }
}

function previousStep() {
    if (currentStep > 1) {
        // Hide current step
        document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show previous step
        currentStep--;
        document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.add('active');
        
        // Update progress
        updateProgress();
        
        // Update step indicators
        updateStepIndicators();
    }
}

// Progress Bar
function updateProgress() {
    // Progress bar was removed, so this function is now empty
    // Keeping it to avoid breaking existing calls
}

// Step Indicators
function updateStepIndicators() {
    // Step indicators were removed, so this function is now empty
    // Keeping it to avoid breaking existing calls
}

// Save Progress
function saveProgress() {
    // Save to localStorage for recovery
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
    localStorage.setItem('onboardingStep', currentStep);
    
    // Also save to our database service if available
    if (window.db && onboardingData.idea) {
        const userEmail = getCurrentUserEmail();
        if (userEmail) {
            window.db.saveOnboardingData(userEmail, onboardingData).then(result => {
                if (result.success) {
                    console.log('Onboarding data saved to database');
                }
            });
        }
    }
}

// Complete Onboarding
function completeOnboarding() {
    console.log('completeOnboarding called');
    
    // Save final data
    saveProgress();
    
    // Mark user as having completed onboarding
    const currentUserEmail = getCurrentUserEmail();
    if (currentUserEmail) {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[currentUserEmail]) {
            users[currentUserEmail].hasCompletedOnboarding = true;
            users[currentUserEmail].onboardingCompletedAt = new Date().toISOString();
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    
    // Send admin notification (simulated)
    sendAdminNotification();
    
    console.log('About to call proceedToPayment');
    
    // Directly proceed to cost overview
    proceedToPayment();
}

// Get current user email from session
function getCurrentUserEmail() {
    const currentSession = localStorage.getItem('currentSession');
    if (currentSession) {
        const session = JSON.parse(currentSession);
        return session.email;
    }
    return null;
}


// Proceed to payment
function proceedToPayment() {
    console.log('proceedToPayment called');
    const services = onboardingData.consulting || [];
    console.log('Selected services:', services);
    
    // Save selected services to localStorage
    const paymentData = {
        services: services,
        profile: onboardingData.profile,
        idea: onboardingData.idea,
        timeline: onboardingData.timeline,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('pendingPayment', JSON.stringify(paymentData));
    console.log('Payment data saved:', paymentData);
    
    // Redirect to cost overview page first
    console.log('Redirecting to cost-overview.html');
    window.location.href = 'cost-overview.html';
}

// Make function globally available
window.proceedToPayment = proceedToPayment;


// Admin Notification (Simulated)
function sendAdminNotification() {
    const userData = {
        profile: onboardingData.profile,
        idea: onboardingData.idea,
        timeline: onboardingData.timeline,
        consulting: onboardingData.consulting,
        timestamp: new Date().toISOString()
    };
    
    console.log('Admin Notification:', userData);
    
    // In real app: Send to backend
    // fetch('/api/admin/new-user-alert', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(userData)
    // });
}

// Utility Functions
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        const activeStep = document.querySelector('.onboarding-step.active');
        const nextBtn = activeStep.querySelector('.btn-primary:not(:disabled)');
        
        if (nextBtn && e.target.tagName !== 'TEXTAREA') {
            nextBtn.click();
        }
    }
});

// Restore Progress (if user returns)
window.addEventListener('load', function() {
    const savedStep = localStorage.getItem('onboardingStep');
    const savedData = localStorage.getItem('onboardingData');
    const urlParams = new URLSearchParams(window.location.search);
    const urlStep = urlParams.get('step');
    
    // Only restore if there's no URL step parameter and no reset flag
    if (savedStep && savedData && !window.location.search.includes('reset') && !urlStep) {
        // Check if this is a fresh session (coming from login/register)
        const currentSession = JSON.parse(localStorage.getItem('currentSession') || '{}');
        const isNewSession = currentSession.loginTime && 
            (new Date() - new Date(currentSession.loginTime)) < 60000; // Less than 1 minute old
        
        if (!isNewSession) {
            // Restore progress for returning users
            const data = JSON.parse(savedData);
            Object.assign(onboardingData, data);
            
            // Jump to saved step
            if (parseInt(savedStep) > 1) {
                currentStep = 1;
                for (let i = 1; i < parseInt(savedStep); i++) {
                    nextStep();
                }
            }
        } else {
            // New session - start from step 1
            console.log('New session detected, starting from step 1');
            localStorage.removeItem('onboardingStep');
        }
    }
});