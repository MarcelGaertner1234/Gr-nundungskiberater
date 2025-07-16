/**
 * Dashboard JavaScript
 * Handles dashboard interactions and dynamic content
 */

// Check if user completed onboarding
document.addEventListener('DOMContentLoaded', function() {
    // Wait for i18n to load
    const checkI18n = setInterval(() => {
        if (window.dashboardI18n && window.dashboardI18n.isLoaded) {
            clearInterval(checkI18n);
            
            // Update all translations
            if (window.updateDashboardTranslations) {
                window.updateDashboardTranslations();
            }
            
            checkOnboardingStatus();
            initializeDashboard();
            loadUserData();
        }
    }, 50);
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
        showNotification(t('ai_assistant.analyzing'), 'info');
        
        setTimeout(() => {
            showNotification(t('ai_assistant.response_ready'), 'success');
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

// Show Appointment Modal
function showAppointmentModal() {
    // Check user status
    const userStatus = getUserStatus();
    
    // Create modal HTML
    const modalHTML = `
        <div class="appointment-modal-overlay" id="appointmentModal">
            <div class="appointment-modal">
                <div class="modal-header">
                    <h2>${t('appointments.title')}</h2>
                    <button class="modal-close" onclick="closeAppointmentModal()">✕</button>
                </div>
                
                <div class="modal-body">
                    <!-- Step 1: Choose consultation type -->
                    <div class="appointment-step" id="consultationTypeStep">
                        <h3>${t('appointments.consultation.messages.choose_type')}</h3>
                        <p class="modal-description">${t('appointments.consultation.messages.choose_type_description')}</p>
                        
                        <div class="consultation-types">
                            ${generateConsultationTypes(userStatus)}
                        </div>
                    </div>
                    
                    <!-- Step 2: Choose time slot -->
                    <div class="appointment-step" id="timeSlotStep" style="display: none;">
                        <button class="back-button" onclick="backToConsultationType()">${t('appointments.consultation.form.back')}</button>
                        <h3>${t('appointments.consultation.messages.choose_slot')}</h3>
                        <p class="modal-description" id="slotDescription">${t('appointments.consultation.messages.choose_slot_description')}</p>
                        
                        <div class="appointment-slots" id="appointmentSlots">
                            <!-- Slots will be generated here -->
                        </div>
                        
                        <div class="selected-appointment" id="selectedAppointment" style="display: none;">
                            <h3>${t('appointments.consultation.messages.selected_appointment')}</h3>
                            <p id="selectedDateTime"></p>
                            <p id="selectedConsultationType"></p>
                        </div>
                        
                        <div class="appointment-form" id="appointmentForm" style="display: none;">
                            <h3>${t('appointments.consultation.messages.contact_details')}</h3>
                            <input type="text" placeholder="${t('appointments.consultation.form.name')}" id="appointmentName" class="modal-input">
                            <input type="email" placeholder="${t('appointments.consultation.form.email')}" id="appointmentEmail" class="modal-input">
                            <input type="tel" placeholder="${t('appointments.consultation.form.phone')}" id="appointmentPhone" class="modal-input">
                            <textarea placeholder="${t('appointments.consultation.messages.special_topics')}" id="appointmentTopic" class="modal-textarea" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeAppointmentModal()">${t('appointments.consultation.form.cancel')}</button>
                    <button class="btn btn-primary" id="confirmAppointment" onclick="confirmAppointment()" disabled>${t('appointments.consultation.form.confirm')}</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles if not already present
    addModalStyles();
    addConsultationStyles();
}

// Get user status
function getUserStatus() {
    const userStatus = localStorage.getItem('userStatus') || 'new';
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const hasHadFirstMeeting = appointments.some(apt => apt.type === 'erstgespraech');
    const unlockedConsultations = JSON.parse(localStorage.getItem('unlockedConsultations') || '[]');
    
    return {
        status: userStatus,
        hasHadFirstMeeting,
        unlockedConsultations
    };
}

// Generate consultation types based on user status
function generateConsultationTypes(userStatus) {
    // Wait for translations to load
    if (!window.t) {
        setTimeout(() => generateConsultationTypes(userStatus), 100);
        return '';
    }
    
    const consultationTypes = [
        {
            id: 'erstgespraech',
            title: t('appointments.consultation.types.erstgespraech.title'),
            duration: t('appointments.consultation.types.erstgespraech.duration'),
            price: t('appointments.consultation.types.erstgespraech.price'),
            description: t('appointments.consultation.types.erstgespraech.description'),
            icon: '🤝',
            available: !userStatus.hasHadFirstMeeting,
            message: userStatus.hasHadFirstMeeting ? t('appointments.consultation.messages.already_used') : null
        },
        {
            id: 'businessplan',
            title: t('appointments.consultation.types.businessplan.title'),
            duration: t('appointments.consultation.types.businessplan.duration'),
            price: t('appointments.consultation.types.businessplan.price'),
            description: t('appointments.consultation.types.businessplan.description'),
            icon: '📊',
            available: userStatus.unlockedConsultations.includes('businessplan'),
            message: !userStatus.unlockedConsultations.includes('businessplan') ? t('appointments.consultation.messages.unlock_required') : null
        },
        {
            id: 'gruendung',
            title: t('appointments.consultation.types.gruendung.title'),
            duration: t('appointments.consultation.types.gruendung.duration'),
            price: t('appointments.consultation.types.gruendung.price'),
            description: t('appointments.consultation.types.gruendung.description'),
            icon: '🚀',
            available: userStatus.unlockedConsultations.includes('gruendung'),
            message: !userStatus.unlockedConsultations.includes('gruendung') ? t('appointments.consultation.messages.unlock_required') : null
        },
        {
            id: 'finanzierung',
            title: t('appointments.consultation.types.finanzierung.title'),
            duration: t('appointments.consultation.types.finanzierung.duration'),
            price: t('appointments.consultation.types.finanzierung.price'),
            description: t('appointments.consultation.types.finanzierung.description'),
            icon: '💰',
            available: userStatus.unlockedConsultations.includes('finanzierung'),
            message: !userStatus.unlockedConsultations.includes('finanzierung') ? t('appointments.consultation.messages.unlock_required') : null
        },
        {
            id: 'marketing',
            title: t('appointments.consultation.types.marketing.title'),
            duration: t('appointments.consultation.types.marketing.duration'),
            price: t('appointments.consultation.types.marketing.price'),
            description: t('appointments.consultation.types.marketing.description'),
            icon: '📱',
            available: userStatus.unlockedConsultations.includes('marketing'),
            message: !userStatus.unlockedConsultations.includes('marketing') ? t('appointments.consultation.messages.unlock_required') : null
        }
    ];
    
    return consultationTypes.map(type => `
        <div class="consultation-type-card ${!type.available ? 'locked' : ''}" 
             onclick="${type.available ? `selectConsultationType('${type.id}', '${type.title}', '${type.duration}')` : `showUpgradePrompt('${type.id}')`}">
            <div class="consultation-icon">${type.icon}</div>
            <div class="consultation-info">
                <h4>${type.title}</h4>
                <p class="consultation-description">${type.description}</p>
                <div class="consultation-meta">
                    <span class="duration">⏱ ${type.duration}</span>
                    <span class="price">${type.price}</span>
                </div>
                ${type.message ? `<div class="consultation-message">${type.message}</div>` : ''}
            </div>
            ${!type.available ? '<div class="lock-overlay">🔒</div>' : ''}
        </div>
    `).join('');
}

// Select consultation type
function selectConsultationType(typeId, title, duration) {
    window.selectedConsultationType = {
        id: typeId,
        title: title,
        duration: duration
    };
    
    // Hide consultation type step
    document.getElementById('consultationTypeStep').style.display = 'none';
    
    // Show time slot step
    document.getElementById('timeSlotStep').style.display = 'block';
    
    // Update description
    document.getElementById('slotDescription').textContent = t('appointments.consultation.messages.choose_slot_description', { type: title, duration: duration });
    
    // Generate slots based on consultation type
    generateAppointmentSlots(typeId);
}

// Back to consultation type selection
function backToConsultationType() {
    document.getElementById('consultationTypeStep').style.display = 'block';
    document.getElementById('timeSlotStep').style.display = 'none';
    document.getElementById('selectedAppointment').style.display = 'none';
    document.getElementById('appointmentForm').style.display = 'none';
    document.getElementById('confirmAppointment').disabled = true;
}

// Show upgrade prompt
function showUpgradePrompt(consultationType) {
    const message = t(`appointments.consultation.upgrade_prompts.${consultationType}`);
    
    showNotification(t('notifications.locked_feature', { message }), 'info');
    
    // In real implementation, redirect to pricing page
    setTimeout(() => {
        if (confirm(t('appointments.consultation.upgrade_prompts.view_packages'))) {
            window.location.href = '#preise';
        }
    }, 1000);
}

// Generate appointment slots
function generateAppointmentSlots(consultationType) {
    const slotsContainer = document.getElementById('appointmentSlots');
    const slots = [];
    
    // Different slot durations based on consultation type
    const slotDurations = {
        'erstgespraech': 30,
        'businessplan': 90,
        'gruendung': 60,
        'finanzierung': 90,
        'marketing': 60
    };
    
    const duration = slotDurations[consultationType] || 60;
    
    // Generate 10 slots over the next 2 weeks
    const today = new Date();
    let slotsAdded = 0;
    
    for (let i = 1; slotsAdded < 10 && i < 20; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        // Add morning and afternoon slots based on duration
        let times = [];
        if (duration <= 30) {
            times = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'];
        } else if (duration <= 60) {
            times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        } else {
            times = ['09:00', '11:00', '14:00', '16:00'];
        }
        
        const availableTimes = times.slice(0, Math.floor(Math.random() * 3) + 1);
        
        availableTimes.forEach(time => {
            if (slotsAdded < 10) {
                slots.push({
                    date: date,
                    time: time,
                    available: Math.random() > 0.3 // 70% availability
                });
                slotsAdded++;
            }
        });
    }
    
    // Create HTML for slots
    const slotsHTML = slots.map((slot, index) => {
        const dateStr = slot.date.toLocaleDateString('de-DE', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
        });
        const isAvailable = slot.available ? '' : 'disabled';
        const availabilityClass = slot.available ? 'available' : 'unavailable';
        
        return `
            <button class="appointment-slot ${availabilityClass}" 
                    onclick="selectAppointment(${index})" 
                    ${isAvailable}
                    data-date="${slot.date.toISOString()}"
                    data-time="${slot.time}">
                <div class="slot-date">${dateStr}</div>
                <div class="slot-time">${slot.time} Uhr</div>
                <div class="slot-status">${slot.available ? t('appointments.consultation.status.available') : t('appointments.consultation.status.booked')}</div>
            </button>
        `;
    }).join('');
    
    slotsContainer.innerHTML = slotsHTML;
}

// Select appointment
function selectAppointment(index) {
    // Remove previous selection
    document.querySelectorAll('.appointment-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selection to clicked slot
    const slots = document.querySelectorAll('.appointment-slot');
    slots[index].classList.add('selected');
    
    // Show selected appointment details
    const selectedSlot = slots[index];
    const date = new Date(selectedSlot.dataset.date);
    const time = selectedSlot.dataset.time;
    
    const dateStr = date.toLocaleDateString('de-DE', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
    });
    
    document.getElementById('selectedDateTime').textContent = `${dateStr} um ${time} Uhr`;
    document.getElementById('selectedConsultationType').textContent = window.selectedConsultationType ? t('appointments.consultation.messages.consultation_type', { type: window.selectedConsultationType.title }) : '';
    document.getElementById('selectedAppointment').style.display = 'block';
    document.getElementById('appointmentForm').style.display = 'block';
    
    // Enable confirm button if form is filled
    checkFormCompletion();
}

// Check form completion
function checkFormCompletion() {
    const name = document.getElementById('appointmentName').value;
    const email = document.getElementById('appointmentEmail').value;
    const hasSelection = document.querySelector('.appointment-slot.selected');
    
    document.getElementById('confirmAppointment').disabled = !(name && email && hasSelection);
}

// Add event listeners for form inputs
document.addEventListener('input', (e) => {
    if (e.target.matches('#appointmentName, #appointmentEmail')) {
        checkFormCompletion();
    }
});

// Confirm appointment
function confirmAppointment() {
    const name = document.getElementById('appointmentName').value;
    const email = document.getElementById('appointmentEmail').value;
    const phone = document.getElementById('appointmentPhone').value;
    const topic = document.getElementById('appointmentTopic').value;
    const selectedSlot = document.querySelector('.appointment-slot.selected');
    
    if (!selectedSlot || !window.selectedConsultationType) return;
    
    const date = new Date(selectedSlot.dataset.date);
    const time = selectedSlot.dataset.time;
    
    // Save appointment data
    const appointmentData = {
        name,
        email,
        phone,
        topic,
        date: date.toISOString(),
        time,
        type: window.selectedConsultationType.id,
        consultationType: window.selectedConsultationType.title,
        duration: window.selectedConsultationType.duration,
        bookedAt: new Date().toISOString()
    };
    
    // Save to localStorage (in real app, send to backend)
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointmentData);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    // Close modal
    closeAppointmentModal();
    
    // Show success message
    showNotification(t('notifications.appointment_success'), 'success');
    
    // Reload appointments section
    setTimeout(() => {
        location.reload();
    }, 2000);
}

// Close appointment modal
function closeAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.remove();
    }
}

// Add modal styles
function addModalStyles() {
    if (document.getElementById('modalStyles')) return;
    
    const styles = `
        <style id="modalStyles">
            .appointment-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3000;
                padding: 20px;
                animation: fadeIn 0.3s ease-out;
            }
            
            .appointment-modal {
                background: var(--color-page);
                border-radius: 12px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                animation: slideUp 0.3s ease-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal-header {
                padding: 24px;
                border-bottom: 1px solid var(--color-border);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h2 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--color-text-medium);
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: var(--color-hover);
                color: var(--color-text);
            }
            
            .modal-body {
                padding: 24px;
                overflow-y: auto;
                flex: 1;
            }
            
            .modal-description {
                color: var(--color-text-medium);
                margin-bottom: 24px;
            }
            
            .appointment-slots {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 12px;
                margin-bottom: 24px;
            }
            
            .appointment-slot {
                padding: 16px;
                border: 2px solid var(--color-border);
                border-radius: 8px;
                background: var(--color-page);
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: center;
            }
            
            .appointment-slot:hover:not(:disabled) {
                border-color: var(--color-primary);
                background: var(--color-hover);
                transform: translateY(-2px);
            }
            
            .appointment-slot.selected {
                border-color: var(--color-primary);
                background: rgba(14, 165, 233, 0.1);
            }
            
            .appointment-slot:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .slot-date {
                font-weight: 600;
                margin-bottom: 4px;
            }
            
            .slot-time {
                font-size: 18px;
                color: var(--color-primary);
                margin-bottom: 4px;
            }
            
            .slot-status {
                font-size: 12px;
                color: var(--color-text-medium);
            }
            
            .appointment-slot.unavailable .slot-status {
                color: #ef4444;
            }
            
            .appointment-slot.available .slot-status {
                color: #22c55e;
            }
            
            .selected-appointment {
                background: var(--color-hover);
                padding: 16px;
                border-radius: 8px;
                margin-bottom: 24px;
            }
            
            .selected-appointment h3 {
                margin: 0 0 8px 0;
                font-size: 16px;
            }
            
            .appointment-form h3 {
                margin: 0 0 16px 0;
                font-size: 16px;
            }
            
            .modal-input, .modal-textarea {
                width: 100%;
                padding: 12px 16px;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                font-size: 16px;
                margin-bottom: 12px;
                background: var(--color-page);
                transition: all 0.2s ease;
            }
            
            .modal-input:focus, .modal-textarea:focus {
                outline: none;
                border-color: var(--color-primary);
                background: var(--color-hover);
            }
            
            .modal-footer {
                padding: 24px;
                border-top: 1px solid var(--color-border);
                display: flex;
                justify-content: flex-end;
                gap: 12px;
            }
            
            /* Dark mode support */
            [data-theme="dark"] .appointment-modal {
                background: var(--color-page-dark);
            }
            
            [data-theme="dark"] .appointment-slot {
                background: var(--color-page-dark);
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            [data-theme="dark"] .appointment-slot:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.05);
            }
            
            [data-theme="dark"] .modal-input,
            [data-theme="dark"] .modal-textarea {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.1);
                color: var(--color-text-dark);
            }
            
            /* Mobile responsive */
            @media (max-width: 768px) {
                .appointment-modal {
                    margin: 10px;
                }
                
                .appointment-slots {
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                }
                
                .modal-footer {
                    flex-direction: column;
                }
                
                .modal-footer .btn {
                    width: 100%;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Add consultation type styles
function addConsultationStyles() {
    if (document.getElementById('consultationStyles')) return;
    
    const styles = `
        <style id="consultationStyles">
            .appointment-step {
                animation: fadeIn 0.3s ease-out;
            }
            
            .consultation-types {
                display: grid;
                gap: 16px;
                margin-bottom: 24px;
            }
            
            .consultation-type-card {
                display: flex;
                gap: 16px;
                padding: 20px;
                border: 2px solid var(--color-border);
                border-radius: 12px;
                background: var(--color-page);
                cursor: pointer;
                transition: all 0.2s ease;
                position: relative;
                overflow: hidden;
            }
            
            .consultation-type-card:hover {
                border-color: var(--color-primary);
                background: var(--color-hover);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            
            .consultation-type-card.locked {
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            .consultation-type-card.locked:hover {
                border-color: var(--color-border);
                transform: none;
                box-shadow: none;
            }
            
            .consultation-icon {
                font-size: 48px;
                flex-shrink: 0;
            }
            
            .consultation-info {
                flex: 1;
            }
            
            .consultation-info h4 {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 8px;
            }
            
            .consultation-description {
                font-size: 14px;
                color: var(--color-text-medium);
                margin-bottom: 12px;
            }
            
            .consultation-meta {
                display: flex;
                gap: 16px;
                font-size: 14px;
            }
            
            .consultation-meta .duration {
                color: var(--color-text-medium);
            }
            
            .consultation-meta .price {
                font-weight: 600;
                color: var(--color-primary);
            }
            
            .consultation-message {
                margin-top: 8px;
                padding: 4px 8px;
                background: rgba(239, 68, 68, 0.1);
                color: #ef4444;
                border-radius: 4px;
                font-size: 12px;
                display: inline-block;
            }
            
            .lock-overlay {
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                font-size: 32px;
                opacity: 0.5;
            }
            
            .back-button {
                padding: 8px 16px;
                background: var(--color-hover);
                border: none;
                border-radius: 8px;
                font-size: 14px;
                cursor: pointer;
                margin-bottom: 16px;
                transition: all 0.2s ease;
            }
            
            .back-button:hover {
                background: var(--color-border);
            }
            
            #selectedConsultationType {
                font-size: 14px;
                color: var(--color-text-medium);
                margin-top: 4px;
            }
            
            /* Dark mode adjustments */
            [data-theme="dark"] .consultation-type-card {
                background: var(--color-page-dark);
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            [data-theme="dark"] .consultation-type-card:hover {
                background: rgba(255, 255, 255, 0.05);
            }
            
            [data-theme="dark"] .back-button {
                background: rgba(255, 255, 255, 0.05);
            }
            
            [data-theme="dark"] .back-button:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            /* Mobile responsive */
            @media (max-width: 768px) {
                .consultation-type-card {
                    flex-direction: column;
                    text-align: center;
                }
                
                .consultation-icon {
                    font-size: 36px;
                }
                
                .lock-overlay {
                    top: 10px;
                    right: 10px;
                    transform: none;
                    font-size: 24px;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Show Funding Options (Placeholder)
function showFundingOptions() {
    showNotification(t('notifications.funding_found', { count: 5 }), 'success');
}

// Focus AI Assistant
function focusAIAssistant() {
    document.querySelector('.ai-input-field').focus();
}

// Show Quick Create Menu
function showQuickCreateMenu() {
    showNotification(t('notifications.feature_coming', { feature: 'Quick-Create Menü' }), 'info');
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