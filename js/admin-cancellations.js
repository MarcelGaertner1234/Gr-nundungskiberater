/**
 * Admin Cancellation Management
 * Shows cancellation statistics and history
 */

// Initialize admin cancellation management
function initializeAdminCancellations() {
    loadCancellationStats();
    loadCancellationHistory();
    setupCancellationFilters();
}

// Load cancellation statistics
function loadCancellationStats() {
    const cancellations = JSON.parse(localStorage.getItem('cancellations') || '[]');
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Calculate statistics
    const totalCancellations = cancellations.length;
    const totalAppointments = appointments.length + totalCancellations;
    const cancellationRate = totalAppointments > 0 ? ((totalCancellations / totalAppointments) * 100).toFixed(1) : 0;
    
    const totalRefunds = cancellations.reduce((sum, c) => sum + (c.refundAmount || 0), 0);
    const refundCount = cancellations.filter(c => c.refundAmount > 0).length;
    
    const thisWeekCancellations = cancellations.filter(c => {
        const cancelDate = new Date(c.cancelledAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return cancelDate >= weekAgo;
    }).length;
    
    // Update UI
    document.getElementById('totalCancellations').textContent = totalCancellations;
    document.getElementById('cancellationRate').textContent = `${cancellationRate}%`;
    document.getElementById('totalRefunds').textContent = `€${totalRefunds}`;
    document.getElementById('thisWeekCancellations').textContent = thisWeekCancellations;
}

// Load cancellation history
function loadCancellationHistory() {
    const cancellations = JSON.parse(localStorage.getItem('cancellations') || '[]');
    const historyContainer = document.getElementById('cancellationHistory');
    
    if (cancellations.length === 0) {
        historyContainer.innerHTML = '<p class="empty-state">Noch keine Stornierungen</p>';
        return;
    }
    
    // Sort by date (newest first)
    const sortedCancellations = cancellations.sort((a, b) => 
        new Date(b.cancelledAt) - new Date(a.cancelledAt)
    );
    
    const historyHTML = sortedCancellations.map(cancellation => {
        const appointment = cancellation.originalAppointment;
        const cancelDate = new Date(cancellation.cancelledAt);
        const appointmentDate = new Date(appointment.date);
        
        return `
            <div class="cancellation-item">
                <div class="cancellation-details">
                    <div class="cancellation-type">${getConsultationName(appointment.type)}</div>
                    <div class="cancellation-meta">
                        <span class="appointment-date">Termin: ${appointmentDate.toLocaleDateString('de-DE')}</span>
                        <span class="cancel-date">Storniert: ${cancelDate.toLocaleDateString('de-DE')}</span>
                    </div>
                    <div class="cancellation-user">
                        <span class="user-name">${appointment.name || 'Unbekannt'}</span>
                        <span class="user-email">${appointment.email || ''}</span>
                    </div>
                    ${cancellation.reason ? `
                        <div class="cancellation-reason-display">
                            <strong>Grund:</strong> ${cancellation.reason}
                        </div>
                    ` : ''}
                </div>
                <div class="cancellation-actions-column">
                    <div class="cancellation-refund ${cancellation.refundAmount > 0 ? 'positive' : 'zero'}">
                        ${cancellation.refundAmount > 0 ? `€${cancellation.refundAmount}` : 'Keine Erstattung'}
                    </div>
                    <div class="cancellation-status">
                        ${cancellation.refundProcessed ? 
                            '<span class="status-success">✓ Erstattet</span>' : 
                            '<span class="status-pending">⏳ Ausstehend</span>'
                        }
                    </div>
                    <div class="cancellation-admin-actions">
                        <button class="admin-action-btn" onclick="viewCancellationDetails('${cancellation.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        ${cancellation.refundAmount > 0 && !cancellation.refundProcessed ? `
                            <button class="admin-action-btn refund-btn" onclick="processRefund('${cancellation.id}')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    historyContainer.innerHTML = historyHTML;
}

// View cancellation details
function viewCancellationDetails(cancellationId) {
    const cancellations = JSON.parse(localStorage.getItem('cancellations') || '[]');
    const cancellation = cancellations.find(c => c.id === cancellationId);
    
    if (!cancellation) {
        alert('Stornierung nicht gefunden');
        return;
    }
    
    const appointment = cancellation.originalAppointment;
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Stornierungsdetails</h2>
                <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h3>Ursprünglicher Termin</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="label">Beratungsart:</span>
                            <span class="value">${getConsultationName(appointment.type)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Datum:</span>
                            <span class="value">${new Date(appointment.date).toLocaleDateString('de-DE')}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Zeit:</span>
                            <span class="value">${appointment.time}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Kunde:</span>
                            <span class="value">${appointment.name || 'Unbekannt'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">E-Mail:</span>
                            <span class="value">${appointment.email || 'Nicht angegeben'}</span>
                        </div>
                        ${appointment.price ? `
                            <div class="detail-item">
                                <span class="label">Bezahlter Betrag:</span>
                                <span class="value">€${appointment.price}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Stornierungsinfo</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="label">Storniert am:</span>
                            <span class="value">${new Date(cancellation.cancelledAt).toLocaleString('de-DE')}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Storniert von:</span>
                            <span class="value">${cancellation.cancelledBy === 'admin' ? 'Administrator' : 'Kunde'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Erstattungsbetrag:</span>
                            <span class="value ${cancellation.refundAmount > 0 ? 'positive' : 'zero'}">
                                ${cancellation.refundAmount > 0 ? `€${cancellation.refundAmount}` : 'Keine Erstattung'}
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Erstattung verarbeitet:</span>
                            <span class="value">${cancellation.refundProcessed ? 'Ja' : 'Nein'}</span>
                        </div>
                    </div>
                    
                    ${cancellation.reason ? `
                        <div class="detail-item full-width">
                            <span class="label">Stornierungsgrund:</span>
                            <div class="reason-text">${cancellation.reason}</div>
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Schließen</button>
                ${cancellation.refundAmount > 0 && !cancellation.refundProcessed ? `
                    <button class="btn btn-primary" onclick="processRefund('${cancellation.id}'); this.closest('.modal').remove();">
                        Erstattung verarbeiten
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Process refund
function processRefund(cancellationId) {
    const cancellations = JSON.parse(localStorage.getItem('cancellations') || '[]');
    const cancellationIndex = cancellations.findIndex(c => c.id === cancellationId);
    
    if (cancellationIndex === -1) {
        alert('Stornierung nicht gefunden');
        return;
    }
    
    const cancellation = cancellations[cancellationIndex];
    
    if (confirm(`Erstattung von €${cancellation.refundAmount} für ${cancellation.originalAppointment.name} verarbeiten?`)) {
        // Mark as processed
        cancellations[cancellationIndex].refundProcessed = true;
        cancellations[cancellationIndex].refundProcessedAt = new Date().toISOString();
        
        localStorage.setItem('cancellations', JSON.stringify(cancellations));
        
        // In production, this would call Stripe API
        console.log('Processing refund:', {
            cancellationId: cancellationId,
            amount: cancellation.refundAmount,
            paymentId: cancellation.originalAppointment.paymentId
        });
        
        alert('Erstattung wurde verarbeitet!');
        
        // Reload data
        loadCancellationStats();
        loadCancellationHistory();
    }
}

// Setup cancellation filters
function setupCancellationFilters() {
    const filterButtons = document.querySelectorAll('.cancellation-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter cancellations
            const filter = button.dataset.filter;
            filterCancellations(filter);
        });
    });
}

// Filter cancellations
function filterCancellations(filter) {
    const cancellations = JSON.parse(localStorage.getItem('cancellations') || '[]');
    let filteredCancellations = cancellations;
    
    switch (filter) {
        case 'with-refund':
            filteredCancellations = cancellations.filter(c => c.refundAmount > 0);
            break;
        case 'no-refund':
            filteredCancellations = cancellations.filter(c => c.refundAmount === 0);
            break;
        case 'pending':
            filteredCancellations = cancellations.filter(c => c.refundAmount > 0 && !c.refundProcessed);
            break;
        case 'processed':
            filteredCancellations = cancellations.filter(c => c.refundProcessed);
            break;
        default:
            // 'all' - no filtering
            break;
    }
    
    displayFilteredCancellations(filteredCancellations);
}

// Display filtered cancellations
function displayFilteredCancellations(cancellations) {
    const historyContainer = document.getElementById('cancellationHistory');
    
    if (cancellations.length === 0) {
        historyContainer.innerHTML = '<p class="empty-state">Keine Stornierungen gefunden</p>';
        return;
    }
    
    // Use the same display logic as loadCancellationHistory but with filtered data
    const sortedCancellations = cancellations.sort((a, b) => 
        new Date(b.cancelledAt) - new Date(a.cancelledAt)
    );
    
    const historyHTML = sortedCancellations.map(cancellation => {
        const appointment = cancellation.originalAppointment;
        const cancelDate = new Date(cancellation.cancelledAt);
        const appointmentDate = new Date(appointment.date);
        
        return `
            <div class="cancellation-item">
                <div class="cancellation-details">
                    <div class="cancellation-type">${getConsultationName(appointment.type)}</div>
                    <div class="cancellation-meta">
                        <span class="appointment-date">Termin: ${appointmentDate.toLocaleDateString('de-DE')}</span>
                        <span class="cancel-date">Storniert: ${cancelDate.toLocaleDateString('de-DE')}</span>
                    </div>
                    <div class="cancellation-user">
                        <span class="user-name">${appointment.name || 'Unbekannt'}</span>
                        <span class="user-email">${appointment.email || ''}</span>
                    </div>
                    ${cancellation.reason ? `
                        <div class="cancellation-reason-display">
                            <strong>Grund:</strong> ${cancellation.reason}
                        </div>
                    ` : ''}
                </div>
                <div class="cancellation-actions-column">
                    <div class="cancellation-refund ${cancellation.refundAmount > 0 ? 'positive' : 'zero'}">
                        ${cancellation.refundAmount > 0 ? `€${cancellation.refundAmount}` : 'Keine Erstattung'}
                    </div>
                    <div class="cancellation-status">
                        ${cancellation.refundProcessed ? 
                            '<span class="status-success">✓ Erstattet</span>' : 
                            '<span class="status-pending">⏳ Ausstehend</span>'
                        }
                    </div>
                    <div class="cancellation-admin-actions">
                        <button class="admin-action-btn" onclick="viewCancellationDetails('${cancellation.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        ${cancellation.refundAmount > 0 && !cancellation.refundProcessed ? `
                            <button class="admin-action-btn refund-btn" onclick="processRefund('${cancellation.id}')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    historyContainer.innerHTML = historyHTML;
}

// Utility function
function getConsultationName(type) {
    const names = {
        erstgespraech: 'Kostenloses Erstgespräch',
        businessplan: 'Businessplan-Beratung',
        gruendung: 'Gründungsberatung',
        finanzierung: 'Finanzierungsberatung',
        marketing: 'Marketing-Beratung'
    };
    return names[type] || type;
}

// Export for global use
window.AdminCancellations = {
    initializeAdminCancellations,
    loadCancellationStats,
    loadCancellationHistory,
    viewCancellationDetails,
    processRefund
};