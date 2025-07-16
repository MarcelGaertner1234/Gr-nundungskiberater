/**
 * Dashboard Translation Updates
 * Updates all dashboard elements with translated text
 */

function updateDashboardTranslations() {
    if (!window.t) return;
    
    // Welcome Section
    const userName = localStorage.getItem('userName') || 'Marcel';
    document.querySelector('.welcome-title').textContent = t('welcome.title', { name: userName });
    document.querySelector('.welcome-subtitle').textContent = t('welcome.subtitle');
    
    // Profile Completion Banner
    const completionBanner = document.querySelector('.completion-banner');
    if (completionBanner) {
        completionBanner.querySelector('h3').textContent = t('welcome.profile_incomplete.title');
        completionBanner.querySelector('p').textContent = t('welcome.profile_incomplete.description');
        completionBanner.querySelector('.btn').textContent = t('welcome.profile_incomplete.button');
    }
    
    // Quick Actions
    document.querySelector('.quick-actions .section-title').textContent = t('quick_actions.title');
    
    const actionCards = document.querySelectorAll('.action-card');
    const actionKeys = ['appointment', 'businessplan', 'funding', 'ai_advisor'];
    
    actionCards.forEach((card, index) => {
        if (actionKeys[index]) {
            const key = actionKeys[index];
            card.querySelector('h3').textContent = t(`quick_actions.${key}.title`);
            
            // Special handling for dynamic content
            if (key === 'appointment') {
                card.querySelector('p').textContent = t(`quick_actions.${key}.description`, { time: 'Morgen 14:00' });
            } else if (key === 'funding') {
                card.querySelector('p').textContent = t(`quick_actions.${key}.description`, { count: 5 });
            } else {
                card.querySelector('p').textContent = t(`quick_actions.${key}.description`);
            }
        }
    });
    
    // Progress Section
    const progressSection = document.querySelector('.progress-overview');
    if (progressSection) {
        progressSection.querySelector('.section-title').textContent = t('progress.title');
        progressSection.querySelector('h3').textContent = t('progress.journey_title');
        
        // Milestones
        const milestones = progressSection.querySelectorAll('.milestone span');
        const milestoneKeys = ['idea_validated', 'market_analysis', 'businessplan', 'funding', 'founding'];
        
        milestones.forEach((milestone, index) => {
            if (milestoneKeys[index]) {
                milestone.textContent = t(`progress.milestones.${milestoneKeys[index]}`);
            }
        });
    }
    
    // Next Steps
    const nextStepsCard = document.querySelector('.next-steps-card');
    if (nextStepsCard) {
        nextStepsCard.querySelector('.card-title').textContent = t('next_steps.title');
        
        const stepItems = nextStepsCard.querySelectorAll('.step-item');
        const stepKeys = ['legal_form', 'financial_plan', 'business_registration', 'bank_appointment'];
        const stepMeta = ['recommended_by', 'completion', 'documents_ready', 'after_financial_plan'];
        
        stepItems.forEach((item, index) => {
            if (stepKeys[index]) {
                item.querySelector('.step-title').textContent = t(`next_steps.items.${stepKeys[index]}`);
                
                // Handle meta text
                if (stepMeta[index] === 'recommended_by') {
                    item.querySelector('.step-meta').textContent = t(`next_steps.meta.${stepMeta[index]}`, { date: '20. August' });
                } else if (stepMeta[index] === 'completion') {
                    item.querySelector('.step-meta').textContent = t(`next_steps.meta.${stepMeta[index]}`, { percent: 80 });
                } else {
                    item.querySelector('.step-meta').textContent = t(`next_steps.meta.${stepMeta[index]}`);
                }
            }
        });
    }
    
    // Documents
    const documentsCard = document.querySelector('.documents-card');
    if (documentsCard) {
        documentsCard.querySelector('.card-title').textContent = t('documents.title');
        documentsCard.querySelector('.view-all-link').textContent = t('documents.view_all');
        
        // Document items
        const documentMetas = documentsCard.querySelectorAll('.document-meta');
        documentMetas.forEach((meta, index) => {
            if (index === 0) {
                meta.textContent = t('documents.edited', { time: 'vor 2 Stunden' });
            } else if (index === 1) {
                meta.textContent = t('documents.edited', { time: 'gestern' });
            } else {
                meta.textContent = t('documents.completed');
            }
        });
    }
    
    // Appointments
    const appointmentsCard = document.querySelector('.appointments-card');
    if (appointmentsCard) {
        appointmentsCard.querySelector('.card-title').textContent = t('appointments.title');
        appointmentsCard.querySelector('.btn-secondary').textContent = t('appointments.book_new');
    }
    
    // AI Assistant
    const aiCard = document.querySelector('.ai-assistant-card');
    if (aiCard) {
        aiCard.querySelector('.card-title').textContent = t('ai_assistant.title');
        aiCard.querySelector('.ai-status').textContent = t('ai_assistant.status');
        aiCard.querySelector('h4').textContent = t('ai_assistant.suggestions_title');
        aiCard.querySelector('.ai-input-field').placeholder = t('ai_assistant.placeholder');
        
        // Suggestion chips
        const suggestions = aiCard.querySelectorAll('.suggestion-chip');
        const suggestionKeys = ['optimize_businessplan', 'calculate_market', 'find_funding'];
        
        suggestions.forEach((chip, index) => {
            if (suggestionKeys[index]) {
                chip.textContent = t(`ai_assistant.suggestions.${suggestionKeys[index]}`);
            }
        });
    }
    
    // Resources
    const resourcesCard = document.querySelector('.resources-card');
    if (resourcesCard) {
        resourcesCard.querySelector('.card-title').textContent = t('resources.title');
        
        const resourceLinks = resourcesCard.querySelectorAll('.resource-link span:last-child');
        const resourceKeys = ['guide', 'videos', 'templates', 'faq'];
        
        resourceLinks.forEach((link, index) => {
            if (resourceKeys[index]) {
                link.textContent = t(`resources.items.${resourceKeys[index]}`).replace(/^[^\s]+\s/, '');
            }
        });
    }
}

// Call this function after i18n is loaded
window.updateDashboardTranslations = updateDashboardTranslations;

// Also update when language changes
window.addEventListener('languageChanged', updateDashboardTranslations);