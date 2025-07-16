/**
 * Beta System - Complete JavaScript Implementation
 * Handles beta counter, waitlist, referrals, and golden tickets
 */

class BetaCounter {
    constructor() {
        this.totalSlots = 50;
        this.takenSlots = parseInt(localStorage.getItem('betaTaken') || '7');
        this.counterElement = document.querySelector('.beta-counter');
        this.numberElement = document.querySelector('.beta-counter__number');
        this.textElement = document.querySelector('.beta-counter__text');
        
        this.init();
    }
    
    init() {
        this.updateCounter();
        this.startSimulation();
        
        // Update every 5 seconds
        setInterval(() => this.updateCounter(), 5000);
    }
    
    updateCounter() {
        const available = this.totalSlots - this.takenSlots;
        
        if (this.numberElement) {
            this.numberElement.textContent = available;
        }
        
        if (this.textElement) {
            this.textElement.textContent = `von ${this.totalSlots} Plätzen verfügbar`;
        }
        
        // Update color scheme based on availability
        if (this.counterElement) {
            this.counterElement.classList.remove('warning', 'critical');
            
            if (available <= 10) {
                this.counterElement.classList.add('critical');
            } else if (available <= 20) {
                this.counterElement.classList.add('warning');
            }
        }
        
        // Save to localStorage
        localStorage.setItem('betaTaken', this.takenSlots.toString());
    }
    
    startSimulation() {
        // Simulate people joining every 30-60 seconds
        setInterval(() => {
            if (Math.random() > 0.7 && this.takenSlots < this.totalSlots) {
                this.takenSlots++;
                this.updateCounter();
                this.showNotification(`Jemand hat sich gerade angemeldet! Nur noch ${this.totalSlots - this.takenSlots} Plätze verfügbar.`);
            }
        }, 45000);
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'beta-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    registerUser() {
        if (this.takenSlots < this.totalSlots) {
            this.takenSlots++;
            this.updateCounter();
            return true;
        }
        return false;
    }
}

class WaitlistManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('waitlistUsers') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        this.referralBonus = 2; // Skip 2 positions per referral
    }
    
    generateUserId() {
        return 'USER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateReferralCode(email) {
        return email.split('@')[0].toUpperCase() + Math.floor(Math.random() * 9000 + 1000);
    }
    
    addUser(email, referralCode = null) {
        const existingUser = this.users.find(u => u.email === email);
        if (existingUser) {
            return { success: false, message: 'Diese E-Mail ist bereits registriert', user: existingUser };
        }
        
        const user = {
            id: this.generateUserId(),
            email: email,
            referralCode: this.generateReferralCode(email),
            referredBy: referralCode,
            referrals: [],
            position: this.users.length + 1,
            joinedAt: new Date().toISOString(),
            isGoldenTicket: (this.users.length + 1) % 10 === 0
        };
        
        // Process referral
        if (referralCode) {
            const referrer = this.users.find(u => u.referralCode === referralCode);
            if (referrer) {
                referrer.referrals.push(user.id);
                // Update positions
                this.updatePositions();
            }
        }
        
        this.users.push(user);
        this.saveData();
        
        return { success: true, user: user };
    }
    
    updatePositions() {
        // Sort users by referrals and join date
        this.users.sort((a, b) => {
            const aBonus = a.referrals.length * this.referralBonus;
            const bBonus = b.referrals.length * this.referralBonus;
            const aEffectivePosition = a.position - aBonus;
            const bEffectivePosition = b.position - bBonus;
            
            if (aEffectivePosition !== bEffectivePosition) {
                return aEffectivePosition - bEffectivePosition;
            }
            
            return new Date(a.joinedAt) - new Date(b.joinedAt);
        });
        
        // Update positions
        this.users.forEach((user, index) => {
            user.position = index + 1;
        });
    }
    
    getUserStats(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return null;
        
        const effectivePosition = Math.max(1, user.position - (user.referrals.length * this.referralBonus));
        
        return {
            position: effectivePosition,
            totalUsers: this.users.length,
            referralCount: user.referrals.length,
            spotsEarned: user.referrals.length * this.referralBonus,
            referralCode: user.referralCode,
            isGoldenTicket: user.isGoldenTicket
        };
    }
    
    saveData() {
        localStorage.setItem('waitlistUsers', JSON.stringify(this.users));
        if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
    }
}

class GoldenTicketSystem {
    constructor() {
        this.confettiColors = ['#097fe8', '#8b5cf6', '#0fa968', '#097fe8', '#8b5cf6'];
    }
    
    showGoldenTicket() {
        const modal = document.getElementById('goldenTicketModal');
        if (modal) {
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            this.startConfetti();
            
            // Play sound effect if available
            this.playSound();
            
            // Focus management for accessibility
            const closeButton = modal.querySelector('button');
            if (closeButton) {
                closeButton.focus();
            }
            
            // Trap focus within modal
            this.trapFocus(modal);
        }
    }
    
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeGoldenTicket();
            }
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    startConfetti() {
        const container = document.getElementById('confettiContainer');
        if (!container) return;
        
        // Create 50 confetti pieces
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
                
                container.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => confetti.remove(), 5000);
            }, i * 50);
        }
    }
    
    playSound() {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

// Early Bird Countdown
class EarlyBirdCountdown {
    constructor() {
        this.endTime = new Date();
        this.endTime.setHours(this.endTime.getHours() + 48);
        this.countdownElement = document.getElementById('earlyBirdCountdown');
        this.bannerElement = document.getElementById('earlyBirdBanner');
        
        this.startCountdown();
        this.setupAutoMinimize();
    }
    
    setupAutoMinimize() {
        // Auto-minimize after 5 seconds
        setTimeout(() => {
            if (this.bannerElement && !this.bannerElement.classList.contains('minimized')) {
                this.minimizeBanner();
            }
        }, 5000);
        
        // Add click handler to minimize
        if (this.bannerElement) {
            const minimizeBtn = document.createElement('button');
            minimizeBtn.innerHTML = '×';
            minimizeBtn.style.cssText = `
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
                padding: 0 8px;
            `;
            minimizeBtn.setAttribute('aria-label', 'Banner minimieren');
            minimizeBtn.onclick = () => this.minimizeBanner();
            this.bannerElement.querySelector('.container').appendChild(minimizeBtn);
        }
    }
    
    minimizeBanner() {
        if (this.bannerElement) {
            this.bannerElement.style.maxHeight = '0';
            this.bannerElement.style.padding = '0';
            this.bannerElement.style.overflow = 'hidden';
            
            // Show a small floating indicator
            const indicator = document.createElement('div');
            indicator.className = 'early-bird-indicator';
            indicator.innerHTML = '⚡ Early Bird Angebot läuft!';
            indicator.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--color-primary);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 12px;
                cursor: pointer;
                z-index: 100;
                animation: fadeIn 0.3s ease;
            `;
            indicator.onclick = () => {
                this.bannerElement.style.maxHeight = '56px';
                this.bannerElement.style.padding = 'var(--spacing-12) 0';
                indicator.remove();
            };
            document.body.appendChild(indicator);
        }
    }
    
    startCountdown() {
        setInterval(() => {
            const now = new Date();
            const timeLeft = this.endTime - now;
            
            if (timeLeft > 0) {
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                if (this.countdownElement) {
                    this.countdownElement.textContent = 
                        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            } else {
                if (this.countdownElement) {
                    this.countdownElement.textContent = '00:00:00';
                }
            }
        }, 1000);
    }
}

// Form Handler
async function submitBetaSignup(email, referralCode = null) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const waitlistManager = new WaitlistManager();
            const result = waitlistManager.addUser(email, referralCode);
            
            if (result.success) {
                // Check if user can get a beta spot
                const betaCounter = window.betaCounter;
                if (betaCounter && betaCounter.registerUser()) {
                    result.betaAccess = true;
                } else {
                    result.betaAccess = false;
                }
                
                // Check for golden ticket
                if (result.user.isGoldenTicket) {
                    const goldenTicket = new GoldenTicketSystem();
                    goldenTicket.showGoldenTicket();
                }
                
                // Set current user
                waitlistManager.currentUser = result.user;
                waitlistManager.saveData();
            }
            
            resolve(result);
        }, 1000);
    });
}

// Dashboard Functions
function openDashboard() {
    const dashboard = document.getElementById('waitlistDashboard');
    const waitlistManager = new WaitlistManager();
    
    if (!waitlistManager.currentUser) {
        alert('Bitte melde dich zuerst für die Beta an!');
        return;
    }
    
    const stats = waitlistManager.getUserStats(waitlistManager.currentUser.id);
    
    if (stats && dashboard) {
        // Update dashboard with user stats
        document.getElementById('userPosition').textContent = `#${stats.position}`;
        document.getElementById('userReferralCode').textContent = stats.referralCode;
        document.getElementById('referralCount').textContent = stats.referralCount;
        document.getElementById('spotsEarned').textContent = stats.spotsEarned;
        
        // Update progress bar
        const progressFill = dashboard.querySelector('.progress-fill');
        if (progressFill) {
            const progress = ((stats.totalUsers - stats.position) / stats.totalUsers) * 100;
            progressFill.style.width = progress + '%';
        }
        
        dashboard.style.display = 'block';
    }
}

function closeDashboard() {
    const dashboard = document.getElementById('waitlistDashboard');
    if (dashboard) {
        dashboard.style.display = 'none';
    }
}

function closeGoldenTicket() {
    const modal = document.getElementById('goldenTicketModal');
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        
        // Return focus to the triggering element
        const lastFocusedElement = document.querySelector('.button[data-i18n*="beta"]');
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }
}

// Share Functions
function shareOnTwitter() {
    const waitlistManager = new WaitlistManager();
    if (!waitlistManager.currentUser) return;
    
    const text = `Ich bin auf der Warteliste für den KI Konzept Builder! Nutze meinen Code ${waitlistManager.currentUser.referralCode} und überspringe Plätze auf der Warteliste!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
}

function shareOnLinkedIn() {
    const waitlistManager = new WaitlistManager();
    if (!waitlistManager.currentUser) return;
    
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
}

function shareViaEmail() {
    const waitlistManager = new WaitlistManager();
    if (!waitlistManager.currentUser) return;
    
    const subject = 'KI Konzept Builder - Beta Zugang';
    const body = `Hallo,\n\nich bin auf der Warteliste für den KI Konzept Builder und möchte dir meinen Referral-Code teilen!\n\nNutze den Code ${waitlistManager.currentUser.referralCode} bei deiner Anmeldung und überspringe Plätze auf der Warteliste.\n\nMelde dich hier an: ${window.location.href}\n\nViele Grüße`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function copyReferralLink() {
    const waitlistManager = new WaitlistManager();
    if (!waitlistManager.currentUser) return;
    
    const link = `${window.location.href}?ref=${waitlistManager.currentUser.referralCode}`;
    
    navigator.clipboard.writeText(link).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Kopiert! ✓';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Beta Counter
    window.betaCounter = new BetaCounter();
    
    // Initialize Early Bird Countdown
    new EarlyBirdCountdown();
    
    // Check URL for referral code
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');
    if (referralCode) {
        localStorage.setItem('referralCode', referralCode);
    }
    
    // Add event listeners for beta signup forms
    const betaForms = document.querySelectorAll('input[type="email"]');
    betaForms.forEach(input => {
        const form = input.closest('div');
        const button = form?.querySelector('button');
        
        if (button && button.textContent.includes('Beta')) {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const email = input.value;
                if (!email || !email.includes('@')) {
                    alert('Bitte gib eine gültige E-Mail-Adresse ein!');
                    return;
                }
                
                button.disabled = true;
                button.textContent = 'Wird verarbeitet...';
                
                const savedReferralCode = localStorage.getItem('referralCode');
                const result = await submitBetaSignup(email, savedReferralCode);
                
                if (result.success) {
                    if (result.betaAccess) {
                        button.textContent = 'Beta-Zugang erhalten! 🎉';
                        setTimeout(() => openDashboard(), 2000);
                    } else {
                        button.textContent = 'Auf Warteliste! 📋';
                        setTimeout(() => openDashboard(), 2000);
                    }
                } else {
                    button.textContent = result.message;
                    button.disabled = false;
                }
            });
        }
    });
    
    // Add click listener for early bird CTA
    const earlyBirdCta = document.querySelector('.early-bird-cta');
    if (earlyBirdCta) {
        earlyBirdCta.addEventListener('click', () => {
            document.querySelector('#beta').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Add CSS for animations if not already present
    if (!document.querySelector('#beta-animations')) {
        const style = document.createElement('style');
        style.id = 'beta-animations';
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
});