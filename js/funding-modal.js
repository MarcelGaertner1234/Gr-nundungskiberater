/**
 * Funding Modal JavaScript
 * Handles the funding application modal functionality
 */

// Global variables
let selectedFundingOption = null;

// Initialize funding modal functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeFundingModal();
});

// Initialize funding modal
function initializeFundingModal() {
    setupFundingOptionListeners();
    setupKeyboardListeners();
    setupClickOutsideListener();
}

// Setup funding option listeners
function setupFundingOptionListeners() {
    const fundingOptions = document.querySelectorAll('.funding-option');
    const radioButtons = document.querySelectorAll('input[name="fundingOption"]');
    
    // Add click listeners to funding options
    fundingOptions.forEach(option => {
        option.addEventListener('click', function() {
            const optionValue = this.dataset.option;
            selectFundingOption(optionValue);
        });
    });
    
    // Add change listeners to radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                selectFundingOption(this.value);
            }
        });
    });
}

// Select funding option
function selectFundingOption(optionValue) {
    selectedFundingOption = optionValue;
    
    // Update UI
    updateFundingOptionSelection(optionValue);
    
    // Enable submit button
    updateSubmitButton();
    
    // Store selection
    localStorage.setItem('selectedFundingOption', optionValue);
}

// Update funding option selection UI
function updateFundingOptionSelection(selectedValue) {
    const options = document.querySelectorAll('.funding-option');
    const radioButtons = document.querySelectorAll('input[name="fundingOption"]');
    
    options.forEach(option => {
        const optionValue = option.dataset.option;
        
        if (optionValue === selectedValue) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    radioButtons.forEach(radio => {
        radio.checked = (radio.value === selectedValue);
    });
}

// Update submit button state
function updateSubmitButton() {
    const submitBtn = document.getElementById('submitFundingBtn');
    
    if (selectedFundingOption) {
        submitBtn.disabled = false;
        submitBtn.classList.add('pulse-glow');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('pulse-glow');
    }
}

// Open funding modal
function openFundingModal() {
    const modal = document.getElementById('fundingModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    resetFundingForm();
    
    // Focus management
    setTimeout(() => {
        const firstOption = document.querySelector('.funding-option');
        if (firstOption) {
            firstOption.focus();
        }
    }, 300);
    
    // Track modal open
    trackFundingModalOpen();
}

// Close funding modal
function closeFundingModal() {
    const modal = document.getElementById('fundingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset selection
    selectedFundingOption = null;
    
    // Track modal close
    trackFundingModalClose();
}

// Reset funding form
function resetFundingForm() {
    // Clear selection
    selectedFundingOption = null;
    
    // Clear radio buttons
    const radioButtons = document.querySelectorAll('input[name="fundingOption"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // Clear UI selection
    const options = document.querySelectorAll('.funding-option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Clear message
    const messageTextarea = document.getElementById('fundingMessage');
    if (messageTextarea) {
        messageTextarea.value = '';
    }
    
    // Update submit button
    updateSubmitButton();
}

// Submit funding request
async function submitFundingRequest() {
    if (!selectedFundingOption) {
        showNotification('Bitte wähle eine Förderungsoption aus.', 'error');
        return;
    }
    
    const submitButton = document.getElementById('submitFundingBtn');
    LoadingStates.showButtonLoading(submitButton, 'Förderung beantragen');
    
    try {
        // Get form data
        const formData = {
            fundingOption: selectedFundingOption,
            message: document.getElementById('fundingMessage').value,
            submittedAt: new Date().toISOString(),
            userProfile: getUserProfile()
        };
        
        // Simulate submission time
        await LoadingStates.simulateLoading(2000, 3000);
        
        // Save to localStorage (in real app, this would be sent to backend)
        const existingRequests = JSON.parse(localStorage.getItem('fundingRequests') || '[]');
        existingRequests.push(formData);
        localStorage.setItem('fundingRequests', JSON.stringify(existingRequests));
        
        // Success notification
        showNotification('Förderantrag erfolgreich eingereicht!', 'success');
        
        // Close modal
        closeFundingModal();
        
        // Reset form
        resetFundingForm();
        
        // Track submission
        trackFundingSubmission(formData);
        
    } catch (error) {
        console.error('Error submitting funding request:', error);
        showNotification('Fehler beim Einreichen des Förderantrags', 'error');
    } finally {
        LoadingStates.hideButtonLoading(submitButton);
    }
}

// Process funding request
function processFundingRequest(formData) {
    try {
        // Save to localStorage (in real app, this would be sent to backend)
        const existingRequests = JSON.parse(localStorage.getItem('fundingRequests') || '[]');
        existingRequests.push(formData);
        localStorage.setItem('fundingRequests', JSON.stringify(existingRequests));
        
        // Hide loading state
        hideLoadingState();
        
        // Show success
        showFundingSuccess(formData);
        
        // Close modal after delay
        setTimeout(() => {
            closeFundingModal();
        }, 3000);
        
        // Track successful submission
        trackFundingSubmission(formData);
        
    } catch (error) {
        hideLoadingState();
        showNotification('Fehler beim Senden der Anfrage. Bitte versuche es später erneut.', 'error');
        console.error('Funding request error:', error);
    }
}

// Show loading state
function showLoadingState() {
    const submitBtn = document.getElementById('submitFundingBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="loading-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" opacity="0.3"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" opacity="1"></path>
        </svg>
        Wird gesendet...
    `;
    
    // Add loading styles
    const style = document.createElement('style');
    style.innerHTML = `
        .loading-spinner {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Hide loading state
function hideLoadingState() {
    const submitBtn = document.getElementById('submitFundingBtn');
    submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        Förderung beantragen
    `;
}

// Show funding success
function showFundingSuccess(formData) {
    const optionNames = {
        fastest: 'Schnellste Förderung',
        secure: 'Sicherste Förderung',
        maximum: 'Höchste Förderung',
        comprehensive: 'Umfassende Analyse'
    };
    
    const optionName = optionNames[formData.fundingOption] || formData.fundingOption;
    
    showNotification(
        `✅ Förderantrag erfolgreich gesendet!<br>
        <strong>${optionName}</strong> wurde ausgewählt.<br>
        Du erhältst innerhalb von 24 Stunden eine Bestätigung.`,
        'success'
    );
    
    // Update dashboard stats
    updateDashboardStats();
}

// Get user profile
function getUserProfile() {
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    return {
        email: onboardingData.email || 'user@example.com',
        businessIdea: onboardingData.businessIdea || '',
        profile: onboardingData.profile || '',
        timeline: onboardingData.timeline || ''
    };
}

// Update dashboard stats
function updateDashboardStats() {
    // Update the funding button text
    const fundingButton = document.querySelector('.action-card[onclick="openFundingModal()"] p');
    if (fundingButton) {
        fundingButton.textContent = 'Antrag eingereicht';
    }
    
    // Add completed step to dashboard
    const dashboardSteps = JSON.parse(localStorage.getItem('dashboardSteps') || '{}');
    dashboardSteps.funding_requested = true;
    localStorage.setItem('dashboardSteps', JSON.stringify(dashboardSteps));
}

// Setup keyboard listeners
function setupKeyboardListeners() {
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('fundingModal');
        if (modal.style.display === 'flex') {
            if (event.key === 'Escape') {
                closeFundingModal();
            }
            
            // Number keys 1-4 for quick selection
            if (event.key >= '1' && event.key <= '4') {
                const options = ['fastest', 'secure', 'maximum', 'comprehensive'];
                const selectedOption = options[parseInt(event.key) - 1];
                if (selectedOption) {
                    selectFundingOption(selectedOption);
                }
            }
        }
    });
}

// Setup click outside listener
function setupClickOutsideListener() {
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('fundingModal');
        if (event.target === modal) {
            closeFundingModal();
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Analytics tracking functions
function trackFundingModalOpen() {
    console.log('Funding modal opened');
    // In real app, send to analytics
}

function trackFundingModalClose() {
    console.log('Funding modal closed');
    // In real app, send to analytics
}

function trackFundingSubmission(formData) {
    console.log('Funding submitted:', formData);
    // In real app, send to analytics
}

// Get funding option details
function getFundingOptionDetails(optionValue) {
    const options = {
        fastest: {
            name: 'Schnellste Förderung',
            timeline: '2-4 Wochen',
            icon: '⚡',
            description: 'Kurzfristige Förderungen mit schneller Bearbeitung'
        },
        secure: {
            name: 'Sicherste Förderung',
            timeline: '4-8 Wochen',
            icon: '🛡️',
            description: 'Etablierte Förderungen mit hoher Bewilligungsquote'
        },
        maximum: {
            name: 'Höchste Förderung',
            timeline: '6-12 Wochen',
            icon: '💎',
            description: 'Maximale Förderbeträge durch Kombination mehrerer Programme'
        },
        comprehensive: {
            name: 'Umfassende Analyse',
            timeline: '1-2 Wochen',
            icon: '🎯',
            description: 'Vollständige Prüfung aller verfügbaren Förderoptionen'
        }
    };
    
    return options[optionValue] || null;
}

// Export functions for use in other scripts
window.FundingModal = {
    open: openFundingModal,
    close: closeFundingModal,
    getOptionDetails: getFundingOptionDetails
};