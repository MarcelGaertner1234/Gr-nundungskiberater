# Error Handling System - Dokumentation

## Übersicht

Das Error Handling System bietet eine umfassende Lösung für die Fehlerbehandlung in der gesamten KI Konzept Builder Plattform. Es umfasst automatische Fehlererkennung, benutzerfreundliche Fehlermeldungen, Retry-Mechanismen und detailliertes Error Logging.

## Dateien

### CSS
- `error-handling-styles.css` - Vollständiges Styling für alle Error-UI-Komponenten

### JavaScript
- `js/error-handling.js` - Kernfunktionalität für Fehlerbehandlung

## Hauptkomponenten

### 1. Error Handling Interface

#### Komponenten
- **Toast Notifications** - Nicht-blockierende Benachrichtigungen
- **Error Modals** - Detaillierte Fehlerinformationen
- **Inline Errors** - Kontextuelle Fehlermeldungen
- **Field Validation** - Formularvalidierung
- **Empty States** - Benutzerfreundliche leere Zustände
- **Loading States** - Ladezustände mit Fehlerbehandlung

### 2. API Funktionen

```javascript
// Hauptfunktionen
ErrorHandling.initialize();
ErrorHandling.handleError(errorInfo);
ErrorHandling.showToast(type, title, message, actions);
ErrorHandling.dismissToast(toastId);

// Modal-Funktionen
ErrorHandling.showErrorModal(type, title, message, details);
ErrorHandling.closeErrorModal();

// Formularvalidierung
ErrorHandling.validateForm(formElement);

// UI-Helfer
ErrorHandling.showLoadingOverlay(message);
ErrorHandling.hideLoadingOverlay();
ErrorHandling.showEmptyState(container, title, message, actions);
ErrorHandling.showInlineError(container, message, type);

// Error Logging
ErrorHandling.getErrorLogs();
ErrorHandling.clearErrorLogs();
ErrorHandling.exportErrorLogs();

// Utility-Funktionen
ErrorHandling.reloadPage();
ErrorHandling.retryLastAction();
```

## Fehlertypen

### Vordefinierte Fehlertypen

```javascript
const errorTypes = {
    'network': {
        icon: '🌐',
        title: 'Netzwerkfehler',
        defaultMessage: 'Verbindung zum Server konnte nicht hergestellt werden.'
    },
    'validation': {
        icon: '⚠️',
        title: 'Validierungsfehler',
        defaultMessage: 'Bitte überprüfen Sie Ihre Eingaben.'
    },
    'authentication': {
        icon: '🔒',
        title: 'Authentifizierungsfehler',
        defaultMessage: 'Bitte melden Sie sich erneut an.'
    },
    'permission': {
        icon: '🚫',
        title: 'Zugriff verweigert',
        defaultMessage: 'Sie haben keine Berechtigung für diese Aktion.'
    },
    'server': {
        icon: '🖥️',
        title: 'Serverfehler',
        defaultMessage: 'Ein interner Fehler ist aufgetreten.'
    },
    'client': {
        icon: '⚡',
        title: 'Anwendungsfehler',
        defaultMessage: 'Ein unerwarteter Fehler ist aufgetreten.'
    },
    'timeout': {
        icon: '⏱️',
        title: 'Zeitüberschreitung',
        defaultMessage: 'Die Anfrage hat zu lange gedauert.'
    },
    'offline': {
        icon: '📡',
        title: 'Offline',
        defaultMessage: 'Sie sind derzeit offline.'
    }
};
```

## Toast Notifications

### Toast-Typen

```javascript
// Error Toast
ErrorHandling.showToast('error', 'Fehler', 'Ein Fehler ist aufgetreten.');

// Warning Toast
ErrorHandling.showToast('warning', 'Warnung', 'Bitte beachten Sie...');

// Info Toast
ErrorHandling.showToast('info', 'Information', 'Zur Information...');

// Success Toast
ErrorHandling.showToast('success', 'Erfolg', 'Aktion erfolgreich.');
```

### Toast mit Aktionen

```javascript
ErrorHandling.showToast('error', 'Authentifizierung erforderlich', 'Bitte melden Sie sich erneut an.', [
    {
        label: 'Zur Anmeldung',
        handler: 'window.location.href="login.html"'
    }
]);
```

### Toast-Struktur

```html
<div class="error-toast-container">
    <div class="error-toast error">
        <div class="error-toast-icon">❌</div>
        <div class="error-toast-content">
            <div class="error-toast-title">Fehler</div>
            <div class="error-toast-message">Ein Fehler ist aufgetreten.</div>
            <div class="error-toast-actions">
                <button class="error-toast-action">Wiederholen</button>
            </div>
        </div>
        <button class="error-toast-close">×</button>
    </div>
</div>
```

## Error Modal

### Modal-Verwendung

```javascript
ErrorHandling.showErrorModal(
    'error',
    'Schwerwiegender Fehler',
    'Die Anwendung konnte nicht geladen werden.',
    'Error: Unable to fetch data from API endpoint /api/data'
);
```

### Modal-Struktur

```html
<div class="error-modal active">
    <div class="error-modal-content">
        <div class="error-modal-header">
            <div class="error-modal-icon error">❌</div>
            <h2 class="error-modal-title">Schwerwiegender Fehler</h2>
        </div>
        <div class="error-modal-body">
            <div class="error-modal-message">Die Anwendung konnte nicht geladen werden.</div>
            <div class="error-modal-details">
                <div class="error-modal-details-title">Technische Details</div>
                <div class="error-modal-code">Error: Unable to fetch data...</div>
            </div>
            <div class="error-modal-details">
                <div class="error-modal-details-title">Was können Sie tun?</div>
                <ul>
                    <li>Versuchen Sie die Seite neu zu laden</li>
                    <li>Überprüfen Sie Ihre Internetverbindung</li>
                    <li>Kontaktieren Sie den Support</li>
                </ul>
            </div>
        </div>
        <div class="error-modal-footer">
            <button class="btn btn-secondary">Schließen</button>
            <button class="btn btn-primary">Seite neu laden</button>
        </div>
    </div>
</div>
```

## Formularvalidierung

### Validierung aktivieren

```html
<form data-validate="true">
    <input type="email" name="email" required>
    <input type="text" name="name" required minlength="3">
    <input type="tel" name="phone" pattern="[0-9]{10}" data-pattern-error="Bitte 10 Ziffern eingeben">
    <button type="submit">Absenden</button>
</form>
```

### Validierungsregeln

```javascript
// Automatische Validierung bei Submit
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.dataset.validate === 'true') {
        e.preventDefault();
        
        if (ErrorHandling.validateForm(form)) {
            // Form ist gültig
            console.log('Form is valid, submitting...');
        }
    }
});
```

### Unterstützte Validierungen

- **Required Fields** - Pflichtfelder
- **Email Format** - E-Mail-Format
- **Min Length** - Mindestlänge
- **Pattern Matching** - Muster-Validierung
- **Custom Validation** - Benutzerdefinierte Validierung

## Inline Error Messages

### Verwendung

```javascript
const container = document.getElementById('myContainer');
ErrorHandling.showInlineError(container, 'Datei konnte nicht hochgeladen werden.', 'error');
```

### Inline Error Typen

```html
<!-- Error -->
<div class="error-inline error">
    <span class="error-inline-icon">❌</span>
    <div class="error-inline-content">Datei konnte nicht hochgeladen werden.</div>
</div>

<!-- Warning -->
<div class="error-inline warning">
    <span class="error-inline-icon">⚠️</span>
    <div class="error-inline-content">Warnung: Große Dateigröße.</div>
</div>

<!-- Info -->
<div class="error-inline info">
    <span class="error-inline-icon">ℹ️</span>
    <div class="error-inline-content">Information: Neue Version verfügbar.</div>
</div>

<!-- Success -->
<div class="error-inline success">
    <span class="error-inline-icon">✅</span>
    <div class="error-inline-content">Erfolgreich gespeichert.</div>
</div>
```

## Empty States

### Verwendung

```javascript
const container = document.getElementById('dataContainer');
ErrorHandling.showEmptyState(
    container,
    'Keine Daten gefunden',
    'Es sind noch keine Einträge vorhanden. Erstellen Sie Ihren ersten Eintrag.',
    [
        {
            label: 'Neuen Eintrag erstellen',
            handler: 'createNewEntry()',
            primary: true
        },
        {
            label: 'Hilfe',
            handler: 'showHelp()'
        }
    ]
);
```

### Empty State Struktur

```html
<div class="error-empty-state">
    <div class="error-empty-state-icon">📭</div>
    <div class="error-empty-state-title">Keine Daten gefunden</div>
    <div class="error-empty-state-message">Es sind noch keine Einträge vorhanden.</div>
    <div class="error-empty-state-actions">
        <button class="btn btn-primary">Neuen Eintrag erstellen</button>
        <button class="btn btn-secondary">Hilfe</button>
    </div>
</div>
```

## Globale Fehlerbehandlung

### Automatische Fehler-Erfassung

```javascript
// Window Error Event
window.addEventListener('error', function(event) {
    ErrorHandling.handleError({
        type: 'client',
        message: event.message,
        stack: event.error?.stack,
        file: event.filename,
        line: event.lineno,
        column: event.colno
    });
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', function(event) {
    ErrorHandling.handleError({
        type: 'client',
        message: 'Unbehandelte Promise-Ablehnung',
        details: event.reason
    });
});
```

### Netzwerk-Fehlerbehandlung

```javascript
// Automatisches Fetch Override
const originalFetch = window.fetch;
window.fetch = async function(...args) {
    try {
        const response = await originalFetch(...args);
        
        if (!response.ok) {
            // HTTP-Fehler behandeln
            handleHTTPError(response);
        }
        
        return response;
    } catch (error) {
        // Netzwerkfehler behandeln
        handleNetworkError(error, ...args);
        throw error;
    }
};
```

## Retry-Mechanismus

### Offline-Warteschlange

```javascript
// Automatisches Hinzufügen zur Warteschlange bei Offline
function handleNetworkError(error, url, options) {
    if (!navigator.onLine) {
        ErrorHandling.handleError({
            type: 'offline',
            message: 'Keine Internetverbindung'
        });
        
        // Zur Warteschlange hinzufügen
        addToRetryQueue({ url, options });
    }
}

// Automatische Wiederholung bei Verbindung
window.addEventListener('online', function() {
    ErrorHandling.showToast('success', 'Online', 'Verbindung wiederhergestellt.');
    processRetryQueue();
});
```

## Loading States mit Fehlerbehandlung

### Loading Overlay

```javascript
// Anzeigen
ErrorHandling.showLoadingOverlay('Daten werden geladen...');

// Verstecken
ErrorHandling.hideLoadingOverlay();
```

### Loading Overlay Struktur

```html
<div class="error-loading-overlay">
    <div class="error-loading-spinner"></div>
    <div>Daten werden geladen...</div>
</div>
```

## Error Logging

### Fehler-Logs abrufen

```javascript
// Alle Logs abrufen
const logs = ErrorHandling.getErrorLogs();

// Logs löschen
ErrorHandling.clearErrorLogs();

// Logs exportieren
ErrorHandling.exportErrorLogs(); // Downloads als JSON
```

### Log-Struktur

```javascript
{
    id: 'error-1234567890-abc123',
    type: 'network',
    message: 'Netzwerkfehler aufgetreten',
    timestamp: '2024-01-16T10:30:00.000Z',
    details: 'Connection refused',
    stack: 'Error stack trace...',
    file: 'dashboard.js',
    line: 123,
    column: 45
}
```

## CSS-Klassen

### Toast-Klassen

```css
.error-toast { /* Base toast styling */ }
.error-toast.error { /* Error toast */ }
.error-toast.warning { /* Warning toast */ }
.error-toast.info { /* Info toast */ }
.error-toast.success { /* Success toast */ }
```

### Modal-Klassen

```css
.error-modal { /* Modal backdrop */ }
.error-modal.active { /* Active modal */ }
.error-modal-content { /* Modal content */ }
```

### Inline-Klassen

```css
.error-inline { /* Base inline error */ }
.error-inline.error { /* Error style */ }
.error-inline.warning { /* Warning style */ }
.error-inline.info { /* Info style */ }
.error-inline.success { /* Success style */ }
```

### Field-Klassen

```css
.error-field-input { /* Input field */ }
.error-field-input.error { /* Error state */ }
.error-field-message { /* Error message */ }
```

## Best Practices

### 1. Fehlerbehandlung in Async-Funktionen

```javascript
async function fetchData() {
    try {
        ErrorHandling.showLoadingOverlay('Daten werden geladen...');
        
        const response = await fetch('/api/data');
        const data = await response.json();
        
        // Erfolg
        return data;
        
    } catch (error) {
        ErrorHandling.handleError({
            type: 'network',
            message: 'Daten konnten nicht geladen werden',
            details: error.message
        });
    } finally {
        ErrorHandling.hideLoadingOverlay();
    }
}
```

### 2. Formularvalidierung

```javascript
function submitForm(form) {
    // Validieren
    if (!ErrorHandling.validateForm(form)) {
        return;
    }
    
    // Formular absenden
    try {
        // Submit logic
    } catch (error) {
        ErrorHandling.showToast('error', 'Fehler', 'Formular konnte nicht gesendet werden.');
    }
}
```

### 3. Benutzerfreundliche Fehlermeldungen

```javascript
// Schlecht
ErrorHandling.showToast('error', 'Error', 'Error 500: Internal Server Error');

// Gut
ErrorHandling.showToast('error', 'Fehler', 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
```

## Implementierung Status

### ✅ Vollständig implementiert:
- ✅ **Toast Notifications** - Alle Toast-Typen mit Aktionen
- ✅ **Error Modals** - Detaillierte Fehleranzeige
- ✅ **Inline Errors** - Kontextuelle Fehlermeldungen
- ✅ **Form Validation** - Umfassende Formularvalidierung
- ✅ **Empty States** - Benutzerfreundliche leere Zustände
- ✅ **Loading States** - Ladezustände mit Overlay
- ✅ **Global Error Handling** - Automatische Fehlererkennung
- ✅ **Network Monitoring** - Offline/Online Erkennung
- ✅ **Retry Mechanism** - Automatische Wiederholungen
- ✅ **Error Logging** - Vollständiges Error Logging
- ✅ **HTTP Error Handling** - Status-Code basierte Behandlung
- ✅ **Dark Mode Support** - Vollständig unterstützt
- ✅ **Responsive Design** - Mobile-optimiert
- ✅ **Accessibility** - Keyboard Navigation, Focus Management

### 🎨 Design Features:
- ✅ **Premium Styling** - Glassmorphism, Gradients, Animationen
- ✅ **Smooth Animations** - Slide-In/Out, Shake, Pulse
- ✅ **Visual Hierarchy** - Klare Fehlertyp-Unterscheidung
- ✅ **Color Coding** - Rot (Error), Orange (Warning), Blau (Info), Grün (Success)
- ✅ **Interactive Elements** - Hover Effects, Click Actions

Das Error Handling System bietet eine vollständige, professionelle Lösung für die Fehlerbehandlung in der KI Konzept Builder Plattform mit allen modernen Features für eine optimale Benutzererfahrung und Entwickler-Freundlichkeit.