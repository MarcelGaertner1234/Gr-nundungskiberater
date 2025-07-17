/**
 * Appointment Confirmation JavaScript
 * Handles appointment confirmation modal and calendar integration
 */

// Global variables
let currentAppointment = null;
let confirmationModal = null;

// Sample advisor data
const advisors = {
    'sarah-m': {
        id: 'sarah-m',
        name: 'Sarah Müller',
        initials: 'SM',
        role: 'Senior Finanzberaterin',
        specialties: ['Finanzierung', 'Fördermittel', 'Bankengespräche'],
        rating: 4.9,
        reviewCount: 127,
        avatar: '#10b981'
    },
    'thomas-k': {
        id: 'thomas-k', 
        name: 'Thomas Klein',
        initials: 'TK',
        role: 'Startup Mentor',
        specialties: ['Businessplan', 'Pitch Training', 'Strategie'],
        rating: 4.8,
        reviewCount: 89,
        avatar: '#8b5cf6'
    },
    'lisa-w': {
        id: 'lisa-w',
        name: 'Lisa Weber',
        initials: 'LW', 
        role: 'Rechtskanzlei Partnerin',
        specialties: ['Gesellschaftsrecht', 'Verträge', 'Compliance'],
        rating: 4.9,
        reviewCount: 156,
        avatar: '#f59e0b'
    }
};

// Sample appointment types
const appointmentTypes = {
    'financing-consultation': {
        name: 'Finanzierungsberatung',
        duration: 60,
        format: 'online',
        icon: '💰',
        description: 'Umfassende Beratung zu Finanzierungsmöglichkeiten',
        preparation: [
            'Aktuelle Finanzunterlagen bereithalten',
            'Businessplan-Entwurf vorbereiten', 
            'Liste konkreter Fragen erstellen',
            'Kapitalbedarf kalkulieren'
        ]
    },
    'business-plan-review': {
        name: 'Businessplan Review',
        duration: 45,
        format: 'online',
        icon: '📊',
        description: 'Professionelle Überprüfung Ihres Businessplans',
        preparation: [
            'Vollständigen Businessplan hochladen',
            'Spezielle Schwerpunkte definieren',
            'Feedback-Wünsche formulieren',
            'Zielgruppe und Markt recherchieren'
        ]
    },
    'legal-consultation': {
        name: 'Rechtsberatung',
        duration: 30,
        format: 'phone',
        icon: '⚖️',
        description: 'Rechtliche Fragen zur Gründung klären',
        preparation: [
            'Rechtliche Fragestellungen sammeln',
            'Unternehmensform überlegen',
            'Vertragsvorlagen bereithalten',
            'Gesellschafterstrukturen klären'
        ]
    }
};

// Initialize appointment confirmation system
document.addEventListener('DOMContentLoaded', function() {
    initializeAppointmentConfirmation();
    setupEventListeners();
});

// Initialize appointment confirmation
function initializeAppointmentConfirmation() {
    createConfirmationModal();
    setupKeyboardHandlers();
}

// Create confirmation modal
function createConfirmationModal() {
    if (document.getElementById('appointmentConfirmationModal')) {
        return; // Modal already exists
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'appointmentConfirmationModal';
    modal.style.display = 'none';
    
    modal.innerHTML = `
        <div class="modal-content appointment-confirmation-modal">
            <div class="modal-header">
                <h2>
                    <div class="confirmation-header-icon">📅</div>
                    Termin bestätigen
                </h2>
                <button class="modal-close" onclick="closeConfirmationModal()">×</button>
            </div>
            
            <div class="confirmation-content">
                <!-- Appointment Summary -->
                <div class="confirmation-summary">
                    <h3 class="summary-title">Termindetails</h3>
                    <div class="appointment-details" id="appointmentDetails">
                        <!-- Details will be populated by JavaScript -->
                    </div>
                </div>
                
                <!-- Advisor Information -->
                <div class="advisor-info" id="advisorInfo">
                    <!-- Advisor info will be populated by JavaScript -->
                </div>
                
                <!-- Meeting Information -->
                <div class="meeting-info" id="meetingInfo">
                    <!-- Meeting info will be populated by JavaScript -->
                </div>
                
                <!-- Preparation Guidelines -->
                <div class="preparation-guidelines" id="preparationGuidelines">
                    <!-- Preparation guidelines will be populated by JavaScript -->
                </div>
                
                <!-- Cancellation Policy -->
                <div class="cancellation-policy">
                    <h4>Stornierungsrichtlinien</h4>
                    <p>Termine können bis zu 24 Stunden vor dem geplanten Zeitpunkt kostenfrei storniert werden. Bei kurzfristigen Absagen (weniger als 24h) wird eine Ausfallgebühr von 50% berechnet.</p>
                </div>
            </div>
            
            <div class="confirmation-footer">
                <button class="btn btn-secondary" onclick="closeConfirmationModal()">
                    Abbrechen
                </button>
                <button class="btn btn-primary" onclick="confirmAppointment()" id="confirmAppointmentBtn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Termin bestätigen
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    confirmationModal = modal;
}

// Show appointment confirmation modal
function showAppointmentConfirmation(appointmentData) {
    if (!appointmentData) {
        console.error('No appointment data provided');
        return;
    }
    
    currentAppointment = appointmentData;
    
    // Update modal content
    updateConfirmationContent(appointmentData);
    
    // Show modal
    const modal = document.getElementById('appointmentConfirmationModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add success animation class
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.add('confirmation-success');
    
    // Track modal opening
    trackConfirmationModalOpen(appointmentData);
}

// Update confirmation modal content
function updateConfirmationContent(appointment) {
    updateAppointmentDetails(appointment);
    updateAdvisorInfo(appointment);
    updateMeetingInfo(appointment);
    updatePreparationGuidelines(appointment);
}

// Update appointment details
function updateAppointmentDetails(appointment) {
    const container = document.getElementById('appointmentDetails');
    const appointmentType = appointmentTypes[appointment.type] || appointmentTypes['financing-consultation'];
    
    const formattedDate = formatAppointmentDate(appointment.date, appointment.time);
    const duration = appointmentType.duration || 60;
    const endTime = calculateEndTime(appointment.time, duration);
    
    container.innerHTML = `
        <div class="detail-item">
            <span class="detail-label">Beratungsart</span>
            <span class="detail-value highlight">${appointmentType.name}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Datum</span>
            <span class="detail-value">${formattedDate.date}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Uhrzeit</span>
            <span class="detail-value">${appointment.time} - ${endTime} Uhr</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Dauer</span>
            <span class="detail-value">${duration} Minuten</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Format</span>
            <span class="detail-value">${appointmentType.format === 'online' ? 'Online-Meeting' : 'Telefonberatung'}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Status</span>
            <span class="detail-value" style="color: #f59e0b;">Bestätigung ausstehend</span>
        </div>
    `;
}

// Update advisor information
function updateAdvisorInfo(appointment) {
    const container = document.getElementById('advisorInfo');
    const advisor = advisors[appointment.advisor] || advisors['sarah-m'];
    
    const stars = '★'.repeat(Math.floor(advisor.rating)) + (advisor.rating % 1 >= 0.5 ? '☆' : '');
    
    container.innerHTML = `
        <div class="advisor-header">
            <div class="advisor-avatar" style="background: ${advisor.avatar};">
                ${advisor.initials}
            </div>
            <div class="advisor-details">
                <h3>${advisor.name}</h3>
                <div class="advisor-role">${advisor.role}</div>
                <div class="advisor-rating">
                    <div class="rating-stars">
                        ${stars.split('').map(star => `<span class="star">${star}</span>`).join('')}
                    </div>
                    <span class="rating-text">${advisor.rating} (${advisor.reviewCount} Bewertungen)</span>
                </div>
            </div>
        </div>
        
        <div class="advisor-specialties">
            <h4>Fachbereiche</h4>
            <div class="specialty-tags">
                ${advisor.specialties.map(specialty => 
                    `<span class="specialty-tag">${specialty}</span>`
                ).join('')}
            </div>
        </div>
    `;
}

// Update meeting information
function updateMeetingInfo(appointment) {
    const container = document.getElementById('meetingInfo');
    const appointmentType = appointmentTypes[appointment.type] || appointmentTypes['financing-consultation'];
    
    const isOnline = appointmentType.format === 'online';
    const meetingLink = generateMeetingLink(appointment);
    
    container.innerHTML = `
        <h3>
            ${appointmentType.icon} Ablauf & Zugang
        </h3>
        
        <div class="meeting-format">
            <div class="format-icon">
                ${isOnline ? 
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>' :
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>'
                }
            </div>
            <div class="format-details">
                <h4>${isOnline ? 'Video-Konferenz' : 'Telefonberatung'}</h4>
                <div class="format-description">${appointmentType.description}</div>
            </div>
        </div>
        
        ${isOnline ? `
            <div class="meeting-link">
                <div class="link-info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    <span class="link-text">${meetingLink}</span>
                </div>
                <button class="copy-link-btn" onclick="copyMeetingLink('${meetingLink}')">
                    Kopieren
                </button>
            </div>
            
            <div class="calendar-integration">
                <button class="calendar-btn" onclick="addToGoogleCalendar()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Google Kalender
                </button>
                <button class="calendar-btn" onclick="addToOutlookCalendar()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Outlook
                </button>
                <button class="calendar-btn" onclick="downloadICS()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    .ics Datei
                </button>
            </div>
        ` : `
            <div class="meeting-link">
                <div class="link-info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span class="link-text">Sie erhalten 15 Min vor Termin einen Anruf</span>
                </div>
            </div>
        `}
    `;
}

// Update preparation guidelines
function updatePreparationGuidelines(appointment) {
    const container = document.getElementById('preparationGuidelines');
    const appointmentType = appointmentTypes[appointment.type] || appointmentTypes['financing-consultation'];
    
    container.innerHTML = `
        <h3>Vorbereitung auf Ihren Termin</h3>
        <ul class="preparation-list">
            ${appointmentType.preparation.map((item, index) => `
                <li class="preparation-item">
                    <div class="preparation-icon">${index + 1}</div>
                    <div class="preparation-text">${item}</div>
                </li>
            `).join('')}
        </ul>
    `;
}

// Close confirmation modal
function closeConfirmationModal() {
    const modal = document.getElementById('appointmentConfirmationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Remove animation class
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('confirmation-success');
    
    currentAppointment = null;
    
    // Track modal close
    trackConfirmationModalClose();
}

// Confirm appointment
async function confirmAppointment() {
    if (!currentAppointment) {
        showNotification('Kein Termin zum Bestätigen vorhanden', 'error');
        return;
    }
    
    const confirmButton = document.getElementById('confirmAppointmentBtn');
    LoadingStates.showButtonLoading(confirmButton, 'Termin bestätigen');
    
    try {
        // Simulate confirmation process
        await LoadingStates.simulateLoading(1500, 2500);
        
        // Save confirmed appointment
        const confirmedAppointment = {
            ...currentAppointment,
            status: 'confirmed',
            confirmationId: generateConfirmationId(),
            confirmedAt: new Date().toISOString()
        };
        
        // Save to localStorage
        saveConfirmedAppointment(confirmedAppointment);
        
        // Close modal
        closeConfirmationModal();
        
        // Show success notification
        showConfirmationNotification(confirmedAppointment);
        
        // Send confirmation email (simulate)
        await sendConfirmationEmail(confirmedAppointment);
        
        // Track confirmation
        trackAppointmentConfirmation(confirmedAppointment);
        
    } catch (error) {
        console.error('Error confirming appointment:', error);
        showNotification('Fehler bei der Terminbestätigung', 'error');
    } finally {
        LoadingStates.hideButtonLoading(confirmButton);
    }
}

// Helper functions
function formatAppointmentDate(dateStr, timeStr) {
    const date = new Date(dateStr);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    return {
        date: date.toLocaleDateString('de-DE', options),
        time: timeStr
    };
}

function calculateEndTime(startTime, durationMinutes) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endMinutes = minutes + durationMinutes;
    const endHours = hours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
}

function generateMeetingLink(appointment) {
    const meetingId = Math.random().toString(36).substring(2, 15);
    return `https://meet.ki-konzept-builder.de/room/${meetingId}`;
}

function generateConfirmationId() {
    return 'CONF-' + Math.random().toString(36).substring(2, 15).toUpperCase();
}

// Save confirmed appointment
function saveConfirmedAppointment(appointment) {
    const existingAppointments = JSON.parse(localStorage.getItem('confirmedAppointments') || '[]');
    existingAppointments.push(appointment);
    localStorage.setItem('confirmedAppointments', JSON.stringify(existingAppointments));
    
    // Also update regular appointments
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = appointments.map(apt => 
        apt.id === appointment.id ? { ...apt, status: 'confirmed' } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
}

// Copy meeting link
function copyMeetingLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        showNotification('Meeting-Link kopiert!', 'success');
    }).catch(() => {
        showNotification('Fehler beim Kopieren', 'error');
    });
}

// Calendar integration functions
function addToGoogleCalendar() {
    if (!currentAppointment) return;
    
    const appointmentType = appointmentTypes[currentAppointment.type];
    const startDate = new Date(`${currentAppointment.date}T${currentAppointment.time}`);
    const endDate = new Date(startDate.getTime() + (appointmentType.duration * 60000));
    
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: `${appointmentType.name} - KI Konzept Builder`,
        dates: `${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}`,
        details: `Beratungstermin mit ${advisors[currentAppointment.advisor].name}\n\nMeeting-Link: ${generateMeetingLink(currentAppointment)}`,
        location: appointmentType.format === 'online' ? 'Online-Meeting' : 'Telefonberatung'
    });
    
    window.open(`https://calendar.google.com/calendar/render?${params}`, '_blank');
    trackCalendarIntegration('google');
}

function addToOutlookCalendar() {
    if (!currentAppointment) return;
    
    const appointmentType = appointmentTypes[currentAppointment.type];
    const startDate = new Date(`${currentAppointment.date}T${currentAppointment.time}`);
    const endDate = new Date(startDate.getTime() + (appointmentType.duration * 60000));
    
    const params = new URLSearchParams({
        subject: `${appointmentType.name} - KI Konzept Builder`,
        startdt: startDate.toISOString(),
        enddt: endDate.toISOString(),
        body: `Beratungstermin mit ${advisors[currentAppointment.advisor].name}\n\nMeeting-Link: ${generateMeetingLink(currentAppointment)}`,
        location: appointmentType.format === 'online' ? 'Online-Meeting' : 'Telefonberatung'
    });
    
    window.open(`https://outlook.live.com/calendar/0/deeplink/compose?${params}`, '_blank');
    trackCalendarIntegration('outlook');
}

function downloadICS() {
    if (!currentAppointment) return;
    
    const appointmentType = appointmentTypes[currentAppointment.type];
    const startDate = new Date(`${currentAppointment.date}T${currentAppointment.time}`);
    const endDate = new Date(startDate.getTime() + (appointmentType.duration * 60000));
    
    const icsContent = generateICSContent(startDate, endDate, appointmentType);
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `termin-${currentAppointment.date}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    trackCalendarIntegration('ics');
}

function generateICSContent(startDate, endDate, appointmentType) {
    const formatDateForICS = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KI Konzept Builder//Appointment//DE
BEGIN:VEVENT
UID:${generateConfirmationId()}@ki-konzept-builder.de
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
SUMMARY:${appointmentType.name} - KI Konzept Builder
DESCRIPTION:Beratungstermin mit ${advisors[currentAppointment.advisor].name}\\n\\nMeeting-Link: ${generateMeetingLink(currentAppointment)}
LOCATION:${appointmentType.format === 'online' ? 'Online-Meeting' : 'Telefonberatung'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
}

function formatDateForCalendar(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// Send confirmation email (simulate)
async function sendConfirmationEmail(appointment) {
    console.log('Sending confirmation email for appointment:', appointment.confirmationId);
    // In real app, this would make an API call to send email
    return Promise.resolve();
}

// Show confirmation notification
function showConfirmationNotification(appointment) {
    const notification = document.createElement('div');
    notification.className = 'confirmation-notification';
    notification.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Termin erfolgreich bestätigt! Bestätigungs-ID: ${appointment.confirmationId}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; margin-left: auto; cursor: pointer;">×</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 8000);
}

// Setup event listeners
function setupEventListeners() {
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('appointmentConfirmationModal');
            if (modal && modal.style.display === 'flex') {
                closeConfirmationModal();
            }
        }
    });
    
    // Handle click outside modal
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('appointmentConfirmationModal');
        if (e.target === modal) {
            closeConfirmationModal();
        }
    });
}

// Keyboard handlers
function setupKeyboardHandlers() {
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('appointmentConfirmationModal');
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'Enter' && e.ctrlKey) {
                confirmAppointment();
            }
        }
    });
}

// Analytics and tracking functions
function trackConfirmationModalOpen(appointment) {
    console.log('Confirmation modal opened for appointment:', appointment.type);
}

function trackConfirmationModalClose() {
    console.log('Confirmation modal closed');
}

function trackAppointmentConfirmation(appointment) {
    console.log('Appointment confirmed:', appointment.confirmationId);
}

function trackCalendarIntegration(provider) {
    console.log('Calendar integration used:', provider);
}

// Show notification helper
function showNotification(message, type = 'info') {
    // Use existing notification system if available
    if (window.showNotification) {
        window.showNotification(message, type);
        return;
    }
    
    // Fallback notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1002;
        padding: 16px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Export functions for global use
window.AppointmentConfirmation = {
    showAppointmentConfirmation,
    closeConfirmationModal,
    confirmAppointment
};