# 🚀 Frontend starten

## Option 1: Python Server (Empfohlen)
Öffne ein Terminal und führe aus:
```bash
cd "/Users/marcelgaertner/Desktop/Arbeit/Beratung Ki Gründung"
python3 -m http.server 8000
```

Dann öffne im Browser:
- Landing Page: http://localhost:8000/landing-page.html
- Dashboard: http://localhost:8000/dashboard.html
- Onboarding: http://localhost:8000/onboarding.html

## Option 2: VS Code Live Server
1. Installiere die "Live Server" Extension in VS Code
2. Rechtsklick auf `landing-page.html`
3. Wähle "Open with Live Server"

## Option 3: Node.js Server
```bash
npx http-server -p 8000
```

## Option 4: PHP Server
```bash
php -S localhost:8000
```

## Direkte Links nach dem Start:
- **Landing Page**: http://localhost:8000/landing-page.html
- **Preise**: http://localhost:8000/pricing.html
- **Onboarding**: http://localhost:8000/onboarding.html
- **Dashboard**: http://localhost:8000/dashboard.html
- **Admin Dashboard**: http://localhost:8000/admin-dashboard.html

## Wichtig:
Das i18n-System benötigt einen Webserver! Die Dateien können nicht direkt im Browser geöffnet werden (file:///).

## Admin-Funktionen testen:
1. Öffne das Admin Dashboard
2. Gehe zu "Nutzer" 
3. Klicke auf das Schloss-Icon bei einem Nutzer
4. Schalte Beratungspakete frei
5. Die freigeschalteten Pakete sind dann im User Dashboard buchbar