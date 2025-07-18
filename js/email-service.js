// Email Service - Demo Implementation
// In production, this would connect to a real email service like SendGrid, AWS SES, etc.

class EmailService {
    constructor() {
        this.isDemo = true;
        this.emailQueue = [];
        console.log('Email Service initialized (Demo Mode)');
    }

    // Send password reset email
    async sendPasswordResetEmail(email, code) {
        const emailData = {
            to: email,
            subject: 'Passwort zurücksetzen - KI Konzept Builder',
            template: 'password-reset',
            data: {
                code: code,
                timestamp: new Date().toISOString()
            }
        };

        // In demo mode, just log and store
        if (this.isDemo) {
            // Email logging removed for production
            this.storeEmail(emailData);
            this.showDemoNotification(email, code);
            return { success: true, messageId: 'demo-' + Date.now() };
        }

        // In production, this would call your backend API
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            return await response.json();
        } catch (error) {
            console.error('Email send error:', error);
            return { success: false, error: error.message };
        }
    }

    // Send registration confirmation email
    async sendWelcomeEmail(email, name) {
        const emailData = {
            to: email,
            subject: 'Willkommen beim KI Konzept Builder!',
            template: 'welcome',
            data: {
                name: name || 'Gründer',
                timestamp: new Date().toISOString()
            }
        };

        if (this.isDemo) {
            // Email logging removed for production
            this.storeEmail(emailData);
            return { success: true, messageId: 'demo-' + Date.now() };
        }

        // Production implementation would go here
    }

    // Send appointment confirmation
    async sendAppointmentConfirmation(email, appointmentData) {
        const emailData = {
            to: email,
            subject: 'Terminbestätigung - KI Konzept Builder',
            template: 'appointment-confirmation',
            data: appointmentData
        };

        if (this.isDemo) {
            // Email logging removed for production
            this.storeEmail(emailData);
            return { success: true, messageId: 'demo-' + Date.now() };
        }

        // Production implementation would go here
    }

    // Store email in local storage for demo
    storeEmail(emailData) {
        const emails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
        emails.push({
            ...emailData,
            sentAt: new Date().toISOString(),
            status: 'sent'
        });
        
        // Keep only last 50 emails
        if (emails.length > 50) {
            emails.splice(0, emails.length - 50);
        }
        
        localStorage.setItem('sentEmails', JSON.stringify(emails));
    }

    // Show demo notification
    showDemoNotification(email, code) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #097fe8;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 8px;">📧 E-Mail gesendet (Demo)</div>
            <div style="font-size: 14px;">
                An: ${email}<br>
                Code: <strong>${code}</strong><br>
                <small style="opacity: 0.8;">In Produktion würde eine echte E-Mail versendet.</small>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 10 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 10000);
        
        // Add animation styles if not present
        if (!document.getElementById('emailServiceStyles')) {
            const style = document.createElement('style');
            style.id = 'emailServiceStyles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Get email templates (for admin preview)
    getEmailTemplate(templateName, data) {
        const templates = {
            'password-reset': {
                subject: 'Passwort zurücksetzen - KI Konzept Builder',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: #097fe8; color: white; padding: 32px; text-align: center;">
                            <h1 style="margin: 0;">KI Konzept Builder</h1>
                        </div>
                        <div style="padding: 32px;">
                            <h2>Passwort zurücksetzen</h2>
                            <p>Du hast angefordert, dein Passwort zurückzusetzen. Verwende den folgenden Code:</p>
                            <div style="background: #f3f4f6; padding: 24px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0;">
                                ${data.code}
                            </div>
                            <p>Dieser Code ist 30 Minuten gültig.</p>
                            <p>Falls du diese Anfrage nicht gestellt hast, kannst du diese E-Mail ignorieren.</p>
                        </div>
                        <div style="background: #f3f4f6; padding: 16px; text-align: center; color: #6b7280; font-size: 14px;">
                            © 2024 KI Konzept Builder. Alle Rechte vorbehalten.
                        </div>
                    </div>
                `
            },
            'welcome': {
                subject: 'Willkommen beim KI Konzept Builder!',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: #097fe8; color: white; padding: 32px; text-align: center;">
                            <h1 style="margin: 0;">Willkommen beim KI Konzept Builder!</h1>
                        </div>
                        <div style="padding: 32px;">
                            <h2>Hallo ${data.name}!</h2>
                            <p>Vielen Dank für deine Registrierung beim KI Konzept Builder.</p>
                            <p>Du kannst jetzt loslegen und deine Gründungsidee verwirklichen:</p>
                            <ul>
                                <li>Erstelle deinen Businessplan</li>
                                <li>Nutze unsere KI-gestützte Beratung</li>
                                <li>Finde die passende Finanzierung</li>
                                <li>Erhalte professionelle Unterstützung</li>
                            </ul>
                            <div style="text-align: center; margin: 32px 0;">
                                <a href="https://ki-konzept-builder.de/dashboard" style="background: #097fe8; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                    Zum Dashboard
                                </a>
                            </div>
                        </div>
                        <div style="background: #f3f4f6; padding: 16px; text-align: center; color: #6b7280; font-size: 14px;">
                            © 2024 KI Konzept Builder. Alle Rechte vorbehalten.
                        </div>
                    </div>
                `
            }
        };

        return templates[templateName] || null;
    }

    // Get sent emails (for admin dashboard)
    getSentEmails() {
        return JSON.parse(localStorage.getItem('sentEmails') || '[]');
    }

    // Clear email history
    clearEmailHistory() {
        localStorage.removeItem('sentEmails');
    }
}

// Initialize global email service
window.emailService = new EmailService();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
}