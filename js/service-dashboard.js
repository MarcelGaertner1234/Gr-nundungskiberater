// Service Dashboard JavaScript

// Status Card Interactions
function openIdeaStatus() {
    console.log('Opening idea status details...');
    const modalContent = `
        <div class="status-modal-content">
            <h3>Idee eingereicht</h3>
            <div class="status-details">
                <div class="status-timeline">
                    <div class="timeline-item completed">
                        <div class="timeline-marker">✓</div>
                        <div class="timeline-content">
                            <h4>Idee eingereicht</h4>
                            <p>15. Juli 2024, 14:30 Uhr</p>
                            <small>Deine Geschäftsidee für eine innovative Software-Lösung wurde erfolgreich bei uns eingereicht.</small>
                        </div>
                    </div>
                    <div class="timeline-item completed">
                        <div class="timeline-marker">✓</div>
                        <div class="timeline-content">
                            <h4>Erste Bewertung</h4>
                            <p>15. Juli 2024, 16:45 Uhr</p>
                            <small>Marcel hat deine Idee geprüft und als sehr vielversprechend eingestuft.</small>
                        </div>
                    </div>
                    <div class="timeline-item completed">
                        <div class="timeline-marker">✓</div>
                        <div class="timeline-content">
                            <h4>Marktanalyse gestartet</h4>
                            <p>16. Juli 2024, 09:15 Uhr</p>
                            <small>Wir haben bereits mit der Marktanalyse für deinen Bereich begonnen.</small>
                        </div>
                    </div>
                </div>
                <div class="status-actions">
                    <button class="btn-primary" onclick="openChatModal()">Nachfrage stellen</button>
                    <button class="btn-secondary" onclick="closeModal()">Schließen</button>
                </div>
            </div>
        </div>
    `;
    showModal('Idee Status', modalContent);
}

function openBusinessplanStatus() {
    console.log('Opening businessplan status details...');
    const modalContent = `
        <div class="status-modal-content">
            <h3>Businessplan in Bearbeitung</h3>
            <div class="status-details">
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 75%"></div>
                    </div>
                    <span class="progress-text">75% abgeschlossen</span>
                </div>
                <div class="status-timeline">
                    <div class="timeline-item completed">
                        <div class="timeline-marker">✓</div>
                        <div class="timeline-content">
                            <h4>Executive Summary</h4>
                            <p>Abgeschlossen am 17. Juli 2024</p>
                            <small>Zusammenfassung deiner Geschäftsidee und Zielmärkte erstellt.</small>
                        </div>
                    </div>
                    <div class="timeline-item completed">
                        <div class="timeline-marker">✓</div>
                        <div class="timeline-content">
                            <h4>Marktanalyse</h4>
                            <p>Abgeschlossen am 18. Juli 2024</p>
                            <small>Detaillierte Analyse deines Zielmarktes und der Konkurrenz.</small>
                        </div>
                    </div>
                    <div class="timeline-item in-progress">
                        <div class="timeline-marker">⏳</div>
                        <div class="timeline-content">
                            <h4>Finanzplanung</h4>
                            <p>Wird gerade bearbeitet</p>
                            <small>Marcel erstellt gerade die 3-Jahres-Finanzplanung für dein Unternehmen.</small>
                        </div>
                    </div>
                    <div class="timeline-item pending">
                        <div class="timeline-marker">○</div>
                        <div class="timeline-content">
                            <h4>Finalisierung</h4>
                            <p>Geplant für 22. Juli 2024</p>
                            <small>Zusammenfassung aller Bereiche und finale Überprüfung.</small>
                        </div>
                    </div>
                </div>
                <div class="status-actions">
                    <button class="btn-primary" onclick="openDocumentViewer('businessplan', 'Businessplan_Entwurf.pdf')">Aktueller Stand</button>
                    <button class="btn-secondary" onclick="openChatModal()">Rückfrage</button>
                    <button class="btn-secondary" onclick="closeModal()">Schließen</button>
                </div>
            </div>
        </div>
    `;
    showModal('Businessplan Status', modalContent);
}

function openFunderungStatus() {
    console.log('Opening funding status details...');
    const modalContent = `
        <div class="status-modal-content">
            <h3>Förderung auswählen</h3>
            <div class="status-details">
                <div class="status-info">
                    <p><strong>Status:</strong> Wartet auf Businessplan-Fertigstellung</p>
                    <p><strong>Recherche:</strong> Bereits 5 passende Förderungen identifiziert</p>
                    <p><strong>Potenzial:</strong> Bis zu 50.000€ Förderung möglich</p>
                </div>
                <div class="funding-preview">
                    <h4>Bereits identifizierte Förderungen:</h4>
                    <div class="funding-list">
                        <div class="funding-item">
                            <h5>EXIST-Gründerstipendium</h5>
                            <p>Bis zu 25.000€ für innovative Gründungen</p>
                            <span class="match-score">95% Übereinstimmung</span>
                        </div>
                        <div class="funding-item">
                            <h5>Digitale Gründerinitiative</h5>
                            <p>Bis zu 15.000€ für digitale Lösungen</p>
                            <span class="match-score">88% Übereinstimmung</span>
                        </div>
                        <div class="funding-item">
                            <h5>Innovationspreis IT</h5>
                            <p>Bis zu 10.000€ für IT-Innovationen</p>
                            <span class="match-score">82% Übereinstimmung</span>
                        </div>
                    </div>
                </div>
                <div class="status-actions">
                    <button class="btn-primary" onclick="openFundingModal()">Alle Förderungen</button>
                    <button class="btn-secondary" onclick="scheduleConsultation()">Beratung buchen</button>
                    <button class="btn-secondary" onclick="closeModal()">Schließen</button>
                </div>
            </div>
        </div>
    `;
    showModal('Förderung Status', modalContent);
}

// Chat Modal Functions
function openChatModal() {
    console.log('Opening chat modal...');
    const modalContent = `
        <div class="chat-modal-content">
            <div class="chat-header">
                <div class="advisor-info">
                    <div class="advisor-avatar-small">MG</div>
                    <div>
                        <h4>Marcel Gärtner</h4>
                        <span class="online-status">Online</span>
                    </div>
                </div>
            </div>
            <div class="chat-messages">
                <div class="message received">
                    <p>Hallo! Ich arbeite gerade an deinem Businessplan. Hast du noch Fragen zur Zielgruppenanalyse?</p>
                    <span class="message-time">Heute, 14:30</span>
                </div>
                <div class="message sent">
                    <p>Hi Marcel! Danke für das Update. Kannst du mir den aktuellen Stand zeigen?</p>
                    <span class="message-time">Heute, 14:45</span>
                </div>
                <div class="message received">
                    <p>Gerne! Ich schicke dir gleich den aktuellen Entwurf. Wir sind bei etwa 75% - die Finanzplanung läuft noch.</p>
                    <span class="message-time">Heute, 14:47</span>
                </div>
            </div>
            <div class="chat-input">
                <div class="input-group">
                    <input type="text" placeholder="Nachricht schreiben..." id="chatInput">
                    <button class="btn-primary" onclick="sendMessage()">Senden</button>
                </div>
                <small>💡 Tipp: Marcel antwortet meist innerhalb von 30 Minuten</small>
            </div>
        </div>
    `;
    showModal('Chat mit Marcel', modalContent);
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (input && input.value.trim()) {
        // Simulate sending message
        const messagesContainer = document.querySelector('.chat-messages');
        const newMessage = document.createElement('div');
        newMessage.className = 'message sent';
        newMessage.innerHTML = `
            <p>${input.value}</p>
            <span class="message-time">Heute, ${new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})}</span>
        `;
        messagesContainer.appendChild(newMessage);
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simulate response after 2 seconds
        setTimeout(() => {
            const response = document.createElement('div');
            response.className = 'message received';
            response.innerHTML = `
                <p>Danke für deine Nachricht! Ich kümmere mich darum und melde mich in Kürze bei dir.</p>
                <span class="message-time">Heute, ${new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})}</span>
            `;
            messagesContainer.appendChild(response);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 2000);
    }
}

function scheduleConsultation() {
    closeModal();
    openCalendarModal();
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

// Modal System
function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.getElementById('serviceModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'serviceModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.remove();
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
    
    // Make status cards clickable
    const statusCards = document.querySelectorAll('.service-status-card');
    statusCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            if (card.classList.contains('completed')) {
                openIdeaStatus();
            } else if (card.classList.contains('in-progress')) {
                openBusinessplanStatus();
            } else if (card.classList.contains('pending')) {
                openFunderungStatus();
            }
        });
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
window.openIdeaStatus = openIdeaStatus;
window.openBusinessplanStatus = openBusinessplanStatus;
window.openFunderungStatus = openFunderungStatus;
window.showModal = showModal;
window.closeModal = closeModal;
window.sendMessage = sendMessage;
window.scheduleConsultation = scheduleConsultation;
window.updateServiceStatus = updateServiceStatus;
window.updateAdvisorStatus = updateAdvisorStatus;
window.updateNextSteps = updateNextSteps;
window.updateServiceCard = updateServiceCard;
window.refreshServiceData = refreshServiceData;