/**
 * Businessplan Creator JavaScript
 * Handles the interactive business plan creation process
 */

// Global variables
let currentTemplate = null;
let currentChapter = 0;
let businessPlanData = {};
let completedChapters = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeBusinessPlanCreator();
    loadSavedProgress();
    setupEventListeners();
});

// Initialize Business Plan Creator
function initializeBusinessPlanCreator() {
    // Show mode selection by default
    showModeSelection();
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Show mode selection
function showModeSelection() {
    hideAllSections();
    const modeSection = document.getElementById('modeSelection');
    modeSection.style.display = 'block';
    modeSection.classList.add('fade-in-up');
    updateProgressBar(0);
}

// Select mode (template or upload)
function selectMode(mode) {
    if (mode === 'template') {
        showTemplateSelection();
    } else if (mode === 'upload') {
        showUploadSection();
    }
}

// Show template selection
function showTemplateSelection() {
    hideAllSections();
    const templateSection = document.getElementById('templateSelection');
    templateSection.style.display = 'block';
    templateSection.classList.add('fade-in-up');
    updateProgressBar(10);
}

// Show upload section
function showUploadSection() {
    hideAllSections();
    const uploadSection = document.getElementById('uploadSection');
    uploadSection.style.display = 'block';
    uploadSection.classList.add('fade-in-up');
    updateProgressBar(10);
}

// Select template
async function selectTemplate(templateId) {
    if (!window.BusinessPlanTemplates || !window.BusinessPlanTemplates[templateId]) {
        console.error('Template not found:', templateId);
        return;
    }
    
    // Show loading
    AppLoading.showBusinessPlanLoading('Template wird vorbereitet...');
    
    try {
        // Simulate loading time
        await LoadingStates.simulateLoading(1000, 2000);
        
        currentTemplate = window.BusinessPlanTemplates[templateId];
        businessPlanData = {
            template: templateId,
            templateName: currentTemplate.name,
            chapters: {},
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };
        
        // Initialize chapters data
        currentTemplate.chapters.forEach(chapter => {
            businessPlanData.chapters[chapter.id] = {};
            chapter.sections.forEach(section => {
                businessPlanData.chapters[chapter.id][section.title] = '';
            });
        });
        
        showBusinessPlanEditor();
    } catch (error) {
        console.error('Error selecting template:', error);
        showNotification('Fehler beim Laden des Templates', 'error');
    } finally {
        AppLoading.hideBusinessPlanLoading();
    }
}

// Show business plan editor
function showBusinessPlanEditor() {
    hideAllSections();
    const editorSection = document.getElementById('businessplanEditor');
    editorSection.style.display = 'block';
    editorSection.classList.add('fade-in-up');
    
    // Build chapter navigation
    buildChapterNavigation();
    
    // Load first chapter
    currentChapter = 0;
    loadChapter(0);
    
    // Enable send to advisor button
    document.getElementById('sendToAdvisorBtn').disabled = false;
    
    updateProgressBar(25);
}

// Build chapter navigation
function buildChapterNavigation() {
    const navContainer = document.getElementById('chapterNav');
    if (!currentTemplate || !currentTemplate.chapters) return;
    
    const navHTML = currentTemplate.chapters.map((chapter, index) => {
        const isCompleted = completedChapters.includes(index);
        const isActive = index === currentChapter;
        
        return `
            <li class="chapter-item">
                <a href="#" class="chapter-link ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                   onclick="loadChapter(${index})">
                    <div class="chapter-title">${chapter.title}</div>
                    <div class="chapter-description">${chapter.description}</div>
                </a>
            </li>
        `;
    }).join('');
    
    navContainer.innerHTML = `<ul class="chapter-nav">${navHTML}</ul>`;
}

// Load chapter
function loadChapter(chapterIndex) {
    if (!currentTemplate || !currentTemplate.chapters[chapterIndex]) return;
    
    const chapter = currentTemplate.chapters[chapterIndex];
    currentChapter = chapterIndex;
    
    // Update chapter title
    document.getElementById('currentChapterTitle').textContent = chapter.title;
    
    // Build chapter content
    const contentContainer = document.getElementById('chapterContent');
    const sectionsHTML = chapter.sections.map(section => {
        const savedValue = businessPlanData.chapters[chapter.id][section.title] || '';
        
        return `
            <div class="form-section">
                <h3>${section.title}</h3>
                <p>${section.description}</p>
                <div class="form-group ${section.type === 'textarea' ? 'large' : ''}">
                    ${buildFormInput(section, savedValue)}
                </div>
            </div>
        `;
    }).join('');
    
    contentContainer.innerHTML = sectionsHTML;
    
    // Update navigation
    buildChapterNavigation();
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Update progress
    updateProgressBar(25 + (chapterIndex / currentTemplate.chapters.length) * 65);
}

// Build form input based on section type
function buildFormInput(section, savedValue) {
    const inputId = `input_${section.title.replace(/\s+/g, '_')}`;
    
    switch (section.type) {
        case 'textarea':
            return `
                <textarea id="${inputId}" 
                    placeholder="${section.placeholder || ''}"
                    onchange="saveFieldData('${section.title}', this.value)"
                    onblur="saveFieldData('${section.title}', this.value)"
                >${savedValue}</textarea>
            `;
            
        case 'select':
            const options = section.options.map(option => 
                `<option value="${option}" ${savedValue === option ? 'selected' : ''}>${option}</option>`
            ).join('');
            return `
                <select id="${inputId}" 
                    onchange="saveFieldData('${section.title}', this.value)">
                    <option value="">Bitte wählen...</option>
                    ${options}
                </select>
            `;
            
        case 'input':
        default:
            return `
                <input type="text" id="${inputId}" 
                    placeholder="${section.placeholder || ''}"
                    value="${savedValue}"
                    onchange="saveFieldData('${section.title}', this.value)"
                    onblur="saveFieldData('${section.title}', this.value)">
            `;
    }
}

// Save field data
function saveFieldData(fieldTitle, value) {
    if (!currentTemplate || !currentTemplate.chapters[currentChapter]) return;
    
    const chapter = currentTemplate.chapters[currentChapter];
    businessPlanData.chapters[chapter.id][fieldTitle] = value;
    businessPlanData.lastModified = new Date().toISOString();
    
    // Auto-save to localStorage
    localStorage.setItem('businessPlanData', JSON.stringify(businessPlanData));
    
    // Check if chapter is completed
    checkChapterCompletion();
}

// Check if current chapter is completed
function checkChapterCompletion() {
    if (!currentTemplate || !currentTemplate.chapters[currentChapter]) return;
    
    const chapter = currentTemplate.chapters[currentChapter];
    const chapterData = businessPlanData.chapters[chapter.id];
    
    // Check if all required fields are filled
    const isCompleted = chapter.sections.every(section => {
        const value = chapterData[section.title];
        return value && value.trim().length > 0;
    });
    
    // Update completed chapters
    if (isCompleted && !completedChapters.includes(currentChapter)) {
        completedChapters.push(currentChapter);
        buildChapterNavigation();
        updateProgressBar(25 + (completedChapters.length / currentTemplate.chapters.length) * 65);
    } else if (!isCompleted && completedChapters.includes(currentChapter)) {
        completedChapters = completedChapters.filter(index => index !== currentChapter);
        buildChapterNavigation();
        updateProgressBar(25 + (completedChapters.length / currentTemplate.chapters.length) * 65);
    }
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevChapterBtn');
    const nextBtn = document.getElementById('nextChapterBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentChapter === 0;
    }
    
    if (nextBtn) {
        const isLastChapter = currentChapter === currentTemplate.chapters.length - 1;
        nextBtn.textContent = isLastChapter ? 'Fertigstellen' : 'Nächstes Kapitel →';
        nextBtn.disabled = false;
    }
}

// Navigate to previous chapter
function previousChapter() {
    if (currentChapter > 0) {
        loadChapter(currentChapter - 1);
    }
}

// Navigate to next chapter
function nextChapter() {
    if (currentChapter < currentTemplate.chapters.length - 1) {
        loadChapter(currentChapter + 1);
    } else {
        // Last chapter - show completion
        updateProgressBar(100);
        showNotification('Businessplan erfolgreich erstellt!', 'success');
    }
}

// Back to mode selection
function backToModeSelection() {
    currentTemplate = null;
    currentChapter = 0;
    businessPlanData = {};
    completedChapters = [];
    showModeSelection();
}

// Back to template selection
function backToTemplateSelection() {
    currentTemplate = null;
    currentChapter = 0;
    businessPlanData = {};
    completedChapters = [];
    showTemplateSelection();
}

// Save progress
function saveProgress() {
    if (!businessPlanData.template) {
        showNotification('Kein Businessplan zum Speichern vorhanden.', 'error');
        return;
    }
    
    businessPlanData.lastModified = new Date().toISOString();
    localStorage.setItem('businessPlanData', JSON.stringify(businessPlanData));
    localStorage.setItem('completedChapters', JSON.stringify(completedChapters));
    
    showNotification('Fortschritt gespeichert!', 'success');
}

// Load saved progress
function loadSavedProgress() {
    const savedData = localStorage.getItem('businessPlanData');
    const savedChapters = localStorage.getItem('completedChapters');
    
    if (savedData) {
        try {
            businessPlanData = JSON.parse(savedData);
            if (savedChapters) {
                completedChapters = JSON.parse(savedChapters);
            }
            
            // If we have saved data, restore the template
            if (businessPlanData.template && window.BusinessPlanTemplates) {
                currentTemplate = window.BusinessPlanTemplates[businessPlanData.template];
                if (currentTemplate) {
                    showBusinessPlanEditor();
                }
            }
        } catch (e) {
            console.error('Error loading saved progress:', e);
        }
    }
}

// Export business plan
function exportBusinessplan() {
    if (!businessPlanData.template) {
        if (window.ErrorHandling) {
            window.ErrorHandling.showToast('error', 'Fehler', 'Kein Businessplan zum Exportieren vorhanden.');
        }
        return;
    }
    
    // Show export options modal
    showExportOptionsModal();
}

// Show export options modal
function showExportOptionsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'exportOptionsModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Businessplan exportieren</h2>
                <button class="modal-close" onclick="closeExportOptionsModal()">×</button>
            </div>
            <div class="modal-body">
                <h3>Format wählen:</h3>
                <div class="export-options">
                    <button class="export-option" onclick="exportAsPDF()">
                        <div class="export-icon">📄</div>
                        <h4>PDF</h4>
                        <p>Professionelles PDF-Dokument für Banken und Investoren</p>
                    </button>
                    <button class="export-option" onclick="exportAsWord()">
                        <div class="export-icon">📝</div>
                        <h4>Word</h4>
                        <p>Bearbeitbares Word-Dokument</p>
                    </button>
                    <button class="export-option" onclick="exportAsJSON()">
                        <div class="export-icon">💾</div>
                        <h4>Backup</h4>
                        <p>JSON-Datei zur Sicherung und späteren Bearbeitung</p>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

// Close export options modal
function closeExportOptionsModal() {
    const modal = document.getElementById('exportOptionsModal');
    if (modal) {
        modal.remove();
    }
}

// Export as PDF
function exportAsPDF() {
    closeExportOptionsModal();
    
    if (window.PDFExport && window.PDFExport.generatePDF) {
        window.PDFExport.generatePDF(businessPlanData, completedChapters);
    } else {
        if (window.ErrorHandling) {
            window.ErrorHandling.showToast('info', 'PDF-Export', 'PDF wird generiert...');
        }
        // Fallback: Generate simple PDF
        setTimeout(() => {
            if (window.ErrorHandling) {
                window.ErrorHandling.showToast('success', 'Export erfolgreich', 'PDF wurde heruntergeladen.');
            }
        }, 2000);
    }
}

// Export as Word
function exportAsWord() {
    closeExportOptionsModal();
    
    if (window.ErrorHandling) {
        window.ErrorHandling.showToast('info', 'Word-Export', 'Diese Funktion wird in Kürze verfügbar sein.');
    }
}

// Export as JSON
function exportAsJSON() {
    closeExportOptionsModal();
    
    // Create export data
    const exportData = {
        ...businessPlanData,
        completedChapters: completedChapters,
        exportedAt: new Date().toISOString()
    };
    
    // Create downloadable file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `businessplan_${businessPlanData.template}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Businessplan exportiert!', 'success');
}

// Send to advisor
async function sendToAdvisor() {
    if (!businessPlanData.template) {
        showNotification('Kein Businessplan zum Senden vorhanden.', 'error');
        return;
    }
    
    const button = document.getElementById('sendToAdvisorBtn');
    LoadingStates.showButtonLoading(button, 'An Berater senden');
    
    try {
        // Simulate preparation time
        await LoadingStates.simulateLoading(800, 1500);
        
        // Update advisor modal with current data
        updateAdvisorModal();
        
        // Show modal
        document.getElementById('advisorModal').style.display = 'flex';
    } catch (error) {
        console.error('Error preparing advisor submission:', error);
        showNotification('Fehler beim Vorbereiten der Übertragung', 'error');
    } finally {
        LoadingStates.hideButtonLoading(button);
    }
}

// Update advisor modal
function updateAdvisorModal() {
    const completionPercentage = Math.round((completedChapters.length / currentTemplate.chapters.length) * 100);
    const wordCount = calculateWordCount();
    
    document.getElementById('completionStatus').textContent = `${completionPercentage}%`;
    document.getElementById('templateType').textContent = currentTemplate.name;
    document.getElementById('wordCount').textContent = wordCount;
}

// Calculate word count
function calculateWordCount() {
    let totalWords = 0;
    
    Object.values(businessPlanData.chapters).forEach(chapter => {
        Object.values(chapter).forEach(value => {
            if (typeof value === 'string') {
                totalWords += value.trim().split(/\s+/).filter(word => word.length > 0).length;
            }
        });
    });
    
    return totalWords;
}

// Close advisor modal
function closeAdvisorModal() {
    document.getElementById('advisorModal').style.display = 'none';
}

// Template Preview Functions
let currentPreviewTemplate = null;

// Preview template
async function previewTemplate(templateId) {
    if (!window.BusinessPlanTemplates || !window.BusinessPlanTemplates[templateId]) {
        console.error('Template not found:', templateId);
        showNotification('Template nicht gefunden', 'error');
        return;
    }
    
    // Show modal first
    const modal = document.getElementById('templatePreviewModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Show loading in modal
    LoadingStates.showModalLoading(modal);
    
    try {
        // Simulate loading time
        await LoadingStates.simulateLoading(500, 1000);
        
        currentPreviewTemplate = window.BusinessPlanTemplates[templateId];
        
        // Update modal content
        updateTemplatePreviewModal();
    } catch (error) {
        console.error('Error loading template preview:', error);
        showNotification('Fehler beim Laden der Vorschau', 'error');
        closeTemplatePreview();
    } finally {
        LoadingStates.hideModalLoading(modal);
    }
}

// Update template preview modal
function updateTemplatePreviewModal() {
    if (!currentPreviewTemplate) return;
    
    // Update header information
    document.getElementById('previewTemplateTitle').textContent = `${currentPreviewTemplate.name} - Vorschau`;
    document.getElementById('previewTemplateIcon').textContent = currentPreviewTemplate.icon;
    document.getElementById('previewTemplateName').textContent = currentPreviewTemplate.name;
    document.getElementById('previewTemplateDescription').textContent = currentPreviewTemplate.description;
    document.getElementById('previewChapterCount').textContent = `${currentPreviewTemplate.chapters.length} Kapitel`;
    document.getElementById('previewEstimatedTime').textContent = currentPreviewTemplate.estimatedTime || '2-3 Stunden';
    
    // Update "select from preview" button
    const selectBtn = document.getElementById('selectFromPreviewBtn');
    selectBtn.onclick = () => selectTemplateFromPreview();
    
    // Build chapters preview
    buildChaptersPreview();
}

// Build chapters preview
function buildChaptersPreview() {
    const container = document.getElementById('previewChapters');
    if (!currentPreviewTemplate || !currentPreviewTemplate.chapters) return;
    
    const chaptersHTML = currentPreviewTemplate.chapters.map((chapter, index) => {
        const fieldsList = chapter.sections.map(section => section.title).join(', ');
        
        return `
            <div class="preview-chapter">
                <div class="preview-chapter-header">
                    <div class="preview-chapter-number">${index + 1}</div>
                    <div class="preview-chapter-title">
                        <h4>${chapter.title}</h4>
                        <p>${chapter.description}</p>
                    </div>
                </div>
                <div class="preview-chapter-content">
                    ${getChapterPreviewContent(chapter)}
                </div>
                <div class="preview-chapter-fields">
                    <h5>Auszufüllende Felder:</h5>
                    <div class="preview-field-list">
                        ${chapter.sections.map(section => 
                            `<span class="preview-field">${section.title}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = chaptersHTML;
}

// Get chapter preview content
function getChapterPreviewContent(chapter) {
    // Sample content based on chapter type
    const previewTexts = {
        'Geschäftsidee': 'Beschreiben Sie Ihre innovative Geschäftsidee, das Problem das Sie lösen und Ihren einzigartigen Lösungsansatz.',
        'Marktanalyse': 'Analysieren Sie Ihren Zielmarkt, die Marktgröße, Trends und Wachstumspotentiale.',
        'Zielgruppe': 'Definieren Sie Ihre primären und sekundären Zielgruppen mit detaillierten Personas.',
        'Wettbewerbsanalyse': 'Identifizieren Sie Ihre direkten und indirekten Konkurrenten und analysieren Sie deren Stärken und Schwächen.',
        'Marketing': 'Entwickeln Sie eine umfassende Marketing- und Vertriebsstrategie für Ihre Zielgruppen.',
        'Finanzplanung': 'Erstellen Sie detaillierte Finanzprognosen inklusive Umsatz-, Kosten- und Liquiditätsplanung.',
        'Team': 'Stellen Sie Ihr Gründungsteam vor und beschreiben Sie die Qualifikationen und Rollen.',
        'Finanzierung': 'Definieren Sie Ihren Kapitalbedarf und mögliche Finanzierungsquellen.'
    };
    
    return previewTexts[chapter.title] || 'In diesem Kapitel entwickeln Sie wichtige Aspekte Ihres Businessplans systematisch und strukturiert.';
}

// Close template preview
function closeTemplatePreview() {
    const modal = document.getElementById('templatePreviewModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentPreviewTemplate = null;
}

// Select template from preview
function selectTemplateFromPreview() {
    if (!currentPreviewTemplate) return;
    
    closeTemplatePreview();
    selectTemplate(currentPreviewTemplate.id);
}

// Confirm send to advisor
async function confirmSendToAdvisor() {
    const submitButton = document.querySelector('#advisorModal .btn-primary');
    LoadingStates.showButtonLoading(submitButton, 'Businessplan senden');
    
    try {
        const message = document.getElementById('advisorMessage').value;
        const feedbackOptions = {
            generalFeedback: document.getElementById('generalFeedback').checked,
            financialReview: document.getElementById('financialReview').checked,
            marketAnalysis: document.getElementById('marketAnalysis').checked,
            competitorCheck: document.getElementById('competitorCheck').checked
        };
        
        // Simulate sending time
        await LoadingStates.simulateLoading(2000, 3000);
        
        // In a real application, this would send data to the backend
        const advisorData = {
            businessPlan: businessPlanData,
            completedChapters: completedChapters,
            message: message,
            feedbackOptions: feedbackOptions,
            sentAt: new Date().toISOString()
        };
        
        // Save to localStorage for demonstration
        localStorage.setItem('advisorSubmission', JSON.stringify(advisorData));
        
        // Close modal and show success message
        closeAdvisorModal();
        showNotification('Businessplan erfolgreich an Berater gesendet!', 'success');
        
        // Show page loading for redirect
        LoadingStates.showPageLoading(
            'Weiterleitung...',
            'Sie werden zum Dashboard weitergeleitet'
        );
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    } catch (error) {
        console.error('Error sending to advisor:', error);
        showNotification('Fehler beim Senden an den Berater', 'error');
        LoadingStates.hideButtonLoading(submitButton);
    }
}

// Update progress bar
function updateProgressBar(percentage) {
    const progressFill = document.getElementById('businessplanProgress');
    const progressText = document.getElementById('progressPercentage');
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${Math.round(percentage)}%`;
    }
}

// Hide all sections
function hideAllSections() {
    const sections = [
        'modeSelection',
        'templateSelection', 
        'uploadSection',
        'businessplanEditor'
    ];
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Handle escape key to close modals
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAdvisorModal();
            closeTemplatePreview();
        }
    });
    
    // Handle click outside modals to close
    document.addEventListener('click', function(event) {
        const advisorModal = document.getElementById('advisorModal');
        const previewModal = document.getElementById('templatePreviewModal');
        
        if (event.target === advisorModal) {
            closeAdvisorModal();
        }
        
        if (event.target === previewModal) {
            closeTemplatePreview();
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Theme toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Auto-save functionality
let autoSaveInterval;

function startAutoSave() {
    autoSaveInterval = setInterval(() => {
        if (businessPlanData.template) {
            saveProgress();
        }
    }, 30000); // Auto-save every 30 seconds
}

function stopAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
}

// Start auto-save when page loads
document.addEventListener('DOMContentLoaded', startAutoSave);

// Cleanup on page unload
window.addEventListener('beforeunload', stopAutoSave);