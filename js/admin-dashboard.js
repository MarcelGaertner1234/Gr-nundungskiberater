/**
 * Admin Dashboard JavaScript
 * Handles admin functionality and data management
 */

// Sample data for demo purposes
const sampleUsers = [
    {
        id: 1,
        name: 'Max Mustermann',
        email: 'max@example.com',
        status: 'active',
        registered: '2024-01-15',
        hasFirstMeeting: true,
        unlockedPackages: ['businessplan'],
        payments: []
    },
    {
        id: 2,
        name: 'Anna Schmidt',
        email: 'anna@example.com',
        status: 'new',
        registered: '2024-01-20',
        hasFirstMeeting: false,
        unlockedPackages: [],
        payments: []
    },
    {
        id: 3,
        name: 'Tom Weber',
        email: 'tom@example.com',
        status: 'premium',
        registered: '2024-01-10',
        hasFirstMeeting: true,
        unlockedPackages: ['businessplan', 'finanzierung', 'marketing'],
        payments: [
            { package: 'Professional', amount: 700, date: '2024-01-12' }
        ]
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
    loadDashboardData();
    setupEventListeners();
});

// Initialize Admin Dashboard
function initializeAdminDashboard() {
    // Set active nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection(link.dataset.nav);
        });
    });
    
    // Load initial section
    switchSection('overview');
}

// Switch between sections
function switchSection(section) {
    // Update nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.nav === section) {
            link.classList.add('active');
        }
    });
    
    // Update sections
    document.querySelectorAll('.admin-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Load section-specific data
        switch(section) {
            case 'users':
                loadUsersData();
                break;
            case 'appointments':
                loadAppointmentsData();
                break;
            case 'payments':
                loadPaymentsData();
                break;
            case 'analytics':
                loadAnalyticsData();
                break;
            case 'cancellations':
                if (window.AdminCancellations) {
                    window.AdminCancellations.initializeAdminCancellations();
                }
                break;
        }
    }
}

// Load Dashboard Overview Data
function loadDashboardData() {
    // Update stats
    document.getElementById('activeUsersCount').textContent = sampleUsers.length;
    document.getElementById('todayAppointmentsCount').textContent = '3';
    document.getElementById('pendingCount').textContent = sampleUsers.filter(u => u.status === 'new').length;
    
    // Load recent activities
    loadRecentActivities();
}

// Load Recent Activities
function loadRecentActivities() {
    const activitiesList = document.getElementById('activitiesList');
    
    const activities = [
        {
            type: 'new-user',
            title: 'Neuer Nutzer',
            description: 'Anna Schmidt hat sich registriert',
            time: 'vor 5 Minuten'
        },
        {
            type: 'new-appointment',
            title: 'Termin gebucht',
            description: 'Max Mustermann - Businessplan-Beratung',
            time: 'vor 2 Stunden'
        },
        {
            type: 'new-payment',
            title: 'Zahlung erhalten',
            description: 'Tom Weber - Professional Paket (€700)',
            time: 'vor 1 Tag'
        }
    ];
    
    const activitiesHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                ${getActivityIcon(activity.type)}
            </div>
            <div class="activity-content">
                <p><strong>${activity.title}</strong> ${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
    
    activitiesList.innerHTML = activitiesHTML;
}

// Get Activity Icon
function getActivityIcon(type) {
    const icons = {
        'new-user': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>`,
        'new-appointment': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>`,
        'new-payment': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>`
    };
    
    return icons[type] || '';
}

// Load Users Data
function loadUsersData() {
    const tbody = document.getElementById('usersTableBody');
    
    const usersHTML = sampleUsers.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="status-badge ${user.status}">${getStatusText(user.status)}</span></td>
            <td>${formatDate(user.registered)}</td>
            <td>${user.unlockedPackages.length} Pakete</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn" onclick="viewUser(${user.id})" title="Details">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="action-btn" onclick="editUser(${user.id})" title="Bearbeiten">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="action-btn" onclick="unlockPackages(${user.id})" title="Pakete freischalten">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = usersHTML || '<tr><td colspan="6" class="empty-state">Keine Nutzer gefunden</td></tr>';
}

// Get Status Text
function getStatusText(status) {
    const statusMap = {
        'active': 'Aktiv',
        'new': 'Neu',
        'premium': 'Premium',
        'pending': 'Ausstehend'
    };
    return statusMap[status] || status;
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// View User Details
function viewUser(userId) {
    const user = sampleUsers.find(u => u.id === userId);
    if (!user) return;
    
    showUserModal(user, 'view');
}

// Edit User
function editUser(userId) {
    const user = sampleUsers.find(u => u.id === userId);
    if (!user) return;
    
    showUserModal(user, 'edit');
}

// Show User Modal
function showUserModal(user, mode) {
    const modal = document.getElementById('userModal');
    const modalBody = document.getElementById('userModalBody');
    
    const packageOptions = ['businessplan', 'gruendung', 'finanzierung', 'marketing'];
    
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Name</label>
            <input type="text" value="${user.name}" ${mode === 'view' ? 'readonly' : ''}>
        </div>
        
        <div class="form-group">
            <label>E-Mail</label>
            <input type="email" value="${user.email}" ${mode === 'view' ? 'readonly' : ''}>
        </div>
        
        <div class="form-group">
            <label>Status</label>
            <select ${mode === 'view' ? 'disabled' : ''}>
                <option value="new" ${user.status === 'new' ? 'selected' : ''}>Neu</option>
                <option value="active" ${user.status === 'active' ? 'selected' : ''}>Aktiv</option>
                <option value="premium" ${user.status === 'premium' ? 'selected' : ''}>Premium</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Freigeschaltete Pakete</label>
            <div class="checkbox-group">
                ${packageOptions.map(pkg => `
                    <div class="checkbox-item">
                        <input type="checkbox" id="pkg_${pkg}" value="${pkg}" 
                            ${user.unlockedPackages.includes(pkg) ? 'checked' : ''}
                            ${mode === 'view' ? 'disabled' : ''}>
                        <label for="pkg_${pkg}">${getPackageName(pkg)}</label>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="form-group">
            <label>Registriert am</label>
            <input type="text" value="${formatDate(user.registered)}" readonly>
        </div>
    `;
    
    modal.style.display = 'flex';
    window.currentUser = user;
    window.modalMode = mode;
}

// Get Package Name
function getPackageName(pkg) {
    const names = {
        'businessplan': 'Businessplan-Beratung',
        'gruendung': 'Gründungsberatung',
        'finanzierung': 'Finanzierungsberatung',
        'marketing': 'Marketing-Beratung'
    };
    return names[pkg] || pkg;
}

// Close User Modal
function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
}

// Save User Changes
function saveUserChanges() {
    if (window.modalMode === 'view') {
        closeUserModal();
        return;
    }
    
    // In real app, save to backend
    alert('Änderungen gespeichert!');
    closeUserModal();
    loadUsersData();
}

// Unlock Packages
function unlockPackages(userId) {
    const user = sampleUsers.find(u => u.id === userId);
    if (!user) return;
    
    showUnlockModal(user);
}

// Load Appointments Data
function loadAppointmentsData() {
    const appointmentsGrid = document.getElementById('appointmentsGrid');
    
    const appointments = [
        {
            time: '09:00',
            user: 'Max Mustermann',
            type: 'Businessplan-Beratung',
            duration: '90 Min',
            date: 'Heute'
        },
        {
            time: '14:00',
            user: 'Anna Schmidt',
            type: 'Erstgespräch',
            duration: '30 Min',
            date: 'Heute'
        },
        {
            time: '10:00',
            user: 'Tom Weber',
            type: 'Finanzierungsberatung',
            duration: '90 Min',
            date: 'Morgen'
        }
    ];
    
    const appointmentsHTML = appointments.map(apt => `
        <div class="appointment-card">
            <div class="appointment-info">
                <div class="appointment-time">${apt.date}, ${apt.time} - ${apt.duration}</div>
                <div class="appointment-details">
                    <strong>${apt.user}</strong> - ${apt.type}
                </div>
            </div>
            <div class="action-buttons">
                <button class="action-btn" title="Details">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
    
    appointmentsGrid.innerHTML = appointmentsHTML || '<p class="empty-state">Keine Termine diese Woche</p>';
}

// Load Payments Data
function loadPaymentsData() {
    // Update payment stats
    const totalRevenue = sampleUsers.reduce((sum, user) => {
        return sum + user.payments.reduce((userSum, payment) => userSum + payment.amount, 0);
    }, 0);
    
    document.querySelector('.payment-amount').textContent = `€${totalRevenue}`;
    
    // Load transactions (empty for now)
    // In real app, would load from backend
}

// Load Analytics Data
function loadAnalyticsData() {
    // In real app, would load charts and analytics
    // For now, just placeholder
}

// Setup Event Listeners
function setupEventListeners() {
    // User search
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', (e) => {
            filterUsers(e.target.value);
        });
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterUsersByStatus(btn.dataset.filter);
        });
    });
}

// Filter Users
function filterUsers(searchTerm) {
    const filteredUsers = sampleUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Re-render users table
    // In real app, would update the table with filtered results
}

// Filter Users by Status
function filterUsersByStatus(status) {
    if (status === 'all') {
        loadUsersData();
        return;
    }
    
    const filteredUsers = sampleUsers.filter(user => user.status === status);
    // Re-render users table with filtered results
}

// Show Unlock Modal
function showUnlockModal(user) {
    const modal = document.getElementById('unlockModal');
    const modalBody = document.getElementById('unlockModalBody');
    
    const packageOptions = [
        { id: 'businessplan', name: 'Businessplan-Beratung', price: '€250', duration: '90 Min' },
        { id: 'gruendung', name: 'Gründungsberatung', price: '€180', duration: '60 Min' },
        { id: 'finanzierung', name: 'Finanzierungsberatung', price: '€300', duration: '90 Min' },
        { id: 'marketing', name: 'Marketing-Beratung', price: '€150', duration: '60 Min' }
    ];
    
    modalBody.innerHTML = `
        <div class="unlock-header">
            <h3>Beratungspakete freischalten für:</h3>
            <p class="unlock-user-info">
                <strong>${user.name}</strong> (${user.email})
            </p>
        </div>
        
        <div class="unlock-packages">
            <h4>Verfügbare Pakete:</h4>
            ${packageOptions.map(pkg => `
                <div class="unlock-package-item ${user.unlockedPackages.includes(pkg.id) ? 'already-unlocked' : ''}">
                    <div class="package-info">
                        <input type="checkbox" 
                            id="unlock_${pkg.id}" 
                            value="${pkg.id}"
                            ${user.unlockedPackages.includes(pkg.id) ? 'checked disabled' : ''}>
                        <label for="unlock_${pkg.id}">
                            <strong>${pkg.name}</strong>
                            <span class="package-details">${pkg.duration} - ${pkg.price}</span>
                        </label>
                    </div>
                    ${user.unlockedPackages.includes(pkg.id) ? 
                        '<span class="unlock-status">✓ Bereits freigeschaltet</span>' : 
                        '<span class="unlock-status pending">Noch nicht freigeschaltet</span>'}
                </div>
            `).join('')}
        </div>
        
        <div class="unlock-actions">
            <div class="unlock-note">
                <strong>Hinweis:</strong> Die Freischaltung ermöglicht dem Nutzer die Buchung dieser Beratungsarten.
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    window.currentUnlockUser = user;
}

// Close Unlock Modal
function closeUnlockModal() {
    document.getElementById('unlockModal').style.display = 'none';
}

// Save Unlock Changes
function saveUnlockChanges() {
    const user = window.currentUnlockUser;
    if (!user) return;
    
    // Get all checked packages
    const checkedPackages = [];
    document.querySelectorAll('#unlockModalBody input[type="checkbox"]:checked:not(:disabled)').forEach(cb => {
        checkedPackages.push(cb.value);
    });
    
    // Update user's unlocked packages (in real app, this would save to backend)
    const userIndex = sampleUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        sampleUsers[userIndex].unlockedPackages = [
            ...new Set([...sampleUsers[userIndex].unlockedPackages, ...checkedPackages])
        ];
        
        // Update localStorage to simulate persistence
        const storedUnlocks = JSON.parse(localStorage.getItem('unlockedPackages') || '{}');
        storedUnlocks[user.email] = sampleUsers[userIndex].unlockedPackages;
        localStorage.setItem('unlockedPackages', JSON.stringify(storedUnlocks));
        
        alert(`✅ Pakete erfolgreich freigeschaltet für ${user.name}!`);
        closeUnlockModal();
        loadUsersData();
    }
}

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);