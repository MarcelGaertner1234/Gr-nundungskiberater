/**
 * Killer Features System
 * Enhanced interactive features for the startup platform
 * Version: 3.0.0 with i18n support
 */

class KillerFeatures {
    constructor() {
        this.founderTicker = null;
        this.readinessTest = null;
        this.progressTimer = null;
        this.currentTestData = {};
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        this.initializeFounderTicker();
        this.initializeReadinessTest();
        
        // Initialize after i18n is loaded
        document.addEventListener('i18nReady', () => {
            this.updateLanguage();
        });
        
        this.initialized = true;
        console.log('Killer Features initialized');
    }
    
    getI18nText(key, options = {}) {
        // Get text from i18n or return fallback
        if (typeof i18nManager !== 'undefined' && i18nManager.t) {
            return i18nManager.t(key, options);
        }
        
        // Fallback texts
        const fallbacks = {
            'killer_features.founder_ticker.messages.0': '{name} aus {city} hat die GmbH gegründet',
            'killer_features.founder_ticker.messages.1': '{name} aus {city} hat {amount}€ Förderung erhalten',
            'killer_features.founder_ticker.messages.2': '{name} aus {city} feiert 1 Jahr Selbstständigkeit',
            'killer_features.founder_ticker.cities': ['Berlin', 'München', 'Hamburg', 'Frankfurt', 'Köln', 'Stuttgart', 'Dresden', 'Leipzig', 'Düsseldorf', 'Hannover', 'Bremen', 'Nürnberg'],
            'killer_features.readiness_test.estimated_time': 'Geschätzte Zeit: noch {time} Sekunden',
            'killer_features.readiness_test.levels.high': 'Hohe Gründungsreife',
            'killer_features.readiness_test.levels.medium': 'Mittlere Gründungsreife',
            'killer_features.readiness_test.levels.early': 'Frühe Gründungsphase'
        };
        
        let text = fallbacks[key] || key;
        
        // Simple placeholder replacement
        if (options) {
            Object.keys(options).forEach(placeholder => {
                text = text.replace(new RegExp(`{${placeholder}}`, 'g'), options[placeholder]);
            });
        }
        
        return text;
    }
    
    updateLanguage() {
        // Update founder ticker messages
        if (this.founderTicker) {
            this.founderTicker.updateMessages();
        }
        
        // Update readiness test text
        if (this.readinessTest) {
            this.readinessTest.updateLanguage();
        }
    }
    
    // 1. Gründer-Ticker Enhancement
    initializeFounderTicker() {
        this.founderTicker = new FounderTicker();
    }
    
    // 2. Gründer-Readiness-Test (Verfeinerter Test mit Mehrwert)
    initializeReadinessTest() {
        this.readinessTest = new ReadinessTest();
    }
    
    destroy() {
        if (this.founderTicker) {
            this.founderTicker.destroy();
        }
        
        if (this.readinessTest) {
            this.readinessTest.destroy();
        }
        
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
        }
        
        this.initialized = false;
    }
}

// Founder Ticker Class
class FounderTicker {
    constructor() {
        this.messages = [];
        this.cities = [];
        this.currentIndex = 0;
        this.interval = null;
        this.element = null;
        
        this.init();
    }
    
    init() {
        this.updateMessages();
        this.element = document.querySelector('.founder-ticker, .founder-success-ticker');
        
        if (this.element) {
            this.startTicker();
        }
    }
    
    updateMessages() {
        // Get messages from i18n
        this.messages = this.getI18nMessages();
        this.cities = this.getI18nCities();
    }
    
    getI18nMessages() {
        if (typeof i18nManager !== 'undefined' && i18nManager.t) {
            return [
                i18nManager.t('killer_features.founder_ticker.messages.0'),
                i18nManager.t('killer_features.founder_ticker.messages.1'), 
                i18nManager.t('killer_features.founder_ticker.messages.2')
            ];
        }
        
        // Fallback messages
        return [
            '{name} aus {city} hat die GmbH gegründet',
            '{name} aus {city} hat {amount}€ Förderung erhalten',
            '{name} aus {city} feiert 1 Jahr Selbstständigkeit'
        ];
    }
    
    getI18nCities() {
        if (typeof i18nManager !== 'undefined' && i18nManager.t) {
            const cities = i18nManager.t('killer_features.founder_ticker.cities');
            if (Array.isArray(cities)) {
                return cities;
            }
        }
        
        // Fallback cities
        return ['Berlin', 'München', 'Hamburg', 'Frankfurt', 'Köln', 'Stuttgart', 'Dresden', 'Leipzig', 'Düsseldorf', 'Hannover', 'Bremen', 'Nürnberg'];
    }
    
    startTicker() {
        if (!this.element) return;
        
        this.showNextMessage();
        this.interval = setInterval(() => {
            this.showNextMessage();
        }, 4000);
    }
    
    showNextMessage() {
        if (!this.element || this.messages.length === 0 || this.cities.length === 0) return;
        
        const names = ['Max', 'Anna', 'Michael', 'Lisa', 'Thomas', 'Sarah', 'David', 'Julia', 'Stefan', 'Maria'];
        const amounts = [5000, 10000, 15000, 25000, 50000, 75000];
        
        const name = names[Math.floor(Math.random() * names.length)];
        const city = this.cities[Math.floor(Math.random() * this.cities.length)];
        const amount = amounts[Math.floor(Math.random() * amounts.length)];
        
        let message = this.messages[this.currentIndex];
        message = message.replace('{name}', name);
        message = message.replace('{city}', city);
        message = message.replace('{amount}', amount.toLocaleString());
        
        this.element.style.opacity = '0';
        
        setTimeout(() => {
            this.element.textContent = message;
            this.element.style.opacity = '1';
        }, 300);
        
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
    }
    
    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Readiness Test Class
class ReadinessTest {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.totalQuestions = 8;
        this.timeRemaining = 40;
        this.timer = null;
        this.testContainer = null;
        
        this.init();
    }
    
    init() {
        this.testContainer = document.querySelector('.readiness-test-container, .startup-readiness-test');
        
        if (this.testContainer) {
            this.setupTest();
        }
    }
    
    getI18nText(key, options = {}) {
        if (typeof i18nManager !== 'undefined' && i18nManager.t) {
            return i18nManager.t(key, options);
        }
        
        // Fallback handling
        const fallbacks = {
            'killer_features.readiness_test.estimated_time': 'Geschätzte Zeit: noch {time} Sekunden',
            'killer_features.readiness_test.levels.high': 'Hohe Gründungsreife',
            'killer_features.readiness_test.levels.medium': 'Mittlere Gründungsreife',
            'killer_features.readiness_test.levels.early': 'Frühe Gründungsphase',
            'killer_features.readiness_test.feedback.clear_model': 'Dein Geschäftsmodell ist sehr gut durchdacht. Das ist eine starke Basis!',
            'killer_features.readiness_test.feedback.vage_model': 'Deine Idee braucht noch mehr Struktur. Ein Business Model Canvas könnte helfen.',
            'killer_features.readiness_test.feedback.good_research': 'Gute Vorarbeit! Der nächste Schritt sind direkte Kundengespräche.',
            'killer_features.readiness_test.feedback.partial_funding': 'Solide Basis vorhanden. Erstelle einen detaillierten Finanzplan für die Restsumme.',
            'killer_features.readiness_test.feedback.active_search': 'Du bist aktiv – das ist gut! Nutze Förderdatenbanken und Angel-Netzwerke.'
        };
        
        let text = fallbacks[key] || key;
        
        if (options) {
            Object.keys(options).forEach(placeholder => {
                text = text.replace(new RegExp(`{${placeholder}}`, 'g'), options[placeholder]);
            });
        }
        
        return text;
    }
    
    updateLanguage() {
        // Update timer text if visible
        const timeElement = document.querySelector('.progress-time');
        if (timeElement && this.timeRemaining > 0) {
            timeElement.textContent = this.getI18nText('killer_features.readiness_test.estimated_time', { time: this.timeRemaining });
        }
        
        // Update any visible test elements
        this.updateTestDisplay();
    }
    
    setupTest() {
        if (!this.testContainer) return;
        
        // Initialize progress timer
        this.timer = setInterval(() => {
            this.timeRemaining--;
            
            const timeElement = document.querySelector('.progress-time');
            if (timeElement) {
                timeElement.textContent = this.getI18nText('killer_features.readiness_test.estimated_time', { time: this.timeRemaining });
            }
            
            if (this.timeRemaining <= 0) {
                clearInterval(this.timer);
            }
        }, 1000);
        
        // Bind test events
        this.bindTestEvents();
    }
    
    bindTestEvents() {
        // Handle test completion
        document.addEventListener('click', (e) => {
            if (e.target.matches('.complete-test-btn, .finish-test-btn')) {
                this.completeTest();
            }
            
            if (e.target.matches('.test-answer-btn')) {
                this.selectAnswer(e.target);
            }
        });
    }
    
    selectAnswer(answerButton) {
        const questionId = answerButton.dataset.questionId;
        const answerId = answerButton.dataset.answerId;
        
        if (questionId && answerId) {
            this.answers[questionId] = answerId;
            
            // Update button states
            const questionContainer = answerButton.closest('.test-question');
            if (questionContainer) {
                questionContainer.querySelectorAll('.test-answer-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                answerButton.classList.add('selected');
            }
        }
    }
    
    completeTest() {
        const score = this.calculateScore();
        const level = this.getReadinessLevel(score);
        const feedback = this.generateFeedback();
        const recommendations = this.generateRecommendations();
        
        this.showResults(level, feedback, recommendations);
    }
    
    calculateScore() {
        // Simple scoring logic based on answers
        const answerValues = Object.values(this.answers);
        let score = 0;
        
        answerValues.forEach(answer => {
            switch (answer) {
                case 'klar':
                case 'recherche':
                case 'ja':
                case 'erfahren':
                case 'quartal':
                    score += 3;
                    break;
                case 'teilweise':
                case 'fachexperte':
                case 'planung':
                    score += 2;
                    break;
                default:
                    score += 1;
            }
        });
        
        return score;
    }
    
    getReadinessLevel(score) {
        if (score >= 20) {
            return this.getI18nText('killer_features.readiness_test.levels.high');
        } else if (score >= 15) {
            return this.getI18nText('killer_features.readiness_test.levels.medium');
        } else {
            return this.getI18nText('killer_features.readiness_test.levels.early');
        }
    }
    
    generateFeedback() {
        const feedbackMap = {
            'klar': this.getI18nText('killer_features.readiness_test.feedback.clear_model'),
            'vage': this.getI18nText('killer_features.readiness_test.feedback.vage_model'),
            'recherche': this.getI18nText('killer_features.readiness_test.feedback.good_research'),
            'teilweise': this.getI18nText('killer_features.readiness_test.feedback.partial_funding'),
            'suche': this.getI18nText('killer_features.readiness_test.feedback.active_search')
        };
        
        // Generate feedback based on specific answers
        const feedback = [];
        
        Object.entries(this.answers).forEach(([question, answer]) => {
            if (feedbackMap[answer]) {
                feedback.push(feedbackMap[answer]);
            }
        });
        
        return feedback.length > 0 ? feedback : [this.getI18nText('killer_features.readiness_test.feedback.general')];
    }
    
    generateRecommendations() {
        const score = this.calculateScore();
        let recommendations = [];
        
        if (score >= 20) {
            // High readiness recommendations (using i18n keys where possible)
            recommendations = [
                'Starte mit einem Minimal Viable Product (MVP) innerhalb der nächsten 4 Wochen',
                'Sichere dir eine persönliche Beratung für den Feinschliff deines Konzepts',
                'Beginne mit dem Aufbau deiner Marke und Online-Präsenz',
                'Prüfe aktuelle Förderprogramme für deinen schnellen Start'
            ];
        } else if (score >= 15) {
            // Medium readiness recommendations
            recommendations = [
                'Verfeinere dein Geschäftsmodell mit einem Business Model Canvas',
                'Führe mindestens 10 Kundeninterviews in den nächsten 2 Wochen',
                'Erstelle einen detaillierten Finanzplan für die ersten 18 Monate',
                'Suche dir einen Mentor oder trete einem Gründer-Netzwerk bei'
            ];
        } else {
            // Early stage recommendations
            recommendations = [
                'Beginne mit einem Gründungs-Grundlagenkurs oder Workshop',
                'Entwickle eine klare Geschäftsidee und validiere sie mit potenziellen Kunden',
                'Informiere dich über verschiedene Geschäftsmodelle in deiner Branche',
                'Nutze kostenlose Online-Ressourcen zum Thema Entrepreneurship'
            ];
        }
        
        // Add priority recommendation based on specific answers
        if (this.answers.validation === 'nein') {
            recommendations.unshift('Priorität 1: Validiere deine Idee mit echten Kunden');
        }
        
        if (this.answers.finanzierung === 'nein') {
            recommendations.push('Vereinbare eine Finanzierungsberatung für einen Überblick über deine Optionen');
        }
        
        return recommendations;
    }
    
    showResults(level, feedback, recommendations) {
        // Update timer display
        const timeElement = document.querySelector('.progress-time');
        if (timeElement) {
            timeElement.textContent = this.getI18nText('killer_features.readiness_test.estimated_time', { time: 40 });
        }
        
        // Generate results content
        const resultsHTML = `
            <div class="test-results">
                <div class="results-header">
                    <h2>${this.getI18nText('killer_features.readiness_test.results_title') || 'GRÜNDER-READINESS-CHECK ERGEBNIS'}</h2>
                    <div class="readiness-level">
                        <h3>${this.getI18nText('killer_features.readiness_test.level_label') || 'Gründungsreife'}: ${level}</h3>
                    </div>
                </div>
                
                <div class="feedback-section">
                    <h4>${this.getI18nText('killer_features.readiness_test.feedback_title') || 'Feedback:'}</h4>
                    <ul>
                        ${feedback.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="recommendations-section">
                    <h4>${this.getI18nText('killer_features.readiness_test.next_steps') || 'Deine nächsten Schritte'}:</h4>
                    <ol>
                        ${recommendations.map(item => `<li>${item}</li>`).join('')}
                    </ol>
                </div>
                
                <div class="cta-section">
                    <p>${this.getI18nText('killer_features.readiness_test.cta_text') || 'KI Konzept Builder - Dein Partner für erfolgreiche Gründung'}</p>
                    <button class="btn btn-primary" onclick="window.location.href='dashboard.html'">
                        ${this.getI18nText('killer_features.readiness_test.cta_button') || 'Jetzt durchstarten'}
                    </button>
                </div>
            </div>
        `;
        
        // Show results in container or modal
        if (this.testContainer) {
            this.testContainer.innerHTML = resultsHTML;
        } else {
            // Show in modal if no container
            this.showResultsModal(resultsHTML);
        }
        
        // Track completion
        this.trackTestCompletion(level, feedback.length, recommendations.length);
    }
    
    showResultsModal(content) {
        const modalHTML = `
            <div class="modal test-results-modal" id="testResultsModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${this.getI18nText('killer_features.readiness_test.results_title') || 'Test Ergebnis'}</h2>
                        <button class="modal-close" onclick="this.closeResultsModal()">×</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    closeResultsModal() {
        const modal = document.getElementById('testResultsModal');
        if (modal) {
            modal.remove();
        }
    }
    
    updateTestDisplay() {
        // Update any test-specific displays when language changes
        // This would update question text, labels, etc.
        console.log('Updating test display for language change');
    }
    
    trackTestCompletion(level, feedbackCount, recommendationCount) {
        // Track test completion for analytics
        if (window.analytics && window.analytics.track) {
            window.analytics.track('Readiness Test Completed', {
                level: level,
                feedbackCount: feedbackCount,
                recommendationCount: recommendationCount,
                timestamp: new Date().toISOString()
            });
        }
        
        console.log('Readiness test completed:', level);
    }
    
    destroy() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.closeResultsModal();
    }
}

// Enhanced Interactive Elements
class InteractiveElements {
    constructor() {
        this.initializeElements();
    }
    
    initializeElements() {
        this.setupAnimatedCounters();
        this.setupProgressBars();
        this.setupTooltips();
        this.setupScrollAnimations();
    }
    
    setupAnimatedCounters() {
        const counters = document.querySelectorAll('.animated-counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.animated-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percentage = progressBar.dataset.percentage;
                    
                    progressBar.style.width = `${percentage}%`;
                    observer.unobserve(progressBar);
                }
            });
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }
    
    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
    }
    
    hideTooltip() {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        });
        
        animatedElements.forEach(element => observer.observe(element));
    }
}

// Gamification Elements
class GamificationFeatures {
    constructor() {
        this.userProgress = this.loadUserProgress();
        this.badges = this.initializeBadges();
        this.setupAchievements();
    }
    
    loadUserProgress() {
        try {
            return JSON.parse(localStorage.getItem('userProgress')) || {
                level: 1,
                experience: 0,
                achievements: [],
                streak: 0,
                lastVisit: null
            };
        } catch (error) {
            return {
                level: 1,
                experience: 0,
                achievements: [],
                streak: 0,
                lastVisit: null
            };
        }
    }
    
    saveUserProgress() {
        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
    }
    
    initializeBadges() {
        return [
            {
                id: 'first-login',
                name: 'Willkommen',
                description: 'Erste Anmeldung geschafft',
                icon: '🎉',
                requirements: { firstLogin: true }
            },
            {
                id: 'business-plan-started',
                name: 'Planer',
                description: 'Businessplan gestartet',
                icon: '📋',
                requirements: { businessPlanStarted: true }
            },
            {
                id: 'consultation-booked',
                name: 'Berater',
                description: 'Erste Beratung gebucht',
                icon: '💬',
                requirements: { consultationBooked: true }
            },
            {
                id: 'week-streak',
                name: 'Konstant',
                description: '7 Tage in Folge aktiv',
                icon: '🔥',
                requirements: { streak: 7 }
            }
        ];
    }
    
    setupAchievements() {
        // Check for new achievements
        this.checkAchievements();
        
        // Update progress display
        this.updateProgressDisplay();
    }
    
    checkAchievements() {
        this.badges.forEach(badge => {
            if (!this.userProgress.achievements.includes(badge.id)) {
                if (this.checkBadgeRequirements(badge)) {
                    this.unlockAchievement(badge);
                }
            }
        });
    }
    
    checkBadgeRequirements(badge) {
        // Check if badge requirements are met
        return Object.entries(badge.requirements).every(([key, value]) => {
            switch (key) {
                case 'firstLogin':
                    return this.userProgress.lastVisit !== null;
                case 'streak':
                    return this.userProgress.streak >= value;
                default:
                    return this.userProgress[key] === value;
            }
        });
    }
    
    unlockAchievement(badge) {
        this.userProgress.achievements.push(badge.id);
        this.saveUserProgress();
        this.showAchievementNotification(badge);
    }
    
    showAchievementNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${badge.icon}</div>
                <div class="achievement-text">
                    <h4>Abzeichen freigeschaltet!</h4>
                    <p>${badge.name}: ${badge.description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    updateProgressDisplay() {
        const progressElement = document.querySelector('.user-progress');
        if (progressElement) {
            progressElement.innerHTML = `
                <div class="level-info">
                    <span>Level ${this.userProgress.level}</span>
                    <span>${this.userProgress.experience} XP</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(this.userProgress.experience % 100)}%"></div>
                </div>
                <div class="achievements-count">
                    ${this.userProgress.achievements.length} von ${this.badges.length} Abzeichen
                </div>
            `;
        }
    }
    
    addExperience(amount) {
        this.userProgress.experience += amount;
        
        // Check for level up
        const newLevel = Math.floor(this.userProgress.experience / 100) + 1;
        if (newLevel > this.userProgress.level) {
            this.userProgress.level = newLevel;
            this.showLevelUpNotification(newLevel);
        }
        
        this.saveUserProgress();
        this.updateProgressDisplay();
    }
    
    showLevelUpNotification(level) {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <h3>Level Up!</h3>
                <p>Du hast Level ${level} erreicht!</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize all killer features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.killerFeatures = new KillerFeatures();
    window.interactiveElements = new InteractiveElements();
    window.gamificationFeatures = new GamificationFeatures();
});

// Re-initialize when i18n is ready
document.addEventListener('i18nReady', () => {
    if (window.killerFeatures) {
        window.killerFeatures.updateLanguage();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KillerFeatures, FounderTicker, ReadinessTest, InteractiveElements, GamificationFeatures };
}