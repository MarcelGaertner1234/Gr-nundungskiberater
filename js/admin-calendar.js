// Admin Calendar System - Comprehensive appointment management for administrators

// Global state
let currentDate = new Date();
let currentView = 'grid'; // 'grid' or 'list'
let selectedDate = null;
let appointments = [];
let filteredAppointments = [];
let currentFilter = 'all';

// Mock appointment data for demonstration
const mockAppointments = [
    {
        id: 'app-001',
        date: '2024-08-18',
        time: '14:00',
        duration: 60,
        type: 'financing-consultation',
        status: 'pending',
        client: {
            id: 'client-001',
            name: 'Marcel Gärtner',
            email: 'marcel@example.com',
            phone: '+49 123 456789'
        },
        advisor: 'sarah-m',
        title: 'Erstberatung Finanzierung',
        notes: 'Interessiert an Gründerzuschuss und KfW-Förderung',
        meetingLink: 'https://meet.ki-konzept-builder.de/room/abc123',
        createdAt: '2024-08-10T10:30:00Z'
    },
    {
        id: 'app-002',
        date: '2024-08-18',
        time: '16:00',
        duration: 45,
        type: 'business-plan-review',
        status: 'confirmed',
        client: {
            id: 'client-002',
            name: 'Anna Schmidt',
            email: 'anna@startup.com',
            phone: '+49 987 654321'
        },
        advisor: 'thomas-k',
        title: 'Businessplan Review',
        notes: 'Tech-Startup, SaaS-Modell',
        meetingLink: 'https://meet.ki-konzept-builder.de/room/def456',
        createdAt: '2024-08-12T15:20:00Z'
    },
    {
        id: 'app-003',
        date: '2024-08-19',
        time: '10:00',
        duration: 30,
        type: 'legal-consultation',
        status: 'confirmed',
        client: {
            id: 'client-003',
            name: 'Thomas Mueller',
            email: 'thomas@business.de',
            phone: '+49 555 123456'
        },
        advisor: 'sarah-m',
        title: 'Rechtsberatung',
        notes: 'Fragen zur GmbH-Gründung',
        meetingLink: 'phone',
        createdAt: '2024-08-15T09:45:00Z'
    },
    {
        id: 'app-004',
        date: '2024-08-20',
        time: '14:30',
        duration: 90,
        type: 'workshop',
        status: 'confirmed',
        client: {
            id: 'client-004',
            name: 'Lisa Weber',
            email: 'lisa@innovation.com',
            phone: '+49 777 888999'
        },
        advisor: 'thomas-k',
        title: 'Pitch Training Workshop',
        notes: 'Gruppentermin - 5 Teilnehmer',
        meetingLink: 'https://meet.ki-konzept-builder.de/room/ghi789',
        createdAt: '2024-08-16T11:30:00Z'
    },
    {
        id: 'app-005',
        date: '2024-08-21',
        time: '09:00',
        duration: 60,
        type: 'financing-consultation',
        status: 'cancelled',
        client: {
            id: 'client-005',
            name: 'Robert Klein',
            email: 'robert@venture.de',
            phone: '+49 444 555666'
        },
        advisor: 'sarah-m',
        title: 'Finanzierungsberatung',
        notes: 'Storniert wegen Krankheit',
        meetingLink: null,
        createdAt: '2024-08-17T14:15:00Z'
    }
];

// Appointment types configuration
const appointmentTypes = {
    'financing-consultation': {
        name: 'Finanzierungsberatung',
        color: '#10b981',
        icon: '💰',
        className: 'financing'
    },
    'business-plan-review': {
        name: 'Businessplan Review',
        color: '#8b5cf6',
        icon: '📊',
        className: 'business-plan'
    },
    'legal-consultation': {
        name: 'Rechtsberatung',
        color: '#f59e0b',
        icon: '⚖️',
        className: 'legal'
    },
    'workshop': {
        name: 'Workshop',
        color: '#ef4444',
        icon: '🎓',
        className: 'workshop'
    }
};

// Status configurations
const statusConfig = {
    'pending': {
        name: 'Ausstehend',
        color: '#f59e0b',
        className: 'pending'
    },
    'confirmed': {
        name: 'Bestätigt',
        color: '#10b981',
        className: 'confirmed'
    },
    'cancelled': {
        name: 'Storniert',
        color: '#ef4444',
        className: 'cancelled'
    },
    'completed': {
        name: 'Abgeschlossen',
        color: '#6b7280',
        className: 'completed'
    }
};

// Advisor configurations
const advisors = {
    'sarah-m': {
        name: 'Sarah Müller',
        role: 'Senior Finanzberaterin',
        specialties: ['Finanzierung', 'Fördermittel']
    },
    'thomas-k': {
        name: 'Thomas Klein',
        role: 'Business Coach',
        specialties: ['Businessplan', 'Marketing']
    }
};

// Initialize Admin Calendar
function initializeAdminCalendar() {
    console.log('Initializing Admin Calendar...');
    
    // Load mock data
    appointments = [...mockAppointments];
    filteredAppointments = [...appointments];
    
    // Initialize view
    updateCalendarDisplay();
    updateCalendarStats();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('Admin Calendar initialized with', appointments.length, 'appointments');
}

// Set up event listeners
function setupEventListeners() {
    // View toggle buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('calendar-view-btn')) {
            switchView(e.target.dataset.view);
        }
        
        if (e.target.classList.contains('calendar-filter-btn')) {
            toggleFilter(e.target.dataset.filter);
        }
        
        if (e.target.classList.contains('admin-calendar-day')) {
            selectDate(e.target.dataset.date);
        }
        
        if (e.target.classList.contains('admin-appointment-item') || e.target.closest('.admin-appointment-item')) {
            const appointmentElement = e.target.closest('.admin-appointment-item') || e.target;
            const appointmentId = appointmentElement.dataset.appointmentId;
            if (appointmentId) {
                showAppointmentDetails(appointmentId);
            }
        }
        
        if (e.target.classList.contains('admin-list-appointment')) {
            const appointmentId = e.target.dataset.appointmentId;
            if (appointmentId) {
                showAppointmentDetails(appointmentId);
            }
        }
    });
    
    // Quick action buttons
    const todayBtn = document.getElementById('adminCalendarTodayBtn');
    if (todayBtn) {
        todayBtn.addEventListener('click', goToToday);
    }
    
    const prevBtn = document.getElementById('adminCalendarPrevBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', previousMonth);
    }
    
    const nextBtn = document.getElementById('adminCalendarNextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextMonth);
    }
}

// Switch calendar view (grid/list)
function switchView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('.calendar-view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    updateCalendarDisplay();
}

// Toggle appointment filter
function toggleFilter(filter) {
    currentFilter = filter;
    
    // Update button states
    document.querySelectorAll('.calendar-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    // Filter appointments
    filterAppointments();
    updateCalendarDisplay();
    updateCalendarStats();
}

// Filter appointments based on current filter
function filterAppointments() {
    if (currentFilter === 'all') {
        filteredAppointments = [...appointments];
    } else {
        filteredAppointments = appointments.filter(appointment => {
            switch (currentFilter) {
                case 'pending':
                    return appointment.status === 'pending';
                case 'confirmed':
                    return appointment.status === 'confirmed';
                case 'cancelled':
                    return appointment.status === 'cancelled';
                case 'today':
                    const today = new Date().toISOString().split('T')[0];
                    return appointment.date === today;
                case 'this-week':
                    return isThisWeek(new Date(appointment.date));
                default:
                    return true;
            }
        });
    }
}

// Check if date is in current week
function isThisWeek(date) {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
    
    return date >= startOfWeek && date <= endOfWeek;
}

// Update calendar display based on current view
function updateCalendarDisplay() {
    const gridContainer = document.getElementById('adminCalendarGrid');
    const listContainer = document.getElementById('adminCalendarList');
    
    if (currentView === 'grid') {
        if (gridContainer) {
            gridContainer.style.display = 'grid';
            renderCalendarGrid();
        }
        if (listContainer) {
            listContainer.style.display = 'none';
        }
    } else {
        if (gridContainer) {
            gridContainer.style.display = 'none';
        }
        if (listContainer) {
            listContainer.style.display = 'block';
            renderCalendarList();
        }
    }
    
    updateCalendarHeader();
}

// Update calendar header with current month/year
function updateCalendarHeader() {
    const titleElement = document.getElementById('adminCalendarTitle');
    if (titleElement) {
        const monthNames = [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];
        titleElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
}

// Render calendar grid view
function renderCalendarGrid() {
    const gridContainer = document.getElementById('adminCalendarGrid');
    if (!gridContainer) return;
    
    // Clear existing content except weekday headers
    const existingDays = gridContainer.querySelectorAll('.admin-calendar-day');
    existingDays.forEach(day => day.remove());
    
    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Calculate grid start (Monday of the week containing first day)
    const startDate = new Date(firstDay);
    const dayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); // Convert Sunday to 7
    startDate.setDate(startDate.getDate() - (dayOfWeek - 1));
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + i);
        
        const dayElement = createCalendarDayElement(cellDate);
        gridContainer.appendChild(dayElement);
    }
}

// Create calendar day element
function createCalendarDayElement(date) {
    const dayElement = document.createElement('div');
    dayElement.className = 'admin-calendar-day';
    dayElement.dataset.date = date.toISOString().split('T')[0];
    
    // Add classes for styling
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
    
    if (isToday) dayElement.classList.add('today');
    if (!isCurrentMonth) dayElement.classList.add('other-month');
    if (isSelected) dayElement.classList.add('selected');
    
    // Add day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'admin-day-number';
    dayNumber.textContent = date.getDate();
    dayElement.appendChild(dayNumber);
    
    // Add appointments for this day
    const dayAppointments = filteredAppointments.filter(appointment => 
        appointment.date === date.toISOString().split('T')[0]
    );
    
    if (dayAppointments.length > 0) {
        // Add counter
        const counter = document.createElement('div');
        counter.className = 'admin-day-counter';
        counter.textContent = dayAppointments.length;
        dayElement.appendChild(counter);
        
        // Add appointments container
        const appointmentsContainer = document.createElement('div');
        appointmentsContainer.className = 'admin-day-appointments';
        
        // Show max 3 appointments, then show overflow
        const maxVisible = 3;
        const visibleAppointments = dayAppointments.slice(0, maxVisible);
        
        visibleAppointments.forEach(appointment => {
            const appointmentElement = createCalendarAppointmentElement(appointment);
            appointmentsContainer.appendChild(appointmentElement);
        });
        
        if (dayAppointments.length > maxVisible) {
            appointmentsContainer.classList.add('overflow');
        }
        
        dayElement.appendChild(appointmentsContainer);
    }
    
    return dayElement;
}

// Create calendar appointment element
function createCalendarAppointmentElement(appointment) {
    const element = document.createElement('div');
    element.className = `admin-appointment-item ${appointmentTypes[appointment.type]?.className || ''} ${statusConfig[appointment.status]?.className || ''}`;
    element.dataset.appointmentId = appointment.id;
    
    const time = document.createElement('div');
    time.className = 'admin-appointment-time';
    time.textContent = appointment.time;
    element.appendChild(time);
    
    const client = document.createElement('div');
    client.className = 'admin-appointment-client';
    client.textContent = appointment.client.name;
    element.appendChild(client);
    
    return element;
}

// Render calendar list view
function renderCalendarList() {
    const listContainer = document.getElementById('adminCalendarList');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    // Group appointments by date
    const appointmentsByDate = {};
    filteredAppointments.forEach(appointment => {
        if (!appointmentsByDate[appointment.date]) {
            appointmentsByDate[appointment.date] = [];
        }
        appointmentsByDate[appointment.date].push(appointment);
    });
    
    // Sort dates
    const sortedDates = Object.keys(appointmentsByDate).sort();
    
    if (sortedDates.length === 0) {
        listContainer.innerHTML = '<div class="empty-state">Keine Termine gefunden</div>';
        return;
    }
    
    sortedDates.forEach(date => {
        const sectionElement = createListSectionElement(date, appointmentsByDate[date]);
        listContainer.appendChild(sectionElement);
    });
}

// Create list section element for a date
function createListSectionElement(date, appointments) {
    const section = document.createElement('div');
    section.className = 'admin-calendar-list-section';
    
    // Date header
    const dateHeader = document.createElement('div');
    dateHeader.className = 'admin-calendar-list-date';
    
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    dateHeader.innerHTML = `
        <span>${formattedDate}</span>
        <span class="appointment-count">${appointments.length} Termine</span>
    `;
    section.appendChild(dateHeader);
    
    // Appointments list
    const appointmentsList = document.createElement('div');
    appointmentsList.className = 'admin-calendar-list-appointments';
    
    // Sort appointments by time
    const sortedAppointments = appointments.sort((a, b) => a.time.localeCompare(b.time));
    
    sortedAppointments.forEach(appointment => {
        const appointmentElement = createListAppointmentElement(appointment);
        appointmentsList.appendChild(appointmentElement);
    });
    
    section.appendChild(appointmentsList);
    return section;
}

// Create list appointment element
function createListAppointmentElement(appointment) {
    const element = document.createElement('div');
    element.className = 'admin-list-appointment';
    element.dataset.appointmentId = appointment.id;
    
    const typeInfo = appointmentTypes[appointment.type] || {};
    const statusInfo = statusConfig[appointment.status] || {};
    
    element.innerHTML = `
        <div class="admin-list-appointment-header">
            <h4 class="admin-list-appointment-title">${typeInfo.icon || ''} ${appointment.title}</h4>
            <span class="admin-list-appointment-status ${statusInfo.className}">${statusInfo.name}</span>
        </div>
        <div class="admin-list-appointment-info">
            <span class="admin-list-appointment-time">${appointment.time}</span>
            <span class="admin-list-appointment-client">${appointment.client.name}</span>
            <div class="admin-list-appointment-actions">
                <button class="admin-appointment-action-btn" onclick="editAppointment('${appointment.id}')" title="Bearbeiten">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="admin-appointment-action-btn" onclick="cancelAppointment('${appointment.id}')" title="Stornieren">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    return element;
}

// Update calendar statistics
function updateCalendarStats() {
    const today = new Date().toISOString().split('T')[0];
    const thisWeek = filteredAppointments.filter(appointment => 
        isThisWeek(new Date(appointment.date))
    );
    
    const todayAppointments = filteredAppointments.filter(appointment => 
        appointment.date === today
    );
    
    const pendingAppointments = filteredAppointments.filter(appointment => 
        appointment.status === 'pending'
    );
    
    const upcomingAppointments = filteredAppointments.filter(appointment => 
        new Date(appointment.date) >= new Date() && appointment.status !== 'cancelled'
    );
    
    // Update stat elements
    updateStatElement('adminCalendarTodayCount', todayAppointments.length);
    updateStatElement('adminCalendarWeekCount', thisWeek.length);
    updateStatElement('adminCalendarPendingCount', pendingAppointments.length);
    updateStatElement('adminCalendarUpcomingCount', upcomingAppointments.length);
}

// Helper function to update stat elements
function updateStatElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

// Navigation functions
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendarDisplay();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendarDisplay();
}

function goToToday() {
    currentDate = new Date();
    selectedDate = new Date();
    updateCalendarDisplay();
}

// Select date in calendar
function selectDate(dateString) {
    selectedDate = new Date(dateString + 'T00:00:00');
    updateCalendarDisplay();
    
    // Show appointments for selected date
    showDayAppointments(dateString);
}

// Show appointments for a specific day
function showDayAppointments(dateString) {
    const dayAppointments = filteredAppointments.filter(appointment => 
        appointment.date === dateString
    );
    
    console.log(`Selected ${dateString}: ${dayAppointments.length} appointments`);
    
    // Could open a modal or sidebar with day details
    // For now, just log the appointments
    dayAppointments.forEach(appointment => {
        console.log(`- ${appointment.time}: ${appointment.title} (${appointment.client.name})`);
    });
}

// Show appointment details modal
function showAppointmentDetails(appointmentId) {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;
    
    const typeInfo = appointmentTypes[appointment.type] || {};
    const statusInfo = statusConfig[appointment.status] || {};
    const advisorInfo = advisors[appointment.advisor] || {};
    
    // Create modal content
    const modalContent = `
        <div class="admin-appointment-details">
            <div class="admin-appointment-detail">
                <span class="admin-appointment-detail-label">Termin</span>
                <span class="admin-appointment-detail-value">${typeInfo.icon || ''} ${appointment.title}</span>
            </div>
            <div class="admin-appointment-detail">
                <span class="admin-appointment-detail-label">Status</span>
                <span class="admin-appointment-detail-value" style="color: ${statusInfo.color}">${statusInfo.name}</span>
            </div>
            <div class="admin-appointment-detail">
                <span class="admin-appointment-detail-label">Datum</span>
                <span class="admin-appointment-detail-value">${new Date(appointment.date + 'T00:00:00').toLocaleDateString('de-DE')}</span>
            </div>
            <div class="admin-appointment-detail">
                <span class="admin-appointment-detail-label">Uhrzeit</span>
                <span class="admin-appointment-detail-value">${appointment.time} (${appointment.duration} min)</span>
            </div>
            <div class="admin-appointment-detail">
                <span class="admin-appointment-detail-label">Kunde</span>
                <span class="admin-appointment-detail-value">${appointment.client.name}</span>
            </div>
            <div class="admin-appointment-detail">
                <span class="admin-appointment-detail-label">E-Mail</span>
                <span class="admin-appointment-detail-value">${appointment.client.email}</span>
            </div>
            <div class="admin-appointment-detail">
                <span class="admin-appointment-detail-label">Telefon</span>
                <span class="admin-appointment-detail-value">${appointment.client.phone || 'Nicht angegeben'}</span>
            </div>
            <div class="admin-appointment-detail">
                <span class="admin-appointment-detail-label">Berater</span>
                <span class="admin-appointment-detail-value">${advisorInfo.name || appointment.advisor}</span>
            </div>
        </div>
        
        <div class="admin-appointment-notes">
            <h4>Notizen</h4>
            <textarea placeholder="Notizen zum Termin...">${appointment.notes || ''}</textarea>
        </div>
    `;
    
    // Show modal (would need to be implemented with your modal system)
    console.log('Showing appointment details for:', appointment.title);
    console.log('Modal content would be:', modalContent);
    
    // For demo, just alert the appointment details
    alert(`Termin Details:\n${appointment.title}\nKunde: ${appointment.client.name}\nDatum: ${appointment.date} ${appointment.time}\nStatus: ${statusInfo.name}`);
}

// Edit appointment function
function editAppointment(appointmentId) {
    console.log('Edit appointment:', appointmentId);
    LoadingStates?.showButtonLoading?.(event.target, 'Bearbeiten');
    
    setTimeout(() => {
        LoadingStates?.hideButtonLoading?.(event.target);
        alert('Bearbeitung wird geöffnet...');
    }, 1000);
}

// Cancel appointment function
function cancelAppointment(appointmentId) {
    if (!confirm('Möchten Sie diesen Termin wirklich stornieren?')) {
        return;
    }
    
    console.log('Cancel appointment:', appointmentId);
    LoadingStates?.showButtonLoading?.(event.target, 'Stornieren');
    
    setTimeout(() => {
        // Update appointment status
        const appointment = appointments.find(apt => apt.id === appointmentId);
        if (appointment) {
            appointment.status = 'cancelled';
            filterAppointments();
            updateCalendarDisplay();
            updateCalendarStats();
        }
        
        LoadingStates?.hideButtonLoading?.(event.target);
        alert('Termin wurde storniert.');
    }, 1000);
}

// Quick action functions
function newAppointment() {
    console.log('Creating new appointment...');
    alert('Neuer Termin wird erstellt...');
}

function exportCalendar() {
    console.log('Exporting calendar...');
    LoadingStates?.showButtonLoading?.(event.target, 'Export');
    
    setTimeout(() => {
        // Simulate export
        const csvContent = generateCalendarCSV();
        downloadCSV(csvContent, `calendar-export-${new Date().toISOString().split('T')[0]}.csv`);
        
        LoadingStates?.hideButtonLoading?.(event.target);
    }, 2000);
}

// Generate CSV content for calendar export
function generateCalendarCSV() {
    const headers = ['Datum', 'Zeit', 'Typ', 'Titel', 'Kunde', 'E-Mail', 'Status', 'Berater'];
    const rows = filteredAppointments.map(appointment => [
        appointment.date,
        appointment.time,
        appointmentTypes[appointment.type]?.name || appointment.type,
        appointment.title,
        appointment.client.name,
        appointment.client.email,
        statusConfig[appointment.status]?.name || appointment.status,
        advisors[appointment.advisor]?.name || appointment.advisor
    ]);
    
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

function syncCalendar() {
    console.log('Syncing calendar...');
    LoadingStates?.showButtonLoading?.(event.target, 'Sync');
    
    setTimeout(() => {
        LoadingStates?.hideButtonLoading?.(event.target);
        alert('Kalender wurde synchronisiert.');
    }, 1500);
}

// Global exports for admin calendar
window.AdminCalendar = {
    initialize: initializeAdminCalendar,
    switchView,
    toggleFilter,
    previousMonth,
    nextMonth,
    goToToday,
    newAppointment,
    exportCalendar,
    syncCalendar,
    showAppointmentDetails,
    editAppointment,
    cancelAppointment
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdminCalendar);
} else {
    initializeAdminCalendar();
}