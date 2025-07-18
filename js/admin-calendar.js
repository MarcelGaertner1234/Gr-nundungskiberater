/**
 * Admin Calendar System
 * Comprehensive calendar management for admin dashboard
 * Version: 3.0.0 with i18n support
 */

class AdminCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.appointments = [];
        this.filteredAppointments = [];
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.consultants = [];
        this.isLoading = false;
        this.initialized = false;
        
        this.initializeData();
        this.init();
    }
    
    initializeData() {
        // Sample appointments data with i18n-ready structure
        this.appointments = [
            {
                id: 1,
                date: '2024-01-15',
                time: '09:00',
                duration: 60,
                client: {
                    name: 'Marcel Gärtner',
                    email: 'marcel@example.com',
                    phone: '+49 123 456789'
                },
                consultant: {
                    name: this.getI18nText('admin_calendar.consultant.name'),
                    specialties: [
                        this.getI18nText('admin_calendar.consultant.specialties.0'),
                        this.getI18nText('admin_calendar.consultant.specialties.1')
                    ]
                },
                type: 'consultation',
                status: 'pending',
                titleKey: 'admin_dashboard.services.financing_consultation',
                notesKey: 'admin_calendar.notes.funding_interest',
                notes: this.getI18nText('admin_calendar.notes.funding_interest'),
                confirmed: false,
                location: 'online',
                reminders: {
                    email: true,
                    sms: false
                }
            },
            {
                id: 2,
                date: '2024-01-15',
                time: '14:00',
                duration: 90,
                client: {
                    name: 'Anna Schmidt',
                    email: 'anna@example.com',
                    phone: '+49 987 654321'
                },
                consultant: {
                    name: this.getI18nText('admin_calendar.consultant.name'),
                    specialties: [
                        this.getI18nText('admin_calendar.consultant.specialties.0'),
                        this.getI18nText('admin_calendar.consultant.specialties.1')
                    ]
                },
                type: 'businessplan',
                status: 'confirmed',
                titleKey: 'admin_dashboard.services.businessplan_review',
                notesKey: 'admin_calendar.notes.gmbh_questions',
                notes: this.getI18nText('admin_calendar.notes.gmbh_questions'),
                confirmed: true,
                location: 'office',
                reminders: {
                    email: true,
                    sms: true
                }
            }
        ];
        
        // Sample consultants
        this.consultants = [
            {
                id: 1,
                name: this.getI18nText('admin_calendar.consultant.name'),
                email: 'sarah@ki-konzept-builder.de',
                specialties: [
                    this.getI18nText('admin_calendar.consultant.specialties.0'),
                    this.getI18nText('admin_calendar.consultant.specialties.1')
                ],
                status: {
                    name: this.getI18nText('admin_calendar.appointment_status.confirmed'),
                    available: true
                }
            }
        ];
        
        // Month names using i18n
        this.monthNames = this.getI18nText('admin_calendar.months') || [
            'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];
        
        // Day names using i18n
        this.dayNames = [
            this.getI18nText('admin_dashboard.calendar.weekday.mo') || 'Mo',
            this.getI18nText('admin_dashboard.calendar.weekday.tu') || 'Di',
            this.getI18nText('admin_dashboard.calendar.weekday.we') || 'Mi',
            this.getI18nText('admin_dashboard.calendar.weekday.th') || 'Do',
            this.getI18nText('admin_dashboard.calendar.weekday.fr') || 'Fr',
            this.getI18nText('admin_dashboard.calendar.weekday.sa') || 'Sa',
            this.getI18nText('admin_dashboard.calendar.weekday.su') || 'So'
        ];
    }
    
    getI18nText(key) {
        // Get text from i18n or return fallback
        if (typeof i18nManager !== 'undefined' && i18nManager.t) {
            return i18nManager.t(key);
        }
        
        // Fallback texts
        const fallbacks = {
            'admin_calendar.consultant.name': 'Sarah Müller',
            'admin_calendar.consultant.specialties.0': 'Finanzierung',
            'admin_calendar.consultant.specialties.1': 'Fördermittel',
            'admin_calendar.appointment_status.confirmed': 'Bestätigt',
            'admin_calendar.notes.funding_interest': 'Interessiert an Gründerzuschuss und KfW-Förderung',
            'admin_calendar.notes.gmbh_questions': 'Fragen zur GmbH-Gründung',
            'admin_calendar.months': [
                'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
            ]
        };
        
        return fallbacks[key] || key;
    }
    
    init() {
        this.createCalendarElements();
        this.bindEvents();
        this.updateCalendar();
        this.updateStats();
        this.setupFilters();
        this.loadAppointments();
        
        // Initialize after i18n is loaded
        document.addEventListener('i18nReady', () => {
            this.updateLanguage();
        });
        
        this.initialized = true;
        console.log('Admin Calendar initialized');
    }
    
    updateLanguage() {
        // Update month names and day names
        this.monthNames = this.getI18nText('admin_calendar.months') || this.monthNames;
        this.dayNames = [
            this.getI18nText('admin_dashboard.calendar.weekday.mo') || 'Mo',
            this.getI18nText('admin_dashboard.calendar.weekday.tu') || 'Di',
            this.getI18nText('admin_dashboard.calendar.weekday.we') || 'Mi',
            this.getI18nText('admin_dashboard.calendar.weekday.th') || 'Do',
            this.getI18nText('admin_dashboard.calendar.weekday.fr') || 'Fr',
            this.getI18nText('admin_dashboard.calendar.weekday.sa') || 'Sa',
            this.getI18nText('admin_dashboard.calendar.weekday.su') || 'So'
        ];
        
        // Update appointments with new translations
        this.appointments.forEach(appointment => {
            if (appointment.titleKey) {
                appointment.title = this.getI18nText(appointment.titleKey);
            }
            if (appointment.notesKey) {
                appointment.notes = this.getI18nText(appointment.notesKey);
            }
        });
        
        // Re-render calendar
        this.updateCalendar();
        this.updateStats();
    }
    
    createCalendarElements() {
        // Ensure calendar container exists
        const calendarContainer = document.querySelector('.admin-calendar-container');
        if (!calendarContainer) {
            console.warn('Admin calendar container not found');
            return;
        }
        
        // Update calendar title with current month/year
        this.updateCalendarTitle();
    }
    
    bindEvents() {
        // Previous/Next month navigation
        const prevBtn = document.getElementById('adminCalendarPrevBtn');
        const nextBtn = document.getElementById('adminCalendarNextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousMonth());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextMonth());
        }
        
        // View toggle buttons
        const viewBtns = document.querySelectorAll('.calendar-view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.switchView(view);
            });
        });
        
        // Filter buttons
        const filterBtns = document.querySelectorAll('.calendar-filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.applyFilter(filter);
            });
        });
        
        // Quick action buttons
        const newAppointmentBtn = document.querySelector('.admin-quick-action-btn[onclick*="newAppointment"]');
        if (newAppointmentBtn) {
            newAppointmentBtn.addEventListener('click', () => this.createNewAppointment());
        }
        
        const todayBtn = document.getElementById('adminCalendarTodayBtn');
        if (todayBtn) {
            todayBtn.addEventListener('click', () => this.goToToday());
        }
        
        // Appointment actions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.appointment-edit-btn')) {
                const appointmentId = e.target.dataset.appointmentId;
                this.editAppointment(appointmentId);
            }
            
            if (e.target.matches('.appointment-cancel-btn')) {
                const appointmentId = e.target.dataset.appointmentId;
                this.cancelAppointment(appointmentId);
            }
        });
    }
    
    updateCalendar() {
        this.updateCalendarTitle();
        this.renderCalendarGrid();
        this.updateStats();
    }
    
    updateCalendarTitle() {
        const titleElement = document.getElementById('adminCalendarTitle');
        if (titleElement) {
            const monthName = this.monthNames[this.currentDate.getMonth()];
            const year = this.currentDate.getFullYear();
            titleElement.textContent = `${monthName} ${year}`;
        }
    }
    
    renderCalendarGrid() {
        const grid = document.getElementById('adminCalendarGrid');
        if (!grid) return;
        
        // Clear existing calendar days (keep weekday headers)
        const existingDays = grid.querySelectorAll('.admin-calendar-day');
        existingDays.forEach(day => day.remove());
        
        // Get first day of month and calculate offset
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
        
        // Get last day of month
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Create calendar days
        for (let i = 0; i < startOffset; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'admin-calendar-day empty';
            grid.appendChild(emptyDay);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day);
            grid.appendChild(dayElement);
        }
    }
    
    createDayElement(day) {
        const dayElement = document.createElement('div');
        dayElement.className = 'admin-calendar-day';
        
        const currentDateStr = `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayAppointments = this.getAppointmentsForDate(currentDateStr);
        
        // Check if it's today
        const today = new Date();
        const isToday = (
            today.getDate() === day &&
            today.getMonth() === this.currentDate.getMonth() &&
            today.getFullYear() === this.currentDate.getFullYear()
        );
        
        if (isToday) {
            dayElement.classList.add('today');
        }
        
        dayElement.innerHTML = `
            <div class="admin-calendar-day-number">${day}</div>
            <div class="admin-calendar-day-appointments">
                ${dayAppointments.map(appointment => `
                    <div class="admin-calendar-appointment ${appointment.status}" data-appointment-id="${appointment.id}">
                        <div class="appointment-time">${appointment.time}</div>
                        <div class="appointment-client">${appointment.client.name}</div>
                        <div class="appointment-type">${this.getAppointmentTypeText(appointment.type)}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add click event
        dayElement.addEventListener('click', () => {
            this.selectDate(currentDateStr);
        });
        
        return dayElement;
    }
    
    getAppointmentTypeText(type) {
        const typeMap = {
            'consultation': this.getI18nText('admin_dashboard.services.consultation') || 'Beratung',
            'businessplan': this.getI18nText('admin_dashboard.services.businessplan_review') || 'Businessplan',
            'legal': this.getI18nText('admin_dashboard.services.legal_consultation') || 'Rechtliches',
            'funding': this.getI18nText('admin_dashboard.services.funding_consultation') || 'Förderung'
        };
        
        return typeMap[type] || type;
    }
    
    getAppointmentsForDate(dateStr) {
        return this.filteredAppointments.filter(appointment => appointment.date === dateStr);
    }
    
    updateStats() {
        // Get today's date
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        // Calculate this week's date range
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
        
        const startOfWeekStr = startOfWeek.toISOString().split('T')[0];
        const endOfWeekStr = endOfWeek.toISOString().split('T')[0];
        
        // Count appointments
        const todayCount = this.appointments.filter(apt => apt.date === todayStr).length;
        const weekCount = this.appointments.filter(apt => 
            apt.date >= startOfWeekStr && apt.date <= endOfWeekStr
        ).length;
        const pendingCount = this.appointments.filter(apt => apt.status === 'pending').length;
        const upcomingCount = this.appointments.filter(apt => 
            new Date(apt.date) > today && apt.status === 'confirmed'
        ).length;
        
        // Update stat elements
        this.updateStatElement('adminCalendarTodayCount', todayCount);
        this.updateStatElement('adminCalendarWeekCount', weekCount);
        this.updateStatElement('adminCalendarPendingCount', pendingCount);
        this.updateStatElement('adminCalendarUpcomingCount', upcomingCount);
    }
    
    updateStatElement(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }
    
    setupFilters() {
        this.filteredAppointments = [...this.appointments];
        this.applyFilter('all');
    }
    
    applyFilter(filter) {
        this.currentFilter = filter;
        
        // Update filter button states
        document.querySelectorAll('.calendar-filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        // Apply filter logic
        switch (filter) {
            case 'pending':
                this.filteredAppointments = this.appointments.filter(apt => apt.status === 'pending');
                break;
            case 'today':
                const today = new Date().toISOString().split('T')[0];
                this.filteredAppointments = this.appointments.filter(apt => apt.date === today);
                break;
            case 'confirmed':
                this.filteredAppointments = this.appointments.filter(apt => apt.status === 'confirmed');
                break;
            default:
                this.filteredAppointments = [...this.appointments];
        }
        
        // Re-render calendar
        this.renderCalendarGrid();
        this.updateStats();
    }
    
    switchView(view) {
        this.currentView = view;
        
        // Update view button states
        document.querySelectorAll('.calendar-view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Switch between grid and list view
        const gridView = document.querySelector('.admin-calendar-grid');
        const listView = document.querySelector('.admin-calendar-list');
        
        if (view === 'list') {
            if (gridView) gridView.style.display = 'none';
            if (listView) {
                listView.style.display = 'block';
                this.renderListView();
            }
        } else {
            if (gridView) gridView.style.display = 'grid';
            if (listView) listView.style.display = 'none';
        }
    }
    
    renderListView() {
        const listContainer = document.querySelector('.admin-calendar-list');
        if (!listContainer) return;
        
        const sortedAppointments = [...this.filteredAppointments].sort((a, b) => {
            return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
        });
        
        listContainer.innerHTML = sortedAppointments.map(appointment => `
            <div class="calendar-list-item ${appointment.status}" data-appointment-id="${appointment.id}">
                <div class="list-item-date">
                    <div class="date-day">${new Date(appointment.date).getDate()}</div>
                    <div class="date-month">${this.monthNames[new Date(appointment.date).getMonth()].substr(0, 3)}</div>
                </div>
                <div class="list-item-time">${appointment.time}</div>
                <div class="list-item-client">
                    <div class="client-name">${appointment.client.name}</div>
                    <div class="client-email">${appointment.client.email}</div>
                </div>
                <div class="list-item-type">${this.getAppointmentTypeText(appointment.type)}</div>
                <div class="list-item-status">
                    <span class="status-badge ${appointment.status}">
                        ${this.getStatusText(appointment.status)}
                    </span>
                </div>
                <div class="list-item-actions">
                    <button class="appointment-edit-btn" data-appointment-id="${appointment.id}" 
                            title="${this.getI18nText('common.edit') || 'Bearbeiten'}">
                        ✏️
                    </button>
                    <button class="appointment-cancel-btn" data-appointment-id="${appointment.id}"
                            title="${this.getI18nText('common.cancel') || 'Stornieren'}">
                        ❌
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    getStatusText(status) {
        const statusMap = {
            'pending': this.getI18nText('common.pending') || 'Ausstehend',
            'confirmed': this.getI18nText('admin_calendar.appointment_status.confirmed') || 'Bestätigt',
            'cancelled': this.getI18nText('common.cancelled') || 'Storniert',
            'completed': this.getI18nText('common.completed') || 'Abgeschlossen'
        };
        
        return statusMap[status] || status;
    }
    
    selectDate(dateStr) {
        this.selectedDate = dateStr;
        
        // Update visual selection
        document.querySelectorAll('.admin-calendar-day').forEach(day => {
            day.classList.remove('selected');
        });
        
        // Add selection to clicked day
        const dayElement = [...document.querySelectorAll('.admin-calendar-day')]
            .find(day => {
                const dayNum = parseInt(day.querySelector('.admin-calendar-day-number')?.textContent);
                const selectedDay = parseInt(dateStr.split('-')[2]);
                return dayNum === selectedDay;
            });
        
        if (dayElement) {
            dayElement.classList.add('selected');
        }
        
        // Show appointments for selected date
        this.showAppointmentsForDate(dateStr);
    }
    
    showAppointmentsForDate(dateStr) {
        const appointments = this.getAppointmentsForDate(dateStr);
        console.log(`Appointments for ${dateStr}:`, appointments);
        
        // Here you could show a detailed view or modal
        // For now, just log the appointments
    }
    
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.updateCalendar();
    }
    
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.updateCalendar();
    }
    
    goToToday() {
        this.currentDate = new Date();
        this.updateCalendar();
        
        // Select today's date
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        this.selectDate(todayStr);
    }
    
    createNewAppointment() {
        console.log('Creating new appointment...');
        
        // You could open a modal or navigate to appointment creation
        this.showCreateAppointmentModal();
    }
    
    showCreateAppointmentModal() {
        // Create and show appointment creation modal
        const modalHTML = `
            <div class="admin-modal" id="createAppointmentModal">
                <div class="admin-modal-content">
                    <div class="admin-modal-header">
                        <h3 data-i18n="admin_dashboard.calendar.quick_actions.new_appointment">Neuer Termin</h3>
                        <button class="admin-modal-close" onclick="this.closeCreateAppointmentModal()">&times;</button>
                    </div>
                    <div class="admin-modal-body">
                        <form id="createAppointmentForm">
                            <div class="form-group">
                                <label data-i18n="admin_dashboard.users.table.user">Client</label>
                                <input type="text" name="clientName" required>
                            </div>
                            <div class="form-group">
                                <label data-i18n="admin_dashboard.documents.table.date">Datum</label>
                                <input type="date" name="date" required>
                            </div>
                            <div class="form-group">
                                <label data-i18n="common.time">Zeit</label>
                                <input type="time" name="time" required>
                            </div>
                            <div class="form-group">
                                <label data-i18n="common.type">Typ</label>
                                <select name="type" required>
                                    <option value="consultation" data-i18n="admin_dashboard.services.consultation">Beratung</option>
                                    <option value="businessplan" data-i18n="admin_dashboard.services.businessplan_review">Businessplan</option>
                                    <option value="legal" data-i18n="admin_dashboard.services.legal_consultation">Rechtliches</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="admin-modal-footer">
                        <button class="btn btn-secondary" onclick="this.closeCreateAppointmentModal()" data-i18n="common.cancel">Abbrechen</button>
                        <button class="btn btn-primary" onclick="this.saveNewAppointment()" data-i18n="common.save">Speichern</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Apply i18n to modal if available
        if (typeof i18nManager !== 'undefined' && i18nManager.applyTranslations) {
            i18nManager.applyTranslations();
        }
    }
    
    closeCreateAppointmentModal() {
        const modal = document.getElementById('createAppointmentModal');
        if (modal) {
            modal.remove();
        }
    }
    
    saveNewAppointment() {
        const form = document.getElementById('createAppointmentForm');
        const formData = new FormData(form);
        
        const newAppointment = {
            id: this.appointments.length + 1,
            date: formData.get('date'),
            time: formData.get('time'),
            duration: 60,
            client: {
                name: formData.get('clientName'),
                email: '',
                phone: ''
            },
            consultant: this.consultants[0],
            type: formData.get('type'),
            status: 'pending',
            confirmed: false,
            location: 'online',
            notes: '',
            reminders: {
                email: true,
                sms: false
            }
        };
        
        this.appointments.push(newAppointment);
        this.setupFilters();
        this.updateCalendar();
        this.closeCreateAppointmentModal();
        
        console.log('New appointment created:', newAppointment);
    }
    
    editAppointment(appointmentId) {
        const appointment = this.appointments.find(apt => apt.id == appointmentId);
        if (!appointment) return;
        
        if (typeof i18nManager !== 'undefined' && i18nManager.t) {
            const editMessage = i18nManager.t('admin_calendar.edit_appointment');
            alert(editMessage || 'Bearbeitung wird geöffnet...');
        } else {
            alert('Bearbeitung wird geöffnet...');
        }
        
        console.log('Editing appointment:', appointment);
    }
    
    cancelAppointment(appointmentId) {
        const appointment = this.appointments.find(apt => apt.id == appointmentId);
        if (!appointment) return;
        
        let confirmMessage = 'Möchten Sie diesen Termin wirklich stornieren?';
        if (typeof i18nManager !== 'undefined' && i18nManager.t) {
            confirmMessage = i18nManager.t('admin_calendar.cancel_confirm') || confirmMessage;
        }
        
        if (!confirm(confirmMessage)) {
            return;
        }
        
        appointment.status = 'cancelled';
        this.setupFilters();
        this.updateCalendar();
        
        console.log('Appointment cancelled:', appointment);
    }
    
    loadAppointments() {
        this.showLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            // In real implementation, would fetch from API
            this.setupFilters();
            this.updateCalendar();
            this.showLoading(false);
        }, 1000);
    }
    
    showLoading(show) {
        const loadingElement = document.getElementById('adminCalendarLoading');
        if (loadingElement) {
            loadingElement.style.display = show ? 'flex' : 'none';
        }
        this.isLoading = show;
    }
    
    exportCalendar() {
        console.log('Exporting calendar...');
        
        // Create CSV content
        const csvContent = this.generateCSVContent();
        
        // Download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `calendar-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    
    generateCSVContent() {
        const headers = [
            this.getI18nText('admin_dashboard.documents.table.date') || 'Datum',
            this.getI18nText('common.time') || 'Zeit',
            this.getI18nText('admin_dashboard.users.table.user') || 'Client',
            this.getI18nText('common.type') || 'Typ',
            this.getI18nText('admin_dashboard.users.table.status') || 'Status',
            this.getI18nText('common.notes') || 'Notizen'
        ].join(',');
        
        const rows = this.appointments.map(apt => [
            apt.date,
            apt.time,
            apt.client.name,
            this.getAppointmentTypeText(apt.type),
            this.getStatusText(apt.status),
            apt.notes?.replace(/,/g, ';') || ''
        ].join(','));
        
        return [headers, ...rows].join('\n');
    }
    
    syncCalendar() {
        console.log('Syncing calendar...');
        this.loadAppointments();
    }
    
    destroy() {
        // Clean up event listeners
        const prevBtn = document.getElementById('adminCalendarPrevBtn');
        const nextBtn = document.getElementById('adminCalendarNextBtn');
        
        if (prevBtn) prevBtn.removeEventListener('click', this.previousMonth);
        if (nextBtn) nextBtn.removeEventListener('click', this.nextMonth);
        
        // Clear any modals
        this.closeCreateAppointmentModal();
        
        this.initialized = false;
    }
}

// Global methods for onclick handlers
window.AdminCalendar = {
    previousMonth: () => window.adminCalendar?.previousMonth(),
    nextMonth: () => window.adminCalendar?.nextMonth(),
    goToToday: () => window.adminCalendar?.goToToday(),
    createNewAppointment: () => window.adminCalendar?.createNewAppointment(),
    exportCalendar: () => window.adminCalendar?.exportCalendar(),
    syncCalendar: () => window.adminCalendar?.syncCalendar()
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.admin-calendar-container')) {
        window.adminCalendar = new AdminCalendar();
    }
});

// Re-initialize when i18n is ready
document.addEventListener('i18nReady', () => {
    if (window.adminCalendar) {
        window.adminCalendar.updateLanguage();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminCalendar;
}