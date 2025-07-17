// Error Handling System - Comprehensive error management for the entire application

// Global error state
const errorState = {
    toasts: [],
    logs: [],
    retryQueue: [],
    modalActive: false
};

// Error types configuration
const errorTypes = {
    'network': {
        icon: '🌐',
        title: 'Netzwerkfehler',
        defaultMessage: 'Verbindung zum Server konnte nicht hergestellt werden.'
    },
    'validation': {
        icon: '⚠️',
        title: 'Validierungsfehler',
        defaultMessage: 'Bitte überprüfen Sie Ihre Eingaben.'
    },
    'authentication': {
        icon: '🔒',
        title: 'Authentifizierungsfehler',
        defaultMessage: 'Bitte melden Sie sich erneut an.'
    },
    'permission': {
        icon: '🚫',
        title: 'Zugriff verweigert',
        defaultMessage: 'Sie haben keine Berechtigung für diese Aktion.'
    },
    'server': {
        icon: '🖥️',
        title: 'Serverfehler',
        defaultMessage: 'Ein interner Fehler ist aufgetreten.'
    },
    'client': {
        icon: '⚡',
        title: 'Anwendungsfehler',
        defaultMessage: 'Ein unerwarteter Fehler ist aufgetreten.'
    },
    'timeout': {
        icon: '⏱️',
        title: 'Zeitüberschreitung',
        defaultMessage: 'Die Anfrage hat zu lange gedauert.'
    },
    'offline': {
        icon: '📡',
        title: 'Offline',
        defaultMessage: 'Sie sind derzeit offline.'
    }
};

// Initialize error handling system
function initializeErrorHandling() {
    console.log('Initializing Error Handling System...');
    
    // Create toast container
    createToastContainer();
    
    // Set up global error listeners
    setupGlobalErrorListeners();
    
    // Set up network monitoring
    setupNetworkMonitoring();
    
    // Set up retry mechanism
    setupRetryMechanism();
    
    console.log('Error Handling System initialized');
}

// Create toast container
function createToastContainer() {
    const existingContainer = document.getElementById('errorToastContainer');
    if (existingContainer) return;
    
    const container = document.createElement('div');
    container.className = 'error-toast-container';
    container.id = 'errorToastContainer';
    document.body.appendChild(container);
}

// Set up global error listeners
function setupGlobalErrorListeners() {
    // Window error event
    window.addEventListener('error', function(event) {
        console.error('Global error:', event.error);
        handleError({
            type: 'client',
            message: event.message,
            stack: event.error?.stack,
            file: event.filename,
            line: event.lineno,
            column: event.colno
        });
    });
    
    // Unhandled promise rejection
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        handleError({
            type: 'client',
            message: 'Unbehandelte Promise-Ablehnung',
            details: event.reason
        });
    });
    
    // Network errors
    window.addEventListener('offline', function() {
        showToast('warning', 'Offline', 'Sie sind derzeit offline. Einige Funktionen sind möglicherweise nicht verfügbar.');
    });
    
    window.addEventListener('online', function() {
        showToast('success', 'Online', 'Verbindung wiederhergestellt.');
        processRetryQueue();
    });
}

// Set up network monitoring
function setupNetworkMonitoring() {
    // Override fetch to catch network errors
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        try {
            const response = await originalFetch(...args);
            
            // Check for HTTP errors
            if (!response.ok) {
                handleHTTPError(response);
            }
            
            return response;
        } catch (error) {
            handleNetworkError(error, ...args);
            throw error;
        }
    };
    
    // Override XMLHttpRequest for legacy code
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(...args) {
        this.addEventListener('error', function() {
            handleError({
                type: 'network',
                message: 'XMLHttpRequest fehlgeschlagen',
                url: args[1]
            });
        });
        
        this.addEventListener('timeout', function() {
            handleError({
                type: 'timeout',
                message: 'XMLHttpRequest Zeitüberschreitung',
                url: args[1]
            });
        });
        
        return originalXHROpen.apply(this, args);
    };
}

// Handle HTTP errors
function handleHTTPError(response) {
    const statusHandlers = {
        400: () => handleError({ type: 'validation', message: 'Ungültige Anfrage' }),
        401: () => handleError({ type: 'authentication', message: 'Nicht authentifiziert' }),
        403: () => handleError({ type: 'permission', message: 'Zugriff verweigert' }),
        404: () => handleError({ type: 'client', message: 'Ressource nicht gefunden' }),
        500: () => handleError({ type: 'server', message: 'Interner Serverfehler' }),
        502: () => handleError({ type: 'server', message: 'Bad Gateway' }),
        503: () => handleError({ type: 'server', message: 'Service nicht verfügbar' })
    };
    
    const handler = statusHandlers[response.status];
    if (handler) {
        handler();
    } else if (response.status >= 400) {
        handleError({
            type: 'server',
            message: `HTTP ${response.status} Fehler`,
            details: response.statusText
        });
    }
}

// Handle network errors
function handleNetworkError(error, url, options) {
    if (!navigator.onLine) {
        handleError({
            type: 'offline',
            message: 'Keine Internetverbindung'
        });
        
        // Add to retry queue
        addToRetryQueue({ url, options });
    } else {
        handleError({
            type: 'network',
            message: 'Netzwerkfehler aufgetreten',
            details: error.message
        });
    }
}

// Main error handler
function handleError(errorInfo) {
    const error = {
        ...errorInfo,
        timestamp: new Date().toISOString(),
        id: generateErrorId()
    };
    
    // Log error
    logError(error);
    
    // Show appropriate UI based on error type
    switch (error.type) {
        case 'validation':
            showValidationError(error);
            break;
        case 'authentication':
            showAuthenticationError(error);
            break;
        case 'permission':
            showPermissionError(error);
            break;
        case 'offline':
            showOfflineError(error);
            break;
        default:
            showGenericError(error);
    }
    
    // Track error for analytics
    trackError(error);
}

// Show toast notification
function showToast(type, title, message, actions = []) {
    const toastId = generateErrorId();
    const toast = {
        id: toastId,
        type,
        title,
        message,
        actions,
        timestamp: new Date()
    };
    
    errorState.toasts.push(toast);
    
    const container = document.getElementById('errorToastContainer');
    if (!container) return;
    
    const toastElement = document.createElement('div');
    toastElement.className = `error-toast ${type}`;
    toastElement.id = `toast-${toastId}`;
    
    const iconMap = {
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
        success: '✅'
    };
    
    toastElement.innerHTML = `
        <div class="error-toast-icon">${iconMap[type]}</div>
        <div class="error-toast-content">
            <div class="error-toast-title">${title}</div>
            <div class="error-toast-message">${message}</div>
            ${actions.length > 0 ? `
                <div class="error-toast-actions">
                    ${actions.map(action => `
                        <button class="error-toast-action" onclick="${action.handler}">
                            ${action.label}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
        <button class="error-toast-close" onclick="ErrorHandling.dismissToast('${toastId}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    
    container.appendChild(toastElement);
    
    // Auto dismiss after 5 seconds (except errors)
    if (type !== 'error') {
        setTimeout(() => dismissToast(toastId), 5000);
    }
    
    return toastId;
}

// Dismiss toast
function dismissToast(toastId) {
    const toast = document.getElementById(`toast-${toastId}`);
    if (toast) {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
            errorState.toasts = errorState.toasts.filter(t => t.id !== toastId);
        }, 300);
    }
}

// Show error modal
function showErrorModal(type, title, message, details = null) {
    if (errorState.modalActive) return;
    
    errorState.modalActive = true;
    
    const modal = document.createElement('div');
    modal.className = 'error-modal';
    modal.id = 'errorModal';
    
    const iconMap = {
        error: '❌',
        warning: '⚠️'
    };
    
    modal.innerHTML = `
        <div class="error-modal-content">
            <div class="error-modal-header">
                <div class="error-modal-icon ${type}">${iconMap[type] || '❌'}</div>
                <h2 class="error-modal-title">${title}</h2>
            </div>
            <div class="error-modal-body">
                <div class="error-modal-message">${message}</div>
                ${details ? `
                    <div class="error-modal-details">
                        <div class="error-modal-details-title">Technische Details</div>
                        <div class="error-modal-code">${details}</div>
                    </div>
                ` : ''}
                ${type === 'error' ? `
                    <div class="error-modal-details">
                        <div class="error-modal-details-title">Was können Sie tun?</div>
                        <ul>
                            <li>Versuchen Sie die Seite neu zu laden</li>
                            <li>Überprüfen Sie Ihre Internetverbindung</li>
                            <li>Kontaktieren Sie den Support, wenn das Problem weiterhin besteht</li>
                        </ul>
                    </div>
                ` : ''}
            </div>
            <div class="error-modal-footer">
                <button class="btn btn-secondary" onclick="ErrorHandling.closeErrorModal()">Schließen</button>
                <button class="btn btn-primary" onclick="ErrorHandling.reloadPage()">Seite neu laden</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Close error modal
function closeErrorModal() {
    const modal = document.getElementById('errorModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            errorState.modalActive = false;
        }, 300);
    }
}

// Show validation errors
function showValidationError(error) {
    showToast('error', 'Validierungsfehler', error.message || 'Bitte überprüfen Sie Ihre Eingaben.');
}

// Show authentication error
function showAuthenticationError(error) {
    showToast('error', 'Authentifizierung erforderlich', error.message || 'Bitte melden Sie sich erneut an.', [
        {
            label: 'Zur Anmeldung',
            handler: 'window.location.href="login.html"'
        }
    ]);
}

// Show permission error
function showPermissionError(error) {
    showToast('error', 'Zugriff verweigert', error.message || 'Sie haben keine Berechtigung für diese Aktion.');
}

// Show offline error
function showOfflineError(error) {
    showToast('warning', 'Offline', error.message || 'Sie sind derzeit offline.', [
        {
            label: 'Erneut versuchen',
            handler: 'ErrorHandling.retryLastAction()'
        }
    ]);
}

// Show generic error
function showGenericError(error) {
    const errorType = errorTypes[error.type] || errorTypes['client'];
    showToast('error', errorType.title, error.message || errorType.defaultMessage);
}

// Form validation
function validateForm(formElement) {
    const errors = [];
    const inputs = formElement.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Remove previous error states
        input.classList.remove('error');
        const errorMessage = input.parentElement.querySelector('.error-field-message');
        if (errorMessage) errorMessage.remove();
        
        // Check required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            errors.push({
                field: input,
                message: 'Dieses Feld ist erforderlich'
            });
        }
        
        // Check email format
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                errors.push({
                    field: input,
                    message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
                });
            }
        }
        
        // Check min length
        if (input.hasAttribute('minlength')) {
            const minLength = parseInt(input.getAttribute('minlength'));
            if (input.value.length < minLength) {
                errors.push({
                    field: input,
                    message: `Mindestens ${minLength} Zeichen erforderlich`
                });
            }
        }
        
        // Check pattern
        if (input.hasAttribute('pattern')) {
            const pattern = new RegExp(input.getAttribute('pattern'));
            if (!pattern.test(input.value)) {
                errors.push({
                    field: input,
                    message: input.getAttribute('data-pattern-error') || 'Ungültiges Format'
                });
            }
        }
    });
    
    // Show field errors
    errors.forEach(error => {
        error.field.classList.add('error');
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-field-message';
        errorMessage.innerHTML = `
            <span class="error-field-message-icon">⚠️</span>
            <span>${error.message}</span>
        `;
        error.field.parentElement.appendChild(errorMessage);
    });
    
    if (errors.length > 0) {
        // Shake the first error field
        errors[0].field.classList.add('error-shake');
        setTimeout(() => {
            errors[0].field.classList.remove('error-shake');
        }, 500);
        
        // Focus first error field
        errors[0].field.focus();
        
        // Show toast
        showToast('error', 'Formularfehler', `${errors.length} Feld${errors.length > 1 ? 'er' : ''} benötigt${errors.length > 1 ? 'en' : ''} Ihre Aufmerksamkeit`);
    }
    
    return errors.length === 0;
}

// Retry mechanism
function setupRetryMechanism() {
    // Process retry queue every 30 seconds when online
    setInterval(() => {
        if (navigator.onLine && errorState.retryQueue.length > 0) {
            processRetryQueue();
        }
    }, 30000);
}

// Add to retry queue
function addToRetryQueue(request) {
    errorState.retryQueue.push({
        ...request,
        timestamp: new Date(),
        attempts: 0
    });
    
    // Show notification
    showToast('info', 'Warteschlange', 'Aktion wird ausgeführt, sobald die Verbindung wiederhergestellt ist.');
}

// Process retry queue
async function processRetryQueue() {
    if (errorState.retryQueue.length === 0) return;
    
    console.log('Processing retry queue...', errorState.retryQueue.length, 'items');
    
    const queue = [...errorState.retryQueue];
    errorState.retryQueue = [];
    
    for (const request of queue) {
        try {
            await fetch(request.url, request.options);
            showToast('success', 'Erfolgreich', 'Ausstehende Aktion wurde erfolgreich ausgeführt.');
        } catch (error) {
            request.attempts++;
            
            if (request.attempts < 3) {
                // Re-add to queue
                errorState.retryQueue.push(request);
            } else {
                // Give up after 3 attempts
                showToast('error', 'Fehlgeschlagen', 'Ausstehende Aktion konnte nicht ausgeführt werden.');
            }
        }
    }
}

// Show loading overlay
function showLoadingOverlay(message = 'Laden...') {
    const overlay = document.createElement('div');
    overlay.className = 'error-loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = `
        <div class="error-loading-spinner"></div>
        <div style="margin-top: 16px; color: var(--color-text-medium);">${message}</div>
    `;
    
    const container = document.querySelector('.modal-content, .admin-card, .card, main') || document.body;
    container.style.position = 'relative';
    container.appendChild(overlay);
}

// Hide loading overlay
function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Show empty state
function showEmptyState(container, title, message, actions = []) {
    container.innerHTML = `
        <div class="error-empty-state">
            <div class="error-empty-state-icon">📭</div>
            <div class="error-empty-state-title">${title}</div>
            <div class="error-empty-state-message">${message}</div>
            ${actions.length > 0 ? `
                <div class="error-empty-state-actions">
                    ${actions.map(action => `
                        <button class="btn ${action.primary ? 'btn-primary' : 'btn-secondary'}" onclick="${action.handler}">
                            ${action.label}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

// Show inline error message
function showInlineError(container, message, type = 'error') {
    const error = document.createElement('div');
    error.className = `error-inline ${type}`;
    error.innerHTML = `
        <span class="error-inline-icon">${type === 'error' ? '❌' : '⚠️'}</span>
        <div class="error-inline-content">${message}</div>
    `;
    
    container.insertBefore(error, container.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        error.remove();
    }, 5000);
}

// Log error
function logError(error) {
    errorState.logs.push(error);
    
    // Keep only last 100 logs
    if (errorState.logs.length > 100) {
        errorState.logs.shift();
    }
    
    // Log to console in development
    if (window.location.hostname === 'localhost') {
        console.error('Error logged:', error);
    }
}

// Track error for analytics
function trackError(error) {
    // In production, send to analytics service
    if (window.gtag) {
        window.gtag('event', 'exception', {
            description: error.message,
            fatal: error.type === 'error'
        });
    }
}

// Generate unique error ID
function generateErrorId() {
    return `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Reload page
function reloadPage() {
    window.location.reload();
}

// Retry last action
function retryLastAction() {
    processRetryQueue();
}

// Get error logs
function getErrorLogs() {
    return errorState.logs;
}

// Clear error logs
function clearErrorLogs() {
    errorState.logs = [];
}

// Export error logs
function exportErrorLogs() {
    const logs = getErrorLogs();
    const content = JSON.stringify(logs, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-logs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Global error handling API
window.ErrorHandling = {
    initialize: initializeErrorHandling,
    handleError,
    showToast,
    dismissToast,
    showErrorModal,
    closeErrorModal,
    validateForm,
    showLoadingOverlay,
    hideLoadingOverlay,
    showEmptyState,
    showInlineError,
    getErrorLogs,
    clearErrorLogs,
    exportErrorLogs,
    reloadPage,
    retryLastAction
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeErrorHandling);
} else {
    initializeErrorHandling();
}

// Example usage for form validation
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.dataset.validate === 'true') {
        e.preventDefault();
        
        if (ErrorHandling.validateForm(form)) {
            // Form is valid, proceed with submission
            console.log('Form is valid, submitting...');
            // Add your form submission logic here
        }
    }
});