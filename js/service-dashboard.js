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
        const message = input.value.trim();
        
        // Get current user email
        const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
        const userEmail = onboardingData.email || 'user@example.com';
        
        // Track the message
        DataTracking.communications.add(
            userEmail,
            'chat',
            'user_to_advisor',
            message,
            []
        );
        
        // Simulate sending message
        const messagesContainer = document.querySelector('.chat-messages');
        const newMessage = document.createElement('div');
        newMessage.className = 'message sent';
        newMessage.innerHTML = `
            <p>${message}</p>
            <span class="message-time">Heute, ${new Date().toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'})}</span>
        `;
        messagesContainer.appendChild(newMessage);
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Simulate response after 2 seconds
        setTimeout(() => {
            const responseText = 'Danke für deine Nachricht! Ich kümmere mich darum und melde mich in Kürze bei dir.';
            
            // Track the response
            DataTracking.communications.add(
                userEmail,
                'chat',
                'advisor_to_user',
                responseText,
                []
            );
            
            const response = document.createElement('div');
            response.className = 'message received';
            response.innerHTML = `
                <p>${responseText}</p>
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

// Helper function to generate topic options based on unlocked packages
function generateTopicOptions(userPackages) {
    let options = '<option value="">-- Bitte wähle ein Thema --</option>';
    
    // Erstgespräch ist immer verfügbar
    options += '<option value="erstgespraech">Kostenloses Erstgespräch</option>';
    
    // Bezahlte Beratungen nur wenn Pakete freigeschaltet sind
    if (userPackages.includes('businessplan')) {
        options += '<option value="businessplan">Businessplan Beratung</option>';
    }
    if (userPackages.includes('gruendung')) {
        options += '<option value="gruendung">Gründungsberatung</option>';
    }
    if (userPackages.includes('finanzierung') || userPackages.includes('funding')) {
        options += '<option value="finanzierung">Finanzierungsberatung</option>';
    }
    if (userPackages.includes('marketing')) {
        options += '<option value="marketing">Marketing Beratung</option>';
    }
    
    // Wenn irgendein Paket freigeschaltet ist, Follow-up erlauben
    if (userPackages.length > 0) {
        options += '<option value="follow-up">Follow-up Termin</option>';
    }
    
    // Wenn keine Pakete freigeschaltet sind, Info anzeigen
    if (userPackages.length === 0) {
        options += '<option value="" disabled>-- Weitere Beratungen nach Paketbuchung verfügbar --</option>';
    }
    
    return options;
}

// Calendar Modal Functions
function openCalendarModal() {
    console.log('Opening calendar modal...');
    
    // Get current user's unlocked packages
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    const userEmail = onboardingData.email || 'user@example.com';
    const unlockedPackages = JSON.parse(localStorage.getItem('unlockedPackages') || '{}');
    const userPackages = unlockedPackages[userEmail] || [];
    
    // Check if user has any paid packages
    const hasPaidPackages = userPackages.length > 0;
    
    const modalContent = `
        <div class="calendar-modal-content">
            <div class="calendar-header">
                <h3>Beratungstermin buchen</h3>
                <p>Wähle einen passenden Termin für deine persönliche Beratung mit Marcel.</p>
            </div>
            
            <div class="booking-tabs">
                <button class="booking-tab active" onclick="switchBookingTab('online')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                    Online (Zoom)
                </button>
                <button class="booking-tab" onclick="switchBookingTab('phone')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Telefon
                </button>
                <button class="booking-tab" onclick="switchBookingTab('office')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    Vor Ort
                </button>
            </div>
            
            <div class="booking-content">
                <div class="booking-option active" id="online">
                    <div class="booking-info">
                        <h4>🖥️ Online-Beratung (Zoom)</h4>
                        <p>Bequem von zu Hause aus • Bildschirmfreigabe möglich • Aufzeichnung verfügbar</p>
                    </div>
                </div>
                <div class="booking-option" id="phone">
                    <div class="booking-info">
                        <h4>📞 Telefonberatung</h4>
                        <p>Schnell und unkompliziert • Ideal für kurze Rückfragen • Flexible Zeiten</p>
                    </div>
                </div>
                <div class="booking-option" id="office">
                    <div class="booking-info">
                        <h4>🏢 Persönliche Beratung</h4>
                        <p>Face-to-face Gespräch • Unterlagen direkt besprechen • Intensive Beratung</p>
                        <small>📍 Büro: Musterstraße 123, 12345 Berlin</small>
                    </div>
                </div>
            </div>
            
            <div class="time-slots">
                <h4>Verfügbare Termine</h4>
                <div class="time-grid">
                    <div class="time-slot" onclick="selectTimeSlot(this, 'Heute, 16:00')">
                        <div class="slot-time">Heute</div>
                        <div class="slot-hour">16:00 - 17:00</div>
                        <div class="slot-status available">Verfügbar</div>
                    </div>
                    <div class="time-slot" onclick="selectTimeSlot(this, 'Morgen, 10:00')">
                        <div class="slot-time">Morgen</div>
                        <div class="slot-hour">10:00 - 11:00</div>
                        <div class="slot-status available">Verfügbar</div>
                    </div>
                    <div class="time-slot" onclick="selectTimeSlot(this, 'Morgen, 14:00')">
                        <div class="slot-time">Morgen</div>
                        <div class="slot-hour">14:00 - 15:00</div>
                        <div class="slot-status recommended">Empfohlen</div>
                    </div>
                    <div class="time-slot" onclick="selectTimeSlot(this, 'Übermorgen, 09:00')">
                        <div class="slot-time">Übermorgen</div>
                        <div class="slot-hour">09:00 - 10:00</div>
                        <div class="slot-status available">Verfügbar</div>
                    </div>
                    <div class="time-slot" onclick="selectTimeSlot(this, 'Freitag, 15:00')">
                        <div class="slot-time">Freitag</div>
                        <div class="slot-hour">15:00 - 16:00</div>
                        <div class="slot-status available">Verfügbar</div>
                    </div>
                    <div class="time-slot busy">
                        <div class="slot-time">Freitag</div>
                        <div class="slot-hour">11:00 - 12:00</div>
                        <div class="slot-status">Belegt</div>
                    </div>
                </div>
            </div>
            
            <div class="booking-form">
                <div class="form-group">
                    <label for="bookingTopic">Beratungsthema</label>
                    <select id="bookingTopic" onchange="updateBookingButton()">
                        ${generateTopicOptions(userPackages)}
                    </select>
                </div>
                <div class="form-group">
                    <label for="bookingNotes">Besondere Anliegen (optional)</label>
                    <textarea id="bookingNotes" rows="3" placeholder="Was möchtest du besonders besprechen?"></textarea>
                </div>
            </div>
            
            <div class="booking-summary" id="bookingSummary" style="display: none;">
                <h4>Termin-Übersicht</h4>
                <div class="summary-details">
                    <div class="summary-item">
                        <span class="label">Termin:</span>
                        <span class="value" id="selectedTime">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Art:</span>
                        <span class="value" id="selectedType">Online (Zoom)</span>
                    </div>
                    <div class="summary-item">
                        <span class="label">Thema:</span>
                        <span class="value" id="selectedTopic">-</span>
                    </div>
                </div>
            </div>
            
            ${!hasPaidPackages ? `
                <div class="booking-notice" style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 16px; margin-top: 16px;">
                    <p style="margin: 0; color: #92400e; font-size: 14px;">
                        <strong>Hinweis:</strong> Du kannst derzeit nur ein kostenloses Erstgespräch buchen. 
                        Weitere Beratungen stehen dir nach der Buchung eines Pakets zur Verfügung.
                    </p>
                </div>
            ` : ''}
            
            <div class="booking-actions">
                <button class="btn-secondary" onclick="closeModal()">Abbrechen</button>
                <button class="btn-primary" id="confirmBooking" onclick="confirmBooking()" disabled>Termin buchen</button>
            </div>
        </div>
    `;
    showModal('Termin buchen', modalContent);
    
    // Add event listener for topic selection
    setTimeout(() => {
        const topicSelect = document.getElementById('bookingTopic');
        if (topicSelect) {
            topicSelect.addEventListener('change', updateBookingButton);
        }
    }, 100);
}

function switchBookingTab(type) {
    // Update tabs
    document.querySelectorAll('.booking-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[onclick="switchBookingTab('${type}')"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.booking-option').forEach(option => option.classList.remove('active'));
    document.getElementById(type).classList.add('active');
    
    // Update selected type in summary
    const typeNames = {
        'online': 'Online (Zoom)',
        'phone': 'Telefon',
        'office': 'Vor Ort'
    };
    document.getElementById('selectedType').textContent = typeNames[type];
}

function selectTimeSlot(element, timeText) {
    if (element.classList.contains('busy')) return;
    
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
    
    // Select current
    element.classList.add('selected');
    
    // Update summary
    document.getElementById('selectedTime').textContent = timeText;
    document.getElementById('bookingSummary').style.display = 'block';
    
    // Enable booking button
    updateBookingButton();
}

function updateBookingButton() {
    const selectedTime = document.getElementById('selectedTime').textContent;
    const selectedTopic = document.getElementById('bookingTopic').value;
    const button = document.getElementById('confirmBooking');
    
    if (selectedTime !== '-' && selectedTopic) {
        button.disabled = false;
        button.textContent = 'Termin buchen';
    } else {
        button.disabled = true;
        button.textContent = 'Bitte Termin wählen';
    }
    
    // Update topic in summary
    const topicNames = {
        'erstgespraech': 'Kostenloses Erstgespräch',
        'businessplan': 'Businessplan Beratung',
        'gruendung': 'Gründungsberatung',
        'finanzierung': 'Finanzierungsberatung',
        'marketing': 'Marketing Beratung',
        'follow-up': 'Follow-up Termin'
    };
    document.getElementById('selectedTopic').textContent = topicNames[selectedTopic] || selectedTopic || '-';
}

function confirmBooking() {
    const selectedTime = document.getElementById('selectedTime').textContent;
    const selectedType = document.getElementById('selectedType').textContent;
    const selectedTopic = document.getElementById('selectedTopic').textContent;
    const selectedTopicValue = document.getElementById('bookingTopic').value;
    const notes = document.getElementById('bookingNotes').value;
    
    if (selectedTime === '-') {
        alert('Bitte wähle einen Termin aus.');
        return;
    }
    
    // Get current user's packages
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    const userEmail = onboardingData.email || 'user@example.com';
    const unlockedPackages = JSON.parse(localStorage.getItem('unlockedPackages') || '{}');
    const userPackages = unlockedPackages[userEmail] || [];
    
    // Check if user is allowed to book this type of consultation
    if (selectedTopicValue !== 'erstgespraech' && userPackages.length === 0) {
        alert('Du musst zuerst ein Paket buchen, um diese Art von Beratung zu erhalten.');
        return;
    }
    
    // Check specific package requirements
    if (selectedTopicValue === 'businessplan' && !userPackages.includes('businessplan')) {
        alert('Du benötigst das Businessplan-Paket für diese Beratung.');
        return;
    }
    if (selectedTopicValue === 'gruendung' && !userPackages.includes('gruendung')) {
        alert('Du benötigst das Gründungsberatungs-Paket für diese Beratung.');
        return;
    }
    if (selectedTopicValue === 'finanzierung' && !userPackages.includes('finanzierung') && !userPackages.includes('funding')) {
        alert('Du benötigst das Finanzierungsberatungs-Paket für diese Beratung.');
        return;
    }
    if (selectedTopicValue === 'marketing' && !userPackages.includes('marketing')) {
        alert('Du benötigst das Marketing-Paket für diese Beratung.');
        return;
    }
    
    // Track appointment booking
    const [date, time] = selectedTime.split(' um ');
    DataTracking.appointments.book(
        userEmail,
        selectedTopic,
        date,
        time,
        notes
    );
    
    // Update service status based on topic
    let serviceType = 'idea';
    if (selectedTopic.toLowerCase().includes('businessplan')) serviceType = 'businessplan';
    else if (selectedTopic.toLowerCase().includes('finanzierung')) serviceType = 'funding';
    
    DataTracking.serviceStatus.update(
        userEmail,
        serviceType,
        'in_progress',
        'Beratungstermin gebucht',
        30
    );
    
    // Simulate booking
    closeModal();
    
    const successContent = `
        <div class="booking-success">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <h3>Termin erfolgreich gebucht!</h3>
            <div class="booking-confirmation">
                <div class="confirmation-item">
                    <strong>Termin:</strong> ${selectedTime}
                </div>
                <div class="confirmation-item">
                    <strong>Art:</strong> ${selectedType}
                </div>
                <div class="confirmation-item">
                    <strong>Thema:</strong> ${selectedTopic}
                </div>
                ${notes ? `<div class="confirmation-item"><strong>Notizen:</strong> ${notes}</div>` : ''}
            </div>
            <p>Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details und dem Zoom-Link.</p>
            <div class="status-actions">
                <button class="btn-primary" onclick="closeModal()">Verstanden</button>
                <button class="btn-secondary" onclick="openChatModal()">Nachricht an Marcel</button>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        showModal('Termin bestätigt', successContent);
    }, 500);
}

// Document Upload Functions
function openDocumentUpload() {
    console.log('Opening document upload modal...');
    const modalContent = `
        <div class="document-upload-modal">
            <div class="upload-header">
                <h3>Dokumente hochladen</h3>
                <p>Lade deine Geschäftsunterlagen hoch, damit wir dir optimal helfen können.</p>
            </div>
            
            <div class="upload-categories">
                <div class="category-tabs">
                    <button class="tab-btn active" onclick="switchUploadCategory('business-idea')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4"/>
                            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                            <path d="M15 6.5c0 1.5-1.5 3-3 3s-3-1.5-3-3 1.5-3 3-3 3 1.5 3 3z"/>
                        </svg>
                        Geschäftsidee
                    </button>
                    <button class="tab-btn" onclick="switchUploadCategory('financials')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="1" x2="12" y2="23"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        Finanzen
                    </button>
                    <button class="tab-btn" onclick="switchUploadCategory('legal')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                        </svg>
                        Rechtliches
                    </button>
                    <button class="tab-btn" onclick="switchUploadCategory('other')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                        Sonstiges
                    </button>
                </div>
            </div>
            
            <div class="upload-content">
                <div class="upload-category active" id="business-idea">
                    <h4>Geschäftsidee & Konzept</h4>
                    <p>Pitch Deck, Geschäftskonzept, Produktbeschreibung, Zielgruppenanalyse</p>
                    <div class="upload-zone" onclick="triggerFileInput('business-idea-files')">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p>Dateien hier ablegen oder <span class="upload-link">durchsuchen</span></p>
                        <small>PDF, DOC, PPT - max. 10MB pro Datei</small>
                    </div>
                    <input type="file" id="business-idea-files" multiple accept=".pdf,.doc,.docx,.ppt,.pptx" style="display: none;" onchange="handleFileSelect(event, 'business-idea')">
                    <div class="uploaded-files" id="business-idea-uploaded"></div>
                </div>
                
                <div class="upload-category" id="financials">
                    <h4>Finanzielle Unterlagen</h4>
                    <p>Finanzplan, Umsatzprognose, Kostenaufstellung, Eigenkapitalnachweis</p>
                    <div class="upload-zone" onclick="triggerFileInput('financials-files')">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p>Dateien hier ablegen oder <span class="upload-link">durchsuchen</span></p>
                        <small>PDF, XLS, DOC - max. 10MB pro Datei</small>
                    </div>
                    <input type="file" id="financials-files" multiple accept=".pdf,.xls,.xlsx,.doc,.docx" style="display: none;" onchange="handleFileSelect(event, 'financials')">
                    <div class="uploaded-files" id="financials-uploaded"></div>
                </div>
                
                <div class="upload-category" id="legal">
                    <h4>Rechtliche Dokumente</h4>
                    <p>Gesellschaftsvertrag, Handelsregisterauszug, Verträge, Lizenzen</p>
                    <div class="upload-zone" onclick="triggerFileInput('legal-files')">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p>Dateien hier ablegen oder <span class="upload-link">durchsuchen</span></p>
                        <small>PDF, DOC - max. 10MB pro Datei</small>
                    </div>
                    <input type="file" id="legal-files" multiple accept=".pdf,.doc,.docx" style="display: none;" onchange="handleFileSelect(event, 'legal')">
                    <div class="uploaded-files" id="legal-uploaded"></div>
                </div>
                
                <div class="upload-category" id="other">
                    <h4>Sonstige Dokumente</h4>
                    <p>Referenzen, Zertifikate, Marktanalysen, Prototypen</p>
                    <div class="upload-zone" onclick="triggerFileInput('other-files')">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p>Dateien hier ablegen oder <span class="upload-link">durchsuchen</span></p>
                        <small>PDF, DOC, JPG, PNG - max. 10MB pro Datei</small>
                    </div>
                    <input type="file" id="other-files" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" style="display: none;" onchange="handleFileSelect(event, 'other')">
                    <div class="uploaded-files" id="other-uploaded"></div>
                </div>
            </div>
            
            <div class="upload-actions">
                <button class="btn-secondary" onclick="closeModal()">Später</button>
                <button class="btn-primary" onclick="submitDocuments()">Dokumente übermitteln</button>
            </div>
        </div>
    `;
    showModal('Dokumente hochladen', modalContent);
}

function switchUploadCategory(category) {
    // Update tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="switchUploadCategory('${category}')"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.upload-category').forEach(cat => cat.classList.remove('active'));
    document.getElementById(category).classList.add('active');
}

function triggerFileInput(inputId) {
    document.getElementById(inputId).click();
}

function handleFileSelect(event, category) {
    const files = event.target.files;
    const uploadedContainer = document.getElementById(category + '-uploaded');
    
    for (let file of files) {
        // Validate file size (10MB = 10 * 1024 * 1024 bytes)
        if (file.size > 10 * 1024 * 1024) {
            alert(`Datei "${file.name}" ist zu groß. Maximum: 10MB`);
            continue;
        }
        
        // Create file item
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
                <div class="file-details">
                    <span class="file-name">${file.name}</span>
                    <span class="file-size">${formatFileSize(file.size)}</span>
                </div>
            </div>
            <button class="remove-file" onclick="removeFile(this)">×</button>
        `;
        
        uploadedContainer.appendChild(fileItem);
    }
    
    // Clear input for next selection
    event.target.value = '';
}

function removeFile(button) {
    button.parentElement.remove();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function submitDocuments() {
    const uploadedFiles = document.querySelectorAll('.file-item');
    if (uploadedFiles.length === 0) {
        alert('Bitte wähle mindestens eine Datei aus.');
        return;
    }
    
    // Get current user email
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    const userEmail = onboardingData.email || 'user@example.com';
    
    // Get active category
    const activeCategory = document.querySelector('.tab-btn.active').getAttribute('data-category') || 'other';
    
    // Track each uploaded document
    const uploadedFilesList = window.currentUploadedFiles || [];
    uploadedFilesList.forEach(file => {
        DataTracking.documents.upload(userEmail, activeCategory, file);
    });
    
    // Track communication
    DataTracking.communications.add(
        userEmail,
        'appointment_note',
        'user_to_advisor',
        `${uploadedFiles.length} Dokument(e) hochgeladen in Kategorie: ${activeCategory}`,
        uploadedFilesList.map(f => f.name)
    );
    
    // Update service status based on category
    let serviceType = 'idea';
    if (activeCategory === 'businessplan') serviceType = 'businessplan';
    else if (activeCategory === 'financial') serviceType = 'funding';
    
    DataTracking.serviceStatus.update(
        userEmail,
        serviceType,
        'in_progress',
        'Dokumente eingereicht',
        20
    );
    
    // Simulate upload
    const uploadCount = uploadedFiles.length;
    closeModal();
    
    // Show success message
    const successContent = `
        <div class="upload-success">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <h3>Dokumente erfolgreich hochgeladen!</h3>
            <p>${uploadCount} Datei(en) wurden an Marcel weitergeleitet.</p>
            <p>Du erhältst in Kürze eine Bestätigung und weitere Informationen.</p>
            <div class="status-actions">
                <button class="btn-primary" onclick="closeModal()">Verstanden</button>
                <button class="btn-secondary" onclick="openChatModal()">Nachricht an Marcel</button>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        showModal('Upload erfolgreich', successContent);
    }, 500);
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
window.openDocumentUpload = openDocumentUpload;
window.openCalendarModal = openCalendarModal;
window.switchUploadCategory = switchUploadCategory;
window.switchBookingTab = switchBookingTab;
window.selectTimeSlot = selectTimeSlot;
window.updateBookingButton = updateBookingButton;
window.confirmBooking = confirmBooking;
window.triggerFileInput = triggerFileInput;
window.handleFileSelect = handleFileSelect;
window.removeFile = removeFile;
window.submitDocuments = submitDocuments;
window.showModal = showModal;
window.closeModal = closeModal;
window.sendMessage = sendMessage;
window.scheduleConsultation = scheduleConsultation;
window.updateServiceStatus = updateServiceStatus;
window.updateAdvisorStatus = updateAdvisorStatus;
window.updateNextSteps = updateNextSteps;
window.updateServiceCard = updateServiceCard;
window.refreshServiceData = refreshServiceData;