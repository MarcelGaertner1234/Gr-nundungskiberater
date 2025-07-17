/**
 * Contact Page JavaScript
 * Handles contact form submission and interactions
 */

// Initialize contact page
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

// Initialize contact page functionality
function initializeContactPage() {
    setupContactForm();
    setupThemeToggle();
    loadTheme();
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Add real-time validation
    const requiredFields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
    
    // Subject-specific form adjustments
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect) {
        subjectSelect.addEventListener('change', handleSubjectChange);
    }
}

// Handle contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        privacy: formData.get('privacy'),
        newsletter: formData.get('newsletter'),
        submittedAt: new Date().toISOString()
    };
    
    // Validate form
    if (!validateContactForm(contactData)) {
        return;
    }
    
    // Show loading state
    showFormLoading();
    
    // Simulate form submission (in real app, this would go to backend)
    setTimeout(() => {
        processContactSubmission(contactData);
    }, 1500);
}

// Validate contact form
function validateContactForm(data) {
    let isValid = true;
    const errors = [];
    
    // Required fields validation
    if (!data.firstName.trim()) {
        showFieldError('firstName', 'Vorname ist erforderlich');
        isValid = false;
    }
    
    if (!data.lastName.trim()) {
        showFieldError('lastName', 'Nachname ist erforderlich');
        isValid = false;
    }
    
    if (!data.email.trim()) {
        showFieldError('email', 'E-Mail-Adresse ist erforderlich');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showFieldError('email', 'Bitte gebe eine gültige E-Mail-Adresse ein');
        isValid = false;
    }
    
    if (!data.subject) {
        showFieldError('subject', 'Bitte wähle einen Betreff aus');
        isValid = false;
    }
    
    if (!data.message.trim()) {
        showFieldError('message', 'Nachricht ist erforderlich');
        isValid = false;
    } else if (data.message.trim().length < 10) {
        showFieldError('message', 'Die Nachricht sollte mindestens 10 Zeichen lang sein');
        isValid = false;
    }
    
    if (!data.privacy) {
        showFieldError('privacy', 'Du musst der Datenschutzerklärung zustimmen');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    
    // Add error styling
    field.classList.add('error');
    
    // Focus field
    field.focus();
}

// Clear field error
function clearFieldError(event) {
    const field = event.target;
    const formGroup = field.closest('.form-group');
    
    // Remove error message
    const errorDiv = formGroup.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    // Remove error styling
    field.classList.remove('error');
}

// Validate individual field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    if (field.required && !value) {
        showFieldError(field.id, `${field.labels[0].textContent.replace(' *', '')} ist erforderlich`);
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field.id, 'Bitte gebe eine gültige E-Mail-Adresse ein');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle subject change
function handleSubjectChange(event) {
    const subject = event.target.value;
    const messageField = document.getElementById('message');
    
    // Update placeholder based on subject
    const placeholders = {
        'general': 'Beschreibe deine allgemeine Frage...',
        'technical': 'Beschreibe das technische Problem im Detail...',
        'billing': 'Beschreibe deine Frage zur Abrechnung oder zu den Preisen...',
        'consultation': 'Beschreibe dein Gründungsvorhaben und wie wir dir helfen können...',
        'feedback': 'Teile dein Feedback oder deine Verbesserungsvorschläge mit...',
        'partnership': 'Beschreibe deine Kooperationsidee...'
    };
    
    if (placeholders[subject]) {
        messageField.placeholder = placeholders[subject];
    } else {
        messageField.placeholder = 'Beschreibe deine Frage oder dein Anliegen...';
    }
}

// Show form loading state
function showFormLoading() {
    const submitBtn = document.querySelector('.btn-large');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="loading-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" opacity="0.3"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" opacity="1"></path>
        </svg>
        Wird gesendet...
    `;
    
    // Add loading animation
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

// Process contact submission
function processContactSubmission(data) {
    try {
        // Save to localStorage (in real app, this would be sent to backend)
        const existingContacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        existingContacts.push(data);
        localStorage.setItem('contactSubmissions', JSON.stringify(existingContacts));
        
        // Show success message
        showContactSuccess(data);
        
        // Reset form
        resetContactForm();
        
        // Track submission
        trackContactSubmission(data);
        
    } catch (error) {
        console.error('Contact submission error:', error);
        showContactError();
    }
}

// Show contact success
function showContactSuccess(data) {
    const subjectNames = {
        'general': 'Allgemeine Frage',
        'technical': 'Technisches Problem',
        'billing': 'Abrechnung & Preise',
        'consultation': 'Beratungsanfrage',
        'feedback': 'Feedback & Vorschläge',
        'partnership': 'Kooperation'
    };
    
    const subjectName = subjectNames[data.subject] || data.subject;
    
    showNotification(
        `✅ Nachricht erfolgreich gesendet!<br>
        <strong>Betreff:</strong> ${subjectName}<br>
        Wir melden uns innerhalb von 24 Stunden bei dir.`,
        'success'
    );
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show contact error
function showContactError() {
    const submitBtn = document.querySelector('.btn-large');
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        Nachricht senden
    `;
    
    showNotification(
        'Fehler beim Senden der Nachricht. Bitte versuche es später erneut oder kontaktiere uns direkt per E-Mail.',
        'error'
    );
}

// Reset contact form
function resetContactForm() {
    const form = document.getElementById('contactForm');
    form.reset();
    
    // Reset submit button
    const submitBtn = document.querySelector('.btn-large');
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        Nachricht senden
    `;
    
    // Clear all errors
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

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
    
    if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
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
    
    // Add notification styles
    const styles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
        }
        .notification.success {
            background: #10b981;
            color: white;
        }
        .notification.error {
            background: #ef4444;
            color: white;
        }
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        .notification-close {
            background: none;
            border: none;
            color: currentColor;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
        .field-error {
            color: #ef4444;
            font-size: 14px;
            margin-top: 4px;
        }
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #ef4444;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Track contact submission
function trackContactSubmission(data) {
    console.log('Contact submission tracked:', {
        subject: data.subject,
        timestamp: data.submittedAt
    });
    // In real app, send to analytics
}