/**
 * Document Viewer JavaScript
 * Handles PDF viewing and document management in the browser
 */

// Global variables
let currentDocument = null;
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;
let canvas = null;
let ctx = null;

// Initialize document viewer
document.addEventListener('DOMContentLoaded', function() {
    initializeDocumentViewer();
    loadPDFJS();
});

// Initialize document viewer functionality
function initializeDocumentViewer() {
    setupDocumentViewer();
    setupDocumentModal();
    addDocumentClickHandlers();
}

// Load PDF.js library dynamically
function loadPDFJS() {
    if (window.pdfjsLib) {
        console.log('PDF.js already loaded');
        return;
    }
    
    // Load PDF.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = function() {
        // Set worker source
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        console.log('PDF.js library loaded successfully');
    };
    script.onerror = function() {
        console.error('Failed to load PDF.js library');
        showNotification('PDF-Viewer nicht verfügbar. Dokumente können heruntergeladen werden.', 'warning');
    };
    document.head.appendChild(script);
}

// Setup document viewer
function setupDocumentViewer() {
    // Create document viewer modal if it doesn't exist
    if (!document.getElementById('documentViewerModal')) {
        createDocumentViewerModal();
    }
}

// Create document viewer modal
function createDocumentViewerModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'documentViewerModal';
    modal.style.display = 'none';
    
    modal.innerHTML = `
        <div class="modal-content document-viewer-modal">
            <div class="modal-header">
                <h2 id="documentTitle" data-i18n="document_viewer.title">Dokument anzeigen</h2>
                <div class="document-actions">
                    <button class="btn btn-secondary" onclick="downloadCurrentDocument()" id="downloadBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span data-i18n="document_viewer.actions.download">Download</span>
                    </button>
                    <button class="btn btn-secondary" onclick="printCurrentDocument()" id="printBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                        <span data-i18n="document_viewer.actions.print">Drucken</span>
                    </button>
                </div>
                <button class="modal-close" onclick="closeDocumentViewer()">×</button>
            </div>
            
            <div class="document-viewer-toolbar">
                <div class="toolbar-section">
                    <button class="toolbar-btn" onclick="zoomOut()" id="zoomOutBtn" data-i18n-title="document_viewer.toolbar.zoom_out">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>
                    <span class="zoom-level" id="zoomLevel">150%</span>
                    <button class="toolbar-btn" onclick="zoomIn()" id="zoomInBtn" data-i18n-title="document_viewer.toolbar.zoom_in">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>
                    <button class="toolbar-btn" onclick="fitToWidth()" data-i18n-title="document_viewer.toolbar.fit_to_width">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                        </svg>
                    </button>
                </div>
                
                <div class="toolbar-section" id="pdfControls" style="display: none;">
                    <button class="toolbar-btn" onclick="prevPage()" id="prevPageBtn" data-i18n-title="document_viewer.toolbar.previous_page">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <span class="page-info">
                        <span data-i18n="document_viewer.toolbar.page_info">Seite</span> <input type="number" id="pageInput" min="1" value="1" onchange="goToPage()"> 
                        <span data-i18n="document_viewer.toolbar.of">von</span> <span id="pageCount">1</span>
                    </span>
                    <button class="toolbar-btn" onclick="nextPage()" id="nextPageBtn" data-i18n-title="document_viewer.toolbar.next_page">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="modal-body">
                <div class="document-viewer-container">
                    <div class="document-loading" id="documentLoading">
                        <div class="loading-spinner"></div>
                        <span data-i18n="document_viewer.loading.message">Dokument wird geladen...</span>
                    </div>
                    
                    <div class="document-error" id="documentError" style="display: none;">
                        <div class="error-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </div>
                        <h3 data-i18n="document_viewer.error.title">Dokument konnte nicht geladen werden</h3>
                        <p data-i18n="document_viewer.error.description">Das Dokument ist möglicherweise beschädigt oder wird nicht unterstützt.</p>
                        <button class="btn btn-primary" onclick="downloadCurrentDocument()" data-i18n="document_viewer.error.download_button">Dokument herunterladen</button>
                    </div>
                    
                    <div class="document-content" id="documentContent">
                        <canvas id="pdfCanvas" style="display: none;"></canvas>
                        <iframe id="documentFrame" style="display: none;"></iframe>
                        <div id="textContent" style="display: none;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Setup document modal
function setupDocumentModal() {
    const modal = document.getElementById('documentViewerModal');
    if (modal) {
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeDocumentViewer();
            }
        });
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDocumentViewer();
            }
        });
        
        // Prevent zoom on mobile
        modal.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });
    }
}

// Add document click handlers
function addDocumentClickHandlers() {
    // Add click handlers to existing document items
    const documentItems = document.querySelectorAll('.document-item');
    documentItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't open viewer if download button was clicked
            if (e.target.closest('.document-action')) {
                return;
            }
            
            const documentName = this.querySelector('h4').textContent;
            const documentType = getDocumentType(documentName);
            
            // Create demo document for viewing
            const demoDocument = {
                name: documentName,
                type: documentType,
                url: createDemoDocumentURL(documentName, documentType),
                size: '2.3 MB'
            };
            
            openDocumentViewer(demoDocument);
        });
    });
}

// Open document viewer
function openDocumentViewer(document) {
    if (!document) return;
    
    currentDocument = document;
    const modal = document.getElementById('documentViewerModal');
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Update title
    const titleElement = document.getElementById('documentTitle');
    if (titleElement) {
        titleElement.textContent = document.name;
    }
    
    // Show loading state
    showDocumentLoading();
    
    // Load document based on type
    setTimeout(() => {
        loadDocument(document);
    }, 500);
    
    // Track document view
    trackDocumentView(document);
}

// Close document viewer
function closeDocumentViewer() {
    const modal = document.getElementById('documentViewerModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset state
    currentDocument = null;
    pdfDoc = null;
    pageNum = 1;
    scale = 1.5;
    
    // Hide all content
    hideAllDocumentContent();
    
    // Track document close
    trackDocumentClose();
}

// Load document
function loadDocument(document) {
    const documentType = document.type.toLowerCase();
    
    try {
        if (documentType === 'pdf') {
            loadPDFDocument(document);
        } else if (['doc', 'docx', 'xlsx', 'pptx'].includes(documentType)) {
            loadOfficeDocument(document);
        } else if (documentType === 'txt') {
            loadTextDocument(document);
        } else {
            showDocumentError('Dokumenttyp wird nicht unterstützt');
        }
    } catch (error) {
        console.error('Error loading document:', error);
        showDocumentError('Fehler beim Laden des Dokuments');
    }
}

// Load PDF document
function loadPDFDocument(document) {
    if (!window.pdfjsLib) {
        showDocumentError('PDF-Viewer nicht verfügbar');
        return;
    }
    
    const loadingTask = window.pdfjsLib.getDocument(document.url);
    
    loadingTask.promise.then(function(pdf) {
        pdfDoc = pdf;
        
        // Update page count
        const pageCountElement = document.getElementById('pageCount');
        if (pageCountElement) {
            pageCountElement.textContent = pdf.numPages;
        }
        
        // Show PDF controls
        const pdfControls = document.getElementById('pdfControls');
        if (pdfControls) {
            pdfControls.style.display = 'flex';
        }
        
        // Setup canvas
        setupPDFCanvas();
        
        // Render first page
        renderPage(1);
        
        hideDocumentLoading();
        showPDFContent();
        
    }).catch(function(error) {
        console.error('Error loading PDF:', error);
        hideDocumentLoading();
        showDocumentError('PDF konnte nicht geladen werden');
    });
}

// Setup PDF canvas
function setupPDFCanvas() {
    canvas = document.getElementById('pdfCanvas');
    ctx = canvas.getContext('2d');
    
    // Handle high DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
    const ratio = devicePixelRatio / backingStoreRatio;
    
    if (devicePixelRatio !== backingStoreRatio) {
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        ctx.scale(ratio, ratio);
    }
}

// Render PDF page
function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    
    // Update page number input
    const pageInput = document.getElementById('pageInput');
    if (pageInput) {
        pageInput.value = num;
    }
    
    pageNum = num;
}

// Queue render page
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// Navigation functions
function prevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
    trackDocumentNavigation('previous_page');
}

function nextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
    trackDocumentNavigation('next_page');
}

function goToPage() {
    const pageInput = document.getElementById('pageInput');
    const targetPage = parseInt(pageInput.value);
    
    if (targetPage >= 1 && targetPage <= pdfDoc.numPages) {
        queueRenderPage(targetPage);
        trackDocumentNavigation('go_to_page');
    } else {
        pageInput.value = pageNum;
    }
}

// Zoom functions
function zoomIn() {
    scale = Math.min(scale * 1.25, 3.0);
    updateZoomLevel();
    if (pdfDoc) {
        queueRenderPage(pageNum);
    }
    trackDocumentAction('zoom_in');
}

function zoomOut() {
    scale = Math.max(scale / 1.25, 0.5);
    updateZoomLevel();
    if (pdfDoc) {
        queueRenderPage(pageNum);
    }
    trackDocumentAction('zoom_out');
}

function fitToWidth() {
    const container = document.querySelector('.document-viewer-container');
    const containerWidth = container.offsetWidth - 40; // Account for padding
    
    if (pdfDoc) {
        pdfDoc.getPage(pageNum).then(function(page) {
            const viewport = page.getViewport({ scale: 1 });
            scale = containerWidth / viewport.width;
            updateZoomLevel();
            queueRenderPage(pageNum);
        });
    }
    trackDocumentAction('fit_to_width');
}

function updateZoomLevel() {
    const zoomElement = document.getElementById('zoomLevel');
    if (zoomElement) {
        zoomElement.textContent = Math.round(scale * 100) + '%';
    }
}

// Load office documents
function loadOfficeDocument(document) {
    // For demo purposes, show a message
    hideDocumentLoading();
    showDocumentError('Office-Dokumente werden in der Demo-Version nicht angezeigt. Bitte lade das Dokument herunter.');
}

// Load text document
function loadTextDocument(document) {
    // For demo purposes, show sample text
    const textContent = document.getElementById('textContent');
    textContent.innerHTML = `
        <div class="text-document">
            <h2>${document.name}</h2>
            <p>Dies ist eine Demo-Textdatei. In der vollständigen Version würde hier der echte Inhalt der Datei angezeigt werden.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
    `;
    
    hideDocumentLoading();
    showTextContent();
}

// Show/hide content
function showDocumentLoading() {
    document.getElementById('documentLoading').style.display = 'flex';
    hideAllDocumentContent();
}

function hideDocumentLoading() {
    document.getElementById('documentLoading').style.display = 'none';
}

function showDocumentError(message) {
    const errorElement = document.getElementById('documentError');
    const errorMessage = errorElement.querySelector('p');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
    errorElement.style.display = 'flex';
    hideAllDocumentContent();
    hideDocumentLoading();
}

function showPDFContent() {
    document.getElementById('pdfCanvas').style.display = 'block';
    hideOtherContent(['pdfCanvas']);
}

function showTextContent() {
    document.getElementById('textContent').style.display = 'block';
    hideOtherContent(['textContent']);
}

function hideAllDocumentContent() {
    document.getElementById('pdfCanvas').style.display = 'none';
    document.getElementById('documentFrame').style.display = 'none';
    document.getElementById('textContent').style.display = 'none';
    document.getElementById('documentError').style.display = 'none';
}

function hideOtherContent(except) {
    const allContent = ['pdfCanvas', 'documentFrame', 'textContent', 'documentError'];
    allContent.forEach(id => {
        if (!except.includes(id)) {
            document.getElementById(id).style.display = 'none';
        }
    });
}

// Document actions
function downloadCurrentDocument() {
    if (!currentDocument) return;
    
    // Create download link
    const link = document.createElement('a');
    link.href = currentDocument.url;
    link.download = currentDocument.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    trackDocumentAction('download');
}

function printCurrentDocument() {
    if (!currentDocument) return;
    
    // For PDFs, print the canvas
    if (currentDocument.type.toLowerCase() === 'pdf' && canvas) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head><title>Drucken: ${currentDocument.name}</title></head>
                <body style="margin: 0;">
                    <img src="${canvas.toDataURL()}" style="width: 100%; height: auto;">
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    } else {
        alert('Drucken ist nur für PDF-Dokumente verfügbar.');
    }
    
    trackDocumentAction('print');
}

// Helper functions
function getDocumentType(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    return extension;
}

function createDemoDocumentURL(filename, type) {
    // For demo purposes, create a data URL or use a placeholder
    if (type === 'pdf') {
        // Return a placeholder PDF URL - in real app this would be the actual document URL
        return 'data:application/pdf;base64,JVBERi0xLjMKJcfsj6IKNSAwIG9iago8PAovTGVuZ3RoIDYgMCBSCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQp4nDPQM1Qo5ypUKNCriY1VUMhIzcnPS89MzStRyE9VyC9KSQUCpcn5eZn5OUpBqZlFxQpJqXllqSU5ibmJeZkKaeWJJalFiTkKqWVFJYlFiUBHKQAAAP//AwC7WhyBCmVuZHN0cmVhbQplbmRvYmoKNiAwIG9iago5NgplbmRvYmoKNCAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDEgMCBSCi9SZXNvdXJjZXMgPDwKL0ZvbnQgPDwKL0YxIDMgMCBSCj4+Cj4+Ci9NZWRpYUJveCBbMCAwIDI5Ny4xIDQyMS41MF0KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNiAwIFIKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnicM9AzVCjnKlQo0KuJjVVQyEjNyc9Lz0zNK1HIT1XIL0pJBQKlyfn5mfk5SkGpmUXFCkmpeWWpJTmJuYl5mQpp5YklqUWJOQqpZUUliUWJQEcpAAAA//8DALtaHIEKZW5kc3RyZWFtCmVuZG9iago=';
    }
    
    return '#'; // Placeholder for other file types
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
    if (!document.querySelector('#document-viewer-notification-styles')) {
        const styles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1002;
                max-width: 400px;
                padding: 16px;
                border-radius: 8px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                animation: slideIn 0.3s ease-out;
            }
            .notification.success { background: #10b981; color: white; }
            .notification.error { background: #ef4444; color: white; }
            .notification.warning { background: #f59e0b; color: white; }
            .notification.info { background: #3b82f6; color: white; }
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
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'document-viewer-notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Analytics and tracking
function trackDocumentView(document) {
    console.log('Document viewed:', document.name);
}

function trackDocumentClose() {
    console.log('Document viewer closed');
}

function trackDocumentNavigation(action) {
    console.log('Document navigation:', action);
}

function trackDocumentAction(action) {
    console.log('Document action:', action);
}

// Export functions for global use
window.DocumentViewer = {
    openDocumentViewer,
    closeDocumentViewer,
    downloadCurrentDocument,
    printCurrentDocument
};