/**
 * Global i18n Helper für alle JavaScript-Dateien
 * Überschreibt globale Funktionen um automatisch i18n zu verwenden
 */

// Store original functions
const originalAlert = window.alert;
const originalConfirm = window.confirm;

// i18n-Alert Wrapper
window.alertI18n = function(key, fallback) {
    const translation = getI18nTranslation(key) || fallback || key;
    return originalAlert(translation);
};

// i18n-Confirm Wrapper  
window.confirmI18n = function(key, fallback) {
    const translation = getI18nTranslation(key) || fallback || key;
    return originalConfirm(translation);
};

// Helper function to get translation from any available i18n system
function getI18nTranslation(key) {
    // Try different i18n systems based on current page
    if (window.adminT) {
        return window.adminT(key);
    }
    if (window.dashboardT) {
        return window.dashboardT(key);
    }
    if (window.pricingT) {
        return window.pricingT(key);
    }
    if (window.i18n && window.i18n.t) {
        return window.i18n.t(key);
    }
    return null;
}

// Dynamic content helper
window.setI18nContent = function(element, key, fallback) {
    if (typeof element === 'string') {
        element = document.querySelector(element) || document.getElementById(element);
    }
    
    if (element) {
        const translation = getI18nTranslation(key) || fallback || key;
        element.textContent = translation;
    }
};

// Dynamic HTML content helper
window.setI18nHTML = function(element, key, fallback) {
    if (typeof element === 'string') {
        element = document.querySelector(element) || document.getElementById(element);
    }
    
    if (element) {
        const translation = getI18nTranslation(key) || fallback || key;
        element.innerHTML = translation;
    }
};

// Placeholder helper
window.setI18nPlaceholder = function(element, key, fallback) {
    if (typeof element === 'string') {
        element = document.querySelector(element) || document.getElementById(element);
    }
    
    if (element && element.placeholder !== undefined) {
        const translation = getI18nTranslation(key) || fallback || key;
        element.placeholder = translation;
    }
};

// Title/Tooltip helper
window.setI18nTitle = function(element, key, fallback) {
    if (typeof element === 'string') {
        element = document.querySelector(element) || document.getElementById(element);
    }
    
    if (element) {
        const translation = getI18nTranslation(key) || fallback || key;
        element.title = translation;
    }
};

// Empty state helper
window.getI18nEmptyState = function(key, fallback) {
    const translation = getI18nTranslation(key) || fallback || 'No data available';
    return `<div class="empty-state">${translation}</div>`;
};

// Progress message helper  
window.getI18nProgressMessage = function(step) {
    const progressKeys = {
        0: 'progress_messages.start_journey',
        1: 'progress_messages.good_start', 
        2: 'progress_messages.making_progress',
        3: 'progress_messages.halfway',
        4: 'progress_messages.almost_done',
        5: 'progress_messages.congratulations'
    };
    
    const key = progressKeys[step] || progressKeys[0];
    return getI18nTranslation(key) || 'Progress update';
};

// Button state helper
window.getI18nButtonState = function(state) {
    const stateKeys = {
        'loading': 'dynamic_content.loading',
        'copied': 'dynamic_content.copied',  
        'processing': 'dynamic_content.processing',
        'book_appointment': 'dynamic_content.book_appointment',
        'select_appointment': 'dynamic_content.select_appointment'
    };
    
    const key = stateKeys[state];
    return key ? getI18nTranslation(key) : state;
};

// Auto-apply i18n to all data-i18n attributes on page load
window.autoApplyI18n = function() {
    // Apply text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getI18nTranslation(key);
        if (translation) {
            if (element.hasAttribute('data-i18n-html')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Apply placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getI18nTranslation(key);
        if (translation) {
            element.placeholder = translation;
        }
    });
    
    // Apply titles
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        const translation = getI18nTranslation(key);
        if (translation) {
            element.title = translation;
        }
    });
    
    // Apply alt attributes
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        const translation = getI18nTranslation(key);
        if (translation) {
            element.alt = translation;
        }
    });
};

// Global constants for common translations
window.I18N_KEYS = {
    // Alerts
    ALERTS: {
        PAYMENT_ERROR: 'alerts.pricing.payment_error',
        CONSULTATION_LOCKED: 'alerts.pricing.consultation_locked',
        GENERAL_ERROR: 'alerts.pricing.general_error',
        LOGIN_REQUIRED: 'alerts.pricing.login_required',
        USER_NOT_FOUND: 'alerts.admin.user_not_found',
        CHANGES_SAVED: 'alerts.admin.changes_saved',
        SELECT_APPOINTMENT: 'alerts.service.select_appointment',
        PACKAGE_REQUIRED: 'alerts.service.package_required',
        SELECT_FILES: 'alerts.service.select_files'
    },
    
    // Confirmations
    CONFIRMATIONS: {
        LOGOUT: 'confirmations.logout',
        CANCEL_APPOINTMENT: 'confirmations.cancel_appointment',
        DELETE_FILE: 'confirmations.delete_file',
        DELETE_ALL_FILES: 'confirmations.delete_all_files'
    },
    
    // Empty states
    EMPTY_STATES: {
        NO_APPOINTMENTS: 'empty_states.no_appointments',
        NO_FILES: 'empty_states.no_files',
        NO_USERS: 'empty_states.no_users',
        NO_ACTIVITIES: 'empty_states.no_activities',
        NO_NOTIFICATIONS: 'empty_states.no_notifications'
    },
    
    // Dynamic content
    DYNAMIC: {
        LOADING: 'dynamic_content.loading',
        COPIED: 'dynamic_content.copied',
        PROCESSING: 'dynamic_content.processing',
        BOOK_APPOINTMENT: 'dynamic_content.book_appointment',
        SELECT_APPOINTMENT: 'dynamic_content.select_appointment'
    },
    
    // Placeholders
    PLACEHOLDERS: {
        SEARCH_USERS: 'placeholders.search_users',
        EMAIL: 'placeholders.email',
        ASK_QUESTION: 'placeholders.ask_question',
        SEARCH_GENERAL: 'placeholders.search_general'
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Apply i18n automatically after a small delay to ensure i18n systems are loaded
    setTimeout(window.autoApplyI18n, 100);
});

// Re-apply when language changes
document.addEventListener('languageChanged', function() {
    window.autoApplyI18n();
});

console.log('Global i18n helper loaded - all hardcoded texts can now use i18n system');