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
        
        // Stoppe Initialisierung wenn Element nicht existiert
        if (!this.tickerContent) {
            console.warn('FounderTicker: tickerContent element not found, skipping initialization');
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
        // Stoppe wenn tickerContent nicht existiert
        if (!this.tickerContent) {
            return;
        }
        
        // Add new ticker items every 8 seconds
        setInterval(() => {
            this.addNewActivity();
        }, 8000);
    }
    
    addNewActivity() {
        // Stoppe wenn tickerContent nicht existiert
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
        const remainingTime = (this.totalQuestions - this.currentQuestion) * 10;
        document.querySelector('.progress-time').textContent = `Geschätzte Zeit: noch ${remainingTime} Sekunden`;
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
        let level, title, levelClass;
        if (percentage >= 80) {
            level = 'Hohe Gründungsreife';
            title = 'Du bist bereit durchzustarten!';
            levelClass = 'level-high';
        } else if (percentage >= 60) {
            level = 'Mittlere Gründungsreife';
            title = 'Du bist auf einem guten Weg!';
            levelClass = 'level-medium';
        } else {
            level = 'Frühe Gründungsphase';
            title = 'Du hast Potenzial – lass uns daran arbeiten!';
            levelClass = 'level-low';
        }
        
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
        const analyses = {
            '1': {
                'klar': 'Dein Geschäftsmodell ist sehr gut durchdacht. Das ist eine starke Basis!',
                'grob': 'Die Grundrichtung stimmt. Jetzt gilt es, die Details auszuarbeiten.',
                'vage': 'Deine Idee braucht noch mehr Struktur. Ein Business Model Canvas könnte helfen.'
            },
            '2': {
                'validiert': 'Exzellent! Du hast bereits Marktfeedback – das reduziert dein Risiko erheblich.',
                'recherche': 'Gute Vorarbeit! Der nächste Schritt sind direkte Kundengespräche.',
                'keine': 'Marktvalidierung ist essentiell. Starte mit kleinen Tests und Umfragen.'
            },
            '3': {
                'gesichert': 'Perfekt! Mit gesicherter Finanzierung kannst du dich voll auf die Umsetzung konzentrieren.',
                'teilweise': 'Solide Basis vorhanden. Erstelle einen detaillierten Finanzplan für die Restsumme.',
                'suche': 'Du bist aktiv – das ist gut! Nutze Förderdatenbanken und Angel-Netzwerke.',
                'unklar': 'Finanzplanung ist kritisch. Starte mit einer Kostenaufstellung und Umsatzprognose.'
            },
            '4': {
                'erfahren': 'Deine Erfahrung ist Gold wert! Nutze sie, um typische Anfängerfehler zu vermeiden.',
                'fachexperte': 'Fachexpertise ist ein großer Vorteil. Ergänze sie mit unternehmerischem Know-how.',
                'lernbereit': 'Motivation ist der Schlüssel! Suche dir Mentoren und lerne von anderen Gründern.'
            },
            '5': {
                'sofort': 'Deine Entschlossenheit ist beeindruckend! Starte mit einem MVP und iteriere schnell.',
                'quartal': 'Guter Zeitplan! Nutze die Zeit für gründliche Vorbereitung.',
                'jahr': 'Langfristige Planung ist klug. Baue parallel Expertise und Netzwerk auf.',
                'offen': 'Flexibilität kann gut sein. Setze dir aber konkrete Meilensteine.'
            }
        };
        
        let analysisHTML = '';
        for (let q = 1; q <= 5; q++) {
            const answer = this.answers[q];
            if (answer && analyses[q] && analyses[q][answer]) {
                analysisHTML += `<div class="analysis-item">${analyses[q][answer]}</div>`;
            }
        }
        
        analysisGrid.innerHTML = analysisHTML;
    }
    
    generateRecommendations(percentage) {
        const recommendationList = document.getElementById('recommendationList');
        let recommendations = [];
        
        // Basis-Empfehlungen basierend auf Score
        if (percentage >= 80) {
            recommendations = [
                'Starte mit einem Minimal Viable Product (MVP) innerhalb der nächsten 4 Wochen',
                'Sichere dir eine persönliche Beratung für den Feinschliff deines Konzepts',
                'Beginne mit dem Aufbau deiner Marke und Online-Präsenz',
                'Prüfe aktuelle Förderprogramme für deinen schnellen Start'
            ];
        } else if (percentage >= 60) {
            recommendations = [
                'Verfeinere dein Geschäftsmodell mit einem Business Model Canvas',
                'Führe mindestens 10 Kundeninterviews in den nächsten 2 Wochen',
                'Erstelle einen detaillierten Finanzplan für die ersten 18 Monate',
                'Suche dir einen Mentor oder trete einem Gründer-Netzwerk bei'
            ];
        } else {
            recommendations = [
                'Beginne mit einem Gründungs-Grundlagenkurs oder Workshop',
                'Definiere deine Zielgruppe und deren Probleme genauer',
                'Erstelle einen realistischen Zeitplan mit klaren Meilensteinen',
                'Baue Grundwissen in Bereichen wie Finanzen und Marketing auf'
            ];
        }
        
        // Spezifische Empfehlungen basierend auf Antworten
        if (this.answers['2'] === 'keine') {
            recommendations.unshift('Priorität 1: Validiere deine Idee mit echten Kunden');
        }
        if (this.answers['3'] === 'unklar') {
            recommendations.push('Vereinbare eine Finanzierungsberatung für einen Überblick über deine Optionen');
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
    document.querySelector('.progress-time').textContent = 'Geschätzte Zeit: noch 40 Sekunden';
    
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
    const score = document.getElementById('testScore').textContent;
    const level = document.querySelector('.level-indicator').textContent;
    const title = document.getElementById('resultTitle').textContent;
    
    const content = `
GRÜNDER-READINESS-CHECK ERGEBNIS
================================

${title}

Gesamtpunktzahl: ${score}/100
Gründungsreife: ${level}

Deine Analyse:
${Array.from(document.querySelectorAll('.analysis-item')).map(item => '• ' + item.textContent).join('\n')}

Deine nächsten Schritte:
${Array.from(document.querySelectorAll('.recommendation-list li')).map(item => item.textContent).join('\n')}

Erstellt am: ${new Date().toLocaleDateString('de-DE')}

---
KI Konzept Builder - Dein Partner für erfolgreiche Gründung
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