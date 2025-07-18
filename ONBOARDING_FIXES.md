# Onboarding Fixes - 2025-07-17

## Behobene Probleme:

### 1. ✅ Onboarding startet jetzt bei Step 1 (nicht mehr Step 4)
**Problem**: Nach dem Login landeten Nutzer direkt bei Step 4
**Lösung**: 
- Default-Verhalten geändert: Ohne expliziten Step-Parameter startet Onboarding bei Step 1
- Session-Erkennung hinzugefügt: Bei neuen Sessions (< 1 Minute alt) wird bei Step 1 gestartet
- Debug-Logs hinzugefügt für bessere Nachvollziehbarkeit

### 2. ✅ Geschäftsidee wird automatisch übernommen
**Problem**: Die auf der Landing Page eingegebene Geschäftsidee wurde nicht in Step 2 angezeigt
**Lösung**:
- MutationObserver implementiert, der das Textfeld automatisch ausfüllt, sobald es verfügbar ist
- Die Geschäftsidee wird aus `existingData.businessIdea` geladen
- Character Count wird automatisch aktualisiert

### 3. ✅ Gründungsphase beeinflusst Timeline-Auswahl (Step 3)
**Problem**: Die auf der Landing Page gewählte Gründungsphase hatte keinen Einfluss auf Step 3
**Lösung**:
- Mapping erstellt zwischen Gründungsphasen und Timeline-Optionen:
  - Ideenphase → "Sofort"
  - Konzeptphase → "In 3 Monaten"
  - Gründungsphase → "Sofort"
  - Wachstumsphase → "Sofort"
- MutationObserver wählt automatisch die passende Timeline-Option vor

## Technische Details:

### Geänderte Datei: `/js/onboarding.js`

1. **Initialisierung verbessert**:
   ```javascript
   // Get existing data from localStorage
   const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
   console.log('Onboarding - Existing data:', existingData);
   ```

2. **Business Idea Auto-Fill**:
   ```javascript
   const observer = new MutationObserver(() => {
       const ideaField = document.getElementById('businessIdea');
       if (ideaField && !ideaField.value && existingData.businessIdea) {
           ideaField.value = existingData.businessIdea;
           updateCharCount();
       }
   });
   ```

3. **Timeline-Mapping basierend auf Gründungsphase**:
   ```javascript
   const phaseToTimeline = {
       'ideenphase': 'immediately',
       'konzeptphase': '3months',
       'gruendungsphase': 'immediately',
       'wachstumsphase': 'immediately'
   };
   ```

## Verbleibende Aufgaben:
- OAuth mit echten Credentials einrichten (niedrige Priorität, für später)

## Test-Anleitung:
1. Landing Page öffnen und Formular ausfüllen
2. Registrierung durchführen
3. Nach dem Login sollte Onboarding bei Step 1 starten
4. In Step 2 sollte die Geschäftsidee vorausgefüllt sein
5. In Step 3 sollte die Timeline basierend auf der Gründungsphase vorausgewählt sein