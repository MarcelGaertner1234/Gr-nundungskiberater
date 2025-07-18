// Admin Communication System - Comprehensive user communication management for administrators

// Global state
let currentTab = 'messages';
let currentFilter = 'all';
let messages = [];
let notifications = [];
let filteredMessages = [];
let filteredNotifications = [];

// Mock message data for demonstration
const mockMessages = [
    {
        id: 'msg-001',
        from: {
            id: 'user-001',
            name: 'Marcel Gärtner',
            email: 'marcel@example.com',
            initials: 'MG'
        },
        subject: 'Frage zur Finanzierungsberatung',
        message: 'Hallo, ich hätte eine Frage bezüglich der verschiedenen Finanzierungsmöglichkeiten für mein Start-up. Können Sie mir dabei helfen?',
        priority: 'normal',
        status: 'unread',
        timestamp: '2024-08-18T09:30:00Z',
        category: 'financing',
        urgent: false
    },
    {
        id: 'msg-002',
        from: {
            id: 'user-002',
            name: 'Anna Schmidt',
            email: 'anna@startup.com',
            initials: 'AS'
        },
        subject: 'Terminverschiebung erforderlich',
        message: 'Liebe Beratung, ich muss leider meinen Termin am Montag verschieben. Haben Sie einen alternativen Termin verfügbar?',
        priority: 'high',
        status: 'unread',
        timestamp: '2024-08-18T08:15:00Z',
        category: 'appointment',
        urgent: false
    },
    {
        id: 'msg-003',
        from: {
            id: 'user-003',
            name: 'Thomas Mueller',
            email: 'thomas@business.de',
            initials: 'TM'
        },
        subject: 'DRINGEND: Businessplan Review',
        message: 'Hallo, ich benötige dringend eine Überprüfung meines Businessplans vor dem Banktermin morgen. Ist das möglich?',
        priority: 'urgent',
        status: 'unread',
        timestamp: '2024-08-18T07:45:00Z',
        category: 'business-plan',
        urgent: true
    },
    {
        id: 'msg-004',
        from: {
            id: 'user-004',
            name: 'Lisa Weber',
            email: 'lisa@innovation.com',
            initials: 'LW'
        },
        subject: 'Danke für die Beratung',
        message: 'Vielen Dank für die ausgezeichnete Finanzierungsberatung. Die Informationen waren sehr hilfreich.',
        priority: 'normal',
        status: 'read',
        timestamp: '2024-08-17T16:20:00Z',
        category: 'feedback',
        urgent: false
    },
    {
        id: 'msg-005',
        from: {
            id: 'user-005',
            name: 'Robert Klein',
            email: 'robert@venture.de',
            initials: 'RK'
        },
        subject: 'Stornierung und Rückfrage',
        message: 'Ich musste meinen Termin stornieren. Gibt es Möglichkeiten für eine Online-Beratung?',
        priority: 'normal',
        status: 'read',
        timestamp: '2024-08-17T14:10:00Z',
        category: 'cancellation',
        urgent: false
    }
];

// Mock notification data
const mockNotifications = [
    {
        id: 'notif-001',
        type: 'info',
        title: 'Neuer Nutzer registriert',
        message: 'Marcel Gärtner hat sich soeben registriert und benötigt eine Erstberatung.',
        timestamp: '2024-08-18T10:15:00Z',
        status: 'unread',
        category: 'user-registration'
    },
    {
        id: 'notif-002',
        type: 'warning',
        title: 'Termin steht noch aus',
        message: 'Der Termin mit Anna Schmidt am 18.08. um 16:00 wurde noch nicht bestätigt.',
        timestamp: '2024-08-18T09:00:00Z',
        status: 'unread',
        category: 'appointment-reminder'
    },
    {
        id: 'notif-003',
        type: 'success',
        title: 'Zahlung eingegangen',
        message: 'Premium-Paket Zahlung von Thomas Mueller wurde erfolgreich verarbeitet.',
        timestamp: '2024-08-18T08:30:00Z',
        status: 'read',
        category: 'payment'
    },
    {
        id: 'notif-004',
        type: 'error',
        title: 'Systemfehler',
        message: 'Fehler beim Export der Businessplan-Vorlage. IT-Team wurde benachrichtigt.',
        timestamp: '2024-08-17T15:45:00Z',
        status: 'read',
        category: 'system-error'
    },
    {
        id: 'notif-005',
        type: 'info',
        title: 'Automatisches Backup',
        message: 'Tägliches Backup aller Nutzerdaten wurde erfolgreich abgeschlossen.',
        timestamp: '2024-08-17T03:00:00Z',
        status: 'read',
        category: 'system'
    }
];

// Message categories configuration
const messageCategories = {
    'financing': {
        name: 'Finanzierung',
        icon: '💰',
        color: '#10b981'
    },
    'appointment': {
        name: 'Termine',
        icon: '📅',
        color: '#3b82f6'
    },
    'business-plan': {
        name: 'Businessplan',
        icon: '📊',
        color: '#8b5cf6'
    },
    'feedback': {
        name: 'Feedback',
        icon: '⭐',
        color: '#10b981'
    },
    'cancellation': {
        name: 'Stornierung',
        icon: '❌',
        color: '#ef4444'
    },
    'support': {
        name: 'Support',
        icon: '🛠️',
        color: '#f59e0b'
    }
};

// Notification types configuration
const notificationTypes = {
    'info': {
        icon: 'ℹ️',
        className: 'info'
    },
    'success': {
        icon: '✅',
        className: 'success'
    },
    'warning': {
        icon: '⚠️',
        className: 'warning'
    },
    'error': {
        icon: '❌',
        className: 'error'
    }
};

// Initialize Admin Communication
function initializeAdminCommunication() {
    console.log('Initializing Admin Communication...');
    
    // Load communications from database if available
    if (window.db) {
        loadCommunicationsFromDatabase();
    } else {
        messages = [];
        notifications = [];
    }
    filteredMessages = [...messages];
    filteredNotifications = [...notifications];
    
    // Initialize view
    updateCommunicationDisplay();
    updateCommunicationStats();
    
    // Set up event listeners
    setupCommunicationEventListeners();
    
    console.log('Admin Communication initialized with', messages.length, 'messages and', notifications.length, 'notifications');
}

// Load communications from database
async function loadCommunicationsFromDatabase() {
    try {
        const communicationsData = await window.db.find('communications');
        const messagesData = communicationsData.data.filter(c => c.type === 'message') || [];
        const notificationsData = communicationsData.data.filter(c => c.type === 'notification') || [];
        
        messages = messagesData;
        notifications = notificationsData;
        filteredMessages = [...messages];
        filteredNotifications = [...notifications];
        
        // Update display after loading
        loadCommunicationData();
        updateCommunicationStats();
    } catch (error) {
        console.error('Error loading communications from database:', error);
        messages = [];
        notifications = [];
        filteredMessages = [];
        filteredNotifications = [];
    }
}

// Set up event listeners
function setupCommunicationEventListeners() {
    // Tab switching
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('admin-communication-tab')) {
            switchCommunicationTab(e.target.dataset.tab);
        }
        
        if (e.target.classList.contains('communication-filter-btn')) {
            toggleCommunicationFilter(e.target.dataset.filter);
        }
        
        if (e.target.classList.contains('admin-message-item')) {
            const messageId = e.target.dataset.messageId;
            if (messageId) {
                openMessage(messageId);
            }
        }
        
        if (e.target.classList.contains('admin-message-action-btn')) {
            const action = e.target.dataset.action;
            const messageId = e.target.closest('.admin-message-item').dataset.messageId;
            handleMessageAction(action, messageId);
        }
    });
    
    // Form submission
    const composerForm = document.getElementById('adminComposerForm');
    if (composerForm) {
        composerForm.addEventListener('submit', handleMessageCompose);
    }
}

// Switch communication tab (messages/notifications)
function switchCommunicationTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.admin-communication-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    updateCommunicationDisplay();
}

// Toggle communication filter
function toggleCommunicationFilter(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    document.querySelectorAll('.communication-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    // Filter data based on current tab
    if (currentTab === 'messages') {
        filterMessages();
    } else {
        filterNotifications();
    }
    
    updateCommunicationDisplay();
    updateCommunicationStats();
}

// Filter messages based on current filter
function filterMessages() {
    if (currentFilter === 'all') {
        filteredMessages = [...messages];
    } else {
        filteredMessages = messages.filter(message => {
            switch (currentFilter) {
                case 'unread':
                    return message.status === 'unread';
                case 'urgent':
                    return message.priority === 'urgent' || message.urgent;
                case 'recent':
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    return new Date(message.timestamp) >= yesterday;
                case 'financing':
                    return message.category === 'financing';
                case 'appointments':
                    return message.category === 'appointment';
                default:
                    return true;
            }
        });
    }
}

// Filter notifications based on current filter
function filterNotifications() {
    if (currentFilter === 'all') {
        filteredNotifications = [...notifications];
    } else {
        filteredNotifications = notifications.filter(notification => {
            switch (currentFilter) {
                case 'unread':
                    return notification.status === 'unread';
                case 'urgent':
                    return notification.type === 'error' || notification.type === 'warning';
                case 'recent':
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    return new Date(notification.timestamp) >= yesterday;
                case 'system':
                    return notification.category.includes('system');
                default:
                    return true;
            }
        });
    }
}

// Update communication display based on current tab
function updateCommunicationDisplay() {
    const messagesContainer = document.getElementById('adminMessagesContainer');
    const notificationsContainer = document.getElementById('adminNotificationsContainer');
    
    if (currentTab === 'messages') {
        if (messagesContainer) {
            messagesContainer.style.display = 'block';
            renderMessagesList();
        }
        if (notificationsContainer) {
            notificationsContainer.style.display = 'none';
        }
    } else {
        if (messagesContainer) {
            messagesContainer.style.display = 'none';
        }
        if (notificationsContainer) {
            notificationsContainer.style.display = 'block';
            renderNotificationsList();
        }
    }
}

// Render messages list
function renderMessagesList() {
    const container = document.getElementById('adminMessagesContainer');
    if (!container) return;
    
    if (filteredMessages.length === 0) {
        container.innerHTML = `
            <div class="admin-communication-empty">
                <div class="admin-communication-empty-icon">📭</div>
                <div class="admin-communication-empty-title">Keine Nachrichten</div>
                <div class="admin-communication-empty-text">Es sind keine Nachrichten vorhanden, die den aktuellen Filterkriterien entsprechen.</div>
            </div>
        `;
        return;
    }
    
    // Sort messages by timestamp (newest first)
    const sortedMessages = filteredMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    container.innerHTML = sortedMessages.map(message => createMessageElement(message)).join('');
}

// Create message element
function createMessageElement(message) {
    const categoryInfo = messageCategories[message.category] || {};
    const timeAgo = getTimeAgo(new Date(message.timestamp));
    
    return `
        <div class="admin-message-item ${message.status} ${message.urgent ? 'urgent' : ''}" data-message-id="${message.id}">
            ${message.priority === 'urgent' ? '<div class="admin-message-priority-indicator urgent"></div>' : ''}
            ${message.priority === 'high' ? '<div class="admin-message-priority-indicator high"></div>' : ''}
            
            <div class="admin-message-header">
                <div class="admin-message-sender">
                    <div class="admin-message-avatar">${message.from.initials}</div>
                    <div class="admin-message-sender-info">
                        <div class="admin-message-sender-name">${message.from.name}</div>
                        <div class="admin-message-sender-email">${message.from.email}</div>
                    </div>
                </div>
                
                <div class="admin-message-meta">
                    <div class="admin-message-time">${timeAgo}</div>
                    <div class="admin-message-priority ${message.priority}">${getPriorityLabel(message.priority)}</div>
                </div>
            </div>
            
            <div class="admin-message-subject">${categoryInfo.icon || '📧'} ${message.subject}</div>
            <div class="admin-message-preview">${message.message.substring(0, 150)}${message.message.length > 150 ? '...' : ''}</div>
            
            <div class="admin-message-actions">
                <button class="admin-message-action-btn" data-action="reply" title="Antworten">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
                <button class="admin-message-action-btn" data-action="forward" title="Weiterleiten">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 2L11 13"></path>
                        <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                </button>
                <button class="admin-message-action-btn" data-action="archive" title="Archivieren">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 8v13H3V8"></path>
                        <path d="M1 3h22v5H1z"></path>
                        <line x1="10" y1="12" x2="14" y2="12"></line>
                    </svg>
                </button>
                <button class="admin-message-action-btn" data-action="delete" title="Löschen">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// Render notifications list
function renderNotificationsList() {
    const container = document.getElementById('adminNotificationsContainer');
    if (!container) return;
    
    if (filteredNotifications.length === 0) {
        container.innerHTML = `
            <div class="admin-communication-empty">
                <div class="admin-communication-empty-icon">🔔</div>
                <div class="admin-communication-empty-title">Keine Benachrichtigungen</div>
                <div class="admin-communication-empty-text">Es sind keine Benachrichtigungen vorhanden, die den aktuellen Filterkriterien entsprechen.</div>
            </div>
        `;
        return;
    }
    
    // Sort notifications by timestamp (newest first)
    const sortedNotifications = filteredNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    container.innerHTML = sortedNotifications.map(notification => createNotificationElement(notification)).join('');
}

// Create notification element
function createNotificationElement(notification) {
    const typeInfo = notificationTypes[notification.type] || {};
    const timeAgo = getTimeAgo(new Date(notification.timestamp));
    
    return `
        <div class="admin-notification-item ${notification.status}" data-notification-id="${notification.id}">
            <div class="admin-notification-icon ${typeInfo.className}">
                ${typeInfo.icon}
            </div>
            <div class="admin-notification-content">
                <div class="admin-notification-title">${notification.title}</div>
                <div class="admin-notification-message">${notification.message}</div>
                <div class="admin-notification-time">${timeAgo}</div>
            </div>
        </div>
    `;
}

// Update communication statistics
function updateCommunicationStats() {
    const unreadMessages = messages.filter(msg => msg.status === 'unread').length;
    const urgentMessages = messages.filter(msg => msg.priority === 'urgent' || msg.urgent).length;
    const unreadNotifications = notifications.filter(notif => notif.status === 'unread').length;
    const totalCommunications = messages.length + notifications.length;
    
    // Update stat elements
    updateStatElement('adminCommunicationUnreadCount', unreadMessages);
    updateStatElement('adminCommunicationUrgentCount', urgentMessages);
    updateStatElement('adminCommunicationNotificationsCount', unreadNotifications);
    updateStatElement('adminCommunicationTotalCount', totalCommunications);
}

// Helper function to update stat elements
function updateStatElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

// Get priority label
function getPriorityLabel(priority) {
    switch (priority) {
        case 'urgent':
            return 'Dringend';
        case 'high':
            return 'Hoch';
        case 'normal':
        default:
            return 'Normal';
    }
}

// Get time ago string
function getTimeAgo(date) {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Gerade eben';
    if (diffInMinutes < 60) return `vor ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `vor ${diffInHours} h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `vor ${diffInDays} Tag${diffInDays > 1 ? 'en' : ''}`;
    
    return date.toLocaleDateString('de-DE');
}

// Open message details
function openMessage(messageId) {
    const message = messages.find(msg => msg.id === messageId);
    if (!message) return;
    
    // Mark as read
    if (message.status === 'unread') {
        message.status = 'read';
        updateCommunicationDisplay();
        updateCommunicationStats();
    }
    
    // Show message details (would open a modal in real implementation)
    console.log('Opening message:', message.subject);
    alert(`Nachricht: ${message.subject}\nVon: ${message.from.name}\n\n${message.message}`);
}

// Handle message actions
function handleMessageAction(action, messageId) {
    const message = messages.find(msg => msg.id === messageId);
    if (!message) return;
    
    console.log(`Handling action: ${action} for message: ${messageId}`);
    
    LoadingStates?.showButtonLoading?.(event.target, action);
    
    setTimeout(() => {
        switch (action) {
            case 'reply':
                openComposer('reply', message);
                break;
            case 'forward':
                openComposer('forward', message);
                break;
            case 'archive':
                archiveMessage(messageId);
                break;
            case 'delete':
                deleteMessage(messageId);
                break;
        }
        
        LoadingStates?.hideButtonLoading?.(event.target);
    }, 1000);
}

// Open message composer
function openComposer(type, replyToMessage = null) {
    const composerContainer = document.getElementById('adminCommunicationComposer');
    if (!composerContainer) return;
    
    // Show composer
    composerContainer.style.display = 'block';
    
    // Pre-fill fields if replying
    if (type === 'reply' && replyToMessage) {
        const subjectField = document.getElementById('composerSubject');
        const recipientField = document.getElementById('composerRecipient');
        
        if (subjectField) {
            subjectField.value = `Re: ${replyToMessage.subject}`;
        }
        if (recipientField) {
            recipientField.value = replyToMessage.from.email;
        }
    }
    
    console.log(`Opening composer for: ${type}`);
}

// Handle message compose
function handleMessageCompose(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const messageData = {
        recipient: formData.get('recipient'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        priority: formData.get('priority'),
        sendCopy: formData.get('sendCopy') === 'on',
        scheduleDelivery: formData.get('scheduleDelivery') === 'on'
    };
    
    console.log('Composing message:', messageData);
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    LoadingStates?.showButtonLoading?.(submitButton, 'Senden');
    
    setTimeout(() => {
        // Simulate sending
        alert('Nachricht wurde gesendet!');
        
        // Clear form
        event.target.reset();
        
        // Hide composer
        const composerContainer = document.getElementById('adminCommunicationComposer');
        if (composerContainer) {
            composerContainer.style.display = 'none';
        }
        
        LoadingStates?.hideButtonLoading?.(submitButton);
    }, 2000);
}

// Archive message
function archiveMessage(messageId) {
    console.log('Archiving message:', messageId);
    // In real implementation, would move to archive
    alert('Nachricht wurde archiviert.');
}

// Delete message
function deleteMessage(messageId) {
    if (!confirm('Möchten Sie diese Nachricht wirklich löschen?')) {
        return;
    }
    
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex > -1) {
        messages.splice(messageIndex, 1);
        filterMessages();
        updateCommunicationDisplay();
        updateCommunicationStats();
    }
    
    console.log('Deleted message:', messageId);
}

// Quick action functions
function markAllAsRead() {
    console.log('Marking all as read...');
    
    LoadingStates?.showButtonLoading?.(event.target, 'Markieren');
    
    setTimeout(() => {
        if (currentTab === 'messages') {
            messages.forEach(msg => msg.status = 'read');
        } else {
            notifications.forEach(notif => notif.status = 'read');
        }
        
        updateCommunicationDisplay();
        updateCommunicationStats();
        
        LoadingStates?.hideButtonLoading?.(event.target);
        alert('Alle als gelesen markiert.');
    }, 1500);
}

function exportCommunications() {
    console.log('Exporting communications...');
    
    LoadingStates?.showButtonLoading?.(event.target, 'Export');
    
    setTimeout(() => {
        const csvContent = generateCommunicationsCSV();
        downloadCSV(csvContent, `communications-export-${new Date().toISOString().split('T')[0]}.csv`);
        
        LoadingStates?.hideButtonLoading?.(event.target);
    }, 2000);
}

// Generate CSV content for communications export
function generateCommunicationsCSV() {
    const headers = ['Typ', 'Von', 'E-Mail', 'Betreff', 'Priorität', 'Status', 'Kategorie', 'Datum'];
    const rows = [];
    
    // Add messages
    messages.forEach(message => {
        rows.push([
            'Nachricht',
            message.from.name,
            message.from.email,
            message.subject,
            getPriorityLabel(message.priority),
            message.status === 'read' ? 'Gelesen' : 'Ungelesen',
            messageCategories[message.category]?.name || message.category,
            new Date(message.timestamp).toLocaleDateString('de-DE')
        ]);
    });
    
    // Add notifications
    notifications.forEach(notification => {
        rows.push([
            'Benachrichtigung',
            'System',
            'system@ki-konzept-builder.de',
            notification.title,
            notification.type === 'error' ? 'Dringend' : 'Normal',
            notification.status === 'read' ? 'Gelesen' : 'Ungelesen',
            notification.category,
            new Date(notification.timestamp).toLocaleDateString('de-DE')
        ]);
    });
    
    return [headers, ...rows].map(row => 
        row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
}

// Download CSV file
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function refreshCommunications() {
    console.log('Refreshing communications...');
    
    LoadingStates?.showButtonLoading?.(event.target, 'Aktualisieren');
    
    setTimeout(() => {
        // In real implementation, would fetch from server
        updateCommunicationDisplay();
        updateCommunicationStats();
        
        LoadingStates?.hideButtonLoading?.(event.target);
        alert('Kommunikation wurde aktualisiert.');
    }, 1500);
}

// Global exports for admin communication
window.AdminCommunication = {
    initialize: initializeAdminCommunication,
    switchTab: switchCommunicationTab,
    toggleFilter: toggleCommunicationFilter,
    openMessage,
    openComposer,
    markAllAsRead,
    exportCommunications,
    refreshCommunications
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdminCommunication);
} else {
    initializeAdminCommunication();
}