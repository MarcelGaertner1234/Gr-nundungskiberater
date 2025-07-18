/**
 * Killer Features JavaScript
 * 1. Gründer-Ticker
 * 2. 60-Sekunden-Test
 * 3. Erfolgs-Konfetti-Knopf
 */

// 1. Gründer-Ticker Enhancement
class FounderTicker {
    constructor() {
        this.tickerContent = document.getElementById('tickerContent');
        
        // Check if ticker content exists
        if (!this.tickerContent) {
            console.warn('Ticker content element not found');
            return;
        }
        
        this.activities = [
            '{name} aus {city} hat sich gerade angemeldet',
            '{name} aus {city} hat die GmbH gegründet',
            '{name} aus {city} hat {amount}€ Förderung erhalten',
            '{name} aus {city} nutzt den KI-Berater',
            '{name} aus {city} hat den Businessplan fertig',
            '{name} aus {city} startet die Beratung',
            '{name} aus {city} hat Investoren gefunden',
            '{name} aus {city} feiert 1 Jahr Selbstständigkeit',
            '{name} aus {city} hat die Marktanalyse abgeschlossen',
            '{name} aus {city} hat den ersten Kunden gewonnen'
        ];
        
        this.names = ['Max', 'Lisa', 'Tom', 'Sarah', 'Julia', 'Paul', 'Anna', 'Marco', 'Nina', 'Felix', 'Laura', 'David', 'Sophie', 'Leon'];
        this.cities = ['Berlin', 'München', 'Hamburg', 'Frankfurt', 'Köln', 'Stuttgart', 'Dresden', 'Leipzig', 'Düsseldorf', 'Hannover', 'Bremen', 'Nürnberg'];
        this.amounts = ['10.000', '25.000', '50.000', '75.000', '100.000'];
        
        this.init();
    }
    
    init() {
        // Only initialize if ticker content exists
        if (!this.tickerContent) {
            return;
        }
        
        // Add new ticker items every 8 seconds
        setInterval(() => {
            this.addNewActivity();
        }, 8000);
    }
    
    addNewActivity() {
        // Safety check
        if (!this.tickerContent) {
            return;
        }
        
        const activity = this.activities[Math.floor(Math.random() * this.activities.length)];
        const name = this.names[Math.floor(Math.random() * this.names.length)];
        const city = this.cities[Math.floor(Math.random() * this.cities.length)];
        const amount = this.amounts[Math.floor(Math.random() * this.amounts.length)];
        
        const text = activity
            .replace('{name}', name)
            .replace('{city}', city)
            .replace('{amount}', amount);
        
        // Create new ticker item
        const newItem = document.createElement('span');
        newItem.className = 'ticker-item';
        newItem.textContent = text;
        newItem.style.opacity = '0';
        
        // Add to ticker
        this.tickerContent.appendChild(newItem);
        
        // Fade in
        setTimeout(() => {
            newItem.style.transition = 'opacity 1s';
            newItem.style.opacity = '1';
        }, 100);
        
        // Remove old items if too many
        const items = this.tickerContent.querySelectorAll('.ticker-item');
        if (items.length > 20) {
            items[0].remove();
        }
    }
}

// 2. Gründer-Readiness-Test (Verfeinerter Test mit Mehrwert)
class FounderTest {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 5;
        this.answers = {};
        this.scores = {};
        this.init();
    }
    
    init() {
        // Add click handlers to all test options
        document.querySelectorAll('.test-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const button = e.currentTarget;
                const value = button.dataset.value;
                const score = parseInt(button.dataset.score || 0);
                const question = button.closest('.test-question').dataset.question;
                
                this.selectAnswer(question, value, score);
                this.animateSelection(button);
                
                setTimeout(() => {
                    this.nextQuestion();
                }, 400);
            });
        });
    }
    
    selectAnswer(question, value, score) {
        this.answers[question] = value;
        this.scores[question] = score;
    }
    
    animateSelection(button) {
        button.style.background = 'var(--color-primary)';
        button.style.color = 'white';
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions) {
            // Hide current question
            document.querySelector(`.test-question[data-question="${this.currentQuestion}"]`).classList.remove('active');
            
            // Show next question
            this.currentQuestion++;
            document.querySelector(`.test-question[data-question="${this.currentQuestion}"]`).classList.add('active');
            
            // Update progress
            this.updateProgress();
        } else {
            // Show result
            this.showResult();
        }
    }
    
    updateProgress() {
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        document.getElementById('testProgressFill').style.width = progress + '%';
        document.getElementById('currentQuestion').textContent = this.currentQuestion;
        
        // Update time estimate
        const i18n = window.i18n || window.i18nManager || { getText: (key) => key };
        const remainingTime = (this.totalQuestions - this.currentQuestion) * 10;
        const timeText = i18n.getText('readiness_check.estimated_time');
        document.querySelector('.progress-time').textContent = timeText.replace('{{seconds}}', remainingTime);
    }
    
    showResult() {
        // Calculate total score
        let totalScore = Object.values(this.scores).reduce((sum, score) => sum + score, 0);
        const maxScore = 100; // 5 questions * 20 points max
        const percentage = Math.round((totalScore / maxScore) * 100);
        
        // Hide questions
        document.querySelectorAll('.test-question').forEach(q => q.classList.remove('active'));
        document.getElementById('testProgress').style.display = 'none';
        
        // Determine result level
        let levelKey, titleKey, levelClass;
        if (percentage >= 80) {
            levelKey = 'readiness_check.results.level_high';
            titleKey = 'readiness_check.results.title_ready';
            levelClass = 'level-high';
        } else if (percentage >= 60) {
            levelKey = 'readiness_check.results.level_medium';
            titleKey = 'readiness_check.results.title_good';
            levelClass = 'level-medium';
        } else {
            levelKey = 'readiness_check.results.level_low';
            titleKey = 'readiness_check.results.title_potential';
            levelClass = 'level-low';
        }
        
        // Get translations
        const i18n = window.i18n || window.i18nManager || { getText: (key) => key };
        const level = i18n.getText(levelKey);
        const title = i18n.getText(titleKey);
        
        // Update result display
        document.getElementById('testScore').textContent = totalScore;
        document.getElementById('resultTitle').textContent = title;
        document.getElementById('resultLevel').innerHTML = `<span class="level-indicator ${levelClass}">${level}</span>`;
        
        // Generate analysis and recommendations
        this.generateAnalysis();
        this.generateRecommendations(percentage);
        
        // Show result
        document.getElementById('testResult').style.display = 'block';
        
        // Animate score
        this.animateScore(totalScore);
    }
    
    animateScore(targetScore) {
        let currentScore = 0;
        const increment = targetScore / 50;
        const scoreElement = document.getElementById('testScore');
        
        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(timer);
            }
            scoreElement.textContent = Math.round(currentScore);
        }, 20);
    }
    
    generateAnalysis() {
        const analysisGrid = document.getElementById('analysisGrid');
        const i18n = window.i18n || window.i18nManager || { getText: (key) => key };
        
        // Map answers to i18n keys
        const analysisMap = {
            '1': {
                'klar': 'readiness_check.results.analysis.business_model.strong',
                'grob': 'readiness_check.results.analysis.business_model.medium',
                'vage': 'readiness_check.results.analysis.business_model.weak'
            },
            '2': {
                'validiert': 'readiness_check.results.analysis.validation.strong',
                'recherche': 'readiness_check.results.analysis.validation.medium',
                'keine': 'readiness_check.results.analysis.validation.weak'
            },
            '3': {
                'gesichert': 'readiness_check.results.analysis.financing.strong',
                'teilweise': 'readiness_check.results.analysis.financing.partial',
                'suche': 'readiness_check.results.analysis.financing.planning',
                'unklar': 'readiness_check.results.analysis.financing.weak'
            },
            '4': {
                'erfahren': 'readiness_check.results.analysis.experience.strong',
                'fachexperte': 'readiness_check.results.analysis.experience.medium',
                'lernbereit': 'readiness_check.results.analysis.experience.weak'
            },
            '5': {
                'sofort': 'readiness_check.results.analysis.timeline.immediate',
                'quartal': 'readiness_check.results.analysis.timeline.soon',
                'jahr': 'readiness_check.results.analysis.timeline.later',
                'offen': 'readiness_check.results.analysis.timeline.later'
            }
        };
        
        let analysisHTML = '';
        for (let q = 1; q <= 5; q++) {
            const answer = this.answers[q];
            if (answer && analysisMap[q] && analysisMap[q][answer]) {
                const translationKey = analysisMap[q][answer];
                const text = i18n.getText(translationKey);
                analysisHTML += `<div class="analysis-item">${text}</div>`;
            }
        }
        
        analysisGrid.innerHTML = analysisHTML;
    }
    
    generateRecommendations(percentage) {
        const recommendationList = document.getElementById('recommendationList');
        const i18n = window.i18n || window.i18nManager || { getText: (key) => key };
        let recommendations = [];
        
        // Determine which recommendations to show based on score
        let level;
        if (percentage >= 80) {
            level = 'high';
        } else if (percentage >= 60) {
            level = 'medium';
        } else {
            level = 'low';
        }
        
        // Get the recommendations object for this level
        const recsObj = i18n.getText(`readiness_check.results.recommendations.${level}`);
        
        // Extract recommendations from the object
        if (recsObj && typeof recsObj === 'object') {
            // Look for keys like rec1, rec2, rec3, rec4
            for (let i = 1; i <= 10; i++) {
                const rec = recsObj[`rec${i}`];
                if (rec) {
                    recommendations.push(rec);
                }
            }
        }
        
        // If still no recommendations, use English defaults
        if (recommendations.length === 0) {
            if (percentage >= 80) {
                recommendations = [
                    'Start with a Minimal Viable Product (MVP) within the next 4 weeks',
                    'Secure personal consultation for fine-tuning your concept',
                    'Begin building your brand and online presence',
                    'Check current funding programs for your quick start'
                ];
            } else if (percentage >= 60) {
                recommendations = [
                    'Refine your business model with a Business Model Canvas',
                    'Conduct at least 10 customer interviews in the next 2 weeks',
                    'Create a detailed financial plan for the first 18 months',
                    'Find a mentor or join an entrepreneur network'
                ];
            } else {
                recommendations = [
                    'Start with a basic entrepreneurship course or workshop',
                    'Define your target audience and their problems more clearly',
                    'Create a realistic timeline with clear milestones',
                    'Build foundational knowledge in areas like finance and marketing'
                ];
            }
        }
        
        recommendationList.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');
    }
}

// Restart test function
function restartTest() {
    // Reset everything
    document.getElementById('testResult').style.display = 'none';
    document.getElementById('testProgress').style.display = 'block';
    document.querySelectorAll('.test-question').forEach(q => q.classList.remove('active'));
    document.querySelector('.test-question[data-question="1"]').classList.add('active');
    
    // Reset progress
    document.getElementById('testProgressFill').style.width = '20%';
    document.getElementById('currentQuestion').textContent = '1';
    
    // Update time estimate with i18n
    const i18n = window.i18n || window.i18nManager || { getText: (key) => key };
    const timeText = i18n.getText('readiness_check.estimated_time');
    const progressTime = document.querySelector('.progress-time');
    if (progressTime) {
        progressTime.textContent = timeText.replace('{{seconds}}', '40');
    }
    
    // Reset button styles
    document.querySelectorAll('.test-option').forEach(option => {
        option.style.background = '';
        option.style.color = '';
    });
    
    // Create new test instance
    window.founderTest = new FounderTest();
}

// Download test result as PDF (mock function)
function downloadTestResult() {
    // In a real implementation, this would generate a PDF
    // For now, we'll create a simple text summary
    const i18n = window.i18n || window.i18nManager || { getText: (key) => key };
    const score = document.getElementById('testScore').textContent;
    const level = document.querySelector('.level-indicator').textContent;
    const title = document.getElementById('resultTitle').textContent;
    
    const currentLang = localStorage.getItem('selectedLanguage') || 'de';
    const dateLocale = currentLang === 'en' ? 'en-US' : currentLang === 'fr' ? 'fr-FR' : currentLang === 'es' ? 'es-ES' : currentLang === 'it' ? 'it-IT' : 'de-DE';
    
    const content = `
${i18n.getText('readiness_check.download.title')}
================================

${title}

${i18n.getText('readiness_check.download.total_score')}: ${score}/100
${i18n.getText('readiness_check.download.readiness_level')}: ${level}

${i18n.getText('readiness_check.download.your_analysis')}:
${Array.from(document.querySelectorAll('.analysis-item')).map(item => '• ' + item.textContent).join('\n')}

${i18n.getText('readiness_check.download.next_steps')}:
${Array.from(document.querySelectorAll('.recommendation-list li')).map(item => item.textContent).join('\n')}

${i18n.getText('readiness_check.download.created_on')}: ${new Date().toLocaleDateString(dateLocale)}

---
${i18n.getText('readiness_check.download.footer_text')}
www.ki-konzept-builder.de
    `;
    
    // Create download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gruender-readiness-check-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// 3. Erfolgs-Konfetti-Knopf
function showConfettiButton() {
    document.getElementById('confettiButtonModal').style.display = 'block';
    
    // Enable button when email is entered
    const emailInput = document.getElementById('confettiEmail');
    const megaButton = document.getElementById('confettiMegaButton');
    
    emailInput.addEventListener('input', (e) => {
        if (e.target.value && e.target.value.includes('@')) {
            megaButton.disabled = false;
        } else {
            megaButton.disabled = true;
        }
    });
}

function closeConfettiModal() {
    document.getElementById('confettiButtonModal').style.display = 'none';
}

function triggerConfettiSurprise() {
    const button = document.getElementById('confettiMegaButton');
    const email = document.getElementById('confettiEmail').value;
    
    if (!email || !email.includes('@')) return;
    
    // Button animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1.1)';
    }, 100);
    
    // Play sound effect
    playConfettiSound();
    
    // Close modal and show win popup
    setTimeout(() => {
        closeConfettiModal();
        showWinPopup();
    }, 300);
    
    // Save email for beta system
    if (window.submitBetaSignup) {
        window.submitBetaSignup(email);
    }
}

function showWinPopup() {
    const prizes = [
        { icon: '•', text: '30 Minuten Gratis-Beratung' },
        { icon: '•', text: 'Premium Businessplan-Template' },
        { icon: '•', text: '100€ Gründer-Gutschein' },
        { icon: '•', text: '3 Monate Premium-Zugang' },
        { icon: '•', text: 'Exklusives Gründer-Handbuch' }
    ];
    
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    
    // Update prize display
    document.querySelector('.win-prize-icon').textContent = prize.icon;
    document.querySelector('.win-prize-text').textContent = prize.text;
    
    // Show popup
    document.getElementById('winPopup').style.display = 'block';
    
    // Create confetti burst
    createConfettiBurst();
}

function closeWinPopup() {
    document.getElementById('winPopup').style.display = 'none';
}

function createConfettiBurst() {
    const container = document.getElementById('winConfettiBurst');
    const colors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
    
    // Clear previous confetti
    container.innerHTML = '';
    
    // Create 30 confetti pieces
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            transform: rotate(${Math.random() * 360}deg);
            animation: burst ${Math.random() * 1 + 0.5}s ease-out forwards;
        `;
        
        // Random starting position
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        
        container.appendChild(confetti);
    }
    
    // Add burst animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes burst {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1) rotate(${Math.random() * 720}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function playConfettiSound() {
    // Create a simple sound effect
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create multiple oscillators for a celebratory sound
    const frequencies = [523.25, 659.25, 783.99]; // C, E, G chord
    
    frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        gainNode.gain.value = 0.1;
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + 0.3 + index * 0.1);
        
        // Fade out
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    });
}

function shareWin(platform) {
    const text = 'Ich habe gerade beim KI Konzept Builder gewonnen! 🎉';
    const url = window.location.href;
    
    switch(platform) {
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
            break;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Founder Ticker
    new FounderTicker();
    
    // Initialize Founder Test
    window.founderTest = new FounderTest();
    
    // Add smooth scroll to test
    const testLinks = document.querySelectorAll('a[href="#gruenderTest"]');
    testLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('gruenderTest').scrollIntoView({ behavior: 'smooth' });
        });
    });
});