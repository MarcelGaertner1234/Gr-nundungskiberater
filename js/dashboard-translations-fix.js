/**
 * Dashboard Translation Updates - Compatibility Fix
 * Supports both old and new dashboard structures
 */

function updateDashboardTranslations() {
    if (!window.t) return;
    
    console.log('Updating dashboard translations...');
    
    // Welcome Section - Try both selectors
    const userName = localStorage.getItem('userName') || 'Marcel';
    
    // New structure
    let welcomeTitle = document.querySelector('.hero-welcome h1');
    let welcomeSubtitle = document.querySelector('.hero-welcome p');
    
    // Fallback to old structure if new not found
    if (!welcomeTitle) {
        welcomeTitle = document.querySelector('.welcome-title');
    }
    if (!welcomeSubtitle) {
        welcomeSubtitle = document.querySelector('.welcome-subtitle');
    }
    
    if (welcomeTitle) {
        welcomeTitle.textContent = t('welcome.title', { name: userName });
    }
    if (welcomeSubtitle) {
        welcomeSubtitle.textContent = t('welcome.subtitle');
    }
    
    // Profile Completion Banner (if exists)
    const completionBanner = document.querySelector('.completion-banner');
    if (completionBanner) {
        const bannerTitle = completionBanner.querySelector('h3');
        const bannerDesc = completionBanner.querySelector('p');
        const bannerBtn = completionBanner.querySelector('.btn');
        
        if (bannerTitle) bannerTitle.textContent = t('welcome.profile_incomplete.title');
        if (bannerDesc) bannerDesc.textContent = t('welcome.profile_incomplete.description');
        if (bannerBtn) bannerBtn.textContent = t('welcome.profile_incomplete.button');
    }
    
    // Quick Actions - Try both selectors
    const quickActionsTitle = document.querySelector('.quick-actions .section-title');
    if (quickActionsTitle) {
        quickActionsTitle.textContent = t('quick_actions.title');
    }
    
    // Try new action cards first, then old
    let actionCards = document.querySelectorAll('.action-card-redesign');
    if (actionCards.length === 0) {
        actionCards = document.querySelectorAll('.action-card');
    }
    
    const actionKeys = ['appointment', 'businessplan', 'funding', 'ai_advisor'];
    
    actionCards.forEach((card, index) => {
        if (actionKeys[index]) {
            const key = actionKeys[index];
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            
            if (title) {
                title.textContent = t(`quick_actions.${key}.title`);
            }
            
            if (description) {
                // Special handling for dynamic content
                if (key === 'appointment') {
                    description.textContent = t(`quick_actions.${key}.description`, { time: 'Morgen 14:00' });
                } else if (key === 'funding') {
                    description.textContent = t(`quick_actions.${key}.description`, { count: 5 });
                } else {
                    description.textContent = t(`quick_actions.${key}.description`);
                }
            }
        }
    });
    
    // Progress Section - Try both structures
    let progressSection = document.querySelector('.progress-section-redesign');
    if (!progressSection) {
        progressSection = document.querySelector('.progress-overview');
    }
    
    if (progressSection) {
        // New structure
        let progressTitle = progressSection.querySelector('.progress-title-group h2');
        let progressSubtitle = progressSection.querySelector('.progress-title-group p');
        
        // Old structure fallback
        if (!progressTitle) {
            const sectionTitle = progressSection.querySelector('.section-title');
            if (sectionTitle) sectionTitle.textContent = t('progress.title');
            
            progressTitle = progressSection.querySelector('h3');
        }
        
        if (progressTitle) {
            progressTitle.textContent = t('progress.journey_title');
        }
        if (progressSubtitle) {
            progressSubtitle.textContent = t('progress.subtitle', 'Du bist auf dem besten Weg zum erfolgreichen Start!');
        }
        
        // Milestones - Try both selectors
        let milestones = progressSection.querySelectorAll('.milestone-label');
        if (milestones.length === 0) {
            milestones = progressSection.querySelectorAll('.milestone span');
        }
        
        const milestoneKeys = ['idea_validated', 'market_analysis', 'businessplan', 'funding', 'founding'];
        
        milestones.forEach((milestone, index) => {
            if (milestoneKeys[index]) {
                milestone.textContent = t(`progress.milestones.${milestoneKeys[index]}`);
            }
        });
    }
    
    // Next Steps - Try both structures
    let nextStepsCard = document.querySelector('.next-steps-redesign');
    if (!nextStepsCard) {
        nextStepsCard = document.querySelector('.next-steps-card');
    }
    
    if (nextStepsCard) {
        // New structure
        let cardTitle = nextStepsCard.querySelector('.card-header-redesign h3');
        // Old structure fallback
        if (!cardTitle) {
            cardTitle = nextStepsCard.querySelector('.card-title');
        }
        
        if (cardTitle) {
            cardTitle.textContent = t('next_steps.title');
        }
        
        // Try both step item selectors
        let stepItems = nextStepsCard.querySelectorAll('.step-item-redesign');
        if (stepItems.length === 0) {
            stepItems = nextStepsCard.querySelectorAll('.step-item');
        }
        
        const stepKeys = ['legal_form', 'financial_plan', 'business_registration', 'bank_appointment'];
        const stepMeta = ['recommended_by', 'completion', 'documents_ready', 'after_financial_plan'];
        
        stepItems.forEach((item, index) => {
            if (stepKeys[index]) {
                // New structure
                let stepTitle = item.querySelector('.step-title');
                let stepMetaElem = item.querySelector('.step-meta-info .step-deadline');
                
                // Old structure fallback
                if (!stepTitle) {
                    stepTitle = item.querySelector('.step-title');
                }
                if (!stepMetaElem) {
                    stepMetaElem = item.querySelector('.step-meta');
                }
                
                if (stepTitle) {
                    stepTitle.textContent = t(`next_steps.items.${stepKeys[index]}`);
                }
                
                // Handle meta text
                if (stepMetaElem) {
                    if (stepMeta[index] === 'recommended_by') {
                        stepMetaElem.textContent = t(`next_steps.meta.${stepMeta[index]}`, { date: '20. August' });
                    } else if (stepMeta[index] === 'completion') {
                        stepMetaElem.textContent = t(`next_steps.meta.${stepMeta[index]}`, { percent: 80 });
                    } else {
                        stepMetaElem.textContent = t(`next_steps.meta.${stepMeta[index]}`);
                    }
                }
            }
        });
    }
    
    // Documents Section
    const documentsCard = document.querySelector('.documents-card, .documents-section-redesign');
    if (documentsCard) {
        const cardHeader = documentsCard.querySelector('.card-header, .card-header-redesign');
        if (cardHeader) {
            const title = cardHeader.querySelector('.card-title, h3');
            if (title) title.textContent = t('documents.title');
            
            const viewAllLink = cardHeader.querySelector('.view-all-link, .view-all-btn');
            if (viewAllLink) viewAllLink.textContent = t('documents.view_all');
        }
    }
    
    // Appointments Section
    const appointmentsCard = document.querySelector('.appointments-card, .calendar-widget');
    if (appointmentsCard) {
        const title = appointmentsCard.querySelector('.card-title, h3');
        if (title) title.textContent = t('appointments.title');
    }
    
    // AI Assistant Section
    const aiCard = document.querySelector('.ai-assistant-card, .ai-assistant-redesign');
    if (aiCard) {
        const title = aiCard.querySelector('.card-title, h4');
        if (title) title.textContent = t('ai_assistant.title');
        
        const status = aiCard.querySelector('.ai-status');
        if (status) status.textContent = t('ai_assistant.status');
    }
    
    // Resources Section
    const resourcesCard = document.querySelector('.resources-card');
    if (resourcesCard) {
        const title = resourcesCard.querySelector('.card-title');
        if (title) title.textContent = t('resources.title');
    }
    
    console.log('Dashboard translations updated successfully');
}

// Export for global use
window.updateDashboardTranslations = updateDashboardTranslations;

// Listen for language changes
window.addEventListener('languageChanged', updateDashboardTranslations);