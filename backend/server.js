/**
 * Simple Node.js/Express Backend for Stripe Integration
 * This is an example implementation - adapt to your needs
 */

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../'))); // Serve frontend files

// Your domain (change this to your actual domain)
const YOUR_DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

// Product configurations
const PRODUCTS = {
    // Individual consultations
    businessplan: {
        name: 'Businessplan-Beratung',
        price: 25000, // €250 in cents
        description: '90 Minuten intensive Beratung zur Businessplan-Erstellung'
    },
    gruendung: {
        name: 'Gründungsberatung',
        price: 18000, // €180 in cents
        description: '60 Minuten Beratung zu Rechtsform und Gründungsprozess'
    },
    finanzierung: {
        name: 'Finanzierungsberatung',
        price: 30000, // €300 in cents
        description: '90 Minuten Beratung zu Fördermitteln und Finanzierung'
    },
    marketing: {
        name: 'Marketing-Beratung',
        price: 15000, // €150 in cents
        description: '60 Minuten Beratung zu Marketingstrategie'
    },
    
    // Packages
    starter: {
        name: 'Starter-Paket',
        price: 49000, // €490 in cents
        description: 'Businessplan + Gründungsberatung + 3 Monate Support'
    },
    professional: {
        name: 'Professional Paket',
        price: 89000, // €890 in cents
        description: 'Starter + Finanzierung + Marketing + 6 Monate Support'
    },
    premium: {
        name: 'Premium Plus Paket',
        price: 149000, // €1490 in cents
        description: 'Alles inklusive + 1 Jahr Support + WhatsApp'
    }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Create checkout session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { productType, isPackage, customerEmail, metadata } = req.body;
        
        // Get product configuration
        const product = PRODUCTS[productType];
        if (!product) {
            return res.status(400).json({ error: 'Invalid product type' });
        }
        
        // Create line items
        const lineItems = [{
            price_data: {
                currency: 'eur',
                product_data: {
                    name: product.name,
                    description: product.description
                },
                unit_amount: product.price
            },
            quantity: 1
        }];
        
        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'sepa_debit'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/payment-success.html?session_id={CHECKOUT_SESSION_ID}&package=${productType}&amount=${product.price / 100}`,
            cancel_url: `${YOUR_DOMAIN}/pricing.html?canceled=true`,
            customer_email: customerEmail,
            metadata: {
                userId: metadata.userId,
                productType: productType,
                isPackage: isPackage.toString()
            },
            locale: 'de'
        });
        
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Checkout session error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Verify payment
app.get('/api/verify-payment/:sessionId', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(
            req.params.sessionId,
            { expand: ['line_items', 'customer'] }
        );
        
        if (session.payment_status === 'paid') {
            // In a real app, you would:
            // 1. Save transaction to database
            // 2. Unlock features for user
            // 3. Send confirmation email
            // 4. Update user status
            
            const unlockedFeatures = getUnlockedFeatures(session.metadata.productType, session.metadata.isPackage === 'true');
            
            res.json({
                success: true,
                productType: session.metadata.productType,
                isPackage: session.metadata.isPackage === 'true',
                amount: session.amount_total / 100,
                currency: session.currency,
                unlockedFeatures: unlockedFeatures,
                customer: session.customer_details
            });
        } else {
            res.json({ success: false, status: session.payment_status });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Webhook endpoint for Stripe
app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Payment successful:', session.id);
            
            // Here you would:
            // 1. Save to database
            // 2. Send confirmation email
            // 3. Unlock features
            fulfillOrder(session);
            break;
            
        case 'payment_intent.payment_failed':
            console.log('Payment failed:', event.data.object.id);
            break;
            
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.json({received: true});
});

// Helper functions

function getUnlockedFeatures(productType, isPackage) {
    if (isPackage) {
        switch (productType) {
            case 'starter':
                return ['businessplan', 'gruendung'];
            case 'professional':
                return ['businessplan', 'gruendung', 'finanzierung', 'marketing'];
            case 'premium':
                return ['businessplan', 'gruendung', 'finanzierung', 'marketing'];
            default:
                return [];
        }
    } else {
        return [productType];
    }
}

function fulfillOrder(session) {
    // In a real app, this would:
    // 1. Update user in database
    // 2. Unlock purchased features
    // 3. Send confirmation email
    // 4. Log transaction
    
    console.log('Fulfilling order for session:', session.id);
    console.log('Customer:', session.customer_details.email);
    console.log('Product:', session.metadata.productType);
    console.log('Amount:', session.amount_total / 100, session.currency);
}

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../landing-page.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend: http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;