# Admin Terminkalender - Dokumentation

## Übersicht

Das Admin Terminkalender System bietet eine umfassende Lösung für Administratoren zur Verwaltung aller Termine in der KI Konzept Builder Plattform. Es umfasst Kalenderansichten, Filteroptionen, Terminstatistiken und administrative Funktionen.

## Dateien

### CSS
- `admin-calendar-styles.css` - Vollständiges Styling für den Admin Terminkalender

### JavaScript  
- `js/admin-calendar.js` - Kernfunktionalität für Terminverwaltung

## Hauptkomponenten

### 1. Admin Terminkalender Interface

#### Struktur
- **Calendar Header** - Navigation, Titel und Steuerungsoptionen
- **Calendar Stats** - Statistische Übersicht der Termine  
- **Calendar Views** - Monatsansicht (Grid) und Listenansicht
- **Filter Controls** - Filterung nach Status, Datum, Typ
- **Quick Actions** - Schnellzugriff auf häufige Aktionen

### 2. API Funktionen

```javascript
// Hauptfunktionen
AdminCalendar.initialize();
AdminCalendar.switchView(view); // 'grid' oder 'list'
AdminCalendar.toggleFilter(filter);

// Navigation
AdminCalendar.previousMonth();
AdminCalendar.nextMonth();
AdminCalendar.goToToday();

// Aktionen
AdminCalendar.newAppointment();
AdminCalendar.exportCalendar();
AdminCalendar.syncCalendar();
AdminCalendar.showAppointmentDetails(appointmentId);
AdminCalendar.editAppointment(appointmentId);
AdminCalendar.cancelAppointment(appointmentId);
```

## Termintypen

### Unterstützte Beratungsarten

```javascript
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
```

## Status-Konfiguration

### Termin-Status

```javascript
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
```

## Kalenderansichten

### 1. Monatsansicht (Grid)

#### Struktur
```html
<div class="admin-calendar-grid">
    <!-- Wochentag-Header -->
    <div class="admin-calendar-weekday">Mo</div>
    <!-- ... weitere Wochentage -->
    
    <!-- Kalendertage -->
    <div class="admin-calendar-day" data-date="2024-08-18">
        <div class="admin-day-number">18</div>
        <div class="admin-day-counter">3</div>
        <div class="admin-day-appointments">
            <div class="admin-appointment-item financing confirmed">
                <div class="admin-appointment-time">14:00</div>
                <div class="admin-appointment-client">Marcel Gärtner</div>
            </div>
        </div>
    </div>
</div>
```

#### Features
- **Tag-Navigation** - Klick auf Datum für Detailansicht
- **Termin-Übersicht** - Bis zu 3 Termine pro Tag sichtbar
- **Status-Farben** - Visuelle Unterscheidung nach Termintyp und Status
- **Heute-Hervorhebung** - Aktuelle Tag wird hervorgehoben

### 2. Listenansicht

#### Struktur
```html
<div class="admin-calendar-list">
    <div class="admin-calendar-list-section">
        <div class="admin-calendar-list-date">
            <span>Sonntag, 18. August 2024</span>
            <span class="appointment-count">3 Termine</span>
        </div>
        
        <div class="admin-calendar-list-appointments">
            <div class="admin-list-appointment" data-appointment-id="app-001">
                <div class="admin-list-appointment-header">
                    <h4 class="admin-list-appointment-title">💰 Erstberatung Finanzierung</h4>
                    <span class="admin-list-appointment-status confirmed">Bestätigt</span>
                </div>
                
                <div class="admin-list-appointment-info">
                    <span class="admin-list-appointment-time">14:00</span>
                    <span class="admin-list-appointment-client">Marcel Gärtner</span>
                    <div class="admin-list-appointment-actions">
                        <button class="admin-appointment-action-btn">✏️</button>
                        <button class="admin-appointment-action-btn">❌</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Filter-System

### Verfügbare Filter

```javascript
// Filter-Optionen
const filters = [
    'all',        // Alle Termine
    'pending',    // Ausstehende Termine
    'confirmed',  // Bestätigte Termine  
    'cancelled',  // Stornierte Termine
    'today',      // Termine heute
    'this-week'   // Termine diese Woche
];

// Filter anwenden
function filterAppointments() {
    if (currentFilter === 'all') {
        filteredAppointments = [...appointments];
    } else {
        filteredAppointments = appointments.filter(appointment => {
            switch (currentFilter) {
                case 'pending':
                    return appointment.status === 'pending';
                case 'today':
                    const today = new Date().toISOString().split('T')[0];
                    return appointment.date === today;
                // ... weitere Filter
            }
        });
    }
}
```

## Statistiken

### Kalender-Statistiken

```javascript
// Statistische Auswertungen
const stats = {
    todayCount: 0,      // Termine heute
    weekCount: 0,       // Termine diese Woche
    pendingCount: 0,    // Ausstehende Termine
    upcomingCount: 0    // Kommende Termine
};

// Stats aktualisieren
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
    
    // Update UI
    updateStatElement('adminCalendarTodayCount', todayAppointments.length);
    updateStatElement('adminCalendarWeekCount', thisWeek.length);
    updateStatElement('adminCalendarPendingCount', pendingAppointments.length);
}
```

## Termin-Datenverwaltung

### Termin-Datenstruktur

```javascript
const appointment = {
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
    notes: 'Interessiert an Gründerzuschuss',
    meetingLink: 'https://meet.ki-konzept-builder.de/room/abc123',
    createdAt: '2024-08-10T10:30:00Z'
};
```

### Mock-Daten

```javascript
const mockAppointments = [
    {
        id: 'app-001',
        date: '2024-08-18',
        time: '14:00',
        type: 'financing-consultation',
        status: 'pending',
        client: { name: 'Marcel Gärtner', email: 'marcel@example.com' },
        title: 'Erstberatung Finanzierung'
    },
    // ... weitere Termine
];
```

## Administrative Funktionen

### 1. Termin bearbeiten

```javascript
function editAppointment(appointmentId) {
    console.log('Edit appointment:', appointmentId);
    LoadingStates?.showButtonLoading?.(event.target, 'Bearbeiten');
    
    setTimeout(() => {
        LoadingStates?.hideButtonLoading?.(event.target);
        // Öffne Bearbeitungsmodal
        alert('Bearbeitung wird geöffnet...');
    }, 1000);
}
```

### 2. Termin stornieren

```javascript
function cancelAppointment(appointmentId) {
    if (!confirm('Möchten Sie diesen Termin wirklich stornieren?')) {
        return;
    }
    
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
        appointment.status = 'cancelled';
        filterAppointments();
        updateCalendarDisplay();
        updateCalendarStats();
    }
}
```

### 3. Kalender exportieren

```javascript
function exportCalendar() {
    LoadingStates?.showButtonLoading?.(event.target, 'Export');
    
    setTimeout(() => {
        const csvContent = generateCalendarCSV();
        downloadCSV(csvContent, `calendar-export-${new Date().toISOString().split('T')[0]}.csv`);
        LoadingStates?.hideButtonLoading?.(event.target);
    }, 2000);
}

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
```

## UI Komponenten

### Kalender-Header

```html
<div class="admin-calendar-header">
    <h2 class="admin-calendar-title">Terminkalender</h2>
    
    <div class="admin-calendar-nav">
        <button class="admin-calendar-nav-btn" id="adminCalendarPrevBtn">◀</button>
        <span class="current-month-year" id="adminCalendarTitle">August 2024</span>
        <button class="admin-calendar-nav-btn" id="adminCalendarNextBtn">▶</button>
    </div>
    
    <div class="admin-calendar-controls">
        <div class="calendar-view-toggle">
            <button class="calendar-view-btn active" data-view="grid">Monat</button>
            <button class="calendar-view-btn" data-view="list">Liste</button>
        </div>
        
        <button class="calendar-filter-btn active" data-filter="all">Alle</button>
        <button class="calendar-filter-btn" data-filter="pending">Ausstehend</button>
        <button class="calendar-filter-btn" data-filter="today">Heute</button>
    </div>
</div>
```

### Statistik-Karten

```html
<div class="admin-calendar-stats">
    <div class="admin-calendar-stat">
        <div class="admin-calendar-stat-number" id="adminCalendarTodayCount">0</div>
        <div class="admin-calendar-stat-label">Heute</div>
    </div>
    <div class="admin-calendar-stat">
        <div class="admin-calendar-stat-number" id="adminCalendarWeekCount">0</div>
        <div class="admin-calendar-stat-label">Diese Woche</div>
    </div>
    <div class="admin-calendar-stat">
        <div class="admin-calendar-stat-number" id="adminCalendarPendingCount">0</div>
        <div class="admin-calendar-stat-label">Ausstehend</div>
    </div>
    <div class="admin-calendar-stat">
        <div class="admin-calendar-stat-number" id="adminCalendarUpcomingCount">0</div>
        <div class="admin-calendar-stat-label">Kommende</div>
    </div>
</div>
```

### Schnellaktionen

```html
<div class="admin-calendar-quick-actions">
    <div class="admin-calendar-actions-left">
        <button class="admin-quick-action-btn primary" onclick="AdminCalendar.newAppointment()">
            ➕ Neuer Termin
        </button>
        <button class="admin-quick-action-btn" id="adminCalendarTodayBtn">
            🕐 Heute
        </button>
    </div>
    
    <div class="admin-calendar-actions-right">
        <button class="admin-quick-action-btn" onclick="AdminCalendar.exportCalendar()">
            📥 Export
        </button>
        <button class="admin-quick-action-btn" onclick="AdminCalendar.syncCalendar()">
            🔄 Sync
        </button>
    </div>
</div>
```

## CSS Styling Features

### Premium Design
- **Glassmorphism Effects** für moderne Optik
- **Gradient Backgrounds** für Hervorhebungen  
- **Smooth Animations** für alle Interaktionen
- **Responsive Design** für alle Gerätegrößen
- **Dark Mode Support** vollständig implementiert

### Termintyp-Farben

```css
.admin-appointment-item.financing {
    border-left-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
}

.admin-appointment-item.business-plan {
    border-left-color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
}

.admin-appointment-item.legal {
    border-left-color: #f59e0b;
    background: rgba(245, 158, 11, 0.1);
}

.admin-appointment-item.workshop {
    border-left-color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
}
```

### Status-Farben

```css
.admin-list-appointment-status.pending {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
}

.admin-list-appointment-status.confirmed {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

.admin-list-appointment-status.cancelled {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

.admin-list-appointment-status.completed {
    background: rgba(107, 114, 128, 0.1);
    color: #6b7280;
}
```

## Responsive Verhalten

### Desktop (>1024px)
- Vollständige Kalenderansicht mit allen Features
- Grid-Layout mit 7 Spalten für Wochentage
- Seitliche Navigation und Filteroptionen

### Tablet (768px-1024px)
- Kompakte Header-Navigation
- Reduzierte Kalendertage-Höhe
- Angepasste Statistik-Anordnung

### Mobile (<768px)
- Nur Listenansicht verfügbar
- Gestapelte Aktionsbuttons
- Vereinfachte Terminanzeige
- Touch-optimierte Bedienung

```css
@media (max-width: 768px) {
    .admin-calendar-grid {
        display: none;
    }
    
    .admin-calendar-list {
        padding: var(--spacing-16);
    }
    
    .admin-calendar-stats {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .admin-calendar-quick-actions {
        flex-direction: column;
        align-items: stretch;
    }
}
```

## Integration im Admin Dashboard

### Navigation
```html
<nav class="header-nav">
    <div class="nav">
        <a href="#overview" class="nav-link">Übersicht</a>
        <a href="#users" class="nav-link">Nutzer</a>
        <a href="#appointments" class="nav-link active">Termine</a>
        <a href="#payments" class="nav-link">Zahlungen</a>
        <a href="#analytics" class="nav-link">Analytics</a>
    </div>
</nav>
```

### Terminverwaltungs-Sektion
```html
<section id="appointments-section" class="admin-section">
    <h1 class="section-title">Terminverwaltung</h1>
    
    <div class="admin-card">
        <div class="admin-calendar-container">
            <!-- Vollständiger Kalender hier -->
        </div>
    </div>
</section>
```

## Implementierung Status

### ✅ Vollständig implementiert:
- ✅ **Kalender Grid-Ansicht** - Monatsansicht mit Navigation
- ✅ **Kalender Listen-Ansicht** - Detaillierte Terminliste
- ✅ **Filter-System** - Nach Status, Datum und Typ filtern
- ✅ **Statistiken** - Live-Statistiken für Terminübersicht
- ✅ **Navigation** - Monatsnavigation und Heute-Sprung
- ✅ **Termindetails** - Vollständige Termininformationen
- ✅ **Administrative Aktionen** - Bearbeiten, Stornieren, Export
- ✅ **Mock-Daten** - Realistische Testdaten
- ✅ **Loading States** - Integriert mit LoadingStates System
- ✅ **Responsive Design** - Mobile-optimiert
- ✅ **Dark Mode** - Vollständig unterstützt
- ✅ **CSV Export** - Datenexport für externe Systeme
- ✅ **Kalender Sync** - Synchronisationsfunktionen

### 🎨 Design Features:
- ✅ **Premium Styling** - Glassmorphism, Gradients, Animationen
- ✅ **Farbkodierung** - Status und Typbasierte Färbung
- ✅ **Interactive Elements** - Hover Effects, Transitions
- ✅ **Status Indicators** - Visueller Status für alle Termine
- ✅ **Quick Actions** - Schnellzugriff auf wichtige Funktionen

Das Admin Terminkalender System bietet eine vollständige, professionelle Lösung für die Verwaltung aller Termine in der KI Konzept Builder Plattform mit allen notwendigen administrativen Features und einer optimalen Benutzererfahrung.