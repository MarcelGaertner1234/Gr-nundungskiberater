# Tooltips & Help Text System - Dokumentation

## Übersicht

Das Tooltips & Help Text System bietet eine umfassende Lösung für kontextuelle Hilfe und Benutzerführung in der KI Konzept Builder Plattform. Es umfasst Tooltips, ein Help Panel, Onboarding-Touren und Inline-Hilfetexte.

## Dateien

### CSS
- `tooltips-styles.css` - Vollständiges Styling für alle Tooltip- und Hilfe-Komponenten

### JavaScript
- `js/tooltips.js` - Kernfunktionalität für Tooltips und Hilfesystem

## Hauptkomponenten

### 1. Tooltip System

#### Komponenten
- **Tooltips** - Kontextuelle Hilfe-Popups
- **Help Button** - Globaler Hilfe-Button (unten rechts)
- **Help Panel** - Slide-out Hilfe-Panel
- **Onboarding Tour** - Geführte Tour für neue Nutzer
- **Inline Help** - Eingebettete Hilfetexte
- **Field Help** - Formularfeld-spezifische Hilfe

### 2. API Funktionen

```javascript
// Hauptfunktionen
Tooltips.initialize();
Tooltips.showTooltip(trigger);
Tooltips.hideTooltip(trigger);
Tooltips.toggleTooltip(trigger);
Tooltips.hideAllTooltips();

// Tooltip Management
Tooltips.addTooltip(elementSelector, tooltipId, position);
Tooltips.addHelpText(elementSelector, helpText, icon);
Tooltips.addFieldHelp(fieldSelector, helpText);
Tooltips.addContextualHelp(containerSelector, message, type);

// Help Panel
Tooltips.openHelpPanel();
Tooltips.closeHelpPanel();
Tooltips.toggleHelpPanel();
Tooltips.updateHelpPanelContent(page);

// Onboarding
Tooltips.startOnboarding();
Tooltips.nextOnboardingStep();
Tooltips.previousOnboardingStep();
Tooltips.skipOnboarding();
```

## Tooltip-Inhalte

### Vordefinierte Tooltips

```javascript
// Dashboard Tooltips
'dashboard-progress': {
    title: 'Ihr Fortschritt',
    content: 'Hier sehen Sie den aktuellen Stand Ihrer Gründungsreise.',
    type: 'info'
}

// Businessplan Tooltips
'businessplan-template': {
    title: 'Vorlage wählen',
    content: 'Wählen Sie eine branchenspezifische Vorlage.',
    type: 'info'
}

// Formular Tooltips
'password-requirements': {
    title: 'Passwort-Anforderungen',
    content: 'Mindestens 8 Zeichen, ein Großbuchstabe...',
    list: ['✓ Mindestens 8 Zeichen', '✓ Ein Großbuchstabe'],
    type: 'info'
}
```

## Tooltip-Typen

### Info Tooltip
```html
<div class="tooltip-content info">
    <div class="tooltip-title">Information</div>
    <div class="tooltip-description">Hilfreicher Hinweis</div>
</div>
```

### Warning Tooltip
```html
<div class="tooltip-content warning">
    <div class="tooltip-title">Warnung</div>
    <div class="tooltip-description">Wichtiger Hinweis</div>
</div>
```

### Error Tooltip
```html
<div class="tooltip-content error">
    <div class="tooltip-title">Fehler</div>
    <div class="tooltip-description">Fehlerbeschreibung</div>
</div>
```

### Success Tooltip
```html
<div class="tooltip-content success">
    <div class="tooltip-title">Erfolg</div>
    <div class="tooltip-description">Bestätigung</div>
</div>
```

## Help Panel

### Struktur
```javascript
const helpPanelContent = {
    dashboard: {
        title: 'Dashboard Hilfe',
        sections: [
            {
                title: 'Erste Schritte',
                items: [
                    { label: 'Profil vervollständigen', link: '#profile' },
                    { label: 'Businessplan starten', link: '#businessplan' }
                ]
            }
        ]
    }
}
```

### Help Panel Features
- **Suchfunktion** - Durchsuchbare Hilfeinhalte
- **Kategorisierte Hilfe** - Nach Seiten organisiert
- **Quick Links** - Schnellzugriff auf wichtige Themen
- **Support-Kontakt** - Direkter Link zum Support

## Tooltip-Verwendung

### HTML-Attribute
```html
<!-- Einfaches Tooltip -->
<div data-tooltip="dashboard-progress" data-tooltip-position="right">
    Fortschrittsanzeige
</div>

<!-- Tooltip wird automatisch hinzugefügt -->
```

### Programmatische Tooltips
```javascript
// Tooltip zu Element hinzufügen
Tooltips.addTooltip('.progress-card', 'dashboard-progress', 'bottom');

// Inline-Hilfetext
Tooltips.addHelpText('.complex-feature', 'Diese Funktion benötigt...', 'ℹ️');

// Formularfeld-Hilfe
Tooltips.addFieldHelp('#email', 'Bitte gültige E-Mail-Adresse eingeben');

// Kontextuelle Hilfe
Tooltips.addContextualHelp('.section', 'Tipp: Sie können...', 'info');
```

## Onboarding-System

### Onboarding-Schritte
```javascript
const onboardingSteps = [
    {
        element: '.welcome-title',
        title: 'Willkommen!',
        content: 'Lassen Sie uns gemeinsam starten.',
        position: 'bottom'
    },
    {
        element: '.action-grid',
        title: 'Schnellzugriff',
        content: 'Wichtige Funktionen auf einen Blick.',
        position: 'top'
    }
];
```

### Onboarding-Features
- **Schritt-für-Schritt Tour** - Geführte Einführung
- **Highlight-Elemente** - Visuelle Hervorhebung
- **Fortschrittsanzeige** - Punkte-Navigation
- **Skip-Option** - Überspringen möglich

## CSS-Klassen

### Tooltip-Klassen
```css
.tooltip { /* Container */ }
.tooltip-trigger { /* Auslöser-Element */ }
.tooltip-icon { /* Fragezeichen-Icon */ }
.tooltip-content { /* Inhalt-Container */ }
.tooltip-content.active { /* Sichtbarer Tooltip */ }
```

### Position-Klassen
```css
.tooltip-content.top { /* Oben */ }
.tooltip-content.bottom { /* Unten */ }
.tooltip-content.left { /* Links */ }
.tooltip-content.right { /* Rechts */ }
```

### Typ-Klassen
```css
.tooltip-content.info { /* Info-Stil */ }
.tooltip-content.warning { /* Warnung-Stil */ }
.tooltip-content.error { /* Fehler-Stil */ }
.tooltip-content.success { /* Erfolg-Stil */ }
```

### Help Panel Klassen
```css
.help-button { /* Hilfe-Button */ }
.help-panel { /* Panel-Container */ }
.help-panel.active { /* Sichtbares Panel */ }
.help-panel-search { /* Suchbereich */ }
.help-panel-section { /* Hilfe-Sektion */ }
```

## Implementierungs-Beispiele

### 1. Dashboard-Integration
```javascript
// Bei Seitenladen
document.addEventListener('DOMContentLoaded', function() {
    // Tooltips zu wichtigen Elementen hinzufügen
    Tooltips.addTooltip('.progress-percentage', 'dashboard-progress', 'right');
    Tooltips.addTooltip('[onclick*="openFundingModal"]', 'funding-check', 'bottom');
});
```

### 2. Formular-Validierung mit Tooltips
```javascript
// E-Mail-Felder mit Hilfe
const emailFields = document.querySelectorAll('input[type="email"]');
emailFields.forEach(field => {
    Tooltips.addFieldHelp(`#${field.id}`, 'Format: name@beispiel.de');
});

// Passwort-Anforderungen
const passwordFields = document.querySelectorAll('input[type="password"]');
passwordFields.forEach(field => {
    field.parentElement.setAttribute('data-tooltip', 'password-requirements');
});
```

### 3. Kontextuelle Hilfe
```javascript
// Hilfe für komplexe Funktionen
if (isComplexFeature) {
    Tooltips.addContextualHelp(
        '.feature-container',
        'Diese Funktion erfordert Premium-Zugang',
        'info'
    );
}
```

### 4. Dynamische Help Panel Updates
```javascript
// Help Panel für aktuelle Seite anpassen
window.addEventListener('hashchange', function() {
    const currentPage = detectCurrentPage();
    Tooltips.updateHelpPanelContent(currentPage);
});
```

## Keyboard Shortcuts

- **F1** - Help Panel öffnen/schließen
- **Escape** - Alle Tooltips/Help Panel schließen
- **Tab** - Durch Tooltip-Trigger navigieren

## Best Practices

### 1. Tooltip-Platzierung
```javascript
// Automatische Position-Anpassung
// Tooltip wird repositioniert wenn es aus dem Viewport ragt
Tooltips.addTooltip('.element', 'tooltip-id', 'top');
// Wird automatisch zu 'bottom' wenn oben kein Platz
```

### 2. Hilfreiche Inhalte
```javascript
// Schlecht
'Klicken Sie hier'

// Gut
'Klicken Sie hier, um Ihren Businessplan als PDF zu exportieren'
```

### 3. Progressive Disclosure
```javascript
// Basis-Info im Tooltip
tooltipContent['feature'] = {
    title: 'Förderungen',
    content: 'Entdecken Sie passende Förderprogramme.',
    link: { text: 'Mehr erfahren', href: '#funding-details' }
};
```

## Mobile Optimierung

### Touch-Support
- Tooltips öffnen bei Touch statt Hover
- Help Panel als Vollbild auf Mobile
- Größere Touch-Targets (48x48px minimum)

### Responsive Anpassungen
```css
@media (max-width: 768px) {
    .help-panel {
        /* Vollbild auf Mobile */
        width: 100%;
        height: 100%;
    }
    
    .tooltip-content {
        /* Kleinere max-width */
        max-width: 240px;
    }
}
```

## Accessibility

### ARIA-Labels
```html
<button class="help-button" aria-label="Hilfe öffnen">
    <span class="help-button-icon">?</span>
</button>

<div class="tooltip-trigger" 
     role="button" 
     tabindex="0"
     aria-describedby="tooltip-dashboard-progress">
</div>
```

### Keyboard Navigation
- Alle Tooltips sind per Keyboard erreichbar
- Focus Management für Help Panel
- Skip-Links für Onboarding

## Performance

### Lazy Loading
- Tooltips werden erst bei Bedarf erstellt
- Help Panel Content wird on-demand geladen
- Onboarding nur für neue Nutzer

### Event Delegation
```javascript
// Ein Event Listener für alle Tooltips
document.addEventListener('mouseenter', function(e) {
    const trigger = e.target.closest('.tooltip-trigger');
    if (trigger) showTooltip(trigger);
}, true);
```

## Implementierung Status

### ✅ Vollständig implementiert:
- ✅ **Tooltip System** - Alle Tooltip-Typen und Positionen
- ✅ **Help Button** - Globaler Hilfe-Zugang
- ✅ **Help Panel** - Durchsuchbare Hilfe-Inhalte
- ✅ **Onboarding Tour** - 4-Schritt Einführung
- ✅ **Inline Help** - Kontextuelle Hilfetexte
- ✅ **Field Help** - Formularfeld-spezifische Hilfe
- ✅ **Keyboard Support** - F1 für Hilfe, ESC zum Schließen
- ✅ **Touch Support** - Mobile-optimierte Interaktion
- ✅ **Auto-Positioning** - Intelligente Tooltip-Platzierung
- ✅ **Search Function** - Durchsuchbare Help Panel Inhalte
- ✅ **Page Detection** - Automatische Inhalts-Anpassung
- ✅ **LocalStorage** - Onboarding-Status speichern
- ✅ **Dark Mode** - Vollständige Dark Mode Unterstützung
- ✅ **Animations** - Smooth fade-in/out Effekte
- ✅ **Responsive** - Mobile-optimiertes Design

### 🎨 Design Features:
- ✅ **Glassmorphism** - Semi-transparente Tooltips
- ✅ **Smooth Animations** - Fade und Scale Effekte
- ✅ **Visual Hierarchy** - Klare Typ-Unterscheidung
- ✅ **Color Coding** - Blau (Info), Orange (Warning), Rot (Error), Grün (Success)
- ✅ **Interactive Elements** - Hover Effects, Links in Tooltips
- ✅ **Progress Indicators** - Onboarding-Fortschritt

Das Tooltips & Help Text System bietet eine vollständige, benutzerfreundliche Lösung für kontextuelle Hilfe und Benutzerführung in der KI Konzept Builder Plattform mit allen modernen Features für eine optimale User Experience.