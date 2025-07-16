# Projekt-Entwicklungsregeln für KI Konzept Builder

## 🚫 KEINE HARDCODED WERTE

### 1. Texte und Übersetzungen
- **NIEMALS** Texte direkt im Code hardcoden
- **IMMER** i18n-System verwenden
- Alle Texte gehören in die entsprechenden JSON-Dateien unter `/i18n/`

```javascript
// ❌ FALSCH
title: 'Kostenloses Erstgespräch'

// ✅ RICHTIG
title: i18n.t('consultation.types.erstgespraech.title')
```

### 2. Styles und Design
- **NIEMALS** Farben, Schriftgrößen oder Abstände hardcoden
- **IMMER** CSS-Variablen aus `notion-design-system.css` verwenden

```css
/* ❌ FALSCH */
font-size: 16px;
color: #0ea5e9;

/* ✅ RICHTIG */
font-size: var(--font-size-200);
color: var(--color-primary);
```

### 3. Preise und Geschäftslogik
- **NIEMALS** Preise im Code hardcoden
- Preise gehören in Konfigurationsdateien oder Datenbank
- Geschäftsregeln (wie "nur 1x Erstgespräch") sollten konfigurierbar sein

## 📁 Dateistruktur

### i18n-Dateien
```
/i18n/
  /landing/
    - de.json
    - en.json
  /dashboard/
    - de.json
    - en.json
  /onboarding/
    - de.json
    - en.json
```

## 🎯 Best Practices

1. **Konsistenz**: Alle neuen Features müssen dem bestehenden Pattern folgen
2. **Skalierbarkeit**: Code so schreiben, dass neue Sprachen einfach hinzugefügt werden können
3. **Wartbarkeit**: Zentrale Verwaltung aller Texte und Konfigurationen

## 🔧 Implementierung

Bei jedem neuen Feature:
1. Zuerst i18n-Keys definieren
2. JSON-Dateien erweitern
3. Im Code nur Keys verwenden
4. Für alle unterstützten Sprachen übersetzen

## 📝 Checkliste für neue Features

- [ ] Keine hardgecodeten Texte
- [ ] Keine hardgecodeten Styles
- [ ] Keine hardgecodeten Preise/Werte
- [ ] i18n-Keys definiert
- [ ] Übersetzungen hinzugefügt
- [ ] CSS-Variablen verwendet
- [ ] Dark Mode berücksichtigt
- [ ] Mobile Responsive getestet

---
Diese Regeln gelten ab sofort für alle Entwicklungen im Projekt!