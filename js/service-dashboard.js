// Service Dashboard JavaScript

// Chat Modal Functions
function openChatModal() {
    console.log('Opening chat modal...');
    // For now, use a simple alert - could be replaced with actual chat interface
    alert('Chat-Feature wird bald verfügbar sein! 💬\n\nIn der Zwischenzeit können Sie uns gerne per E-Mail kontaktieren:\nmarcel@ki-konzept-builder.de');
}

// Progress Modal Functions
function openProgressModal() {
    console.log('Opening progress modal...');
    // Create progress modal content
    const modalContent = `
        <div class="progress-modal-content">
            <h3>Detaillierter Fortschritt</h3>
            <div class="progress-timeline">
                <div class="progress-step completed">
                    <div class="step-marker">✅</div>
                    <div class="step-info">
                        <h4>Idee eingereicht</h4>
                        <p>Abgeschlossen am 15. Juli 2024</p>
                    </div>
                </div>
                <div class="progress-step in-progress">
                    <div class="step-marker">⏳</div>
                    <div class="step-info">
                        <h4>Businessplan wird erstellt</h4>
                        <p>Marcel arbeitet daran - Fertigstellung: 22. Juli 2024</p>
                    </div>
                </div>
                <div class="progress-step pending">
                    <div class="step-marker">📋</div>
                    <div class="step-info">
                        <h4>Förderung auswählen</h4>
                        <p>Wartet auf Businessplan-Fertigstellung</p>
                    </div>
                </div>
                <div class="progress-step pending">
                    <div class="step-marker">💰</div>
                    <div class="step-info">
                        <h4>Förderantrag stellen</h4>
                        <p>Folgt nach Förderungsauswahl</p>
                    </div>
                </div>
                <div class="progress-step pending">
                    <div class="step-marker">🏦</div>
                    <div class="step-info">
                        <h4>Bankgespräch</h4>
                        <p>Finale Phase der Gründung</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal (reuse existing modal if available)
    if (window.showModal) {
        window.showModal('Fortschrittsdetails', modalContent);
    } else {
        alert('Fortschritt:\n\n✅ Idee eingereicht\n⏳ Businessplan wird erstellt\n📋 Förderung auswählen\n💰 Förderantrag stellen\n🏦 Bankgespräch');
    }
}

// Enhanced Document Viewer with Service Context
function openDocumentViewer(docType, filename) {
    console.log(`Opening document viewer for ${docType}: ${filename}`);
    
    // Service-specific document messages
    const serviceMessages = {
        'businessplan': 'Dein Businessplan wird gerade von Marcel bearbeitet. Hier siehst du den aktuellen Stand.',
        'finanzplan': 'Der Finanzplan ist noch in Vorbereitung und wird nach dem Businessplan erstellt.',
        'marktanalyse': 'Die Marktanalyse ist Teil des Businessplans und wird parallel erstellt.'
    };
    
    const message = serviceMessages[docType] || 'Dokument wird geladen...';
    
    // Use existing document viewer if available
    if (window.openDocumentViewer) {
        // Call original function but with service context
        window.openDocumentViewer(filename, docType);
    } else {
        alert(`📄 ${filename}\n\n${message}\n\nDas Dokument wird in Kürze verfügbar sein.`);
    }
}

// Service Status Updates (for real-time updates)
function updateServiceStatus(serviceType, status, message) {
    const statusCard = document.querySelector(`[data-service="${serviceType}"] .service-status-card`);
    if (statusCard) {
        statusCard.className = `service-status-card ${status}`;
        statusCard.querySelector('.service-status-description').textContent = message;
    }
}

// Advisor Status Updates
function updateAdvisorStatus(status, message) {
    const advisorStatus = document.querySelector('.advisor-status');
    if (advisorStatus) {
        advisorStatus.textContent = message;
        advisorStatus.className = `advisor-status ${status}`;
    }
}

// Next Steps Updates
function updateNextSteps(icon, title, description, action) {
    const nextStepsCard = document.querySelector('.next-steps-card');
    if (nextStepsCard) {
        nextStepsCard.querySelector('.next-steps-icon').textContent = icon;
        nextStepsCard.querySelector('.next-steps-title').textContent = title;
        nextStepsCard.querySelector('.next-steps-description').textContent = description;
        nextStepsCard.querySelector('.next-steps-action').onclick = action;
    }
}

// Service Card Updates
function updateServiceCard(cardType, status, items) {
    const serviceCard = document.querySelector(`[data-service="${cardType}"]`);
    if (serviceCard) {
        const statusElement = serviceCard.querySelector('.service-card-status');
        const itemsList = serviceCard.querySelector('.service-card-items');
        
        if (statusElement) {
            statusElement.textContent = status;
            statusElement.className = `service-card-status ${status.toLowerCase().replace(' ', '-')}`;
        }
        
        if (itemsList && items) {
            itemsList.innerHTML = items.map(item => 
                `<li class="service-card-item ${item.pending ? 'pending' : ''}">${item.text}</li>`
            ).join('');
        }
    }
}

// Initialize Service Dashboard
function initializeServiceDashboard() {
    console.log('Initializing service dashboard...');
    
    // Add service attributes to cards for easy updates
    document.querySelectorAll('.service-card').forEach((card, index) => {
        const titles = ['documents', 'funding', 'communication', 'progress'];
        if (titles[index]) {
            card.setAttribute('data-service', titles[index]);
        }
    });
    
    // Simulate real-time updates (in a real app, this would come from WebSocket or API)
    setTimeout(() => {
        console.log('Simulating service update...');
        // Could update advisor status, next steps, etc.
    }, 5000);
}

// Auto-refresh service data
function refreshServiceData() {
    console.log('Refreshing service data...');
    // In a real application, this would fetch latest data from API
    
    // Example: Update advisor status
    updateAdvisorStatus('active', 'Gerade aktiv - arbeitet an deinem Businessplan (85% fertig)');
    
    // Example: Update next steps
    updateNextSteps(
        '📄',
        'Businessplan Review bereit',
        'Dein Businessplan ist fast fertig! Wir möchten ihn mit dir durchgehen.',
        () => openDocumentViewer('businessplan', 'Businessplan_Review.pdf')
    );
}

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollIndicatorFill = document.querySelector('.scroll-indicator-fill');
    if (scrollIndicatorFill) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        scrollIndicatorFill.style.width = Math.min(scrollProgress, 100) + '%';
    }
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Enhanced loading states
function showLoadingState(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('loading');
    }
}

function hideLoadingState(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('loading');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeServiceDashboard();
    
    // Initialize scroll progress
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress);
    
    // Auto-refresh every 30 seconds (in a real app)
    // setInterval(refreshServiceData, 30000);
});

// Export functions for global use
window.openChatModal = openChatModal;
window.openProgressModal = openProgressModal;
window.updateServiceStatus = updateServiceStatus;
window.updateAdvisorStatus = updateAdvisorStatus;
window.updateNextSteps = updateNextSteps;
window.updateServiceCard = updateServiceCard;
window.refreshServiceData = refreshServiceData;