/**
 * Admin Dashboard Database Integration
 * Extends the admin dashboard with database functionality
 */

// Override the original loadDashboardData function
const originalLoadDashboardData = window.loadDashboardData;

window.loadDashboardData = async function() {
    if (window.db) {
        // Load analytics from database
        const analytics = await window.db.getAnalytics();
        await updateDashboardWithDbData(analytics);
    } else {
        // Fallback to original function
        if (originalLoadDashboardData) {
            originalLoadDashboardData();
        }
    }
};

// Update dashboard with database data
async function updateDashboardWithDbData(analytics) {
    // Update user stats
    const activeUsersCount = document.getElementById('activeUsersCount');
    if (activeUsersCount) {
        activeUsersCount.textContent = analytics.users.total;
    }
    
    // Update revenue stats
    const totalRevenue = document.getElementById('totalRevenue');
    if (totalRevenue) {
        totalRevenue.textContent = '€ ' + (analytics.payments.total_revenue / 100).toLocaleString('de-DE');
    }
    
    // Update conversion rate
    const conversionRate = document.getElementById('conversionRate');
    if (conversionRate) {
        const rate = analytics.users.total > 0 
            ? Math.round((analytics.users.completed_onboarding / analytics.users.total) * 100) 
            : 0;
        conversionRate.textContent = rate + '%';
    }
    
    // Update pending count
    const pendingCount = document.getElementById('pendingCount');
    if (pendingCount) {
        const pendingUsers = analytics.users.total - analytics.users.completed_onboarding;
        pendingCount.textContent = pendingUsers;
    }
    
    // Update today's appointments
    await updateTodayAppointments();
    
    // Update recent activities
    await updateRecentActivitiesFromDb();
}

// Update today's appointments from database
async function updateTodayAppointments() {
    if (!window.db) return;
    
    const today = new Date().toISOString().split('T')[0];
    const appointments = await window.db.find('appointments', {
        date: { $gte: today + 'T00:00:00', $lte: today + 'T23:59:59' }
    });
    
    const todayAppointmentsCount = document.getElementById('todayAppointmentsCount');
    if (todayAppointmentsCount) {
        todayAppointmentsCount.textContent = appointments.data.length;
    }
}

// Update recent activities from database
async function updateRecentActivitiesFromDb() {
    const activityLog = JSON.parse(localStorage.getItem('db_activity_log') || '[]');
    const recentActivities = activityLog.slice(-10).reverse();
    
    const recentActivityList = document.getElementById('recentActivityList');
    if (recentActivityList && recentActivities.length > 0) {
        recentActivityList.innerHTML = recentActivities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${getActivityIconClass(activity.action)}">
                    ${getActivityIcon(activity.action)}
                </div>
                <div class="activity-content">
                    <p>${formatActivityMessage(activity)}</p>
                    <span class="activity-time">${formatRelativeTime(activity.timestamp)}</span>
                </div>
            </div>
        `).join('');
    }
}

// Override loadUsersData
const originalLoadUsersData = window.loadUsersData;

window.loadUsersData = async function() {
    if (window.db) {
        const users = await window.db.find('users');
        const onboarding = await window.db.find('onboarding');
        
        // Combine user and onboarding data
        const combinedUsers = users.data.map(user => {
            const userOnboarding = onboarding.data.find(o => o.email === user.email);
            return {
                ...user,
                profile: userOnboarding?.profile || 'unknown',
                idea: userOnboarding?.idea || '',
                timeline: userOnboarding?.timeline || '',
                consulting_services: userOnboarding?.consulting_services || [],
                onboarding_completed: userOnboarding?.completed || false
            };
        });
        
        displayUsersFromDb(combinedUsers);
    } else if (originalLoadUsersData) {
        originalLoadUsersData();
    }
};

// Display users from database
function displayUsersFromDb(users) {
    const usersList = document.getElementById('usersList');
    if (!usersList) return;
    
    if (users.length === 0) {
        usersList.innerHTML = '<p class="no-data">Keine Nutzer vorhanden</p>';
        return;
    }
    
    usersList.innerHTML = users.map(user => `
        <div class="user-item">
            <div class="user-avatar">${user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
            <div class="user-info">
                <h4>${user.name || 'Unbekannt'}</h4>
                <p>${user.email}</p>
                <div class="user-meta">
                    <span>Profil: ${formatProfile(user.profile)}</span>
                    ${user.idea ? `<span>• Idee: ${user.idea.substring(0, 50)}...</span>` : ''}
                </div>
            </div>
            <div class="user-status">
                <span class="status-badge ${user.onboarding_completed ? 'status-active' : 'status-new'}">
                    ${user.onboarding_completed ? 'Aktiv' : 'Neu'}
                </span>
            </div>
            <div class="user-services">
                ${user.consulting_services.length > 0 
                    ? user.consulting_services.map(s => `<span class="service-tag">${formatServiceName(s)}</span>`).join('')
                    : '<span class="no-services">Keine Services</span>'
                }
            </div>
            <div class="user-actions">
                <button class="btn btn-secondary btn-sm" onclick="viewUserDetailsFromDb('${user.id}')">
                    Details
                </button>
                <button class="btn btn-primary btn-sm" onclick="sendEmailToUser('${user.email}')">
                    E-Mail
                </button>
            </div>
        </div>
    `).join('');
}

// View user details from database
window.viewUserDetailsFromDb = async function(userId) {
    const userResult = await window.db.findById('users', userId);
    if (!userResult.success || !userResult.data) {
        alert('Nutzer nicht gefunden');
        return;
    }
    
    const user = userResult.data;
    
    // Create modal with user details
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Nutzer Details</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h4>Persönliche Daten</h4>
                    <p><strong>Name:</strong> ${user.name || 'Nicht angegeben'}</p>
                    <p><strong>E-Mail:</strong> ${user.email}</p>
                    <p><strong>Registriert:</strong> ${new Date(user.created_at).toLocaleDateString('de-DE')}</p>
                </div>
                
                <div class="detail-section">
                    <h4>Onboarding Status</h4>
                    <div id="userOnboardingDetails">Lade...</div>
                </div>
                
                <div class="detail-section">
                    <h4>Services & Zahlungen</h4>
                    <div id="userPaymentDetails">Lade...</div>
                </div>
                
                <div class="detail-section">
                    <h4>Aktivitäten</h4>
                    <div id="userActivityDetails">Lade...</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Load additional details
    loadUserOnboardingDetails(user.email);
    loadUserPaymentDetails(user.email);
    loadUserActivityDetails(userId);
};

// Load user onboarding details
async function loadUserOnboardingDetails(email) {
    const onboarding = await window.db.find('onboarding', { email });
    const container = document.getElementById('userOnboardingDetails');
    
    if (onboarding.data.length === 0) {
        container.innerHTML = '<p>Kein Onboarding abgeschlossen</p>';
        return;
    }
    
    const data = onboarding.data[0];
    container.innerHTML = `
        <p><strong>Profil:</strong> ${formatProfile(data.profile)}</p>
        <p><strong>Geschäftsidee:</strong> ${data.idea || 'Nicht angegeben'}</p>
        <p><strong>Zeitplan:</strong> ${formatTimeline(data.timeline)}</p>
        <p><strong>Services:</strong></p>
        <div class="service-list">
            ${data.consulting_services.map(s => `<span class="service-tag">${formatServiceName(s)}</span>`).join('')}
        </div>
        <p><strong>Abgeschlossen:</strong> ${new Date(data.completed_at).toLocaleDateString('de-DE')}</p>
    `;
}

// Load user payment details
async function loadUserPaymentDetails(email) {
    const payments = await window.db.find('payments', { email });
    const container = document.getElementById('userPaymentDetails');
    
    if (payments.data.length === 0) {
        container.innerHTML = '<p>Keine Zahlungen vorhanden</p>';
        return;
    }
    
    const totalRevenue = payments.data
        .filter(p => p.status === 'succeeded')
        .reduce((sum, p) => sum + p.amount, 0);
    
    container.innerHTML = `
        <p><strong>Gesamtumsatz:</strong> € ${(totalRevenue / 100).toLocaleString('de-DE')}</p>
        <div class="payment-list">
            ${payments.data.map(p => `
                <div class="payment-item">
                    <span>${formatServiceName(p.service_type)}</span>
                    <span>€ ${(p.amount / 100).toLocaleString('de-DE')}</span>
                    <span class="status-badge status-${p.status}">${p.status}</span>
                    <span>${new Date(p.created_at).toLocaleDateString('de-DE')}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Load user activity details
async function loadUserActivityDetails(userId) {
    const activityLog = JSON.parse(localStorage.getItem('db_activity_log') || '[]');
    const userActivities = activityLog
        .filter(a => a.record_id === userId || a.user === userId)
        .slice(-10)
        .reverse();
    
    const container = document.getElementById('userActivityDetails');
    
    if (userActivities.length === 0) {
        container.innerHTML = '<p>Keine Aktivitäten vorhanden</p>';
        return;
    }
    
    container.innerHTML = userActivities.map(activity => `
        <div class="activity-item compact">
            <span class="activity-action">${formatActivityAction(activity.action)}</span>
            <span class="activity-collection">${activity.collection}</span>
            <span class="activity-time">${formatRelativeTime(activity.timestamp)}</span>
        </div>
    `).join('');
}

// Helper functions
function formatProfile(profile) {
    const profiles = {
        'founder': 'Gründer',
        'consultant': 'Berater',
        'corporate': 'Unternehmen',
        'unknown': 'Unbekannt'
    };
    return profiles[profile] || profile;
}

function formatTimeline(timeline) {
    const timelines = {
        'sofort': 'Sofort',
        '3months': '3 Monate',
        '6months': '6 Monate',
        'later': 'Später'
    };
    return timelines[timeline] || timeline;
}

function formatServiceName(service) {
    const services = {
        'finanzierung': 'Finanzierung',
        'rechtsform': 'Rechtsform',
        'businessplan': 'Businessplan',
        'marketing': 'Marketing',
        'gesamtpaket': 'Gesamtpaket',
        'webseite': 'Website',
        'software': 'Software',
        'ki_integration': 'KI-Integration',
        'stundenbasis': 'Stundenbasis'
    };
    return services[service] || service;
}

function formatActivityAction(action) {
    const actions = {
        'create': 'Erstellt',
        'update': 'Aktualisiert',
        'delete': 'Gelöscht',
        'read': 'Angesehen'
    };
    return actions[action] || action;
}

function formatActivityMessage(activity) {
    const messages = {
        'create': `Neuer Eintrag in ${activity.collection}`,
        'update': `Aktualisierung in ${activity.collection}`,
        'delete': `Löschung in ${activity.collection}`
    };
    return messages[activity.action] || `${activity.action} in ${activity.collection}`;
}

function getActivityIcon(action) {
    const icons = {
        'create': '+',
        'update': '✎',
        'delete': '×'
    };
    return icons[action] || '•';
}

function getActivityIconClass(action) {
    const classes = {
        'create': 'activity-create',
        'update': 'activity-update',
        'delete': 'activity-delete'
    };
    return classes[action] || '';
}

function formatRelativeTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Gerade eben';
    if (minutes < 60) return `vor ${minutes} Minute${minutes !== 1 ? 'n' : ''}`;
    if (hours < 24) return `vor ${hours} Stunde${hours !== 1 ? 'n' : ''}`;
    if (days < 30) return `vor ${days} Tag${days !== 1 ? 'en' : ''}`;
    
    return date.toLocaleDateString('de-DE');
}

// Export data function for admin
window.exportDatabaseData = async function() {
    if (!window.db) {
        const message = (typeof getI18nText === 'function' ? getI18nText('alerts.admin.database_unavailable') : null) || 'Datenbank-Service nicht verfügbar';
        alert(message);
        return;
    }
    
    const data = await window.db.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ki-konzept-builder-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

// Add export button to admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    const adminHeader = document.querySelector('.admin-header .header-actions');
    if (adminHeader && window.db) {
        const exportButton = document.createElement('button');
        exportButton.className = 'btn btn-secondary btn-sm';
        exportButton.innerHTML = '📥 Daten exportieren';
        exportButton.onclick = exportDatabaseData;
        adminHeader.appendChild(exportButton);
    }
});