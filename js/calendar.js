/**
 * Calendar JavaScript
 * Handles calendar display, navigation, and appointment management
 */

// Global variables
let currentDate = new Date();
let currentView = 'grid'; // 'grid' or 'list'
let appointments = [];
let selectedDate = null;

// Month names - will be loaded from i18n
let monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

// Update month names from i18n when available
function updateMonthNames() {
    if (window.t) {
        monthNames = [
            window.t('calendar.months.january'),
            window.t('calendar.months.february'),
            window.t('calendar.months.march'),
            window.t('calendar.months.april'),
            window.t('calendar.months.may'),
            window.t('calendar.months.june'),
            window.t('calendar.months.july'),
            window.t('calendar.months.august'),
            window.t('calendar.months.september'),
            window.t('calendar.months.october'),
            window.t('calendar.months.november'),
            window.t('calendar.months.december')
        ];
    }
}

// Initialize calendar
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    loadAppointments();
});

// Initialize calendar functionality
function initializeCalendar() {
    setupCalendarModal();
    setupKeyboardNavigation();
    updateCalendarTitle();
}

// Setup calendar modal
function setupCalendarModal() {
    const modal = document.getElementById('calendarModal');
    if (modal) {
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeCalendarModal();
            }
        });
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCalendarModal();
            }
        });
    }
}

// Open calendar modal
async function openCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Show loading
    AppLoading.showCalendarLoading();
    
    try {
        // Simulate loading time
        await LoadingStates.simulateLoading(500, 1000);
        
        // Reset to current month
        currentDate = new Date();
        updateCalendarTitle();
        renderCalendar();
    } catch (error) {
        console.error('Error loading calendar:', error);
    } finally {
        AppLoading.hideCalendarLoading();
    }
    
    // Track modal open
    trackCalendarModalOpen();
}

// Close calendar modal
function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset selected date
    selectedDate = null;
    
    // Track modal close
    trackCalendarModalClose();
}

// Navigate to previous month
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendarTitle();
    renderCalendar();
    trackCalendarNavigation('previous');
}

// Navigate to next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendarTitle();
    renderCalendar();
    trackCalendarNavigation('next');
}

// Go to today
function goToToday() {
    currentDate = new Date();
    updateCalendarTitle();
    renderCalendar();
    trackCalendarAction('go_to_today');
}

// Switch to grid view
function switchToGridView() {
    currentView = 'grid';
    updateViewToggle();
    showCalendarGrid();
    hideCalendarList();
    trackCalendarViewSwitch('grid');
}

// Switch to list view
function switchToListView() {
    currentView = 'list';
    updateViewToggle();
    showCalendarList();
    hideCalendarGrid();
    renderCalendarList();
    trackCalendarViewSwitch('list');
}

// Update view toggle buttons
function updateViewToggle() {
    const buttons = document.querySelectorAll('.view-toggle-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        if ((currentView === 'grid' && button.textContent === 'Monat') ||
            (currentView === 'list' && button.textContent === 'Liste')) {
            button.classList.add('active');
        }
    });
}

// Show/hide calendar views
function showCalendarGrid() {
    const grid = document.getElementById('calendarGrid');
    if (grid) {
        grid.classList.remove('hidden');
        renderCalendar();
    }
}

function hideCalendarGrid() {
    const grid = document.getElementById('calendarGrid');
    if (grid) {
        grid.classList.add('hidden');
    }
}

function showCalendarList() {
    const list = document.getElementById('calendarList');
    if (list) {
        list.classList.add('active');
    }
}

function hideCalendarList() {
    const list = document.getElementById('calendarList');
    if (list) {
        list.classList.remove('active');
    }
}

// Update calendar title
function updateCalendarTitle() {
    const titleElement = document.getElementById('calendarTitle');
    if (titleElement) {
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        titleElement.textContent = `${month} ${year}`;
    }
}

// Render calendar grid
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    
    // Clear existing days (keep weekday headers)
    const existingDays = grid.querySelectorAll('.calendar-day');
    existingDays.forEach(day => day.remove());
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and how many days in month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get first Monday of the week containing the first day
    const startDate = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday = 0
    startDate.setDate(firstDay.getDate() - daysToSubtract);
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = createDayElement(date, month);
        grid.appendChild(dayElement);
    }
}

// Create day element
function createDayElement(date, currentMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    const isCurrentMonth = date.getMonth() === currentMonth;
    const isToday = isDateToday(date);
    const dayAppointments = getAppointmentsForDate(date);
    
    // Add classes
    if (!isCurrentMonth) {
        dayElement.classList.add('other-month');
    }
    if (isToday) {
        dayElement.classList.add('today');
    }
    if (dayAppointments.length > 0) {
        dayElement.classList.add('has-appointments');
    }
    
    // Day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    dayElement.appendChild(dayNumber);
    
    // Appointments container
    const appointmentsContainer = document.createElement('div');
    appointmentsContainer.className = 'day-appointments';
    
    // Add appointments (max 3 visible)
    dayAppointments.slice(0, 3).forEach(appointment => {
        const appointmentElement = createDayAppointmentElement(appointment);
        appointmentsContainer.appendChild(appointmentElement);
    });
    
    // Show "+X more" if there are more appointments
    if (dayAppointments.length > 3) {
        const moreElement = document.createElement('div');
        moreElement.className = 'day-appointment more';
        moreElement.textContent = `+${dayAppointments.length - 3} weitere`;
        appointmentsContainer.appendChild(moreElement);
    }
    
    dayElement.appendChild(appointmentsContainer);
    
    // Add click handler
    dayElement.addEventListener('click', () => selectDate(date));
    
    return dayElement;
}

// Create day appointment element
function createDayAppointmentElement(appointment) {
    const element = document.createElement('div');
    element.className = `day-appointment ${appointment.type}`;
    
    const time = document.createElement('div');
    time.className = 'appointment-time';
    time.textContent = appointment.time;
    
    const title = document.createElement('div');
    title.textContent = appointment.title;
    
    element.appendChild(time);
    element.appendChild(title);
    
    // Add click handler
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        showAppointmentDetails(appointment);
    });
    
    return element;
}

// Render calendar list view
function renderCalendarList() {
    const listContainer = document.getElementById('calendarList');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    // Group appointments by date
    const groupedAppointments = groupAppointmentsByDate();
    
    // Create sections for each date
    Object.keys(groupedAppointments).sort().forEach(dateKey => {
        const appointments = groupedAppointments[dateKey];
        const section = createListSection(dateKey, appointments);
        listContainer.appendChild(section);
    });
    
    if (Object.keys(groupedAppointments).length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <p>Keine Termine gefunden.</p>
            <button class="btn btn-primary" onclick="bookNewAppointment()">Ersten Termin buchen</button>
        `;
        listContainer.appendChild(emptyState);
    }
}

// Create list section
function createListSection(dateKey, appointments) {
    const section = document.createElement('div');
    section.className = 'list-section';
    
    const title = document.createElement('h3');
    title.className = 'list-section-title';
    title.textContent = formatDateForList(dateKey);
    section.appendChild(title);
    
    appointments.forEach(appointment => {
        const appointmentElement = createListAppointmentElement(appointment);
        section.appendChild(appointmentElement);
    });
    
    return section;
}

// Create list appointment element
function createListAppointmentElement(appointment) {
    const element = document.createElement('div');
    element.className = 'list-appointment';
    
    // Date
    const dateElement = document.createElement('div');
    dateElement.className = 'list-appointment-date';
    const date = new Date(appointment.date);
    dateElement.innerHTML = `
        <span class="day">${date.getDate()}</span>
        <span class="month">${monthNames[date.getMonth()].substring(0, 3)}</span>
    `;
    
    // Info
    const infoElement = document.createElement('div');
    infoElement.className = 'list-appointment-info';
    infoElement.innerHTML = `
        <div class="list-appointment-title">${appointment.title}</div>
        <div class="list-appointment-details">
            <span class="list-appointment-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${appointment.time}
            </span>
            <span class="list-appointment-type">${getAppointmentTypeLabel(appointment.type)}</span>
        </div>
    `;
    
    // Actions
    const actionsElement = document.createElement('div');
    actionsElement.className = 'list-appointment-actions';
    actionsElement.innerHTML = `
        <button class="appointment-action-btn" onclick="editAppointment('${appointment.id}')" title="Bearbeiten">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
        </button>
        <button class="appointment-action-btn" onclick="cancelAppointment('${appointment.id}')" title="Absagen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    
    element.appendChild(dateElement);
    element.appendChild(infoElement);
    element.appendChild(actionsElement);
    
    // Add click handler
    element.addEventListener('click', () => showAppointmentDetails(appointment));
    
    return element;
}

// Helper functions
function isDateToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

function getAppointmentsForDate(date) {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateString);
}

function groupAppointmentsByDate() {
    const grouped = {};
    appointments.forEach(appointment => {
        if (!grouped[appointment.date]) {
            grouped[appointment.date] = [];
        }
        grouped[appointment.date].push(appointment);
    });
    return grouped;
}

function formatDateForList(dateKey) {
    const date = new Date(dateKey);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    if (isDateToday(date)) {
        return `Heute, ${day}. ${month} ${year}`;
    }
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
        return `Morgen, ${day}. ${month} ${year}`;
    }
    
    return `${day}. ${month} ${year}`;
}

function getAppointmentTypeLabel(type) {
    const labels = {
        'consultation': 'Beratung',
        'workshop': 'Workshop',
        'meeting': 'Meeting',
        'call': 'Telefon',
        'review': 'Review'
    };
    return labels[type] || type;
}

// Load appointments from localStorage
function loadAppointments() {
    const stored = localStorage.getItem('appointments');
    if (stored) {
        appointments = JSON.parse(stored);
    } else {
        // Demo appointments
        appointments = [
            {
                id: '1',
                title: 'Erstberatung Finanzierung',
                date: '2025-01-18',
                time: '14:00',
                type: 'consultation',
                advisor: 'Sarah M.',
                description: 'Beratung zu Finanzierungsmöglichkeiten'
            },
            {
                id: '2',
                title: 'Workshop: Pitch Training',
                date: '2025-01-22',
                time: '10:00',
                type: 'workshop',
                description: 'Online-Workshop für Pitch-Präsentationen'
            },
            {
                id: '3',
                title: 'Business Plan Review',
                date: '2025-01-25',
                time: '15:30',
                type: 'review',
                advisor: 'Dr. Weber',
                description: 'Überprüfung des Businessplans'
            }
        ];
        saveAppointments();
    }
}

// Save appointments to localStorage
function saveAppointments() {
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Select date
function selectDate(date) {
    selectedDate = date;
    
    // Update visual selection
    document.querySelectorAll('.calendar-day.selected').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Find and select the clicked day
    const dayElements = document.querySelectorAll('.calendar-day');
    dayElements.forEach(dayEl => {
        const dayNumber = parseInt(dayEl.querySelector('.day-number').textContent);
        if (dayNumber === date.getDate() && 
            !dayEl.classList.contains('other-month')) {
            dayEl.classList.add('selected');
        }
    });
    
    // Show appointments for selected date
    showDateAppointments(date);
    
    trackDateSelection(date);
}

// Show appointments for selected date
function showDateAppointments(date) {
    const dayAppointments = getAppointmentsForDate(date);
    
    if (dayAppointments.length > 0) {
        // Could show a popup with day details
        console.log('Appointments for', date, dayAppointments);
    }
}

// Show appointment details
function showAppointmentDetails(appointment) {
    // Create appointment details modal or popup
    alert(`Termin: ${appointment.title}\nDatum: ${appointment.date}\nZeit: ${appointment.time}\nTyp: ${getAppointmentTypeLabel(appointment.type)}`);
    
    trackAppointmentView(appointment);
}

// Calendar actions
function bookNewAppointment() {
    // Redirect to appointment booking
    // In a real app, this would open a booking modal
    alert('Neuen Termin buchen - würde Buchungsformular öffnen');
    trackCalendarAction('book_new_appointment');
}

function exportCalendar() {
    // Export calendar as ICS file
    const appointments = getAppointmentsForMonth(currentDate);
    
    if (appointments.length === 0) {
        if (window.ErrorHandling) {
            window.ErrorHandling.showToast('warning', 'Keine Termine', 'Es gibt keine Termine zum Exportieren.');
        }
        return;
    }
    
    const icsContent = generateICSContent();
    downloadICSFile(icsContent);
    trackCalendarAction('export');
    
    if (window.ErrorHandling) {
        window.ErrorHandling.showToast('success', 'Export erfolgreich', 'Kalender wurde als .ics-Datei exportiert.');
    }
}

function syncCalendar() {
    // Sync with external calendar
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Kalender erfolgreich synchronisiert!', 'success');
        trackCalendarAction('sync');
    }, 2000);
}

// Generate ICS content for export
function generateICSContent() {
    const appointments = getAppointmentsForMonth(currentDate);
    let ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//KI Konzept Builder//Calendar Export//DE',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH'
    ];
    
    appointments.forEach(apt => {
        const startDate = new Date(apt.date);
        const [hours, minutes] = apt.time.split(':');
        startDate.setHours(parseInt(hours), parseInt(minutes));
        
        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 1); // 1 hour duration
        
        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        };
        
        ics.push(
            'BEGIN:VEVENT',
            `DTSTART:${formatDate(startDate)}`,
            `DTEND:${formatDate(endDate)}`,
            `SUMMARY:${apt.title}`,
            `DESCRIPTION:Mit ${apt.advisor}`,
            `UID:${apt.id}@kikonzeptbuilder.de`,
            'STATUS:CONFIRMED',
            'END:VEVENT'
        );
    });
    
    ics.push('END:VCALENDAR');
    return ics.join('\r\n');
}

function formatDateTimeForICS(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function downloadICSFile(content) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KI-Konzept-Builder-Termine-${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

// Loading state
function showLoadingState() {
    const loading = document.getElementById('calendarLoading');
    if (loading) {
        loading.style.display = 'flex';
    }
}

function hideLoadingState() {
    const loading = document.getElementById('calendarLoading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('calendarModal');
        if (modal.style.display !== 'flex') return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                previousMonth();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextMonth();
                break;
            case 'Home':
                e.preventDefault();
                goToToday();
                break;
            case 'n':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    bookNewAppointment();
                }
                break;
        }
    });
}

// Appointment management
function editAppointment(appointmentId) {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
        // Open edit modal
        alert(`Termin bearbeiten: ${appointment.title}`);
        trackAppointmentEdit(appointment);
    }
}

function cancelAppointment(appointmentId) {
    if (confirm('Möchtest du diesen Termin wirklich absagen?')) {
        appointments = appointments.filter(apt => apt.id !== appointmentId);
        saveAppointments();
        renderCalendar();
        if (currentView === 'list') {
            renderCalendarList();
        }
        showNotification('Termin erfolgreich abgesagt.', 'success');
        trackAppointmentCancel(appointmentId);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles if not exists
    if (!document.querySelector('#calendar-notification-styles')) {
        const styles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1001;
                max-width: 400px;
                padding: 16px;
                border-radius: 8px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                animation: slideIn 0.3s ease-out;
            }
            .notification.success {
                background: #10b981;
                color: white;
            }
            .notification.error {
                background: #ef4444;
                color: white;
            }
            .notification.info {
                background: #3b82f6;
                color: white;
            }
            .notification-content {
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }
            .notification-close {
                background: none;
                border: none;
                color: currentColor;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'calendar-notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Analytics and tracking
function trackCalendarModalOpen() {
    console.log('Calendar modal opened');
}

function trackCalendarModalClose() {
    console.log('Calendar modal closed');
}

function trackCalendarNavigation(direction) {
    console.log('Calendar navigation:', direction);
}

function trackCalendarViewSwitch(view) {
    console.log('Calendar view switched:', view);
}

function trackCalendarAction(action) {
    console.log('Calendar action:', action);
}

function trackDateSelection(date) {
    console.log('Date selected:', date);
}

function trackAppointmentView(appointment) {
    console.log('Appointment viewed:', appointment.id);
}

function trackAppointmentEdit(appointment) {
    console.log('Appointment edit:', appointment.id);
}

function trackAppointmentCancel(appointmentId) {
    console.log('Appointment cancelled:', appointmentId);
}

// Export functions for global use
window.CalendarApp = {
    openCalendarModal,
    closeCalendarModal,
    previousMonth,
    nextMonth,
    goToToday,
    switchToGridView,
    switchToListView,
    bookNewAppointment,
    exportCalendar,
    syncCalendar
};