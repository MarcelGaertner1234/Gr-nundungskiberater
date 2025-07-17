# 📊 MASTER TABLE - KI Konzept Builder

> **WICHTIG**: Diese Tabelle MUSS bei jeder Änderung aktualisiert werden!  
> Letzte Aktualisierung: 2025-01-16 (Loading States System hinzugefügt)

## 🗂️ Dateistruktur & Abhängigkeiten

### HTML Dateien
| Datei | Zweck | Abhängigkeiten | LocalStorage Keys |
|-------|--------|----------------|-------------------|
| `landing-page.html` | Hauptseite mit Hero, Features, Preise | notion-design-system.css, loading-states.css, js/loading-states.js, js/landing.js, js/i18n.js | language, theme |
| `onboarding.html` | 4-Schritt Onboarding Flow | notion-design-system.css, js/onboarding.js | onboardingData, language, theme |
| `dashboard.html` | User Dashboard mit Terminen, Progress | notion-design-system.css, dashboard-styles.css, loading-states.css, js/loading-states.js, js/dashboard.js, js/i18n-dashboard.js | onboardingData, appointments, userStatus, unlockedPackages, language, theme |
| `admin-dashboard.html` | Admin Interface für User-Verwaltung | notion-design-system.css, admin-styles.css, loading-states.css, js/loading-states.js, js/admin-dashboard.js, js/admin-cancellations.js, js/i18n-admin.js | unlockedPackages, language, theme |
| `pricing.html` | Preisübersicht mit Paketen und Einzelberatungen | notion-design-system.css, pricing-styles.css, js/pricing.js, js/i18n-pricing.js, js/stripe-integration.js | selectedPackage, language, theme |
| `payment-success.html` | Zahlungsbestätigung nach Stripe Checkout | notion-design-system.css, js/stripe-integration.js | language, theme |
| `businessplan-creator.html` | Businessplan Editor mit Vorlagen und Upload | notion-design-system.css, businessplan-styles.css, loading-states.css, js/loading-states.js, js/businessplan-templates.js, js/businessplan-creator.js, js/file-upload.js | businessPlanData, completedChapters, uploadedFiles, language, theme |
| `debug-dark-mode.html` | **🚨 DEBUG**: Dark Mode Textsichtbarkeits-Test | notion-design-system.css, text-visibility-fix.css, dark-mode-emergency-fix.css, js/dark-mode-emergency-fix.js | - |

### CSS Dateien
| Datei | Zweck | Verwendet von |
|-------|--------|---------------|
| `notion-design-system.css` | Zentrale Design-System Variablen | Alle HTML Dateien |
| `text-visibility-fix.css` | **KRITISCH**: Behebt alle Textsichtbarkeitsprobleme im Dark/Light Mode | Alle HTML Dateien |
| `dark-mode-emergency-fix.css` | **🚨 NOTFALL**: Maximale Aggression gegen Kachel-Textsichtbarkeitsprobleme | landing-page.html, dashboard.html |
| `loading-states.css` | Loading States und Spinner | dashboard.html, businessplan-creator.html, admin-dashboard.html, landing-page.html |
| `admin-styles.css` | Spezifische Admin Dashboard Styles | admin-dashboard.html |
| `pricing-styles.css` | Preisseite Styles | pricing.html |
| `businessplan-styles.css` | Businessplan Creator Styles | businessplan-creator.html |
| `cancellation-styles.css` | Stornierungssystem Styles | dashboard.html, admin-dashboard.html |

### JavaScript Dateien
| Datei | Zweck | Hauptfunktionen | LocalStorage Keys |
|-------|--------|-----------------|-------------------|
| `js/loading-states.js` | Loading States Management | LoadingStates API, AppLoading, automatische Integration | - |
| `js/landing.js` | Landing Page Interaktionen | Theme Toggle, Smooth Scroll | theme |
| `js/onboarding.js` | Onboarding Flow Logik | Step Navigation, Form Validation | onboardingData |
| `js/dashboard.js` | Dashboard Funktionalität | Appointment Booking, Progress Tracking | appointments, userStatus, unlockedPackages |
| `js/admin-dashboard.js` | Admin Dashboard Logik | User Management, Package Unlocking | unlockedPackages |
| `js/pricing.js` | Preisseite Logik | Package Selection, Modal Management | selectedPackage |
| `js/stripe-integration.js` | Stripe Payment Integration | Checkout Session Creation, Payment Verification | - |
| `js/i18n.js` | Landing Page Übersetzungen | Language Switching | language |
| `js/i18n-dashboard.js` | Dashboard Übersetzungen | Dashboard Text Management | language |
| `js/i18n-admin.js` | Admin Übersetzungen | Admin Text Management | language |
| `js/i18n-pricing.js` | Pricing Übersetzungen | Pricing Text Management | language |
| `js/businessplan-templates.js` | Businessplan Templates | Template Definitions | - |
| `js/dark-mode-emergency-fix.js` | **🚨 NOTFALL**: Dark Mode Text Visibility | Aggressive Kachel-Text-Fixes, DOM-Überwachung, Debug-Tools | - |
| `js/businessplan-creator.js` | Businessplan Creator Logik | Template Editor, Chapter Navigation | businessPlanData, completedChapters |
| `js/file-upload.js` | File Upload Funktionalität | Drag & Drop, File Validation | uploadedFiles |
| `js/cancellation.js` | Stornierungssystem | Cancellation Logic, Refund Calculation | - |
| `js/admin-cancellations.js` | Admin Stornierungen | Admin Cancellation Management | - |

### i18n Dateien
| Verzeichnis | Dateien | Verwendet von |
|-------------|---------|---------------|
| `/i18n/landing/` | de.json, en.json | landing-page.html |
| `/i18n/dashboard/` | de.json, en.json | dashboard.html |
| `/i18n/admin/` | de.json, en.json | admin-dashboard.html |
| `/i18n/pricing/` | de.json, en.json | pricing.html |

## 💾 LocalStorage Schema

| Key | Typ | Beschreibung | Verwendet von | Beispiel |
|-----|-----|--------------|---------------|----------|
| `language` | string | Aktuelle Sprache (de/en) | Alle Seiten | `"de"` |
| `theme` | string | Aktuelles Theme (light/dark) | Alle Seiten | `"dark"` |
| `onboardingData` | object | User Onboarding Daten | onboarding.html, dashboard.html | `{"profile": "vollzeit", "businessIdea": "...", "timeline": "3_monate", "consulting": "businessplan", "email": "user@example.com"}` |
| `appointments` | array | Gebuchte Termine | dashboard.html | `[{"type": "erstgespraech", "date": "2024-01-20", "time": "10:00"}]` |
| `userStatus` | string | User Status | dashboard.html | `"new"` oder `"active"` |
| `unlockedPackages` | object | Freigeschaltete Pakete pro User | admin-dashboard.html, dashboard.html | `{"user@example.com": ["businessplan", "finanzierung"]}` |
| `dashboardSteps` | object | Progress Tracking | dashboard.html | `{"step_0": true, "step_1": false}` |
| `selectedPackage` | string | Ausgewähltes Preispaket | pricing.html | `"professional"` |
| `businessPlanData` | object | Businessplan Daten | businessplan-creator.html | `{"template": "startup", "chapters": {...}, "createdAt": "..."}` |
| `completedChapters` | array | Abgeschlossene Kapitel | businessplan-creator.html | `[0, 1, 2]` |
| `uploadedFiles` | array | Hochgeladene Dateien | businessplan-creator.html | `[{"id": "...", "name": "...", "content": "..."}]` |
| `advisorSubmission` | object | An Berater gesendete Daten | businessplan-creator.html | `{"businessPlan": {...}, "message": "..."}` |

## 🔄 Datenfluss

### User Registration Flow
```
1. landing-page.html → User klickt "Onboarding"
2. onboarding.html → User füllt 4 Schritte aus
3. LocalStorage: onboardingData gespeichert
4. dashboard.html → Personalisierte Anzeige basierend auf onboardingData
```

### Admin Unlock Flow
```
1. admin-dashboard.html → Admin öffnet User-Liste
2. Admin klickt "Pakete freischalten" → Modal öffnet sich
3. Admin wählt Pakete → LocalStorage: unlockedPackages[userEmail] = [...]
4. dashboard.html → User sieht freigeschaltete Beratungen
```

### Appointment Booking Flow
```
1. dashboard.html → User klickt "Termin buchen"
2. Modal zeigt verfügbare Beratungstypen (basierend auf unlockedPackages)
3. User wählt Typ → Zeitslots werden angezeigt
4. User bestätigt → LocalStorage: appointments.push(...)
```

### Businessplan Creation Flow
```
1. dashboard.html → User klickt "Businessplan erstellen"
2. businessplan-creator.html → Mode Selection (Template/Upload)
3. Template Mode: Template auswählen → Editor mit Kapiteln
4. Upload Mode: Dateien hochladen → Drag & Drop
5. Editor: Kapitel ausfüllen → Auto-Save zu LocalStorage
6. Fertig: An Berater senden → advisorSubmission gespeichert
```

## 🗄️ Geplantes Datenbank-Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    profile ENUM('vollzeit', 'nebenbei', 'student'),
    business_idea TEXT,
    timeline ENUM('sofort', '3_monate', '6_monate', 'spaeter'),
    consulting_preference VARCHAR(50),
    status ENUM('new', 'active', 'premium') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Appointments Table
```sql
CREATE TABLE appointments (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    type VARCHAR(50),
    date DATE,
    time TIME,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Unlocked Packages Table
```sql
CREATE TABLE unlocked_packages (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    package_type VARCHAR(50),
    unlocked_by UUID REFERENCES admins(id),
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, package_type)
);
```

## 📡 Geplante API Endpoints

### User Endpoints
| Method | Endpoint | Beschreibung | Request Body | Response |
|--------|----------|--------------|--------------|----------|
| POST | `/api/users/register` | User Registrierung | `{email, name, profile, ...}` | `{userId, token}` |
| GET | `/api/users/me` | User Daten abrufen | - | `{id, email, unlockedPackages, ...}` |
| POST | `/api/appointments` | Termin buchen | `{type, date, time}` | `{appointmentId, ...}` |
| GET | `/api/appointments` | Termine abrufen | - | `[{id, type, date, ...}]` |

### Admin Endpoints
| Method | Endpoint | Beschreibung | Request Body | Response |
|--------|----------|--------------|--------------|----------|
| GET | `/api/admin/users` | Alle User abrufen | - | `[{id, email, status, ...}]` |
| POST | `/api/admin/users/:id/unlock` | Pakete freischalten | `{packages: [...]}` | `{success: true}` |
| GET | `/api/admin/appointments` | Alle Termine | - | `[{id, userId, type, ...}]` |
| GET | `/api/admin/analytics` | Analytics Daten | - | `{users: {...}, revenue: {...}}` |

## 🔐 Authentifizierung

### Geplantes Auth System
- JWT Token basiert
- Separate Tokens für User und Admin
- Token in httpOnly Cookie oder Authorization Header
- Refresh Token Mechanismus

## 📝 TODOs für Backend Integration

1. [ ] Backend Framework wählen (Node.js/Express, Supabase, Firebase)
2. [ ] Datenbank Setup (PostgreSQL empfohlen)
3. [ ] API Endpoints implementieren
4. [ ] JWT Authentication einrichten
5. [ ] LocalStorage → API Migration
6. [ ] Admin Authentication implementieren
7. [ ] Email Notifications (Terminbestätigungen)
8. [ ] Stripe Payment Integration

## 🚀 Deployment Überlegungen

- Frontend: Vercel, Netlify oder GitHub Pages
- Backend: Heroku, Railway oder AWS
- Datenbank: PostgreSQL (Supabase, Railway oder AWS RDS)
- File Storage: AWS S3 oder Cloudinary (für Dokumente)

---

⚠️ **REMINDER**: Diese Tabelle MUSS bei jeder Änderung aktualisiert werden!