/**
 * Cancellation System
 * Handles appointment cancellations and refunds
 */

// Cancellation policies (in hours before appointment)
const CANCELLATION_POLICIES = {
    erstgespraech: {
        freeUntil: 24,  // 24 hours before = free cancellation
        refundUntil: 2, // 2 hours before = last possible cancellation
        refundPercentage: 0 // No refund for free consultation
    },
    businessplan: {
        freeUntil: 48,  // 48 hours before = free cancellation
        refundUntil: 24, // 24 hours before = 50% refund
        refundPercentage: 50
    },
    gruendung: {
        freeUntil: 48,
        refundUntil: 24,
        refundPercentage: 50
    },
    finanzierung: {
        freeUntil: 48,
        refundUntil: 24,
        refundPercentage: 50
    },
    marketing: {
        freeUntil: 48,
        refundUntil: 24,
        refundPercentage: 50
    }
};

// Initialize cancellation system
function initializeCancellationSystem() {
    // Add cancellation buttons to appointments
    addCancellationButtons();
    
    // Check for expired cancellation windows
    checkCancellationWindows();
}

// Add cancellation buttons to appointments
function addCancellationButtons() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    appointments.forEach((appointment, index) => {
        const appointmentElement = document.querySelector(`[data-appointment-id="${appointment.id}"]`);
        if (appointmentElement) {
            const cancellationInfo = getCancellationInfo(appointment);
            
            if (cancellationInfo.canCancel) {
                addCancellationButton(appointmentElement, appointment, index);
            } else {
                addCancellationInfoText(appointmentElement, cancellationInfo);
            }
        }
    });
}

// Get cancellation information for an appointment
function getCancellationInfo(appointment) {
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    const now = new Date();
    const hoursUntilAppointment = (appointmentDateTime - now) / (1000 * 60 * 60);
    
    const policy = CANCELLATION_POLICIES[appointment.type] || CANCELLATION_POLICIES.businessplan;
    
    let canCancel = false;
    let refundAmount = 0;
    let message = '';
    
    if (hoursUntilAppointment > policy.freeUntil) {
        canCancel = true;
        refundAmount = appointment.price || 0;
        message = t('cancellation.free_cancellation');
    } else if (hoursUntilAppointment > policy.refundUntil) {
        canCancel = true;
        refundAmount = (appointment.price || 0) * (policy.refundPercentage / 100);
        message = t('cancellation.partial_refund', { percentage: policy.refundPercentage });
    } else if (hoursUntilAppointment > 0) {
        canCancel = false;
        message = t('cancellation.no_refund');
    } else {
        canCancel = false;
        message = t('cancellation.appointment_passed');
    }
    
    return {
        canCancel,
        refundAmount,
        message,
        hoursUntilAppointment: Math.floor(hoursUntilAppointment)
    };
}

// Add cancellation button to appointment element
function addCancellationButton(element, appointment, index) {
    const actionsContainer = element.querySelector('.appointment-actions') || createActionsContainer(element);
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'cancel-button';
    cancelButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        ${t('cancellation.cancel_appointment')}
    `;
    
    cancelButton.addEventListener('click', () => {
        showCancellationModal(appointment, index);
    });
    
    actionsContainer.appendChild(cancelButton);
}

// Create actions container if it doesn't exist
function createActionsContainer(element) {
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'appointment-actions';
    element.appendChild(actionsContainer);
    return actionsContainer;
}

// Add cancellation info text
function addCancellationInfoText(element, cancellationInfo) {
    const infoElement = document.createElement('div');
    infoElement.className = 'cancellation-info';
    infoElement.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        ${cancellationInfo.message}
    `;
    
    element.appendChild(infoElement);
}

// Show cancellation modal
function showCancellationModal(appointment, appointmentIndex) {
    const cancellationInfo = getCancellationInfo(appointment);
    
    const modal = document.createElement('div');
    modal.className = 'modal cancellation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${t('cancellation.modal.title')}</h2>
                <button class="modal-close" onclick="closeCancellationModal()">×</button>
            </div>
            <div class="modal-body">
                <div class="cancellation-appointment-info">
                    <h3>${t('cancellation.modal.appointment_details')}</h3>
                    <div class="appointment-detail">
                        <span class="label">${t('cancellation.modal.type')}:</span>
                        <span class="value">${getConsultationName(appointment.type)}</span>
                    </div>
                    <div class="appointment-detail">
                        <span class="label">${t('cancellation.modal.date')}:</span>
                        <span class="value">${formatDate(appointment.date)}</span>
                    </div>
                    <div class="appointment-detail">
                        <span class="label">${t('cancellation.modal.time')}:</span>
                        <span class="value">${appointment.time}</span>
                    </div>
                    ${appointment.price ? `
                        <div class="appointment-detail">
                            <span class="label">${t('cancellation.modal.paid_amount')}:</span>
                            <span class="value">€${appointment.price}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="cancellation-policy-info">
                    <h3>${t('cancellation.modal.refund_info')}</h3>
                    <div class="refund-amount ${cancellationInfo.refundAmount > 0 ? 'positive' : 'zero'}">
                        ${cancellationInfo.refundAmount > 0 ? 
                            `€${cancellationInfo.refundAmount} ${t('cancellation.modal.will_be_refunded')}` :
                            t('cancellation.modal.no_refund_amount')
                        }
                    </div>
                    <p class="cancellation-note">${cancellationInfo.message}</p>
                </div>
                
                <div class="cancellation-reason">
                    <h3>${t('cancellation.modal.reason_optional')}</h3>
                    <textarea 
                        id="cancellationReason" 
                        placeholder="${t('cancellation.modal.reason_placeholder')}" 
                        rows="3"
                    ></textarea>
                </div>
                
                <div class="cancellation-warning">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <p>${t('cancellation.modal.warning')}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeCancellationModal()">
                    ${t('cancellation.modal.keep_appointment')}
                </button>
                <button class="btn btn-danger" onclick="confirmCancellation(${appointmentIndex})">
                    ${t('cancellation.modal.confirm_cancellation')}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Store modal reference
    window.currentCancellationModal = modal;
}

// Close cancellation modal
function closeCancellationModal() {
    if (window.currentCancellationModal) {
        window.currentCancellationModal.remove();
        window.currentCancellationModal = null;
    }
}

// Confirm cancellation
async function confirmCancellation(appointmentIndex) {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const appointment = appointments[appointmentIndex];
    
    if (!appointment) {
        alert(t('cancellation.error.appointment_not_found'));
        return;
    }
    
    const reason = document.getElementById('cancellationReason').value;
    const cancellationInfo = getCancellationInfo(appointment);
    
    // Show loading state
    const confirmButton = document.querySelector('.modal-footer .btn-danger');
    confirmButton.textContent = t('cancellation.processing');
    confirmButton.disabled = true;
    
    try {
        // Process cancellation
        const cancellationResult = await processCancellation(appointment, reason, cancellationInfo);
        
        if (cancellationResult.success) {
            // Remove appointment from storage
            appointments.splice(appointmentIndex, 1);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            
            // Store cancellation record
            storeCancellationRecord(appointment, reason, cancellationInfo);
            
            // Show success message
            showCancellationSuccess(cancellationResult);
            
            // Close modal
            closeCancellationModal();
            
            // Refresh appointments display
            if (window.loadAppointments) {
                window.loadAppointments();
            }
        } else {
            throw new Error(cancellationResult.error || 'Cancellation failed');
        }
    } catch (error) {
        console.error('Cancellation error:', error);
        alert(t('cancellation.error.processing_failed'));
        
        // Reset button
        confirmButton.textContent = t('cancellation.modal.confirm_cancellation');
        confirmButton.disabled = false;
    }
}

// Process cancellation (with backend integration)
async function processCancellation(appointment, reason, cancellationInfo) {
    // Simulate API call (in production, this would call your backend)
    return new Promise((resolve) => {
        setTimeout(() => {
            if (cancellationInfo.refundAmount > 0) {
                // Process refund
                processRefund(appointment, cancellationInfo.refundAmount);
            }
            
            // Send cancellation emails
            sendCancellationEmails(appointment, reason);
            
            resolve({
                success: true,
                refundAmount: cancellationInfo.refundAmount,
                refundId: `ref_${Date.now()}`
            });
        }, 2000);
    });
}

// Process refund (placeholder for Stripe integration)
async function processRefund(appointment, refundAmount) {
    // In production, this would use Stripe API
    console.log('Processing refund:', {
        appointmentId: appointment.id,
        refundAmount: refundAmount,
        originalPayment: appointment.paymentId
    });
    
    // Example Stripe refund call:
    /*
    if (appointment.paymentId) {
        const refund = await stripe.refunds.create({
            payment_intent: appointment.paymentId,
            amount: refundAmount * 100, // Convert to cents
            reason: 'requested_by_customer'
        });
        return refund;
    }
    */
}

// Send cancellation emails
function sendCancellationEmails(appointment, reason) {
    // In production, this would trigger email notifications
    console.log('Sending cancellation emails:', {
        to: appointment.email,
        appointment: appointment,
        reason: reason
    });
}

// Store cancellation record
function storeCancellationRecord(appointment, reason, cancellationInfo) {
    const cancellations = JSON.parse(localStorage.getItem('cancellations') || '[]');
    
    const cancellationRecord = {
        id: `cancel_${Date.now()}`,
        appointmentId: appointment.id,
        originalAppointment: appointment,
        reason: reason,
        cancelledAt: new Date().toISOString(),
        refundAmount: cancellationInfo.refundAmount,
        refundProcessed: cancellationInfo.refundAmount > 0,
        cancelledBy: 'user' // or 'admin'
    };
    
    cancellations.push(cancellationRecord);
    localStorage.setItem('cancellations', JSON.stringify(cancellations));
}

// Show cancellation success message
function showCancellationSuccess(result) {
    const message = result.refundAmount > 0 ? 
        t('cancellation.success.with_refund', { amount: result.refundAmount }) :
        t('cancellation.success.no_refund');
    
    // Show success notification
    showNotification(message, 'success');
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

// Utility functions
function getConsultationName(type) {
    const names = {
        erstgespraech: t('consultation.types.erstgespraech'),
        businessplan: t('consultation.types.businessplan'),
        gruendung: t('consultation.types.gruendung'),
        finanzierung: t('consultation.types.finanzierung'),
        marketing: t('consultation.types.marketing')
    };
    return names[type] || type;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function checkCancellationWindows() {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const now = new Date();
    
    appointments.forEach(appointment => {
        const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
        const hoursUntilAppointment = (appointmentDateTime - now) / (1000 * 60 * 60);
        
        // Send reminders about cancellation deadlines
        if (hoursUntilAppointment > 0 && hoursUntilAppointment < 48) {
            const policy = CANCELLATION_POLICIES[appointment.type];
            if (policy && hoursUntilAppointment <= policy.freeUntil && hoursUntilAppointment > policy.refundUntil) {
                // Show warning about approaching cancellation deadline
                console.log(`Cancellation deadline approaching for appointment ${appointment.id}`);
            }
        }
    });
}

// Export functions for global use
window.CancellationSystem = {
    initializeCancellationSystem,
    showCancellationModal,
    closeCancellationModal,
    confirmCancellation,
    getCancellationInfo
};