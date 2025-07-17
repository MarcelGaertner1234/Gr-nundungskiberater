# KI Konzept Builder Backend

Node.js/Express Backend mit Stripe Payment Integration

## 🚀 Setup

### 1. Dependencies installieren
```bash
cd backend
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env
```

Fülle die `.env` Datei mit deinen Stripe Keys aus:
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Server starten
```bash
npm run dev    # Development mit nodemon
npm start      # Production
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Create Checkout Session
```
POST /api/create-checkout-session
Content-Type: application/json

{
  "productType": "professional",
  "isPackage": true,
  "customerEmail": "user@example.com",
  "metadata": {
    "userId": "user-123"
  }
}
```

### Verify Payment
```
GET /api/verify-payment/:sessionId
```

### Stripe Webhook
```
POST /api/stripe-webhook
Content-Type: application/json
Stripe-Signature: ...
```

## 🔧 Frontend Integration

Update `js/stripe-integration.js`:
```javascript
const STRIPE_CONFIG = {
    publishableKey: 'pk_test_your_key_here',
    apiUrl: 'http://localhost:3000/api', // Backend URL
    successUrl: 'http://localhost:3000/payment-success.html',
    cancelUrl: 'http://localhost:3000/pricing.html'
};
```

## 🗄️ Database Integration

Für Production empfehlen wir PostgreSQL:

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    stripe_session_id VARCHAR(255) UNIQUE,
    product_type VARCHAR(50),
    amount INTEGER,
    currency VARCHAR(3),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Security Checklist

- [ ] Stripe Webhook Secret konfiguriert
- [ ] CORS richtig konfiguriert
- [ ] Rate Limiting implementiert
- [ ] Input Validation
- [ ] Error Logging
- [ ] HTTPS in Production

## 📧 Email Notifications

Für Zahlungsbestätigungen:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function sendPaymentConfirmation(customerEmail, orderDetails) {
    // Email template
}
```

## 🧪 Testing

```bash
# Test Stripe Webhook lokal
stripe listen --forward-to localhost:3000/api/stripe-webhook

# Test API Endpoints
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"productType": "professional", "isPackage": true}'
```

## 🚀 Deployment

### Heroku
```bash
git add .
git commit -m "Deploy to Heroku"
heroku create ki-konzept-builder-api
heroku config:set STRIPE_SECRET_KEY=sk_live_...
git push heroku main
```

### Railway
```bash
railway login
railway init
railway add
railway deploy
```

## 📈 Monitoring

- Stripe Dashboard für Payments
- Server Logs für Errors
- Uptime Monitoring
- Performance Metrics