// Tooltips & Help Text System - Comprehensive tooltip and help system for the entire application

// Global state
const tooltipState = {
    activeTooltips: [],
    helpPanelOpen: false,
    onboardingActive: false,
    onboardingStep: 0,
    tutorialActive: false
};

// Tooltip content database
const tooltipContent = {
    // Dashboard tooltips
    'dashboard-progress': {
        title: 'Ihr Fortschritt',
        content: 'Hier sehen Sie den aktuellen Stand Ihrer Gründungsreise. Jeder abgeschlossene Schritt bringt Sie näher an Ihr Ziel.',
        type: 'info'
    },
    'funding-check': {
        title: 'Förderungen prüfen',
        content: 'Entdecken Sie passende Förderprogramme für Ihr Vorhaben. Wir analysieren über 3000 Förderprogramme.',
        type: 'info'
    },
    'ai-assistant': {
        title: 'KI-Berater',
        content: 'Ihr persönlicher KI-Assistent steht Ihnen 24/7 zur Verfügung. Stellen Sie Fragen zu allen Gründungsthemen.',
        type: 'info'
    },
    
    // Businessplan tooltips
    'businessplan-template': {
        title: 'Vorlage wählen',
        content: 'Wählen Sie eine branchenspezifische Vorlage oder starten Sie mit einem leeren Businessplan.',
        type: 'info'
    },
    'financial-planning': {
        title: 'Finanzplanung',
        content: 'Erstellen Sie eine detaillierte Finanzplanung für die nächsten 3-5 Jahre. Alle Berechnungen werden automatisch durchgeführt.',
        type: 'info'
    },
    'export-options': {
        title: 'Export-Optionen',
        content: 'Exportieren Sie Ihren Businessplan als PDF, Word oder Excel. Perfekt formatiert für Banken und Investoren.',
        type: 'info'
    },
    
    // Form field tooltips
    'email-format': {
        title: 'E-Mail Format',
        content: 'Bitte geben Sie eine gültige E-Mail-Adresse ein (z.B. name@beispiel.de)',
        type: 'info'
    },
    'password-requirements': {
        title: 'Passwort-Anforderungen',
        content: 'Mindestens 8 Zeichen, ein Großbuchstabe, eine Zahl und ein Sonderzeichen.',
        list: [
            '✓ Mindestens 8 Zeichen',
            '✓ Ein Großbuchstabe',
            '✓ Eine Zahl',
            '✓ Ein Sonderzeichen'
        ],
        type: 'info'
    },
    'company-name': {
        title: 'Firmenname',
        content: 'Der gewählte Name sollte einzigartig sein und Ihre Geschäftsidee widerspiegeln.',
        type: 'info'
    },
    
    // Admin tooltips
    'user-management': {
        title: 'Nutzerverwaltung',
        content: 'Verwalten Sie alle Nutzer, deren Pakete und Berechtigungen zentral.',
        type: 'info'
    },
    'appointment-calendar': {
        title: 'Terminkalender',
        content: 'Alle Beratungstermine auf einen Blick. Klicken Sie auf einen Termin für Details.',
        type: 'info'
    },
    'communication-center': {
        title: 'Kommunikation',
        content: 'Zentrale Verwaltung aller Nachrichten und Benachrichtigungen.',
        type: 'info'
    }
};

// Help panel content
const helpPanelContent = {
    dashboard: {
        title: 'Dashboard Hilfe',
        sections: [
            {
                title: 'Erste Schritte',
                items: [
                    { label: 'Profil vervollständigen', link: '#profile' },
                    { label: 'Businessplan starten', link: '#businessplan' },
                    { label: 'Beratungstermin buchen', link: '#appointments' }
                ]
            },
            {
                title: 'Häufige Fragen',
                items: [
                    { label: 'Wie erstelle ich einen Businessplan?', link: '#faq-businessplan' },
                    { label: 'Welche Förderungen gibt es?', link: '#faq-funding' },
                    { label: 'Wie funktioniert die Beratung?', link: '#faq-consulting' }
                ]
            }
        ]
    },
    businessplan: {
        title: 'Businessplan Hilfe',
        sections: [
            {
                title: 'Businessplan erstellen',
                items: [
                    { label: 'Vorlage auswählen', link: '#templates' },
                    { label: 'Inhalte bearbeiten', link: '#editing' },
                    { label: 'Finanzplan erstellen', link: '#financial' }
                ]
            },
            {
                title: 'Export & Teilen',
                items: [
                    { label: 'Als PDF exportieren', link: '#export-pdf' },
                    { label: 'Mit Beratern teilen', link: '#sharing' },
                    { label: 'Versionen verwalten', link: '#versions' }
                ]
            }
        ]
    },
    admin: {
        title: 'Admin Hilfe',
        sections: [
            {
                title: 'Verwaltung',
                items: [
                    { label: 'Nutzer verwalten', link: '#users' },
                    { label: 'Termine koordinieren', link: '#appointments' },
                    { label: 'Berichte erstellen', link: '#reports' }
                ]
            },
            {
                title: 'System',
                items: [
                    { label: 'Einstellungen', link: '#settings' },
                    { label: 'Integrationen', link: '#integrations' },
                    { label: 'Backups', link: '#backups' }
                ]
            }
        ]
    }
};

// Initialize tooltips system
function initializeTooltips() {
    console.log('Initializing Tooltips & Help System...');
    
    // Create help button
    createHelpButton();
    
    // Create help panel
    createHelpPanel();
    
    // Initialize existing tooltips
    initializeExistingTooltips();
    
    // Set up event listeners
    setupTooltipEventListeners();
    
    // Check for onboarding
    checkOnboarding();
    
    console.log('Tooltips & Help System initialized');
}

// Create help button
function createHelpButton() {
    const existingButton = document.getElementById('helpButton');
    if (existingButton) return;
    
    const button = document.createElement('button');
    button.className = 'help-button';
    button.id = 'helpButton';
    button.innerHTML = '<span class="help-button-icon">?</span>';
    button.setAttribute('aria-label', 'Hilfe öffnen');
    
    document.body.appendChild(button);
}

// Create help panel
function createHelpPanel() {
    const existingPanel = document.getElementById('helpPanel');
    if (existingPanel) return;
    
    const panel = document.createElement('div');
    panel.className = 'help-panel';
    panel.id = 'helpPanel';
    
    const currentPage = detectCurrentPage();
    const content = helpPanelContent[currentPage] || helpPanelContent.dashboard;
    
    panel.innerHTML = `
        <div class="help-panel-header">
            <h3 class="help-panel-title">${content.title}</h3>
            <button class="help-panel-close" id="helpPanelClose">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        
        <div class="help-panel-body">
            <div class="help-panel-search">
                <svg class="help-panel-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" class="help-panel-search-input" placeholder="Hilfe durchsuchen..." id="helpSearchInput">
            </div>
            
            <div id="helpPanelContent">
                ${content.sections.map(section => `
                    <div class="help-panel-section">
                        <div class="help-panel-section-title">${section.title}</div>
                        ${section.items.map(item => `
                            <a href="${item.link}" class="help-panel-item">${item.label}</a>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="help-panel-footer">
            <div class="help-panel-contact">
                Weitere Hilfe benötigt?
            </div>
            <a href="contact.html" class="help-panel-contact-link">Support kontaktieren</a>
        </div>
    `;
    
    document.body.appendChild(panel);
}

// Initialize existing tooltips
function initializeExistingTooltips() {
    // Find all elements with data-tooltip attribute
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipId = element.getAttribute('data-tooltip');
        const position = element.getAttribute('data-tooltip-position') || 'top';
        
        // Add tooltip trigger
        if (!element.querySelector('.tooltip-trigger')) {
            const trigger = document.createElement('span');
            trigger.className = 'tooltip-trigger';
            trigger.innerHTML = '<span class="tooltip-icon">?</span>';
            trigger.setAttribute('data-tooltip-id', tooltipId);
            trigger.setAttribute('data-tooltip-position', position);
            
            element.appendChild(trigger);
        }
    });
}

// Set up event listeners
function setupTooltipEventListeners() {
    // Help button click
    const helpButton = document.getElementById('helpButton');
    if (helpButton) {
        helpButton.addEventListener('click', toggleHelpPanel);
    }
    
    // Help panel close
    const helpPanelClose = document.getElementById('helpPanelClose');
    if (helpPanelClose) {
        helpPanelClose.addEventListener('click', closeHelpPanel);
    }
    
    // Help search
    const helpSearchInput = document.getElementById('helpSearchInput');
    if (helpSearchInput) {
        helpSearchInput.addEventListener('input', handleHelpSearch);
    }
    
    // Tooltip triggers
    document.addEventListener('mouseenter', function(e) {
        if (!e.target || typeof e.target.closest !== 'function') return;
        const trigger = e.target.closest('.tooltip-trigger');
        if (trigger) {
            showTooltip(trigger);
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (!e.target || typeof e.target.closest !== 'function') return;
        const trigger = e.target.closest('.tooltip-trigger');
        if (trigger) {
            hideTooltip(trigger);
        }
    }, true);
    
    // Touch support for mobile
    document.addEventListener('click', function(e) {
        if (!e.target || typeof e.target.closest !== 'function') return;
        const trigger = e.target.closest('.tooltip-trigger');
        if (trigger) {
            e.preventDefault();
            toggleTooltip(trigger);
        }
    });
    
    // Close tooltips on outside click
    document.addEventListener('click', function(e) {
        if (!e.target || typeof e.target.closest !== 'function') return;
        if (!e.target.closest('.tooltip')) {
            hideAllTooltips();
        }
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close tutorial overlay first if active
            if (tooltipState.onboardingActive) {
                skipOnboarding();
            } else {
                hideAllTooltips();
                closeHelpPanel();
            }
        }
        
        if (e.key === 'F1') {
            e.preventDefault();
            toggleHelpPanel();
        }
    });
}

// Create tooltip element
function createTooltip(tooltipId, position = 'top') {
    const content = tooltipContent[tooltipId];
    if (!content) return null;
    
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip-content ${position} ${content.type || ''}`;
    tooltip.id = `tooltip-${tooltipId}`;
    
    let innerHTML = '';
    
    if (content.title) {
        innerHTML += `<div class="tooltip-title">${content.title}</div>`;
    }
    
    if (content.content) {
        innerHTML += `<div class="tooltip-description">${content.content}</div>`;
    }
    
    if (content.list) {
        innerHTML += `
            <ul class="tooltip-list">
                ${content.list.map(item => `
                    <li class="tooltip-list-item">
                        <span class="tooltip-list-icon">✓</span>
                        <span>${item}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    }
    
    if (content.link) {
        innerHTML += `<a href="${content.link.href}" class="tooltip-link">${content.link.text}</a>`;
    }
    
    tooltip.innerHTML = innerHTML;
    
    return tooltip;
}

// Show tooltip
function showTooltip(trigger) {
    const tooltipId = trigger.getAttribute('data-tooltip-id');
    const position = trigger.getAttribute('data-tooltip-position') || 'top';
    
    // Check if tooltip already exists
    let tooltip = document.getElementById(`tooltip-${tooltipId}`);
    if (!tooltip) {
        tooltip = createTooltip(tooltipId, position);
        if (!tooltip) return;
        
        trigger.appendChild(tooltip);
    }
    
    // Position tooltip
    positionTooltip(trigger, tooltip, position);
    
    // Show tooltip
    setTimeout(() => {
        tooltip.classList.add('active');
    }, 10);
    
    // Track active tooltip
    tooltipState.activeTooltips.push(tooltipId);
}

// Hide tooltip
function hideTooltip(trigger) {
    const tooltipId = trigger.getAttribute('data-tooltip-id');
    const tooltip = document.getElementById(`tooltip-${tooltipId}`);
    
    if (tooltip) {
        tooltip.classList.remove('active');
        
        // Remove from active tooltips
        tooltipState.activeTooltips = tooltipState.activeTooltips.filter(id => id !== tooltipId);
    }
}

// Toggle tooltip
function toggleTooltip(trigger) {
    const tooltipId = trigger.getAttribute('data-tooltip-id');
    const tooltip = document.getElementById(`tooltip-${tooltipId}`);
    
    if (tooltip && tooltip.classList.contains('active')) {
        hideTooltip(trigger);
    } else {
        hideAllTooltips();
        showTooltip(trigger);
    }
}

// Hide all tooltips
function hideAllTooltips() {
    const tooltips = document.querySelectorAll('.tooltip-content.active');
    tooltips.forEach(tooltip => {
        tooltip.classList.remove('active');
    });
    tooltipState.activeTooltips = [];
}

// Position tooltip
function positionTooltip(trigger, tooltip, position) {
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Auto-adjust position if tooltip would go off-screen
    let adjustedPosition = position;
    
    if (position === 'top' && triggerRect.top - tooltipRect.height < 0) {
        adjustedPosition = 'bottom';
    } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height > viewportHeight) {
        adjustedPosition = 'top';
    } else if (position === 'left' && triggerRect.left - tooltipRect.width < 0) {
        adjustedPosition = 'right';
    } else if (position === 'right' && triggerRect.right + tooltipRect.width > viewportWidth) {
        adjustedPosition = 'left';
    }
    
    // Update position class if changed
    if (adjustedPosition !== position) {
        tooltip.classList.remove(position);
        tooltip.classList.add(adjustedPosition);
    }
}

// Toggle help panel
function toggleHelpPanel() {
    if (tooltipState.helpPanelOpen) {
        closeHelpPanel();
    } else {
        openHelpPanel();
    }
}

// Open help panel
function openHelpPanel() {
    const panel = document.getElementById('helpPanel');
    const button = document.getElementById('helpButton');
    
    if (panel && button) {
        panel.classList.add('active');
        button.style.display = 'none';
        tooltipState.helpPanelOpen = true;
        
        // Focus search input
        const searchInput = document.getElementById('helpSearchInput');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 300);
        }
    }
}

// Close help panel
function closeHelpPanel() {
    const panel = document.getElementById('helpPanel');
    const button = document.getElementById('helpButton');
    
    if (panel && button) {
        panel.classList.remove('active');
        button.style.display = 'flex';
        tooltipState.helpPanelOpen = false;
    }
}

// Handle help search
function handleHelpSearch(e) {
    const query = e.target.value.toLowerCase();
    const sections = document.querySelectorAll('.help-panel-section');
    
    sections.forEach(section => {
        const items = section.querySelectorAll('.help-panel-item');
        let hasVisibleItems = false;
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'block';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Hide section if no visible items
        section.style.display = hasVisibleItems ? 'block' : 'none';
    });
}

// Detect current page
function detectCurrentPage() {
    const pathname = window.location.pathname;
    
    if (pathname.includes('admin')) {
        return 'admin';
    } else if (pathname.includes('businessplan')) {
        return 'businessplan';
    } else {
        return 'dashboard';
    }
}

// Check onboarding
function checkOnboarding() {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    if (!hasSeenOnboarding) {
        startOnboarding();
    }
}

// Start onboarding
function startOnboarding() {
    tooltipState.onboardingActive = true;
    tooltipState.onboardingStep = 0;
    
    const onboardingSteps = [
        {
            element: '.welcome-title',
            title: 'Willkommen beim KI Konzept Builder!',
            content: 'Lassen Sie uns gemeinsam Ihre Gründungsreise starten.',
            position: 'bottom'
        },
        {
            element: '.action-grid',
            title: 'Schnellzugriff',
            content: 'Hier finden Sie die wichtigsten Funktionen auf einen Blick.',
            position: 'top'
        },
        {
            element: '.progress-card',
            title: 'Ihr Fortschritt',
            content: 'Verfolgen Sie Ihren Fortschritt auf dem Weg zur erfolgreichen Gründung.',
            position: 'bottom'
        },
        {
            element: '#helpButton',
            title: 'Hilfe & Support',
            content: 'Bei Fragen klicken Sie jederzeit auf den Hilfe-Button.',
            position: 'left'
        }
    ];
    
    showOnboardingStep(onboardingSteps[0]);
}

// Show onboarding step
function showOnboardingStep(step) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'tutorial-overlay';
    overlay.id = 'tutorialOverlay';
    
    // Add click handler to overlay for dismissal
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            skipOnboarding();
        }
    });
    
    document.body.appendChild(overlay);
    
    // Highlight element
    const element = document.querySelector(step.element);
    if (element) {
        element.classList.add('tutorial-highlight');
        
        // Create onboarding tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'onboarding-tooltip';
        tooltip.innerHTML = `
            <div class="onboarding-tooltip-header">
                <span class="onboarding-tooltip-step">Schritt ${tooltipState.onboardingStep + 1} von 4</span>
                <button class="help-panel-close" onclick="Tooltips.skipOnboarding()" title="Onboarding beenden">×</button>
            </div>
            <div class="onboarding-tooltip-title">${step.title}</div>
            <div class="onboarding-tooltip-content">${step.content}</div>
            <div class="onboarding-tooltip-actions">
                <div class="onboarding-tooltip-progress">
                    ${[0, 1, 2, 3].map(i => `
                        <div class="onboarding-tooltip-dot ${i === tooltipState.onboardingStep ? 'active' : ''}"></div>
                    `).join('')}
                </div>
                <div class="onboarding-tooltip-buttons">
                    ${tooltipState.onboardingStep > 0 ? '<button class="btn btn-secondary btn-sm" onclick="Tooltips.previousOnboardingStep()">Zurück</button>' : ''}
                    <button class="btn btn-primary btn-sm" onclick="Tooltips.nextOnboardingStep()">
                        ${tooltipState.onboardingStep === 3 ? 'Fertig' : 'Weiter'}
                    </button>
                </div>
            </div>
        `;
        
        // Position tooltip
        positionOnboardingTooltip(element, tooltip, step.position);
        document.body.appendChild(tooltip);
        
        // Prevent clicks on tooltip from closing overlay
        tooltip.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Position onboarding tooltip
function positionOnboardingTooltip(element, tooltip, position) {
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 320; // max-width from CSS
    const tooltipHeight = 200; // estimated height
    const margin = 20;
    
    // Reset all position styles
    tooltip.style.top = '';
    tooltip.style.bottom = '';
    tooltip.style.left = '';
    tooltip.style.right = '';
    tooltip.style.transform = '';
    
    let actualPosition = position;
    
    // Check if position needs adjustment based on available space
    if (position === 'top' && rect.top < tooltipHeight + margin) {
        actualPosition = 'bottom';
    } else if (position === 'bottom' && rect.bottom + tooltipHeight + margin > window.innerHeight) {
        actualPosition = 'top';
    } else if (position === 'left' && rect.left < tooltipWidth + margin) {
        actualPosition = 'right';
    } else if (position === 'right' && rect.right + tooltipWidth + margin > window.innerWidth) {
        actualPosition = 'left';
    }
    
    switch (actualPosition) {
        case 'top':
            tooltip.style.bottom = `${window.innerHeight - rect.top + margin}px`;
            tooltip.style.left = `${Math.max(margin, Math.min(window.innerWidth - tooltipWidth - margin, rect.left + rect.width / 2 - tooltipWidth / 2))}px`;
            break;
        case 'bottom':
            tooltip.style.top = `${rect.bottom + margin}px`;
            tooltip.style.left = `${Math.max(margin, Math.min(window.innerWidth - tooltipWidth - margin, rect.left + rect.width / 2 - tooltipWidth / 2))}px`;
            break;
        case 'left':
            tooltip.style.top = `${Math.max(margin, Math.min(window.innerHeight - tooltipHeight - margin, rect.top + rect.height / 2 - tooltipHeight / 2))}px`;
            tooltip.style.right = `${window.innerWidth - rect.left + margin}px`;
            break;
        case 'right':
            tooltip.style.top = `${Math.max(margin, Math.min(window.innerHeight - tooltipHeight - margin, rect.top + rect.height / 2 - tooltipHeight / 2))}px`;
            tooltip.style.left = `${rect.right + margin}px`;
            break;
    }
}

// Next onboarding step
function nextOnboardingStep() {
    // Clean up current step
    cleanupOnboardingStep();
    
    tooltipState.onboardingStep++;
    
    if (tooltipState.onboardingStep >= 4) {
        completeOnboarding();
    } else {
        // Show next step
        const onboardingSteps = [
            {
                element: '.welcome-title',
                title: 'Willkommen beim KI Konzept Builder!',
                content: 'Lassen Sie uns gemeinsam Ihre Gründungsreise starten.',
                position: 'bottom'
            },
            {
                element: '.action-grid',
                title: 'Schnellzugriff',
                content: 'Hier finden Sie die wichtigsten Funktionen auf einen Blick.',
                position: 'top'
            },
            {
                element: '.progress-card',
                title: 'Ihr Fortschritt',
                content: 'Verfolgen Sie Ihren Fortschritt auf dem Weg zur erfolgreichen Gründung.',
                position: 'bottom'
            },
            {
                element: '#helpButton',
                title: 'Hilfe & Support',
                content: 'Bei Fragen klicken Sie jederzeit auf den Hilfe-Button.',
                position: 'left'
            }
        ];
        
        showOnboardingStep(onboardingSteps[tooltipState.onboardingStep]);
    }
}

// Previous onboarding step
function previousOnboardingStep() {
    cleanupOnboardingStep();
    tooltipState.onboardingStep--;
    
    const onboardingSteps = [
        {
            element: '.welcome-title',
            title: 'Willkommen beim KI Konzept Builder!',
            content: 'Lassen Sie uns gemeinsam Ihre Gründungsreise starten.',
            position: 'bottom'
        },
        {
            element: '.action-grid',
            title: 'Schnellzugriff',
            content: 'Hier finden Sie die wichtigsten Funktionen auf einen Blick.',
            position: 'top'
        },
        {
            element: '.progress-card',
            title: 'Ihr Fortschritt',
            content: 'Verfolgen Sie Ihren Fortschritt auf dem Weg zur erfolgreichen Gründung.',
            position: 'bottom'
        },
        {
            element: '#helpButton',
            title: 'Hilfe & Support',
            content: 'Bei Fragen klicken Sie jederzeit auf den Hilfe-Button.',
            position: 'left'
        }
    ];
    
    showOnboardingStep(onboardingSteps[tooltipState.onboardingStep]);
}

// Clean up onboarding step
function cleanupOnboardingStep() {
    // Remove overlay
    const overlay = document.getElementById('tutorialOverlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Remove highlight
    const highlighted = document.querySelector('.tutorial-highlight');
    if (highlighted) {
        highlighted.classList.remove('tutorial-highlight');
    }
    
    // Remove tooltip
    const tooltip = document.querySelector('.onboarding-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
    
    // Re-enable body scrolling if it was disabled
    document.body.style.overflow = '';
}

// Skip onboarding
function skipOnboarding() {
    cleanupOnboardingStep();
    completeOnboarding();
}

// Complete onboarding
function completeOnboarding() {
    tooltipState.onboardingActive = false;
    localStorage.setItem('hasSeenOnboarding', 'true');
    
    // Show completion message
    if (window.ErrorHandling) {
        window.ErrorHandling.showToast('success', 'Onboarding abgeschlossen', 'Sie können jederzeit auf den Hilfe-Button klicken, um Unterstützung zu erhalten.');
    }
}

// Add tooltip programmatically
function addTooltip(elementSelector, tooltipId, position = 'top') {
    const element = document.querySelector(elementSelector);
    if (!element) return;
    
    element.setAttribute('data-tooltip', tooltipId);
    element.setAttribute('data-tooltip-position', position);
    
    // Initialize tooltip
    const trigger = document.createElement('span');
    trigger.className = 'tooltip-trigger';
    trigger.innerHTML = '<span class="tooltip-icon">?</span>';
    trigger.setAttribute('data-tooltip-id', tooltipId);
    trigger.setAttribute('data-tooltip-position', position);
    
    element.appendChild(trigger);
}

// Add inline help text
function addHelpText(elementSelector, helpText, icon = 'ℹ️') {
    const element = document.querySelector(elementSelector);
    if (!element) return;
    
    const helpElement = document.createElement('div');
    helpElement.className = 'help-text';
    helpElement.innerHTML = `<span class="help-text-icon">${icon}</span> ${helpText}`;
    
    element.appendChild(helpElement);
}

// Add field help
function addFieldHelp(fieldSelector, helpText) {
    const field = document.querySelector(fieldSelector);
    if (!field) return;
    
    const helpElement = document.createElement('div');
    helpElement.className = 'field-help';
    helpElement.innerHTML = `
        <span class="field-help-icon">ℹ️</span>
        <span>${helpText}</span>
    `;
    
    // Insert after field
    field.parentNode.insertBefore(helpElement, field.nextSibling);
}

// Add contextual help
function addContextualHelp(containerSelector, message, type = 'info') {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const helpElement = document.createElement('div');
    helpElement.className = 'contextual-help';
    helpElement.innerHTML = `
        <span class="contextual-help-icon">ℹ️</span>
        <span>${message}</span>
    `;
    
    container.appendChild(helpElement);
}

// Update help panel content
function updateHelpPanelContent(page) {
    const content = helpPanelContent[page];
    if (!content) return;
    
    const panelContent = document.getElementById('helpPanelContent');
    if (panelContent) {
        panelContent.innerHTML = content.sections.map(section => `
            <div class="help-panel-section">
                <div class="help-panel-section-title">${section.title}</div>
                ${section.items.map(item => `
                    <a href="${item.link}" class="help-panel-item">${item.label}</a>
                `).join('')}
            </div>
        `).join('');
    }
    
    // Update title
    const title = document.querySelector('.help-panel-title');
    if (title) {
        title.textContent = content.title;
    }
}

// Check if onboarding is active
function isOnboardingActive() {
    return tooltipState.onboardingActive;
}

// Force close all tutorial overlays
function forceCloseTutorialOverlay() {
    if (isOnboardingActive()) {
        skipOnboarding();
    }
    
    // Also check for any remaining overlays
    const overlay = document.getElementById('tutorialOverlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Remove any remaining highlights
    const highlighted = document.querySelectorAll('.tutorial-highlight');
    highlighted.forEach(el => el.classList.remove('tutorial-highlight'));
    
    // Remove any remaining tooltips
    const tooltips = document.querySelectorAll('.onboarding-tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Reset onboarding state (for debugging)
function resetOnboardingState() {
    localStorage.removeItem('hasSeenOnboarding');
    tooltipState.onboardingActive = false;
    tooltipState.onboardingStep = 0;
    forceCloseTutorialOverlay();
    console.log('Onboarding state reset. Refresh the page to see onboarding again.');
}

// Global Tooltips API
window.Tooltips = {
    initialize: initializeTooltips,
    showTooltip,
    hideTooltip,
    toggleTooltip,
    hideAllTooltips,
    addTooltip,
    addHelpText,
    addFieldHelp,
    addContextualHelp,
    openHelpPanel,
    closeHelpPanel,
    toggleHelpPanel,
    updateHelpPanelContent,
    startOnboarding,
    nextOnboardingStep,
    previousOnboardingStep,
    skipOnboarding,
    isOnboardingActive,
    forceCloseTutorialOverlay,
    resetOnboardingState
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTooltips);
} else {
    initializeTooltips();
}

// Add tooltips to common elements on page load
document.addEventListener('DOMContentLoaded', function() {
    // Dashboard tooltips
    addTooltip('.progress-percentage', 'dashboard-progress', 'right');
    addTooltip('[onclick*="openFundingModal"]', 'funding-check', 'bottom');
    addTooltip('.ai-assistant-card', 'ai-assistant', 'left');
    
    // Form field tooltips
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        addFieldHelp(`#${field.id}`, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
    });
    
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        field.parentElement.setAttribute('data-tooltip', 'password-requirements');
        field.parentElement.setAttribute('data-tooltip-position', 'right');
    });
    
    // Initialize tooltips for these elements
    initializeExistingTooltips();
});