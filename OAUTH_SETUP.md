# OAuth Setup Guide

## ⚠️ WICHTIGE HINWEISE:

1. **Test-Modus**: Deine App startet im Test-Modus. Das bedeutet:
   - Nur 100 Nutzer können sich anmelden
   - Du musst Testnutzer manuell hinzufügen ODER
   - Die App zur Überprüfung bei Google einreichen

2. **Produktiv-Schaltung**: 
   - Gehe zu "OAuth-Zustimmungsbildschirm"
   - Klicke auf "App veröffentlichen"
   - Google prüft deine App (kann 1-5 Tage dauern)

3. **Domain-Verifizierung**:
   - Du musst deine Domain bei Google verifizieren
   - Google Search Console verwenden
   - HTML-Tag oder DNS-Eintrag hinzufügen

## Google OAuth Setup

1. **Google Cloud Console**
   - Gehe zu: https://console.cloud.google.com/
   - Erstelle ein neues Projekt oder wähle ein bestehendes
   - Aktiviere die Google+ API

2. **OAuth 2.0 Credentials erstellen**
   - Navigiere zu "APIs & Services" > "Credentials"
   - Klicke auf "Create Credentials" > "OAuth client ID"
   - Wähle "Web application"
   - Füge folgende URIs hinzu:
     - Authorized JavaScript origins: 
       - `http://localhost:3000` (für Entwicklung)
       - `https://deine-domain.de` (für Produktion)
     - Authorized redirect URIs:
       - `http://localhost:3000/auth/google/callback`
       - `https://deine-domain.de/auth/google/callback`

3. **Client ID kopieren**
   - Kopiere die Client ID
   - Ersetze `YOUR_GOOGLE_CLIENT_ID` in `js/oauth-config.js`

## Microsoft OAuth Setup

1. **Azure Portal**
   - Gehe zu: https://portal.azure.com/
   - Navigiere zu "Azure Active Directory" > "App registrations"
   - Klicke auf "New registration"

2. **App Registration**
   - Name: "KI Konzept Builder"
   - Supported account types: "Accounts in any organizational directory and personal Microsoft accounts"
   - Redirect URI: 
     - Platform: "Single-page application (SPA)"
     - URI: `http://localhost:3000/auth/microsoft/callback` (für Entwicklung)
     - Füge später hinzu: `https://deine-domain.de/auth/microsoft/callback`

3. **Client ID kopieren**
   - Kopiere die Application (client) ID
   - Ersetze `YOUR_MICROSOFT_CLIENT_ID` in `js/oauth-config.js`

## Entwicklungsumgebung

Für die lokale Entwicklung mit OAuth:

```bash
# Installiere einen lokalen Server (z.B. mit Node.js)
npm install -g http-server

# Starte den Server
http-server -p 3000

# Öffne http://localhost:3000
```

## Wichtige Hinweise

1. **HTTPS erforderlich**: OAuth funktioniert in Produktion nur über HTTPS
2. **Domain Verification**: Google und Microsoft können eine Domain-Verifizierung verlangen
3. **Datenschutz**: Stelle sicher, dass deine Datenschutzerklärung OAuth-Logins abdeckt
4. **Rate Limits**: Beachte die Rate Limits der Provider

## Test-Accounts

Für Tests ohne echte OAuth-Integration:

- Google Test: `test.google@ki-konzept-builder.de`
- Microsoft Test: `test.microsoft@ki-konzept-builder.de`
- Passwort: `TestOAuth123!`

## Troubleshooting

### "Popup blocked" Fehler
- Stelle sicher, dass Popups für deine Domain erlaubt sind
- Alternative: Verwende Redirect-Flow statt Popup

### "Invalid client" Fehler
- Überprüfe die Client ID
- Stelle sicher, dass die Domain in den OAuth-Einstellungen registriert ist

### "Redirect URI mismatch"
- Die Redirect URI muss exakt mit der konfigurierten URI übereinstimmen
- Achte auf http vs https und trailing slashes