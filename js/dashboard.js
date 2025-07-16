/**
 * Dashboard JavaScript
 * Handles dashboard interactions and dynamic content
 */

// Check if user completed onboarding
document.addEventListener('DOMContentLoaded', function() {
    checkOnboardingStatus();
    initializeDashboard();
    loadUserData();
});

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Check Onboarding Status
function checkOnboardingStatus() {
    const onboardingCompleted = localStorage.getItem('onboardingData');
    
    if (!onboardingCompleted) {
        // Show completion banner
        document.getElementById('completionBanner').style.display = 'flex';
    } else {
        // Load and display user data
        const userData = JSON.parse(onboardingCompleted);
        personalizeWelcome(userData);
    }
}

// Personalize Welcome Message
function personalizeWelcome(userData) {
    if (userData.profile === 'vollzeit') {
        document.querySelector('.welcome-subtitle').textContent = 
            'Als Vollzeit-Gründer hast du beste Voraussetzungen für einen erfolgreichen Start!';
    } else if (userData.profile === 'student') {
        document.querySelector('.welcome-subtitle').textContent = 
            'Studium und Gründung - eine perfekte Kombination für innovative Ideen!';
    }
}

// Restart Onboarding
function restartOnboarding() {
    window.location.href = 'onboarding.html?reset=true';
}

// Initialize Dashboard
function initializeDashboard() {
    // Step checkboxes
    document.querySelectorAll('.step-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateProgress();
            saveStepProgress();
        });
    });
    
    // Quick actions
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            handleQuickAction(this);
        });
    });
    
    // AI Assistant
    const aiInput = document.querySelector('.ai-input-field');
    const aiSendBtn = document.querySelector('.ai-send-btn');
    
    if (aiInput && aiSendBtn) {
        aiSendBtn.addEventListener('click', sendAIMessage);
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }
    
    // Suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const suggestion = this.textContent.trim();
            document.querySelector('.ai-input-field').value = suggestion.substring(2); // Remove emoji
            sendAIMessage();
        });
    });
    
    // FAB
    document.querySelector('.fab').addEventListener('click', function() {
        showQuickCreateMenu();
    });
}

// Load User Data
function loadUserData() {
    const onboardingData = localStorage.getItem('onboardingData');
    
    if (onboardingData) {
        const data = JSON.parse(onboardingData);
        
        // Update next steps based on user timeline
        if (data.timeline === 'sofort') {
            highlightUrgentSteps();
        }
        
        // Update consulting focus
        if (data.consulting) {
            updateConsultingFocus(data.consulting);
        }
    }
}

// Update Progress
function updateProgress() {
    const totalSteps = document.querySelectorAll('.step-checkbox').length;
    const completedSteps = document.querySelectorAll('.step-checkbox:checked').length;
    const progress = Math.round((completedSteps / totalSteps) * 100);
    
    // Update overall progress if we add it to the UI
    console.log(`Progress: ${progress}%`);
}

// Save Step Progress
function saveStepProgress() {
    const steps = {};
    document.querySelectorAll('.step-checkbox').forEach((checkbox, index) => {
        steps[`step_${index}`] = checkbox.checked;
    });
    localStorage.setItem('dashboardSteps', JSON.stringify(steps));
}

// Handle Quick Actions
function handleQuickAction(card) {
    const action = card.querySelector('h3').textContent;
    
    switch(action) {
        case 'Beratungstermin buchen':
            showAppointmentModal();
            break;
        case 'Businessplan erstellen':
            window.location.href = '#businessplan';
            break;
        case 'Förderungen prüfen':
            showFundingOptions();
            break;
        case 'KI-Berater starten':
            focusAIAssistant();
            break;
    }
}

// AI Assistant
function sendAIMessage() {
    const input = document.querySelector('.ai-input-field');
    const message = input.value.trim();
    
    if (message) {
        console.log('AI Message:', message);
        
        // Simulate AI response
        input.value = '';
        showNotification('🤖 KI-Berater analysiert deine Anfrage...', 'info');
        
        setTimeout(() => {
            showNotification('💡 Antwort bereit! Check deine Nachrichten.', 'success');
        }, 2000);
    }
}

// Highlight Urgent Steps
function highlightUrgentSteps() {
    const firstStep = document.querySelector('.step-item');
    if (firstStep) {
        firstStep.style.borderLeft = '3px solid var(--color-primary)';
        firstStep.style.paddingLeft = '12px';
    }
}

// Update Consulting Focus
function updateConsultingFocus(focus) {
    const focusMap = {
        'finanzierung': '💰 Finanzierung',
        'rechtsform': '⚖️ Rechtsform',
        'businessplan': '📊 Businessplan',
        'marketing': '📱 Marketing'
    };
    
    // Could update UI to show personalized content based on focus
    console.log('User focus:', focusMap[focus]);
}

// Show Appointment Modal (Placeholder)
function showAppointmentModal() {
    showNotification('📅 Terminbuchung öffnet sich...', 'info');
}

// Show Funding Options (Placeholder)
function showFundingOptions() {
    showNotification('💰 5 neue Fördermöglichkeiten gefunden!', 'success');
}

// Focus AI Assistant
function focusAIAssistant() {
    document.querySelector('.ai-input-field').focus();
}

// Show Quick Create Menu
function showQuickCreateMenu() {
    showNotification('➕ Quick-Create Menü kommt bald!', 'info');
}

// Notification Helper
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `dashboard-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 16px 24px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideUp 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translate(-50%, 100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, 100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Load theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Restore step progress
const savedSteps = localStorage.getItem('dashboardSteps');
if (savedSteps) {
    const steps = JSON.parse(savedSteps);
    Object.entries(steps).forEach(([key, checked]) => {
        const index = parseInt(key.split('_')[1]);
        const checkbox = document.querySelectorAll('.step-checkbox')[index];
        if (checkbox) {
            checkbox.checked = checked;
        }
    });
}