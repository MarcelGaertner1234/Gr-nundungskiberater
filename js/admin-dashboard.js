/**
 * Admin Dashboard JavaScript
 * Handles admin functionality and data management
 */

// Users will be loaded from database service
const sampleUsers = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
    loadDashboardData();
    setupEventListeners();
    // Sample tracking data removed for 1:1 testing
    loadTrackingData();
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
    // Update stats from database if available
    if (window.db) {
        loadDashboardDataFromDatabase();
    } else {
        // Set empty state
        document.getElementById('activeUsersCount').textContent = '0';
        document.getElementById('todayAppointmentsCount').textContent = '0';
        document.getElementById('pendingCount').textContent = '0';
    }
    
    // Load recent activities
    loadRecentActivities();
}

// Load dashboard data from database
async function loadDashboardDataFromDatabase() {
    try {
        const users = await window.db.find('users');
        const appointments = await window.db.find('appointments');
        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = appointments.data.filter(apt => apt.date && apt.date.startsWith(today));
        
        document.getElementById('activeUsersCount').textContent = users.data.length;
        document.getElementById('todayAppointmentsCount').textContent = todayAppointments.length;
        document.getElementById('pendingCount').textContent = users.data.filter(u => u.status === 'new').length;
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Load Recent Activities
function loadRecentActivities() {
    const activitiesList = document.getElementById('activitiesList');
    
    // Load activities from database if available
    if (window.db) {
        loadActivitiesFromDatabase();
    } else {
        // Show empty state
        activitiesList.innerHTML = `<div class="empty-state">${window.adminT ? window.adminT('empty_states.activities_unavailable') : 'Keine Aktivitäten verfügbar'}</div>`;
    }
}

// Load activities from database
async function loadActivitiesFromDatabase() {
    try {
        const activitiesList = document.getElementById('activitiesList');
        const activityLog = JSON.parse(localStorage.getItem('db_activity_log') || '[]');
        const recentActivities = activityLog.slice(-5).reverse();
        
        if (recentActivities.length === 0) {
            activitiesList.innerHTML = `<div class="empty-state">${window.adminT ? window.adminT('empty_states.activities_unavailable') : 'Keine Aktivitäten verfügbar'}</div>`;
            return;
        }
        
        const activitiesHTML = recentActivities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.action}">
                    ${getActivityIcon(activity.action)}
                </div>
                <div class="activity-content">
                    <p><strong>${formatActivityTitle(activity.action)}</strong> ${formatActivityDescription(activity)}</p>
                    <span class="activity-time">${formatRelativeTime(activity.timestamp)}</span>
                </div>
            </div>
        `).join('');
        
        activitiesList.innerHTML = activitiesHTML;
    } catch (error) {
        console.error('Error loading activities:', error);
        const activitiesList = document.getElementById('activitiesList');
        activitiesList.innerHTML = '<div class="empty-state">Fehler beim Laden der Aktivitäten</div>';
    }
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
    
    if (window.db) {
        loadUsersFromDatabase();
    } else {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Keine Nutzer gefunden</td></tr>';
    }
}

// Load users from database
async function loadUsersFromDatabase() {
    try {
        const tbody = document.getElementById('usersTableBody');
        const users = await window.db.find('users');
        const onboardingData = await window.db.find('onboarding');
        
        if (users.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Keine Nutzer gefunden</td></tr>';
            return;
        }
        
        const usersHTML = users.data.map(user => {
            const userOnboarding = onboardingData.data.find(o => o.email === user.email);
            const unlockedPackages = userOnboarding?.consulting_services || [];
            
            return `
                <tr>
                    <td>${user.name || 'Unbekannt'}</td>
                    <td>${user.email}</td>
                    <td><span class="status-badge ${user.status || 'new'}">${getStatusText(user.status || 'new')}</span></td>
                    <td>${formatDate(user.created_at)}</td>
                    <td>${unlockedPackages.length} Pakete</td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn" onclick="viewUser('${user.id}')" title="Details">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button class="action-btn" onclick="editUser('${user.id}')" title="Bearbeiten">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button class="action-btn" onclick="unlockPackages('${user.id}')" title="Pakete freischalten">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
        
        tbody.innerHTML = usersHTML;
    } catch (error) {
        console.error('Error loading users:', error);
        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Fehler beim Laden der Nutzer</td></tr>';
    }
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
async function viewUser(userId) {
    if (!window.db) return;
    
    const user = await window.db.findById('users', userId);
    if (!user.success || !user.data) return;
    
    showUserModal(user.data, 'view');
}

// Edit User
async function editUser(userId) {
    if (!window.db) return;
    
    const user = await window.db.findById('users', userId);
    if (!user.success || !user.data) return;
    
    showUserModal(user.data, 'edit');
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
            alert(window.adminT ? window.adminT('alerts.admin.changes_saved') : 'Änderungen gespeichert!');
    closeUserModal();
    loadUsersData();
}

// Unlock Packages
async function unlockPackages(userId) {
    if (!window.db) return;
    
    const user = await window.db.findById('users', userId);
    if (!user.success || !user.data) return;
    
    showUnlockModal(user.data);
}

// Load Appointments Data
function loadAppointmentsData() {
    const appointmentsGrid = document.getElementById('appointmentsGrid');
    
    if (window.db) {
        loadAppointmentsFromDatabase();
    } else {
        appointmentsGrid.innerHTML = '<p class="empty-state">Keine Termine diese Woche</p>';
    }
}

// Load appointments from database
async function loadAppointmentsFromDatabase() {
    try {
        const appointmentsGrid = document.getElementById('appointmentsGrid');
        const appointments = await window.db.find('appointments');
        
        if (appointments.data.length === 0) {
            appointmentsGrid.innerHTML = '<p class="empty-state">Keine Termine diese Woche</p>';
            return;
        }
        
        const appointmentsHTML = appointments.data.map(apt => {
            const appointmentDate = new Date(apt.date);
            const isToday = appointmentDate.toDateString() === new Date().toDateString();
            const dateDisplay = isToday ? 'Heute' : appointmentDate.toLocaleDateString('de-DE');
            
            return `
                <div class="appointment-card">
                    <div class="appointment-info">
                        <div class="appointment-time">${dateDisplay}, ${apt.time} - ${apt.duration || '60 Min'}</div>
                        <div class="appointment-details">
                            <strong>${apt.name || 'Unbekannt'}</strong> - ${apt.consultationType || apt.type}
                        </div>
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="viewAppointment('${apt.id}')" title="Details">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        appointmentsGrid.innerHTML = appointmentsHTML;
    } catch (error) {
        console.error('Error loading appointments:', error);
        const appointmentsGrid = document.getElementById('appointmentsGrid');
        appointmentsGrid.innerHTML = '<p class="empty-state">Fehler beim Laden der Termine</p>';
    }
}

// Load Payments Data
function loadPaymentsData() {
    if (window.db) {
        loadPaymentsFromDatabase();
    } else {
        const amountElement = document.querySelector('.payment-amount');
        if (amountElement) {
            amountElement.textContent = '€0';
        }
    }
}

// Load payments from database
async function loadPaymentsFromDatabase() {
    try {
        const payments = await window.db.find('payments');
        const successfulPayments = payments.data.filter(p => p.status === 'succeeded' || p.status === 'completed');
        
        const totalRevenue = successfulPayments.reduce((sum, payment) => {
            return sum + (payment.amount || 0);
        }, 0);
        
        const amountElement = document.querySelector('.payment-amount');
        if (amountElement) {
            amountElement.textContent = `€${totalRevenue.toLocaleString('de-DE')}`;
        }
    } catch (error) {
        console.error('Error loading payments:', error);
        const amountElement = document.querySelector('.payment-amount');
        if (amountElement) {
            amountElement.textContent = '€0';
        }
    }
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
    
    // Filter users from database
    if (window.db) {
        filterUsersFromDatabase(status);
    }
}

// Filter users from database
async function filterUsersFromDatabase(status) {
    try {
        const tbody = document.getElementById('usersTableBody');
        const users = await window.db.find('users', { status: status });
        
        if (users.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Keine Nutzer mit diesem Status gefunden</td></tr>';
            return;
        }
        
        // Re-render filtered users (reuse existing logic)
        const onboardingData = await window.db.find('onboarding');
        
        const usersHTML = users.data.map(user => {
            const userOnboarding = onboardingData.data.find(o => o.email === user.email);
            const unlockedPackages = userOnboarding?.consulting_services || [];
            
            return `
                <tr>
                    <td>${user.name || 'Unbekannt'}</td>
                    <td>${user.email}</td>
                    <td><span class="status-badge ${user.status || 'new'}">${getStatusText(user.status || 'new')}</span></td>
                    <td>${formatDate(user.created_at)}</td>
                    <td>${unlockedPackages.length} Pakete</td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn" onclick="viewUser('${user.id}')" title="Details">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button class="action-btn" onclick="editUser('${user.id}')" title="Bearbeiten">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button class="action-btn" onclick="unlockPackages('${user.id}')" title="Pakete freischalten">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
        
        tbody.innerHTML = usersHTML;
    } catch (error) {
        console.error('Error filtering users:', error);
    }
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
async function saveUnlockChanges() {
    const user = window.currentUnlockUser;
    if (!user || !window.db) return;
    
    // Get all checked packages
    const checkedPackages = [];
    document.querySelectorAll('#unlockModalBody input[type="checkbox"]:checked:not(:disabled)').forEach(cb => {
        checkedPackages.push(cb.value);
    });
    
    try {
        // Update user's unlocked packages in database
        const onboardingData = await window.db.find('onboarding', { email: user.email });
        
        if (onboardingData.success && onboardingData.data.length > 0) {
            // Update existing onboarding data
            const existingData = onboardingData.data[0];
            const updatedServices = [...new Set([...existingData.consulting_services || [], ...checkedPackages])];
            
            await window.db.update('onboarding', existingData.id, {
                consulting_services: updatedServices
            });
        } else {
            // Create new onboarding entry
            await window.db.create('onboarding', {
                email: user.email,
                consulting_services: checkedPackages,
                completed: false
            });
        }
        
        // Update localStorage for backwards compatibility
        const storedUnlocks = JSON.parse(localStorage.getItem('unlockedPackages') || '{}');
        storedUnlocks[user.email] = checkedPackages;
        localStorage.setItem('unlockedPackages', JSON.stringify(storedUnlocks));
        
        alert(`✅ Pakete erfolgreich freigeschaltet für ${user.name || user.email}!`);
        closeUnlockModal();
        loadUsersData();
    } catch (error) {
        console.error('Error saving unlock changes:', error);
        alert(window.adminT ? window.adminT('alerts.admin.package_unlock_error') : '❌ Fehler beim Freischalten der Pakete');
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

// Sample tracking data setup removed for clean 1:1 testing
// Data will be populated by real user interactions

// Load Tracking Data
function loadTrackingData() {
    loadDocumentsData();
    loadServiceStatusData();
    loadCommunicationsData();
    updateTrackingStats();
}

// Load Documents Data
function loadDocumentsData() {
    const documentsTable = document.getElementById('documentsTable');
    if (!documentsTable) return;
    
    let allDocuments = [];
    
    // Get documents for all users
    sampleUsers.forEach(user => {
        const userDocs = DataTracking.documents.getDocuments(user.email);
        userDocs.forEach(doc => {
            allDocuments.push({
                ...doc,
                userName: user.name,
                userEmail: user.email
            });
        });
    });
    
    // Sort by upload date (newest first)
    allDocuments.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    
    // Generate table rows
    documentsTable.innerHTML = allDocuments.map(doc => `
        <tr>
            <td>
                <div class="user-info">
                    <span class="user-name">${doc.userName}</span>
                    <span class="user-email">${doc.userEmail}</span>
                </div>
            </td>
            <td>${doc.filename}</td>
            <td><span class="badge badge-${doc.category}">${doc.category}</span></td>
            <td>${formatFileSize(doc.fileSize)}</td>
            <td><span class="version-badge">v${doc.version}</span></td>
            <td>${new Date(doc.uploadedAt).toLocaleDateString('de-DE')}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewDocument('${doc.id}')" title="Ansehen">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="btn-icon" onclick="downloadDocument('${doc.id}')" title="Download">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="7" class="empty-state">Keine Dokumente vorhanden</td></tr>';
}

// Load Service Status Data
function loadServiceStatusData() {
    const serviceStatusTable = document.getElementById('serviceStatusTable');
    if (!serviceStatusTable) return;
    
    let allStatuses = [];
    let statusCounts = {
        ideas: 0,
        businessplans: 0,
        funding: 0
    };
    
    // Get service status for all users
    sampleUsers.forEach(user => {
        const statuses = DataTracking.serviceStatus.getAll(user.email);
        Object.entries(statuses).forEach(([serviceType, status]) => {
            allStatuses.push({
                ...status,
                userName: user.name,
                userEmail: user.email
            });
            
            // Count active services
            if (status.status === 'in_progress') {
                if (serviceType === 'idea') statusCounts.ideas++;
                else if (serviceType === 'businessplan') statusCounts.businessplans++;
                else if (serviceType === 'funding') statusCounts.funding++;
            }
        });
    });
    
    // Update counts
    if (document.getElementById('ideasInProgress')) {
        document.getElementById('ideasInProgress').textContent = statusCounts.ideas;
    }
    if (document.getElementById('businessPlansActive')) {
        document.getElementById('businessPlansActive').textContent = statusCounts.businessplans;
    }
    if (document.getElementById('fundingActive')) {
        document.getElementById('fundingActive').textContent = statusCounts.funding;
    }
    
    // Generate table rows
    serviceStatusTable.innerHTML = allStatuses.map(status => `
        <tr>
            <td>
                <div class="user-info">
                    <span class="user-name">${status.userName}</span>
                    <span class="user-email">${status.userEmail}</span>
                </div>
            </td>
            <td>${getServiceName(status.serviceType)}</td>
            <td><span class="status-badge status-${status.status}">${getStatusName(status.status)}</span></td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${status.progressPercentage}%"></div>
                </div>
                <span class="progress-text">${status.progressPercentage}%</span>
            </td>
            <td>${status.currentStep}</td>
            <td>${new Date(status.updatedAt).toLocaleDateString('de-DE')}</td>
            <td>
                <button class="btn-sm" onclick="updateServiceStatus('${status.userEmail}', '${status.serviceType}')">
                    Aktualisieren
                </button>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="7" class="empty-state">Keine Service-Daten vorhanden</td></tr>';
}

// Load Communications Data
function loadCommunicationsData() {
    const communicationList = document.getElementById('communicationList');
    if (!communicationList) return;
    
    let allComms = [];
    let unreadCount = 0;
    let openRequests = 0;
    
    // Get communications for all users
    sampleUsers.forEach(user => {
        const comms = DataTracking.communications.getAll(user.email);
        comms.forEach(comm => {
            allComms.push({
                ...comm,
                userName: user.name,
                userEmail: user.email
            });
            
            if (!comm.read) unreadCount++;
            if (comm.type === 'chat' && !comm.read) openRequests++;
        });
    });
    
    // Sort by date (newest first)
    allComms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Update stats
    if (document.getElementById('unreadMessages')) {
        document.getElementById('unreadMessages').textContent = unreadCount;
    }
    if (document.getElementById('openRequests')) {
        document.getElementById('openRequests').textContent = openRequests;
    }
    
    // Generate communication items
    communicationList.innerHTML = allComms.map(comm => `
        <div class="comm-item ${!comm.read ? 'unread' : ''}" onclick="viewCommunication('${comm.id}')">
            <div class="comm-header">
                <div class="comm-user">
                    <span class="user-name">${comm.userName}</span>
                    <span class="comm-type badge">${getCommTypeName(comm.type)}</span>
                </div>
                <span class="comm-time">${formatTime(comm.createdAt)}</span>
            </div>
            <div class="comm-message">${comm.message}</div>
            ${comm.attachments.length > 0 ? `
                <div class="comm-attachments">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                    </svg>
                    ${comm.attachments.length} Anhang/Anhänge
                </div>
            ` : ''}
        </div>
    `).join('') || '<div class="empty-state">Keine Kommunikation vorhanden</div>';
}

// Update Tracking Stats
function updateTrackingStats() {
    // Get admin cache data
    const adminData = JSON.parse(localStorage.getItem('adminDataCache') || '{}');
    const events = adminData.events || [];
    
    // Update recent activity with tracking events
    const activityContainer = document.querySelector('.recent-activity');
    if (activityContainer && events.length > 0) {
        const recentEvents = events.slice(-5).reverse();
        const activityHTML = recentEvents.map(event => `
            <div class="activity-item">
                <div class="activity-icon ${getEventIcon(event.type)}">
                    ${getEventIconSVG(event.type)}
                </div>
                <div class="activity-content">
                    <p><strong>${getEventDescription(event)}</strong></p>
                    <span class="activity-time">${formatTimeAgo(event.timestamp)}</span>
                </div>
            </div>
        `).join('');
        
        activityContainer.innerHTML = activityHTML;
    }
}

// Helper Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getServiceName(type) {
    const names = {
        'idea': 'Ideenberatung',
        'businessplan': 'Businessplan',
        'funding': 'Förderberatung'
    };
    return names[type] || type;
}

function getStatusName(status) {
    const names = {
        'pending': 'Ausstehend',
        'in_progress': 'In Bearbeitung',
        'completed': 'Abgeschlossen'
    };
    return names[status] || status;
}

function getCommTypeName(type) {
    const names = {
        'chat': 'Chat',
        'email': 'E-Mail',
        'appointment_note': 'Terminnotiz'
    };
    return names[type] || type;
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `vor ${minutes} Minuten`;
    } else if (hours < 24) {
        return `vor ${hours} Stunden`;
    } else {
        return date.toLocaleDateString('de-DE');
    }
}

function formatTimeAgo(timestamp) {
    return formatTime(timestamp);
}

function getEventIcon(eventType) {
    const icons = {
        'document_upload': 'document',
        'service_status_update': 'status',
        'communication_added': 'message',
        'appointment_booked': 'appointment',
        'payment_initiated': 'payment'
    };
    return icons[eventType] || 'default';
}

function getEventIconSVG(eventType) {
    const svgs = {
        'document_upload': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
        'service_status_update': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        'communication_added': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
        'appointment_booked': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
        'payment_initiated': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>'
    };
    return svgs[eventType] || '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>';
}

function getEventDescription(event) {
    const descriptions = {
        'document_upload': `Dokument hochgeladen`,
        'service_status_update': `Service-Status aktualisiert`,
        'communication_added': `Neue Nachricht`,
        'appointment_booked': `Termin gebucht`,
        'payment_initiated': `Zahlung eingeleitet`
    };
    return descriptions[event.type] || 'Neue Aktivität';
}

// Document actions
function viewDocument(docId) {
    console.log('Viewing document:', docId);
    // In production, this would open a document viewer
}

function downloadDocument(docId) {
    console.log('Downloading document:', docId);
    // In production, this would trigger a download
}

// Communication actions
function viewCommunication(commId) {
    console.log('Viewing communication:', commId);
    // In production, this would open the communication detail
}

// Service status update
function updateServiceStatus(userEmail, serviceType) {
    const newStatus = prompt('Neuer Status (pending/in_progress/completed):');
    const newStep = prompt('Aktueller Schritt:');
    const newProgress = prompt('Fortschritt in % (0-100):');
    
    if (newStatus && newStep && newProgress) {
        DataTracking.serviceStatus.update(
            userEmail,
            serviceType,
            newStatus,
            newStep,
            parseInt(newProgress)
        );
        loadServiceStatusData();
    }
}

// Helper functions for activity formatting
function formatActivityTitle(action) {
    const titles = {
        'create': 'Erstellt',
        'update': 'Aktualisiert',
        'delete': 'Gelöscht'
    };
    return titles[action] || 'Aktivität';
}

function formatActivityDescription(activity) {
    return `${activity.collection} (${activity.record_id})`;
}

function formatRelativeTime(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'gerade eben';
    if (minutes < 60) return `vor ${minutes} Minuten`;
    if (hours < 24) return `vor ${hours} Stunden`;
    return `vor ${days} Tagen`;
}

// View appointment details
function viewAppointment(appointmentId) {
    console.log('Viewing appointment:', appointmentId);
    // In production, this would open appointment details
}

// Make functions globally available
window.viewDocument = viewDocument;
window.downloadDocument = downloadDocument;
window.viewCommunication = viewCommunication;
window.updateServiceStatus = updateServiceStatus;
window.viewAppointment = viewAppointment;