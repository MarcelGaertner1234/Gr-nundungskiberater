/**
 * PDF Export JavaScript
 * Handles PDF generation for businessplans using jsPDF
 */

// Initialize PDF export functionality
document.addEventListener('DOMContentLoaded', function() {
    loadPDFLibrary();
});

// Load jsPDF library dynamically
function loadPDFLibrary() {
    if (window.jsPDF) {
        console.log('jsPDF already loaded');
        return;
    }
    
    // Load jsPDF from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = function() {
        console.log('jsPDF library loaded successfully');
    };
    script.onerror = function() {
        console.error('Failed to load jsPDF library');
        showNotification('PDF-Export nicht verfügbar. Bitte versuche es später erneut.', 'error');
    };
    document.head.appendChild(script);
}

// Export businessplan as PDF
function exportBusinessplan() {
    if (!window.jsPDF) {
        showNotification('PDF-Library wird geladen...', 'info');
        loadPDFLibrary();
        setTimeout(exportBusinessplan, 2000);
        return;
    }
    
    try {
        showExportLoading();
        
        // Get businessplan data
        const businessplanData = getBusinessplanData();
        
        if (!businessplanData || Object.keys(businessplanData.chapters || {}).length === 0) {
            hideExportLoading();
            showNotification('Kein Businessplan zum Exportieren gefunden. Bitte erstelle zuerst einen Businessplan.', 'warning');
            return;
        }
        
        // Generate PDF
        setTimeout(() => {
            generatePDF(businessplanData);
        }, 500);
        
    } catch (error) {
        console.error('PDF export error:', error);
        hideExportLoading();
        showNotification('Fehler beim PDF-Export. Bitte versuche es erneut.', 'error');
    }
}

// Get businessplan data from localStorage
function getBusinessplanData() {
    const data = localStorage.getItem('businessPlanData');
    if (data) {
        return JSON.parse(data);
    }
    return null;
}

// Generate PDF document
function generatePDF(businessplanData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // PDF configuration
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 7;
    let currentY = margin;
    
    // Colors
    const primaryColor = [79, 70, 229]; // #4f46e5
    const textColor = [51, 51, 51]; // #333333
    const lightGray = [128, 128, 128]; // #808080
    
    try {
        // Title Page
        addTitlePage(doc, businessplanData, pageWidth, pageHeight, margin);
        
        // Table of Contents
        doc.addPage();
        currentY = margin;
        addTableOfContents(doc, businessplanData, pageWidth, margin, currentY);
        
        // Business Plan Chapters
        const chapters = businessplanData.chapters || {};
        const templateData = getTemplateData(businessplanData.template);
        
        if (templateData && templateData.chapters) {
            templateData.chapters.forEach((chapterTemplate, index) => {
                doc.addPage();
                currentY = margin;
                
                const chapterData = chapters[`chapter_${index}`] || {};
                addChapter(doc, chapterTemplate, chapterData, pageWidth, pageHeight, margin, currentY);
            });
        }
        
        // Footer on all pages
        addFooterToAllPages(doc, businessplanData);
        
        // Save PDF
        const fileName = generateFileName(businessplanData);
        doc.save(fileName);
        
        hideExportLoading();
        showNotification('✅ PDF erfolgreich erstellt und heruntergeladen!', 'success');
        
        // Track export
        trackPDFExport(businessplanData);
        
    } catch (error) {
        console.error('PDF generation error:', error);
        hideExportLoading();
        showNotification('Fehler bei der PDF-Erstellung. Bitte versuche es erneut.', 'error');
    }
}

// Add title page
function addTitlePage(doc, businessplanData, pageWidth, pageHeight, margin) {
    const centerX = pageWidth / 2;
    
    // Logo/Header
    doc.setFontSize(24);
    doc.setTextColor(79, 70, 229);
    doc.text('KI KONZEPT BUILDER', centerX, 40, { align: 'center' });
    
    // Main Title
    doc.setFontSize(32);
    doc.setTextColor(51, 51, 51);
    doc.text('BUSINESSPLAN', centerX, 80, { align: 'center' });
    
    // Business Name
    const businessName = getBusinessName(businessplanData);
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229);
    doc.text(businessName, centerX, 110, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(14);
    doc.setTextColor(128, 128, 128);
    doc.text('Erstellt mit KI-Unterstützung', centerX, 130, { align: 'center' });
    
    // Date
    const today = new Date().toLocaleDateString('de-DE');
    doc.setFontSize(12);
    doc.text(`Erstellt am: ${today}`, centerX, 150, { align: 'center' });
    
    // Template info
    const templateName = getTemplateName(businessplanData.template);
    doc.text(`Vorlage: ${templateName}`, centerX, 165, { align: 'center' });
    
    // Author info
    const userProfile = getUserProfile();
    if (userProfile.email) {
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Erstellt von: ${userProfile.email}`, centerX, pageHeight - 40, { align: 'center' });
    }
    
    // Confidential notice
    doc.setFontSize(10);
    doc.setTextColor(200, 0, 0);
    doc.text('VERTRAULICH - Nur für interne Zwecke', centerX, pageHeight - 20, { align: 'center' });
}

// Add table of contents
function addTableOfContents(doc, businessplanData, pageWidth, margin, startY) {
    let currentY = startY;
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(79, 70, 229);
    doc.text('Inhaltsverzeichnis', margin, currentY);
    currentY += 20;
    
    // Get template chapters
    const templateData = getTemplateData(businessplanData.template);
    if (templateData && templateData.chapters) {
        doc.setFontSize(12);
        doc.setTextColor(51, 51, 51);
        
        templateData.chapters.forEach((chapter, index) => {
            const pageNumber = index + 3; // Account for title page and TOC
            const dots = '.'.repeat(Math.max(1, 50 - chapter.title.length));
            
            doc.text(`${index + 1}. ${chapter.title}`, margin, currentY);
            doc.text(`${dots} ${pageNumber}`, margin + 130, currentY);
            currentY += 8;
        });
    }
}

// Add chapter
function addChapter(doc, chapterTemplate, chapterData, pageWidth, pageHeight, margin, startY) {
    let currentY = startY;
    const maxWidth = pageWidth - (margin * 2);
    
    // Chapter title
    doc.setFontSize(16);
    doc.setTextColor(79, 70, 229);
    doc.text(chapterTemplate.title, margin, currentY);
    currentY += 15;
    
    // Chapter description
    if (chapterTemplate.description) {
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        const descLines = doc.splitTextToSize(chapterTemplate.description, maxWidth);
        doc.text(descLines, margin, currentY);
        currentY += descLines.length * 5 + 10;
    }
    
    // Chapter content
    doc.setFontSize(11);
    doc.setTextColor(51, 51, 51);
    
    if (chapterTemplate.fields) {
        chapterTemplate.fields.forEach(field => {
            // Check if we need a new page
            if (currentY > pageHeight - 40) {
                doc.addPage();
                currentY = margin;
            }
            
            // Field label
            doc.setFont(undefined, 'bold');
            doc.text(field.label, margin, currentY);
            currentY += 8;
            
            // Field content
            doc.setFont(undefined, 'normal');
            const fieldValue = chapterData[field.id] || field.placeholder || 'Noch nicht ausgefüllt';
            const contentLines = doc.splitTextToSize(fieldValue, maxWidth);
            doc.text(contentLines, margin, currentY);
            currentY += contentLines.length * 6 + 8;
        });
    }
}

// Add footer to all pages
function addFooterToAllPages(doc, businessplanData) {
    const pageCount = doc.internal.getNumberOfPages();
    const businessName = getBusinessName(businessplanData);
    
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Footer line
        doc.setDrawColor(79, 70, 229);
        doc.line(20, doc.internal.pageSize.getHeight() - 25, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 25);
        
        // Footer text
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(businessName, 20, doc.internal.pageSize.getHeight() - 15);
        doc.text(`Seite ${i} von ${pageCount}`, doc.internal.pageSize.getWidth() - 50, doc.internal.pageSize.getHeight() - 15);
    }
}

// Helper functions
function getBusinessName(businessplanData) {
    const chapters = businessplanData.chapters || {};
    const firstChapter = chapters['chapter_0'] || {};
    
    // Try to find business name in first chapter
    for (const [key, value] of Object.entries(firstChapter)) {
        if (key.includes('name') || key.includes('title') || key.includes('company')) {
            if (value && value.trim()) {
                return value.trim();
            }
        }
    }
    
    return 'Mein Businessplan';
}

function getTemplateName(templateType) {
    const templateNames = {
        'startup': 'Startup / Tech',
        'traditional': 'Klassisches Unternehmen',
        'ecommerce': 'E-Commerce',
        'service': 'Dienstleistung'
    };
    
    return templateNames[templateType] || 'Standard';
}

function getTemplateData(templateType) {
    // Get template data from businessplan-templates.js
    if (window.BUSINESSPLAN_TEMPLATES && window.BUSINESSPLAN_TEMPLATES[templateType]) {
        return window.BUSINESSPLAN_TEMPLATES[templateType];
    }
    
    return null;
}

function getUserProfile() {
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    return {
        email: onboardingData.email || '',
        name: onboardingData.name || ''
    };
}

function generateFileName(businessplanData) {
    const businessName = getBusinessName(businessplanData);
    const date = new Date().toISOString().split('T')[0];
    const sanitizedName = businessName.replace(/[^a-zA-Z0-9]/g, '_');
    
    return `Businessplan_${sanitizedName}_${date}.pdf`;
}

// Show/hide export loading
function showExportLoading() {
    const exportBtn = document.querySelector('[onclick="exportBusinessplan()"]');
    if (exportBtn) {
        exportBtn.disabled = true;
        exportBtn.innerHTML = `
            <svg class="loading-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" opacity="0.3"></circle>
                <path d="M12 2a10 10 0 0 1 10 10" opacity="1"></path>
            </svg>
            PDF wird erstellt...
        `;
        
        // Add loading styles
        if (!document.querySelector('#pdf-loading-styles')) {
            const style = document.createElement('style');
            style.id = 'pdf-loading-styles';
            style.innerHTML = `
                .loading-spinner {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

function hideExportLoading() {
    const exportBtn = document.querySelector('[onclick="exportBusinessplan()"]');
    if (exportBtn) {
        exportBtn.disabled = false;
        exportBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Exportieren
        `;
    }
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
    
    // Add notification styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const styles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 400px;
                padding: 16px;
                border-radius: 8px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                animation: slideIn 0.3s ease-out;
            }
            .notification.success {
                background: #10b981;
                color: white;
            }
            .notification.error {
                background: #ef4444;
                color: white;
            }
            .notification.warning {
                background: #f59e0b;
                color: white;
            }
            .notification.info {
                background: #3b82f6;
                color: white;
            }
            .notification-content {
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }
            .notification-close {
                background: none;
                border: none;
                color: currentColor;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Track PDF export
function trackPDFExport(businessplanData) {
    const templateType = businessplanData.template;
    const timestamp = new Date().toISOString();
    
    console.log('PDF export tracked:', {
        template: templateType,
        timestamp: timestamp
    });
    
    // Store export history
    const exportHistory = JSON.parse(localStorage.getItem('pdfExportHistory') || '[]');
    exportHistory.push({
        template: templateType,
        timestamp: timestamp,
        fileName: generateFileName(businessplanData)
    });
    
    // Keep only last 10 exports
    if (exportHistory.length > 10) {
        exportHistory.splice(0, exportHistory.length - 10);
    }
    
    localStorage.setItem('pdfExportHistory', JSON.stringify(exportHistory));
}

// Export functions for global use
window.PDFExport = {
    exportBusinessplan: exportBusinessplan,
    showNotification: showNotification
};