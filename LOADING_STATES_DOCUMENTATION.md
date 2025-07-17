# Loading States Dokumentation

## Übersicht

Das Loading States System bietet eine umfassende Lösung für die Anzeige von Ladezuständen in der KI Konzept Builder Anwendung. Es verbessert die Benutzererfahrung durch klares visuelles Feedback während asynchroner Operationen.

## Dateien

### CSS
- `loading-states.css` - Alle Styling-Definitionen für Loading States

### JavaScript  
- `js/loading-states.js` - Kernfunktionalität für Loading States Management

## Hauptkomponenten

### 1. LoadingStates (Kern-API)

```javascript
// Button Loading
LoadingStates.showButtonLoading(buttonElement, originalText);
LoadingStates.hideButtonLoading(buttonElement);

// Card Loading
LoadingStates.showCardLoading(cardElement);
LoadingStates.hideCardLoading(cardElement);

// Page Loading Overlay
LoadingStates.showPageLoading(message, subtitle);
LoadingStates.hidePageLoading();

// Section Loading
LoadingStates.showSectionLoading(sectionElement, message);
LoadingStates.hideSectionLoading(sectionElement);

// Skeleton Loading
LoadingStates.showSkeletonLoading(containerElement, itemCount);
LoadingStates.hideSkeletonLoading(containerElement);

// Modal Loading
LoadingStates.showModalLoading(modalElement);
LoadingStates.hideModalLoading(modalElement);

// Form Loading
LoadingStates.showFormLoading(formElement);
LoadingStates.hideFormLoading(formElement);
```

### 2. AppLoading (Anwendungsspezifisch)

```javascript
// Dashboard
AppLoading.showDashboardLoading();
AppLoading.hideDashboardLoading();

// Calendar
AppLoading.showCalendarLoading();
AppLoading.hideCalendarLoading();

// Business Plan
AppLoading.showBusinessPlanLoading(message);
AppLoading.hideBusinessPlanLoading();

// Document Viewer
AppLoading.showDocumentLoading();
AppLoading.hideDocumentLoading();

// Upload
AppLoading.showUploadLoading(fileName);
AppLoading.hideUploadLoading();
```

## CSS-Klassen

### Button Loading
```css
.btn.loading {
    position: relative;
    color: transparent !important;
    pointer-events: none;
    cursor: not-allowed;
}

.btn.loading::after {
    /* Spinner Animation */
}
```

### Card Loading
```css
.card.loading::before {
    /* Overlay */
}

.card.loading::after {
    /* Spinner */
}
```

### Skeleton Loading
```css
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}
```

### Page Loading
```css
.page-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    z-index: 1000;
}
```

## Verwendung in Funktionen

### Business Plan Creator

```javascript
// Template Selection
async function selectTemplate(templateId) {
    AppLoading.showBusinessPlanLoading('Template wird vorbereitet...');
    
    try {
        await LoadingStates.simulateLoading(1000, 2000);
        // ... Implementierung
    } finally {
        AppLoading.hideBusinessPlanLoading();
    }
}

// Template Preview
async function previewTemplate(templateId) {
    const modal = document.getElementById('templatePreviewModal');
    LoadingStates.showModalLoading(modal);
    
    try {
        await LoadingStates.simulateLoading(500, 1000);
        // ... Implementierung
    } finally {
        LoadingStates.hideModalLoading(modal);
    }
}
```

### Dashboard

```javascript
// Dashboard Initialization
document.addEventListener('DOMContentLoaded', function() {
    AppLoading.showDashboardLoading();
    
    // ... Lade Dashboard-Daten
    
    setTimeout(() => {
        AppLoading.hideDashboardLoading();
    }, 1000);
});
```

### Calendar

```javascript
// Calendar Modal
async function openCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'flex';
    
    AppLoading.showCalendarLoading();
    
    try {
        await LoadingStates.simulateLoading(500, 1000);
        renderCalendar();
    } finally {
        AppLoading.hideCalendarLoading();
    }
}
```

### Funding Modal

```javascript
// Funding Submission
async function submitFundingRequest() {
    const submitButton = document.getElementById('submitFundingBtn');
    LoadingStates.showButtonLoading(submitButton, 'Förderung beantragen');
    
    try {
        await LoadingStates.simulateLoading(2000, 3000);
        // ... Submit Logic
    } finally {
        LoadingStates.hideButtonLoading(submitButton);
    }
}
```

## Automatische Integration

### Formular-Integration
```javascript
// Automatisch für alle Formulare
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        LoadingStates.showFormLoading(this);
        
        setTimeout(() => {
            LoadingStates.hideFormLoading(this);
        }, 3000);
    });
});
```

### Link-Integration
```javascript
// Automatisch für alle Navigation-Links
document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const currentPage = window.location.pathname.split('/').pop();
        const targetPage = this.href.split('/').pop();
        
        if (currentPage !== targetPage) {
            LoadingStates.showPageLoading(
                'Seite wird geladen...',
                'Sie werden weitergeleitet'
            );
        }
    });
});
```

## Hilfsfunktionen

### Simulierte Ladezeiten
```javascript
// Realistische Ladezeiten simulieren
await LoadingStates.simulateLoading(minDelay, maxDelay);

// Beispiele:
await LoadingStates.simulateLoading(500, 1000);  // Schnell
await LoadingStates.simulateLoading(1000, 2000); // Mittel  
await LoadingStates.simulateLoading(2000, 3000); // Langsam
```

### Fehlerbehandlung
```javascript
// Automatisches Cleanup bei Fehlern
window.addEventListener('error', function() {
    LoadingStates.clearAllLoading();
});

window.addEventListener('beforeunload', function() {
    LoadingStates.clearAllLoading();
});
```

## Dark Mode Support

Alle Loading States unterstützen automatisch Dark Mode:

```css
[data-theme="dark"] .skeleton {
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
}

[data-theme="dark"] .page-loading {
    background: rgba(0, 0, 0, 0.9);
}
```

## Accessibility

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
    .loading-spinner,
    .skeleton,
    .loading-dots span {
        animation-duration: 3s;
    }
}
```

### ARIA Labels
```javascript
// Automatische ARIA-Labels für Screen Reader
LoadingStates.showButtonLoading(button, 'Loading...');
// Setzt automatisch: aria-label="Loading..."
```

## Performance

### Tracking
```javascript
// Automatisches Tracking aktiver Loading States
LoadingStates.activeLoadings; // Set mit allen aktiven Loading States
```

### Cleanup
```javascript
// Manueller Cleanup aller Loading States
LoadingStates.clearAllLoading();
```

## Integration Status

### ✅ Implementiert in:
- ✅ Business Plan Creator
- ✅ Dashboard 
- ✅ Calendar Modal
- ✅ Funding Modal
- ✅ Admin Dashboard
- ✅ Landing Page
- ✅ Alle HTML Seiten (CSS/JS eingebunden)

### 📋 CSS Styling:
- ✅ Button Loading States
- ✅ Card Loading States
- ✅ Page Loading Overlay
- ✅ Section Loading
- ✅ Skeleton Loading
- ✅ Modal Loading
- ✅ Form Loading
- ✅ Progress Loading
- ✅ Upload Loading
- ✅ Search Loading
- ✅ Table Loading
- ✅ Calendar Loading
- ✅ Document Loading

### 🎨 Design Features:
- ✅ Premium Animations
- ✅ Dark Mode Support
- ✅ Responsive Design
- ✅ Accessibility Support
- ✅ Performance Optimiert

## Beispiel-Implementierung

### Complete Button Loading Example
```javascript
async function handleButtonAction() {
    const button = document.querySelector('#myButton');
    
    try {
        // Zeige Loading
        LoadingStates.showButtonLoading(button, 'Action ausführen');
        
        // Simuliere API Call
        await LoadingStates.simulateLoading(1500, 2500);
        
        // Erfolgreiche Aktion
        showNotification('Aktion erfolgreich!', 'success');
        
    } catch (error) {
        // Fehlerbehandlung
        showNotification('Fehler bei der Aktion', 'error');
        
    } finally {
        // Loading immer verstecken
        LoadingStates.hideButtonLoading(button);
    }
}
```

Das Loading States System ist vollständig implementiert und bietet eine konsistente, benutzerfreundliche Erfahrung für alle asynchronen Operationen in der Anwendung.