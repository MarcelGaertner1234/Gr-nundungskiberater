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
});

// Magic Link Simulation
function checkMagicLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
        console.log('Magic link detected:', token);
        // In real app: Validate token and auto-login user
        showNotification('🔐 Automatisch angemeldet!', 'success');
    }
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
    const ideaTextarea = document.querySelector('.idea-textarea');
    ideaTextarea.addEventListener('input', function() {
        updateCharCount();
        const hasContent = this.value.trim().length > 20;
        document.getElementById('nextBtn2').disabled = !hasContent;
        onboardingData.idea = this.value.trim();
    });
    
    // Step 3: Timeline Selection
    document.querySelectorAll('.timeline-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            onboardingData.timeline = this.dataset.value;
            document.getElementById('nextBtn3').disabled = false;
        });
    });
    
    // Step 4: Consulting Selection
    document.querySelectorAll('.consulting-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.consulting-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            onboardingData.consulting = this.dataset.value;
            document.getElementById('completeBtn').disabled = false;
        });
    });
}

// Character Count
function updateCharCount() {
    const textarea = document.querySelector('.idea-textarea');
    const count = textarea.value.length;
    document.getElementById('charCount').textContent = count;
    
    if (count > 500) {
        textarea.value = textarea.value.substring(0, 500);
    }
}

// Navigation
function nextStep() {
    if (currentStep < totalSteps) {
        // Mark current step as completed
        document.querySelectorAll('.step')[currentStep - 1].classList.add('completed');
        
        // Hide current step
        document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show next step
        currentStep++;
        document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.add('active');
        
        // Update progress
        updateProgress();
        
        // Mark next step as active
        document.querySelectorAll('.step')[currentStep - 1].classList.add('active');
        
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
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Step Indicators
function updateStepIndicators() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active');
        if (index < currentStep - 1) {
            step.classList.add('completed');
        } else if (index === currentStep - 1) {
            step.classList.add('active');
        } else {
            step.classList.remove('completed');
        }
    });
}

// Save Progress
function saveProgress() {
    // In real app: Save to backend
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
    localStorage.setItem('onboardingStep', currentStep);
}

// Complete Onboarding
function completeOnboarding() {
    // Save final data
    saveProgress();
    
    // Hide current step
    document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Show completion state
    document.getElementById('completionState').style.display = 'block';
    
    // Trigger confetti
    setTimeout(() => {
        triggerConfetti();
    }, 500);
    
    // Send admin notification (simulated)
    sendAdminNotification();
    
    // Redirect to dashboard after delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 3000);
}

// Confetti Animation
function triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f1c40f'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(confetti);
    }
    
    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 4000);
}

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
    
    if (savedStep && savedData && !window.location.search.includes('reset')) {
        // Restore progress
        const data = JSON.parse(savedData);
        Object.assign(onboardingData, data);
        
        // Jump to saved step
        if (parseInt(savedStep) > 1) {
            currentStep = 1;
            for (let i = 1; i < parseInt(savedStep); i++) {
                nextStep();
            }
        }
    }
    
    // Load theme on page load
    loadTheme();
});

// Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle button
    updateThemeToggleIcon(newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

function updateThemeToggleIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (sunIcon && moonIcon) {
        if (theme === 'dark') {
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        } else {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        }
    }
}